# Guia de Utilização — bpmn.io

Guia passo-a-passo para utilizar o editor **bpmn.io** nas aulas de BPMN desta UC.

---

## O que é o bpmn.io?

O bpmn.io é um editor **gratuito e open-source** de diagramas BPMN 2.0, mantido pela Camunda. Funciona directamente no navegador — sem instalação, sem registo, sem custo.

!!! info "Acesso"
    Aceder em [https://bpmn.io](https://bpmn.io) e clicar em **"Try online"** para abrir o editor web.

---

## Interface do editor

O editor online tem quatro zonas principais:

| Zona | Localização | Função |
|------|-------------|--------|
| **Canvas** | Centro | Área de desenho do diagrama |
| **Palette** | Esquerda | Elementos BPMN disponíveis para arrastar |
| **Properties Panel** | Direita | Propriedades do elemento seleccionado |
| **Toolbar** | Topo | Guardar, abrir, desfazer, exportar |

---

## Criar um novo diagrama

1. Aceder a [bpmn.io](https://bpmn.io) → clicar **"Try online"**.
2. O editor abre com um diagrama em branco contendo um evento de início.
3. Para começar do zero: seleccionar tudo (`Ctrl+A`) e apagar (`Delete`).

---

## Adicionar elementos

### Método 1 — Arrastar da palette

1. Na palette à esquerda, clicar no elemento desejado.
2. Arrastar para a posição no canvas.

### Método 2 — Menu contextual (recomendado)

1. Clicar num elemento existente no canvas.
2. Aparecem ícones à volta do elemento — são atalhos para criar o próximo elemento já ligado.
3. Clicar no ícone do tipo de elemento desejado.

!!! tip "Método mais rápido"
    O menu contextual é muito mais rápido do que arrastar da palette, porque cria o elemento **já ligado** ao anterior com um fluxo de sequência.

---

## Elementos essenciais

### Eventos

- **Evento de início**: círculo fino (já aparece por defeito)
- **Evento de fim**: clicar no evento de início → seleccionar círculo grosso no menu contextual
- Para mudar o tipo de evento: clicar no evento → clicar no ícone de chave inglesa → seleccionar o tipo

### Tarefas

- Clicar num elemento → seleccionar o rectângulo arredondado no menu contextual
- Para mudar o tipo de tarefa: clicar na tarefa → chave inglesa → seleccionar User Task, Service Task, etc.

### Gateways

- Clicar num elemento → seleccionar o losango no menu contextual
- Para mudar o tipo: clicar no gateway → chave inglesa → seleccionar Exclusive, Parallel, etc.

---

## Criar pools e lanes

### Adicionar um pool

1. Na palette esquerda, arrastar o elemento **Participant** (rectângulo grande) para o canvas.
2. Dar duplo-clique no nome para editar.

### Adicionar lanes dentro de um pool

1. Clicar com o botão direito dentro do pool.
2. Seleccionar **"Add Lane"**.
3. Repetir para cada actor ou departamento.
4. Dar duplo-clique no nome de cada lane para editar.

!!! warning "Atenção"
    Todos os elementos do processo devem estar **dentro** de um pool. Elementos soltos fora de pools podem causar erros na validação BPMN.

---

## Ligar elementos

### Fluxo de sequência (seta sólida)

1. Passar o rato por cima de um elemento — aparece um ponto de ligação.
2. Clicar e arrastar até ao elemento seguinte.
3. Largar — a seta é criada automaticamente.

### Fluxo de mensagem (seta tracejada)

- Ligar elementos que estão em **pools diferentes**.
- O editor cria automaticamente um fluxo de mensagem (tracejado) quando se liga entre pools.

---

## Adicionar anotações de texto

1. Na palette esquerda, seleccionar **Text Annotation** (ícone de nota).
2. Arrastar para junto do elemento que se quer anotar.
3. Ligar a anotação ao elemento com uma **associação** (linha pontilhada).

---

## Editar nomes e propriedades

- **Duplo-clique** em qualquer elemento para editar o nome.
- Manter nomes curtos e descritivos: "Registar pedido", "Validar dados", "Notificar cidadão".
- Evitar nomes vagos como "Processar" ou "Verificar".

!!! tip "Boas práticas de nomes"
    Usar sempre **verbo + objecto**: "Registar pedido", "Enviar notificação", "Aprovar intervenção". Nomes claros tornam o diagrama legível sem necessidade de documentação adicional.

---

## Guardar e exportar

### Guardar o diagrama

- **Ctrl+S** → descarrega o ficheiro `.bpmn` (formato XML padrão)
- Este ficheiro pode ser reaberto no bpmn.io a qualquer momento

### Exportar como imagem

1. Clicar no menu de exportação (ícone de download na toolbar).
2. Seleccionar **SVG** (vectorial, recomendado) ou **PNG** (raster).
3. O ficheiro é descarregado automaticamente.

!!! info "Formato de entrega"
    Para as aulas desta UC, entregar sempre **dois ficheiros**:

    1. O ficheiro `.bpmn` (editável)
    2. Uma exportação em `.svg` ou `.png` (para visualização rápida)

---

## Abrir um diagrama existente

1. Clicar em **"Open"** na toolbar (ou arrastar o ficheiro `.bpmn` para o canvas).
2. O diagrama é carregado com todos os elementos, posições e propriedades.

---

## Atalhos úteis

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

---

## Resolução de problemas

| Problema | Solução |
|----------|---------|
| Não consigo ligar dois elementos | Verificar se ambos estão no mesmo pool (para fluxo de sequência) |
| A seta fica tracejada quando deveria ser sólida | Os elementos estão em pools diferentes — está correcto se for comunicação entre organizações |
| O diagrama desapareceu | Ctrl+Z para desfazer, ou verificar se está guardado localmente |
| Não aparece a opção de lane | Clicar com botão **direito** dentro do pool (não fora) |
| O elemento não encaixa na lane | Arrastar o elemento para dentro da lane correcta |
