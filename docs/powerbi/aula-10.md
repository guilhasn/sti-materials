# Aula 10 — Da Tabela ao Modelo

## Objectivos

- [ ] Aplicar transformações avançadas de Power Query (split, conditional column, custom column).
- [ ] Combinar duas tabelas com **Merge Queries** (intercalar consultas).
- [ ] Criar relacionamentos no modelo de dados (vista de Modelo).
- [ ] Escrever uma **coluna calculada** e uma **medida** em DAX (apenas as 2 fórmulas mínimas).
- [ ] Configurar **Categoria de Dados** (URL da Imagem, Concelho/Distrito).
- [ ] Usar a **hierarquia automática de datas** com drill-down.
- [ ] Fazer perguntas em linguagem natural com **Q&A**.

---

## Conceitos-chave

| Conceito | Significado | Onde se faz |
|----------|------------|-------------|
| **Merge Queries** | Cruzar 2 tabelas por uma chave comum (LEFT JOIN) | Power Query |
| **Append Queries** | Empilhar 2 tabelas com a mesma estrutura | Power Query |
| **Conditional Column** | Coluna nova com regras `IF/THEN/ELSE` | Power Query |
| **Custom Column** | Coluna nova com fórmula simples | Power Query |
| **Coluna Calculada (DAX)** | Coluna nova calculada após carregar dados | Vista de Dados/Relatório |
| **Medida (DAX)** | Cálculo agregado calculado sob demanda | Vista de Dados/Relatório |
| **Categoria de Dados** | Marca uma coluna como Concelho, URL Imagem, etc. | Ferramentas de coluna |
| **Q&A** | Pergunta em linguagem natural que gera visual | Inserir → visual Q&A |

---

## Cenário — Eventos Culturais de Vila Feliz

!!! abstract "Contexto"
    A **Câmara Municipal de Vila Feliz** organiza ~30 eventos culturais por ano. Os dados estão em **dois ficheiros Excel** separados:

    - [`eventos-vila-feliz.xlsx`](datasets/eventos-vila-feliz.xlsx) — eventos, espaços, artistas e actuações (4 folhas)

    Para os exercícios com merge entre Excel e ficheiro de texto, vamos usar [`Dados_Excel.xlsx`](datasets/Dados_Excel.xlsx) e [`dProduto.txt`](datasets/dProduto.txt) (vendas e produtos), os mesmos da Ficha 01.

    A vereadora quer um dashboard que mostre receita por evento, distribuição por categoria e foto dos artistas. Vai precisar de **juntar as duas tabelas**, **criar um cálculo de receita** e **categorizar a coluna URL** para mostrar as fotos.

---

## Tarefa 1 — Power Query avançado

### a) Texto Entre Delimitadores

Imagine que a coluna `Vendedor` vem com formato `#S_Garcia_##` mas só queremos `Garcia`:

1. Seleccionar a coluna → separador **Transformar** → grupo **Coluna do Texto** → **Extrair → Texto Entre Delimitadores**
2. Delimitador inicial: `_`
3. Delimitador final: `_`
4. Resultado: `Garcia`

**Diferença vs Split Column**: o Split corta em **todas** as ocorrências do delimitador (gerando várias colunas); o Texto Entre Delimitadores **extrai apenas a parte** entre dois delimitadores.

### b) Split Column — modos disponíveis

Para a coluna `NIF - Nome` com formato `123456789 - Câmara Municipal de Vila Feliz`:

1. Seleccionar coluna → **Home → Dividir Coluna → Por Delimitador**
2. Delimitador: `--Personalizado--` → escrever ` - ` (espaço-traço-espaço)
3. Em **Dividir em**, escolher **No delimitador mais à esquerda** ⚠️ (não "em cada ocorrência" — caso contrário um nome com hífen seria também partido)
4. Resultado: duas colunas — `NIF` e `Nome`

| Modo | Quando usar |
|---|---|
| **No delimitador mais à esquerda** | Quando só quer separar a primeira parte (ex.: NIF + Nome) |
| **No delimitador mais à direita** | Quando só quer a última parte (ex.: extensão de ficheiro) |
| **Em cada ocorrência** | Quando todas as partes são significativas (ex.: País, Distrito, Concelho de "Portugal, Lisboa, Lisboa") |

### c) Conditional Column

Para criar `Concelho2` que substitui valores nulos pelo Distrito:

