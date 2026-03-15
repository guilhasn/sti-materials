# Aula 1 — Tabelas Dinamicas e Agregacoes

<span class="aula-badge">Aula 1</span><span class="duracao-badge">120 min</span>

## Objectivos

- [ ] Construir Tabelas Dinamicas para resumir atendimento municipal.
- [ ] Interpretar indicadores por servico, canal e estado.
- [ ] Aplicar agregacoes: `CONTAR`, `SOMA`, `MEDIA`, `MAXIMO`, `MINIMO`.

---

## Conceitos-chave

| Zona da Tabela Dinamica | Funcao |
|--------------------------|--------|
| **Linhas** | Define a segmentacao (ex.: tipo de servico) |
| **Colunas** | Compara categorias lado a lado (ex.: canal) |
| **Valores** | Agrega numeros ou contagens |
| **Filtros** | Restringe o universo de analise |

!!! note "Tabelas Dinamicas na AP"
    As Tabelas Dinamicas sao a ferramenta mais rapida para transformar registos brutos de atendimento em indicadores operacionais — sem necessidade de formulas.

---

## Passo-a-passo

1. Abrir `dataset.xlsx` e selecionar a tabela de dados completa.
2. Inserir Tabela Dinamica numa nova folha chamada `Analise_A1`.
3. Montar visoes:
    - Pedidos por `Tipo_Servico` (contagem)
    - Tempo de resposta medio por `Balcao`
    - Satisfacao media por `Canal`
    - Maximo e minimo de `Tempo_Resposta_Dias` por `Estado`
4. Aplicar filtros por mes e tecnico para validar consistencia.

---

## Exercicios

1. Quantos pedidos foram registados por balcao?
2. Qual o tempo medio de resposta por tipo de servico?
3. Que estado tem maior tempo maximo de resposta?
4. Em que canal a satisfacao media e mais baixa?
5. Qual o menor tempo de resposta observado?
6. Produzir uma conclusao de 4 linhas para um vereador.

!!! warning "Atencao"
    Usar `SOMA` quando a questao exige contagem e o erro mais frequente. Verificar sempre o tipo de agregacao antes de interpretar resultados.

!!! danger "Erro critico"
    Incluir linhas vazias no intervalo da Tabela Dinamica distorce todos os calculos. Selecionar apenas o bloco de dados com cabecalho.

!!! tip "Dica"
    Comparar medias sem controlar filtros activos pode levar a conclusoes erradas. Verificar sempre o filtro de pagina antes de interpretar.

---

## Interpretacao para decisao publica

A leitura de volume, tempo de resposta e satisfacao por servico permite priorizar equipas, redefinir canais de atendimento e justificar ajustes operacionais com evidencias.

---

## Downloads

- :material-file-excel:{ .lg } [dataset.xlsx](../assets/files/excel/aula-01/dataset.xlsx)
- :material-file-pdf-box:{ .lg } [ficha.pdf](../assets/files/excel/aula-01/ficha.pdf)
- :material-file-excel:{ .lg } [resolucao_docente.xlsx](../assets/files/excel/aula-01/resolucao_docente.xlsx)
