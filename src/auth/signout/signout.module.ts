import { forwardRef, Module } from '@nestjs/common';
import { SignoutController } from './signout.controller';
import { SignoutService } from './signout.service';
import { AuthModule } from '../auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [SignoutController],
  providers: [SignoutService],
})
export class SignoutModule {}
