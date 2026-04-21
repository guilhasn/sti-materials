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
    5. **Fase 5** — Determinar tabelas (aplicar as **6 regras de construção**)
    6. **Fase 6** — Determinar chaves candidatas
    7. **Fase 7** — Determinar chaves primárias
    8. **Fase 8** — Definir tabelas finais (esquema relacional)
    9. **Fase 9** — Definir domínio dos atributos (entidade principal)

!!! tip "Worksheets Word para preencher — três versões por caso"
    Cada caso tem **três versões** em Word. Escolha consoante o seu nível de confiança:

    | Caso | :material-file-document-outline: Em branco | :material-file-document-edit-outline: Com apoio | :material-file-document-check-outline: Com solução |
    |------|:---:|:---:|:---:|
    | 1 — Biblioteca Municipal | [descarregar](worksheets/worksheet-guiado-1-biblioteca.docx) | [descarregar](worksheets/worksheet-guiado-1-biblioteca-scaffold.docx) | [descarregar](worksheets/worksheet-guiado-1-biblioteca-solucao.docx) |
    | 2 — Licenciamento de Obras | [descarregar](worksheets/worksheet-guiado-2-licenciamento.docx) | [descarregar](worksheets/worksheet-guiado-2-licenciamento-scaffold.docx) | [descarregar](worksheets/worksheet-guiado-2-licenciamento-solucao.docx) |
    | 3 — Refeições Sociais IPSS | [descarregar](worksheets/worksheet-guiado-3-refeicoes.docx) | [descarregar](worksheets/worksheet-guiado-3-refeicoes-scaffold.docx) | [descarregar](worksheets/worksheet-guiado-3-refeicoes-solucao.docx) |
    | 4 — Viaturas e Motoristas | [descarregar](worksheets/worksheet-guiado-4-viaturas.docx) | [descarregar](worksheets/worksheet-guiado-4-viaturas-scaffold.docx) | [descarregar](worksheets/worksheet-guiado-4-viaturas-solucao.docx) |

    - **:material-file-document-outline: Em branco**: tudo por preencher. Maximiza a aprendizagem. **Recomendada**.
    - **:material-file-document-edit-outline: Com apoio**: nomes de entidades e tabelas já listados entre fases. O raciocínio (cardinalidades, Fase 5, chaves primárias, justificações) continua em branco.
    - **:material-file-document-check-outline: Com solução**: todos os campos pré-preenchidos. Para **conferência** após resolver, ou quando bloquear. Para maximizar aprendizagem, tente primeiro a versão em branco.

    Existe ainda um [**template genérico**](worksheets/template-er.docx) para aplicar a qualquer cenário.

!!! abstract "Treino específico da Fase 5"
    A Fase 5 (determinar tabelas) é a mais difícil de interiorizar. Disponível um [**worksheet de treino com 10 cenários curtos**](worksheets/worksheet-fase5-treino.docx) que isola apenas esta fase — perfeito para ganhar automatismo na **identificação da regra correcta** a partir da cardinalidade e da participação.

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
- **Livro** — exemplar físico da obra (identificado pela cota única na estante)
- **Autor** — quem escreveu a obra

!!! tip "Porquê separar Autor?"
    Um autor pode escrever vários livros e um livro pode ter vários co-autores. Se guardarmos o autor como atributo do livro, quando o mesmo autor escreve 10 livros, os seus dados repetem-se 10 vezes.

### Fase 2 — Desenhar DER simplificado

Sem atributos, apenas entidades ligadas pelas relações:

```
Leitor ─── requisita ─── Livro ─── escrito_por ─── Autor
```

| Relação | Entidade A | Entidade B |
|---------|-----------|-----------|
| requisita | Leitor | Livro |
| escrito_por | Livro | Autor |

### Fase 3 — Definir pressupostos

