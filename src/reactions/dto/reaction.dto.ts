import { createZodDto } from 'nestjs-zod';
import {
  ReactionUpdateSchema,
  ReactionCreateSchema,
} from '../schema/reactions.schema';

export class CreateReactionDto extends createZodDto(ReactionCreateSchema) {}
export class UpdateReactionDto extends createZodDto(ReactionUpdateSchema) {}
