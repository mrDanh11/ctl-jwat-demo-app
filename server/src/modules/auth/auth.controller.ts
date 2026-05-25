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

import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

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
    const payload: any = this.jwtService.decode(result);

    console.log(payload.exp);
    const exp = payload.exp;

    const expireDate = new Date(exp * 1000);
    const expireDateInVn = expireDate.toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
    });

    return {
      message: 'Login success',
      expireDate: expireDateInVn,
      exp,
    };
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
