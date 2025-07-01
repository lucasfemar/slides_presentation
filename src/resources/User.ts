import { getModelByName } from '@adminjs/prisma';
import { PrismaClient } from '@prisma/client';
import { ResourceWithOptions } from 'adminjs';

const User = (prisma: PrismaClient): ResourceWithOptions => ({
  resource: { model: getModelByName('User'), client: prisma },
  options: {},
});

export default User;
  