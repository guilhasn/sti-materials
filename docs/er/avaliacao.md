# Auto-avaliação — Modelo Entidade-Relacionamento

Página de consolidação de conhecimentos sobre o modelo E-R. Tente responder a cada questão antes de consultar a resposta. As respostas estão escondidas em blocos colapsáveis — clique para revelar.

!!! info "Como usar"
    Responder a todas as questões antes de revelar as respostas. Anotar as questões onde errou e rever o conceito correspondente na [Visão Geral](index.md).

---

## Secção 1 — Verdadeiro ou Falso

**1. Uma entidade pode existir sem atributos.**

??? success "Resposta"
    **Falso.** Toda entidade necessita de pelo menos um atributo (a chave primária) para que cada instância possa ser identificada de forma única.

**2. Uma relação M:N pode ser representada directamente numa tabela sem tabela intermédia.**

??? success "Resposta"
    **Falso.** Uma relação M:N exige sempre uma tabela associativa (tabela intermédia) que contém as chaves primárias de ambas as entidades como chaves estrangeiras. Não há forma de representar esta cardinalidade directamente em apenas duas tabelas.

**3. Um atributo derivado não precisa de ser armazenado na base de dados.**

??? success "Resposta"
    **Verdadeiro.** Um atributo derivado é calculado a partir de outros atributos (por exemplo, a idade calculada a partir da data de nascimento). Não necessita de armazenamento — pode ser obtido por cálculo quando necessário.

**4. Cada entidade deve ter exactamente uma chave primária.**

??? success "Resposta"
    **Verdadeiro.** Cada entidade deve ter uma e apenas uma chave primária, que pode ser simples (um atributo) ou composta (vários atributos), mas é sempre uma única chave que identifica cada instância de forma unívoca.

**5. Uma entidade fraca pode existir sem a entidade forte associada.**

??? success "Resposta"
    **Falso.** Uma entidade fraca depende da entidade forte para a sua existência e identificação. Se a entidade forte for eliminada, as instâncias da entidade fraca deixam de fazer sentido (por exemplo, uma Parcela sem o Contrato a que pertence).

**6. A chave estrangeira numa tabela referencia a chave primária de outra tabela.**

??? success "Resposta"
    **Verdadeiro.** A chave estrangeira (FK) é um atributo numa tabela que referencia a chave primária (PK) de outra tabela, estabelecendo a ligação entre ambas e garantindo integridade referencial.

**7. Numa relação 1:N com participação obrigatória do lado N, são necessárias 3 tabelas.**

??? success "Resposta"
    **Falso.** Numa relação 1:N, independentemente da participação, são necessárias apenas 2 tabelas (Regra 4). A chave primária do lado 1 é colocada como chave estrangeira na tabela do lado N. Não é necessária tabela intermédia.

**8. Um atributo multivalor pode conter vários valores para o mesmo registo.**

??? success "Resposta"
    **Verdadeiro.** Um atributo multivalor pode ter múltiplos valores para uma mesma instância da entidade. Por exemplo, um cidadão pode ter vários contactos telefónicos. Na passagem ao modelo relacional, o atributo multivalor origina uma tabela separada.

**9. O NIF de um cidadão é um bom exemplo de chave primária composta.**

??? success "Resposta"
    **Falso.** O NIF é uma chave primária **simples** (constituída por um único atributo). Uma chave composta é formada por dois ou mais atributos em conjunto (por exemplo, NumAluno + CodDisciplina na tabela Inscrição).

**10. Uma relação M:N gera sempre uma tabela associativa no modelo relacional.**

??? success "Resposta"
    **Verdadeiro.** Qualquer relação M:N exige a criação de uma tabela associativa que contém as chaves primárias de ambas as entidades como chaves estrangeiras, podendo ainda incluir atributos próprios da relação (por exemplo, data, quantidade ou observações).

---

## Secção 2 — Escolha Múltipla

**1. Numa câmara municipal, cada departamento tem vários funcionários e cada funcionário pertence a um só departamento. Qual a cardinalidade?**

- A) 1:1
- B) 1:N
- C) M:N
- D) N:1

