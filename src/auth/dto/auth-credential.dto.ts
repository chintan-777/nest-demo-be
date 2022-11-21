import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class AuthCredentials {
  @ApiProperty({
    type: String,
    description: 'Email of user',
    default: 'abc@email.com',
  })
  @MinLength(6)
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Password of user',
    default: 'Abc@@123#',
  })
  @MinLength(8, { message: 'Password must be atleast 8 characters' })
  @MaxLength(20)
  @IsString()
  password: string;
}
