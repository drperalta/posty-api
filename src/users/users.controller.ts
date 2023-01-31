import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/users.dto';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { UseZodGuard } from 'nestjs-zod';
import { UserUpdateSchema } from './schema/users.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Search user by name
  @Get('search/:name')
  @ApiParam({
    name: 'name',
    type: String,
  })
  @ApiOperation({ summary: 'Find User by name' })
  findByName(@Param('name') name: string) {
    return this.usersService.findByName(name);
  }

  // Get single user by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id });
  }

  // Update user details
  @Patch(':id')
  @ApiOperation({ summary: 'Update User' })
  @UseZodGuard('body', UserUpdateSchema)
  @ApiBody({
    description: 'Update User',
    type: UpdateUserDto,
  })
  @ApiParam({
    name: 'id',
    type: String,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
}
