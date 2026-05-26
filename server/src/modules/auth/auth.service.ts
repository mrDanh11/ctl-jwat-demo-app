import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserRepository } from './repository/user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async login(dtoLogin: LoginDto) {
    const user = await this.userRepository.findByEmail(dtoLogin.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (user.password !== dtoLogin.password) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload = { id: user.id, fullName: user.fullName };
    const token = await this.jwtService.signAsync(payload);
    
    return token;
  }

  async getMe(userId: number) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    };
  }
}
