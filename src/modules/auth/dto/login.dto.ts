import { IsNotEmpty, IsString, IsNumberString, Length } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: '$property phone_number_is_required' })
  @IsNumberString()
  @Length(1, 16, { message: '$property phone_number_is_too_long' })
  phone: string;

  @IsNotEmpty({ message: '$property country_code_is_required' })
  @IsNumberString()
  @Length(1, 4, { message: '$property country_code_is_too_long' })
  country_code: string;

  @IsString({ message: '$property password_should_be_string' })
  @IsNotEmpty({ message: '$property password_is_required' })
  @Length(1, 100, { message: '$property password_is_too_long' })
  password: string;
}
