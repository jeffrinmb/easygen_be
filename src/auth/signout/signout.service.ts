import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class SignoutService {
  constructor(private readonly authService: AuthService) {}

  async signout(userId: string, refreshToken: string) {
    await this.authService.removeRefreshToken(userId, refreshToken);
    return { message: 'Signed out successfully' };
  }
}
