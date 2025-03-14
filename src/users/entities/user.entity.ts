import { Roles } from 'src/common/user-roles.enum';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Timestamp, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({unique: true})
  email: string;

  @Column({select:false})
  password: string;

  @Column({type: 'enum', enum: Roles, default: Roles.USER})
  roles: Roles;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  ip_addrress: string;

  @CreateDateColumn()
  created_at: Timestamp

  @UpdateDateColumn()
  updated_at: Timestamp
}

