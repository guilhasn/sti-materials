# Modelação Conceptual com E-R

## Objectivos

- [ ] Compreender o conceito de entidade, atributo e relação.
- [ ] Distinguir tipos de atributos (chave, composto, multivalor, derivado).
- [ ] Aplicar cardinalidades (1:1, 1:N, M:N) a cenários reais da AP.
- [ ] Criar o primeiro diagrama E-R no ERDPlus.

---

## Conceitos-chave

### Elementos fundamentais do Modelo E-R

| Conceito | Significado | Exemplo |
|----------|------------|---------|
| **Entidade** | Objecto sobre o qual guardamos dados | Evento, Espaço, Artista |
| **Atributo** | Propriedade que caracteriza uma entidade | nome, data, lotação |
| **Chave primária (PK)** | Atributo que identifica univocamente cada registo | codEvento, NIF |
| **Chave candidata** | Atributo que poderia ser PK | NIF, BI, nº contribuinte |
| **Chave estrangeira (FK)** | Atributo que referencia a PK de outra entidade | codEspaco na entidade Evento |
| **Relação** | Associação entre duas (ou mais) entidades | Evento "realiza-se em" Espaço |
| **Cardinalidade** | Quantos registos de cada lado participam | 1:N, M:N |

!!! note "Do processo aos dados"
    Nas Aulas 4–5, mapeámos processos com BPMN. Agora vamos modelar os dados que esses processos lêem e escrevem. O E-R é a ponte entre o desenho do processo e a implementação do sistema de informação.

---

## Cenário — Eventos Culturais de Óbidos

!!! abstract "Contexto"
    A **Câmara Municipal de Óbidos** organiza dezenas de eventos culturais por ano — Festival Internacional de Chocolate, Mercado Medieval, Festival Literário, Natal de Óbidos, entre outros. Actualmente, toda a informação está dispersa em folhas Excel, emails e documentos Word:

    - Uma folha com "lista de eventos" tem colunas para tudo: nome do evento, datas, espaço, responsável, artistas, patrocinadores — tudo misturado.
    - Quando um artista actua em vários eventos, os seus dados (nome, contacto, cachet) são copiados linha a linha.
    - Os patrocínios são registados na mesma folha dos eventos — impossível saber o total por patrocinador.

### Dados actuais (Excel)

| Evento | DataInício | DataFim | Espaço | Artista | ContactoArtista | Cachet | Patrocinador | ValorPatrocínio |
|--------|-----------|---------|--------|---------|----------------|--------|-------------|----------------|
| Festival Chocolate | 2025-04-01 | 2025-04-20 | Praça Santa Maria | João Silva | 918123456 | 500€ | Empresa X | 5000€ |
| Festival Chocolate | 2025-04-01 | 2025-04-20 | Praça Santa Maria | Maria Santos | 936654321 | 800€ | Empresa X | 5000€ |
| Festival Chocolate | 2025-04-01 | 2025-04-20 | Pavilhão Municipal | João Silva | 918123456 | 500€ | Empresa Y | 3000€ |
| Mercado Medieval | 2025-07-10 | 2025-07-25 | Vila de Óbidos | Pedro Costa | 912987654 | 1200€ | Empresa X | 8000€ |

### Problemas identificados

| Problema | Impacto |
|----------|---------|
| Dados do artista repetidos em cada evento | Se mudar o contacto, tem de alterar N linhas |
| Dados do patrocinador repetidos | Impossível calcular total investido por patrocinador |
| Dados do espaço misturados com evento | Lotação e localização do espaço repetidos |
| Sem chave única por evento | Impossível distinguir edições do mesmo festival |
| Artistas e patrocinadores na mesma tabela | Estrutura rígida, impossível adicionar dados específicos |

---

## Exercício — Modelar os dados de Óbidos

### Preparação

