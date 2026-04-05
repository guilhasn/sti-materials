# Exercícios Guiados — Modelo E-R na Administração Pública

Quatro exercícios guiados passo-a-passo para construir diagramas Entidade-Relacionamento no [ERDPlus](https://erdplus.com). Cada exercício indica exactamente que entidades, atributos e relações criar — ideal para consolidar a modelação antes de avançar para os exercícios autónomos.

!!! info "Como usar estes exercícios"
    1. Abrir o [ERDPlus](https://erdplus.com) → criar novo diagrama E-R
    2. Seguir as tarefas pela ordem indicada
    3. Consultar a [Visão Geral E-R](index.md) sempre que surgir dúvida sobre um conceito

!!! info "Estrutura de cada exercício"
    1. **Tarefa 1** — Identificar entidades e atributos
    2. **Tarefa 2** — Definir relações e cardinalidades
    3. **Tarefa 3** — Desenhar no ERDPlus e converter em tabelas
    4. **Tarefa 4** — Detectar e corrigir redundâncias

---

## Caso 1 — Biblioteca Municipal de Vila Feliz

### Contexto

!!! abstract "Cenário"
    A **Biblioteca Municipal de Vila Feliz** gere um acervo de mais de 15.000 volumes e serve centenas de leitores registados. Actualmente, os empréstimos são registados numa folha Excel com todos os dados misturados: nome do leitor, morada, título do livro, autor, data do empréstimo — tudo na mesma linha.

### Dados actuais (Excel com problemas)

| Leitor | BI | Morada | Livro | Autor | ISBN | DataEmprestimo | DataDevolucao |
|--------|----|--------|-------|-------|------|---------------|--------------|
| Ana Costa | 12345678 | R. Principal, 1, Vila Feliz | Dom Casmurro | Machado de Assis | 978-85-01-1 | 2025-01-10 | 2025-01-25 |
| Ana Costa | 12345678 | R. Principal, 1, Vila Feliz | Os Maias | Eça de Queirós | 978-972-1 | 2025-01-15 | 2025-01-30 |
| João Silva | 87654321 | Av. Heróis, 5, Vila Feliz | Dom Casmurro | Machado de Assis | 978-85-01-1 | 2025-02-01 | 2025-02-15 |

### Tarefa 1 — Identificar entidades e atributos

| Entidade | Atributos | Chave primária |
|----------|-----------|---------------|
| **Leitor** | codLeitor, nome, BI, morada, telefone, email | codLeitor |
| **Livro** | ISBN, titulo, anoPublicacao, editora, numExemplares | ISBN |
| **Autor** | codAutor, nome, nacionalidade | codAutor |

!!! tip "Porquê separar Autor?"
    Um autor pode ter vários livros e um livro pode ter vários autores. Se guardarmos o autor como atributo do livro, quando o mesmo autor escreve 10 livros, os seus dados repetem-se 10 vezes.

### Tarefa 2 — Definir relações e cardinalidades

| Relação | Entidade A | Card. | Entidade B | Participação |
|---------|-----------|-------|-----------|-------------|
| requisita | Leitor | M:N | Livro | Não obrigatória em ambas (nem todo leitor tem empréstimo activo; nem todo livro está emprestado) |
| escreve | Autor | M:N | Livro | Obrigatória no Livro (todo livro tem autor); não obrigatória no Autor |

Perguntas-guia:

- "Um leitor pode requisitar vários livros?" → Sim → lado N
- "Um livro pode ser requisitado por vários leitores (ao longo do tempo)?" → Sim → lado M → **M:N**
- "Um autor pode escrever vários livros?" → Sim
- "Um livro pode ter vários autores?" → Sim → **M:N**

### Tarefa 3 — Desenhar e converter em tabelas

Aplicar regras:

- Leitor ↔ Livro (M:N) → **Regra 6** — porque numa relação M:N nenhuma das tabelas pode receber a FK da outra sem repetição; é obrigatório criar uma tabela associativa → 3 tabelas: Leitor, Livro, **Empréstimo**(codLeitor, ISBN, dataEmprestimo, dataDevolucao, devolvido)
- Autor ↔ Livro (M:N) → **Regra 6** — pela mesma razão: vários autores por livro e vários livros por autor exigem tabela associativa → **Autoria**(codAutor, ISBN)

Esquema final:

```
Leitor(codLeitor, nome, BI, morada, telefone, email)
Livro(ISBN, titulo, anoPublicacao, editora, numExemplares)
Autor(codAutor, nome, nacionalidade)
Emprestimo(codLeitor, ISBN, dataEmprestimo, dataDevolucao, devolvido)
Autoria(codAutor, ISBN)
```

!!! info "Chave composta no Empréstimo"
    A chave do Empréstimo é composta por codLeitor + ISBN + dataEmprestimo — porque o mesmo leitor pode requisitar o mesmo livro em datas diferentes.

### Tarefa 4 — Detectar e corrigir redundâncias

Comparar Excel original vs modelo E-R:

| Redundância no Excel | Correcção no E-R |
|---------------------|-----------------|
| Nome "Ana Costa" repetido em cada empréstimo | Entidade Leitor separada — dados do leitor escritos uma vez |
| "Dom Casmurro / Machado de Assis" copiado | Entidade Livro + Entidade Autor separadas |
| Morada do leitor em cada linha | Morada é atributo da entidade Leitor, não do empréstimo |

---

## Caso 2 — Licenciamento de Obras Particulares na Câmara

### Contexto

!!! abstract "Cenário"
    O **Gabinete de Urbanismo** da Câmara Municipal recebe pedidos de licenciamento de obras particulares (construção, ampliação, demolição). Cada pedido é analisado por técnicos que emitem pareceres. Actualmente, o registo é feito em processos físicos (pastas) e numa folha Excel com dados do requerente, obra e pareceres todos juntos.

### Dados actuais (Excel com problemas)

| Requerente | NIF | Morada | NumProcesso | TipoObra | Localização | Técnico | Especialidade | Parecer | DataParecer |
|------------|-----|--------|-------------|----------|-------------|---------|---------------|---------|-------------|
| Manuel Ferreira | 123456789 | R. Nova, 3, Leiria | P-2025/001 | Construção | Lote 15, Zona Industrial | Carlos Mendes | Arquitectura | Favorável | 2025-03-10 |
| Manuel Ferreira | 123456789 | R. Nova, 3, Leiria | P-2025/001 | Construção | Lote 15, Zona Industrial | Rita Sousa | Engenharia Civil | Favorável com condições | 2025-03-12 |
| Sofia Lopes | 987654321 | Av. Mar, 8, Vila Feliz | P-2025/002 | Ampliação | R. Oliveira, 22, Vila Feliz | Carlos Mendes | Arquitectura | Desfavorável | 2025-03-15 |

### Tarefa 1 — Identificar entidades e atributos

| Entidade | Atributos | PK |
|----------|-----------|---|
| **Requerente** | codRequerente, nome, NIF, morada, telefone | codRequerente |
| **Processo** | numProcesso, tipoObra, descricao, localizacao, dataEntrada, estado | numProcesso |
| **Técnico** | codTecnico, nome, especialidade, email | codTecnico |
| **Parecer** | numProcesso, codTecnico, dataParecer, resultado, observacoes | numProcesso + codTecnico |

### Tarefa 2 — Relações e cardinalidades

| Relação | Ent. A | Card. | Ent. B | Participação |
|---------|--------|-------|--------|-------------|
| submete | Requerente | 1:N | Processo | Obrigatória lado N (todo processo tem requerente); não obrigatória no Requerente |
| analisa | Técnico | M:N | Processo | Não obrigatória em ambas |

!!! note "Parecer como tabela associativa"
    A relação M:N entre Técnico e Processo gera a tabela Parecer, que já possui atributos próprios: dataParecer, resultado e observações. Isto é natural — muitas relações M:N transportam informação adicional.

### Tarefa 3 — Converter em tabelas

Aplicar regras:

- Requerente → Processo: 1:N, obrigatória lado N → **Regra 4** — porque cada processo pertence a exactamente um requerente, basta colocar a FK do lado N (no Processo) → 2 tabelas, FK codRequerente no Processo
- Técnico ↔ Processo: M:N → **Regra 6** — porque um técnico analisa vários processos e um processo é analisado por vários técnicos; sem tabela intermédia, não há forma de representar esta multiplicidade → tabela Parecer com ambas PKs + atributos próprios

```
Requerente(codRequerente, nome, NIF, morada, telefone)
Processo(numProcesso, tipoObra, descricao, localizacao, dataEntrada, estado, codRequerente)
Tecnico(codTecnico, nome, especialidade, email)
Parecer(numProcesso, codTecnico, dataParecer, resultado, observacoes)
```

!!! warning "Parecer tem chave composta"
    A chave do Parecer é numProcesso + codTecnico — identifica que técnico emitiu parecer sobre que processo. Se o mesmo técnico pudesse dar vários pareceres ao mesmo processo, precisaríamos de acrescentar dataParecer à chave.

### Tarefa 4 — Detectar redundâncias

Comparar Excel original vs modelo E-R:

| Redundância no Excel | Correcção no E-R |
|---------------------|-----------------|
| Nome e NIF do requerente repetidos em cada processo e parecer | Entidade Requerente separada — dados escritos uma vez |
| Dados do processo (tipo de obra, localização) repetidos por cada parecer | Entidade Processo separada — dados da obra escritos uma vez |
| Nome e especialidade do técnico copiados em cada parecer | Entidade Técnico separada — dados do técnico escritos uma vez |

---

## Caso 3 — Gestão de Refeições Sociais na IPSS

### Contexto

!!! abstract "Cenário"
    Uma **IPSS (Instituição Particular de Solidariedade Social)** de Vila Feliz distribui refeições ao domicílio a idosos e pessoas com mobilidade reduzida. Os voluntários entregam as refeições seguindo rotas pré-definidas. Cada utente pode ter restrições alimentares. O registo actual é feito em papel e num quadro na cozinha.

### Tarefa 1 — Entidades e atributos

| Entidade | Atributos | PK |
|----------|-----------|---|
| **Utente** | codUtente, nome, morada, telefone, contactoEmergencia, restricoes | codUtente |
| **Refeição** | codRefeicao, data, tipo (almoço/jantar), ementa, calorias | codRefeicao |
| **Voluntário** | codVoluntario, nome, telefone, cartaConducao, disponibilidade | codVoluntario |
| **Rota** | codRota, nome, zona, distanciaKm | codRota |

### Tarefa 2 — Relações

| Relação | Ent. A | Card. | Ent. B | Participação |
|---------|--------|-------|--------|-------------|
| recebe | Utente | M:N | Refeição | Obrigatória no Utente (todo utente registado recebe refeições) |
| percorre | Voluntário | 1:N | Rota | Não obrigatória em ambas (cada rota é percorrida por um voluntário de cada vez, mas o mesmo voluntário pode percorrer várias rotas) |

!!! info "Relações binárias simples"
    A entrega de uma refeição a um utente é modelada com uma relação M:N entre Utente e Refeição, gerando a tabela Entrega. O voluntário é associado à rota que percorre (1:N). Desta forma, todas as relações são binárias — mais simples de modelar e de converter em tabelas.

### Tarefa 3 — Converter em tabelas

Aplicar regras:

- Utente ↔ Refeição (M:N) → **Regra 6** — porque um utente recebe várias refeições e a mesma refeição (ementa do dia) é entregue a vários utentes; é obrigatório criar tabela associativa → tabela **Entrega**(codUtente, codRefeicao, horaEntrega, observacoes)
- Voluntário → Rota (1:N) → **Regra 4** — porque cada rota é percorrida por um voluntário; basta colocar a FK codVoluntario na tabela Rota → 2 tabelas, FK codVoluntario na Rota

```
Utente(codUtente, nome, morada, telefone, contactoEmergencia, restricoes)
Refeicao(codRefeicao, data, tipo, ementa, calorias)
Voluntario(codVoluntario, nome, telefone, cartaConducao, disponibilidade)
Rota(codRota, nome, zona, distanciaKm, codVoluntario)
Entrega(codUtente, codRefeicao, horaEntrega, observacoes)
```

!!! tip "Tabela Entrega como ponto central"
    A tabela Entrega liga Utente a Refeição e responde à pergunta: "Que refeição foi entregue a que utente e a que hora?" A rota é gerida separadamente — o voluntário responsável pela rota entrega as refeições aos utentes dessa zona.

### Tarefa 4 — Detectar redundâncias

Comparar registo em papel vs modelo E-R:

| Redundância no papel/quadro | Correcção no E-R |
|----------------------------|-----------------|
| Nome e morada do utente reescritos todos os dias no quadro | Entidade Utente separada — dados escritos uma vez |
| Ementa copiada para cada utente na folha de entrega | Entidade Refeição separada — ementa definida uma vez por dia/tipo |
| Dados do voluntário repetidos em cada folha de rota | Entidade Voluntário separada — dados pessoais escritos uma vez |
| Informação da rota reescrita manualmente todos os dias | Entidade Rota com FK do voluntário — atribuição fixa e reutilizável |

---

## Caso 4 — Gestão de Viaturas e Motoristas da Câmara

### Contexto

!!! abstract "Cenário"
    A Câmara Municipal de Vila Feliz gere um **pool de viaturas** partilhadas entre serviços. Os motoristas são funcionários que podem conduzir diferentes viaturas. Cada viatura tem manutenções periódicas registadas. As requisições são feitas por departamentos para datas específicas. Actualmente, o controlo é feito em folhas Excel separadas — uma para viaturas, outra para motoristas, outra para requisições — sem ligação entre elas.

### Tarefa 1 — Entidades e atributos

| Entidade | Atributos | PK |
|----------|-----------|---|
| **Viatura** | matricula, marca, modelo, ano, combustivel, quilometragem, estado | matricula |
| **Motorista** | codMotorista, nome, numCartaConducao, categorias, telefone | codMotorista |
| **Departamento** | codDepartamento, nome, responsavel | codDepartamento |
| **Manutenção** | codManutencao, matricula, data, tipo, descricao, custo, oficina | codManutencao |

### Tarefa 2 — Relações

| Relação | Ent. A | Card. | Ent. B | Participação |
|---------|--------|-------|--------|-------------|
| pertence_dept_v | Viatura | N:1 | Departamento | Obrigatória na Viatura (toda viatura está atribuída a um departamento) |
| pertence_dept_m | Motorista | N:1 | Departamento | Obrigatória no Motorista (todo motorista pertence a um departamento) |
| requisita | Viatura | M:N | Motorista | Não obrigatória em ambas (nem toda viatura está requisitada; nem todo motorista tem requisição activa) |
| tem_manutencao | Viatura | 1:N | Manutenção | Obrigatória lado N (toda manutenção refere-se a uma viatura) |

!!! note "Requisição como tabela associativa"
    Um motorista pode conduzir várias viaturas (em datas diferentes) e uma viatura pode ser conduzida por vários motoristas. A relação M:N entre Viatura e Motorista gera a tabela Requisição, que contém atributos próprios como datas, destino e quilómetros.

### Tarefa 3 — Converter em tabelas

Aplicar regras:

- Viatura → Departamento (N:1, obrigatória) → **Regra 4** — porque cada viatura pertence a exactamente um departamento; basta colocar a FK codDepartamento na Viatura → FK codDepartamento na Viatura
- Motorista → Departamento (N:1, obrigatória) → **Regra 4** — pela mesma razão: cada motorista pertence a um departamento → FK codDepartamento no Motorista
- Viatura ↔ Motorista (M:N) → **Regra 6** — porque um motorista pode conduzir várias viaturas e uma viatura pode ser conduzida por vários motoristas; sem tabela intermédia não é possível representar esta multiplicidade → tabela Requisição com ambas PKs + atributos
- Viatura → Manutenção (1:N, obrigatória lado N) → **Regra 4** — porque cada manutenção pertence a uma viatura → FK matricula na Manutenção

```
Viatura(matricula, marca, modelo, ano, combustivel, quilometragem, estado, codDepartamento)
Motorista(codMotorista, nome, numCartaConducao, categorias, telefone, codDepartamento)
Departamento(codDepartamento, nome, responsavel)
Requisicao(codRequisicao, matricula, codMotorista, dataInicio, dataFim, destino, kmInicio, kmFim, estado)
Manutencao(codManutencao, matricula, data, tipo, descricao, custo, oficina)
```

!!! tip "Requisição como tabela central"
    A tabela Requisição contém duas chaves estrangeiras (matricula, codMotorista) — é o ponto de ligação entre viaturas e motoristas. O departamento que solicita pode ser inferido a partir da FK codDepartamento na Viatura ou no Motorista. Responde à pergunta: "Que viatura foi usada, por que motorista, em que datas e para que destino?"

### Tarefa 4 — Detectar redundâncias

Comparar folhas Excel separadas vs modelo E-R:

| Redundância nas folhas Excel | Correcção no E-R |
|-----------------------------|-----------------|
| Marca e modelo da viatura copiados em cada requisição | Entidade Viatura separada — dados técnicos escritos uma vez |
| Nome do motorista repetido em cada requisição | Entidade Motorista separada — dados pessoais escritos uma vez |
| Nome do departamento copiado em cada requisição | Entidade Departamento separada — dados escritos uma vez |
| Dados de manutenção misturados com dados de requisição | Entidade Manutenção separada — registo independente das requisições |

---

!!! tip "Próximo passo"
    Depois de completar estes exercícios guiados, avançar para os [Exercícios](exercicios.md) — cenários onde o diagrama é construído de forma autónoma, sem orientação passo-a-passo.
