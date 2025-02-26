import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Response,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { User, UserRole } from './entities/user.entity';

@Controller('/api/users')
@UseGuards(RolesGuard) // Apply Role Guard to all user routes
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  @Roles('admin', 'editor') // Only Admin and Editor can list users
  @UseGuards(RolesGuard)
  getAllUsers(@Response({ passthrough: true }) response) {
    return this.usersService.getAllUsers(response);
  }

  @Patch(':id/role')
  @Roles('admin') // Only Admin can update roles
  @UseGuards(RolesGuard)
  updateUserRole(
    @Param('id') id: number,
    @Body('role') role: UserRole,
    @Response({ passthrough: true }) response,
  ) {
    return this.usersService.updateUserRole(id, role, response);
  }

  @Delete(':id')
  @Roles('admin') // Only Admin can delete users
  @UseGuards(RolesGuard)
  deleteUser(
    @Param('id') id: number,
    @Response({ passthrough: true }) response,
  ) {
    return this.usersService.deleteUser(id, response);
  }
}
