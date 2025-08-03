import { PrismaClient } from '@prisma/client';
import { ResourceWithOptions } from 'adminjs';

import ministry from './ministry.ts';
import slideConfig from './slideConfig.ts';
import slideConfigImage from './slideConfigImage.ts';
import user from './user.ts';
import userSession from './userSession.ts';
import image from './image.ts';

const Resources = (prisma: PrismaClient): ResourceWithOptions[] => [
  user(prisma),
  userSession(prisma),
  ministry(prisma),
  image(prisma),
  slideConfig(prisma),
  slideConfigImage(prisma),
];

export default Resources;
