# STI Materials

Site da UC **Sistemas e Tecnologias de Informação (MAP)** publicado com MkDocs Material e GitHub Pages.

## Módulos

- **Excel para Decisão Pública** (Aulas 1–3): Tabelas Dinâmicas, funções condicionais, caso integrador
- **BPMN — Processos na AP** (Aulas 4–5): Mapeamento AS-IS, redesenho TO-BE com SI

## Estrutura

- `docs/` — conteúdos didácticos (Markdown)
- `docs/assets/` — CSS, ficheiros para download
- `mkdocs.yml` — configuração do site
- `.github/workflows/deploy.yml` — deploy automático para GitHub Pages

## Desenvolvimento local

```bash
pip install -r requirements.txt
mkdocs serve
```

## Publicação

Push para `main` → GitHub Actions publica automaticamente.