??? success "Resposta"
    **B) 1:N** — Um departamento (lado 1) tem vários funcionários (lado N). Cada funcionário pertence a um único departamento. A FK fica na tabela Funcionário.

**2. Qual dos seguintes é um exemplo de atributo multivalor?**

- A) Nome completo de um cidadão
- B) Data de nascimento
- C) Contactos telefónicos de um cidadão
- D) Número de identificação fiscal

??? success "Resposta"
    **C) Contactos telefónicos de um cidadão** — Um cidadão pode ter vários números de telefone (pessoal, profissional, emergência). Os restantes são atributos simples com um único valor por instância.

**3. Quando se aplica a Regra 6 (tabela associativa obrigatória)?**

- A) Relação 1:1 com participação parcial
- B) Relação M:N (independente da participação)
- C) Relação 1:N com participação obrigatória
- D) Apenas relações com atributos próprios

??? success "Resposta"
    **B) Relação M:N (independente da participação)** — Qualquer relação M:N exige sempre uma tabela associativa, independentemente de a participação ser obrigatória ou parcial. É a única forma de representar correctamente esta cardinalidade no modelo relacional.

**4. O que é uma entidade fraca?**

- A) Entidade que depende de outra para ser identificada
- B) Entidade com poucos atributos
- C) Entidade sem relações
- D) Entidade com chave primária simples

??? success "Resposta"
    **A) Entidade que depende de outra para ser identificada** — Uma entidade fraca não possui atributos suficientes para formar uma chave primária própria. A sua identificação depende da chave primária da entidade forte associada (por exemplo, Parcela depende de Contrato).

**5. Qual é a melhor chave primária para a entidade "Funcionário" numa câmara municipal?**

- A) Nome completo
- B) Data de nascimento
- C) Número de telemóvel
- D) Número mecanográfico

??? success "Resposta"
    **D) Número mecanográfico** — É numérico, único, imutável e específico do contexto. O nome não é único, a data de nascimento não identifica e o telemóvel pode mudar. Uma boa chave primária deve ser única, estável e curta.

**6. Uma relação M:N entre Evento e Artista gera quantas tabelas no modelo relacional?**

- A) 1 tabela
- B) 2 tabelas
- C) 3 tabelas (Evento, Artista, tabela associativa)
- D) 4 tabelas

??? success "Resposta"
    **C) 3 tabelas** — A relação M:N gera sempre uma tabela associativa além das duas tabelas das entidades participantes. A tabela associativa contém as PKs de Evento e Artista como FKs, podendo incluir atributos próprios (por exemplo, cachet ou hora de actuação).

**7. O que é um atributo derivado?**

- A) Atributo que depende de outra entidade
- B) Atributo calculado a partir de outros (ex: idade a partir da data de nascimento)
- C) Atributo que só aceita valores de uma lista
- D) Atributo que pertence a uma entidade fraca

??? success "Resposta"
    **B) Atributo calculado a partir de outros** — Um atributo derivado obtém o seu valor por cálculo. A idade é o exemplo clássico: é calculada a partir da data de nascimento e da data actual, não precisando de ser armazenada.

**8. Onde fica a chave estrangeira numa relação 1:N aplicando a Regra 4?**

- A) Na tabela do lado N
- B) Na tabela do lado 1
- C) Numa tabela intermédia
- D) Em ambas as tabelas

??? success "Resposta"
    **A) Na tabela do lado N** — Na Regra 4 (relação 1:N), a chave primária da entidade do lado 1 é colocada como chave estrangeira na tabela do lado N. Isto garante que cada registo do lado N aponta para exactamente um registo do lado 1.

---

## Secção 3 — Identificação de Erros

**Erro 1 — Modelo da Biblioteca**

O estagiário modelou a biblioteca assim:

- Livro(**ISBN**, titulo, autor, anoPublicacao, moradaLeitor)
- Empréstimo(**codEmprestimo**, ISBN, nomeLeitor, data)

Identifique os erros neste modelo.

