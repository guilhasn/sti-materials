# Guia de Utilizacao — bpmn.io

Guia passo-a-passo para utilizar o editor **bpmn.io** nas aulas de BPMN desta UC.

---

## O que e o bpmn.io?

O bpmn.io e um editor **gratuito e open-source** de diagramas BPMN 2.0, mantido pela Camunda. Funciona directamente no navegador — sem instalacao, sem registo, sem custo.

!!! info "Acesso"
    Aceder em [https://bpmn.io](https://bpmn.io) e clicar em **"Try online"** para abrir o editor web.

---

## Interface do editor

O editor online tem quatro zonas principais:

| Zona | Localizacao | Funcao |
|------|-------------|--------|
| **Canvas** | Centro | Area de desenho do diagrama |
| **Palette** | Esquerda | Elementos BPMN disponiveis para arrastar |
| **Properties Panel** | Direita | Propriedades do elemento seleccionado |
| **Toolbar** | Topo | Guardar, abrir, desfazer, exportar |

---

## Criar um novo diagrama

1. Aceder a [bpmn.io](https://bpmn.io) → clicar **"Try online"**.
2. O editor abre com um diagrama em branco contendo um evento de inicio.
3. Para comecar do zero: seleccionar tudo (`Ctrl+A`) e apagar (`Delete`).

---

## Adicionar elementos

### Metodo 1 — Arrastar da palette

1. Na palette a esquerda, clicar no elemento desejado.
2. Arrastar para a posicao no canvas.

### Metodo 2 — Menu contextual (recomendado)

1. Clicar num elemento existente no canvas.
2. Aparecem icones a volta do elemento — sao atalhos para criar o proximo elemento ja ligado.
3. Clicar no icone do tipo de elemento desejado.

!!! tip "Metodo mais rapido"
    O menu contextual e muito mais rapido do que arrastar da palette, porque cria o elemento **ja ligado** ao anterior com um fluxo de sequencia.

---

## Elementos essenciais

### Eventos

- **Evento de inicio**: circulo fino (ja aparece por defeito)
- **Evento de fim**: clicar no evento de inicio → seleccionar circulo grosso no menu contextual
- Para mudar o tipo de evento: clicar no evento → clicar no icone de chave inglesa → seleccionar o tipo

### Tarefas

- Clicar num elemento → seleccionar o rectangulo arredondado no menu contextual
- Para mudar o tipo de tarefa: clicar na tarefa → chave inglesa → seleccionar User Task, Service Task, etc.

### Gateways

- Clicar num elemento → seleccionar o losango no menu contextual
- Para mudar o tipo: clicar no gateway → chave inglesa → seleccionar Exclusive, Parallel, etc.

---

## Criar pools e lanes

### Adicionar um pool

1. Na palette esquerda, arrastar o elemento **Participant** (rectangulo grande) para o canvas.
2. Dar duplo-clique no nome para editar.

### Adicionar lanes dentro de um pool

1. Clicar com o botao direito dentro do pool.
2. Seleccionar **"Add Lane"**.
3. Repetir para cada actor ou departamento.
4. Dar duplo-clique no nome de cada lane para editar.

!!! warning "Atencao"
    Todos os elementos do processo devem estar **dentro** de um pool. Elementos soltos fora de pools podem causar erros na validacao BPMN.

---

## Ligar elementos

### Fluxo de sequencia (seta solida)

1. Passar o rato por cima de um elemento — aparece um ponto de ligacao.
2. Clicar e arrastar ate ao elemento seguinte.
3. Largar — a seta e criada automaticamente.

### Fluxo de mensagem (seta tracejada)

- Ligar elementos que estao em **pools diferentes**.
- O editor cria automaticamente um fluxo de mensagem (tracejado) quando se liga entre pools.

---

## Adicionar anotacoes de texto

1. Na palette esquerda, seleccionar **Text Annotation** (icone de nota).
2. Arrastar para junto do elemento que se quer anotar.
3. Ligar a anotacao ao elemento com uma **associacao** (linha pontilhada).

---

## Editar nomes e propriedades

- **Duplo-clique** em qualquer elemento para editar o nome.
- Manter nomes curtos e descritivos: "Registar pedido", "Validar dados", "Notificar cidadao".
- Evitar nomes vagos como "Processar" ou "Verificar".

!!! tip "Boas praticas de nomes"
    Usar sempre **verbo + objecto**: "Registar pedido", "Enviar notificacao", "Aprovar intervencao". Nomes claros tornam o diagrama legivel sem necessidade de documentacao adicional.

---

## Guardar e exportar

### Guardar o diagrama

- **Ctrl+S** → descarrega o ficheiro `.bpmn` (formato XML padrao)
- Este ficheiro pode ser reaberto no bpmn.io a qualquer momento

### Exportar como imagem

1. Clicar no menu de exportacao (icone de download na toolbar).
2. Seleccionar **SVG** (vectorial, recomendado) ou **PNG** (raster).
3. O ficheiro e descarregado automaticamente.

!!! info "Formato de entrega"
    Para as aulas desta UC, entregar sempre **dois ficheiros**:

    1. O ficheiro `.bpmn` (editavel)
    2. Uma exportacao em `.svg` ou `.png` (para visualizacao rapida)

---

## Abrir um diagrama existente

1. Clicar em **"Open"** na toolbar (ou arrastar o ficheiro `.bpmn` para o canvas).
2. O diagrama e carregado com todos os elementos, posicoes e propriedades.

---

## Atalhos uteis

| Atalho | Accao |
|--------|-------|
| `Ctrl+Z` | Desfazer |
| `Ctrl+Y` | Refazer |
| `Ctrl+A` | Seleccionar tudo |
| `Delete` | Apagar elemento seleccionado |
| `Ctrl+S` | Guardar ficheiro .bpmn |
| `Space + arrastar` | Mover o canvas (pan) |
| `Scroll` | Zoom in/out |
| `E` | Activar ferramenta de ligacao (connect) |

---

## Resolucao de problemas

| Problema | Solucao |
|----------|---------|
| Nao consigo ligar dois elementos | Verificar se ambos estao no mesmo pool (para fluxo de sequencia) |
| A seta fica tracejada quando deveria ser solida | Os elementos estao em pools diferentes — esta correcto se for comunicacao entre organizacoes |
| O diagrama desapareceu | Ctrl+Z para desfazer, ou verificar se esta guardado localmente |
| Nao aparece a opcao de lane | Clicar com botao **direito** dentro do pool (nao fora) |
| O elemento nao encaixa na lane | Arrastar o elemento para dentro da lane correcta |
