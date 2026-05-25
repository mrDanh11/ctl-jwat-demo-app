import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../auth/repository/user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OauthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async handleGoogleLogin(profile: {
    emails?: { value: string }[];
    displayName?: string;
    id: string;
  }) {
    const email = profile.emails?.[0]?.value;
    const fullName = profile.displayName || 'Google User';
    const googleId = profile.id;

    if (!email) {
      throw new BadRequestException('Google account has no email');
    }

    const existing = await this.userRepository.findByEmail(email);

    if (!existing) {
      const user = await this.userRepository.createUser(
        email,
        fullName,
        googleId,
      );

      const payload = { id: user.id, fullName: user.fullName };
      const token = await this.jwtService.signAsync(payload);

      return token;
    }

    if (existing.googleId && existing.googleId !== googleId) {
      throw new BadRequestException('Google account mismatch');
    }

    if (!existing.googleId) {
      await this.userRepository.linkGoogleAccount(existing.id, googleId);
    }

    const token = await this.jwtService.signAsync({
      id: existing.id,
      fullName: existing.fullName,
    });

    return token;
  }
}
