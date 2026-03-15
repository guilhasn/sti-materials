# Cheatsheet BPMN 2.0

Referencia rapida dos elementos BPMN 2.0 utilizados nesta UC. Baseado na especificacao oficial da OMG (omg.org/spec/BPMN/2.0).

---

## Eventos

| Elemento | Simbolo | Quando usar |
|----------|---------|-------------|
| **Inicio simples** | :material-circle-outline: circulo fino | Ponto onde o processo comeca |
| **Inicio por mensagem** | :material-email-outline: circulo fino com envelope | Processo iniciado pela recepcao de uma mensagem |
| **Fim simples** | :material-circle: circulo grosso | Ponto onde o processo termina |
| **Fim por mensagem** | :material-email: circulo grosso com envelope preenchido | Processo termina enviando uma mensagem |
| **Intermedio de mensagem (envio)** | :material-email-fast-outline: circulo duplo com envelope preenchido | Notificacao enviada durante o processo |
| **Intermedio de mensagem (recepcao)** | :material-email-receive-outline: circulo duplo com envelope vazio | Processo aguarda recepcao de mensagem |
| **Intermedio de temporizacao** | :material-clock-outline: circulo duplo com relogio | Espera por um periodo ou data especifica |

---

## Actividades (Tasks)

| Elemento | Icone | Quando usar |
|----------|-------|-------------|
| **User Task** | :material-account: pessoa | Tarefa executada por uma pessoa |
| **Service Task** | :material-cog: engrenagem | Tarefa executada automaticamente pelo sistema |
| **Manual Task** | :material-hand-back-right: mao | Tarefa fisica sem apoio de SI (ex.: visita ao local) |
| **Send Task** | :material-email-fast: envelope com seta | Envio de mensagem, notificacao ou documento |
| **Receive Task** | :material-email-receive: envelope | Espera pela recepcao de informacao |

!!! tip "Regra pratica"
    Se a tarefa pode ser feita enquanto o computador esta desligado → **Manual Task**.
    Se precisa de um ecra → **User Task**.
    Se nao precisa de pessoa nenhuma → **Service Task**.

---

## Gateways (Decisoes)

| Elemento | Simbolo | Quando usar |
|----------|---------|-------------|
| **Exclusivo (XOR)** | :material-rhombus-outline: losango com X | Apenas **um** caminho segue (ou/ou) |
| **Paralelo (AND)** | :material-rhombus-outline: losango com + | **Todos** os caminhos seguem em simultaneo |
| **Inclusivo (OR)** | :material-rhombus-outline: losango com O | **Um ou mais** caminhos seguem |

!!! warning "Gateways de abertura e fecho"
    Um gateway paralelo (AND) que abre ramificacoes **deve** ser fechado por outro gateway paralelo antes de convergir. Esquecer o fecho e o erro mais frequente.

### Exemplos praticos

**Gateway exclusivo — decisao binaria:**

> Pedido classificado com confianca? → Sim: encaminhar automaticamente / Nao: triagem manual

**Gateway paralelo — accoes simultaneas:**

> Apos registo do pedido: notificar cidadao **E** encaminhar ao servico (ambas em paralelo)

---

## Fluxos

| Elemento | Representacao | Quando usar |
|----------|---------------|-------------|
| **Fluxo de sequencia** | → seta solida | Liga actividades pela ordem de execucao |
| **Fluxo de mensagem** | ⇢ seta tracejada | Comunicacao entre pools (ex.: cidadao → camara) |
| **Associacao** | ··· linha pontilhada | Liga anotacoes de texto a elementos |

---

## Pools e Lanes

| Elemento | Quando usar |
|----------|-------------|
| **Pool** | Representa uma organizacao ou entidade (ex.: Camara Municipal) |
| **Lane** | Subdivide o pool por actor ou departamento (ex.: Atendimento, Obras) |

!!! note "Regra de ouro"
    Fluxos de sequencia (seta solida) so existem **dentro** do mesmo pool. Entre pools diferentes, usar fluxos de mensagem (seta tracejada).

---

## Artefactos

| Elemento | Quando usar |
|----------|-------------|
| **Anotacao de texto** | Comentarios, notas explicativas, identificacao de problemas |
| **Grupo** | Agrupamento visual de actividades relacionadas (sem impacto no fluxo) |
| **Objecto de dados** | Documento, formulario ou ficheiro utilizado ou produzido |

---

## Erros frequentes a evitar

| Erro | Correccao |
|------|-----------|
| Fluxo de sequencia entre pools diferentes | Usar fluxo de mensagem (tracejado) |
| Gateway paralelo sem fecho | Adicionar gateway de convergencia |
| Actividade sem fluxo de entrada | Todas as tarefas (excepto apos inicio) precisam de fluxo de entrada |
| Actividade sem fluxo de saida | Todas as tarefas (excepto antes de fim) precisam de fluxo de saida |
| Evento de inicio dentro de lane errada | O inicio deve estar na lane do actor que despoleta o processo |
| Misturar AS-IS e TO-BE no mesmo diagrama | Criar sempre diagramas separados |
