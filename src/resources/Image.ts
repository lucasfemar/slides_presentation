import { getModelByName } from '@adminjs/prisma';
import uploadFeature, { LocalUploadOptions } from '@adminjs/upload';
import { PrismaClient } from '@prisma/client';
import { ResourceWithOptions } from 'adminjs';
import { componentLoader, components } from 'src/admin/component-loader.ts';
const localProvider: LocalUploadOptions = {
  bucket: 'public/images',
  opts: {
    baseUrl: '/images',
  },
};

const image = (prisma: PrismaClient): ResourceWithOptions => ({
  resource: { model: getModelByName('Image'), client: prisma },
  options: {
    properties: {
      Ministry: { isVisible: false },
      key: {
        type: 'string',
        isVisible: false,
      },
      bucket: {
        type: 'string',
        isVisible: false,
      },
      mime: {
        type: 'string',
        isVisible: false,
      },
      userId: {
        isVisible: {
          edit: false,
        },
      },
      ministryId: {
        reference: 'Ministry',
      },
      imagem: {
        position: 999,
        isVisible: {
          edit: true,
          list: false,
          show: false,
          filter: false,
        },
      },
      imagePreview: {
        components: {
          show: components.ImagePreview,
        },
        position: 500,
        isVisible: {
          show: true,
          filter: false,
          list: false,
          edit: false,
        },
      },
      updated_at: { isVisible: false },
      created_at: { isVisible: false },
    },
  },
  features: [
    uploadFeature({
      componentLoader,
      provider: { local: localProvider },
      validation: {
        mimeTypes: ['image/jpeg', 'image/png', 'application/pdf', 'audio/mpeg'],
      },
      properties: {
        key: 'key',
        filePath: 'public/images',
        file: 'imagem',
      },
    }),
  ],
});

export default image;
