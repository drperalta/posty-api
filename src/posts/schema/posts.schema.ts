import { z } from 'nestjs-zod/z';
import { UserSchema } from 'src/users/schema/users.schema';

export const PostSchema = z.object({
  id: z.string(),
  content: z.string(),
  userId: z.string(),
  User: UserSchema,
  Comments: z.array(z.any()),
  Reacts: z.array(z.any()),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export const PostCreateSchema = PostSchema.pick({
  content: true,
});

export const PostUpdateSchema = PostCreateSchema;
