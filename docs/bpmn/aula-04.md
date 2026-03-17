# Mapeamento AS-IS com BPMN

## Objectivos

- [ ] Compreender a finalidade e os elementos fundamentais da notação BPMN 2.0.
- [ ] Mapear o processo actual (AS-IS) de tratamento de pedidos de intervenção numa câmara municipal.
- [ ] Identificar estrangulamentos, redundâncias e pontos de falha no processo existente.
- [ ] Utilizar o bpmn.io para criar o diagrama AS-IS.

---

## Conceitos-chave

### Elementos fundamentais do BPMN 2.0

| Elemento | Símbolo | Função |
|----------|---------|--------|
| **Evento de início** | Círculo fino verde | Marca o ponto onde o processo começa |
| **Evento de fim** | Círculo grosso vermelho | Marca o ponto onde o processo termina |
| **Tarefa (Task)** | Rectângulo arredondado | Uma actividade executada por alguém ou por um sistema |
| **Gateway exclusivo (XOR)** | Losango com X | Decisão — só um caminho segue |
| **Gateway paralelo (AND)** | Losango com + | Todas as ramificações seguem em simultâneo |
| **Fluxo de sequência** | Seta sólida | Liga elementos pela ordem de execução |
| **Pool / Lane** | Faixa horizontal | Representa um actor ou departamento |

!!! note "BPMN não é fluxograma"
    Ao contrário de fluxogramas informais, o BPMN 2.0 segue uma especificação internacional (OMG). Cada símbolo tem um significado preciso e universalmente reconhecido.

---

## Cenário — Atendimento pós-Tempestade Kristin

!!! abstract "Contexto"
    Após a Tempestade Kristin, a Câmara Municipal recebe diariamente dezenas de pedidos de intervenção — estradas danificadas, telhados destruídos, inundações em caves. O processo actual de tratamento destes pedidos nunca foi formalmente documentado.

### Descrição do processo actual (AS-IS)

O processo actual de tratamento de pedidos de intervenção funciona assim:

1. O **cidadão** dirige-se ao balcão presencial ou telefona para a câmara.
2. O **técnico de atendimento** regista o pedido em papel ou numa folha Excel local (sem modelo padrão).
3. O técnico tenta identificar o **serviço responsável** (obras, protecção civil, ambiente, habitação) — muitas vezes com dúvidas.
4. O pedido é encaminhado por **email ou nota interna** ao chefe de divisão competente.
5. O **chefe de divisão** analisa e decide se aceita ou reencaminha.
6. Se aceita, **atribui a um técnico de campo**.
7. O técnico de campo realiza **visita ao local** e elabora relatório.
8. O relatório é devolvido ao chefe de divisão que **decide a intervenção**.
9. O cidadão **não recebe qualquer notificação** sobre o estado do pedido, a menos que volte a contactar a câmara.
10. O **encerramento** do pedido é informal — não há registo sistemático de conclusão.

### Problemas identificados

| Problema | Impacto |
|----------|---------|
| Registo em papel / Excel local | Impossível cruzar dados ou medir tempos |
| Sem modelo padrão de pedido | Informação incompleta, necessidade de recontacto |
| Encaminhamento por email | Pedidos perdidos, sem rastreabilidade |
| Cidadão sem notificação | Reclamações, repetição de contactos |
| Encerramento informal | Impossível calcular taxa de resolução |
| Duplicação de pedidos | Mesmo dano reportado múltiplas vezes sem detecção |

---

## Exercício — Mapear o processo AS-IS

### Preparação

