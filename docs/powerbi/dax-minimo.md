# DAX Mínimo — Referência Rápida

Esta página contém **tudo o que precisa de saber sobre DAX** para resolver as fichas práticas. Não é um curso de DAX. É um **kit mínimo viável** — 15 a 20 minutos de estudo, e está pronto.

!!! tip "Filosofia"
    DAX é uma linguagem profunda. Aqui ficamos pelo **superficial intencionalmente**. Para 80% dos casos da AP, só precisa de **2 padrões e 5 funções**. O resto é especialização.

---

## O que é DAX em uma frase

**DAX** (*Data Analysis Expressions*) é a linguagem de fórmulas do Power BI, parecida com fórmulas Excel mas que trabalha **sobre tabelas inteiras** em vez de células individuais.

Se já escreveu `=A1*B1` no Excel, já fez 80% do esforço mental.

---

## Antes de DAX, tente o Σ

A primeira regra: **antes de escrever DAX, veja se a auto-aggregation chega**.

Quando arrasta um campo numérico para um visual:

- O Power BI faz automaticamente `Sum`, `Average`, `Count`, etc.
- Aparece o ícone **Σ** ao lado do campo
- Pode mudar a agregação clicando na seta do campo no Field Well

✅ Para 70% dos casos, **isto chega**. Não precisa de DAX nenhum.

---

## Os 3 conceitos fundamentais

| Conceito | O que faz | Memória | Quando calcula |
|---|---|---|---|
| **Auto-aggregation (Σ)** | Soma/conta automaticamente um campo no visual | — | Sob demanda |
| **Coluna Calculada** | Cria coluna nova na tabela, linha a linha | Ocupa | Uma vez, ao carregar |
| **Medida** | Cálculo agregado (devolve 1 número) | Não ocupa | Sob demanda, no visual |

**Regra de ouro**: na dúvida, prefira **Medida**. É mais leve, mais rápida, mais profissional.

---

## Os 2 padrões DAX que vai usar

### Padrão A — Coluna Calculada (multiplicação simples)

```
Valor Venda = [Preço Unit] * [Quantidade]
```

**Como criar**:

1. Vista de Dados → seleccionar a tabela
2. **Modelação → Nova Coluna** (ou botão direito na tabela → *Nova coluna*)
3. Escrever a fórmula → Enter

**Sintaxe**: dentro da própria tabela, basta `[Coluna]`.

!!! warning "Mas... o Power Query também faz isto"
    Sim, e geralmente é melhor. Veja na próxima secção quando preferir cada um.

### Padrão B — Medida (soma)

```
Total Vendas = SUM(Vendas[Valor Venda])
```

**Como criar**:

1. **Modelação → Nova Medida**
2. Escrever a fórmula → Enter

**Sintaxe**: numa medida, refere a coluna como `Tabela[Coluna]` (sempre completo).

!!! tip "Diferenças subtis mas importantes"
    | | Coluna Calculada | Medida |
    |---|---|---|
    | Sintaxe | `[Coluna]` | `Tabela[Coluna]` |
    | Mostra-se em | Linha da tabela | Cartão / Field Well |
    | Memória | Ocupa | Não ocupa |
    | Calcula | Uma vez | Sob demanda |

---

## DAX vs Power Query — quando usar cada

A coluna calculada DAX (`[A]*[B]`) **pode ser feita em Power Query** com **Custom Column** (mesma fórmula). Quando preferir cada uma?

| Situação | Solução recomendada |
|---|---|
| Somar/contar/média de uma coluna num visual | **Auto-aggregation (Σ)** — sem DAX |
| Total/média que vai ser reutilizado em vários visuais | **Medida DAX** (`SUM`, `AVERAGE`) |
| Coluna nova = operação entre 2 colunas da mesma linha | **Power Query** (Custom Column) |
| Coluna nova com categoria (ex.: "Caro/Médio/Barato") | **Power Query** (preferível) |
| KPI (rácio, margem, taxa) | **Medida DAX** com `DIVIDE` |
| Contar registos numa tabela | **Medida DAX** (`COUNTROWS`) |
| Cálculo que envolve várias tabelas relacionadas | DAX (mas é avançado — fora do âmbito) |
| Limpeza/transformação de dados antes de carregar | **Power Query** (sempre) |

**Princípio**: **Power Query primeiro**. DAX só quando for métrica agregada (Medida) ou quando a fórmula precisa atravessar relações.

---

## As 5 funções DAX essenciais

### 1. `SUM` — somar coluna numérica

