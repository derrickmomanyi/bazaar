import { userSignInDto } from './dto/user-signin.dto';
import { UserSignUpDto } from './dto/user-signup.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private UsersRepository: Repository<UserEntity>,
  ) { }

  async signUp(UserSignUpDto: UserSignUpDto): Promise<UserEntity> {
    const userExists = await this.findUserByEmail(UserSignUpDto.email)
    if (userExists) throw new BadRequestException('Email already in use');
    UserSignUpDto.password = await hash(UserSignUpDto.password, 10)
    const user = this.UsersRepository.create(UserSignUpDto);
    return await this.UsersRepository.save(user);
  }


  async signIn(userSignInDto: userSignInDto) {
    const userExists = await this.UsersRepository.createQueryBuilder('users').addSelect('users.password')
      .where('users.email=:email', { email: userSignInDto.email }).getOne();
    if (!userExists) throw new BadRequestException('Bad Credentials');
    const matchPassword = await compare(userSignInDto.password, userExists.password);
    if (!matchPassword) throw new BadRequestException('Bad Credentials');
    return userExists;
    // const { password, ...userWithoutPassword } = userExists;
    // return userWithoutPassword;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.UsersRepository.find();
  }

  async findOne(id: number) {
    return await this.UsersRepository.findOneBy({id});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async findUserByEmail(email: string) {
    return await this.UsersRepository.findOneBy({ email });
  }
  async accessToken(user:UserEntity){
    const configService = new ConfigService();
    const secret = configService.get<string>('ACCESS_TOKEN_SECRET_KEY');
    return sign({id: user.id, email: user.email}, secret as string, {expiresIn:'30m'})
  }
}
