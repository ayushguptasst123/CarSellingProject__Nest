import { IsEmail, IsEnum, IsString } from 'class-validator';
import { Gender } from '../user.entity';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(Gender, { message: 'Please select Properly' })
  gender: Gender;
}
