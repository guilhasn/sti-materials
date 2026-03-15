# Cheatsheet BPMN 2.0

Referência rápida dos elementos BPMN 2.0 utilizados nesta UC. Baseado na especificação oficial da OMG (omg.org/spec/BPMN/2.0).

---

## Eventos

| Elemento | Símbolo | Quando usar |
|----------|---------|-------------|
| **Início simples** | :material-circle-outline: círculo fino | Ponto onde o processo começa |
| **Início por mensagem** | :material-email-outline: círculo fino com envelope | Processo iniciado pela recepção de uma mensagem |
| **Fim simples** | :material-circle: círculo grosso | Ponto onde o processo termina |
| **Fim por mensagem** | :material-email: círculo grosso com envelope preenchido | Processo termina enviando uma mensagem |
| **Intermédio de mensagem (envio)** | :material-email-fast-outline: círculo duplo com envelope preenchido | Notificação enviada durante o processo |
| **Intermédio de mensagem (recepção)** | :material-email-receive-outline: círculo duplo com envelope vazio | Processo aguarda recepção de mensagem |
| **Intermédio de temporização** | :material-clock-outline: círculo duplo com relógio | Espera por um período ou data específica |

---

## Actividades (Tasks)

| Elemento | Ícone | Quando usar |
|----------|-------|-------------|
| **User Task** | :material-account: pessoa | Tarefa executada por uma pessoa |
| **Service Task** | :material-cog: engrenagem | Tarefa executada automaticamente pelo sistema |
| **Manual Task** | :material-hand-back-right: mão | Tarefa física sem apoio de SI (ex.: visita ao local) |
| **Send Task** | :material-email-fast: envelope com seta | Envio de mensagem, notificação ou documento |
| **Receive Task** | :material-email-receive: envelope | Espera pela recepção de informação |

!!! tip "Regra prática"
    Se a tarefa pode ser feita enquanto o computador está desligado → **Manual Task**.
    Se precisa de um ecrã → **User Task**.
    Se não precisa de pessoa nenhuma → **Service Task**.

---

## Gateways (Decisões)

| Elemento | Símbolo | Quando usar |
|----------|---------|-------------|
| **Exclusivo (XOR)** | :material-rhombus-outline: losango com X | Apenas **um** caminho segue (ou/ou) |
| **Paralelo (AND)** | :material-rhombus-outline: losango com + | **Todos** os caminhos seguem em simultâneo |
| **Inclusivo (OR)** | :material-rhombus-outline: losango com O | **Um ou mais** caminhos seguem |

!!! warning "Gateways de abertura e fecho"
    Um gateway paralelo (AND) que abre ramificações **deve** ser fechado por outro gateway paralelo antes de convergir. Esquecer o fecho é o erro mais frequente.

### Exemplos práticos

**Gateway exclusivo — decisão binária:**

> Pedido classificado com confiança? → Sim: encaminhar automaticamente / Não: triagem manual

**Gateway paralelo — acções simultâneas:**

> Após registo do pedido: notificar cidadão **E** encaminhar ao serviço (ambas em paralelo)

---

## Fluxos

| Elemento | Representação | Quando usar |
|----------|---------------|-------------|
| **Fluxo de sequência** | → seta sólida | Liga actividades pela ordem de execução |
| **Fluxo de mensagem** | ⇢ seta tracejada | Comunicação entre pools (ex.: cidadão → câmara) |
| **Associação** | ··· linha pontilhada | Liga anotações de texto a elementos |

---

## Pools e Lanes

| Elemento | Quando usar |
|----------|-------------|
| **Pool** | Representa uma organização ou entidade (ex.: Câmara Municipal) |
| **Lane** | Subdivide o pool por actor ou departamento (ex.: Atendimento, Obras) |

!!! note "Regra de ouro"
    Fluxos de sequência (seta sólida) só existem **dentro** do mesmo pool. Entre pools diferentes, usar fluxos de mensagem (seta tracejada).

---

## Artefactos

| Elemento | Quando usar |
|----------|-------------|
| **Anotação de texto** | Comentários, notas explicativas, identificação de problemas |
| **Grupo** | Agrupamento visual de actividades relacionadas (sem impacto no fluxo) |
| **Objecto de dados** | Documento, formulário ou ficheiro utilizado ou produzido |

---

## Erros frequentes a evitar

| Erro | Correcção |
|------|-----------|
| Fluxo de sequência entre pools diferentes | Usar fluxo de mensagem (tracejado) |
| Gateway paralelo sem fecho | Adicionar gateway de convergência |
| Actividade sem fluxo de entrada | Todas as tarefas (excepto após início) precisam de fluxo de entrada |
| Actividade sem fluxo de saída | Todas as tarefas (excepto antes de fim) precisam de fluxo de saída |
| Evento de início dentro de lane errada | O início deve estar na lane do actor que despoleta o processo |
| Misturar AS-IS e TO-BE no mesmo diagrama | Criar sempre diagramas separados |
