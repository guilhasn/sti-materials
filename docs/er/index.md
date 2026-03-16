# Modelo Entidade-Relacionamento — Dados na Administração Pública

Este módulo introduz o **Modelo Entidade-Relacionamento (E-R)** como ferramenta de concepção de bases de dados em contexto de administração pública. Ambas as aulas utilizam o cenário da **Câmara Municipal de Óbidos** a gerir eventos culturais — Festival de Chocolate, Mercado Medieval, entre outros — onde é necessário organizar dados de munícipes, espaços, artistas e logística.

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
- **Ausência de indicadores** — sem dados estruturados, não há relatórios fiáveis

O **Modelo E-R** fornece uma forma visual e normalizada de projectar a estrutura dos dados **antes** de construir qualquer sistema. É o equivalente à planta de um edifício — projecta-se primeiro, constrói-se depois.

!!! tip "Analogia"
    Assim como o BPMN mapeia **processos** (quem faz o quê e quando), o Modelo E-R mapeia **dados** (que informação guardamos e como se relaciona). São ferramentas complementares na modernização de serviços públicos.

---

## Conceito de Base de Dados

Uma **base de dados** é um conjunto organizado de dados relacionados entre si, armazenados de forma estruturada para permitir consultas, inserções, actualizações e eliminações eficientes.

Um **SGBD** (Sistema de Gestão de Bases de Dados) é o software que gere a base de dados — exemplos: Microsoft Access, MySQL, PostgreSQL, Oracle.

!!! warning "Problema: dados não estruturados"
    Considere-se a seguinte tabela Excel usada para gerir inscrições em eventos:

    | Nome | NIF | Morada | Evento | Data Evento | Local |
    |------|-----|--------|--------|-------------|-------|
    | Ana Silva | 123456789 | Rua da Paz, 5, Óbidos | Festival Chocolate | 2025-04-10 | Pavilhão Central |
    | Ana Silva | 123456789 | Rua da Paz, 5, Óbidos | Mercado Medieval | 2025-07-15 | Castelo |
    | João Costa | 987654321 | Av. Principal, 22, Caldas | Festival Chocolate | 2025-04-10 | Pavilhão Central |

    Os dados de "Ana Silva" estão duplicados. Se a morada mudar, é preciso alterar em **todas** as linhas. Se houver milhares de registos, a inconsistência é inevitável.

---

## Elementos fundamentais do Modelo E-R

A tabela seguinte resume os elementos visuais utilizados na notação E-R:

| Elemento | Símbolo | Função | Exemplo AP |
|----------|---------|--------|------------|
| **Entidade** | :material-rectangle-outline: Rectângulo | Objecto sobre o qual guardamos dados | Munícipe, Evento, Espaço |
| **Entidade fraca** | :material-rectangle-outline: Rectângulo duplo | Depende de outra entidade para existir | Parcela (depende de Loteamento) |
| **Atributo** | :material-ellipse-outline: Elipse | Propriedade de uma entidade | Nome, NIF, Data |
| **Atributo-chave (PK)** | :material-key: Elipse sublinhada | Identifica univocamente cada instância | NIF, CódigoEvento |
| **Atributo composto** | :material-ellipse-outline: Elipse com sub-elipses | Pode ser dividido em partes | Morada → Rua + CP + Cidade |
| **Atributo multivalor** | :material-ellipse-outline: Elipse dupla | Pode ter vários valores | Telefones de contacto |
| **Atributo derivado** | :material-ellipse-outline: Elipse tracejada | Calculado a partir de outros | Idade ← Data de nascimento |
| **Relação** | :material-rhombus-outline: Losango | Associação entre entidades | "participa_em", "gere" |
| **Cardinalidade** | 1, N, M junto às linhas | Quantos de cada lado participam | 1:N, M:N |
| **Participação total** | Linha dupla | Todos os registos participam (obrigatório) | Todo evento tem espaço |
| **Participação parcial** | Linha simples | Nem todos participam (opcional) | Nem todo funcionário gere eventos |

---

### Entidades

Uma **entidade** representa um objecto do mundo real sobre o qual se pretende guardar informação. Graficamente, é um **rectângulo** com o nome no interior.

