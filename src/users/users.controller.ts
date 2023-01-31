import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/users.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UseZodGuard } from 'nestjs-zod';
import { UserUpdateSchema } from './schema/users.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get currently logged in user details
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get currently logged in user details' })
  me(@Request() request) {
    return request.user;
  }

  // Search user by name
  @Get('search/:name')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id });
  }

  // Update user details
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
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
