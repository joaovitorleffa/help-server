import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IsEmailAlreadyExists } from 'src/users/decorators/validation.decorator';

export class CreatePersonDto {
  @IsNotEmpty({ message: 'fill_name' })
  @MinLength(5, { message: 'min_name' })
  name: string;

  @IsEmail({}, { message: 'invalid_email' })
  @IsEmailAlreadyExists({ message: 'unique_email' })
  email: string;

  @IsNotEmpty({ message: 'fill_password' })
  @MinLength(8, { message: 'min_password' })
  password: string;
}
