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

- Leitor ↔ Livro (M:N) → **Regra 6** → 3 tabelas: Leitor, Livro, **Empréstimo**(codLeitor, ISBN, dataEmprestimo, dataDevolucao, devolvido)
- Autor ↔ Livro (M:N) → **Regra 6** → tabela associativa **Autoria**(codAutor, ISBN)

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

- Requerente → Processo: 1:N, obrigatória lado N → **Regra 4** → 2 tabelas, FK codRequerente no Processo
- Técnico ↔ Processo: M:N → **Regra 6** → tabela Parecer com ambas PKs + atributos próprios

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
    Uma **IPSS (Instituição Particular de Solidariedade Social)** de Leiria distribui refeições ao domicílio a idosos e pessoas com mobilidade reduzida. Os voluntários entregam as refeições seguindo rotas pré-definidas. Cada utente pode ter restrições alimentares. O registo actual é feito em papel e num quadro na cozinha.

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
| entrega | Voluntário | M:N | Refeição | Não obrigatória em ambas |
| percorre | Voluntário | M:N | Rota | Não obrigatória em ambas |
| pertence_a | Utente | M:N | Rota | Obrigatória no Utente |

!!! info "Relação ternária simplificada"
    A entrega de uma refeição envolve três entidades: quem entrega (voluntário), o quê (refeição) e a quem (utente). Podemos modelar isto com uma tabela Entrega que referencia as três entidades — evitando a complexidade de uma relação ternária no diagrama E-R.

### Tarefa 3 — Converter em tabelas

Aplicar regras:

- Utente ↔ Refeição (M:N) → **Regra 6** → incorporada na tabela Entrega
- Voluntário ↔ Refeição (M:N) → **Regra 6** → incorporada na tabela Entrega
- Voluntário ↔ Rota (M:N) → **Regra 6** → não necessária separadamente (Entrega já inclui codRota)
- Utente ↔ Rota (M:N) → **Regra 6** → tabela associativa UtenteRota

```
Utente(codUtente, nome, morada, telefone, contactoEmergencia, restricoes)
Refeicao(codRefeicao, data, tipo, ementa, calorias)
Voluntario(codVoluntario, nome, telefone, cartaConducao, disponibilidade)
Rota(codRota, nome, zona, distanciaKm)
Entrega(codVoluntario, codRefeicao, codUtente, codRota, horaEntrega, observacoes)
UtenteRota(codUtente, codRota, ordemEntrega)
```

!!! tip "Tabela Entrega como ponto central"
    A tabela Entrega referencia três entidades (Voluntário, Refeição, Utente) e ainda a Rota. É a tabela que responde à pergunta: "Quem entregou o quê, a quem, por que rota e a que hora?"

### Tarefa 4 — Detectar redundâncias

Comparar registo em papel vs modelo E-R:

| Redundância no papel/quadro | Correcção no E-R |
|----------------------------|-----------------|
| Nome e morada do utente reescritos todos os dias no quadro | Entidade Utente separada — dados escritos uma vez |
| Ementa copiada para cada utente na folha de entrega | Entidade Refeição separada — ementa definida uma vez por dia/tipo |
| Dados do voluntário repetidos em cada folha de rota | Entidade Voluntário separada — dados pessoais escritos uma vez |
| Sequência de entrega reescrita manualmente todos os dias | Tabela UtenteRota com ordem de entrega fixa por rota |

---

## Caso 4 — Gestão de Viaturas e Motoristas da Câmara

### Contexto

!!! abstract "Cenário"
    A Câmara Municipal gere um **pool de viaturas** partilhadas entre serviços. Os motoristas são funcionários que podem conduzir diferentes viaturas. Cada viatura tem manutenções periódicas registadas. As requisições são feitas por departamentos para datas específicas. Actualmente, o controlo é feito em folhas Excel separadas — uma para viaturas, outra para motoristas, outra para requisições — sem ligação entre elas.

### Tarefa 1 — Entidades e atributos

| Entidade | Atributos | PK |
|----------|-----------|---|
| **Viatura** | matricula, marca, modelo, ano, combustivel, quilometragem, estado | matricula |
| **Motorista** | codMotorista, nome, numCartaConducao, categorias, telefone | codMotorista |
| **Departamento** | codDepartamento, nome, responsavel | codDepartamento |
| **Requisição** | codRequisicao, matricula, codMotorista, codDepartamento, dataInicio, dataFim, destino, kmInicio, kmFim, estado | codRequisicao |
| **Manutenção** | codManutencao, matricula, data, tipo, descricao, custo, oficina | codManutencao |

### Tarefa 2 — Relações

| Relação | Ent. A | Card. | Ent. B | Participação |
|---------|--------|-------|--------|-------------|
| tem_manutencao | Viatura | 1:N | Manutenção | Obrigatória lado N (toda manutenção refere-se a uma viatura) |
| solicita | Departamento | 1:N | Requisição | Obrigatória lado N (toda requisição é feita por um departamento) |
| utiliza | Viatura | 1:N | Requisição | Obrigatória lado N (toda requisição envolve uma viatura) |
| conduz | Motorista | 1:N | Requisição | Obrigatória lado N (toda requisição tem um motorista atribuído) |
| motorista_habitual | Viatura | N:1 | Motorista | Não obrigatória em ambas |

!!! warning "Múltiplas relações"
    Viatura e Motorista estão ligadas através da Requisição. Mas a mesma viatura pode também ter um motorista "habitual" atribuído (relação directa N:1). São duas relações diferentes entre as mesmas entidades — cada uma com o seu significado.

### Tarefa 3 — Converter em tabelas

Aplicar regras:

- Viatura → Manutenção: 1:N, obrigatória lado N → **Regra 4** → FK matricula na Manutenção
- Departamento → Requisição: 1:N, obrigatória lado N → **Regra 4** → FK codDepartamento na Requisição
- Viatura → Requisição: 1:N, obrigatória lado N → **Regra 4** → FK matricula na Requisição
- Motorista → Requisição: 1:N, obrigatória lado N → **Regra 4** → FK codMotorista na Requisição
- Viatura → Motorista (habitual): N:1, não obrigatória → **Regra 4** → FK codMotoristaHabitual na Viatura

```
Viatura(matricula, marca, modelo, ano, combustivel, quilometragem, estado, codMotoristaHabitual)
Motorista(codMotorista, nome, numCartaConducao, categorias, telefone)
Departamento(codDepartamento, nome, responsavel)
Requisicao(codRequisicao, matricula, codMotorista, codDepartamento, dataInicio, dataFim, destino, kmInicio, kmFim, estado)
Manutencao(codManutencao, matricula, data, tipo, descricao, custo, oficina)
```

!!! tip "Requisição como tabela central"
    A tabela Requisição contém três chaves estrangeiras (matricula, codMotorista, codDepartamento) — é o ponto de ligação entre viaturas, motoristas e departamentos. Responde à pergunta: "Que viatura foi usada, por que motorista, para que departamento, em que datas?"

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
