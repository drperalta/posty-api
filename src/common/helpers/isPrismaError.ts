import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export const isPrismaError = (
  error: unknown,
): error is PrismaClientKnownRequestError =>
  error instanceof PrismaClientKnownRequestError;
