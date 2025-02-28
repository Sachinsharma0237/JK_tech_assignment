import {
  Body,
  Controller,
  Post,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: any) {
    const { email, password } = body;
    return this.authService.login(email, password);
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: any) {
    const { email, password, role } = body;
    return this.authService.register(email, password, role);
  }

  @Put('/change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(@Body() body: any) {
    const { email, oldPassword, newPassword } = body;
    return this.authService.changeUserPassword(email, oldPassword, newPassword);
  }
}
