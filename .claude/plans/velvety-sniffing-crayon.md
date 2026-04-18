# Plano: Simplificar o módulo E-R para alunos de AP

## Contexto

O módulo de Modelação de Dados (Aulas 6-8) tem bom conteúdo mas é **demasiado denso** para alunos de Mestrado em Administração Pública que nunca viram bases de dados. A análise identificou 3 problemas críticos e vários médios que podem causar confusão.

## Problemas identificados

### CRÍTICOS (confundem os alunos)

1. **index.md demasiado longo (329 linhas) e denso** — funciona como referência enciclopédica, não como introdução. Mistura conceitos básicos, 7 regras de conversão, tutorial ERDPlus e erros comuns tudo de uma vez.

2. **Aula 08: sobrecarga cognitiva** — normalização (novo) + 9 fases (novo) + chaves candidatas (novo) + definição de domínios (novo) + chaves compostas (novo), tudo numa aula. Para alunos de AP é demasiado.

3. **Conceito de "pressuposto" mal introduzido** — a aula 07 usa o termo sem o definir claramente. Os alunos de AP não sabem o que é uma "regra de negócio". É essencial porque os pressupostos determinam cardinalidade e participação.

### MÉDIOS

4. **Notação de participação inconsistente** — index.md menciona "linha dupla" E "traço vertical" sem dizer qual usar no curso.
5. **Regras 1:1 (Regras 1-3) subdesenvolvidas** — 3 regras em 5 linhas, sem explicar o porquê.
6. **Salto BPMN→E-R abrupto na aula 07** — não liga explicitamente os conceitos das aulas 06→07.
7. **Falta de exemplos visuais** — muitas tabelas de texto, poucos diagramas conceptuais.
8. **Exercícios guiados (casos-guiados.md) com relação ternária (Caso 3 IPSS)** — conceito avançado demais para este nível.

## Plano de acção (por prioridade)

### 1. Simplificar index.md — De enciclopédia a "folha de consulta"
**Ficheiro:** `docs/er/index.md`
- Reduzir de 329 para ~150 linhas
- Manter: motivação AP, tabela de elementos E-R, analogia BPMN↔E-R, pré-requisitos
- Mover tutorial ERDPlus para dentro da aula-06.md (onde os alunos vão usá-lo)
- Simplificar regras de conversão: mostrar apenas as 3 mais comuns (Regra 4, 5, 6) com exemplos AP curtos
- Agrupar Regras 1-3 (1:1) num bloco "casos menos frequentes"
- Remover tabela de erros comuns (pertence mais à auto-avaliação)

### 2. Definir "pressuposto" claramente na aula 07
**Ficheiro:** `docs/er/aula-07.md`
- Adicionar definição explícita antes da tabela: "Um pressuposto é uma regra que descreve como as coisas funcionam na organização. Exemplo: 'Cada evento realiza-se em pelo menos um espaço' — é um pressuposto que nos diz que a participação é obrigatória."
- Adicionar coluna "Porquê?" na tabela de pressupostos
- Adicionar frase de transição: "Lembram-se da Aula 6, quando perguntámos 'um evento pode ter vários espaços?' — essa resposta é o pressuposto."

### 3. Descomprimir aula 08
**Ficheiro:** `docs/er/aula-08.md`
- Manter Fases 1-7 (conceptuais, E-R puro)
- Simplificar/reduzir Fase 9 (domínio): mostrar apenas 1 tabela exemplo em vez de todas
- Adicionar nota: "A Fase 9 é tipicamente feita pelo programador, mas é útil compreender o conceito"
- Suavizar linguagem sobre normalização: "cobrem a maioria dos casos" em vez de "resultado é o mesmo"
- Explicar chaves compostas com analogia: "É como um bilhete de avião: precisa do nº voo + nº passageiro para ser único"

### 4. Melhorar transições entre aulas
**Ficheiros:** `docs/er/aula-06.md`, `docs/er/aula-07.md`
- Aula 06: adicionar nota no final sobre M:N → "veremos na Aula 7 como isto se transforma em tabelas"
- Aula 07: adicionar frase inicial ligando ao aula 06

### 5. Simplificar Caso 3 dos exercícios guiados
**Ficheiro:** `docs/er/casos-guiados.md`
- Eliminar relação ternária do Caso 3 (IPSS) — substituir por relações binárias mais simples
- Ou substituir o cenário inteiro por algo mais simples com apenas 1:N e M:N

### 6. Padronizar notação de participação
**Ficheiro:** `docs/er/index.md`
- Escolher UMA notação (a que o ERDPlus usa) e ser explícito: "Neste curso usamos..."

## Ficheiros a modificar

| Ficheiro | Tipo de alteração |
|----------|-------------------|
| `docs/er/index.md` | Reduzir ~50%, mover tutorial para aula-06 |
| `docs/er/aula-06.md` | Receber tutorial ERDPlus, melhorar transição |
| `docs/er/aula-07.md` | Definir "pressuposto", melhorar transição |
| `docs/er/aula-08.md` | Simplificar Fase 9, explicar chaves compostas |
| `docs/er/casos-guiados.md` | Simplificar Caso 3 |

## Verificação

- `mkdocs build --strict` sem erros
- Reler cada ficheiro na perspectiva de um aluno de AP que nunca viu BD
- Confirmar que o fluxo Aula 6 → 7 → 8 é progressivo sem saltos
- Commit e push para GitHub Pages
