import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
