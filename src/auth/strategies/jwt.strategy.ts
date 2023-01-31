import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { z } from 'nestjs-zod/z';
import { TokenSchema } from '../schema/auth.schema';
import { CONFIG } from 'src/common/constants/config';
import { RecordNotFoundException } from 'src/common/errors';

type JWTTokenType = z.infer<typeof TokenSchema>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: CONFIG.JWT_TOKEN_SECRET,
    });
  }

  async validate(token: JWTTokenType) {
    const user = await this.userService.findOne({ id: token.sub });

    if (!user) throw new RecordNotFoundException({ model: 'User' });

    return user;
  }
}
