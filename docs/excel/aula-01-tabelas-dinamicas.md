---
title: Aula 1 - Tabelas Dinamicas e Agregacoes
sidebar_position: 2
---

# Aula 1 - Tabelas Dinamicas e Agregacoes

## Objetivos

- Construir Tabelas Dinamicas para resumir atendimento municipal.
- Interpretar indicadores por servico, canal e estado.
- Aplicar agregacoes: `CONTAR`, `SOMA`, `MEDIA`, `MAXIMO`, `MINIMO`.

## Conceitos-chave

- Campo em **Linhas**: define a segmentacao.
- Campo em **Colunas**: compara categorias lado a lado.
- Campo em **Valores**: agrega numeros ou contagens.
- Campo em **Filtros**: restringe o universo de analise.

## Passo-a-passo

1. Abrir `dataset.xlsx` e selecionar a tabela de dados completa.
2. Inserir Tabela Dinamica numa nova folha chamada `Analise_A1`.
3. Montar visoes:
   - Pedidos por `Tipo_Servico` (contagem)
   - Tempo de resposta medio por `Balcao`
   - Satisfacao media por `Canal`
   - Maximo e minimo de `Tempo_Resposta_Dias` por `Estado`
4. Aplicar filtros por mes e tecnico para validar consistencia.

## Exercicios

1. Quantos pedidos foram registados por balcao?
2. Qual o tempo medio de resposta por tipo de servico?
3. Que estado tem maior tempo maximo de resposta?
4. Em que canal a satisfacao media e mais baixa?
5. Qual o menor tempo de resposta observado?
6. Produzir uma conclusao de 4 linhas para um vereador.

## Criterios de correcao

- Estrutura da Tabela Dinamica correta (linhas/colunas/valores/filtros).
- Agregador correto para cada pergunta.
- Valores coerentes com o dataset.
- Conclusao final orientada a decisao de gestao.

## Erros comuns

- Usar `SOMA` quando a questao exige contagem.
- Incluir linhas vazias no intervalo da Tabela Dinamica.
- Comparar medias sem controlar filtros ativos.
- Ignorar outliers ao reportar maximos e minimos.

## Interpretacao para decisao publica

A leitura de volume, tempo de resposta e satisfacao por servico permite priorizar equipas, redefinir canais de atendimento e justificar ajustes operacionais com evidencias.

## Downloads

- [dataset.xlsx](/files/excel/aula-01/dataset.xlsx)
- [ficha.pdf](/files/excel/aula-01/ficha.pdf)
- [resolucao_docente.xlsx](/files/excel/aula-01/resolucao_docente.xlsx)
