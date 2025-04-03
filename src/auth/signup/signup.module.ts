import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { AuthModule } from '../auth.module';

@Module({
  imports: [AuthModule],
  providers: [SignupService],
  controllers: [SignupController],
})
export class SignupModule {}
