import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserSchema } from 'src/users/schema/users.schema';
import { UseZodGuard } from 'nestjs-zod';
import { CreateUserDto } from 'src/users/dto/users.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({
    type: LoginDto,
    description: 'User Login',
  })
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'User Login' })
  async login(@Request() request) {
    return this.authService.login(request.user);
  }

  @Post('register')
  @UseZodGuard('body', UserSchema)
  @ApiBody({
    description: 'Register User',
    type: CreateUserDto,
  })
  @ApiOperation({ summary: 'Create new user' })
  async register(@Body() registerDto: CreateUserDto) {
    return this.authService.register(registerDto);
  }
}
