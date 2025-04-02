import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { SigninModule } from './signin/signin.module';
import { SignupModule } from './signup/signup.module';
import { UserModule } from './user/user.module';
import { SignoutModule } from './signout/signout.module';

@Module({
  imports: [
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
})
export class AuthModule {}
