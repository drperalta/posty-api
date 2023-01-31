import { Injectable } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto/posts.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostSelect } from './posts.select';
import { Prisma } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { RecordNotFoundException } from 'src/common/errors';

@Injectable()
export class PostsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
  ) {}

  /**
   * Create Post
   * @param userId user id
   * @param createPostDto post details payload
   * @returns created post
   */
  create(userId: string, createPostDto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        ...createPostDto,
        userId,
      },
      select: PostSelect,
    });
  }

  /**
   * Get all user's posts
   * @param userId user id
   * @returns array of user's posts
   */
  async findAllByUserId(userId: string) {
    const user = await this.userService.findOne({ id: userId });

    return this.prisma.post.findMany({
      where: { userId: user.id },
      select: PostSelect,
    });
  }

  /**
   * Get all post by date
   * @returns array of posts filter by date descending
   */
  findAll() {
    return this.prisma.post.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
      select: PostSelect,
    });
  }

  /**
   * Get single post by unique properties
   * @param whereUniqueInput unique property of post
   * @returns single post
   */
  async findOne(whereUniqueInput: Prisma.PostWhereUniqueInput) {
    const post = await this.prisma.post.findUnique({
      where: whereUniqueInput,
      select: PostSelect,
    });

    if (!post) throw new RecordNotFoundException({ model: 'Post' });

    return post;
  }

  /**
   * Update Post
   * @param id post id
   * @param updatePostDto post details payload
   * @returns updated post
   */
  async update(id: string, updatePostDto: UpdatePostDto) {
    await this.findOne({ id });

    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
      select: PostSelect,
    });
  }

  /**
   * Remove Post
   * @param id post id
   * @returns removed post details
   */
  async remove(id: string) {
    await this.findOne({ id });

    return this.prisma.post.delete({
      where: {
        id,
      },
      select: PostSelect,
    });
  }
}
