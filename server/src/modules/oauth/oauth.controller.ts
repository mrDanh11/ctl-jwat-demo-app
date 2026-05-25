import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from '../../common/guards/google-auth.guard';
import { OauthService } from './oauth.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiOperation } from '@nestjs/swagger';

@Controller('oauth')
export class OauthController {
  constructor(
    private readonly oauthService: OauthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({
    summary: 'Login with Google',
  })
  async googleAuth() {
    return;
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({
    summary: 'Google callback',
  })
  async googleCallback(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.oauthService.handleGoogleLogin(req.user);
    res.cookie('token', result, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 3,
    });
    return res.redirect(this.configService.getOrThrow('FRONTEND_URL'));
  }
}
