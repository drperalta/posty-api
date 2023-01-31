import { createZodDto } from 'nestjs-zod';
import { LoginSchema } from '../schema/auth.schema';

export class LoginDto extends createZodDto(LoginSchema) {}
