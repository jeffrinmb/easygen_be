/* eslint-disable */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SigninDto, SignupDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async generateTokens(userId: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        }
      ),
      this.jwtService.signAsync(
        { sub: userId },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        }
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async storeRefreshToken(userId: string, refreshToken: string) {
    await this.userModel.updateOne(
      { _id: userId },
      { $push: { refreshTokens: refreshToken } }
    );
  }

  async getUserData(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .select('-password -refreshTokens');
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  async removeRefreshToken(userId: string, refreshToken: string) {
    await this.userModel.updateOne(
      { _id: userId },
      { $pull: { refreshTokens: refreshToken } }
    );
  }
}
