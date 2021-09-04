import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateOrganizationDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  cep: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  district: string;

  @IsNotEmpty()
  number: string;
}
