import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth } from 'typeorm/browser/driver/mongodb/typings.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/auth.entity';
import { UserRepository } from './repository/user.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
  imports: [TypeOrmModule.forFeature([User])],
})
export class AuthModule {}
