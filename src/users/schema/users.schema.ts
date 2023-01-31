import { z } from 'nestjs-zod/z';

export const UserSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  username: z.string().min(4).max(32),
  password: z
    .password()
    .min(6)
    .max(100)
    .atLeastOne('digit')
    .atLeastOne('lowercase')
    .atLeastOne('uppercase'),
});

export const UserCreateSchema = UserSchema;
export const UserUpdateSchema = UserSchema.partial();
