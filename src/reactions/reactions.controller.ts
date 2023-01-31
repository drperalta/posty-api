import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { CreateReactionDto, UpdateReactionDto } from './dto/reaction.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseZodGuard } from 'nestjs-zod';
import { ReactionCreateSchema } from './schema/reactions.schema';

@ApiBearerAuth()
@Controller('reactions')
@ApiTags('Reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  // Create Reaction
  @Post()
  @ApiOperation({ summary: 'Create Reaction' })
  @UseGuards(JwtAuthGuard)
  @UseZodGuard('body', ReactionCreateSchema)
  @ApiBody({
    type: CreateReactionDto,
    description: 'Create Reaction',
  })
  create(@Request() request, @Body() createReactDto: CreateReactionDto) {
    return this.reactionsService.create(request.user.id, createReactDto);
  }

  // Update Reaction
  @Patch(':id')
  @ApiOperation({ summary: 'Update Reaction' })
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: UpdateReactionDto,
    description: 'Update Reaction',
  })
  update(@Param('id') id: string, @Body() updateReactDto: UpdateReactionDto) {
    return this.reactionsService.update(id, updateReactDto);
  }

  // Remove reaction
  @Delete(':id')
  @ApiOperation({ summary: 'Delete Reaction' })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.reactionsService.remove(id);
  }
}
