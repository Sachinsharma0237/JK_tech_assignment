import { Body, Controller, Get, Post, Put, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async getUser(@Request() req) {
    return await this.authService.getUser(req.user._id);
  }

  @Post('/login')
  async login(@Body() body: any, @Response({ passthrough: true }) response) {
    const { email, password } = body;
    return this.authService.login(email, password, response);
  }

  @Post('/register')
  async register(@Body() body: any, @Response({ passthrough: true }) response) {
    const { email, password } = body;
    return this.authService.register(email, password, response);
  }

  @Put('/changePassword')
  async(@Body() body: any, @Response({ passthrough: true }) response) {
    const { email, oldPassword, newPassword } = body;
    return this.authService.changeUserPassword(email, oldPassword, newPassword, response);
  }

  @Put('/resetPassword')
  async resetUserPassword(@Body() body: any, @Response({ passthrough: true }) response) {
    return await this.authService.resetUserPassword(body, response);
  }
}
