import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn() // Auto-incrementing primary key
  id: number;

  @Column({ unique: true }) // Email should be unique
  email: string;

  @Column()
  password: string;

  @Column({default: null})
  accessToken: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER }) // Default role is 'user'
  role: string;
}
