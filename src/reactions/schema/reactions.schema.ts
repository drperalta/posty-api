import { React } from '@prisma/client';
import { z } from 'nestjs-zod/z';
import { PostSchema } from 'src/posts/schema/posts.schema';
import { UserSchema } from 'src/users/schema/users.schema';

export const ReactionSchema = z.object({
  id: z.string(),
  react: z.enum([React.LIKE, React.DISLIKE]),
  postId: z.string(),
  Post: PostSchema,
  userId: z.string(),
  User: UserSchema,
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export const ReactionCreateSchema = ReactionSchema.pick({
  reaction: true,
  postId: true,
});

export const ReactionUpdateSchema = ReactionCreateSchema.omit({
  postId: true,
});
