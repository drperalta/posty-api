import { createZodDto } from 'nestjs-zod';
import { PostCreateSchema, PostUpdateSchema } from '../schema/posts.schema';
import { PostSchema } from './../schema/posts.schema';

export class CreatePostDto extends createZodDto(PostCreateSchema) {}
export class UpdatePostDto extends createZodDto(PostUpdateSchema) {}
export class PostDto extends createZodDto(PostSchema) {}
