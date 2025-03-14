import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { userSignInDto } from './dto/user-signin.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('sign-up')
  async signUp(@Body() UserSignUpDto: UserSignUpDto): Promise<{ user: UserEntity }> {
    return { user: await this.usersService.signUp(UserSignUpDto) };
  }

  @Post('sign-in')
  async signIn(@Body() UserSignInDto: userSignInDto) {
    const  userResponse = await this.usersService.signIn(UserSignInDto);
    const access_token = await this.usersService.accessToken(userResponse);
     const { password, ...user } = userResponse;
    return {user, access_token};
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    if(!user) throw new NotFoundException('User not found')
      return user; 
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