**Regras para definir entidades:**

- O nome deve ser um **substantivo no singular** — "Munícipe", não "Munícipes"
- Representa um **grupo de objectos semelhantes** — a entidade "Evento" engloba todos os eventos
- Cada instância da entidade é um registo individual — o Festival de Chocolate é uma instância de "Evento"

**Exemplos de entidades na AP:**

| Entidade | O que representa |
|----------|------------------|
| **Munícipe** | Cidadão inscrito ou registado no município |
| **Funcionário** | Colaborador da câmara municipal |
| **Departamento** | Unidade orgânica da autarquia |
| **Evento** | Actividade cultural ou institucional |
| **Espaço** | Local físico onde decorrem actividades |
| **Documento** | Ofício, requerimento, acta ou deliberação |

Uma **entidade fraca** é aquela que não tem existência independente — depende de outra entidade (a entidade forte) para ser identificada. Exemplo: a entidade "Parcela" só existe no contexto de um "Loteamento".

---

### Atributos

Os **atributos** são as propriedades que descrevem cada entidade. Graficamente, representam-se por **elipses** ligadas à entidade.

#### Tipos de atributos

**Atómico (simples) vs. Composto:**

- **Atómico** — não pode ser subdividido: `NIF`, `DataNascimento`
- **Composto** — pode ser decomposto em partes: `Morada` → `Rua` + `CódigoPostal` + `Cidade`

!!! tip "Quando usar atributo composto?"
    Se alguma vez for necessário pesquisar ou ordenar por uma das partes (ex.: filtrar por cidade), então o atributo deve ser composto. Se a morada é sempre usada como um todo, pode ser atómico.

**Identificadores — Chaves:**

- :material-key: **Chave primária (PK)** — atributo (ou conjunto de atributos) que identifica **univocamente** cada instância. Representada por elipse sublinhada. Exemplo: `NIF` na entidade Munícipe.
- **Chave candidata** — qualquer atributo que poderia servir de PK. Exemplo: para um cidadão, tanto o `NIF` como o `NúmeroBI` poderiam identificá-lo. Escolhe-se uma como PK.
- :material-key-link: **Chave estrangeira (FK)** — atributo numa entidade que referencia a PK de outra entidade. É o mecanismo que liga tabelas entre si.

**Chave simples vs. composta:**

- **Simples** — um único atributo: `NIF`
- **Composta** — combinação de atributos: `CódigoEvento` + `DataEdição` (quando o código do evento se repete em edições diferentes)

**Atributos especiais:**

- **Multivalor** (elipse dupla) — pode conter vários valores para a mesma instância. Exemplo: um munícipe pode ter vários números de telefone.
- **Derivado** (elipse tracejada) — calculado a partir de outros atributos. Exemplo: `Idade` é calculada a partir de `DataNascimento`.

!!! danger "Regra: não guardar dados calculados"
    Nunca se deve armazenar um valor que pode ser calculado a partir de outros. A `Idade` muda todos os anos — se for guardada como campo, estará sempre desactualizada. Guardar apenas `DataNascimento` e calcular a idade quando necessário.

---

### Relacionamentos

Um **relacionamento** representa uma associação entre duas ou mais entidades. Graficamente, é um **losango** com o nome da relação (tipicamente um verbo).

**Regras de nomeação:**

- Usar **verbos** que descrevam a acção: "participa_em", "gere", "pertence_a", "realiza"
- O nome deve fazer sentido quando lido: "Funcionário **gere** Evento"

#### Grau dos relacionamentos

| Grau | Definição | Exemplo |
|------|-----------|---------|
| **Unário** | Uma entidade relaciona-se consigo própria | Funcionário → **chefiar** → Funcionário |
| **Binário** | Duas entidades distintas | Munícipe → **inscrever** → Evento |
| **Ternário** | Três entidades distintas | Fornecedor + Produto + Evento |

!!! note "Relacionamentos múltiplos"
    Duas entidades podem ter **mais do que um relacionamento** entre si. Exemplo: um Funcionário pode "organizar" um Evento e também "participar_em" esse mesmo Evento — são duas relações distintas.

---

