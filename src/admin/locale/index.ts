import { locales as AdminJSLocales, AdminJSLocalesConfig, Locale } from 'adminjs';

const locale: Locale = {
  language: 'pt',
  availableLanguages: ['en', 'pt'],
  localeDetection: true,
  translations: {
    pt: {
      // labels: {
      //   User: 'Usuários',
      //   Image: 'Imagens',
      //   Ministry: 'Ministério',
      // },
      properties: {
        title: 'Título',
        name: 'Nome',
        password: 'Senha',
        phone: 'Telefone',
        expire_at: 'Expira em',
        created_at: 'Criado em',
        updated_at: 'Atualizado em',
        ministry: 'Ministério',
        ministryId: 'Ministério',
      },
      resources: {
        Image: {
          properties: {},
        },
      },
    },
  },
};
export default locale;
