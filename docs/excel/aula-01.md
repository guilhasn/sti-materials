# Aula 1 — Tabelas Dinâmicas e Agregações

## Objectivos

- [ ] Construir Tabelas Dinâmicas para resumir atendimento municipal.
- [ ] Interpretar indicadores por serviço, canal e estado.
- [ ] Aplicar agregações: `CONTAR`, `SOMA`, `MÉDIA`, `MÁXIMO`, `MÍNIMO`.

---

## Conceitos-chave

| Zona da Tabela Dinâmica | Função |
|--------------------------|--------|
| **Linhas** | Define a segmentação (ex.: tipo de serviço) |
| **Colunas** | Compara categorias lado a lado (ex.: canal) |
| **Valores** | Agrega números ou contagens |
| **Filtros** | Restringe o universo de análise |

!!! note "Tabelas Dinâmicas na AP"
    As Tabelas Dinâmicas são a ferramenta mais rápida para transformar registos brutos de atendimento em indicadores operacionais — sem necessidade de fórmulas.

---

## Passo-a-passo

1. Abrir `dataset.xlsx` e seleccionar a tabela de dados completa.
2. Inserir Tabela Dinâmica numa nova folha chamada `Analise_A1`.
3. Montar visões:
    - Pedidos por `Tipo_Servico` (contagem)
    - Tempo de resposta médio por `Balcao`
    - Satisfação média por `Canal`
    - Máximo e mínimo de `Tempo_Resposta_Dias` por `Estado`
4. Aplicar filtros por mês e técnico para validar consistência.

---

## Exercícios

1. Quantos pedidos foram registados por balcão?
2. Qual o tempo médio de resposta por tipo de serviço?
3. Que estado tem maior tempo máximo de resposta?
4. Em que canal a satisfação média é mais baixa?
5. Qual o menor tempo de resposta observado?
6. Produzir uma conclusão de 4 linhas para um vereador.

!!! warning "Atenção"
    Usar `SOMA` quando a questão exige contagem é o erro mais frequente. Verificar sempre o tipo de agregação antes de interpretar resultados.

!!! danger "Erro crítico"
    Incluir linhas vazias no intervalo da Tabela Dinâmica distorce todos os cálculos. Seleccionar apenas o bloco de dados com cabeçalho.

!!! tip "Dica"
    Comparar médias sem controlar filtros activos pode levar a conclusões erradas. Verificar sempre o filtro de página antes de interpretar.

---

## Interpretação para decisão pública

A leitura de volume, tempo de resposta e satisfação por serviço permite priorizar equipas, redefinir canais de atendimento e justificar ajustes operacionais com evidências.

---

## Downloads

- :material-file-excel:{ .lg } [dataset.xlsx](../assets/files/excel/aula-01/dataset.xlsx)
- :material-file-pdf-box:{ .lg } [ficha.pdf](../assets/files/excel/aula-01/ficha.pdf)
- :material-file-excel:{ .lg } [resolucao_docente.xlsx](../assets/files/excel/aula-01/resolucao_docente.xlsx)
