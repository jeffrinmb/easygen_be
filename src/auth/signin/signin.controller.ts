import { Controller, NotFoundException, Post } from '@nestjs/common';
import { SigninService } from './signin.service';
import { LoggerService } from '@src/shared/logger/logger.service';

@Controller('signin')
export class SigninController {
  constructor(
    private signinService: SigninService,
    private readonly logger: LoggerService
  ) {}

  @Post()
  // eslint-disable-next-line @typescript-eslint/require-await
  async signIn() {
    this.logger.log('TEsting the data');
    throw new NotFoundException('TEST');
  }
}
