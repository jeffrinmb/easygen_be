/* eslint-disable */
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../user/schemas/user.schema';
import { SignupDto } from '../dto/auth.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class SignupService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private authService: AuthService
  ) {}

  async signup(signupDto: SignupDto) {
    const { name, email, password } = signupDto;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    // Generate tokens
    const tokens = await this.authService.generateTokens(
      savedUser._id.toString()
    );

    // Store refresh token
    await this.authService.storeRefreshToken(
      savedUser._id.toString(),
      tokens.refreshToken
    );

    return {
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
      tokens,
    };
  }
}
