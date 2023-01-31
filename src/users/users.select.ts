import { Prisma } from '@prisma/client';
import { PrismaSelect } from 'src/common/helpers/prismaSelect';

const prismaSelect = new PrismaSelect<Prisma.UserSelect>();

export const UserSelect = prismaSelect.get({
  id: true,
  first_name: true,
  last_name: true,
  full_name: true,
  username: true,
  email: true,
  createdAt: true,
  updatedAt: true,
});
