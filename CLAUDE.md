# CLAUDE.md — STI Materials · Mestrado em Administração Pública
Este ficheiro define o contexto completo do projecto para o Claude Code.
Ler sempre antes de qualquer acção no repositório.
---
## Identidade do projecto
- **Site:** https://guilhasn.github.io/sti-materials/
- **Repo:** https://github.com/guilhasn/sti-materials
- **Stack:** MkDocs Material + GitHub Pages
- **Deploy:** automático via GitHub Actions em push para `main`
- **Docente:** Nuno Salvador — ESTG-IPL, Leiria
---
## UC e contexto pedagógico
- **UC:** Sistemas e Tecnologias de Informação (STI)
- **Programa:** Mestrado em Administração Pública (MAP)
- **Escola:** ESTG-IPL — Escola Superior de Tecnologia e Gestão
- **Ano lectivo:** 2025/2026
- **14 aulas** — TP1 na Aula 10 (05/05) · TP2 na Aula 14 (02/06)
### Audiência — quem são os alunos
Mestrandos profissionais em exercício:
- Técnicos e dirigentes de câmaras municipais e juntas de freguesia
- Docentes e técnicos de escolas e agrupamentos
- Solicitadores e notários
- Minoria: recém-licenciados
**Regras de linguagem obrigatórias:**
- Séria e rigorosa — nunca condescendente
- Exemplos sempre do quotidiano real da AP portuguesa
- Nível de mestrado — sem simplificações excessivas
- Contexto pós-laboral (alunos chegam cansados do trabalho)
---
## Caso âncora — Tempestade Kristin / CMP Pombal
Fio condutor de toda a UC:
- Câmara Municipal de Pombal a gerir as consequências da Tempestade Kristin (fictício mas realista)
- Dataset: `Atendimentos_Pombal_2025.xlsx` — 4 847 registos, 5 serviços, 12 freguesias
- 692 ocorrências registadas · 287 sem intervenção (41%)
- Dataset contratos: `Contratos_AP_Pombal_2025.xlsx` — 120 registos, 9 colunas
---
## Estrutura do site
```
docs/
  index.md                    # Página inicial
  excel/
    index.md                  # Módulo Excel
    aula-01.md                # Tabelas Dinâmicas
    aula-02.md                # CONTAR.SE · SOMA.SE · SE
    aula-03.md                # CONT.SES · SOMASES · campo calculado
  bpmn/
    index.md                  # Notação BPMN 2.0 (referência completa + guia bpmn.io)
    aula-04.md                # Mapeamento AS-IS
    aula-05.md                # Redesenho TO-BE com SI
    exercicios.md             # Exercícios práticos (hospital, universidade, PSP, junta)
  assets/
    ipl.css                   # Tema visual IPL (#0F4C81)
    logo_ipl.png              # Logo IPL — não apagar
    files/                    # Datasets e PDFs para download
```
---
## Plano de aulas — o que falta criar
| Aula | Data | Tema | Estado |
|------|------|------|--------|
| 1–3 | Feb–Mar | Excel | ✅ Feito |
| 4–5 | Mar | BPMN | ✅ Feito |
| 6 | 31/Mar | Modelo E-R — entidades e relacionamentos | ❌ Falta |
| 7 | 07/Abr | Modelo E-R — normalização até 3FN | ❌ Falta |
| 8 | 14/Abr | IA generativa — casos de uso AP, prototipagem HTML | ❌ Falta |
| 9 | 28/Abr | Power BI — Power Query, visuais básicos | ❌ Falta |
| 11–12 | Mai | e-Gov e qualidade de serviços digitais | ❌ Falta |
---
## Ferramentas da UC
| Ferramenta | Âmbito | Restrições |
|-----------|--------|-----------|
| Excel | Tabelas Dinâmicas, COUNTIFS, SUMIFS | — |
| BPMN | AS-IS e TO-BE no bpmn.io | Notação BPMN 2.0 |
| Modelo E-R | Entidades, atributos, cardinalidade | Até 3FN |
| Power BI | Power Query, visuais básicos, slicers | **SEM DAX — proibido** |
| IA Generativa | Prototipagem HTML, avaliação crítica | Claude, ChatGPT |
**Nunca mencionar:** DAX, Access, SQL, linguagens de programação.
---
## Design visual — regras obrigatórias
```
Cor dominante:  #0F4C81  (azul IPL)
Acento:         #F2C811  (amarelo)
Navy escuro:    #0D1B2A  (footer, separadores)
```
### Admonitions a usar nas páginas
```markdown
!!! note "Título"       → azul   — informação, conceito
!!! tip "Título"        → verde  — dica prática
!!! warning "Título"    → amarelo — atenção, cuidado
!!! danger "Título"     → vermelho — erro crítico, nunca fazer
!!! abstract "Título"   → roxo   — objectivo, contexto
!!! info "Título"       → ciano  — referência, ferramenta
```
### Badges de aula (HTML inline no Markdown)
```html
<span class="aula-badge">Aula X</span>
<span class="duracao-badge">YY min</span>
```
---
## Regra absoluta — separação teoria / prática
**Nunca misturar teoria e conteúdo de avaliação no mesmo ficheiro.**
As páginas deste site são materiais de apoio à prática — não slides de teoria,
não enunciados de avaliação.
---
## Estrutura padrão de uma página de aula
```markdown
# Aula N — Título
<span class="aula-badge">Aula N</span><span class="duracao-badge">XX min</span>
## Objectivos
- [ ] Objectivo 1
- [ ] Objectivo 2
---
## Conceitos-chave
[tabela ou lista]
!!! note "Nota relevante"
    Conteúdo.
---
## Exercício
[contexto + tarefas numeradas]
!!! warning "Atenção"
    Erro comum.
!!! danger "Erro crítico"
    O que nunca fazer.
!!! tip "Dica"
    Sugestão prática.
---
## Downloads
- 📥 [ficheiro.xlsx](__../assets/files/ficheiro.xlsx__)
- 📄 [Ficha N (PDF)](__../assets/files/FichaN_STIMAP.pdf__)
```
---
## Workflow de desenvolvimento
### Adicionar uma nova aula
1. Criar `docs/[bloco]/aula-NN.md` seguindo a estrutura padrão acima
2. Adicionar entrada no `nav:` do `mkdocs.yml`
3. Testar localmente: `mkdocs serve`
4. Commit e push → GitHub Actions publica automaticamente
### Testar localmente
```bash
pip install -r requirements.txt   # só na primeira vez
mkdocs serve                       # → http://127.0.0.1:8000
```
### Publicar
```bash
git add -A
git commit -m "descrição clara da alteração"
git push origin main
# GitHub Actions publica em ~2 minutos
```
---
## Referências recorrentes
| Referência | Contexto |
|-----------|---------|
| EDN — Estratégia Digital Nacional | Enquadramento estratégico |
| DESI 2023 — Portugal posição 13.º EU-27 | Indicadores SI |
| AI Act (UE 2024/1689) | Módulo IA |
| CCP — Código dos Contratos Públicos | Dataset contratos, TP2 |
| bpmn.io | Ferramenta BPMN gratuita |
| omg.org/spec/BPMN/2.0 | Especificação oficial BPMN |
| AMA — Agência para a Modernização Administrativa | Recomendações AP |
---
## O que NUNCA fazer
- Misturar teoria e avaliação no mesmo ficheiro
- Mencionar DAX no Power BI (nem como alternativa)
- Exemplos de empresas privadas quando existe equivalente público
- Criar exercícios de Access ou SQL
- Remover o `logo_ipl.png` de `docs/assets/`
- Alterar as cores IPL definidas no `ipl.css`
