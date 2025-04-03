import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    description: 'Users full name',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Users email address',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Users password (min 8 characters)',
    example: 'Test@1234',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}

export class SigninDto {
  @ApiProperty({
    description: 'Users email address',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Users password (min 8 characters)',
    example: 'Test@1234',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
