import { getModelByName } from '@adminjs/prisma';
import { PrismaClient } from '@prisma/client';
import { ResourceWithOptions } from 'adminjs';

const SlideConfig = (prisma: PrismaClient): ResourceWithOptions => ({
  resource: { model: getModelByName('SlideConfig'), client: prisma },
  options: {},
});

export default SlideConfig;
