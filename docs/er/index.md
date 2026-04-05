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
| **Chave primária (PK)** | :material-key: Elipse sublinhada | Identifica univocamente cada registo | codEvento, NIF |
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
    Usamos a convenção de **linha dupla** para participação obrigatória e **linha simples** para participação parcial — a mesma notação que o ERDPlus utiliza.

---

## Regras de Conversão E-R → Tabelas

Após desenhar o diagrama E-R, é necessário convertê-lo em **tabelas**. As regras determinam quantas tabelas resultam:

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
    A grande maioria dos casos usa a **Regra 4** (1:N obrigatória → 2 tabelas) e a **Regra 6** (M:N → 3 tabelas). Dominar estas duas cobre a maioria dos cenários reais.

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
