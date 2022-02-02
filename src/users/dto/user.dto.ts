import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  username: string;
}

export class ResponseUserDto {
  username: string;
  email: string;
}
