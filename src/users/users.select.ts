import { Prisma } from '@prisma/client';
import { PrismaSelect } from 'src/common/helpers/prismaSelect';

export const userPrismaSelect = new PrismaSelect<Prisma.UserSelect>();

export const UserSelect = userPrismaSelect.get({
  id: true,
  first_name: true,
  last_name: true,
  full_name: true,
  username: true,
  email: true,
  createdAt: true,
  updatedAt: true,
});
