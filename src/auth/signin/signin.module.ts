import { Module } from '@nestjs/common';
import { SigninController } from './signin.controller';
import { SigninService } from './signin.service';
import { LoggerModule } from '@src/shared/logger/logger.module';

@Module({
  controllers: [SigninController],
  providers: [SigninService],
  exports: [SigninService],
  imports: [LoggerModule],
})
export class SigninModule {}
