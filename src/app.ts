import express from 'express';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import AdminJS from 'adminjs';
import { buildAuthenticatedRouter } from '@adminjs/express';
import { Database, Resource, getModelByName } from '@adminjs/prisma';
import { PrismaClient } from '@prisma/client';
import componentLoader from './admin/component-loader.ts';
import provider from './admin/auth-provider.ts';
import Resources from './resources/index.ts';

dotenvExpand.expand(dotenv.config());

const prisma = new PrismaClient();
AdminJS.registerAdapter({ Database, Resource });


const port = process.env.PORT || 3000;

const start = async () => {
  const adminOptions = {
    componentLoader,
    rootPath: '/admin',
    resources: Resources(prisma),
  };

  const admin = new AdminJS(adminOptions);

  if (process.env.NODE_ENV === 'production') {
    await admin.initialize();
  } else {
    admin.watch();
  }

  const app = express();

  const router = buildAuthenticatedRouter(
    admin,
    {
      cookiePassword: process.env.COOKIE_SECRET,
      cookieName: 'adminjs',
      provider,
    },
    null,
    {
      secret: process.env.COOKIE_SECRET,
      saveUninitialized: true,
      resave: true,
    }
  );

  app.use(admin.options.rootPath, router);

  app.listen(port, () => {
    console.log(`🟢 AdminJS disponível em http://localhost:${port}${admin.options.rootPath}`);
  });
};

start();
