import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Request,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: any, @Response({ passthrough: true }) response) {
    const { email, password } = body;
    return this.authService.login(email, password, response);
  }

  @Post('/register')
  async register(@Body() body: any, @Response({ passthrough: true }) response) {
    const { email, password, role } = body;
    return this.authService.register(email, password, role, response);
  }

  @Put('/change-password')
  async(@Body() body: any, @Response({ passthrough: true }) response) {
    const { email, oldPassword, newPassword } = body;
    return this.authService.changeUserPassword(
      email,
      oldPassword,
      newPassword,
      response,
    );
  }
}