1. Separador **Adicionar Coluna → Coluna Condicional**
2. Nome da nova coluna: `Concelho2`
3. Cláusula 1:
    - Nome da Coluna: `Concelho`
    - Operador: `é igual a`
    - Valor: clicar no ícone do menu pendente à esquerda do campo Valor → escolher **null** ⚠️
    - Saída: mudar de "Valor" para **"Selecionar uma coluna"** → escolher `Distrito`
4. Senão: **"Selecionar uma coluna"** → `Concelho`

!!! warning "Erro comum: 'null' como texto"
    Se escrever `null` no campo de Valor, o Power Query procura literalmente o **texto** "null" (4 caracteres) e nunca encontra. O `null` verdadeiro é um **valor**, escolhido pelo selector de tipos. Cuidado.

### d) Custom Column (alternativa simples ao DAX)

Para criar uma coluna `Total = Preço × Quantidade`:

1. **Adicionar Coluna → Coluna Personalizada**
2. Nome: `Total`
3. Fórmula: `[Preço Unitário] * [Quantidade]`
4. OK

!!! tip "Custom Column vs DAX coluna calculada"
    Ambos criam uma coluna nova. Diferença:

    - **Custom Column (Power Query, M)** — corre **antes** dos dados serem carregados; mais simples; preferível quando a fórmula só usa colunas da mesma linha
    - **Calculated Column (DAX)** — corre **depois** do carregamento; pode atravessar relações (RELATED, etc.)

    **Regra prática**: se for `[A] * [B]` ou `[A] + [B]`, faça em **Custom Column**. Só vá para DAX se precisar mesmo.

---

## Tarefa 2 — Merge Queries (intercalar consultas)

Para juntar a tabela `Eventos` com a tabela `Produtos`:

1. **Home → Intercalar Consultas → Intercalar Consultas como Novas** (cria query nova) ou **Intercalar Consultas** (modifica a actual)
2. Tabela 1: `Eventos`; clicar na coluna `IDProduto`
3. Tabela 2: `Produtos`; clicar na coluna `IDProduto`
4. Tipo de Associação: **Externa à Esquerda (LEFT JOIN)** — mantém todas as linhas de Eventos e traz dados de Produtos quando há correspondência
5. Verificar mensagem: "A selecção corresponde X de X linhas da primeira tabela" (deve dar 100%)
6. OK
7. Resultado: aparece uma coluna nova chamada `Produtos` com valor `Table` em cada linha
8. Clicar no ícone das **duas setas** no cabeçalho dessa coluna → escolher os campos a expandir (ex.: `Categoria`, `Descrição`) → desmarcar **"Utilizar o nome de coluna original como prefixo"** → OK

!!! info "Tipos de associação (JOIN)"
    | Tipo | Mantém |
    |---|---|
    | **Externa à Esquerda** | Tudo da tabela 1 + correspondências da tabela 2 (mais comum) |
    | **Externa à Direita** | Tudo da tabela 2 + correspondências da tabela 1 |
    | **Externa Completa** | Todas as linhas de ambas |
    | **Interna** | Só as que existem em ambas |
    | **Anti-Esquerda** | Só as da tabela 1 que **não** estão na 2 (útil para detectar lacunas) |

---

## Tarefa 3 — Modelo de dados

Em vez de fazer merge no Power Query (que duplica dados), pode **manter as tabelas separadas** e criar um **relacionamento** entre elas.

1. Carregar ambas as tabelas: `Eventos` e `Produtos`
2. Ir à **vista de Modelo** (3.º ícone na barra esquerda)
3. **Drag & drop**: arrastar `IDProduto` de `Eventos` para `IDProduto` em `Produtos`
4. O Power BI deteta a cardinalidade automaticamente — geralmente **muitos-para-um** (1:N)
5. Confirmar (a seta deve apontar de Produtos → Eventos: a dimensão filtra a facto)

!!! tip "Star Schema mini"
    Aqui temos um **modelo estrela em miniatura**:

    - **Facto**: `Eventos` (cada linha é um evento, com FKs para Produto, Espaço, etc.)
    - **Dimensão**: `Produtos` (cada linha é um produto/categoria com atributos descritivos)

    Quando filtrar pela categoria de produto, todos os eventos relacionados são automaticamente filtrados. **Esta é a magia do modelo Power BI**.

