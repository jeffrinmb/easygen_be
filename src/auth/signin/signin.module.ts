import { Module } from '@nestjs/common';
import { SigninController } from './signin.controller';
import { SigninService } from './signin.service';
import { LoggerModule } from '@src/shared/logger/logger.module';
import { AuthModule } from '../auth.module';

@Module({
  controllers: [SigninController],
  providers: [SigninService],
  exports: [SigninService],
  imports: [LoggerModule, AuthModule],
})
export class SigninModule {}
