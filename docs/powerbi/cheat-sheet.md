# Ficha de Consulta Rápida — Power BI

Página de referência com os **atalhos, comandos e padrões** mais usados no Power BI Desktop. Para imprimir e ter ao lado do teclado.

---

## 1. As 3 vistas

| Vista | Ícone | Para quê |
|---|---|---|
| **Relatório** | :material-chart-bar: | Desenhar gráficos (80% do tempo aqui) |
| **Dados** | :material-table: | Inspeccionar tabelas em formato folha de cálculo |
| **Modelo** | :material-graph: | Ver caixas e relações (≈ diagrama E-R) |

---

## 2. Workflow padrão — 5 passos

```
GET → TRANSFORM → MODEL → VISUALIZE → PUBLISH
```

1. **Get Data** — Excel, CSV, Web, Folder, SQL, Access
2. **Transform** — Power Query: limpar, juntar, filtrar
3. **Model** — relacionamentos + medidas DAX
4. **Visualize** — cartões, gráficos, mapas, tabelas
5. **Publish** — Power BI Service → partilhar

---

## 3. Power Query — atalhos essenciais

| Operação | Onde |
|---|---|
| **Promove headers** | Home → Use First Row as Headers |
| **Mudar tipo de coluna** | Ícone à esquerda do nome (ABC/123/calendário) |
| **Locale para datas PT** | Botão direito → Change Type → Using Locale → Português (Portugal) |
| **Trim & Clean** | Transform → Format → Trim / Clean |
| **Remove Blank Rows** | Home → Remove Rows → Remove Blank Rows |
| **Remove Duplicates** | Botão direito coluna → Remove Duplicates |
| **Split Column** | Home → Split Column → By Delimiter |
| **Texto Entre Delimitadores** | Transform → Extract → Text Between Delimiters |
| **Conditional Column** | Add Column → Conditional Column |
| **Custom Column** | Add Column → Custom Column |
| **Group By** | Home → Group By |
| **Merge Queries** | Home → Merge Queries (LEFT JOIN é o default) |
| **Append Queries** | Home → Append Queries (empilhar tabelas) |
| **Pivot / Unpivot** | Transform → Unpivot Columns |
| **Replace Values** | Botão direito coluna → Replace Values |

!!! tip "Reference vs Duplicate"
    - **Reference** — query nova ligada à original; alterações na original propagam-se
    - **Duplicate** — cópia totalmente independente

---

## 4. DAX mínimo

### Coluna Calculada (cria coluna fixa)

```
Valor Venda = [Preço Unit] * [Quantidade]
```

### Medida (cálculo agregado)

```
Total Vendas = SUM(Vendas[Valor Venda])
```

### As 5 funções essenciais

| Função | Para quê |
|---|---|
| `SUM(Tabela[Coluna])` | Somar |
| `AVERAGE(Tabela[Coluna])` | Média |
| `COUNT(Tabela[Coluna])` | Contar não-nulos |
| `COUNTROWS(Tabela)` | Contar linhas |
| `DIVIDE([a], [b])` | Divisão segura (trata ÷0) |

→ Página completa: [DAX Mínimo](dax-minimo.md)

---

## 5. Visualizações — escolha rápida

| Pergunta de negócio | Visual |
|---|---|
| 1 KPI único (total) | **Card** |
| KPI vs meta com tendência | **KPI** |
| Lista detalhada | **Table** |
| Pivot table com totais | **Matrix** |
| Comparar categorias | **Clustered Bar/Column** |
| Evolução temporal | **Line Chart** |
| Volume + tendência | **Combo Chart** (linha + barras) |
| Composição (≤5 categorias) | **Donut** |
| Hierarquia de partes | **Treemap** |
| Distribuição geográfica | **Map** ou **Filled Map** |
| Filtro interactivo | **Slicer** |
| Etapas com queda | **Funnel** |
| Pergunta linguagem natural | **Q&A** ⚠️ a descontinuar Dez/2026 |

---

## 6. Categoria de Dados (importante)

