import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  constructor(
    id: number,
    email: string,
    password: string,
    fullName: string,
  ){
    this.id = id;
    this.email = email;
    this.password = password;
    this.fullName = fullName;
  }
}
