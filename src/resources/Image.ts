import { getModelByName } from '@adminjs/prisma';
import { PrismaClient } from '@prisma/client';
import { ResourceWithOptions } from 'adminjs';

const Image = (prisma: PrismaClient): ResourceWithOptions => ({
  resource: { model: getModelByName('Image'), client: prisma },
  options: {},
});

export default Image;