| Categoria | Para quê |
|---|---|
| **Concelho / Distrito / País / Código Postal** | Mapa funciona correctamente |
| **URL da Imagem** | Mostra fotos em vez de texto |
| **URL da Web** | Torna links clicáveis |
| **Latitude / Longitude** | Coordenadas precisas no mapa |

**Onde**: Vista de Dados → seleccionar coluna → Ferramentas de coluna → Categoria de Dados

---

## 7. Filtros — 3 níveis

| Nível | Afecta |
|---|---|
| **Visual filter** | Só este visual |
| **Page filter** | Toda a página |
| **Report filter** | Todo o `.pbix` |

### Top N

Painel Filters → expandir campo → **Tipo de filtro: N Principais** → Top/Bottom + número + Por valor

---

## 8. Editar Interações

Visual seleccionado → Format → Edit Interactions → escolher por cada outro visual:

| Modo | Quando |
|---|---|
| :material-filter: **Filter** | Tabelas, mapas (default) |
| :material-format-paint: **Highlight** | Colunas/barras (default) |
| :material-cancel: **None** | KPIs, cartões com totais gerais |

---

## 9. Star Schema (modelo)

```
       Dim_Munícipe ─────┐
                         │
       Dim_Departamento ─┤
                         │
                  ┌──── Fact_Atendimento ──── Dim_Data
                         │
       Dim_Tipo ─────────┘
```

- **Fact**: eventos com FKs para dimensões + métricas (€, contagens, durações)
- **Dim**: descritivas, "achatadas" (uma linha por munícipe com tudo)

---

## 10. Power BI Service

| Operação | Onde |
|---|---|
| **Publicar** | Desktop → File → Publish |
| **Refresh agendado** | Service → Modelo Semântico → Settings → Scheduled refresh |
| **Gateway local** | Para fontes on-premises (SQL na câmara) |
| **Partilhar** | Workspace → Create App → Audiences |
| **RLS** | Desktop → Modeling → Manage Roles |
| **Sensitivity Labels** | Service → Sensitivity → "Confidencial - RGPD" |

---

## 11. Atalhos de teclado

| Atalho | Acção |
|---|---|
| `Ctrl + S` | Guardar |
| `Ctrl + Z` / `Ctrl + Y` | Desfazer / Refazer |
| `Ctrl + roda do rato` | Zoom no canvas |
| `Ctrl + clique` | Seleccionar múltiplos visuais |
| `Ctrl + C` / `Ctrl + V` | Copiar / colar visual |
| `Alt + clique` | Cross-filter sem libertar selecção |
| `F5` | Refresh |
| `Ctrl + Shift + V` | Ver vista de Modelo |

---

## 12. Boas práticas em 1 página

### ✅ Fazer

- Sempre passar pelo **Power Query** antes de visualizar
- **Confirmar tipos de coluna** logo no início
- **Star schema**: 1 facto + N dimensões
- **Date Table** marcada como tal
- **Sensitivity Labels** em qualquer relatório com dados pessoais
- **Apps** em vez de partilha individual
- **Mobile Layout** se vão consultar no telemóvel

### ❌ Evitar

- **Publish to Web** com dados sensíveis (perigo legal)
- Usar **My Workspace** para produção
- Datasets com **uma única tabela achatada** (perde filtragem)
- **Pie chart** com mais de 5 fatias (use barras)
- **3D**, sombras, gradientes, ícones decorativos
- Usar `[a] / [b]` em vez de `DIVIDE([a], [b])`
- Esquecer **refresh agendado** (relatório fica desactualizado)
- **Bidirectional** filter direction sem necessidade

---

## 13. Datasets para praticar

- [`atendimento-vila-feliz.xlsx`](datasets/atendimento-vila-feliz.xlsx) — atendimento ao munícipe
- [`eventos-vila-feliz.xlsx`](datasets/eventos-vila-feliz.xlsx) — eventos culturais
- [Portal BASE — contratação pública](https://www.base.gov.pt) — dados reais
- [PORDATA Municípios](https://www.pordata.pt/municipios) — séries por município
- [dados.gov.pt](https://dados.gov.pt) — catálogo nacional de dados abertos
