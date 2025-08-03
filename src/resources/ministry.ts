import { getModelByName } from '@adminjs/prisma';
import { PrismaClient } from '@prisma/client';
import { ResourceWithOptions } from 'adminjs';

const ministry = (prisma: PrismaClient): ResourceWithOptions => ({
  resource: { model: getModelByName('Ministry'), client: prisma },
  options: {},
});

export default ministry;
