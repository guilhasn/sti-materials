# Aula 2 — Funções Básicas Condicionais

<span class="aula-badge">Aula 2</span>

## Objectivos

- [ ] Aplicar `CONTAR.SE`, `SOMA.SE` e `SE` em dados de recursos humanos municipais.
- [ ] Traduzir regras de negócio em fórmulas simples e verificáveis.
- [ ] Produzir indicadores para apoio à decisão na gestão de pessoas.

---

## Conceitos-chave

| Função | Sintaxe | Finalidade |
|--------|---------|-----------|
| `CONTAR.SE` | `=CONTAR.SE(intervalo; critério)` | Medir frequências |
| `SOMA.SE` | `=SOMA.SE(intervalo_critério; critério; intervalo_soma)` | Totais condicionais |
| `SE` | `=SE(teste; valor_V; valor_F)` | Classificar e sinalizar |

!!! note "Regras de negócio em fórmulas"
    Cada fórmula condicional traduz uma regra operacional concreta: quantos precários existem, quanto custa cada serviço, quem está em risco de aposentação.

---

## Exemplos de fórmula

```excel
=CONTAR.SE(Mapa_Pessoal!G:G;"Precário")
=SOMA.SE(Mapa_Pessoal!H:H;"Atendimento";Mapa_Pessoal!J:J)
=SE(Mapa_Pessoal!M2="Sim";"Prioridade Alta";"Acompanhar")
```

---

## Passo-a-passo

1. Abrir `dataset.xlsx` e identificar a folha `Mapa_Pessoal`.
2. Na folha `Analise_A2`, calcular indicadores de base com `CONTAR.SE`.
3. Calcular massa salarial por serviço e vínculo com `SOMA.SE`.
4. Criar coluna de prioridade com `SE` para apoiar replaneamento.

---

## Exercícios

1. Contar trabalhadores por categoria profissional.
2. Contar quantos trabalhadores estão em vínculo precário.
3. Somar salário bruto mensal de cada serviço.
4. Somar salário apenas de trabalhadores com absentismo elevado.
5. Classificar trabalhadores com risco de aposentação (`SE`).
6. Construir nota técnica com 3 medidas de gestão de RH.

!!! warning "Atenção"
    Trocar o intervalo de critério com o intervalo de soma é o erro mais comum em `SOMA.SE`. Verificar sempre a ordem dos argumentos.

!!! danger "Erro crítico"
    Escrever critério textual sem aspas causa `#VALOR!`. Os critérios de texto devem estar sempre entre aspas duplas.

!!! tip "Dica"
    Usar `SE` sem tratar o caso de células vazias gera falsos positivos. Encadear com `E()` ou verificar se a célula não está vazia.

---

## Interpretação para decisão pública

Estes indicadores permitem antecipar aposentações, monitorizar precariedade e fundamentar distribuição de recursos humanos por serviço.

---

## Downloads

- :material-file-excel:{ .lg } [dataset.xlsx](../assets/files/excel/aula-02/dataset.xlsx)
- :material-file-pdf-box:{ .lg } [ficha.pdf](../assets/files/excel/aula-02/ficha.pdf)
- :material-file-excel:{ .lg } [resolucao_docente.xlsx](../assets/files/excel/aula-02/resolucao_docente.xlsx)
