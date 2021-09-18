import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsEmailAlreadyExists } from 'src/users/decorators/validation.decorator';

export class CreateOrganizationDto {
  @IsNotEmpty({ message: 'fill_name' })
  name: string;

  @IsEmail({}, { message: 'invalid_email' })
  @IsEmailAlreadyExists({ message: 'unique_email' })
  email: string;

  @IsNotEmpty({ message: 'fill_password' })
  password: string;

  @IsNotEmpty({ message: 'fill_phone_number' })
  phoneNumber: string;

  @IsNotEmpty({ message: 'fill_cep' })
  cep: string;

  @IsNotEmpty({ message: 'fill_city' })
  city: string;

  @IsNotEmpty({ message: 'fill_district' })
  district: string;

  @IsNotEmpty({ message: 'fill_number' })
  number: string;
}