## Cardinalidade e Participação

A **cardinalidade** define quantas instâncias de uma entidade podem estar associadas a instâncias de outra. A **participação** define se a associação é obrigatória ou opcional.

### Tipos de cardinalidade

**1:1 — Um para Um**

Cada instância de A está associada a no máximo uma instância de B, e vice-versa.

> Exemplo AP: Presidente ↔ Câmara Municipal — cada câmara tem exactamente um presidente, e cada presidente dirige exactamente uma câmara.

**1:N — Um para Muitos**

Cada instância de A pode estar associada a muitas instâncias de B, mas cada B está associada a no máximo uma instância de A.

> Exemplo AP: Departamento → Funcionários — um departamento tem muitos funcionários, mas cada funcionário pertence a um único departamento.

**M:N — Muitos para Muitos**

Cada instância de A pode estar associada a muitas instâncias de B, e vice-versa.

> Exemplo AP: Evento ↔ Artistas — um evento tem vários artistas, e um artista pode participar em vários eventos.

### Participação (obrigatoriedade)

| Tipo | Notação | Significado | Exemplo |
|------|---------|-------------|---------|
| **Obrigatória (total)** | Linha dupla / traço vertical dentro do rectângulo | Todas as instâncias **devem** participar | Todo evento **tem de** ter um espaço atribuído |
| **Não obrigatória (parcial)** | Linha simples | Nem todas as instâncias participam | Nem todo espaço tem um evento agendado |

!!! info "Notação de participação obrigatória"
    No diagrama E-R, a participação obrigatória é representada por uma **linha dupla** entre a entidade e o relacionamento, ou por um **traço vertical** junto ao rectângulo da entidade. A participação parcial usa uma linha simples.

---

## Regras de Conversão E-R → Tabelas

Após desenhar o diagrama E-R, é necessário convertê-lo em **tabelas** (esquema relacional). As regras seguintes determinam quantas tabelas resultam e onde ficam as chaves estrangeiras:

| Regra | Cardinalidade | Participação | Nº Tabelas | Onde fica a FK | Exemplo |
|-------|--------------|-------------|------------|----------------|---------|
| 1 | 1:1 | Obrigatória ambas | 1 | PK de qualquer uma | Presidente + Câmara → 1 tabela |
| 2 | 1:1 | Obrigatória numa | 2 | PK da não-obrigatória → na obrigatória | Funcionário + GabinetePrivativo |
| 3 | 1:1 | Nenhuma obrigatória | 3 | Tabela de relação com ambas PKs | Consultor + Projecto |
| 4 | 1:N | Obrigatória lado N | 2 | PK do lado 1 → no lado N | Departamento → Funcionários |
| 5 | 1:N | Não obrigatória lado N | 3 | Tabela de relação | Espaço → Evento (nem todo espaço tem evento) |
| 6 | N:M | Indiferente | 3 | Tabela de relação com ambas PKs | Evento ↔ Artista |
| 7 | Ternária | Indiferente | 4 | Tabela de relação com todas PKs | Fornecedor + Produto + Evento |

!!! tip "Regra mais comum na AP"
    A maioria dos relacionamentos em sistemas de gestão pública são **1:N com participação obrigatória** (Regra 4). Exemplo: cada funcionário pertence obrigatoriamente a um departamento.

---

## Nomenclatura

Para documentar o esquema relacional resultante, usa-se a seguinte convenção:

```
ENTIDADE(atributo1, atributo2, atributo3, ...)
```

- **Sublinhado** para a chave primária (PK): <u>atributo1</u>
- *Itálico* para a chave estrangeira (FK): *atributo3*

**Exemplo:**

```
MUNÍCIPE(NIF, Nome, DataNascimento, Morada)
         ───                                  ← PK sublinhado

EVENTO(CódigoEvento, Designação, Data, CódigoEspaço)
       ────────────                    ─────────────
            PK                              FK

INSCRIÇÃO(NIF, CódigoEvento, DataInscrição)
          ───  ────────────
           FK       FK        ← PK composta (ambas)
```

---

## Fases de Criação de uma Base de Dados

