# Aula 2 — Funcoes Basicas Condicionais

<span class="aula-badge">Aula 2</span><span class="duracao-badge">120 min</span>

## Objectivos

- [ ] Aplicar `CONTAR.SE`, `SOMA.SE` e `SE` em dados de recursos humanos municipais.
- [ ] Traduzir regras de negocio em formulas simples e verificaveis.
- [ ] Produzir indicadores para apoio a decisao na gestao de pessoas.

---

## Conceitos-chave

| Funcao | Sintaxe | Finalidade |
|--------|---------|-----------|
| `CONTAR.SE` | `=CONTAR.SE(intervalo; criterio)` | Medir frequencias |
| `SOMA.SE` | `=SOMA.SE(intervalo_criterio; criterio; intervalo_soma)` | Totais condicionais |
| `SE` | `=SE(teste; valor_V; valor_F)` | Classificar e sinalizar |

!!! note "Regras de negocio em formulas"
    Cada formula condicional traduz uma regra operacional concreta: quantos precarios existem, quanto custa cada servico, quem esta em risco de aposentacao.

---

## Exemplos de formula

```excel
=CONTAR.SE(Mapa_Pessoal!G:G;"Precario")
=SOMA.SE(Mapa_Pessoal!H:H;"Atendimento";Mapa_Pessoal!J:J)
=SE(Mapa_Pessoal!M2="Sim";"Prioridade Alta";"Acompanhar")
```

---

## Passo-a-passo

1. Abrir `dataset.xlsx` e identificar a folha `Mapa_Pessoal`.
2. Na folha `Analise_A2`, calcular indicadores de base com `CONTAR.SE`.
3. Calcular massa salarial por servico e vinculo com `SOMA.SE`.
4. Criar coluna de prioridade com `SE` para apoiar replaneamento.

---

## Exercicios

1. Contar trabalhadores por categoria profissional.
2. Contar quantos trabalhadores estao em vinculo precario.
3. Somar salario bruto mensal de cada servico.
4. Somar salario apenas de trabalhadores com absentismo elevado.
5. Classificar trabalhadores com risco de aposentacao (`SE`).
6. Construir nota tecnica com 3 medidas de gestao de RH.

!!! warning "Atencao"
    Trocar o intervalo de criterio com o intervalo de soma e o erro mais comum em `SOMA.SE`. Verificar sempre a ordem dos argumentos.

!!! danger "Erro critico"
    Escrever criterio textual sem aspas causa `#VALOR!`. Os criterios de texto devem estar sempre entre aspas duplas.

!!! tip "Dica"
    Usar `SE` sem tratar o caso de celulas vazias gera falsos positivos. Encadear com `E()` ou verificar se a celula nao esta vazia.

---

## Interpretacao para decisao publica

Estes indicadores permitem antecipar aposentacoes, monitorizar precariedade e fundamentar distribuicao de recursos humanos por servico.

---

## Downloads

- :material-file-excel:{ .lg } [dataset.xlsx](../assets/files/excel/aula-02/dataset.xlsx)
- :material-file-pdf-box:{ .lg } [ficha.pdf](../assets/files/excel/aula-02/ficha.pdf)
- :material-file-excel:{ .lg } [resolucao_docente.xlsx](../assets/files/excel/aula-02/resolucao_docente.xlsx)
