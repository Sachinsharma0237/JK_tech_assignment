import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn() // Auto-incrementing primary key
  id: number;

  @Column({ unique: true }) // Email should be unique
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' }) // Default role is 'user'
  role: string;
}
