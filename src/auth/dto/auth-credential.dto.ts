import { IsString, MinLength, MaxLength } from 'class-validator';

export class AuthCredentials {
  @MinLength(6)
  @IsString()
  email: string;

  @MinLength(8, { message: 'Password must be atleast 8 characters' })
  @MaxLength(20)
  @IsString()
  password: string;
}
