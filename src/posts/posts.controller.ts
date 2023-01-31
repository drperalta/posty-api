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
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from './dto/posts.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UseZodGuard } from 'nestjs-zod';
import { PostCreateSchema } from './schema/posts.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Create Post
  @Post()
  @ApiOperation({ summary: 'Create User Post' })
  @UseZodGuard('body', PostCreateSchema)
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: CreatePostDto,
    description: 'Create Post',
  })
  create(@Request() request, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(request.user.id, createPostDto);
  }

  // Get all post by user id
  @Get()
  @ApiOperation({ summary: 'Get post by id' })
  @UseGuards(JwtAuthGuard)
  @ApiQuery({
    name: 'userId',
    type: String,
    required: false,
  })
  findAll(@Query('userId') userId?: string) {
    if (!userId) return this.postsService.findAll();

    return this.postsService.findAllByUserId(userId);
  }

  // Get all logged in user posts
  @Get('me')
  @ApiOperation({ summary: 'Get all logged in users posts' })
  @UseGuards(JwtAuthGuard)
  findAllByUserId(@Request() request) {
    return this.postsService.findAllByUserId(request.user.id);
  }

  // Get post by id
  @Get(':id')
  @ApiOperation({ summary: 'Get post by id' })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.postsService.findOne({ id });
  }

  // Update Post
  @Patch(':id')
  @ApiOperation({ summary: 'Update user post' })
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  // Remove Post
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user post' })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
