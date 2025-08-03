import { getModelByName } from '@adminjs/prisma';
import { PrismaClient } from '@prisma/client';
import { ResourceWithOptions } from 'adminjs';

const slideConfigImage = (prisma: PrismaClient): ResourceWithOptions => ({
  resource: { model: getModelByName('SlideConfigImage'), client: prisma },
  options: {},
});

export default slideConfigImage;
