# Modelo Completo — Da Concepção à Especificação

## Objectivos

- [ ] Aplicar três regras práticas de normalização para detectar erros comuns
- [ ] Escolher chaves primárias adequadas para cada tabela
- [ ] Escrever o modelo relacional completo em notação formal
- [ ] Definir domínios e consultas que o sistema deve suportar

---

## Normalização prática — 3 regras simples

| # | Regra | Pergunta de controlo | Exemplo de violação |
|---|-------|----------------------|---------------------|
| 1 | **Cada célula guarda um só valor** | Há listas ou valores separados por vírgulas? | `telefones = "912000000, 933000000"` |
| 2 | **Nada depende apenas de parte da chave** | Se a PK é composta, cada atributo precisa de *todas* as partes? | Numa tabela `(codEvento, codArtista, nomeArtista)` — o nome depende só do artista |
| 3 | **Nada depende de um atributo que não é chave** | Há atributos que "descrevem" outro atributo não-chave? | `(codEvento, codEspaco, moradaEspaco)` — a morada depende do espaço, não do evento |

!!! note "Normalização sem formalismo"
    Estas 3 regras cobrem a maioria dos casos na AP e são mais fáceis de aplicar do que a notação formal (1FN, 2FN, 3FN). Se ao preencher a tabela com dados de exemplo sentir que está a **repetir informação**, provavelmente há uma violação.

---

## Cenário — Vila Feliz (continuação)

!!! abstract "Contexto"
    Nas aulas anteriores construímos o modelo E-R para gestão de eventos culturais da Câmara de Vila Feliz e convertemo-lo em tabelas. Hoje vamos partir desse modelo, encontrar erros, corrigi-los e produzir a especificação final.

---

## Tarefa 1 — Detectar problemas ("versão do estagiário")

Um estagiário tentou passar o modelo E-R para tabelas e produziu esta versão:

```
EVENTO(codEvento, designação, dataInício, dataFim, nomeEspaço, moradaEspaço, lotação)
ARTISTA(codArtista, nome, contacto, dataNascimento, eventosOndeActua)
PATROCINADOR(codPatrocinador, nome, NIF, contacto, valor)
ACTUAÇÃO(codEvento, codArtista, cachê, nomeArtista)
PATROCÍNIO(codEvento, codPatrocinador)
```

Identifique **cinco problemas** na versão acima e preencha a tabela:

| # | Problema | Regra violada | Correcção |
|---|----------|---------------|-----------|
| 1 | `EVENTO` inclui `nomeEspaço`, `moradaEspaço` e `lotação` — dados do espaço repetidos em cada evento | Regra 3 — dependência de atributo não-chave | Criar tabela `ESPAÇO` separada; em `EVENTO` guardar apenas `codEspaco` (FK) |
| 2 | `ARTISTA` tem `eventosOndeActua` — lista de valores numa única célula | Regra 1 — cada célula deve ter um só valor | Remover o campo; a relação já está na tabela `ACTUAÇÃO` |
| 3 | `PATROCINADOR` inclui `valor` — o valor depende do par (evento, patrocinador), não só do patrocinador | Regra 2 — depende de parte da chave real (falta o evento) | Mover `valor` para a tabela `PATROCÍNIO` |
| 4 | `ACTUAÇÃO` inclui `nomeArtista` — depende apenas de `codArtista`, não da chave composta | Regra 2 — dependência parcial da chave | Remover `nomeArtista`; obtém-se por junção com `ARTISTA` |
| 5 | `PATROCÍNIO` não tem o atributo `valor` — perdeu-se informação do modelo E-R | Modelo incompleto | Adicionar `valor` a `PATROCÍNIO` |

---

## Tarefa 2 — Escolher chaves primárias

Para cada tabela, identifique as chaves candidatas e justifique a escolha:

