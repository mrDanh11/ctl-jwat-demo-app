import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
export class LoginDto {
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MaxLength(20)
  password: string;
}
