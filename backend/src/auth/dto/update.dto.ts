import {
  IsString,
  MaxLength,
  IsEmail,
  MinLength,
  IsOptional,
} from 'class-validator';

export class UpdateUserRequest {
  @IsOptional()
  @IsString({ message: 'Имя должно быть строкой' })
  @MaxLength(50, { message: 'Имя не должно превышать 50 символов' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Почта должна быть строкой' })
  @MaxLength(50, { message: 'Почта не должна превышать 50 символов' })
  @IsEmail({}, { message: 'Некорректный формат электронной почты' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'Пароль должен быть строкой' })
  @MaxLength(100, { message: 'Пароль не должен превышать 100 символов' })
  @MinLength(6, { message: 'Пароль должен содержать не менее 6 символов' })
  password?: string;
}