- Cada leitor tem um código único e pode requisitar vários livros ao longo do tempo.
- Um livro, **enquanto está emprestado, só pode ser requisitado por um único leitor** (não pode ser emprestado a dois leitores em simultâneo).
- Nem todo livro tem empréstimo activo; nem todo leitor tem livro requisitado.
- Um livro tem pelo menos um autor; pode ter vários co-autores.
- Um autor pode escrever vários livros.

### Fase 4 — Desenhar DER completo

| Entidade | Atributos | PK candidata | Cardinalidades |
|----------|-----------|-------------|---------------|
| **Leitor** | Num_Leitor, NIF, CC, nome, morada, email, contacto, observações | Num_Leitor | requisita Livro (1:N) |
| **Livro** | cota, ISBN, título, data, edição, editora | cota | requisitado por Leitor (1:N); escrito por Autor (N:M) |
| **Autor** | Id_autor, nome, nacionalidade, dataNascimento | Id_autor | escreve Livro (N:M) |

Participações:

- **requisita** (Leitor ↔ Livro): **não obrigatória** em ambos os lados (nem todo leitor está a requisitar; nem todo livro está emprestado).
- **escreve** (Autor ↔ Livro): obrigatória no Livro (todo livro tem autor); não obrigatória no Autor.

### Fase 5 — Determinar tabelas (aplicar regras de construção)

Para cada relação, identificamos **cardinalidade + participação** e aplicamos a **regra correspondente**.

#### Relação Leitor ↔ Livro (1:N, sem participação obrigatória)

**Cardinalidade**: 1:N (um leitor pode requisitar vários livros; um livro só é requisitado por **um leitor de cada vez**).
**Participação**: não obrigatória em ambos os lados.
**Regra aplicável**: **Regra 5** (1:N, não obrigatória do lado N → 3 tabelas).

**Aplicação**:

- Duas tabelas para as entidades: **LEITOR** e **LIVRO**.
- Uma tabela da relação **REQUISITAR** contendo as PKs das duas entidades.

#### Relação Autor ↔ Livro (N:M)

**Cardinalidade**: N:M (um autor escreve vários livros; um livro pode ter vários co-autores).
**Participação**: obrigatória no Livro (todo livro tem pelo menos um autor); não obrigatória no Autor.
**Regra aplicável**: **Regra 6** (N:M → 3 tabelas).

**Aplicação**:

- Duas tabelas para as entidades: **AUTOR** e **LIVRO**.
- Uma tabela da relação **ESCREVER**.

### Fase 6 — Determinar chaves candidatas

| Tabela | Chaves candidatas |
|--------|-------------------|
| LEITOR | Num_Leitor; NIF; CC |
| LIVRO | cota; ISBN |
| AUTOR | Id_autor |
| REQUISITAR | (Num_Leitor, cota) |
| ESCREVER | (cota, Id_autor) |

### Fase 7 — Determinar chaves primárias

| Tabela | PK escolhida | Justificação |
|--------|-------------|-------------|
| LEITOR | Num_Leitor | Código interno estável; NIF e CC podem mudar |
| LIVRO | cota | Identificador interno único do exemplar físico; ISBN é comum a várias cópias |
| AUTOR | Id_autor | Código interno; nomes podem repetir-se |
| REQUISITAR | (Num_Leitor, cota) | PK composta — uma requisição activa é única por par leitor-livro |
| ESCREVER | (cota, Id_autor) | PK composta — um autor só co-assina uma vez o mesmo livro |

### Fase 8 — Definir tabelas finais

> **LEITOR** (<u>Num_Leitor</u>, NIF, CC, nome, morada, email, contacto, observações)
>
> **LIVRO** (<u>cota</u>, ISBN, título, data, edição, editora)
>
> **AUTOR** (<u>Id_autor</u>, nome, nacionalidade, dataNascimento)
>
> **REQUISITAR** (<u>Num_Leitor</u>, <u>cota</u>) — PK composta; ambos os atributos são também FKs (para LEITOR e LIVRO)
>
> **ESCREVER** (<u>cota</u>, <u>Id_autor</u>) — PK composta; ambos os atributos são também FKs

