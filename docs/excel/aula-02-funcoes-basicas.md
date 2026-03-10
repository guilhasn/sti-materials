---
title: Aula 2 - Funcoes Basicas Condicionais
sidebar_position: 3
---

# Aula 2 - Funcoes Basicas Condicionais

## Objetivos

- Aplicar `CONTAR.SE`, `SOMA.SE` e `SE` em dados de recursos humanos municipais.
- Traduzir regras de negocio em formulas simples e verificaveis.
- Produzir indicadores para apoio a decisao na gestao de pessoas.

## Conceitos-chave

- `CONTAR.SE(intervalo; criterio)` para medir frequencias.
- `SOMA.SE(intervalo_criterio; criterio; intervalo_soma)` para calcular totais condicionais.
- `SE(teste_logico; valor_se_verdadeiro; valor_se_falso)` para classificar e sinalizar.

## Passo-a-passo

1. Abrir `dataset.xlsx` e identificar a folha `Mapa_Pessoal`.
2. Na folha `Analise_A2`, calcular indicadores de base com `CONTAR.SE`.
3. Calcular massa salarial por servico e vinculo com `SOMA.SE`.
4. Criar coluna de prioridade com `SE` para apoiar replaneamento.

## Exemplos de formula

```excel
=CONTAR.SE(Mapa_Pessoal!G:G;"Precario")
=SOMA.SE(Mapa_Pessoal!H:H;"Atendimento";Mapa_Pessoal!J:J)
=SE(Mapa_Pessoal!M2="Sim";"Prioridade Alta";"Acompanhar")
```

## Exercicios

1. Contar trabalhadores por categoria profissional.
2. Contar quantos trabalhadores estao em vinculo precario.
3. Somar salario bruto mensal de cada servico.
4. Somar salario apenas de trabalhadores com absentismo elevado.
5. Classificar trabalhadores com risco de aposentacao (`SE`).
6. Construir nota tecnica com 3 medidas de gestao de RH.

## Criterios de correcao

- Formula correta e sintaxe valida.
- Referencias absolutas/relativas adequadas.
- Resultado numerico certo para cada indicador.
- Recomendacoes coerentes com os dados.

## Erros comuns

- Trocar intervalo de criterio com intervalo de soma.
- Escrever criterio textual sem aspas.
- Usar `SE` sem tratar casos vazios.
- Comparar valores de anos sem padronizar tipo de dado.

## Interpretacao para decisao publica

Estes indicadores permitem antecipar aposentacoes, monitorizar precariedade e fundamentar distribuicao de recursos humanos por servico.

## Downloads

- [dataset.xlsx](/files/excel/aula-02/dataset.xlsx)
- [ficha.pdf](/files/excel/aula-02/ficha.pdf)
- [resolucao_docente.xlsx](/files/excel/aula-02/resolucao_docente.xlsx)
