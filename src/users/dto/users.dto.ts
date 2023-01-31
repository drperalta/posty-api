import { createZodDto } from 'nestjs-zod';
import { UserCreateSchema, UserUpdateSchema } from '../schema/users.schema';

export class CreateUserDto extends createZodDto(UserCreateSchema) {}
export class UpdateUserDto extends createZodDto(UserUpdateSchema) {}