1. Abrir o [bpmn.io](https://bpmn.io) no navegador.
2. Criar um novo diagrama em branco.
3. Consultar a [Notação BPMN 2.0](index.md) para referência dos símbolos.

### Tarefas

**Tarefa 1 — Estrutura base**

Criar **1 pool** (Câmara Municipal de Vila Feliz) com **4 lanes** — cada lane representa um actor diferente no processo:

| Lane | Quem é | O que faz neste processo |
|------|--------|--------------------------|
| Cidadão | Munícipe afectado pela tempestade | Inicia o pedido de intervenção |
| Técnico de Atendimento | Funcionário do balcão | Regista o pedido e encaminha |
| Chefe de Divisão | Responsável pelo serviço técnico | Analisa o pedido e decide a intervenção |
| Técnico de Campo | Técnico operacional | Realiza visita ao local e elabora relatório |

!!! tip "No bpmn.io"
    Criar o pool → clicar com botão direito dentro do pool → **Add Lane** para adicionar lanes. Nomear cada lane com o nome do actor.

**Tarefa 2 — Modelar o fluxo principal**

Representar os seguintes elementos, colocando cada um na lane do actor correcto:

1. :material-circle-outline:{ .icon-green } **Evento de início** (lane Cidadão) → "Contactar a câmara"
    - O cidadão dirige-se ao balcão presencial ou telefona para a câmara para reportar um dano causado pela tempestade.
2. :material-square-rounded:{ .icon-blue } **Tarefa** (lane Técnico de Atendimento) → "Registar pedido em papel/Excel"
    - O técnico regista o pedido em papel ou numa folha Excel local. Não existe modelo padrão — cada técnico regista à sua maneira.
3. :material-square-rounded:{ .icon-blue } **Tarefa** (lane Técnico de Atendimento) → "Encaminhar pedido por email"
    - O técnico tenta identificar o serviço responsável (obras, protecção civil, ambiente, habitação) e encaminha o pedido por email ou nota interna ao chefe de divisão competente. Muitas vezes tem dúvidas sobre qual o serviço correcto.
4. :material-square-rounded:{ .icon-blue } **Tarefa** (lane Chefe de Divisão) → "Analisar pedido"
    - O chefe de divisão recebe o email e analisa se o pedido é da sua competência.
5. :material-rhombus:{ .icon-orange } **Gateway exclusivo** (lane Chefe de Divisão) → "Aceita o pedido?"
    - **Não** → :material-square-rounded:{ .icon-blue } **Tarefa** (lane Chefe de Divisão) → "Reencaminhar a outro serviço" → :material-circle:{ .icon-red } **Evento de fim** — o pedido sai deste fluxo e pode perder-se na transição.
    - **Sim** → segue para o passo 6.
6. :material-square-rounded:{ .icon-blue } **Tarefa** (lane Chefe de Divisão) → "Atribuir a técnico de campo"
    - O chefe de divisão escolhe um técnico de campo disponível e comunica-lhe a tarefa (verbalmente ou por email).
7. :material-square-rounded:{ .icon-blue } **Tarefa** (lane Técnico de Campo) → "Realizar visita ao local"
    - O técnico desloca-se ao local do dano para avaliar a situação. Não há prazo definido para esta visita.
8. :material-square-rounded:{ .icon-blue } **Tarefa** (lane Técnico de Campo) → "Elaborar relatório"
    - O técnico redige um relatório com o que observou e devolve-o ao chefe de divisão.
9. :material-square-rounded:{ .icon-blue } **Tarefa** (lane Chefe de Divisão) → "Decidir intervenção"
    - O chefe de divisão analisa o relatório e decide que tipo de intervenção é necessária. O cidadão não recebe qualquer notificação sobre o estado do pedido.
10. :material-circle:{ .icon-red } **Evento de fim** (lane Chefe de Divisão) → "Pedido encerrado informalmente"
    - O encerramento é informal — não há registo sistemático de conclusão nem confirmação ao cidadão.

**Tarefa 3 — Anotar problemas**

Usar **anotações de texto** (text annotations) no diagrama para marcar os problemas identificados. Ligar cada anotação ao elemento correspondente com uma **associação** (linha tracejada):

| Junto ao passo | Anotação sugerida |
|----------------|-------------------|
| 2 — "Registar pedido" | ⚠ Registo em papel/Excel sem modelo padrão — dados incompletos |
| 3 — "Encaminhar por email" | ⚠ Email sem rastreabilidade — pedidos perdidos |
| 5 — Gateway "Aceita?" (caminho Não) | ⚠ Reencaminhamento sem notificação ao cidadão |
| 7 — "Realizar visita ao local" | ⚠ Sem prazo definido — visita pode demorar semanas |
| 10 — Evento de fim | ⚠ Encerramento informal — sem registo de conclusão |

!!! note "No bpmn.io"
    Para criar uma anotação: seleccionar o elemento → no menu de contexto clicar em **T** (Text Annotation). A associação (linha tracejada) é criada automaticamente.

!!! warning "Atenção"
    O mapeamento AS-IS documenta **o que acontece na realidade**, não o que deveria acontecer. Resistir à tentação de "melhorar" o processo nesta fase.

!!! danger "Erro crítico"
    Criar um diagrama AS-IS idealizado (como o processo deveria funcionar) em vez de representar a realidade. O valor do AS-IS está precisamente em expor os problemas.

!!! tip "Dica"
    Começar pelo caminho principal (happy path) e só depois adicionar as excepções e desvios. Tentar modelar tudo de uma vez gera diagramas confusos.

---

## Interpretação para decisão pública

O mapeamento AS-IS é o primeiro passo para qualquer projecto de transformação digital na AP. Sem documentar o que existe, qualquer investimento em tecnologia corre o risco de automatizar ineficiências em vez de as eliminar. O diagrama AS-IS torna-se o **ponto de partida objectivo** para a discussão com decisores — deixa de ser opinião e passa a ser evidência visual.
