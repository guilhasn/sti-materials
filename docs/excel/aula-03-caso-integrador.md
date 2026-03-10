---
title: Aula 3 - Caso Integrador em Administracao Publica
sidebar_position: 4
---

# Aula 3 - Caso Integrador em Administracao Publica

## Objetivos

- Integrar Tabelas Dinamicas com funcoes basicas e condicionais.
- Produzir diagnostico operacional de ocorrencias municipais.
- Entregar recomendacoes de melhoria com base em evidencias.

## Conceitos-chave

- Encadeamento de analise: limpeza -> indicadores -> sintese -> decisao.
- Combinacao de `CONTAR`, `SOMA`, `MEDIA`, `MAXIMO`, `MINIMO` com `CONTAR.SE`, `SOMA.SE`, `SE`.
- Leitura critica de riscos: tempo, volume, prioridade e capacidade de resposta.

## Passo-a-passo

1. Abrir `dataset.xlsx` e validar cabecalhos.
2. Criar coluna de prioridade com `SE` (critica/alta/normal).
3. Construir Tabela Dinamica por freguesia e tipo de dano.
4. Calcular:
   - total de ocorrencias (`CONTAR`)
   - custo total estimado (`SOMA`/`SOMA.SE`)
   - tempo medio de resposta (`MEDIA`)
   - pior e melhor tempo (`MAXIMO`/`MINIMO`)
5. Identificar backlog e propor plano de acao.

## Exercicios

1. Quantas ocorrencias criticas existem por freguesia?
2. Qual o custo total associado a danos em infraestrutura?
3. Em que area ocorre o maior tempo maximo de resolucao?
4. Que servicos devem ser reforcados de imediato?
5. Entregar uma recomendacao executiva (ate 1 pagina).

## Criterios de correcao

- Modelo de dados consistente e sem erros de referencia.
- Uso correto das funcoes obrigatorias.
- Interpretacao orientada a decisao municipal.
- Clareza na recomendacao final.

## Erros comuns

- Construir a Tabela Dinamica antes de normalizar dados.
- Misturar criterios textuais com erros ortograficos.
- Usar medias sem analisar extremos.
- Nao justificar as decisoes propostas.

## Interpretacao para decisao publica

O caso integrador simula uma situacao real de pressao sobre servicos municipais. O objetivo nao e so calcular indicadores, mas transformar dados em priorizacao operacional e prestacao de contas.

## Downloads

- [dataset.xlsx](/files/excel/aula-03/dataset.xlsx)
- [ficha.pdf](/files/excel/aula-03/ficha.pdf)
- [resolucao_docente.xlsx](/files/excel/aula-03/resolucao_docente.xlsx)
