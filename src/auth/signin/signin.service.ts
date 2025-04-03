/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { SigninDto } from '../dto/auth.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class SigninService {
  constructor(private readonly authService: AuthService) {}

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    // Validate user credentials
    const user = await this.authService.validateUser(email, password);

    // Generate tokens
    const tokens = await this.authService.generateTokens(user._id.toString());

    // Store refresh token
    await this.authService.storeRefreshToken(
      user._id.toString(),
      tokens.refreshToken
    );

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      tokens,
    };
  }
}
