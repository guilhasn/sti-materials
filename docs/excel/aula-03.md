# Aula 3 — Caso Integrador em Administracao Publica

<span class="aula-badge">Aula 3</span><span class="duracao-badge">120 min</span>

## Objectivos

- [ ] Integrar Tabelas Dinamicas com funcoes basicas e condicionais.
- [ ] Produzir diagnostico operacional de ocorrencias municipais.
- [ ] Entregar recomendacoes de melhoria com base em evidencias.

---

## Conceitos-chave

| Conceito | Descricao |
|----------|-----------|
| Encadeamento de analise | limpeza → indicadores → sintese → decisao |
| Combinacao de funcoes | `CONTAR`, `SOMA`, `MEDIA`, `MAXIMO`, `MINIMO` + `CONTAR.SE`, `SOMA.SE`, `SE` |
| Leitura critica de riscos | tempo, volume, prioridade e capacidade de resposta |

!!! abstract "Contexto"
    Este caso integrador simula a resposta da Camara Municipal de Pombal apos a Tempestade Kristin. O objectivo e transformar dados brutos de ocorrencias em priorizacao operacional e prestacao de contas.

---

## Passo-a-passo

1. Abrir `dataset.xlsx` e validar cabecalhos.
2. Criar coluna de prioridade com `SE` (critica / alta / normal).
3. Construir Tabela Dinamica por freguesia e tipo de dano.
4. Calcular:
    - total de ocorrencias (`CONTAR`)
    - custo total estimado (`SOMA` / `SOMA.SE`)
    - tempo medio de resposta (`MEDIA`)
    - pior e melhor tempo (`MAXIMO` / `MINIMO`)
5. Identificar backlog e propor plano de acao.

---

## Exercicios

1. Quantas ocorrencias criticas existem por freguesia?
2. Qual o custo total associado a danos em infraestrutura?
3. Em que area ocorre o maior tempo maximo de resolucao?
4. Que servicos devem ser reforcados de imediato?
5. Entregar uma recomendacao executiva (ate 1 pagina).

!!! warning "Atencao"
    Construir a Tabela Dinamica antes de normalizar dados e um erro frequente. Verificar sempre se os campos estao limpos e sem duplicados.

!!! danger "Erro critico"
    Usar medias sem analisar extremos mascara situacoes criticas. Cruzar sempre `MEDIA` com `MAXIMO` e `MINIMO`.

!!! tip "Dica"
    A recomendacao final deve ser orientada a decisao — nao basta listar numeros, e preciso propor accoes concretas e justificadas.

---

## Interpretacao para decisao publica

O caso integrador simula uma situacao real de pressao sobre servicos municipais. O objectivo nao e so calcular indicadores, mas transformar dados em priorizacao operacional e prestacao de contas.

---

## Downloads

- :material-file-excel:{ .lg } [dataset.xlsx](../assets/files/excel/aula-03/dataset.xlsx)
- :material-file-pdf-box:{ .lg } [ficha.pdf](../assets/files/excel/aula-03/ficha.pdf)
- :material-file-excel:{ .lg } [resolucao_docente.xlsx](../assets/files/excel/aula-03/resolucao_docente.xlsx)
