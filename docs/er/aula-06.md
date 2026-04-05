# Do Excel ao Modelo Conceptual

## Objectivos

- [ ] Identificar problemas de redundância e inconsistência numa folha Excel real.
- [ ] Extrair entidades, atributos e chaves primárias a partir de dados tabulares.
- [ ] Determinar relações e cardinalidades usando perguntas-guia.
- [ ] Criar o diagrama E-R correspondente no ERDPlus.

---

## Conceitos-chave

| Conceito | Significado | Exemplo |
|----------|------------|---------|
| **Entidade** | Objecto sobre o qual guardamos dados | Evento, Espaço, Artista |
| **Atributo** | Propriedade que caracteriza uma entidade | nome, data, lotação |
| **Chave primária (PK)** | Atributo que identifica univocamente cada registo | codEvento, NIF |
| **Chave candidata** | Atributo que poderia ser PK | NIF, BI, nº contribuinte |
| **Chave estrangeira (FK)** | Atributo que referencia a PK de outra entidade | codEspaco na entidade Evento |
| **Relação** | Associação entre duas (ou mais) entidades | Evento "realiza-se em" Espaço |
| **Cardinalidade** | Quantos registos de cada lado participam | 1:N, M:N |

---

## Cenário — O Excel da Câmara de Vila Feliz

!!! abstract "Contexto"
    A **Câmara Municipal de Vila Feliz** organiza diversos eventos culturais ao longo do ano — Festival de Chocolate, Mercado Medieval, Festival Literário, entre outros. Actualmente, toda a informação está numa **única folha Excel**, partilhada por email entre os técnicos do Gabinete de Cultura.

### Dados actuais (Excel)

| Evento | DataInício | DataFim | Espaço | Artista | ContactoArtista | Cachê | Patrocinador | ValorPatrocínio |
|--------|-----------|---------|--------|---------|----------------|-------|-------------|----------------|
| Festival Chocolate | 2025-04-01 | 2025-04-20 | Praça Central | João Silva | 918123456 | 500 € | Empresa X | 5 000 € |
| Festival Chocolate | 2025-04-01 | 2025-04-20 | Praça Central | Maria Santos | 936654321 | 800 € | Empresa X | 5 000 € |
| Festival Chocolate | 2025-04-01 | 2025-04-20 | Pavilhão Municipal | João Silva | 918123456 | 500 € | Empresa Y | 3 000 € |
| Mercado Medieval | 2025-07-10 | 2025-07-25 | Jardim da Vila | Pedro Costa | 912987654 | 1 200 € | Empresa X | 8 000 € |

### Problemas identificados

- **Redundância de dados** — O nome, datas e espaço do "Festival Chocolate" aparecem três vezes. Se a data mudar, é preciso actualizar três linhas.
- **Inconsistência** — Se alguém actualizar o contacto do João Silva numa linha e se esquecer das outras, ficam valores contraditórios.
- **Cruzamento impossível** — Quanto investiu a Empresa X no total? É preciso somar manualmente, correndo o risco de contar valores duplicados.
- **Sem chave única** — Nada distingue univocamente cada linha; dois festivais com o mesmo nome confundem-se.
- **Estrutura rígida** — Artistas e patrocinadores vivem nas mesmas colunas; impossível adicionar dados específicos de cada um.

---

## Tarefa 1 — Identificar entidades

A partir da tabela Excel, procuramos "coisas" com vida própria e atributos distintos:

| Entidade | O que representa | Exemplo de instância |
|----------|-----------------|---------------------|
| **Evento** | Festival ou actividade cultural | Festival de Chocolate 2025 |
| **Espaço** | Local onde decorre o evento | Praça Central (lotação: 2 000) |
| **Artista** | Pessoa ou grupo que actua | João Silva (músico) |
| **Patrocinador** | Empresa ou entidade que financia | Empresa X, Ldª |

!!! tip "Como distinguir entidade de atributo?"
    Se tem atributos próprios (nome, morada, contacto), é uma entidade. Se é apenas uma propriedade de outra coisa, é um atributo. Exemplo: "lotação" é atributo do Espaço; mas "Espaço" é entidade porque tem nome, localização, tipo e lotação.

