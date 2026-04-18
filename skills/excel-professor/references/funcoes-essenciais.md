# Funções Essenciais de Excel

## Compatibilidade de idioma

Usar sempre os nomes de função no idioma real do Excel do aluno.

- PT (variantes comuns): `CONTAR.SE`, `SOMA.SE`, `SE`, `Média`, `Mínimo`, `Máximo`
- EN: `COUNTIF`, `SUMIF`, `IF`, `AVERAGE`, `MIN`, `MAX`

Nota: em algumas instalações de PT, `Média`, `Mínimo` e `Máximo` podem aparecer sem acento. Se houver erro de nome de função, confirmar no autocomplete da barra de fórmulas.

## Base de dados de exemplo

Use esta mini-base para os exemplos:

| A (Produto) | B (Categoria) | C (Vendedor) | D (Vendas) | E (Meta) |
|---|---|---|---:|---:|
| Teclado | Periféricos | Ana | 120 | 100 |
| Rato | Periféricos | Bruno | 80 | 90 |
| Monitor | Hardware | Ana | 320 | 250 |
| SSD | Hardware | Carla | 210 | 200 |
| Webcam | Periféricos | Carla | 95 | 110 |

## CONTAR.SE

### Objetivo
Contar quantas células cumprem um critério.

### Sintaxe
`CONTAR.SE(intervalo; critério)`

### Exemplo
Contar produtos de `Periféricos`:
`=CONTAR.SE(B2:B6;"Periféricos")`

Resultado esperado: `3`.

### Erro comum
Usar intervalo errado (por exemplo, contar em coluna diferente da categoria).

### Mini exercício
Contar quantas vendas foram feitas pela `Ana`:
`=CONTAR.SE(C2:C6;"Ana")`

### Resposta esperada
`2`

## SOMA.SE

### Objetivo
Somar valores que cumprem um critério.

### Sintaxe
`SOMA.SE(intervalo_critério; critério; [intervalo_soma])`

### Exemplo
Somar vendas da categoria `Hardware`:
`=SOMA.SE(B2:B6;"Hardware";D2:D6)`

Resultado esperado: `530`.

### Erro comum
Usar `intervalo_critério` e `intervalo_soma` com tamanhos diferentes.

### Mini exercício
Somar vendas da categoria `Periféricos`:
`=SOMA.SE(B2:B6;"Periféricos";D2:D6)`

### Resposta esperada
`295`

## SE

### Objetivo
Devolver um valor se condição for verdadeira e outro se for falsa.

### Sintaxe
`SE(teste_logico; valor_se_verdadeiro; valor_se_falso)`

### Exemplo
Marcar se cumpriu meta:
`=SE(D2>=E2;"Cumpriu";"Não cumpriu")`

### Erro comum
Comparar texto sem aspas ou usar operador logico incorreto.

### Mini exercício
Em `F2`, escrever fórmula para classificar se a venda cumpriu a meta e copiar até `F6`.

### Resposta esperada
`=SE(D2>=E2;"Cumpriu";"Não cumpriu")`

## Média

### Objetivo
Calcular média aritmética.

### Sintaxe
`Média(número1; [número2]; ...)`

### Exemplo
`=Média(D2:D6)`

Resultado esperado: `165`.

### Erro comum
Incluir celulas de cabecalho dentro do intervalo.

### Mini exercício
Calcular a média da coluna `Meta`:
`=Média(E2:E6)`

### Resposta esperada
`150`

## Mínimo

### Objetivo
Obter menor valor de um intervalo.

### Sintaxe
`Mínimo(número1; [número2]; ...)`

### Exemplo
`=Mínimo(D2:D6)`

Resultado esperado: `80`.

### Erro comum
Misturar texto com números e assumir que tudo será considerado.

### Mini exercício
Obter a menor meta:
`=Mínimo(E2:E6)`

### Resposta esperada
`90`

## Máximo

### Objetivo
Obter maior valor de um intervalo.

### Sintaxe
`Máximo(número1; [número2]; ...)`

### Exemplo
`=Máximo(D2:D6)`

Resultado esperado: `320`.

### Erro comum
Selecionar intervalo incompleto e perder o maior valor real.

### Mini exercício
Obter a maior venda:
`=Máximo(D2:D6)`

### Resposta esperada
`320`

## Nota de separador

Alguns Excels usam vírgula em vez de ponto e vírgula.
Se o aluno reportar erro de fórmula, converter:
- `=SOMA.SE(B2:B6;"Periféricos";D2:D6)`
- para `=SOMA.SE(B2:B6,"Periféricos",D2:D6)`