1. Abrir o [ERDPlus](https://erdplus.com) no navegador.
2. Criar conta gratuita (ou usar sem conta para teste rápido).
3. Criar novo diagrama E-R.
4. Consultar a [Visão Geral E-R](index.md) para referência dos símbolos.

### Tarefas

**Tarefa 1 — Identificar entidades**

A partir dos dados actuais, identificar as entidades — cada "coisa" com vida própria e atributos distintos:

| Entidade | O que representa | Exemplo de instância |
|----------|-----------------|---------------------|
| **Evento** | Festival ou actividade cultural | Festival Internacional de Chocolate 2025 |
| **Espaço** | Local onde decorre o evento | Praça Santa Maria (lotação: 2000) |
| **Artista** | Pessoa ou grupo que actua | João Silva (músico) |
| **Patrocinador** | Empresa ou entidade que financia | Empresa X, Ldª |

!!! tip "Como distinguir entidade de atributo?"
    Se tem atributos próprios (nome, morada, contacto), é uma entidade. Se é apenas uma propriedade de outra coisa, é um atributo. Exemplo: "lotação" é atributo do Espaço; mas "Espaço" é entidade porque tem nome, localização, tipo, lotação.

**Tarefa 2 — Definir atributos**

Para cada entidade, definir atributos e identificar a chave primária.

**Evento:**

| Atributo | Tipo | PK? | Exemplo |
|----------|------|-----|---------|
| codEvento | Numérico | ✅ | 1, 2, 3 |
| nome | Texto | | "Festival Internacional de Chocolate" |
| dataInício | Data | | 2025-04-01 |
| dataFim | Data | | 2025-04-20 |
| edicao | Numérico | | 26 |
| orcamento | Numérico | | 150000 |

**Espaço:**

| Atributo | Tipo | PK? | Exemplo |
|----------|------|-----|---------|
| codEspaco | Numérico | ✅ | 1, 2, 3 |
| nome | Texto | | "Praça Santa Maria" |
| localizacao | Texto | | "Centro histórico" |
| tipo | Texto | | "Ar livre" / "Coberto" |
| lotacao | Numérico | | 2000 |

**Artista:**

| Atributo | Tipo | PK? | Exemplo |
|----------|------|-----|---------|
| codArtista | Numérico | ✅ | 1, 2, 3 |
| nome | Texto | | "João Silva" |
| tipo | Texto | | "Músico" / "Animador" |
| contacto | Texto | | 918123456 |
| email | Texto | | joao@email.pt |

**Patrocinador:**

| Atributo | Tipo | PK? | Exemplo |
|----------|------|-----|---------|
| codPatrocinador | Numérico | ✅ | 1, 2, 3 |
| nome | Texto | | "Empresa X, Ldª" |
| NIF | Texto | | 501234567 |
| contacto | Texto | | "Dra. Ana Costa" |
| email | Texto | | geral@empresax.pt |

!!! warning "Regra importante"
    Nunca guardar dados que possam ser calculados. Por exemplo, a "duração do evento" calcula-se a partir de dataInício e dataFim — não precisa de atributo próprio.

**Tarefa 3 — Estabelecer relações e cardinalidades**

Usar perguntas-guia para determinar cardinalidade:

| Pergunta | Resposta | Relação | Cardinalidade |
|----------|---------|---------|---------------|
| Um evento pode realizar-se em quantos espaços? | Vários (palcos, salas) | Evento ↔ Espaço | M:N |
| Um espaço pode acolher quantos eventos? | Vários (ao longo do ano) | | |
| Um artista pode actuar em quantos eventos? | Vários | Evento ↔ Artista | M:N |
| Um evento pode ter quantos artistas? | Vários | | |
| Um patrocinador pode patrocinar quantos eventos? | Vários | Evento ↔ Patrocinador | M:N |
| Um evento pode ter quantos patrocinadores? | Vários | | |

!!! info "Relações M:N geram tabelas associativas"
    Quando ambos os lados são "vários", precisamos de uma tabela intermédia (relação) que guarda as chaves de ambas as entidades — e pode ter atributos próprios como "cachet" ou "valorPatrocinio".

**Tarefa 4 — Desenhar no ERDPlus**

1. Clicar em **Entity** e criar as 4 entidades (Evento, Espaço, Artista, Patrocinador).
2. Para cada entidade, adicionar os atributos (clicar na entidade → **Attribute**).
3. Marcar a chave primária de cada entidade (seleccionar atributo → marcar como **Key**).
4. Criar relações: clicar **Relationship** → ligar as entidades → dar nome ao losango (verbo).
5. Definir cardinalidades: clicar na linha → escolher **1**, **N** ou **M**.
6. Exportar como PNG: **File → Export as PNG**.

!!! tip "Dica"
    Posicionar as entidades nos cantos e as relações no centro facilita a leitura. Manter o diagrama limpo e espaçado.