!!! info "Porquê a cota como PK do LIVRO?"
    Cada exemplar físico na estante tem uma **cota única** (identificador interno da biblioteca). Várias cópias do mesmo título partilham o mesmo **ISBN**. Como a base de dados gere exemplares físicos individuais (que podem ser emprestados um de cada vez), a cota é o identificador natural.

### Fase 9 — Definir domínio dos atributos (entidade Leitor)

| Atributo | Tipo | Obrigatório | Restrição |
|----------|------|-------------|-----------|
| Num_Leitor | INTEGER | Sim | PK, auto-incremento |
| NIF | VARCHAR(9) | Sim | Único; 9 dígitos |
| CC | VARCHAR(12) | Sim | Único; número do Cartão de Cidadão |
| nome | VARCHAR(100) | Sim | — |
| morada | VARCHAR(200) | Sim | — |
| email | VARCHAR(100) | Não | Formato email válido |
| contacto | VARCHAR(15) | Não | Telefone nacional |
| observações | TEXT | Não | Notas livres (preferências, restrições) |

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

### Fase 5 — Determinar tabelas (aplicar regras de construção)

#### Relação Requerente → Processo (1:N, obrigatória lado N)

**Cardinalidade**: 1:N (cada processo tem um requerente; um requerente pode ter vários processos).
**Participação**: obrigatória no lado N (Processo) — todo processo tem um requerente.
**Regra aplicável**: **Regra 4** (1:N obrigatória no N → 2 tabelas).

**Aplicação**:

- Duas tabelas: `Requerente` e `Processo`.
- A PK `codRequerente` entra como FK na tabela **PROCESSO**: **PROCESSO** (<u>numProcesso</u>, ..., codRequerente).

#### Relação Técnico ↔ Processo (N:M)

**Cardinalidade**: N:M (um técnico analisa vários processos; um processo é analisado por vários técnicos).
**Participação**: indiferente.
**Regra aplicável**: **Regra 6** (N:M → 3 tabelas).

**Aplicação**:

- Três tabelas: `Técnico`, `Processo` e uma tabela da relação `Parecer`.
- A tabela **PARECER** contém as duas PKs e os atributos próprios (data, resultado, observações): **PARECER** (<u>numProcesso</u>, <u>codTecnico</u>, dataParecer, resultado, observacoes) — PK composta; ambos os atributos são FKs.

!!! note "Parecer — tabela da relação com atributos próprios"
    Muitas relações N:M transportam informação adicional. Aqui, a tabela Parecer não é artificial — é uma entidade natural do negócio (data, resultado e observações *são* atributos do parecer, não do processo nem do técnico).

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

> **REQUERENTE** (<u>codRequerente</u>, nome, NIF, morada, telefone)
>
> **PROCESSO** (<u>numProcesso</u>, tipoObra, descricao, localizacao, dataEntrada, estado, codRequerente) — `codRequerente` é FK
>
> **TECNICO** (<u>codTecnico</u>, nome, especialidade, email)
>
> **PARECER** (<u>numProcesso</u>, <u>codTecnico</u>, dataParecer, resultado, observacoes) — PK composta; ambos FKs

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

### Fase 5 — Determinar tabelas (aplicar regras de construção)

#### Relação Utente ↔ Refeição (N:M)

**Cardinalidade**: N:M (um utente recebe várias refeições; a mesma refeição é entregue a vários utentes).
**Participação**: obrigatória no Utente (todo utente registado recebe refeições); indiferente.
**Regra aplicável**: **Regra 6** (N:M → 3 tabelas).

**Aplicação**:

- Três tabelas: `Utente`, `Refeição` e tabela da relação `Entrega`.
- **ENTREGA** (<u>codUtente</u>, <u>codRefeicao</u>, horaEntrega, observacoes) — PK composta; ambos FKs.

#### Relação Voluntário → Rota (1:N)

**Cardinalidade**: 1:N (um voluntário percorre várias rotas; cada rota é percorrida por um voluntário de cada vez).
**Participação**: obrigatória do lado N (toda rota tem um voluntário responsável atribuído); não obrigatória no Voluntário (pode haver voluntários sem rota activa).
**Regra aplicável**: **Regra 4** (1:N obrigatória no N → 2 tabelas).

