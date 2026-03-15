# Aula 4 — Mapeamento AS-IS com BPMN

<span class="aula-badge">Aula 4</span><span class="duracao-badge">120 min</span>

## Objectivos

- [ ] Compreender a finalidade e os elementos fundamentais da notacao BPMN 2.0.
- [ ] Mapear o processo actual (AS-IS) de tratamento de pedidos de intervencao numa camara municipal.
- [ ] Identificar estrangulamentos, redundancias e pontos de falha no processo existente.
- [ ] Utilizar o bpmn.io para criar o diagrama AS-IS.

---

## Conceitos-chave

### Elementos fundamentais do BPMN 2.0

| Elemento | Simbolo | Funcao |
|----------|---------|--------|
| **Evento de inicio** | Circulo fino verde | Marca o ponto onde o processo comeca |
| **Evento de fim** | Circulo grosso vermelho | Marca o ponto onde o processo termina |
| **Tarefa (Task)** | Rectangulo arredondado | Uma actividade executada por alguem ou por um sistema |
| **Gateway exclusivo (XOR)** | Losango com X | Decisao — so um caminho segue |
| **Gateway paralelo (AND)** | Losango com + | Todas as ramificacoes seguem em simultaneo |
| **Fluxo de sequencia** | Seta solida | Liga elementos pela ordem de execucao |
| **Pool / Lane** | Faixa horizontal | Representa um actor ou departamento |

!!! note "BPMN nao e fluxograma"
    Ao contrario de fluxogramas informais, o BPMN 2.0 segue uma especificacao internacional (OMG). Cada simbolo tem um significado preciso e universalmente reconhecido.

---

## Cenario — Atendimento pos-Tempestade Kristin

!!! abstract "Contexto"
    Apos a Tempestade Kristin, a Camara Municipal recebe diariamente dezenas de pedidos de intervencao — estradas danificadas, telhados destruidos, inundacoes em caves. O processo actual de tratamento destes pedidos nunca foi formalmente documentado.

### Descricao do processo actual (AS-IS)

O processo actual de tratamento de pedidos de intervencao funciona assim:

1. O **cidadao** dirige-se ao balcao presencial ou telefona para a camara.
2. O **tecnico de atendimento** regista o pedido em papel ou numa folha Excel local (sem modelo padrao).
3. O tecnico tenta identificar o **servico responsavel** (obras, proteccao civil, ambiente, habitacao) — muitas vezes com duvidas.
4. O pedido e encaminhado por **email ou nota interna** ao chefe de divisao competente.
5. O **chefe de divisao** analisa e decide se aceita ou reencaminha.
6. Se aceita, **atribui a um tecnico de campo**.
7. O tecnico de campo realiza **visita ao local** e elabora relatorio.
8. O relatorio e devolvido ao chefe de divisao que **decide a intervencao**.
9. O cidadao **nao recebe qualquer notificacao** sobre o estado do pedido, a menos que volte a contactar a camara.
10. O **encerramento** do pedido e informal — nao ha registo sistematico de conclusao.

### Problemas identificados

| Problema | Impacto |
|----------|---------|
| Registo em papel / Excel local | Impossivel cruzar dados ou medir tempos |
| Sem modelo padrao de pedido | Informacao incompleta, necessidade de recontacto |
| Encaminhamento por email | Pedidos perdidos, sem rastreabilidade |
| Cidadao sem notificacao | Reclamacoes, repeticao de contactos |
| Encerramento informal | Impossivel calcular taxa de resolucao |
| Duplicacao de pedidos | Mesmo dano reportado multiplas vezes sem deteccao |

---

## Exercicio — Mapear o processo AS-IS

### Preparacao

1. Abrir o [bpmn.io](https://bpmn.io) no navegador.
2. Criar um novo diagrama em branco.
3. Consultar a [Cheatsheet BPMN 2.0](../referencia/cheatsheet-bpmn.md) para referencia dos simbolos.

### Tarefas

**Tarefa 1 — Estrutura base**

Criar um diagrama com **3 pools (lanes)**:

| Lane | Actor |
|------|-------|
| Cidadao | Quem inicia o pedido |
| Atendimento | Tecnico de balcao |
| Servico Responsavel | Chefe de divisao + tecnico de campo |

**Tarefa 2 — Modelar o fluxo principal**

Representar as seguintes actividades no diagrama:

1. Cidadao contacta a camara (evento de inicio)
2. Tecnico regista pedido (tarefa)
3. Tecnico identifica servico responsavel (tarefa)
4. Gateway: servico identificado com certeza? (gateway exclusivo)
    - Sim → encaminhar ao servico
    - Nao → consultar chefe de divisao e depois encaminhar
5. Chefe de divisao analisa pedido (tarefa)
6. Gateway: aceita ou reencaminha? (gateway exclusivo)
7. Tecnico de campo realiza visita (tarefa)
8. Relatorio e devolvido (tarefa)
9. Decisao de intervencao (tarefa)
10. Encerramento informal do pedido (evento de fim)

**Tarefa 3 — Anotar problemas**

Usar **anotacoes de texto** (text annotations) no diagrama para marcar:

- Onde ha risco de perda de informacao
- Onde o cidadao fica sem resposta
- Onde ha duplicacao de esforco

!!! warning "Atencao"
    O mapeamento AS-IS documenta **o que acontece na realidade**, nao o que deveria acontecer. Resistir a tentacao de "melhorar" o processo nesta fase — isso e o trabalho da Aula 5.

!!! danger "Erro critico"
    Criar um diagrama AS-IS idealizado (como o processo deveria funcionar) em vez de representar a realidade. O valor do AS-IS esta precisamente em expor os problemas.

!!! tip "Dica"
    Comecar pelo caminho principal (happy path) e so depois adicionar as excepcoes e desvios. Tentar modelar tudo de uma vez gera diagramas confusos.

---

## Criterios de avaliacao

| Criterio | Peso |
|----------|------|
| Uso correcto dos simbolos BPMN (eventos, tarefas, gateways) | 30% |
| Lanes correctamente atribuidas aos actores | 20% |
| Fluxo completo do inicio ao fim | 20% |
| Anotacoes de problemas identificados | 15% |
| Legibilidade e organizacao visual do diagrama | 15% |

---

## Interpretacao para decisao publica

O mapeamento AS-IS e o primeiro passo para qualquer projecto de transformacao digital na AP. Sem documentar o que existe, qualquer investimento em tecnologia corre o risco de automatizar ineficiencias em vez de as eliminar. O diagrama AS-IS torna-se o **ponto de partida objectivo** para a discussao com decisores — deixa de ser opiniao e passa a ser evidencia visual.
