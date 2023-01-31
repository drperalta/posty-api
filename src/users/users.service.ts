import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import { UserSelect } from './users.select';
import { isPrismaError } from 'src/common/helpers/isPrismaError';
import {
  ERROR_CODE_DUPLICATE_KEY,
  ERROR_CODE_RECORD_NOT_FOUND,
} from 'src/common/constants/errorCodes';
import {
  UserAlreadyExistsException,
  UserRecordNotFoundException,
} from './users.exception';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * create service will create new user
   * @param createUserDto create user payload
   * @returns created user details
   */
  async create(createUserDto: CreateUserDto) {
    const { password, first_name, last_name } = createUserDto;

    const hashedPassword = await argon2.hash(password);

    try {
      const user = await this.prisma.user.create({
        data: {
          ...createUserDto,
          full_name: `${first_name} ${last_name}`,
          password: hashedPassword,
        },
        select: UserSelect,
      });

      return user;
    } catch (error: unknown) {
      // if user has duplicate
      if (isPrismaError(error) && error.code === ERROR_CODE_DUPLICATE_KEY) {
        throw new UserAlreadyExistsException();
      }

      throw error;
    }
  }

  /**
   * This is to search by unique property of user
   * @param whereUniqueInput user's unique property
   * @param withPassword if 'true' response will include hashed password
   * @returns single user details
   */
  async findOne(
    whereUniqueInput: Prisma.UserWhereUniqueInput,
    withPassword?: boolean,
  ) {
    const user = await this.prisma.user.findUnique({
      where: whereUniqueInput,
      select: {
        ...UserSelect,
        password: withPassword ? withPassword : false,
      },
    });

    if (!user) throw new UserRecordNotFoundException();

    return user;
  }

  /**
   * findByName service is for search users by name
   * @param name users name
   * @returns array of users
   */
  findByName(name: string) {
    return this.prisma.user.findMany({
      where: {
        full_name: {
          contains: name,
        },
      },
      select: UserSelect,
    });
  }

  /**
   * This is to update user details partially
   * @param id user id
   * @param updateUserDto user payload
   * @returns updated user details
   */
  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id,
        },
        data: updateUserDto,
        select: UserSelect,
      });

      return user;
    } catch (error: unknown) {
      if (isPrismaError(error) && error.code === ERROR_CODE_RECORD_NOT_FOUND) {
        throw new UserRecordNotFoundException();
      }

      throw error;
    }
  }
}
