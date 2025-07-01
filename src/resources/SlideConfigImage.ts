import { getModelByName } from '@adminjs/prisma';
import { PrismaClient } from '@prisma/client';
import { ResourceWithOptions } from 'adminjs';

const SlideConfigImage = (prisma: PrismaClient): ResourceWithOptions => ({
  resource: { model: getModelByName('SlideConfigImage'), client: prisma },
  options: {},
});

export default SlideConfigImage;
