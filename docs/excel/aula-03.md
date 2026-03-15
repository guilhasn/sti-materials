# Aula 3 — Caso Integrador em Administração Pública

## Objectivos

- [ ] Integrar Tabelas Dinâmicas com funções básicas e condicionais.
- [ ] Produzir diagnóstico operacional de ocorrências municipais.
- [ ] Entregar recomendações de melhoria com base em evidências.

---

## Conceitos-chave

| Conceito | Descrição |
|----------|-----------|
| Encadeamento de análise | limpeza → indicadores → síntese → decisão |
| Combinação de funções | `CONTAR`, `SOMA`, `MÉDIA`, `MÁXIMO`, `MÍNIMO` + `CONTAR.SE`, `SOMA.SE`, `SE` |
| Leitura crítica de riscos | tempo, volume, prioridade e capacidade de resposta |

!!! abstract "Contexto"
    Este caso integrador simula a resposta da Câmara Municipal de Pombal após a Tempestade Kristin. O objectivo é transformar dados brutos de ocorrências em priorização operacional e prestação de contas.

---

## Passo-a-passo

1. Abrir `dataset.xlsx` e validar cabeçalhos.
2. Criar coluna de prioridade com `SE` (crítica / alta / normal).
3. Construir Tabela Dinâmica por freguesia e tipo de dano.
4. Calcular:
    - total de ocorrências (`CONTAR`)
    - custo total estimado (`SOMA` / `SOMA.SE`)
    - tempo médio de resposta (`MÉDIA`)
    - pior e melhor tempo (`MÁXIMO` / `MÍNIMO`)
5. Identificar backlog e propor plano de acção.

---

## Exercícios

1. Quantas ocorrências críticas existem por freguesia?
2. Qual o custo total associado a danos em infraestrutura?
3. Em que área ocorre o maior tempo máximo de resolução?
4. Que serviços devem ser reforçados de imediato?
5. Entregar uma recomendação executiva (até 1 página).

!!! warning "Atenção"
    Construir a Tabela Dinâmica antes de normalizar dados é um erro frequente. Verificar sempre se os campos estão limpos e sem duplicados.

!!! danger "Erro crítico"
    Usar médias sem analisar extremos mascara situações críticas. Cruzar sempre `MÉDIA` com `MÁXIMO` e `MÍNIMO`.

!!! tip "Dica"
    A recomendação final deve ser orientada à decisão — não basta listar números, é preciso propor acções concretas e justificadas.

---

## Interpretação para decisão pública

O caso integrador simula uma situação real de pressão sobre serviços municipais. O objectivo não é só calcular indicadores, mas transformar dados em priorização operacional e prestação de contas.

---

## Downloads

- :material-file-excel:{ .lg } [dataset.xlsx](../assets/files/excel/aula-03/dataset.xlsx)
- :material-file-pdf-box:{ .lg } [ficha.pdf](../assets/files/excel/aula-03/ficha.pdf)
- :material-file-excel:{ .lg } [resolucao_docente.xlsx](../assets/files/excel/aula-03/resolucao_docente.xlsx)