O projecto de uma base de dados segue **nove fases** sequenciais:

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
| 9 | **Definir domínio dos atributos** | Tipo de dados e restrições (texto, inteiro, data, etc.) |

!!! warning "Não saltar fases"
    É tentador passar directamente para a criação de tabelas num SGBD. Sem o diagrama E-R e os pressupostos documentados, a base de dados resultante terá problemas estruturais difíceis de corrigir posteriormente.

---

## Tutorial ERDPlus

O [ERDPlus](https://erdplus.com) é uma ferramenta **gratuita e online** para desenhar diagramas E-R e converter automaticamente para esquema relacional.

!!! info "Acesso"
    Aceder em [https://erdplus.com](https://erdplus.com) e criar uma conta gratuita (basta email e palavra-passe).

### Criar um novo diagrama

1. Após autenticação, clicar em **"New Diagram"** → **"ER Diagram"**.
2. O editor abre com um canvas em branco.

### Adicionar entidades

1. Na barra de ferramentas, clicar em **"Entity"**.
2. Clicar no canvas onde se pretende colocar a entidade.
3. Escrever o nome (ex.: "Munícipe") e confirmar.

### Adicionar atributos

1. Clicar na entidade à qual se quer adicionar atributos.
2. Clicar em **"Attribute"** na barra de ferramentas.
3. Clicar junto à entidade e escrever o nome do atributo.
4. Para marcar como **chave primária**: seleccionar o atributo → activar a opção **"Primary Key"** no painel de propriedades.

### Adicionar relacionamentos

1. Clicar em **"Relationship"** na barra de ferramentas.
2. Clicar na primeira entidade, depois na segunda.
3. Escrever o nome da relação (verbo): "participa_em", "gere", "pertence_a".

### Definir cardinalidade

1. Seleccionar a linha de ligação entre a entidade e o relacionamento.
2. No painel de propriedades, definir a cardinalidade: **1** ou **N (Many)**.
3. Definir a participação: **Total** (obrigatória) ou **Partial** (opcional).

### Exportar o diagrama

- **Como imagem**: Menu → **"Export as PNG"**
- **Como PDF**: Menu → **"Export as PDF"**

### Converter para Esquema Relacional

1. No menu superior, clicar em **"Convert to Relational Schema"**.
2. O ERDPlus gera automaticamente as tabelas com PKs e FKs aplicando as regras de conversão.
3. Verificar o resultado — a conversão automática é um bom ponto de partida, mas deve ser revista.

!!! info "Formato de entrega"
    Para as aulas desta UC, entregar:

    1. O diagrama E-R exportado em `.png`
    2. O esquema relacional (captura de ecrã ou exportação do ERDPlus)

---

## Erros comuns

| Erro | Consequência | Correcção |
|------|-------------|-----------|
| Guardar dados calculados (idade) | Desactualização inevitável | Usar atributo derivado ou calcular na consulta |
| Listas numa célula (vários telefones) | Impossível pesquisar ou filtrar | Atributo multivalor ou tabela separada |
| Entidades sem chave primária | Registos duplicados, impossível distinguir instâncias | Definir sempre uma PK |
| Relação M:N sem tabela associativa | Impossível representar em tabelas relacionais | Aplicar Regra 6 — criar tabela de relação |
| Atributos que deveriam ser entidades | Redundância massiva de dados | Se tem atributos próprios, promover a entidade |
| Nomes de entidades no plural | Confusão conceptual | Usar sempre o **singular**: "Evento", não "Eventos" |
| Relação sem nome | Diagrama ambíguo, impossível interpretar | Nomear com verbo: "gere", "pertence_a" |
| Esquecer participação obrigatória | Regra de conversão errada → tabelas a mais ou a menos | Analisar sempre: "todos ou nem todos participam?" |

---

!!! note "E-R não é a base de dados"
    Tal como o BPMN não é um fluxograma, o Modelo E-R **não é** uma base de dados — é um **modelo conceptual** que representa a estrutura dos dados de forma abstracta. A implementação concreta (criação de tabelas, inserção de dados, consultas) é feita posteriormente num SGBD como Access, MySQL ou PostgreSQL. O diagrama E-R é o projecto; o SGBD é a obra.