---

## Tarefa 2 — Definir atributos e chaves

Para cada entidade, listamos os atributos e identificamos a chave primária.

**Evento**

| Atributo | Tipo | Chave | Exemplo |
|----------|------|-------|---------|
| codEvento | Numérico | :material-key: PK | 1, 2, 3 |
| nome | Texto | | "Festival de Chocolate" |
| dataInicio | Data | | 2025-04-01 |
| dataFim | Data | | 2025-04-20 |
| edicao | Numérico | | 26 |
| orcamento | Numérico | | 150 000 |

**Espaço**

| Atributo | Tipo | Chave | Exemplo |
|----------|------|-------|---------|
| codEspaco | Numérico | :material-key: PK | 1, 2, 3 |
| nome | Texto | | "Praça Central" |
| localizacao | Texto | | "Centro histórico" |
| tipo | Texto | | "Ar livre" / "Coberto" |
| lotacao | Numérico | | 2 000 |

**Artista**

| Atributo | Tipo | Chave | Exemplo |
|----------|------|-------|---------|
| codArtista | Numérico | :material-key: PK | 1, 2, 3 |
| nome | Texto | | "João Silva" |
| tipo | Texto | | "Músico" / "Animador" |
| contacto | Texto | | 918 123 456 |
| email | Texto | | joao@email.pt |

**Patrocinador**

| Atributo | Tipo | Chave | Exemplo |
|----------|------|-------|---------|
| codPatrocinador | Numérico | :material-key: PK | 1, 2, 3 |
| nome | Texto | | "Empresa X, Ldª" |
| NIF | Texto | | 501 234 567 |
| contacto | Texto | | "Dra. Ana Costa" |
| email | Texto | | geral@empresax.pt |

!!! danger "Nunca guardar valores calculados"
    A "duração do evento" calcula-se a partir de `dataInicio` e `dataFim` — não precisa de atributo próprio. O mesmo se aplica a "total de patrocínios por evento": calcula-se somando os valores da relação. Guardar valores calculados cria risco de inconsistência.

---

## Tarefa 3 — Estabelecer relações

Para cada par de entidades, fazemos duas perguntas-guia e registamos a resposta:

| Relação | Pergunta | Resposta | Cardinalidade |
|---------|----------|----------|---------------|
| Evento ↔ Espaço | Um evento realiza-se em quantos espaços? | Um só (o espaço principal) | **1:N** |
| | Um espaço pode acolher quantos eventos? | Vários (ao longo do ano) | |
| Evento ↔ Artista | Um evento pode ter quantos artistas? | Vários | **M:N** |
| | Um artista pode actuar em quantos eventos? | Vários | |
| Evento ↔ Patrocinador | Um evento pode ter quantos patrocinadores? | Vários | **M:N** |
| | Um patrocinador pode patrocinar quantos eventos? | Vários | |

!!! info "Quando ambas as respostas são 'vários'"
    Quando ambas as respostas são "vários", precisaremos de uma **tabela especial** (tabela associativa) para guardar essa ligação — veremos como no próximo capítulo.

---

## Tarefa 4 — Desenhar no ERDPlus

1. Abrir o [ERDPlus](https://erdplus.com) e criar conta gratuita (basta email e palavra-passe).
2. Criar novo diagrama E-R: **File → New ER Diagram**.
3. Clicar em **Entity** e criar as 4 entidades: Evento, Espaço, Artista, Patrocinador.
4. Para cada entidade, adicionar os atributos (clicar na entidade → **Attribute**). Marcar a chave primária seleccionando o atributo e activando **Key**.
5. Criar relações: clicar em **Relationship** → ligar as entidades duas a duas → dar nome ao losango (um verbo: "realiza_em", "actua_em", "patrocina").
6. Definir cardinalidades em cada linha da relação: **1**, **N** ou **M** conforme a tabela da Tarefa 3. Definir participação: **Total** (obrigatória) ou **Partial** (opcional).

!!! tip "Próximo passo"
    No próximo capítulo vamos pegar neste diagrama E-R, definir **pressupostos** de negócio, e aplicar as **regras de conversão** para transformar entidades e relações em tabelas organizadas.
