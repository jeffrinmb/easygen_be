import { Body, Controller, Post } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupDto } from '../dto/auth.dto';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  async signup(@Body() signupDto: SignupDto) {
    return this.signupService.signup(signupDto);
  }
}
