# STI Materials

Site da UC **Sistemas e Tecnologias de Informacao (MAP)** publicado com Docusaurus e GitHub Pages.

## Escopo atual

Bloco **Excel para Decisao Publica** (Aulas 1-3):

- Aula 1: Tabelas Dinamicas + `CONTAR`, `SOMA`, `MEDIA`, `MAXIMO`, `MINIMO`
- Aula 2: `CONTAR.SE`, `SOMA.SE`, `SE`
- Aula 3: Caso integrador em contexto de Administracao Publica

## Estrutura

- `docs/` conteudos didaticos
- `static/files/excel/` datasets, fichas e resolucoes
- `src/css/` tema visual institucional
- `.github/workflows/deploy.yml` deploy para GitHub Pages

## Desenvolvimento local

```bash
npm ci
npm start
```

## Build

```bash
npm run build
npm run serve
```

## Publicacao

A publicacao ocorre automaticamente em push para `main` via GitHub Actions.