---

## Tarefa 4 — DAX mínimo (15 minutos)

DAX (Data Analysis Expressions) é a linguagem de fórmulas do Power BI. Parece-se com Excel mas trabalha sobre tabelas inteiras. Vamos aprender **só o essencial** — duas formas, cinco funções, e está feito.

### a) Auto-aggregation (Σ) — sem DAX

A primeira coisa a fazer **antes de escrever DAX** é tentar a auto-aggregation:

1. Arrastar um campo numérico (ex.: `Quantidade`) para um visual
2. O Power BI faz **Sum(Quantidade)** automaticamente
3. Se quiser mudar (Average, Count, etc.) → clicar na seta ao lado do campo no Field Well → escolher

✅ **Para 70% dos casos, isto chega.** Não precisa de DAX nenhum.

### b) Coluna Calculada (DAX) — quando é preciso

Para criar `Valor Venda = Preço Unit × Quantidade` como coluna fixa na tabela:

1. Vista de Dados → seleccionar a tabela `Eventos`
2. **Modelação → Nova Coluna** (ou botão direito na tabela)
3. Escrever:

```
Valor Venda = [Preço Unit] * [Quantidade]
```

4. Enter

!!! tip "Mas... eu já fiz isto em Power Query!"
    Sim, a Custom Column do Power Query (Tarefa 1d) faz exactamente o mesmo. **Quando preferir uma e quando a outra**:

    | Situação | Recomendado |
    |---|---|
    | Cálculo simples linha-a-linha (multiplicação, soma, concatenação) | **Power Query** (Custom Column) |
    | Cálculo que precisa de outras tabelas (RELATED) | **DAX** (Calculated Column) |
    | KPI agregado (rácio, total, contagem) | **DAX** (Medida — ver alínea c) |

### c) Medida (DAX) — para KPIs agregados

Uma **medida** calcula um valor agregado (1 número) que muda consoante os filtros aplicados.

1. **Modelação → Nova Medida**
2. Escrever:

```
Total Vendas = SUM(Eventos[Valor Venda])
```

3. Enter

Diferenças vs Coluna Calculada:

| Aspecto | Coluna Calculada | Medida |
|---|---|---|
| Sintaxe | `[Coluna]` (mesma tabela) | `Tabela[Coluna]` (sempre completo) |
| Quando calcula | Uma vez, ao carregar | Sob demanda, no visual |
| Memória | Ocupa | Não ocupa |
| Mostra-se em | Linha da tabela | Cartão / Field Well |

### d) As 5 funções DAX que precisa de saber

| Função | Para quê | Exemplo |
|---|---|---|
| `SUM` | Somar coluna numérica | `SUM(Vendas[Valor])` |
| `AVERAGE` | Média | `AVERAGE(Vendas[Preço Unit])` |
| `COUNT` | Contar valores não-nulos | `COUNT(Vendas[NIF])` |
| `COUNTROWS` | Contar todas as linhas | `COUNTROWS(Vendas)` |
| `DIVIDE` | Divisão segura (trata divisão por zero) | `DIVIDE([Lucro], [Vendas])` |

!!! warning "Use DIVIDE em vez de /"
    `[a] / [b]` dá erro se `b = 0`. `DIVIDE([a], [b])` devolve em branco (BLANK) — comportamento mais seguro.

### e) O que NÃO ensinar (e está bem assim)

Ficam **explicitamente fora** deste módulo:

- `CALCULATE` — modificar contexto de filtro
- `FILTER` — filtrar tabelas dentro de DAX
- `RELATED` — atravessar relações
- Time intelligence (`SAMEPERIODLASTYEAR`, `DATESYTD`)
- `VAR` / `RETURN`, contexto de filtro, contexto de linha

Para o vosso nível, **estas 2 fórmulas e 5 funções chegam**. O resto é DAX avançado, para quem se especializa em BI.

[Consulte a referência :material-arrow-right: DAX Mínimo](dax-minimo.md){ .md-button }

---

## Tarefa 5 — Categoria de Dados

Duas situações em que precisa:

### a) Mostrar fotos numa tabela

Tem uma coluna `LinkImagem` com URLs de fotos? Para que apareçam **como imagens** e não como texto:

