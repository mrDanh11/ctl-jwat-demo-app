import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() dtoLogin: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(dtoLogin);
    res.cookie('token', result, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 3,
    });
    return { message: 'Login success' };
  }

  @Post('logout')
  logout(
    @Res({ passthrough: true })
    res: Response,
  ) {
    res.clearCookie('token');

    return {
      message: 'Logout success',
    };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  async me(
    @Res({ passthrough: true }) res: Response,
    @Req() req: { user: { id: number } },
  ) {
    const userId = req.user?.id;
    return this.authService.getMe(userId);
  }
}
