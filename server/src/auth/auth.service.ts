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
    const payload = { email: user.email, fullName: user.fullName };
    const token = await this.jwtService.signAsync(payload);
    

    return { email: user.email, fullName: user.fullName, token};
  }
}
