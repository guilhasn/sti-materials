import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'STI | Excel para Decisao Publica',
  tagline: 'Materiais da UC Sistemas e Tecnologias de Informacao (MAP)',
  favicon: 'img/logo.svg',
  future: {
    v4: true,
  },
  url: 'https://guilhasn.github.io',
  baseUrl: '/sti-materials/',
  organizationName: 'guilhasn',
  projectName: 'sti-materials',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/guilhasn/sti-materials/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/logo.svg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'STI | MAP',
      logo: {
        alt: 'STI MAP',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/', label: 'Inicio', position: 'left'},
        {
          type: 'docSidebar',
          sidebarId: 'excelSidebar',
          position: 'left',
          label: 'Excel (Aulas 1-3)',
        },
        {
          href: 'https://github.com/guilhasn/sti-materials',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Modulo',
          items: [
            {
              label: 'Excel para Decisao Publica',
              to: '/docs/excel',
            },
          ],
        },
        {
          title: 'Conteudos',
          items: [
            {
              label: 'Aula 1',
              to: '/docs/excel/aula-01-tabelas-dinamicas',
            },
            {
              label: 'Aula 2',
              to: '/docs/excel/aula-02-funcoes-basicas',
            },
            {
              label: 'Aula 3',
              to: '/docs/excel/aula-03-caso-integrador',
            },
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} STI MAP | ESTG Leiria`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.github,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
