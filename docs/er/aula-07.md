# Das Relações às Tabelas

## Objectivos

- [ ] Compreender o que é um pressuposto e como influencia o modelo.
- [ ] Distinguir participação obrigatória de participação não obrigatória.
- [ ] Identificar a **cardinalidade** e a **participação** de cada relação.
- [ ] Aplicar as **6 regras de construção** para converter o diagrama E-R em tabelas.
- [ ] Escrever o esquema relacional final com PKs e FKs.

---

## Conceitos-chave

| Conceito | Significado | Exemplo |
|----------|------------|---------|
| **Pressuposto** | Frase que descreve uma regra de funcionamento da organização | "Cada evento realiza-se num único espaço" |
| **Participação obrigatória** | Todos os registos da entidade participam na relação | Todo evento tem obrigatoriamente um espaço |
| **Participação não obrigatória** | Nem todos os registos participam na relação | Nem todo artista está associado a um evento |
| **Chave estrangeira (FK)** | Atributo que referencia a PK de outra tabela | `codEspaco` dentro de Evento |
| **Tabela da relação** | Tabela que nasce para representar uma relação, com as PKs das duas entidades | Actuação, Patrocínio |

---

## O que é um pressuposto?

!!! info "Definição"
    Um pressuposto é uma **frase que descreve como as coisas funcionam na organização**. Não é uma opinião — é uma regra de negócio confirmada com quem trabalha no terreno.

    **Exemplo 1:**
    "Cada evento realiza-se num único espaço, mas um espaço pode acolher vários eventos."
    → Cardinalidade **1:N** (Espaço → Evento). Participação **obrigatória** no Evento (todo evento tem espaço).

    **Exemplo 2:**
    "Um artista pode não estar associado a nenhum evento neste momento."
    → Participação **não obrigatória** no lado do Artista.

    Os pressupostos determinam **cardinalidade** e **participação** — e estes dois dados permitem-nos escolher **qual regra aplicar**.

---

## Cenário — Continuação de Vila Feliz

!!! abstract "Contexto"
    No capítulo anterior identificámos 4 entidades (Evento, Espaço, Artista, Patrocinador), definimos os seus atributos e desenhámos o diagrama E-R no ERDPlus. Agora vamos transformar esse diagrama em **tabelas organizadas**, prontas para uma base de dados.

    Para fazer essa conversão, usamos **6 regras de construção** — cada regra cobre uma combinação de cardinalidade + participação e diz-nos quantas tabelas resultam e onde fica a chave estrangeira.

---

## Legenda dos símbolos das regras

Para ler os diagramas das regras, precisamos de reconhecer os símbolos:

![Legenda dos símbolos](assets/regras/legenda.png){ loading=lazy }

| Símbolo | Significado |
|---------|-------------|
| **?** | Com ou sem participação obrigatória (indiferente) |
| :material-key: chave preenchida | **Chave primária** (obrigatória + exclusiva) |
| :material-key-outline: chave a tracejado | **Chave estrangeira** |
| **★** | Obrigatória |
| **★★** | Obrigatória + Exclusiva (única) |

---

## Tarefa 1 — Identificar cardinalidade, participação e regra

Para cada relação do nosso diagrama, preenchemos uma tabela com quatro colunas: o pressuposto, a cardinalidade, a participação e a **regra aplicável**.

| Relação | Pressuposto | Cardinalidade | Participação | Regra |
|---------|------------|---------------|--------------|-------|
| Evento ↔ Espaço | Cada evento realiza-se num único espaço; cada espaço pode acolher vários eventos. | **1:N** | Obrigatória no lado N (Evento) | **Regra 4** |
| Evento ↔ Artista | Cada evento pode ter vários artistas; cada artista pode actuar em vários eventos. | **N:M** | Indiferente | **Regra 6** |
| Evento ↔ Patrocinador | Cada evento pode ter vários patrocinadores; cada patrocinador pode apoiar vários eventos. | **N:M** | Indiferente | **Regra 6** |

!!! warning "Cuidado com os pressupostos"
    Um pressuposto errado gera um modelo errado. Se assumirmos que cada evento só tem um espaço mas na realidade o Festival de Chocolate usa 5 espaços diferentes, o modelo não funcionará. **Confirmar sempre** com quem conhece a organização antes de escolher a regra.

---

## Tarefa 2 — Aplicar cada regra

Agora aplicamos cada regra identificada, uma relação de cada vez.

### Evento ↔ Espaço → Regra 4

**Diagrama da regra**:

![Regra 4 — 1:N com obrigatoriedade no lado N](assets/regras/regra-4.png){ loading=lazy }

**Enunciado da regra**: *Quando a cardinalidade de um relacionamento binário é 1:N, com participação obrigatória do lado N, são necessárias **2 tabelas** (uma para cada entidade). A chave primária da entidade do lado 1 tem que ser usada como atributo (FK) na tabela da entidade do lado N — representa o relacionamento.*

**Aplicação ao nosso caso**:

- Lado 1 = Espaço
- Lado N = Evento (obrigatório)
- **2 tabelas**: `Evento` e `Espaco`
- A PK `codEspaco` entra como FK na tabela `Evento`

> **EVENTO** (<u>codEvento</u>, nome, dataInicio, dataFim, edicao, orcamento, FK_codEspaco)
>
> **ESPACO** (<u>codEspaco</u>, nome, localizacao, tipo, lotacao)

**Exemplo de preenchimento**:

**Tabela Evento**

| codEvento | nome | dataInicio | codEspaco |
|-----------|------|------------|-----------|
| E01 | Festival Chocolate | 2026-03-14 | ESP02 |
| E02 | Mercado Medieval | 2026-05-20 | ESP01 |
| E03 | Natal Vila Feliz | 2026-12-10 | ESP03 |

