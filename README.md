# STI Materials

Site da UC **Sistemas e Tecnologias de Informacao (MAP)** publicado com MkDocs Material e GitHub Pages.

## Modulos

- **Excel para Decisao Publica** (Aulas 1–3): Tabelas Dinamicas, funcoes condicionais, caso integrador
- **BPMN — Processos na AP** (Aulas 4–5): Mapeamento AS-IS, redesenho TO-BE com SI

## Estrutura

- `docs/` — conteudos didaticos (Markdown)
- `docs/assets/` — CSS, ficheiros para download
- `mkdocs.yml` — configuracao do site
- `.github/workflows/deploy.yml` — deploy automatico para GitHub Pages

## Desenvolvimento local

```bash
pip install -r requirements.txt
mkdocs serve
```

## Publicacao

Push para `main` → GitHub Actions publica automaticamente.
