import { Prisma } from '@prisma/client';
import { PrismaSelect } from 'src/common/helpers/prismaSelect';
import { userPrismaSelect } from 'src/users/users.select';

export const postPrismaSelect = new PrismaSelect<Prisma.PostSelect>();

export const PostUserSelect = userPrismaSelect.get({
  id: true,
  full_name: true,
  last_name: true,
  first_name: true,
});

export const PostSelect = postPrismaSelect.get({
  id: true,
  content: true,
  User: {
    select: PostUserSelect,
  },
  createdAt: true,
  updatedAt: true,
});
