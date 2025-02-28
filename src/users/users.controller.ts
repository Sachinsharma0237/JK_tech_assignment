import {
  Controller,
  Get,
  Param,
  Put,
  Delete,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updateUser(@Param('id') id: number, @Body() body: any) {
    return this.usersService.updateUser(id, body);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