**Aplicação**:

- Duas tabelas: `Voluntário` e `Rota`.
- A PK `codVoluntario` entra como FK na tabela **ROTA**: **ROTA** (<u>codRota</u>, ..., codVoluntario).

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

> **UTENTE** (<u>codUtente</u>, nome, morada, telefone, contactoEmergencia, restricoes)
>
> **REFEICAO** (<u>codRefeicao</u>, data, tipo, ementa, calorias)
>
> **VOLUNTARIO** (<u>codVoluntario</u>, nome, telefone, cartaConducao, disponibilidade)
>
> **ROTA** (<u>codRota</u>, nome, zona, distanciaKm, codVoluntario) — `codVoluntario` é FK
>
> **ENTREGA** (<u>codUtente</u>, <u>codRefeicao</u>, horaEntrega, observacoes) — PK composta; ambos FKs

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

### Fase 5 — Determinar tabelas (aplicar regras de construção)

#### Relação Viatura → Departamento (N:1, obrigatória)

**Cardinalidade**: 1:N (um departamento tem várias viaturas; cada viatura pertence a um departamento).
**Participação**: obrigatória no lado N (Viatura) — toda viatura pertence a um departamento.
**Regra aplicável**: **Regra 4** (1:N obrigatória no N → 2 tabelas).

**Aplicação**: FK `codDepartamento` na tabela `Viatura`.

#### Relação Motorista → Departamento (N:1, obrigatória)

**Análise simétrica** à anterior: 1:N com obrigatoriedade no lado N.
**Regra aplicável**: **Regra 4**.

**Aplicação**: FK `codDepartamento` na tabela `Motorista`.

#### Relação Viatura ↔ Motorista (N:M)

**Cardinalidade**: N:M (um motorista conduz várias viaturas ao longo do tempo; uma viatura é conduzida por vários motoristas).
**Participação**: indiferente (nem toda viatura está requisitada; nem todo motorista tem requisição activa).
**Regra aplicável**: **Regra 6** (N:M → 3 tabelas).

**Aplicação**:

- Três tabelas: `Viatura`, `Motorista` e tabela da relação `Requisição`.
- A tabela **REQUISICAO** contém as PKs de Viatura e Motorista como FKs + atributos próprios: **REQUISICAO** (<u>codRequisicao</u>, matricula, codMotorista, dataInicio, dataFim, destino, kmInicio, kmFim, estado) — `matricula` e `codMotorista` são FKs.
- Nota: usou-se `codRequisicao` como PK simples em vez da chave composta `(matricula, codMotorista, dataInicio)` para evitar FKs longas noutras tabelas que referenciem a requisição.

#### Relação Viatura → Manutenção (1:N, obrigatória lado N)

**Cardinalidade**: 1:N (uma viatura tem várias manutenções; cada manutenção refere-se a uma viatura).
**Participação**: obrigatória no lado N (Manutenção).
**Regra aplicável**: **Regra 4** (1:N obrigatória no N → 2 tabelas).

**Aplicação**: FK `matricula` na tabela `Manutenção`.

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

> **VIATURA** (<u>matricula</u>, marca, modelo, ano, combustivel, quilometragem, estado, codDepartamento) — `codDepartamento` é FK
>
> **MOTORISTA** (<u>codMotorista</u>, nome, numCartaConducao, categorias, telefone, codDepartamento) — `codDepartamento` é FK
>
> **DEPARTAMENTO** (<u>codDepartamento</u>, nome, responsavel)
>
> **REQUISICAO** (<u>codRequisicao</u>, matricula, codMotorista, dataInicio, dataFim, destino, kmInicio, kmFim, estado) — `matricula` e `codMotorista` são FKs
>
> **MANUTENCAO** (<u>codManutencao</u>, matricula, data, tipo, descricao, custo, oficina) — `matricula` é FK

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
