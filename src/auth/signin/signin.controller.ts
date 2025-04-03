import { Body, Controller, Post } from '@nestjs/common';
import { SigninService } from './signin.service';
import { SigninDto } from '../dto/auth.dto';
import { LoggerService } from '@src/shared/logger/logger.service';

@Controller('signin')
export class SigninController {
  constructor(
    private signinService: SigninService,
    private readonly logger: LoggerService
  ) {}

  @Post()
  async signIn(@Body() signinDto: SigninDto) {
    this.logger.log('User signin attempt', 'SigninController');
    return this.signinService.signin(signinDto);
  }
}
