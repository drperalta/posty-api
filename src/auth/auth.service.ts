import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/users.dto';
import { UsersService } from 'src/users/users.service';
import { InvalidCredentialsException } from './auth.exception';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    console.log('LOG VALIDATE');
    const user = await this.usersService.findOne({ username }, true);

    if (!user) throw new InvalidCredentialsException();

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass, ...result } = user;
    return result;
  }

  async login({ username, id }: Prisma.UserSelect) {
    const payload = { username, sub: id };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: CreateUserDto) {
    return this.usersService.create(registerDto);
  }
}
