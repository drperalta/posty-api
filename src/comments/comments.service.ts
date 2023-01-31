import { Injectable } from '@nestjs/common';
import { CreateCommentDto, UpdateCommentDto } from './dto/comments.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostsService } from 'src/posts/posts.service';
import { RecordNotFoundException } from 'src/common/errors';

@Injectable()
export class CommentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly postService: PostsService,
  ) {}

  /**
   * Create comment
   * @param userId user id
   * @param createCommentDto comment payload
   * @returns comment details
   */
  async create(userId: string, createCommentDto: CreateCommentDto) {
    await this.postService.findOne({
      id: createCommentDto.postId,
    });

    return this.prisma.comment.create({
      data: {
        ...createCommentDto,
        userId,
      },
    });
  }

  /**
   * Get all comments by post id
   * @param postId post's id where the comments are
   * @returns array of comments
   */
  async findAllByPostId(postId: string) {
    await this.postService.findOne({
      id: postId,
    });

    return this.prisma.comment.findMany({
      where: {
        postId,
      },
    });
  }

  /**
   * Get single comment
   * @param id comment id
   * @returns single comment
   */
  async findOne(id: string) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    });

    if (!comment) throw new RecordNotFoundException({ model: 'Comment' });

    return comment;
  }

  /**
   * Update comment details
   * @param id comment id
   * @param updateCommentDto comment payload
   * @returns updated comment details
   */
  async update(id: string, updateCommentDto: UpdateCommentDto) {
    await this.findOne(id);

    return this.prisma.comment.update({
      where: {
        id,
      },
      data: {
        ...updateCommentDto,
      },
    });
  }

  /**
   * Remove comment
   * @param id comment id
   * @returns removed comment details
   */
  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.comment.delete({
      where: {
        id,
      },
    });
  }
}