1. Vista de Dados → clicar na coluna `LinkImagem`
2. Separador **Ferramentas de coluna → Categoria de dados → URL da Imagem**
3. Voltar à vista de Relatório → criar uma tabela com `LinkImagem`, `Vendedor`, `Receita` → as fotos aparecem em vez do texto

### b) Mapa funciona melhor

Para mapas mais precisos, marque a coluna geográfica:

1. Vista de Dados → coluna `Concelho`
2. **Ferramentas de coluna → Categoria de dados → Concelho**
3. Idem para `Distrito`, `País`, `Código Postal`, etc.

!!! tip "Sem isto"
    O Bing Maps tenta adivinhar — frequentemente confunde "Lisboa" cidade com "Lisboa" distrito, ou geocodifica para outro continente. Categorizar elimina ambiguidades.

---

## Tarefa 6 — Hierarquia de datas e drill-down

Quando importa uma coluna `Data`, o Power BI cria automaticamente uma **hierarquia de 4 níveis**: `Ano → Trimestre → Mês → Dia`.

### Usar a hierarquia

1. Arrastar a coluna `Data` para o eixo de um gráfico
2. Aparece "Ano" como nível inicial
3. No canto superior do visual, surgem ícones de drill:
    - :material-arrow-up: **Drill up**
    - :material-arrow-down: **Drill down (modo activo)**
    - :material-arrow-expand-vertical: **Expand all down one level**

4. Clicar em **Drill down** (seta para baixo dupla) → activa o modo
5. Clicar numa coluna (ex.: "2025") → desce para Trimestres
6. Clicar de novo → desce para Meses

!!! info "Auto Date/Time vs Date Table manual"
    A hierarquia automática é boa para começar mas tem limitações. Para análises temporais sérias (ano fiscal, feriados, comparações homólogas), cria-se uma **Date Table** manualmente — assunto da próxima aula.

---

## Tarefa 7 — Q&A (Perguntas e Respostas)

O Power BI permite escrever perguntas em **linguagem natural** e gerar visuais automaticamente.

1. Inserir → visual **Q&A** (ou usar `Modelação → Configuração das Perguntas e Respostas`)
2. Na caixa, escrever: `receita por vendedor`
3. O Power BI sugere visuais e dados
4. Clicar para fixar o visual

### Configurar sinónimos (importante em PT)

A linguagem natural funciona muito melhor em inglês. Para PT:

1. **Modelação → Configuração das Perguntas e Respostas**
2. Aba **Sinónimos**: tabela `Vendas` → adicionar sinónimos como "encomendas", "vendas", "receita"
3. Aba **Sugerir perguntas**: adicionar perguntas pré-feitas

!!! warning "Aviso de descontinuação — Q&A → Copilot"
    A Microsoft anunciou que **as funcionalidades Q&A serão descontinuadas em Dezembro de 2026**, sendo substituídas pelo **Copilot para Power BI**. Pode continuar a usar Q&A até lá, mas para projectos novos prefira Copilot quando estiver disponível na sua organização.

---

## Tarefa 8 — Aplicar à Ficha 01/04

Agora resolva a [**Ficha Prática 01**](exercicios.md#ficha-01) usando `Dados_Excel.xlsx` + `dProduto.txt`. Vai aplicar:

- Texto Entre Delimitadores (extrair `Garcia` de `#S_Garcia_##`)
- Mudança de tipo (ID Produto para texto)
- Merge Queries (juntar Vendas + dProduto)
- Coluna Calculada DAX (`Valor Venda`) e Medida (`Total`)
- Categoria de Dados (URL da Imagem para fotos)
- Q&A

---

## Checklist da aula

- [ ] Texto Entre Delimitadores
- [ ] Split Column (3 modos)
- [ ] Conditional Column (substituir null)
- [ ] Custom Column
- [ ] Merge Queries (LEFT JOIN)
- [ ] Criar relacionamento na vista de Modelo
- [ ] Coluna Calculada DAX (`[A]*[B]`)
- [ ] Medida DAX (`SUM(...)`)
- [ ] Categoria de Dados (URL Imagem, Concelho)
- [ ] Drill-down em hierarquia de datas
- [ ] Q&A com sinónimos PT

---

!!! tip "Próximo passo"
    Na [**Aula 11 — Do Dashboard ao Munícipe**](aula-11.md) vamos polir o dashboard com filtros Top N, slicers, KPIs avançados, e publicá-lo no **Power BI Service** com cuidados de RGPD para AP.
