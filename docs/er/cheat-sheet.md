# Ficha de Consulta Rápida — Modelação E-R

Uma página A4 paisagem com **tudo o que precisa à mão** durante um exercício de modelação. Imprima e coloque ao lado do teclado.

!!! tip "Descarregar ficha A4 imprimível"
    **[:material-file-download: Descarregar cheat-sheet-er.docx](worksheets/cheat-sheet-er.docx)** (A4 paisagem, 1 página)

    Sugestões de uso:

    - Imprimir em papel para consultar durante a resolução de exercícios
    - Ter a ficha aberta num segundo monitor enquanto trabalha no ERDPlus
    - Plastificar (se quiser manter-se) — 90% dos casos do Vila Feliz cobrem-se com ela

---

## Resumo do conteúdo

A ficha contém **8 blocos** organizados em duas colunas:

### Coluna esquerda — Fundamentos

1. **Notação Chen** — símbolos do diagrama E-R (rectângulo, losango, elipse, etc.)
2. **5 tipos de atributos** — atómico, composto, multivalor, derivado, chave
3. **Notação relacional** — convenção `TABELA(pk, #fk)` para o esquema final
4. **9 fases** — sequência completa de criação de uma base de dados

### Coluna direita — Fase 5 (o crítico) + Referência

5. **Método dos 4 passos** — Tentativa → Observação → Decisão → Regra
6. **Atalho mental** — o que fazer em cada caso (limpo / NULLs / repetições)
7. **7 regras completas** — tabela de referência para casos raros (1:1, ternárias)
8. **Tipos de dados comuns** — INTEGER, VARCHAR(n), DATE, DECIMAL(p,s), BOOLEAN

---

## Quando usar a ficha

| Situação | Consulta |
|---|---|
| Esqueci-me do que é um "atributo multivalor" | Bloco 2 |
| Não sei que tipo de dados usar em Fase 9 | Bloco 8 |
| Perdi-me no passo da Fase 5 | Blocos 5 e 6 |
| Que regra aplicar a este cenário 1:1? | Bloco 7 |
| Em que ordem faço as fases? | Bloco 4 |

---

!!! info "Não substitui a aprendizagem"
    Esta ficha é uma **ferramenta de consulta**, não um substituto para a compreensão. Se ao resolver um exercício só está a copiar da ficha sem perceber, use primeiro o [worksheet de treino da Fase 5](worksheets/worksheet-fase5-treino.docx) para consolidar o raciocínio.
