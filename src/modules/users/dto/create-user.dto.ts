import {
  IsNotEmpty,
  IsString,
  Length,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(1, 16)
  phone: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(1, 4)
  country_code: string;

  @IsOptional()
  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  password: string;
}