??? success "Erros identificados"
    1. **"autor" como atributo de Livro** — se um livro pode ter vários autores, deve ser entidade separada com relação M:N
    2. **"moradaLeitor" na tabela Livro** — a morada é do Leitor, não do Livro. Mistura de entidades numa só tabela
    3. **"nomeLeitor" no Empréstimo** — deveria ser uma FK (codLeitor) referenciando a entidade Leitor
    4. **Falta a entidade Leitor** — os dados do leitor estão dispersos pelas outras tabelas sem entidade própria

**Erro 2 — Modelo de Gestão de Eventos**

O estagiário modelou os eventos municipais assim:

- Evento(**codEvento**, nome, data, local, patrocinador1, nifPatrocinador1, patrocinador2, nifPatrocinador2)
- Funcionário(**numFunc**, nome, evento_atribuido)

Identifique os erros neste modelo.

??? success "Erros identificados"
    1. **Patrocinadores como atributos repetidos** — patrocinador1 e patrocinador2 indicam uma relação M:N tratada como 1:N. Deve existir a entidade Patrocinador e uma tabela associativa Patrocínio
    2. **Limite artificial de 2 patrocinadores** — e se houver 3 ou mais? Atributos numerados são sempre sinal de erro
    3. **"evento_atribuido" como atributo de Funcionário** — se um funcionário pode trabalhar em vários eventos, esta relação M:N exige tabela associativa
    4. **Falta a entidade Patrocinador** — NIF e nome do patrocinador devem estar numa entidade própria

**Erro 3 — Modelo com Atributos Calculados Armazenados**

O estagiário modelou o registo de funcionários assim:

- Funcionário(**numMec**, nome, dataNascimento, idade, dataAdmissao, anosServico, salarioBase, salarioAnual)
- Projecto(**codProj**, nome, dataInicio, dataFim, duracaoMeses, totalHoras)

Identifique os erros neste modelo.

??? success "Erros identificados"
    1. **"idade" armazenada** — é um atributo derivado de dataNascimento, não deve ser armazenado (fica desactualizado)
    2. **"anosServico" armazenado** — é derivado de dataAdmissao, mesmo problema
    3. **"salarioAnual" armazenado** — se é salarioBase × 14 (ou outra fórmula), é derivado e não deve ser armazenado
    4. **"duracaoMeses" armazenado** — é derivado de dataInicio e dataFim
    5. **"totalHoras" sem origem clara** — se é soma das horas dos funcionários no projecto, deveria vir de uma relação, não ser atributo do Projecto

**Erro 4 — Modelo sem Tabela de Relação**

O estagiário modelou as inscrições em disciplinas assim:

- Aluno(**numAluno**, nome, curso)
- Disciplina(**codDisc**, nome, docente, semestre)

"Os alunos inscrevem-se em disciplinas e recebem uma nota final."

Identifique os erros neste modelo.

??? success "Erros identificados"
    1. **Falta a entidade/tabela Inscrição** — a relação Aluno–Disciplina é M:N e exige tabela associativa com, no mínimo, numAluno (FK), codDisc (FK) e nota
    2. **"curso" como atributo de Aluno** — se existem vários cursos, Curso deveria ser entidade própria com relação 1:N para Aluno
    3. **"docente" como atributo de Disciplina** — se um docente lecciona várias disciplinas, Docente deveria ser entidade com relação 1:N (ou M:N se houver co-docência)
    4. **Sem forma de registar a nota** — não existe local para guardar a nota, que é atributo da relação (Inscrição), não do Aluno nem da Disciplina

---

## Secção 4 — Correspondência

### Exercício de correspondência 1

Associe cada conceito à definição correcta.

| Conceito | | Definição |
|----------|-|-----------|
| 1. Entidade fraca | | A. Calculado a partir de outros atributos |
| 2. Atributo derivado | | B. Pode conter vários valores para a mesma instância |
| 3. Atributo multivalor | | C. Depende de outra entidade para existir e ser identificada |
| 4. Cardinalidade M:N | | D. Requer tabela associativa no modelo relacional |
| 5. Chave estrangeira | | E. Referencia a PK de outra tabela |

??? success "Correspondência correcta"
    1 → C | 2 → A | 3 → B | 4 → D | 5 → E

### Exercício de correspondência 2

Associe cada regra de conversão ao cenário onde se aplica.

