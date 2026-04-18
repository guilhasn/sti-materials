# Exercícios Guiados — Modelo E-R na Administração Pública

Quatro exercícios guiados passo-a-passo para construir diagramas Entidade-Relacionamento no [ERDPlus](https://erdplus.com), seguindo as **9 fases de criação de uma base de dados**. Cada exercício reaproveita entidades, atributos e relações reais de cenários da administração pública, organizando o raciocínio pela mesma sequência metodológica.

!!! info "Como usar estes exercícios"
    1. Abrir o [ERDPlus](https://erdplus.com) → criar novo diagrama E-R
    2. Seguir as 9 fases pela ordem indicada
    3. Consultar a [Visão Geral E-R](index.md) sempre que surgir dúvida sobre um conceito

!!! info "Estrutura de cada exercício (9 fases)"
    1. **Fase 1** — Determinar entidades
    2. **Fase 2** — Desenhar DER simplificado (sem atributos)
    3. **Fase 3** — Definir pressupostos de negócio
    4. **Fase 4** — Desenhar DER completo (com atributos e cardinalidades)
    5. **Fase 5** — Determinar tabelas (abordagem intuitiva, regras só no fim)
    6. **Fase 6** — Determinar chaves candidatas
    7. **Fase 7** — Determinar chaves primárias
    8. **Fase 8** — Definir tabelas finais (esquema relacional)
    9. **Fase 9** — Definir domínio dos atributos (entidade principal)

!!! tip "Worksheets Word para preencher"
    Cada caso tem um **worksheet em Word** com as 9 fases em branco — para preencher enquanto acompanha a resolução. Descarregar:

    - [Caso 1 — Biblioteca Municipal](worksheets/worksheet-guiado-1-biblioteca.docx)
    - [Caso 2 — Licenciamento de Obras](worksheets/worksheet-guiado-2-licenciamento.docx)
    - [Caso 3 — Refeições Sociais IPSS](worksheets/worksheet-guiado-3-refeicoes.docx)
    - [Caso 4 — Viaturas e Motoristas](worksheets/worksheet-guiado-4-viaturas.docx)

    Existe ainda um [**template genérico**](worksheets/template-er.docx) para aplicar a qualquer cenário.

!!! abstract "Treino específico da Fase 5"
    A Fase 5 (determinar tabelas) é a mais difícil de interiorizar. Disponível um [**worksheet de treino com 10 cenários curtos**](worksheets/worksheet-fase5-treino.docx) que isola apenas esta fase — perfeito para ganhar automatismo no método dos 4 passos (tentativa → observação → decisão → regra).

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

### Fase 1 — Determinar entidades

Lendo o cenário, identificam-se três entidades principais:

- **Leitor** — pessoa registada na biblioteca
- **Livro** — obra do acervo
- **Autor** — quem escreveu o livro

!!! tip "Porquê separar Autor?"
    Um autor pode ter vários livros e um livro pode ter vários autores. Se guardarmos o autor como atributo do livro, quando o mesmo autor escreve 10 livros, os seus dados repetem-se 10 vezes.

### Fase 2 — Desenhar DER simplificado

Sem atributos, apenas entidades ligadas pelas relações:

```
Leitor ─── requisita ─── Livro ─── escreve ─── Autor
```

| Relação | Entidade A | Entidade B |
|---------|-----------|-----------|
| requisita | Leitor | Livro |
| escreve | Autor | Livro |

### Fase 3 — Definir pressupostos

- Cada leitor tem um código único e pode requisitar vários livros ao longo do tempo.
- Um livro pode ser requisitado por vários leitores (em datas diferentes).
- Um livro tem pelo menos um autor; pode ter vários co-autores.
- Um autor pode escrever vários livros.
- Nem todo leitor tem empréstimo activo; nem todo livro está emprestado.
- O mesmo leitor pode requisitar o mesmo livro em datas diferentes.

### Fase 4 — Desenhar DER completo

| Entidade | Atributos | PK candidata | Cardinalidades |
|----------|-----------|-------------|---------------|
| **Leitor** | codLeitor, nome, BI, morada, telefone, email | codLeitor | requisita Livro (M:N) |
| **Livro** | ISBN, titulo, anoPublicacao, editora, numExemplares | ISBN | requisitado por Leitor (M:N); escrito por Autor (M:N) |
| **Autor** | codAutor, nome, nacionalidade | codAutor | escreve Livro (M:N) |

Participações:

- **requisita** (Leitor ↔ Livro): não obrigatória em ambos os lados
- **escreve** (Autor ↔ Livro): obrigatória no Livro (todo livro tem autor); não obrigatória no Autor

### Fase 5 — Determinar tabelas (abordagem intuitiva)

Para cada relação, aplicamos o método em 4 passos: (A) tentativa com 3 linhas de dados; (B) observação; (C) decisão; (D) nome da regra.

#### Relação Leitor ↔ Livro (M:N)

**Passo A — Tentativa 1**: colocar `ISBN` dentro de `LEITOR`

| codLeitor | nome | BI | ISBN |
|---|---|---|---|
| 1 | Ana Costa | 12345678 | 978-85-01-1 |
| **1** | **Ana Costa** | **12345678** | 978-972-1 |
| 2 | João Silva | 87654321 | 978-85-01-1 |

**Passo B**: Ana Costa aparece 2 vezes (porque requisitou 2 livros) → ❌ **repetição dos dados pessoais**.

**Tentativa 2**: colocar `codLeitor` dentro de `LIVRO`

| ISBN | titulo | autor | codLeitor |
|---|---|---|---|
| 978-85-01-1 | Dom Casmurro | Machado | 1 |
| **978-85-01-1** | **Dom Casmurro** | **Machado** | 2 |
| 978-972-1 | Os Maias | Eça | 1 |

Dom Casmurro aparece 2 vezes (foi requisitado por 2 leitores) → ❌ **repetição dos dados do livro**.

**Passo C — Decisão**: criar tabela associativa `EMPRÉSTIMO`(codLeitor, ISBN, dataEmprestimo, dataDevolucao).

**Passo D — Regra aplicada**: **Regra 6** — M:N exige sempre tabela associativa, não há alternativa.

#### Relação Autor ↔ Livro (M:N)

Mesma análise: se colocar `codAutor` no `LIVRO`, um livro com 2 autores aparece em 2 linhas — repetição. **Decisão**: criar `AUTORIA`(codAutor, ISBN). **Regra 6**.

### Fase 6 — Determinar chaves candidatas

| Tabela | Chaves candidatas |
|--------|-------------------|
| Leitor | codLeitor; BI |
| Livro | ISBN |
| Autor | codAutor |
| Empréstimo | (codLeitor, ISBN, dataEmprestimo) |
| Autoria | (codAutor, ISBN) |

### Fase 7 — Determinar chaves primárias

| Tabela | PK escolhida | Justificação |
|--------|-------------|-------------|
| Leitor | codLeitor | Código interno estável; o BI pode mudar (novo CC) |
| Livro | ISBN | Identificador internacional único |
| Autor | codAutor | Código interno; nomes podem repetir-se |
| Empréstimo | (codLeitor, ISBN, dataEmprestimo) | O mesmo leitor pode requisitar o mesmo livro em datas distintas |
| Autoria | (codAutor, ISBN) | Um autor só co-assina uma vez o mesmo livro |

### Fase 8 — Definir tabelas finais

```
Leitor(codLeitor, nome, BI, morada, telefone, email)
Livro(ISBN, titulo, anoPublicacao, editora, numExemplares)
Autor(codAutor, nome, nacionalidade)
Emprestimo(#codLeitor, #ISBN, dataEmprestimo, dataDevolucao, devolvido)
Autoria(#codAutor, #ISBN)
```

!!! info "Chave composta no Empréstimo"
    A chave do Empréstimo é composta por codLeitor + ISBN + dataEmprestimo — porque o mesmo leitor pode requisitar o mesmo livro em datas diferentes.

### Fase 9 — Definir domínio dos atributos (entidade Leitor)

| Atributo | Tipo | Obrigatório | Restrição |
|----------|------|-------------|-----------|
| codLeitor | INTEGER | Sim | PK, auto-incremento |
| nome | VARCHAR(100) | Sim | — |
| BI | VARCHAR(15) | Sim | Único |
| morada | VARCHAR(200) | Sim | — |
| telefone | VARCHAR(15) | Não | Formato nacional |
| email | VARCHAR(100) | Não | Formato email válido |

---

## Caso 2 — Licenciamento de Obras Particulares na Câmara

### Contexto

!!! abstract "Cenário"
    O **Gabinete de Urbanismo** da Câmara Municipal de Vila Feliz recebe pedidos de licenciamento de obras particulares (construção, ampliação, demolição). Cada pedido é analisado por técnicos que emitem pareceres. Actualmente, o registo é feito em processos físicos (pastas) e numa folha Excel com dados do requerente, obra e pareceres todos juntos.

### Dados actuais (Excel com problemas)

| Requerente | NIF | Morada | NumProcesso | TipoObra | Localização | Técnico | Especialidade | Parecer | DataParecer |
|------------|-----|--------|-------------|----------|-------------|---------|---------------|---------|-------------|
| Manuel Ferreira | 123456789 | R. Nova, 3, Vila Feliz | P-2025/001 | Construção | Lote 15, Zona Industrial | Carlos Mendes | Arquitectura | Favorável | 2025-03-10 |
| Manuel Ferreira | 123456789 | R. Nova, 3, Vila Feliz | P-2025/001 | Construção | Lote 15, Zona Industrial | Rita Sousa | Engenharia Civil | Favorável com condições | 2025-03-12 |
| Sofia Lopes | 987654321 | Av. Mar, 8, Vila Feliz | P-2025/002 | Ampliação | R. Oliveira, 22, Vila Feliz | Carlos Mendes | Arquitectura | Desfavorável | 2025-03-15 |

### Fase 1 — Determinar entidades

- **Requerente** — pessoa/entidade que pede o licenciamento
- **Processo** — o pedido de licenciamento em si
- **Técnico** — funcionário que analisa
- **Parecer** — resultado da análise de um técnico sobre um processo (emerge como tabela associativa)

### Fase 2 — Desenhar DER simplificado

```
Requerente ── submete ── Processo ── analisa ── Técnico
```

| Relação | Entidade A | Entidade B |
|---------|-----------|-----------|
| submete | Requerente | Processo |
| analisa | Técnico | Processo |

### Fase 3 — Definir pressupostos

- Cada processo pertence a exactamente um requerente.
- Um requerente pode ter vários processos ao longo do tempo.
- Um processo é analisado por vários técnicos de especialidades distintas.
- Um técnico analisa vários processos.
- Cada parecer resulta da combinação (técnico, processo) e tem data, resultado e observações.
- Todo processo tem um requerente; nem todo requerente tem processo activo.

### Fase 4 — Desenhar DER completo

| Entidade | Atributos | PK candidata | Cardinalidades |
|----------|-----------|-------------|---------------|
| **Requerente** | codRequerente, nome, NIF, morada, telefone | codRequerente | submete Processo (1:N) |
| **Processo** | numProcesso, tipoObra, descricao, localizacao, dataEntrada, estado | numProcesso | submetido por Requerente (N:1); analisado por Técnico (M:N) |
| **Técnico** | codTecnico, nome, especialidade, email | codTecnico | analisa Processo (M:N) |

Participações:

- **submete**: obrigatória no lado N (todo processo tem requerente)
- **analisa**: não obrigatória em ambos

### Fase 5 — Determinar tabelas (abordagem intuitiva)

#### Relação Requerente → Processo (1:N, obrigatória lado N)

**Passo A — Tentativa**: colocar `codRequerente` dentro de `PROCESSO`

| numProcesso | tipoObra | localizacao | codRequerente |
|---|---|---|---|
| P-2025/001 | Construção | Zona Industrial | 101 |
| P-2025/002 | Ampliação | Av. Central | 102 |
| P-2025/003 | Demolição | R. Nova | 101 |

**Passo B**: cada processo tem exactamente um requerente (sem vazios); cada linha é um processo diferente (sem repetições) → ✅ **tabela limpa**.

**Passo C — Decisão**: fica como está, 2 tabelas (Requerente + Processo com FK).

**Passo D — Regra aplicada**: **Regra 4**.

#### Relação Técnico ↔ Processo (M:N)

**Passo A — Tentativa**: colocar `codTecnico` dentro de `PROCESSO`

| numProcesso | tipoObra | codTecnico |
|---|---|---|
| **P-2025/001** | **Construção** | 10 |
| **P-2025/001** | **Construção** | 11 |
| P-2025/002 | Ampliação | 10 |

**Passo B**: P-2025/001 aparece 2 vezes (é analisado por 2 técnicos) → ❌ **repetição**.

**Passo C — Decisão**: criar `PARECER`(numProcesso, codTecnico, dataParecer, resultado, observações).

**Passo D — Regra aplicada**: **Regra 6**.

!!! note "Parecer como tabela associativa com atributos próprios"
    Muitas relações M:N transportam informação adicional. Aqui, a tabela Parecer não é artificial — é uma entidade natural do negócio (data, resultado e observações *são* atributos do parecer, não do processo nem do técnico).

### Fase 6 — Determinar chaves candidatas

| Tabela | Chaves candidatas |
|--------|-------------------|
| Requerente | codRequerente; NIF |
| Processo | numProcesso |
| Técnico | codTecnico; email |
| Parecer | (numProcesso, codTecnico) |

### Fase 7 — Determinar chaves primárias

| Tabela | PK escolhida | Justificação |
|--------|-------------|-------------|
| Requerente | codRequerente | Código interno estável |
| Processo | numProcesso | Identificador oficial já usado na Câmara |
| Técnico | codTecnico | Código interno; email pode mudar |
| Parecer | (numProcesso, codTecnico) | Um técnico dá um parecer a um processo |

### Fase 8 — Definir tabelas finais

```
Requerente(codRequerente, nome, NIF, morada, telefone)
Processo(numProcesso, tipoObra, descricao, localizacao, dataEntrada, estado, #codRequerente)
Tecnico(codTecnico, nome, especialidade, email)
Parecer(#numProcesso, #codTecnico, dataParecer, resultado, observacoes)
```

!!! warning "Parecer tem chave composta"
    Se o mesmo técnico pudesse dar vários pareceres ao mesmo processo, precisaríamos de acrescentar dataParecer à chave.

### Fase 9 — Definir domínio dos atributos (entidade Processo)

| Atributo | Tipo | Obrigatório | Restrição |
|----------|------|-------------|-----------|
| numProcesso | VARCHAR(15) | Sim | PK, formato P-AAAA/NNN |
| tipoObra | VARCHAR(30) | Sim | {Construção, Ampliação, Demolição, Alteração} |
| descricao | TEXT | Sim | — |
| localizacao | VARCHAR(200) | Sim | — |
| dataEntrada | DATE | Sim | ≤ data actual |
| estado | VARCHAR(20) | Sim | {Pendente, Em análise, Aprovado, Rejeitado} |
| codRequerente | INTEGER | Sim | FK → Requerente |

---

## Caso 3 — Gestão de Refeições Sociais na IPSS

### Contexto

!!! abstract "Cenário"
    Uma **IPSS (Instituição Particular de Solidariedade Social)** de Vila Feliz distribui refeições ao domicílio a idosos e pessoas com mobilidade reduzida. Os voluntários entregam as refeições seguindo rotas pré-definidas. Cada utente pode ter restrições alimentares. O registo actual é feito em papel e num quadro na cozinha.

### Fase 1 — Determinar entidades

- **Utente** — pessoa que recebe as refeições
- **Refeição** — almoço ou jantar de um dado dia (ementa)
- **Voluntário** — quem entrega
- **Rota** — percurso de distribuição numa zona

### Fase 2 — Desenhar DER simplificado

```
Utente ── recebe ── Refeição
Voluntário ── percorre ── Rota
```

| Relação | Entidade A | Entidade B |
|---------|-----------|-----------|
| recebe | Utente | Refeição |
| percorre | Voluntário | Rota |

### Fase 3 — Definir pressupostos

- Cada utente pode receber várias refeições (uma ou duas por dia).
- A mesma refeição (ementa do dia) é entregue a vários utentes.
- Cada rota é percorrida por um voluntário por turno.
- O mesmo voluntário pode percorrer várias rotas ao longo do tempo.
- Todo utente registado recebe refeições.
- Cada utente pode ter restrições alimentares próprias.

### Fase 4 — Desenhar DER completo

| Entidade | Atributos | PK candidata | Cardinalidades |
|----------|-----------|-------------|---------------|
| **Utente** | codUtente, nome, morada, telefone, contactoEmergencia, restricoes | codUtente | recebe Refeição (M:N) |
| **Refeição** | codRefeicao, data, tipo (almoço/jantar), ementa, calorias | codRefeicao | recebida por Utente (M:N) |
| **Voluntário** | codVoluntario, nome, telefone, cartaConducao, disponibilidade | codVoluntario | percorre Rota (1:N) |
| **Rota** | codRota, nome, zona, distanciaKm | codRota | percorrida por Voluntário (N:1) |

Participações:

- **recebe**: obrigatória no Utente
- **percorre**: não obrigatória em ambos

### Fase 5 — Determinar tabelas (abordagem intuitiva)

#### Relação Utente ↔ Refeição (M:N)

**Passo A — Tentativa**: colocar `codUtente` dentro de `REFEIÇÃO`

| codRefeicao | data | tipo | codUtente |
|---|---|---|---|
| **R-001** | **2025-04-15** | **Almoço** | 50 |
| **R-001** | **2025-04-15** | **Almoço** | 51 |
| **R-001** | **2025-04-15** | **Almoço** | 52 |

**Passo B**: a mesma refeição (R-001) aparece 3 vezes porque é entregue a 3 utentes → ❌ **repetição massiva**.

**Passo C — Decisão**: criar `ENTREGA`(codUtente, codRefeicao, horaEntrega, observações).

**Passo D — Regra aplicada**: **Regra 6**.

#### Relação Voluntário → Rota (1:N)

**Passo A — Tentativa**: colocar `codVoluntario` dentro de `ROTA`

| codRota | nome | zona | codVoluntario |
|---|---|---|---|
| R01 | Centro | Centro da vila | 7 |
| R02 | Norte | Zona norte | 7 |
| R03 | Sul | Zona sul | 9 |

**Passo B**: cada rota tem 1 voluntário (sem vazios); cada linha é uma rota única (sem repetições) → ✅ **tabela limpa**.

**Passo C — Decisão**: fica como está, 2 tabelas (Voluntário + Rota com FK).

**Passo D — Regra aplicada**: **Regra 4**.

### Fase 6 — Determinar chaves candidatas

| Tabela | Chaves candidatas |
|--------|-------------------|
| Utente | codUtente |
| Refeição | codRefeicao; (data, tipo) |
| Voluntário | codVoluntario |
| Rota | codRota |
| Entrega | (codUtente, codRefeicao) |

### Fase 7 — Determinar chaves primárias

| Tabela | PK escolhida | Justificação |
|--------|-------------|-------------|
| Utente | codUtente | Código interno estável |
| Refeição | codRefeicao | Simpler que chave composta (data, tipo) |
| Voluntário | codVoluntario | Código interno |
| Rota | codRota | Código interno |
| Entrega | (codUtente, codRefeicao) | Uma entrega por utente/refeição |

### Fase 8 — Definir tabelas finais

```
Utente(codUtente, nome, morada, telefone, contactoEmergencia, restricoes)
Refeicao(codRefeicao, data, tipo, ementa, calorias)
Voluntario(codVoluntario, nome, telefone, cartaConducao, disponibilidade)
Rota(codRota, nome, zona, distanciaKm, #codVoluntario)
Entrega(#codUtente, #codRefeicao, horaEntrega, observacoes)
```

!!! tip "Tabela Entrega como ponto central"
    Responde à pergunta: "Que refeição foi entregue a que utente e a que hora?"

### Fase 9 — Definir domínio dos atributos (entidade Utente)

| Atributo | Tipo | Obrigatório | Restrição |
|----------|------|-------------|-----------|
| codUtente | INTEGER | Sim | PK, auto-incremento |
| nome | VARCHAR(100) | Sim | — |
| morada | VARCHAR(200) | Sim | Zona de cobertura da IPSS |
| telefone | VARCHAR(15) | Não | — |
| contactoEmergencia | VARCHAR(100) | Sim | Nome + telefone |
| restricoes | TEXT | Não | Ex.: diabético, sem glúten |

---

## Caso 4 — Gestão de Viaturas e Motoristas da Câmara

### Contexto

!!! abstract "Cenário"
    A Câmara Municipal de Vila Feliz gere um **pool de viaturas** partilhadas entre serviços. Os motoristas são funcionários que podem conduzir diferentes viaturas. Cada viatura tem manutenções periódicas registadas. As requisições são feitas por departamentos para datas específicas. Actualmente, o controlo é feito em folhas Excel separadas — uma para viaturas, outra para motoristas, outra para requisições — sem ligação entre elas.

### Fase 1 — Determinar entidades

- **Viatura** — veículo do pool
- **Motorista** — funcionário habilitado
- **Departamento** — serviço municipal
- **Manutenção** — intervenção técnica sobre uma viatura

### Fase 2 — Desenhar DER simplificado

```
Departamento ── tem ── Viatura ── requisita ── Motorista
Departamento ── tem ── Motorista
Viatura ── tem_manutencao ── Manutenção
```

| Relação | Entidade A | Entidade B |
|---------|-----------|-----------|
| pertence_dept_v | Viatura | Departamento |
| pertence_dept_m | Motorista | Departamento |
| requisita | Viatura | Motorista |
| tem_manutencao | Viatura | Manutenção |

### Fase 3 — Definir pressupostos

- Cada viatura está atribuída a um departamento.
- Cada motorista pertence a um departamento.
- Um motorista pode conduzir várias viaturas (em momentos diferentes).
- Uma viatura pode ser conduzida por vários motoristas ao longo do tempo.
- Cada manutenção refere-se a uma única viatura.
- Uma viatura pode ter várias manutenções ao longo da sua vida útil.

### Fase 4 — Desenhar DER completo

| Entidade | Atributos | PK candidata | Cardinalidades |
|----------|-----------|-------------|---------------|
| **Viatura** | matricula, marca, modelo, ano, combustivel, quilometragem, estado | matricula | pertence a Departamento (N:1); requisitada por Motorista (M:N); tem Manutenção (1:N) |
| **Motorista** | codMotorista, nome, numCartaConducao, categorias, telefone | codMotorista | pertence a Departamento (N:1); requisita Viatura (M:N) |
| **Departamento** | codDepartamento, nome, responsavel | codDepartamento | tem Viaturas e Motoristas (1:N) |
| **Manutenção** | codManutencao, matricula, data, tipo, descricao, custo, oficina | codManutencao | refere-se a Viatura (N:1) |

### Fase 5 — Determinar tabelas (abordagem intuitiva)

#### Relação Viatura → Departamento (N:1, obrigatória)

**Passo A — Tentativa**: colocar `codDepartamento` dentro de `VIATURA`

| matricula | marca | modelo | codDepartamento |
|---|---|---|---|
| 12-AB-34 | Renault | Clio | 3 |
| 34-CD-56 | Ford | Transit | 3 |
| 56-EF-78 | Peugeot | 3008 | 5 |

Cada viatura tem 1 departamento → sem vazios, sem repetições → ✅ **tabela limpa**. **Decisão**: fica como está. **Regra 4**.

#### Relação Motorista → Departamento (N:1, obrigatória)

Mesma análise: `codDepartamento` no `MOTORISTA` → sem problemas. **Regra 4**.

#### Relação Viatura ↔ Motorista (M:N)

**Passo A — Tentativa**: colocar `codMotorista` dentro de `VIATURA`

| matricula | marca | codMotorista |
|---|---|---|
| **12-AB-34** | **Renault Clio** | 21 |
| **12-AB-34** | **Renault Clio** | 22 |
| 34-CD-56 | Ford Transit | 21 |

**Passo B**: a viatura 12-AB-34 aparece 2 vezes (foi conduzida por 2 motoristas em momentos diferentes) → ❌ **repetição**.

**Passo C — Decisão**: criar `REQUISIÇÃO`(codRequisicao, matricula, codMotorista, dataInicio, dataFim, destino, kmInicio, kmFim, estado).

**Passo D — Regra aplicada**: **Regra 6**. Os atributos próprios (datas, destino, km) justificam uma PK simples (`codRequisicao`) em vez de uma chave composta longa.

#### Relação Viatura → Manutenção (1:N, obrigatória lado N)

`matricula` como FK na `MANUTENÇÃO` — cada manutenção pertence a uma viatura, sem repetição. **Regra 4**.

### Fase 6 — Determinar chaves candidatas

| Tabela | Chaves candidatas |
|--------|-------------------|
| Viatura | matricula |
| Motorista | codMotorista; numCartaConducao |
| Departamento | codDepartamento; nome |
| Manutenção | codManutencao |
| Requisição | codRequisicao; (matricula, codMotorista, dataInicio) |

### Fase 7 — Determinar chaves primárias

| Tabela | PK escolhida | Justificação |
|--------|-------------|-------------|
| Viatura | matricula | Identificador oficial único |
| Motorista | codMotorista | Código interno estável |
| Departamento | codDepartamento | Código interno |
| Manutenção | codManutencao | Código interno sequencial |
| Requisição | codRequisicao | Chave simples evita composta longa |

### Fase 8 — Definir tabelas finais

```
Viatura(matricula, marca, modelo, ano, combustivel, quilometragem, estado, #codDepartamento)
Motorista(codMotorista, nome, numCartaConducao, categorias, telefone, #codDepartamento)
Departamento(codDepartamento, nome, responsavel)
Requisicao(codRequisicao, #matricula, #codMotorista, dataInicio, dataFim, destino, kmInicio, kmFim, estado)
Manutencao(codManutencao, #matricula, data, tipo, descricao, custo, oficina)
```

!!! tip "Requisição como tabela central"
    Responde à pergunta: "Que viatura foi usada, por que motorista, em que datas e para que destino?"

### Fase 9 — Definir domínio dos atributos (entidade Viatura)

| Atributo | Tipo | Obrigatório | Restrição |
|----------|------|-------------|-----------|
| matricula | VARCHAR(10) | Sim | PK, formato NN-NN-NN |
| marca | VARCHAR(30) | Sim | — |
| modelo | VARCHAR(30) | Sim | — |
| ano | INTEGER | Sim | 1980 ≤ ano ≤ ano actual |
| combustivel | VARCHAR(15) | Sim | {Gasolina, Gasóleo, Eléctrico, Híbrido} |
| quilometragem | INTEGER | Sim | ≥ 0 |
| estado | VARCHAR(20) | Sim | {Disponível, Requisitada, Manutenção, Abatida} |
| codDepartamento | INTEGER | Sim | FK → Departamento |

---

!!! tip "Próximo passo"
    Depois de completar estes exercícios guiados, avançar para os [Exercícios](exercicios.md) — cenários onde o diagrama é construído de forma autónoma, sem orientação passo-a-passo.
