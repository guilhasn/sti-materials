# Notação BPMN 2.0 — Processos na Administração Pública

Este módulo introduz a notação **BPMN 2.0** como ferramenta de mapeamento e redesenho de processos em contexto de administração pública. Ambas as aulas utilizam o cenário da **Tempestade Kristin** — a Câmara Municipal de Pombal a gerir pedidos de intervenção após danos causados pela tempestade.

!!! info "Pré-requisitos"
    - Navegador web actualizado (Chrome, Firefox ou Edge)
    - Acesso à internet para usar o [bpmn.io](https://bpmn.io)
    - Não é necessário instalar software
    - Recomendado: segundo ecrã para ter o diagrama e o enunciado lado a lado

---

## Porquê BPMN na Administração Pública?

Os serviços públicos assentam em processos — licenciamentos, atendimento, contratação, resposta a emergências. Quando esses processos não estão documentados:

- Ninguém sabe exactamente quem faz o quê
- Não é possível medir tempos de resposta
- Cada funcionário resolve à sua maneira
- Melhorias são tentadas sem diagnóstico

O **BPMN** (Business Process Model and Notation) é uma notação visual normalizada (**ISO/IEC 19510**) que permite representar processos de forma clara, mensurável e partilhável entre técnicos, dirigentes e fornecedores de tecnologia.

!!! note "BPMN não é um fluxograma"
    Ao contrário dos fluxogramas informais, o BPMN 2.0 segue uma especificação internacional mantida pela OMG (Object Management Group). Cada símbolo tem um significado preciso e universalmente reconhecido. Um diagrama BPMN feito em Portugal é legível por qualquer analista de processos no mundo.

---

## Elementos fundamentais

### Eventos

Os eventos marcam o que **acontece** durante o processo — início, fim, ou algo intermédio.

| Evento | Símbolo | Quando usar | Exemplo |
|--------|---------|-------------|---------|
| **Início simples** | :material-circle-outline:{ .icon-green } círculo fino | Ponto de partida do processo | Cidadão apresenta pedido |
| **Início por mensagem** | :material-email-outline:{ .icon-green } círculo fino com envelope | Processo inicia ao receber comunicação | Email recebido com reclamação |
| **Fim simples** | :material-circle:{ .icon-red } círculo grosso | Processo termina | Certidão emitida |
| **Fim por mensagem** | :material-email:{ .icon-red } círculo grosso com envelope | Processo termina com envio de comunicação | Notificação enviada ao cidadão |
| **Intermédio de mensagem (envio)** | :material-email-arrow-right-outline:{ .icon-blue } círculo duplo com envelope | Envio de notificação durante o processo | SMS enviado ao requerente |
| **Intermédio de mensagem (recepção)** | :material-email-arrow-left-outline:{ .icon-blue } círculo duplo com envelope vazio | Espera por recepção de informação | Aguardar parecer do serviço jurídico |
| **Intermédio de temporização** | :material-clock-outline:{ .icon-blue } círculo duplo com relógio | Espera por tempo definido | Aguardar 5 dias úteis para resposta |

---

### Actividades / Tarefas

As actividades representam **trabalho executado** por alguém ou por um sistema.

| Tipo | Ícone | Quando usar | Exemplo |
|------|-------|-------------|---------|
| **User Task** | :material-account:{ .icon-blue } pessoa | Tarefa executada por uma pessoa num ecrã | Registar pedido no sistema |
| **Service Task** | :material-cog:{ .icon-blue } engrenagem | Tarefa automática do sistema, sem intervenção humana | Enviar SMS ao cidadão |
| **Manual Task** | :material-hand-back-right:{ .icon-blue } mão | Tarefa física sem apoio de sistema de informação | Inspeccionar infraestrutura no local |
| **Send Task** | :material-email-arrow-right:{ .icon-blue } envelope com seta | Envio de mensagem ou documento | Enviar parecer ao requerente |
| **Receive Task** | :material-email-arrow-left:{ .icon-blue } envelope | Espera pela recepção de informação | Receber documentação do cidadão |

!!! tip "Regra prática para escolher o tipo de tarefa"
    - **Computador desligado?** → Manual Task
    - **Precisa de ecrã?** → User Task
    - **Sem pessoa nenhuma?** → Service Task

!!! warning "Nomes das tarefas"
    Usar sempre **verbo + objecto**: "Registar pedido", "Validar dados", "Notificar cidadão". Nomes vagos como "Processar" ou "Tratar" não descrevem nada — são processos inteiros, não tarefas.

---

### Gateways — Decisões e ramificações

Os gateways controlam a **bifurcação e convergência** do fluxo.

| Tipo | Símbolo | Comportamento | Exemplo |
|------|---------|---------------|---------|
| **Exclusivo (XOR)** | ◇ com **X** | Apenas **UM** caminho segue | Pedido classificado? Sim → encaminhar / Não → triagem |
| **Paralelo (AND)** | ◇ com **+** | **TODOS** os caminhos seguem em simultâneo | Após registo → notificar cidadão **E** encaminhar ao serviço |
| **Inclusivo (OR)** | ◇ com **O** | **UM ou MAIS** caminhos seguem | Dano afecta estrada **E/OU** habitação → accionar um ou ambos |

!!! danger "Regra obrigatória para gateway paralelo"
    Um gateway paralelo (AND) que abre ramificações **DEVE** ser fechado por outro gateway paralelo antes de convergir. Esquecer o fecho é o erro mais frequente e invalida o diagrama.

**Exemplos práticos:**

- **Exclusivo:** "O pedido foi classificado com confiança?" → Sim: encaminhamento automático / Não: triagem manual
- **Paralelo:** "Após registo da ocorrência" → notificar cidadão **E** encaminhar ao serviço responsável (ambos em simultâneo)
- **Inclusivo:** "Tipo de dano reportado?" → Estrada, Habitação, Infraestrutura pública (um ou mais podem ser verdadeiros)

---

### Fluxos — Como ligar os elementos

| Tipo | Representação | Quando usar |
|------|---------------|-------------|
| **Fluxo de sequência** | :material-arrow-right-bold:{ .icon-blue } seta sólida com ponta preenchida | Liga actividades **dentro** do mesmo pool, pela ordem de execução |
| **Fluxo de mensagem** | :material-arrow-right-thin:{ .icon-blue } seta tracejada com ponta aberta | Liga elementos em **pools diferentes** — comunicação entre organizações |
| **Associação** | :material-dots-horizontal:{ .icon-blue } linha pontilhada | Liga anotações de texto ou objectos de dados a elementos do processo |

!!! note "Regra de ouro"
    Fluxos de sequência (seta sólida) só existem **dentro** do mesmo pool. Entre pools diferentes, usar **sempre** fluxos de mensagem (seta tracejada). Se o bpmn.io criar automaticamente uma seta tracejada ao ligar entre pools, está correcto.

---

### Pools e Lanes

| Elemento | O que representa | Exemplo |
|----------|------------------|---------|
| **Pool** | Uma organização ou entidade autónoma | Câmara Municipal de Pombal |
| **Lane** | Um papel, departamento ou actor dentro da organização | Técnico de Atendimento, Chefe de Divisão |

**Boas práticas:**

- Cada lane corresponde a um **papel real** — "Técnico de Protecção Civil", não "Departamento" genérico
- Todos os elementos do processo devem estar **dentro** de um pool
- Elementos soltos fora de pools causam erros de validação BPMN

---

### Artefactos

Os artefactos acrescentam informação ao diagrama **sem alterar o fluxo**.

| Artefacto | Quando usar | Exemplo |
|-----------|-------------|---------|
| **Anotação de texto** | Comentários, notas, explicações | "⚠ Sem validação de dados — risco de registo incompleto" |
| **Grupo** | Agrupamento visual de actividades relacionadas (sem impacto no fluxo) | Agrupar tarefas da "Fase de triagem" |
| **Objecto de dados** | Representa um documento, formulário ou ficheiro | Formulário de pedido, Relatório de visita |

---

## Erros frequentes

| Erro | Correcção |
|------|-----------|
| Fluxo de sequência entre pools diferentes | Usar fluxo de **mensagem** (tracejado) entre pools |
| Gateway paralelo sem fecho | Fechar **sempre** com outro gateway paralelo antes de convergir |
| Actividade sem fluxo de entrada ou saída | Todas as tarefas (excepto após início / antes de fim) precisam de ambos |
| Evento de início na lane errada | O início deve estar na lane do actor que **despoleta** o processo |
| Processo sem evento de início ou fim | Todo o diagrama precisa de ambos — sem eles não tem âmbito |
| Tarefas genéricas ("Processar", "Tratar") | Usar **verbo + objecto**: "Verificar identidade", "Emitir certidão" |
| Gateway sem rótulo nas saídas | Cada seta de saída precisa de condição: "Sim", "Não", ou descrição |
| Misturar AS-IS com TO-BE no mesmo diagrama | São **sempre** dois diagramas distintos |

---

## Ferramenta — bpmn.io

O [bpmn.io](https://bpmn.io) é um editor **gratuito e open-source** de diagramas BPMN 2.0, mantido pela Camunda. Funciona directamente no navegador — sem instalação, sem registo, sem custo.

!!! info "Acesso"
    Aceder em [https://bpmn.io](https://bpmn.io) e clicar em **"Try online"** para abrir o editor web.

### Interface do editor

O editor online tem quatro zonas principais:

| Zona | Localização | Função |
|------|-------------|--------|
| **Canvas** | Centro | Área de desenho do diagrama |
| **Palette** | Esquerda | Elementos BPMN disponíveis para arrastar |
| **Properties Panel** | Direita | Propriedades do elemento seleccionado |
| **Toolbar** | Topo | Guardar, abrir, desfazer, exportar |

### Criar um novo diagrama

1. Aceder a [bpmn.io](https://bpmn.io) → clicar **"Try online"**.
2. O editor abre com um diagrama em branco contendo um evento de início.
3. Para começar do zero: seleccionar tudo (`Ctrl+A`) e apagar (`Delete`).

### Adicionar elementos

**Método 1 — Arrastar da palette**

1. Na palette à esquerda, clicar no elemento desejado.
2. Arrastar para a posição no canvas.

**Método 2 — Menu contextual (recomendado)**

1. Clicar num elemento existente no canvas.
2. Aparecem ícones à volta do elemento — são atalhos para criar o próximo elemento já ligado.
3. Clicar no ícone do tipo de elemento desejado.

!!! tip "Método mais rápido"
    O menu contextual é muito mais rápido do que arrastar da palette, porque cria o elemento **já ligado** ao anterior com um fluxo de sequência.

### Como criar cada tipo de elemento

**Eventos:**

- **Evento de início**: círculo fino (já aparece por defeito)
- **Evento de fim**: clicar no evento de início → seleccionar círculo grosso no menu contextual
- Para mudar o tipo de evento: clicar no evento → clicar no ícone de **chave inglesa** → seleccionar o tipo

**Tarefas:**

- Clicar num elemento → seleccionar o rectângulo arredondado no menu contextual
- Para mudar o tipo de tarefa: clicar na tarefa → **chave inglesa** → seleccionar User Task, Service Task, etc.

**Gateways:**

- Clicar num elemento → seleccionar o losango no menu contextual
- Para mudar o tipo: clicar no gateway → **chave inglesa** → seleccionar Exclusive, Parallel, etc.

### Criar pools e lanes

**Adicionar um pool:**

1. Na palette esquerda, arrastar o elemento **Participant** (rectângulo grande) para o canvas.
2. Dar duplo-clique no nome para editar.

**Adicionar lanes dentro de um pool:**

1. Clicar com o botão direito dentro do pool.
2. Seleccionar **"Add Lane"**.
3. Repetir para cada actor ou departamento.
4. Dar duplo-clique no nome de cada lane para editar.

!!! warning "Atenção"
    Todos os elementos do processo devem estar **dentro** de um pool. Elementos soltos fora de pools podem causar erros na validação BPMN.

### Ligar elementos

**Fluxo de sequência (seta sólida):**

1. Passar o rato por cima de um elemento — aparece um ponto de ligação.
2. Clicar e arrastar até ao elemento seguinte.
3. Largar — a seta é criada automaticamente.

**Fluxo de mensagem (seta tracejada):**

- Ligar elementos que estão em **pools diferentes**.
- O editor cria automaticamente um fluxo de mensagem (tracejado) quando se liga entre pools.

### Adicionar anotações de texto

1. Na palette esquerda, seleccionar **Text Annotation** (ícone de nota).
2. Arrastar para junto do elemento que se quer anotar.
3. Ligar a anotação ao elemento com uma **associação** (linha pontilhada).

### Editar nomes e propriedades

- **Duplo-clique** em qualquer elemento para editar o nome.
- Manter nomes curtos e descritivos: "Registar pedido", "Validar dados", "Notificar cidadão".
- Evitar nomes vagos como "Processar" ou "Verificar".

### Guardar e exportar

**Guardar o diagrama:**

- **Ctrl+S** → descarrega o ficheiro `.bpmn` (formato XML padrão)
- Este ficheiro pode ser reaberto no bpmn.io a qualquer momento

**Exportar como imagem:**

1. Clicar no menu de exportação (ícone de download na toolbar).
2. Seleccionar **SVG** (vectorial, recomendado) ou **PNG** (raster).
3. O ficheiro é descarregado automaticamente.

!!! info "Formato de entrega"
    Para as aulas desta UC, entregar sempre **dois ficheiros**:

    1. O ficheiro `.bpmn` (editável)
    2. Uma exportação em `.svg` ou `.png` (para visualização rápida)

**Abrir um diagrama existente:**

1. Clicar em **"Open"** na toolbar (ou arrastar o ficheiro `.bpmn` para o canvas).
2. O diagrama é carregado com todos os elementos, posições e propriedades.

### Atalhos úteis

| Atalho | Acção |
|--------|-------|
| `Ctrl+Z` | Desfazer |
| `Ctrl+Y` | Refazer |
| `Ctrl+A` | Seleccionar tudo |
| `Delete` | Apagar elemento seleccionado |
| `Ctrl+S` | Guardar ficheiro .bpmn |
| `Space + arrastar` | Mover o canvas (pan) |
| `Scroll` | Zoom in/out |
| `E` | Activar ferramenta de ligação (connect) |

### Resolução de problemas

| Problema | Solução |
|----------|---------|
| Não consigo ligar dois elementos | Verificar se ambos estão no mesmo pool (para fluxo de sequência) |
| A seta fica tracejada quando deveria ser sólida | Os elementos estão em pools diferentes — está correcto se for comunicação entre organizações |
| O diagrama desapareceu | Ctrl+Z para desfazer, ou verificar se está guardado localmente |
| Não aparece a opção de lane | Clicar com botão **direito** dentro do pool (não fora) |
| O elemento não encaixa na lane | Arrastar o elemento para dentro da lane correcta |

