import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Get,
  Query,
} from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { CreateReactionDto, UpdateReactionDto } from './dto/reaction.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseZodGuard } from 'nestjs-zod';
import { ReactionCreateSchema } from './schema/reactions.schema';
import { React } from '@prisma/client';

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

  // Get post reaction count
  @Get()
  @ApiOperation({ summary: 'Count Reactions by user id and react' })
  @UseGuards(JwtAuthGuard)
  @ApiQuery({
    name: 'postId',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'userId',
    type: String,
    required: false,
  })
  findMany(@Query('postId') postId?: string, @Query('userId') userId?: string) {
    if (!postId && !userId) return [];

    return this.reactionsService.findMany({ postId, userId });
  }

  @Get('count')
  @ApiOperation({ summary: 'Count Reactions by user id and react' })
  @UseGuards(JwtAuthGuard)
  @ApiQuery({
    name: 'postId',
    type: String,
  })
  @ApiQuery({
    name: 'react',
    enum: React,
    required: false,
  })
  count(@Query('postId') postId: string, @Query('react') react?: React) {
    return this.reactionsService.count(postId, react);
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
