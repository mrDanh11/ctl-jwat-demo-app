import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth } from 'typeorm/browser/driver/mongodb/typings.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/auth.entity';
import { UserRepository } from './repository/user.repository';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtAuthGuard],
  imports: [TypeOrmModule.forFeature([User])],
})
export class AuthModule {}
