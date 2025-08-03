import { buildRouter } from '@adminjs/express';
import { Database, Resource } from '@adminjs/prisma';
import { PrismaClient } from '@prisma/client';
import AdminJS, { AdminJSOptions } from 'adminjs';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import express from 'express';
import path from 'path';
import * as url from 'url';
import { componentLoader } from './admin/component-loader.ts';
import Resources from './resources/index.ts';

dotenvExpand.expand(dotenv.config());

const prisma = new PrismaClient();
AdminJS.registerAdapter({ Database, Resource });

const port = process.env.PORT || 3000;

const start = async () => {
  const adminOptions: AdminJSOptions = {
    componentLoader,
    rootPath: '/admin',
    resources: Resources(prisma).map((r) => {
      return {
        ...r,
        options: {
          ...r.options,
          navigation: null,
        },
      };
    }),

    // locale: locale
  };

  const admin = new AdminJS(adminOptions);

  if (process.env.NODE_ENV === 'production') {
    await admin.initialize();
  } else {
    admin.watch();
  }

  const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
  const app = express();
  app.use(express.static(path.join(__dirname, '../public')));

  const adminRouter = buildRouter(admin);
  // const adminRouter = buildAuthenticatedRouter(
  //   admin,
  //   {
  //     cookiePassword: process.env.COOKIE_SECRET,
  //     cookieName: 'adminjs',
  //     provider,
  //   },
  //   null,
  //   {
  //     secret: process.env.COOKIE_SECRET,
  //     saveUninitialized: true,
  //     resave: true,
  //   }
  // );

  app.use(admin.options.rootPath, adminRouter);

  app.listen(port, () => {
    console.log(`🟢 AdminJS disponível em http://localhost:${port}${admin.options.rootPath}`);
  });
};

start();
