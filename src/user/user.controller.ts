import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, NotFoundException } from '@nestjs/common';

import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';
import { Serialize } from '../common/interceptors/serialize.interceptor';

@ApiTags('Users')
@Serialize(UserDto)
@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: UserDto,
    isArray: true,
    description: 'Returns a list of users',
  })
  getUsers() {
    return this.userService.fetchAll();
  }

  @Get(':id')
  async getUserById(id: string) {
    const record = await this.userService.fetchById(id);
    if (!record) {
      throw new NotFoundException('User not found');
    }
  }
}
