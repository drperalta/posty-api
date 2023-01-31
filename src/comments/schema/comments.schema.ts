import { z } from 'nestjs-zod/z';
import { PostSchema } from 'src/posts/schema/posts.schema';
import { UserSchema } from 'src/users/schema/users.schema';

export const CommentSchema = z.object({
  id: z.string(),
  comment: z.string(),
  postId: z.string(),
  Post: PostSchema,
  userId: z.string(),
  User: UserSchema,
  createAt: z.date(),
  updatedAt: z.date().nullable(),
});

export const CommentCreateSchema = CommentSchema.pick({
  comment: true,
  postId: true,
});

export const CommentUpdateSchema = CommentCreateSchema.omit({
  postId: true,
});
