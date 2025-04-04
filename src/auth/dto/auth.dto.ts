/* eslint-disable */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'customPasswordValidator', async: false })
export class CustomPasswordValidator implements ValidatorConstraintInterface {
  validate(
    password: string,
    args?: ValidationArguments
  ): Promise<boolean> | boolean {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    return hasLetter && hasNumber && hasSpecial;
  }
  defaultMessage(args?: ValidationArguments): string {
    return 'Password must contain at least one letter, one number, and one special character';
  }
}

export class SignupDto {
  @ApiProperty({
    description: 'Users full name',
    example: 'John Doe',
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name: string;

  @ApiProperty({
    description: 'Users email address',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({
    description: 'Users password (min 8 characters)',
    example: 'Test@1234',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Validate(CustomPasswordValidator)
  password: string;
}

export class SigninDto {
  @ApiProperty({
    description: 'Users email address',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({
    description: 'Users password (min 8 characters)',
    example: 'Test@1234',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Validate(CustomPasswordValidator)
  password: string;
}
