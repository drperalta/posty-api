import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from './dto/comments.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UseZodGuard } from 'nestjs-zod';
import { CommentCreateSchema } from './schema/comments.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // Create comment
  @Post()
  @ApiOperation({ summary: 'Create Comment' })
  @UseZodGuard('body', CommentCreateSchema)
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: CreateCommentDto,
    description: 'Create Comment',
  })
  create(@Request() request, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(request.user.id, createCommentDto);
  }

  // Get comment by post id
  @Get()
  @ApiOperation({ summary: 'Get Comments by Post Id' })
  @UseGuards(JwtAuthGuard)
  @ApiQuery({
    name: 'post',
    type: String,
    required: true,
  })
  findByPostId(@Query('post') postId) {
    return this.commentsService.findAllByPostId(postId);
  }

  // Get single comment
  @Get(':id')
  @ApiOperation({ summary: 'Get Single Comment' })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  // Update comment
  @Patch(':id')
  @ApiOperation({ summary: 'Update comment' })
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  // Remove comment
  @Delete(':id')
  @ApiOperation({ summary: 'Remove comment' })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
