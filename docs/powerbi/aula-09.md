# Aula 9 — Do Excel ao Dashboard

## Objectivos

- [ ] Instalar e abrir o Power BI Desktop com confiança.
- [ ] Conhecer as três vistas (Relatório, Dados, Modelo).
- [ ] Importar dados de Excel ou CSV.
- [ ] Aplicar transformações básicas de Power Query (mudar tipos, remover blanks, promover headers).
- [ ] Criar um primeiro dashboard com 3 visualizações: cartão, gráfico de colunas e mapa.

---

## Conceitos-chave

| Conceito | Significado |
|----------|------------|
| **Power BI Desktop** | Aplicação Windows gratuita onde se cria o relatório |
| **`.pbix`** | Formato do ficheiro Power BI (relatório + modelo + dados) |
| **Get Data** | Botão para ligar a uma fonte de dados (Excel, CSV, Web…) |
| **Power Query Editor** | Janela separada onde se limpam e moldam os dados *antes* de chegarem ao modelo |
| **Field Wells** | Caixas onde se arrastam campos para configurar um visual (Axis, Values, Legend) |
| **Refresh** | Actualizar os dados da fonte original (botão Home → Refresh) |

---

## Cenário — Atendimento ao Munícipe em Vila Feliz

!!! abstract "Contexto"
    A **Câmara Municipal de Vila Feliz** atende cerca de 200 munícipes por dia. Os atendimentos são registados num sistema interno que, no fim do mês, exporta para Excel. A vereadora pediu um **dashboard de atendimento** com:

    - Total de atendimentos do mês
    - Distribuição por canal (presencial, telefone, online)
    - Mapa do concelho com origem dos munícipes (por freguesia)

    Vai usar o ficheiro [`atendimento-vila-feliz.xlsx`](datasets/atendimento-vila-feliz.xlsx) (fornecido pelo docente).

---

## Tarefa 1 — Instalar e abrir o Power BI Desktop

