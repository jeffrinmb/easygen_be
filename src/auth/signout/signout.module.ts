import { Module } from '@nestjs/common';
import { SignoutController } from './signout.controller';
import { SignoutService } from './signout.service';

@Module({
  controllers: [SignoutController],
  providers: [SignoutService],
})
export class SignoutModule {}
