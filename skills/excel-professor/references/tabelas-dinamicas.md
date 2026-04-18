# Tabelas Dinâmicas: Guia de Ensino

## Base de dados de exemplo

Use esta base para demonstração:

| Data | Mês | Região | Categoria | Vendedor | Produto | Vendas |
|---|---|---|---|---|---|---:|
| 2026-01-01 | Jan | Norte | Periféricos | Ana | Teclado | 120 |
| 2026-01-05 | Jan | Sul | Hardware | Bruno | Monitor | 300 |
| 2026-01-12 | Jan | Norte | Hardware | Carla | SSD | 220 |
| 2026-02-03 | Fev | Centro | Periféricos | Ana | Webcam | 95 |
| 2026-02-11 | Fev | Sul | Periféricos | Bruno | Rato | 80 |
| 2026-02-18 | Fev | Norte | Hardware | Carla | Dock | 150 |
| 2026-03-02 | Mar | Centro | Hardware | Ana | Portatil | 900 |
| 2026-03-09 | Mar | Sul | Periféricos | Carla | Headset | 130 |

## Pré-condições da origem de dados

Confirmar sempre antes de criar a tabela dinâmica:
- Cabeçalhos únicos na primeira linha.
- Sem linhas totalmente vazias no meio da tabela.
- Sem colunas totalmente vazias.
- Tipos de dados coerentes por coluna (evitar texto misturado com número na mesma coluna).
- Intervalo completo com todos os registos.
- Preferir converter a origem para Tabela de Excel (Ctrl+T) para facilitar atualizações.

## Criação passo a passo

1. Selecionar qualquer célula dentro da base.
2. Ir a `Inserir > Tabela Dinâmica`.
3. Confirmar intervalo e escolher `Nova Folha de Cálculo`.
4. Na lista de campos, arrastar:
- Campo de categoria para `Linhas`.
- Campo numérico para `Valores`.

## Estrutura de campos

- `Linhas`: organiza os grupos principais.
- `Colunas`: cruza uma segunda dimensão.
- `Valores`: aplica agregações (Soma, Contagem, Média).
- `Filtros`: restringe a visão global.

## Exercícios mínimos recomendados

### Exercício 1: Total por categoria
- Linhas: `Categoria`
- Valores: `Vendas` (Soma)

### Exercício 2: Contagem por vendedor
- Linhas: `Vendedor`
- Valores: `Produto` (Contagem)

### Exercício 3: Análise por mês
- Linhas: `Mês`
- Valores: `Vendas` (Soma)
- Filtro: `Região` (se existir)

Resultados esperados com a base acima:
- Soma por `Categoria`: Hardware = 1570, Periféricos = 425
- Contagem por `Vendedor`: Ana = 3, Bruno = 2, Carla = 3

## Ajustes que devem ser ensinados

- Mudar agregação em `Valores`:
  - Soma
  - Contagem
  - Média
- Aplicar formatação numérica.
- Ordenar do maior para o menor.
- Atualizar tabela dinâmica após alteração da base (`Atualizar`).

## Erros comuns e correção

- Problema: resultado incompleto.
  - Causa provável: intervalo de origem não inclui novas linhas.
  - Correção: alterar origem de dados ou converter origem em Tabela de Excel.

- Problema: contagem inesperada.
  - Causa provável: campos vazios ou dados mistos.
  - Correção: limpar dados e padronizar colunas.

- Problema: tabela não atualiza.
  - Causa provável: utilizador não executou `Atualizar`.
  - Correção: ensinar atalho e local do comando.
