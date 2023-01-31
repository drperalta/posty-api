import { Injectable } from '@nestjs/common';
import { CreateReactionDto, UpdateReactionDto } from './dto/reaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostsService } from 'src/posts/posts.service';
import { RecordNotFoundException } from 'src/common/errors';

@Injectable()
export class ReactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly postService: PostsService,
  ) {}

  /**
   * Create new reaction
   * @param userId user id
   * @param createReactDto reaction payload
   * @returns reaction details
   */
  async create(userId: string, createReactDto: CreateReactionDto) {
    await this.postService.findOne({
      id: createReactDto.postId,
    });

    return this.prisma.reaction.create({
      data: {
        ...createReactDto,
        userId,
      },
    });
  }

  /**
   * Get single reaction
   * @param id reaction id
   * @returns reaction details
   */
  async findOne(id: string) {
    const reaction = this.prisma.reaction.findUnique({
      where: {
        id,
      },
    });

    if (!reaction) throw new RecordNotFoundException({ model: 'Reaction' });

    return reaction;
  }

  /**
   * Update Reaction
   * @param id reaction id
   * @param updateReactDto update reaction payload
   * @returns updated reaction details
   */
  async update(id: string, updateReactDto: UpdateReactionDto) {
    await this.findOne(id);

    return this.prisma.reaction.update({
      where: {
        id,
      },
      data: {
        ...updateReactDto,
      },
    });
  }

  /**
   * Remove Reaction
   * @param id reaction id
   * @returns removed reaction details
   */
  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.reaction.delete({
      where: {
        id,
      },
    });
  }
}
