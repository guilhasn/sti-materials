# Exercícios — Modelo E-R na Administração Pública

Quatro exercícios para resolver autonomamente. Cada exercício apresenta um cenário real de administração pública com dados actuais (em Excel ou papel) e pede a modelação completa do diagrama Entidade-Relacionamento.

!!! info "O que entregar"
    1. Lista de entidades com atributos e chaves primárias
    2. Diagrama E-R completo no [ERDPlus](https://erdplus.com/) (com cardinalidades e participações)
    3. Esquema relacional final (tabelas com PKs e FKs)
    4. Identificação de pelo menos 3 redundâncias resolvidas pelo modelo

---

## Exercício 1 — Câmara Municipal: Gestão de Obras e Empreitadas

### Contexto

!!! abstract "Cenário"
    A **Câmara Municipal de Torres Vedras** gere actualmente mais de 30 obras públicas em simultâneo — estradas, escolas, equipamentos desportivos, espaços verdes. Cada obra é adjudicada a um empreiteiro através de concurso público. Um fiscal da câmara acompanha a execução. Actualmente, os dados estão em pastas físicas e folhas Excel separadas por ano.

### Dados actuais (exemplo Excel)

| Obra | Local | Empreiteiro | NIFEmpreiteiro | Contacto | Fiscal | DataInício | DataFim | Valor | Estado |
|------|-------|-------------|----------------|----------|--------|------------|---------|-------|--------|
| Requalificação EN8 | Km 45-52 | Construções Silva | 501234567 | J. Silva / 918... | Eng. Ana Costa | 2024-09-01 | 2025-03-30 | 850000€ | Em curso |
| Pavilhão Escolar | EB Torres | Construções Silva | 501234567 | J. Silva / 918... | Eng. Pedro Lopes | 2024-11-15 | 2025-06-30 | 320000€ | Em curso |
| Parque Urbano | Zona Norte | Jardins & Co | 509876543 | M. Jardim / 926... | Eng. Ana Costa | 2025-01-10 | 2025-08-30 | 175000€ | Adjudicada |

### Problemas visíveis

| Problema | Consequência |
|----------|-------------|
| Dados do empreiteiro repetidos em cada linha | Risco de inconsistência (NIF diferente para o mesmo nome) |
| Fiscal repetido sem código único | Impossível saber quantas obras cada fiscal acompanha |
| Contacto misturado com nome numa só célula | Impossível filtrar ou validar telefones |
| Sem código único por obra | Duas obras com nome semelhante são indistinguíveis |
| Valor e datas no mesmo sítio que dados do empreiteiro | Actualização de um dado obriga a mexer em toda a linha |

### Tarefa — Modelar o diagrama E-R

1. Identificar as **entidades** presentes nos dados.
2. Para cada entidade, definir os **atributos** e a **chave primária**.
3. Estabelecer as **relações** entre entidades, com cardinalidades e participações.
4. Desenhar o diagrama E-R completo no [ERDPlus](https://erdplus.com/).
5. Converter para **esquema relacional** (tabelas com PKs e FKs).

**Entidades esperadas:** Obra, Empreiteiro, Fiscal, Local, Contrato

### Pistas

- Qual a relação entre Empreiteiro e Obra? (1:N ou M:N?)
- O Contrato é entidade ou atributo? Se tem data, valor e estado, justifica-se como entidade?
- E se o mesmo fiscal acompanhar várias obras?
- Como separar o contacto (nome + telefone) em atributos correctos?

!!! tip "Bónus"
    Converter o esquema relacional em tabelas no ERDPlus usando a funcionalidade **Convert to Relational Schema**. Comparar o resultado automático com a vossa conversão manual.

---

## Exercício 2 — IPSS: Gestão de Utentes e Valências

### Contexto

!!! abstract "Cenário"
    O **Centro Social e Paroquial de Marinha Grande** oferece várias valências: lar de idosos, centro de dia, apoio domiciliário, creche e ATL. Cada utente pode estar inscrito em uma ou mais valências. A cada utente é atribuído um técnico responsável (assistente social, enfermeiro, educador). Os familiares são contactados em caso de emergência. A gestão é feita em fichas de papel e num Excel por valência.

### Dados actuais (exemplo Excel)

| NomeUtente | DataNasc | Valência | Mensalidade | Técnico | FunçãoTécnico | Familiar | TelFamiliar | Parentesco | DataInscrição | Estado |
|------------|----------|----------|-------------|---------|---------------|----------|-------------|------------|---------------|--------|
| Maria Santos | 1942-03-15 | Lar | 850€ | Dr. João Alves | Assist. Social | Ana Santos | 912345678 | Filha | 2023-06-01 | Activo |
| Maria Santos | 1942-03-15 | Centro de Dia | 320€ | Dr. João Alves | Assist. Social | Ana Santos | 912345678 | Filha | 2024-01-10 | Activo |
| António Ferreira | 1938-11-22 | Lar | 950€ | Enf. Rosa Lima | Enfermeira | Pedro Ferreira | 926789012 | Filho | 2022-09-15 | Activo |
| Sofia Mendes | 2020-07-08 | Creche | 280€ | Ed. Clara Dias | Educadora | Joana Mendes | 918456789 | Mãe | 2024-09-01 | Activo |
| Sofia Mendes | 2020-07-08 | ATL | 150€ | Ed. Clara Dias | Educadora | Joana Mendes | 918456789 | Mãe | 2025-01-05 | Activo |

### Problemas visíveis

| Problema | Consequência |
|----------|-------------|
| Utente repetido quando inscrito em várias valências | Dados pessoais duplicados, risco de divergência |
| Técnico e função repetidos em cada linha | Actualização da função obriga a alterar múltiplas linhas |
| Familiar misturado com dados do utente | Impossível gerir familiares com mais do que um utente |
| Sem código único por utente ou técnico | Homónimos são indistinguíveis |
| Dados da inscrição (mensalidade, data, estado) misturados com tudo | Impossível gerar relatórios por valência |

### Tarefa — Modelar o diagrama E-R

1. Identificar as **entidades** e respectivos **atributos**.
2. Definir **chaves primárias** para cada entidade.
3. Estabelecer **relações** com cardinalidades e participações.
4. Desenhar o diagrama E-R completo no ERDPlus.
5. Converter para esquema relacional.

**Entidades esperadas:** Utente, Valência, Funcionário/Técnico, Acordo (inscrição na valência), Familiar

### Pistas

- Um utente pode estar na creche E no ATL? Então a relação Utente–Valência é de que tipo?
- O Acordo (inscrição) entre Utente e Valência tem atributos próprios? (data, mensalidade, estado)
- Que relação existe entre Utente e Familiar? 1:N ou M:N?
- E se dois utentes tiverem o mesmo familiar de contacto?

---

## Exercício 3 — Universidade (ESTG-IPL): Gestão de Estágios Curriculares

### Contexto

!!! abstract "Cenário"
    A **ESTG-IPL** gere estágios curriculares para todos os cursos de licenciatura. Cada aluno é colocado numa empresa da região, com um orientador da escola e um supervisor da empresa. O processo actual é gerido por email entre coordenadores, alunos e empresas. Não existe base de dados centralizada — cada coordenador tem o seu Excel.

### Dados actuais (exemplo Excel)

| NomeAluno | NumAluno | Curso | Empresa | NIF_Empresa | Supervisor | OrientadorEST | Tema | DataInício | DataFim | Nota |
|-----------|----------|-------|---------|-------------|------------|---------------|------|------------|---------|------|
| João Silva | 2100123 | EI | TechLeiria | 501111222 | Dr. Rui Costa | Prof. Ana Matos | App Mobile | 2025-02-01 | 2025-06-30 | — |
| Maria Costa | 2100456 | EI | TechLeiria | 501111222 | Dr. Rui Costa | Prof. Ana Matos | Chatbot IA | 2025-02-01 | 2025-06-30 | — |
| Pedro Santos | 2100789 | GAP | CM Leiria | 500222333 | Dra. Sofia Lima | Prof. Carlos Dias | Gestão RH | 2025-03-01 | 2025-07-31 | — |
| Ana Ferreira | 2100234 | CTESP-TI | WebSoft | 509444555 | Eng. Tiago Lopes | Prof. Ana Matos | E-commerce | 2025-02-15 | 2025-05-15 | — |

### Problemas visíveis

| Problema | Consequência |
|----------|-------------|
| Dados da empresa repetidos por cada aluno | Inconsistência se o NIF for alterado numa linha e noutra não |
| Orientador repetido sem código próprio | Impossível saber quantos estágios cada docente orienta |
| Sem separação entre estágio e avaliação | Nota e tema na mesma linha que dados administrativos |
| Curso como texto livre | "EI", "Eng. Informática" e "Engenharia Informática" são tratados como cursos diferentes |
| Sem registo do relatório ou avaliação formal | Processo de avaliação invisível |

### Tarefa — Modelar o diagrama E-R

1. Identificar as **entidades** e respectivos **atributos**.
2. Definir **chaves primárias** para cada entidade.
3. Estabelecer **relações** com cardinalidades e participações.
4. Desenhar o diagrama E-R completo no ERDPlus.
5. Converter para esquema relacional.

**Entidades esperadas:** Aluno, Curso, Empresa, Estágio, Orientador (docente), Relatório/Avaliação

### Pistas

- Estágio é entidade ou relação entre Aluno e Empresa?
- Se Estágio é entidade, que relações tem com Aluno, Empresa, Orientador?
- Um orientador pode orientar vários alunos? E um aluno ter vários orientadores?
- O Relatório é entidade separada ou grupo de atributos do Estágio?

---

## Exercício 4 — Protecção Civil Municipal: Gestão de Ocorrências

### Contexto

!!! abstract "Cenário"
    O **Serviço Municipal de Protecção Civil** de Leiria regista e gere ocorrências (inundações, incêndios, quedas de árvores, deslizamentos). Cada ocorrência mobiliza equipas e recursos (viaturas, geradores, bombas). Um agente de protecção civil coordena a resposta. Actualmente, o registo é feito por telefone e num quadro branco na sala de operações.

### Dados actuais (sistema actual)

O sistema actual funciona da seguinte forma:

- Quando chega um alerta (telefone, 112, observação directa), o operador escreve no **quadro branco**: tipo de ocorrência, local aproximado e hora.
- O coordenador de turno decide que equipas e recursos enviar — de memória ou consultando uma lista em papel.
- A mobilização é feita por telefone e rádio.
- Quando a equipa chega ao local, comunica por rádio. O operador actualiza o quadro branco com "equipa no local".
- No final, o chefe de equipa preenche um **formulário em papel** com o relatório da ocorrência.
- Os formulários são arquivados numa pasta física por mês. Ninguém os consulta a não ser para o relatório anual.

| Problema | Consequência |
|----------|-------------|
| Quadro branco como sistema de registo | Informação apagada quando o espaço acaba |
| Sem registo dos recursos mobilizados | Impossível saber que viaturas estão disponíveis |
| Alocação de equipas de memória | Equipas sobrecarregadas, outras paradas |
| Relatório em papel arquivado | Dados inutilizáveis para análise ou prevenção |
| Sem geolocalização | Impossível cruzar ocorrências com zonas de risco |
| Sem registo de tempos de resposta | Impossível medir eficiência |

### Tarefa — Modelar o diagrama E-R

1. Identificar as **entidades** e respectivos **atributos**.
2. Definir **chaves primárias** para cada entidade.
3. Estabelecer **relações** com cardinalidades e participações.
4. Desenhar o diagrama E-R completo no ERDPlus.
5. Converter para esquema relacional.

**Entidades esperadas:** Ocorrência, Agente, Equipa, Recurso, Zona, Relatório

### Pistas

- Uma ocorrência pode mobilizar várias equipas? E uma equipa responder a várias ocorrências?
- Que relação existe entre Ocorrência e Recurso? Tem atributos próprios (quantidade, horas de utilização)?
- O Relatório é entidade separada ou atributos da Ocorrência?
- A Zona é entidade autónoma ou atributo da Ocorrência?

!!! info "Ligação ao BPMN"
    Este cenário tem semelhanças com o processo de resposta a emergências mapeado em BPMN. Reparem como o modelo E-R complementa o diagrama de processo — o BPMN mostra o **como** (fluxo de actividades) e o E-R mostra os **dados** (que informação é necessária em cada passo).
