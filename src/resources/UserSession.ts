import { getModelByName } from '@adminjs/prisma';
import { PrismaClient } from '@prisma/client';
import { ResourceWithOptions } from 'adminjs';

const UserSession = (prisma: PrismaClient): ResourceWithOptions => ({
  resource: { model: getModelByName('UserSession'), client: prisma },
  options: {},
});

export default UserSession;