1. Aceder a [https://powerbi.microsoft.com](https://powerbi.microsoft.com) → **Power BI Desktop** → **Download Free**.
2. Alternativa (recomendada — actualiza automaticamente): instalar pela **Microsoft Store** procurando "Power BI Desktop".
3. Abrir a aplicação. **Não é preciso fazer login** para começar — a conta Microsoft só é necessária para publicar no Power BI Service.

!!! info "Sem Mac? Sem problema"
    Power BI Desktop **não tem versão nativa para Mac**. Alternativas:

    1. Usar o **Power BI Service** no browser (`app.powerbi.com`) — funciona em Safari/Chrome/Edge mas com funcionalidades reduzidas
    2. **Parallels Desktop** ou **VirtualBox** com Windows
    3. **Azure Virtual Desktop** ou **Windows 365 Cloud PC**

---

## Tarefa 2 — Conhecer as 3 vistas

Na barra lateral esquerda do Power BI Desktop, três ícones comutam entre vistas:

| Vista | Ícone | Para quê |
|---|---|---|
| **Relatório** | :material-chart-bar: | "Tela em branco" onde se desenham gráficos. **80% do tempo passa-se aqui** |
| **Dados** | :material-table: | Mostra as tabelas em formato folha de cálculo. Serve para **inspeccionar valores** |
| **Modelo** | :material-graph: | Mostra tabelas como caixas e relações como linhas. Equivalente a um **diagrama E-R** |

!!! tip "Dica de leitura"
    A vista de Modelo é literalmente um diagrama E-R simplificado — caixas (entidades) ligadas por linhas (relações). Continua a usar a notação que aprendeu no módulo E-R, só que aqui chama-se "modelo semântico" e é optimizado para análise.

---

## Tarefa 3 — Importar o Excel

1. **Home → Get Data → Excel**
2. Navegar até `atendimento-vila-feliz.xlsx`
3. No **Navegador**, marcar a folha `Atendimentos` (vê-se uma pré-visualização)
4. **Em vez de clicar em "Carregar"**, clicar em **"Transformar Dados"** — abre o Power Query Editor

!!! warning "Sempre passar pelo Power Query"
    A tentação é clicar em "Carregar" e ir directo aos gráficos. **Não faça isso na primeira vez**. Passe sempre pelo Power Query para confirmar os tipos das colunas e detectar problemas. Cinco minutos aqui poupam horas depois.

---

## Tarefa 4 — Power Query: transformações básicas

No editor que se abriu, vai aplicar 4 transformações ao Excel:

### a) Promover a primeira linha como cabeçalho

Se o Excel tem um título "Atendimentos 2025" na linha 1 e os cabeçalhos verdadeiros na linha 2:

- **Home → Use First Row as Headers** (já costuma vir activado, mas confirme)

### b) Mudar tipos de coluna (crítico)

Ao lado de cada nome de coluna, há um pequeno ícone (`ABC` para texto, `123` para número, calendário para data). **Confirme que cada coluna tem o tipo certo**:

| Coluna | Tipo |
|--------|------|
| `Data` | Data |
| `Canal` | Texto |
| `Departamento` | Texto |
| `Freguesia` | Texto |
| `Tempo (min)` | Número Inteiro |

!!! warning "Datas em PT"
    Se a coluna Data aparece com erros (DD/MM/AAAA interpretado como MM/DD/AAAA): clique com botão direito na coluna → **Change Type → Using Locale** → escolha **Português (Portugal)**.

### c) Remover linhas em branco

- **Home → Remove Rows → Remove Blank Rows**

### d) Trim e Clean (texto)

Para colunas de texto vindas de Excel manual, costuma haver espaços extra ou caracteres invisíveis:

- Seleccionar coluna `Canal` → **Transform → Format → Trim** (remove espaços antes/depois)
- Idem → **Transform → Format → Clean** (remove caracteres invisíveis)

### e) Aplicar e fechar

- **Home → Close & Apply** — o Power Query aplica todos os passos e carrega para o modelo.

!!! tip "Applied Steps — o histórico vivo"
    No painel direito do Power Query existe **Applied Steps**. Cada transformação fica registada como um passo. Pode clicar em qualquer passo para ver o estado intermédio, apagá-lo, ou renomeá-lo (botão direito → Rename). É auto-documentação — usar sempre.

---

## Tarefa 5 — Criar 3 visualizações

Voltou à vista de **Relatório** (canvas em branco). Os campos da tabela aparecem no painel direito (**Data**).

### a) Cartão — Total de atendimentos

1. No painel **Visualizations**, clicar no ícone do **Cartão** (Card)
2. Arrastar o campo `IdAtendimento` para o Field Well **Fields**
3. Por defeito o Power BI faz **Count of IdAtendimento** — perfeito
4. Resultado: cartão grande mostrando "1 234"
5. Em **Format → Title** acrescentar título: "Total de atendimentos"

### b) Gráfico de colunas — Distribuição por canal

1. Clicar num espaço vazio do canvas → **gráfico de Colunas Empilhadas (Clustered column)**
2. Arrastar `Canal` para **X-axis**
3. Arrastar `IdAtendimento` para **Y-axis** (sumariza como Count)
4. Resultado: 3 colunas (Presencial, Telefone, Online)

### c) Mapa — Distribuição por freguesia

1. Clicar num espaço vazio → visual **Mapa** (`Map`)
2. Arrastar `Freguesia` para **Location**
3. Arrastar `IdAtendimento` para **Bubble size**
4. Resultado: bolhas no mapa de Vila Feliz com tamanho proporcional ao volume

!!! warning "Mapa não funciona?"
    O Power BI usa o **Bing Maps** para geocodificar. Se as freguesias aparecem no sítio errado ou se o mapa fica vazio:

    1. Verificar se a coluna `Freguesia` está marcada com a **Categoria de Dados** correcta (vista de Dados → seleccionar coluna → **Ferramentas de coluna → Categoria de Dados → Concelho**)
    2. Acrescentar uma coluna `País` = "Portugal" e usar como **filtro**
    3. Em alternativa, usar `Distrito` ou `Concelho` em vez de `Freguesia`

---

## Tarefa 6 — Guardar o relatório

- **File → Save As** → `atendimento-vila-feliz.pbix`

!!! info "Como o `.pbix` funciona"
    O ficheiro `.pbix` contém: o relatório, uma cópia local dos dados (cache) e os passos do Power Query. **Lembra-se do caminho** original do Excel — se mover o ficheiro fonte, o `.pbix` deixa de actualizar. Boa prática: guardar `.pbix` na **mesma pasta** do Excel ou em OneDrive sincronizado.

---

## Tarefa 7 — Aplicar à Ficha 03

Agora que sabe o workflow básico, [resolva a **Ficha Prática 03**](exercicios.md#ficha-03) usando o ficheiro `ExercBI.csv`. É um cenário de vendas com 3 visualizações simples: mapa, colunas, treemap.

---

## Checklist da aula

Saiu desta aula a saber:

- [ ] Abrir Power BI Desktop e identificar as 3 vistas
- [ ] Importar um Excel ou CSV
- [ ] Mudar tipos de coluna no Power Query
- [ ] Remover linhas em branco
- [ ] Promover headers
- [ ] Trim e Clean em colunas de texto
- [ ] Criar um cartão (Card)
- [ ] Criar um gráfico de colunas
- [ ] Criar um mapa básico
- [ ] Guardar como `.pbix`

---

!!! tip "Próximo passo"
    Na [**Aula 10 — Da Tabela ao Modelo**](aula-10.md) vai aprender a juntar dados de várias fontes, a criar relacionamentos entre tabelas e a escrever a sua **primeira fórmula DAX** (curta e indolor).
