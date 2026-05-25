import { Module } from '@nestjs/common';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';
import { GoogleStrategy } from './strategy/google.strategy';
import { UserRepository } from '../auth/repository/user.repository';

@Module({
  controllers: [OauthController],
  providers: [OauthService, GoogleStrategy, UserRepository],
})
export class OauthModule {}
