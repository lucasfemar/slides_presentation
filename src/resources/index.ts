import { PrismaClient } from '@prisma/client';
import { ResourceWithOptions } from 'adminjs';

import User from './User.ts';
import UserSession from './UserSession.ts';
import Image from './Image.ts';
import SlideConfig from './SlideConfig.ts';
import SlideConfigImage from './SlideConfigImage.ts';

const Resources = (prisma: PrismaClient): ResourceWithOptions[] => [
  User(prisma),
  UserSession(prisma),
  Image(prisma),
  SlideConfig(prisma),
  SlideConfigImage(prisma),
];

export default Resources;