| Regra | | Cenário |
|-------|-|---------|
| 1. Regra 1 (entidade com atributos simples) | | A. Funcionário pertence a um Departamento (1:N obrigatório) |
| 2. Regra 2 (atributo multivalor) | | B. Projecto e Funcionário com horas de trabalho (M:N) |
| 3. Regra 3 (relação 1:1) | | C. Cidadão com vários contactos telefónicos |
| 4. Regra 4 (relação 1:N) | | D. Município com código, nome e distrito |
| 5. Regra 5 (entidade fraca) | | E. Parcela de terreno que depende do Contrato |
| 6. Regra 6 (relação M:N) | | F. Funcionário tem exactamente um Gabinete e vice-versa |

??? success "Correspondência correcta"
    1 → D | 2 → C | 3 → F | 4 → A | 5 → E | 6 → B

---

## Secção 5 — Mini-casos Práticos

### Caso A — Arquivo Municipal

O arquivo municipal de Vila Feliz digitaliza documentos históricos. Cada documento pertence a um fundo documental. Os técnicos de arquivo registam a digitalização. Um documento pode conter referências a pessoas, locais e datas históricas.

**Tarefa:** Identificar entidades, definir relações com cardinalidades e justificar as escolhas.

??? success "Resolução proposta"
    **Entidades identificadas:**

    - **Documento** (codDocumento, titulo, dataOriginal, tipoDocumento, estadoConservacao)
    - **FundoDocumental** (codFundo, nome, descricao, periodo)
    - **Tecnico** (numFuncionario, nome, especialidade)
    - **Digitalizacao** (codDigitalizacao, data, resolucao, formato, observacoes)
    - **ReferenciaHistorica** (codReferencia, tipo [pessoa/local/data], descricao)

    **Relações:**

    - Documento **pertence a** FundoDocumental → 1:N (um fundo tem vários documentos; cada documento pertence a um fundo)
    - Tecnico **realiza** Digitalizacao → 1:N (um técnico faz várias digitalizações; cada digitalização é feita por um técnico)
    - Documento **tem** Digitalizacao → 1:1 (cada documento tem uma digitalização)
    - Documento **contém** ReferenciaHistorica → M:N (um documento pode referenciar várias pessoas/locais e uma pessoa/local pode aparecer em vários documentos)

    **Justificação:** A Digitalização é entidade separada (e não atributo) porque tem atributos próprios relevantes (data, resolução, formato). A ReferenciaHistorica é entidade porque o mesmo local ou pessoa pode ser referenciado em múltiplos documentos — evita-se redundância.

### Caso B — Piscina Municipal

A piscina municipal de Vila Feliz gere inscrições nas aulas de natação. Existem aulas em vários horários, cada uma com um professor. Os utentes inscrevem-se por trimestre. Cada utente tem um atestado médico com validade.

**Tarefa:** Identificar entidades, definir relações com cardinalidades e justificar as escolhas.

??? success "Resolução proposta"
    **Entidades identificadas:**

    - **Utente** (codUtente, nome, dataNascimento, contacto)
    - **Aula** (codAula, modalidade, diaSemana, hora, nivelDificuldade)
    - **Professor** (codProfessor, nome, certificacoes)
    - **Inscricao** (codInscricao, trimestre, dataInscricao, estado, valorPago)
    - **AtestadoMedico** (codAtestado, dataEmissao, dataValidade, medico, apto)

    **Relações:**

    - Professor **lecciona** Aula → 1:N (um professor dá várias aulas; cada aula tem um professor)
    - Utente **tem** Inscricao → 1:N (um utente pode ter várias inscrições ao longo dos trimestres)
    - Inscricao **refere-se a** Aula → M:N (uma inscrição pode incluir várias aulas e uma aula tem vários inscritos) — ou simplificado como N:1 se cada inscrição é para uma única aula
    - Utente **possui** AtestadoMedico → 1:N (um utente pode ter vários atestados ao longo do tempo; cada atestado pertence a um utente)

    **Justificação:** A Inscrição é entidade (não apenas relação) porque tem atributos próprios: trimestre, data, estado e valor. O AtestadoMedico é entidade separada do Utente porque tem validade — é necessário manter histórico para verificar se o atestado está válido no momento da inscrição.
