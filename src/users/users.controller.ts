import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { CreateUserDto, ResponseUserDto, UpdateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() body: CreateUserDto): Promise<ResponseUserDto> {
    return this.usersService.createUser(body);
  }

  @Get()
  findAllUser(): Promise<ResponseUserDto[]> {
    return this.usersService.findAllUser();
  }

  @Get('/:userId')
  findOneUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<ResponseUserDto> {
    return this.usersService.findOneUser(userId);
  }

  @Put('/:userId')
  updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    return this.usersService.updateUser(userId, {
      username: body.username,
    });
  }

  @Delete('/:userId')
  deleteUser(@Param('userId', ParseIntPipe) userId: number): Promise<void> {
    return this.usersService.deleteUser(userId);
  }
}
