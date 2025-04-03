/* eslint-disable */
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../guards/auth.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getProfile(@Req() request: Request) {
    const userId = request['user'].sub;
    return this.userService.getUserProfile(userId);
  }
}
