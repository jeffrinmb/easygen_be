import { forwardRef, Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { AuthModule } from '../auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [SignupService],
  controllers: [SignupController],
})
export class SignupModule {}