**Tabela Espaco**

| codEspaco | nome | localizacao |
|-----------|------|-------------|
| ESP01 | Praça do Município | Centro |
| ESP02 | Parque da Cerca | Zona Sul |
| ESP03 | Pavilhão Municipal | Zona Norte |

---

### Evento ↔ Artista → Regra 6

**Diagrama da regra**:

![Regra 6 — N:M com participação indiferente](assets/regras/regra-6.png){ loading=lazy }

**Enunciado da regra**: *Quando a cardinalidade de um relacionamento binário é N:M, o tipo de participação de cada entidade é indiferente. Neste caso, são necessárias **3 tabelas**: uma para cada entidade e outra para o relacionamento. A tabela do relacionamento terá entre os seus atributos as chaves primárias de cada uma das entidades.*

**Aplicação ao nosso caso**:

- Cardinalidade N:M (cada evento tem vários artistas; cada artista actua em vários eventos)
- **3 tabelas**: `Evento`, `Artista` e uma tabela da relação (chamemos-lhe `Actuação`)
- A tabela `Actuação` contém as PKs de ambos + atributos próprios (cachê, data)

> **EVENTO** (<u>codEvento</u>, nome, ..., FK_codEspaco)
>
> **ARTISTA** (<u>codArtista</u>, nome, tipo, contacto, email)
>
> **ACTUACAO** (<u>codEvento</u>, <u>codArtista</u>, cache, dataActuacao) — PK composta; ambos atributos são também FKs (Regra 6)

**Exemplo de preenchimento**:

**Tabela Actuação**

| codEvento | codArtista | cache | dataActuacao |
|-----------|------------|-------|--------------|
| E01 | A01 | 500 | 2026-03-14 |
| E01 | A02 | 350 | 2026-03-14 |
| E01 | A03 | 800 | 2026-03-15 |
| E02 | A04 | 600 | 2026-05-20 |

Repare que o Festival de Chocolate (E01) aparece 3 vezes na tabela Actuação — uma vez por cada artista. Mas na tabela `Evento` aparece **uma única vez**. Os dados do evento (nome, data, orçamento) não se duplicam. É precisamente isto que a Regra 6 garante.

---

### Evento ↔ Patrocinador → Regra 6 (outra vez)

Mesma cardinalidade, mesma regra.

**Aplicação**:

- N:M entre Evento e Patrocinador
- **3 tabelas**: `Evento`, `Patrocinador` e `Patrocínio`

> **PATROCINADOR** (<u>codPatrocinador</u>, nome, NIF, contacto, email)
>
> **PATROCINIO** (<u>codEvento</u>, <u>codPatrocinador</u>, valor, tipo) — PK composta; ambos atributos são também FKs (Regra 6)

**Tabela Patrocínio**

| codEvento | codPatrocinador | valor | tipo |
|-----------|-----------------|-------|------|
| E01 | P01 | 2000 | Monetário |
| E01 | P02 | 1500 | Espécie |
| E03 | P01 | 3000 | Monetário |

!!! note "Regra 6 é a mais frequente na AP"
    Qualquer relação N:M cai aqui — e há muitas na administração pública: cidadão ↔ licenciamento, funcionário ↔ projecto, utente ↔ valência. Sempre que vir um N e um M nos dois lados, já sabe: **3 tabelas, uma delas com as duas PKs**.

---

## Tarefa 3 — Esquema relacional final

Reunindo todas as tabelas:

> **EVENTO** (<u>codEvento</u>, nome, dataInicio, dataFim, edicao, orcamento, FK_codEspaco)
>
> **ESPACO** (<u>codEspaco</u>, nome, localizacao, tipo, lotacao)
>
> **ARTISTA** (<u>codArtista</u>, nome, tipo, contacto, email)
>
> **PATROCINADOR** (<u>codPatrocinador</u>, nome, NIF, contacto, email)
>
> **ACTUACAO** (<u>codEvento</u>, <u>codArtista</u>, cache, dataActuacao) — PK composta (Regra 6)
>
> **PATROCINIO** (<u>codEvento</u>, <u>codPatrocinador</u>, valor, tipo) — PK composta (Regra 6)

Total: **6 tabelas** — 4 entidades + 2 tabelas da relação.

---

## Tarefa 4 — Antes e depois

| Aspecto | Antes (Excel) | Depois (Modelo E-R → Tabelas) |
|---------|--------------|-------------------------------|
| Dados do artista | Copiados em cada linha do evento | Entidade Artista separada, referenciada por FK |
| Dados do patrocinador | Misturados com o evento | Tabela Patrocínio com FKs para ambos os lados |
| Chave única | Inexistente | Cada entidade tem PK; tabelas da relação têm PK composta |
| Total investido por patrocinador | Soma manual, com risco de duplicados | Consulta simples à tabela Patrocínio |
| Estrutura | Uma folha com tudo misturado | 6 tabelas normalizadas, cada uma com finalidade clara |

**Cada dado é guardado uma vez, no sítio correcto.** O nome do artista aparece apenas na tabela Artista. Se o contacto mudar, actualiza-se num único local — e todas as referências ficam automaticamente correctas.

---

## Resumo visual das 6 regras

![Resumo das 6 regras](assets/regras/resumo-regras.png){ loading=lazy }

Guarde esta imagem (ou a [**ficha de consulta rápida**](cheat-sheet.md)) por perto durante os exercícios.

---

!!! tip "Próximo passo"
    No próximo capítulo vamos validar este modelo — procurar erros, escolher as melhores chaves primárias, definir domínios dos atributos e preparar a especificação final.
