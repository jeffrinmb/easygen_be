/* eslint-disable */
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { SigninModule } from './signin/signin.module';
import { SignupModule } from './signup/signup.module';
import { UserModule } from './user/user.module';
import { SignoutModule } from './signout/signout.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({}),
    SigninModule,
    SignupModule,
    UserModule,
    SignoutModule,
    RouterModule.register([
      {
        path: 'auth',
        module: AuthModule,
        children: [SigninModule, SignupModule, UserModule, SignoutModule],
      },
    ]),
  ],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService, JwtModule, MongooseModule],
})
export class AuthModule {}