| Tabela | Chaves candidatas | PK escolhida | Porquê |
|--------|-------------------|--------------|--------|
| EVENTO | `codEvento` | `codEvento` | Código numérico sequencial, simples e estável |
| ESPAÇO | `codEspaco`; `nome` (se único) | `codEspaco` | O nome pode mudar (ex.: renomeação de pavilhão) |
| ARTISTA | `codArtista` | `codArtista` | Podem existir artistas homónimos |
| PATROCINADOR | `codPatrocinador`; `NIF` | `codPatrocinador` | O NIF é bom candidato mas é longo; o código numérico é mais prático como FK |
| ACTUAÇÃO | `(codEvento, codArtista)` | `(codEvento, codArtista)` | Chave composta — identifica cada participação |
| PATROCÍNIO | `(codEvento, codPatrocinador)` | `(codEvento, codPatrocinador)` | Chave composta — identifica cada patrocínio |

!!! tip "Chaves numéricas e chaves compostas"
    Prefira chaves numéricas curtas — são mais rápidas em pesquisas e ocupam menos espaço.

    Nas tabelas associativas (como `ACTUAÇÃO`), a chave é **composta** pelas FKs das duas entidades. Pense na analogia do **bilhete de avião**: o bilhete identifica-se pelo par *(voo, passageiro)* — nenhum dos dois sozinho basta.

---

## Tarefa 3 — Tabelas finais em notação relacional

Convenções: **PK** a sublinhado, *FK* em itálico.

```
EVENTO(  codEvento,  designação,  dataInício,  dataFim,  codEspaco  )
         ─────────                                       FK → ESPAÇO

ESPAÇO(  codEspaco,  nome,  morada,  lotação  )
         ─────────

ARTISTA(  codArtista,  nome,  contacto,  dataNascimento  )
          ──────────

PATROCINADOR(  codPatrocinador,  nome,  NIF,  contacto  )
               ───────────────

ACTUAÇÃO(  codEvento,  codArtista,  cachê  )
           ─────────  ──────────
           FK → EVENTO  FK → ARTISTA

PATROCÍNIO(  codEvento,  codPatrocinador,  valor  )
             ─────────  ───────────────
             FK → EVENTO  FK → PATROCINADOR
```

**Leitura rápida:**

- 4 tabelas de entidades: `EVENTO`, `ESPAÇO`, `ARTISTA`, `PATROCINADOR`
- 2 tabelas associativas: `ACTUAÇÃO`, `PATROCÍNIO`
- Total: **6 tabelas**, todas em conformidade com as 3 regras práticas

---

## Tarefa 4 — Definição de domínios (simplificada)

A definição de domínios é tipicamente feita pelo programador na fase de implementação, mas o analista deve indicar as restrições do negócio. Exemplo para a tabela `EVENTO`:

| Atributo | Tipo sugerido | Obrigatório | Restrição / Nota |
|----------|---------------|-------------|-------------------|
| `codEvento` | Inteiro auto-incremento | Sim | PK, gerado pelo sistema |
| `designação` | Texto (200 car.) | Sim | — |
| `dataInício` | Data | Sim | Não pode ser anterior à data actual |
| `dataFim` | Data | Não | Se preenchida, ≥ `dataInício` |
| `codEspaco` | Inteiro | Sim | FK → `ESPAÇO`; deve existir na tabela |

!!! note "Âmbito desta tarefa"
    Para as restantes tabelas o processo é idêntico. Em contexto de projecto real, este passo resulta num **dicionário de dados** que acompanha o modelo.

---

## Tarefa 5 — O que o sistema permite fazer

Antes de avançar, é útil listar as perguntas que o sistema deve conseguir responder:

1. **Listar todos os eventos** que decorrem num determinado mês, com o nome do espaço e a lotação.
2. **Mostrar o elenco** (artistas e respectivo cachê) de um evento específico.
3. **Calcular o total de patrocínios** recebidos por cada evento.
4. **Identificar artistas** que actuaram em mais do que dois eventos no último ano.
5. **Verificar disponibilidade** de um espaço para uma data pretendida (sem sobreposição de eventos).

!!! info "Das perguntas às consultas"
    Cada uma destas perguntas será traduzida para uma consulta SQL quando o modelo for implementado num SGBD.

---

!!! tip "Resumo do percurso"
    **Etapa 1** — Identificámos entidades, atributos e relações (modelo conceptual).

    **Etapa 2** — Definimos pressupostos e convertemos em tabelas (modelo lógico).

    **Etapa 3** — Validámos, corrigimos e especificámos o modelo completo.

    **Próxima etapa** — Praticar com novos cenários nos exercícios guiados e autónomos.
