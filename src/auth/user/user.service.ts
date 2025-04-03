import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class UserService {
  constructor(private readonly authService: AuthService) {}

  async getUserProfile(userId: string) {
    return this.authService.getUserData(userId);
  }
}
