import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  excelSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Excel para Decisao Publica',
      items: [
        'excel/index',
        'excel/aula-01-tabelas-dinamicas',
        'excel/aula-02-funcoes-basicas',
        'excel/aula-03-caso-integrador',
      ],
    },
  ],
};

export default sidebars;
