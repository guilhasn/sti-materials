# Fichas Práticas — Power BI

Três fichas progressivas para resolver autonomamente, com cenários reais de administração pública e empresarial.

!!! info "Como usar estas fichas"
    1. Resolver primeiro a [**Ficha 03**](#ficha-03) (mais simples — cenário CSV com 3 visualizações)
    2. Depois a [**Ficha 01/04**](#ficha-01) (workflow completo com merge, DAX, fotos)
    3. Por fim a [**Ficha 02/05**](#ficha-02) (caso real de contratação pública portuguesa)

    Em caso de dúvida, consultar:

    - [Aula 9](aula-09.md), [Aula 10](aula-10.md), [Aula 11](aula-11.md)
    - [Ficha de Consulta Rápida](cheat-sheet.md)
    - [DAX Mínimo](dax-minimo.md)
    - [Erros Frequentes](erros-frequentes.md)

---

## Ficha 03 — Vendas por Cidade {#ficha-03}

!!! abstract "Cenário"
    Tem um ficheiro CSV com vendas de uma empresa, e precisa de produzir três visualizações simples para apresentar à chefia.

### Recursos

- :material-file-pdf-box: [**Enunciado da Ficha**](datasets/Ficha03_STI-MAP.pdf) (PDF)
- :material-file-delimited: [**ExercBI.csv**](datasets/ExercBI.csv) (dataset)

### O que vai praticar

- Importar CSV
- Criar visual **Mapa** (vendas por cidade)
- Criar **Gráfico de colunas** (vendas por mês)
- Criar **Treemap** (vendas por vendedor)

### Cobertura pedagógica

| Aula | Conteúdo aplicado |
|------|-------------------|
| Aula 9 | Get Data CSV, primeiras visualizações, mapa, gráfico de colunas, treemap |

---

## Ficha 01 / 04 — Vendas com Produtos e Fotos {#ficha-01}

!!! abstract "Cenário"
    Recebeu um Excel com vendas e um ficheiro de texto com o catálogo de produtos. Os dados precisam de ser limpos (vendedor com formato `#S_Garcia_##`), as duas tabelas precisam de ser **juntas**, e o relatório final inclui **fotos dos vendedores** num formato visual.

!!! note "Fichas 01 e 04 são idênticas"
    A Ficha 04 é uma reedição da Ficha 01, mantida para alinhamento com edições anteriores. Resolver uma equivale a resolver as duas.

### Recursos

- :material-file-pdf-box: [**Enunciado da Ficha 01**](datasets/Ficha01_STI-MAP.pdf) (PDF)
- :material-file-pdf-box: [**Enunciado da Ficha 04**](datasets/Ficha04_STI-MAP.pdf) (PDF — idêntica à 01)
- :material-microsoft-excel: [**Dados_Excel.xlsx**](datasets/Dados_Excel.xlsx) (vendas)
- :material-file-document-outline: [**dProduto.txt**](datasets/dProduto.txt) (catálogo de produtos)

### O que vai praticar

| Etapa | Operação |
|-------|----------|
| **Importar** | Excel + Texto/CSV |
| **Power Query — limpeza** | Texto Entre Delimitadores (extrair `Garcia` de `#S_Garcia_##`) |
| **Power Query — modelo** | Mudar tipo (ID Produto para texto), Merge Queries (Vendas + dProduto) |
| **DAX mínimo** | Coluna calculada `Valor Venda = [Preço Unit] * [Quantidade]` |
| **DAX mínimo** | Medida `Total Vendas = SUM(Vendas[Valor Venda])` |
| **Visualizações** | Cartão (total), Contagem por Vendedor (barras), Receita por Ano/Trimestre (drill-down), Receita por Produto |
| **Categoria de Dados** | URL da Imagem para mostrar fotos numa tabela |
| **Editar Interações** | Remover cross-filter entre visuais específicos |
| **Q&A** | Configurar perguntas em linguagem natural |

### Cobertura pedagógica

| Aula | Conteúdo aplicado |
|------|-------------------|
| Aula 9 | Get Data, Power Query básico, primeiras visualizações |
| Aula 10 | Texto Entre Delimitadores, Merge Queries, DAX mínimo (coluna + medida), Categoria de Dados (URL Imagem), hierarquia de datas, Q&A |
| Aula 11 | Editar Interações |

---

## Ficha 02 / 05 — Contratação Pública Portuguesa 2019 {#ficha-02}

!!! abstract "Cenário"
    Trabalha no Tribunal de Contas e foi-lhe pedido um dashboard sobre **contratação pública em Portugal em 2019** — 124 868 contratos públicos, valores adjudicados, entidades adjudicantes (do lado público), entidades adjudicatárias (do lado privado), tipos de contrato (códigos CPV).

!!! note "Fichas 02 e 05 são idênticas"
    A Ficha 05 difere apenas no link do dataset (Ficha 02 usa ficheiro local; Ficha 05 aponta para [dados.gov.pt](https://dados.gov.pt/pt/datasets/contratacaopublica-contratos-2019/)).

### Recursos

- :material-file-pdf-box: [**Enunciado da Ficha 02**](datasets/Ficha02_STI-MAP.pdf) (PDF)
- :material-file-pdf-box: [**Enunciado da Ficha 05**](datasets/Ficha05_STI-MAP.pdf) (PDF)
- :material-microsoft-excel: [**contratos2019.xlsx**](datasets/contratos2019.xlsx) (124 868 linhas)
- Alternativa para Ficha 05: descarregar de [dados.gov.pt — contratação pública 2019](https://dados.gov.pt/pt/datasets/contratacaopublica-contratos-2019/)

### O que vai praticar

| Etapa | Operação |
|-------|----------|
| **Importar** | Excel grande (~125k linhas) |
| **Power Query — split** | Coluna Adjudicante → NIF + Nome (delimitador `–`) |
| **Power Query — split** | Coluna Local Execução → País + Distrito + Concelho (delimitador `,`) |
| **Power Query — coluna condicional** | `Concelho2 = SE Concelho = null ENTÃO Distrito SENÃO Concelho` |
| **Visualizações página 1 — Entidades Adjudicantes** | Cartão `7.669,64 M` (valor total em milhões); TOP 10 entidades por valor; Tabela TOP 10 por contagem; Mapa Portugal por concelho |
| **Visualizações página 2 — Entidades Adjudicatárias** | TOP 10 por valor (barras); TOP 10 por contagem (tabela); Cartão com nº total contratos (`124868`) |
| **Visualizações página 3 — CPV (códigos)** | Donut TOP 20 dos tipos de contrato |
| **Renomear páginas** | "Página 1" → "Entidades Adjudicantes", etc. |
| **Filtros Top N** | TOP 10 / TOP 20 nos visuais |
| **Categoria de Dados** | Concelho (para mapa funcionar) |
| **Formatação** | Mudar unidades para milhões (M) |

### Cobertura pedagógica

| Aula | Conteúdo aplicado |
|------|-------------------|
| Aula 10 | Split Column (3 modos), Conditional Column, Categoria de Dados (Concelho) |
| Aula 11 | Filtros Top N, Cartões, Mapa, gestão de páginas |

### Observações pedagógicas

Esta é a ficha mais **realista e exigente**. Aspectos a destacar:

- **Volume real**: 125 mil linhas — sente-se a diferença de performance face aos exercícios de aula
- **Dados reais**: vê empresas concretas (MOTA, EDP, MEO, SACYR, generis, B. BRAUN MEDICAL) e valores que circulam mesmo na contratação pública
- **Códigos CPV**: vocabulário oficial europeu (Common Procurement Vocabulary) — `45234100-7 — Construção de vias férreas`
- **Cuidados RGPD**: NIFs no dataset não devem ser publicados sem máscara

---

## Sequência sugerida de resolução

### 1.ª aula prática (após Aula 9)

- **Ficha 03** completa em ~30 min
- Início da **Ficha 01** (importação + Power Query)

### 2.ª aula prática (após Aula 10)

- Conclusão da **Ficha 01** (DAX, fotos, Q&A)
- Início da **Ficha 02** (Power Query — splits e conditional column)

### 3.ª aula prática (após Aula 11)

- Conclusão da **Ficha 02** (visualizações, Top N, formatação)
- Publicação no Power BI Service (opcional, demonstração)

---

## Critérios de avaliação (sugeridos)

Para cada ficha entregue, o docente avalia:

| Critério | Peso |
|---|---|
| Importação e Power Query (tipos, splits, merges, conditional column) | 25% |
| Modelo de dados (relacionamentos, categoria de dados) | 15% |
| DAX mínimo (coluna calculada, medida) — quando aplicável | 10% |
| Visualizações (escolha apropriada, formatação, filtros) | 30% |
| Apresentação visual (cores intencionais, alinhamento, títulos claros) | 15% |
| Cuidados RGPD em dados sensíveis | 5% |

---

!!! tip "Próximo passo após as fichas"
    Concluiu as 3 fichas? Algumas sugestões:

    1. **Reaplique a um caso da sua organização** — escolha um Excel com que trabalha e construa um dashboard equivalente
    2. **Publique no Power BI Service** e partilhe com colegas para feedback
    3. **Explore PORDATA Municípios** ou **dados.gov.pt** para outros datasets reais portugueses

    A melhor forma de aprender Power BI é resolvendo problemas reais — qualquer Excel com 50+ linhas dá um bom exercício.
