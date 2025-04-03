/* eslint-disable */
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { SignoutService } from './signout.service';
import { AuthGuard } from '../guards/auth.guard';
import { Request } from 'express';

@Controller('signout')
export class SignoutController {
  constructor(private readonly signoutService: SignoutService) {}

  @UseGuards(AuthGuard)
  @Post()
  async signout(
    @Req() request: Request,
    @Body('refreshToken') refreshToken: string
  ) {
    const userId = request['user'].sub;
    return this.signoutService.signout(userId, refreshToken);
  }
}
