# Modelo Entidade-Relacionamento — Dados na Administração Pública

Este módulo introduz o **Modelo Entidade-Relacionamento (E-R)** como ferramenta de concepção de bases de dados em contexto de administração pública. As três aulas utilizam o cenário da **Câmara Municipal de Vila Feliz** — gestão de eventos culturais — onde é necessário organizar dados de munícipes, espaços, artistas e logística.

!!! info "Pré-requisitos"
    - Módulo BPMN concluído
    - Navegador web actualizado (Chrome, Firefox ou Edge)
    - Acesso à internet para usar o [ERDPlus](https://erdplus.com)
    - Não é necessário instalar software
    - Recomendado: segundo ecrã para ter o diagrama e o enunciado lado a lado

---

## Porquê Modelação de Dados na AP?

Os serviços públicos dependem de **dados** — registos de cidadãos, licenciamentos, recursos humanos, orçamentos, inventários, actas. Quando esses dados vivem em folhas de cálculo, emails e papel:

- **Redundância** — o mesmo munícipe aparece repetido em dez ficheiros diferentes
- **Inconsistência** — a morada está actualizada num sítio e desactualizada noutro
- **Impossibilidade de cruzamento** — não se consegue saber quantos eventos um artista participou
- **Risco de incumprimento do RGPD** — dados pessoais dispersos, sem controlo de acesso

O **Modelo E-R** fornece uma forma visual de projectar a estrutura dos dados **antes** de construir qualquer sistema. É o equivalente à planta de um edifício — projecta-se primeiro, constrói-se depois.

!!! tip "Analogia"
    Assim como o BPMN mapeia **processos** (quem faz o quê e quando), o Modelo E-R mapeia **dados** (que informação guardamos e como se relaciona). São ferramentas complementares na modernização de serviços públicos.

---

## Estrutura do módulo

| Etapa | Pergunta-chave | O que se faz |
|-------|---------------|--------------|
| **Do Excel ao Modelo Conceptual** | "O que temos? O que está mal?" | Partir de um Excel caótico → identificar entidades, atributos e relações |
| **Das Relações às Tabelas** | "Como organizar?" | Definir pressupostos → aplicar regras → obter tabelas |
| **Da Concepção à Especificação** | "Como finalizar?" | Normalizar, escolher chaves, definir domínios → especificação final |

---

## Conceitos rápidos

| Conceito | Símbolo | O que é | Exemplo |
|----------|---------|---------|---------|
| **Entidade** | :material-rectangle-outline: Rectângulo | Objecto sobre o qual guardamos dados | Evento, Espaço, Artista |
| **Atributo** | :material-ellipse-outline: Elipse | Propriedade de uma entidade | nome, data, lotação |
| **Chave primária (PK)** | :material-key: Chave | Identifica univocamente cada registo | codEvento, NIF |
| **Chave candidata** | — | Atributo que poderia ser PK | NIF, nº contribuinte |
| **Chave estrangeira (FK)** | :material-key-link: | Referencia a PK de outra entidade | codEspaco na entidade Evento |
| **Relação** | :material-rhombus-outline: Losango | Associação entre entidades | "realiza_em", "participa" |
| **Cardinalidade** | 1, N, M | Quantos de cada lado participam | 1:N, M:N |

---

## Cardinalidade — resumo

| Tipo | Significado | Exemplo AP |
|------|------------|------------|
| **1:1** | Cada A tem exactamente um B | Presidente ↔ Câmara |
| **1:N** | Cada A tem vários B, cada B pertence a um A | Departamento → Funcionários |
| **M:N** | Vários A associados a vários B | Evento ↔ Artistas |

## Participação

| Tipo | Notação no diagrama | Significado |
|------|-------------------|-------------|
| **Obrigatória (total)** | Linha dupla | Todos os registos **devem** participar |
| **Não obrigatória (parcial)** | Linha simples | Nem todos participam |

!!! note "Notação usada neste curso"
    Adoptamos a **notação Chen** (Peter Chen, 1976) — a notação clássica do Modelo E-R, suportada pelo [ERDPlus](https://erdplus.com) e usada na sebenta teórica. Caracteriza-se por:

    - **Rectângulos** para entidades, **losangos** para relações, **elipses** para atributos
    - **Linha dupla** = participação obrigatória; **linha simples** = participação parcial
    - **Atributo-chave** sublinhado; **multivalor** em elipse dupla; **derivado** a tracejado

    Existem outras notações (Crow's Foot, UML, IDEF1X) usadas na indústria, mas a notação Chen é a mais clara para aprender o modelo conceptual — separa visualmente entidade, atributo e relação. Quando convertermos para o **esquema relacional** (tabelas), passamos à notação `TABELA(pk, atributo, fk)`, que o ERDPlus gera automaticamente.

---

## Conversão E-R → Tabelas — a intuição antes das regras

### Porquê aplicar regras de conversão?

O diagrama E-R é um **modelo conceptual** — desenha entidades, atributos e relações de forma visual. Mas uma base de dados real não guarda losangos nem elipses: guarda **tabelas** com linhas e colunas. As **regras de conversão** são o procedimento padronizado que traduz o diagrama em tabelas, garantindo que:

- **Não se perde informação** — todos os atributos e ligações do diagrama ficam representados
- **Não se gera redundância** — cada dado é guardado num único sítio
- **Não aparecem campos vazios desnecessários** — evita-se o desperdício e os erros associados a NULLs
- **Cada tabela tem uma chave que identifica univocamente as suas linhas** — base para consultas correctas

Sem regras, dois analistas a converter o mesmo diagrama produziriam tabelas diferentes — algumas correctas, outras com problemas. As regras existem para que **qualquer pessoa**, partindo do mesmo diagrama, chegue às **mesmas tabelas**.

### As 7 regras de conversão

| Regra | Cardinalidade | Participação | Nº Tabelas | Onde fica a FK |
|-------|--------------|-------------|------------|----------------|
| 1 | 1:1 | Obrigatória ambas | 1 | PK de qualquer uma |
| 2 | 1:1 | Obrigatória numa | 2 | PK da não-obrigatória → na obrigatória |
| 3 | 1:1 | Nenhuma obrigatória | 3 | Tabela de relação com ambas PKs |
| **4** | **1:N** | **Obrigatória lado N** | **2** | **PK do lado 1 → no lado N** |
| 5 | 1:N | Não obrigatória lado N | 3 | Tabela de relação |
| **6** | **M:N** | **Indiferente** | **3** | **Tabela de relação com ambas PKs** |
| 7 | Ternária | Indiferente | 4 | Tabela de relação com todas PKs |

!!! tip "Regras mais comuns na AP"
    Na prática, **95% dos casos** caem em duas situações: **Regra 4** (relação 1:N obrigatória → 2 tabelas) e **Regra 6** (relação M:N → 3 tabelas). Dominar estas duas cobre quase todos os cenários reais.

### A intuição por trás das regras

Em vez de decorar 7 regras, basta perceber **dois princípios**:

1. **Não queremos campos vazios (NULLs)** — desperdiçam espaço e geram confusão
2. **Não queremos linhas repetidas** — geram inconsistências e erros

Para cada relação entre duas entidades, faça mentalmente este exercício:

> *"Se eu meter a chave estrangeira (FK) no lado mais natural, escrever 3 linhas com dados reais — aparece algum vazio ou alguma linha repetida?"*

A resposta dá-lhe **quantas tabelas** precisa.

### Caso A — Tudo limpo → ficam 2 tabelas

**Exemplo:** *Cada Evento realiza-se num único Espaço (obrigatório); cada Espaço acolhe vários Eventos.*

Meto `codEspaco` dentro de `EVENTO`:

| codEvento | nome | codEspaco |
|---|---|---|
| 1 | Festival Chocolate | 5 |
| 2 | Mercado Medieval | 5 |
| 3 | Natal Vila Feliz | 7 |

- Há células vazias? **Não** ✅
- Há linhas repetidas? **Não** ✅

→ **Bastam 2 tabelas** (`EVENTO` e `ESPAÇO`). Esta situação chama-se tecnicamente **Regra 4**.

### Caso B — Aparecem NULLs → precisa de 3 tabelas

**Exemplo:** *Um Artista pode (ou não) ter um agente; cada agente representa vários artistas.*

Meto `codAgente` dentro de `ARTISTA`:

| codArtista | nome | codAgente |
|---|---|---|
| 10 | João Silva | 3 |
| 11 | Ana Costa | *(vazio)* |
| 12 | Pedro Lima | *(vazio)* |

- Há células vazias? **Sim** ❌

→ Criar uma **3ª tabela** `REPRESENTAÇÃO` só com os artistas que *têm* agente. Esta situação chama-se **Regra 5**.

### Caso C — Aparecem repetições → precisa de 3 tabelas

**Exemplo:** *Um Evento tem vários Patrocinadores; cada Patrocinador apoia vários Eventos.*

Tento meter `codPatrocinador` dentro de `EVENTO`:

| codEvento | nome | codPatrocinador |
|---|---|---|
| 1 | Festival Chocolate | 100 |
| 1 | Festival Chocolate | 101 ← *mesmo evento outra vez!* |
| 1 | Festival Chocolate | 102 ← *e outra vez!* |
| 2 | Mercado Medieval | 100 |

- Há linhas repetidas? **Sim** ❌

→ Criar uma **3ª tabela** `PATROCÍNIO` com os pares (evento, patrocinador). Esta situação chama-se **Regra 6** e é **obrigatória sempre que há M:N**.

### Atalho mental

| O que vê na tabela tentativa? | O que faz? | Nome técnico |
|---|---|---|
| Tudo limpo (sem vazios, sem repetições) | Fica com **2 tabelas** | Regra 4 |
| **Células vazias** (NULLs) | Cria **3ª tabela** para esconder os vazios | Regra 5 |
| **Linhas repetidas** | Cria **3ª tabela** para esconder as repetições | Regra 6 |

---

## Nomenclatura

Para documentar o esquema relacional, usa-se a convenção:

```
ENTIDADE(atributo1, atributo2, atributo3, ...)
```

- **Sublinhado** → chave primária (PK)
- *Itálico* → chave estrangeira (FK)

**Exemplo:**

```
EVENTO(codEvento, designação, dataInício, dataFim, codEspaco)
       ─────────                                   ─────────
           PK                                          FK

ACTUAÇÃO(codEvento, codArtista, cachê)
         ─────────  ──────────
          FK (PK)    FK (PK)     ← PK composta
```

---

## Fases de Criação de uma Base de Dados

| Fase | Descrição | Resultado |
|------|-----------|-----------|
| 1 | **Determinar entidades** | Lista de entidades relevantes |
| 2 | **Desenhar DER simplificado** | Diagrama só com entidades e relações |
| 3 | **Definir pressupostos** | Regras de negócio documentadas |
| 4 | **Desenhar DER completo** | Diagrama com atributos, PKs, cardinalidades |
| 5 | **Determinar tabelas** (aplicar regras) | Esquema relacional preliminar |
| 6 | **Determinar chaves candidatas** | Lista de possíveis identificadores |
| 7 | **Determinar chaves primárias** | PK escolhida para cada tabela |
| 8 | **Definir tabelas finais** | Nomenclatura completa com PKs e FKs |
| 9 | **Definir domínio dos atributos** | Tipo de dados e restrições |

!!! warning "Não saltar fases"
    Sem o diagrama E-R e os pressupostos documentados, a base de dados resultante terá problemas estruturais difíceis de corrigir posteriormente.

---

!!! note "E-R não é a base de dados"
    Tal como o BPMN não é um fluxograma, o Modelo E-R **não é** uma base de dados — é um **modelo conceptual**. A implementação (criação de tabelas, inserção de dados, consultas) é feita num SGBD como Access, MySQL ou PostgreSQL. O diagrama E-R é o projecto; o SGBD é a obra.