```
Total Vendas = SUM(Vendas[Valor])
Total Atendimentos = SUM(Atendimentos[Duração])
```

### 2. `AVERAGE` — média

```
Preço Médio = AVERAGE(Vendas[Preço Unit])
Tempo Médio Espera = AVERAGE(Atendimentos[Tempo])
```

### 3. `COUNT` — contar valores não-nulos

```
N Munícipes Atendidos = COUNT(Atendimentos[NIF])
```

### 4. `COUNTROWS` — contar todas as linhas

```
N Atendimentos = COUNTROWS(Atendimentos)
N Contratos = COUNTROWS(Contratos)
```

!!! tip "COUNT vs COUNTROWS"
    - `COUNT(coluna)` — conta valores **não-nulos** numa coluna
    - `COUNTROWS(tabela)` — conta **todas as linhas** da tabela

    Para "quantos atendimentos houve", `COUNTROWS` é mais seguro (não depende de uma coluna específica não ter nulls).

### 5. `DIVIDE` — divisão segura

```
Margem % = DIVIDE([Lucro], [Vendas])
Taxa Resolução = DIVIDE([Resolvidos], [Total Pedidos])
```

!!! warning "Use DIVIDE em vez de /"
    `[a] / [b]` dá **erro** se `b = 0`.
    `DIVIDE([a], [b])` devolve **em branco (BLANK)** — comportamento mais seguro e visualmente mais limpo no relatório.

---

## Exemplos completos para AP

### KPI básico — total de atendimentos

```
Total Atendimentos = COUNTROWS(Atendimentos)
```

→ usar num cartão.

### Tempo médio de espera

```
Tempo Médio = AVERAGE(Atendimentos[Tempo])
```

### Taxa de resolução no 1º contacto

```
Taxa Resolução = DIVIDE(
    CALCULATE(COUNTROWS(Atendimentos), Atendimentos[Estado] = "Resolvido"),
    COUNTROWS(Atendimentos)
)
```

⚠️ **Esta usa `CALCULATE`** — função avançada que não cobrimos. Se precisar deste KPI, peça ajuda ao docente ou faça em Power Query (criar coluna `Resolvido` = 1 ou 0, depois somar).

### Total adjudicado em contratos

```
Total Adjudicado = SUM(Contratos[ValorContratual])
```

### Valor médio por contrato

```
Valor Médio = AVERAGE(Contratos[ValorContratual])
```

### Coluna calculada — Valor da venda

```
Valor Venda = [Preço Unit] * [Quantidade]
```

⚠️ Lembrete: este caso é **melhor em Power Query** (Custom Column). Mas funciona em DAX também.

---

## O que NÃO ensinamos (e está bem assim)

Ficam **explicitamente fora** deste módulo:

| Função / Conceito | Para quê serve | Quando vai precisar |
|---|---|---|
| `CALCULATE` | Modificar contexto de filtro | Curso avançado de DAX |
| `FILTER` | Filtrar tabelas dentro de DAX | Curso avançado |
| `RELATED` | Atravessar relações (1:N) | Quando tiver 5+ tabelas |
| `SUMX` / `AVERAGEX` | Iterar linha a linha com agregação | Cálculos complexos |
| `SAMEPERIODLASTYEAR`, `DATESYTD` | Comparações temporais | Análise de séries longas |
| `VAR` / `RETURN` | Variáveis em DAX | Cálculos com 4+ passos |
| Filter context, row context | Conceitos teóricos | Especialização BI |

**Mensagem-chave**: estas 2 fórmulas e 5 funções **chegam** para o nível iniciante. Quando tiver de fazer mais, sabe que existe DAX avançado e procura ajuda.

---

## Checklist — sei DAX mínimo se...

- [ ] Sei que DAX é a linguagem de fórmulas do Power BI
- [ ] Sei distinguir Coluna Calculada de Medida (em conceito e sintaxe)
- [ ] Sei que auto-aggregation (Σ) é frequentemente suficiente
- [ ] Sei criar `Coluna = [A] * [B]` em Modelação → Nova Coluna
- [ ] Sei criar `Medida = SUM(Tabela[Coluna])` em Modelação → Nova Medida
- [ ] Sei usar SUM, AVERAGE, COUNT, COUNTROWS, DIVIDE
- [ ] Sei que prefiro Power Query a DAX para cálculos linha-a-linha
- [ ] Sei que CALCULATE existe mas não vou usar agora

Se respondeu sim a tudo — **está pronto para resolver as fichas**.
