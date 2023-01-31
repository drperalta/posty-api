import { createZodDto } from 'nestjs-zod';
import {
  CommentCreateSchema,
  CommentSchema,
  CommentUpdateSchema,
} from '../schema/comments.schema';

export class CreateCommentDto extends createZodDto(CommentCreateSchema) {}
export class UpdateCommentDto extends createZodDto(CommentUpdateSchema) {}
export class CommentDto extends createZodDto(CommentSchema) {}
