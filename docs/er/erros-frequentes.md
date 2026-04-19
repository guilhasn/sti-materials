# Erros Frequentes — Anti-padrões de Modelação E-R

Catálogo dos **erros mais comuns** cometidos na modelação Entidade-Relacionamento. Para cada erro, mostra-se um exemplo concreto, explica-se porque é problemático e indica-se como corrigir.

!!! tip "Porquê estudar erros?"
    Estudos de pedagogia mostram que os alunos **aprendem mais a partir de exemplos errados explicados** do que apenas de soluções perfeitas. O cérebro codifica melhor quando contrasta o certo com o errado. Use esta página como **consulta rápida** quando estiver a modelar e sentir que algo não está bem.

---

## A. Erros de identificação de entidades

### A1. Confundir atributo com entidade

!!! danger "Errado"
    *"As minhas entidades são: Leitor, Nome, Morada, Livro, Título."*

**Problema**: `Nome`, `Morada` e `Título` não têm identidade própria — são **propriedades** de outras coisas. Uma "morada" não existe por si só no mundo real; uma morada é *de alguém*.

!!! success "Correcto"
    Entidades: **Leitor**, **Livro**. Atributos do Leitor: nome, morada, BI. Atributos do Livro: título, ISBN, ano.

**Como detectar**: pergunte *"isto tem atributos próprios ou é só uma propriedade de outra coisa?"*. Se a resposta é "é só uma propriedade", é **atributo**, não entidade.

---

### A2. Criar entidade para cada coluna do Excel (sobre-engenharia)

!!! danger "Errado"
    Excel original com colunas `Nome, BI, Morada, Telefone, Email, Livro, Autor`.
    
    Modelo: 7 entidades — `Nome`, `BI`, `Morada`, `Telefone`, `Email`, `Livro`, `Autor`.

**Problema**: o aluno trata cada coluna como entidade independente. Isto gera um modelo **fragmentado** e inútil — não há nada a ligar as colunas. Além disso, atributos como `nome` ou `telefone` só ganham sentido associados a alguém.

!!! success "Correcto"
    2 entidades: **Leitor** (nome, BI, morada, telefone, email) e **Livro** (título, ISBN, ano). As colunas que "andam juntas" (nome + BI + morada + telefone + email — todas se referem à mesma pessoa) pertencem a uma única entidade.

**Como detectar**: observe **grupos de colunas** que variam em conjunto. Se `nome` e `BI` e `morada` são sempre da mesma pessoa, pertencem à mesma entidade.

---

### A3. Esquecer uma entidade importante

!!! danger "Errado"
    Num sistema de requisições de viaturas, modelar apenas `Viatura` e `Motorista`. **Esquecer** o `Departamento` que faz a requisição.

**Problema**: uma entidade do negócio fica invisível — impossível responder a perguntas como *"que departamentos usam mais viaturas?"*.

!!! success "Correcto"
    Percorra o enunciado **palavra a palavra**. Cada substantivo relevante (pessoa, objecto, evento, local) é candidato a entidade.

**Como detectar**: faça uma lista de *todos* os substantivos no enunciado. Elimine os que são atributos. O que sobra são candidatos a entidade.

---

## B. Erros na Fase 5 — os mais críticos

### B1. Esquecer que M:N precisa **sempre** de tabela associativa

!!! danger "Errado"
    *"Um Aluno inscreve-se em várias UCs, uma UC tem vários alunos. Meto `codUC` na tabela Aluno e está resolvido."*

**Problema**: se João se inscreve em 5 UCs, a tabela Aluno teria 5 linhas para ele — **repetição massiva** dos dados pessoais. E a chave primária seria ambígua.

| numAluno | nome | codUC |
|---|---|---|
| 2100123 | João Silva | UC01 |
| 2100123 | João Silva | UC02 | ← repetido
| 2100123 | João Silva | UC03 | ← repetido
| 2100123 | João Silva | UC04 | ← repetido

!!! success "Correcto"
    Criar **tabela associativa** `Inscricao(numAluno, codUC, dataInscricao, nota)`. Agora cada inscrição é uma linha separada, sem repetir os dados pessoais.

**Regra**: `M:N` → **Regra 6** → **sempre** tabela associativa. Não há excepção.

---

### B2. Criar tabela associativa onde não é preciso

!!! danger "Errado"
    *"Para a relação Requerente → Processo (1:N), crio uma tabela `Submissao(codRequerente, numProcesso)`."*

**Problema**: desnecessário. Cada processo tem **exactamente um** requerente — a FK `codRequerente` cabe directamente dentro de `Processo` sem NULLs nem repetições.

!!! success "Correcto"
    `Processo(numProcesso, ..., #codRequerente)`. Apenas **2 tabelas**, FK no lado N.

**Regra**: aplicar o método dos 4 passos. Se não aparecem NULLs nem repetições → **Regra 4**, fica com 2 tabelas.

---

### B3. Confundir Regra 5 (NULLs) com Regra 6 (repetições)

!!! danger "Errado"
    Detecta que algo está mal mas aplica a regra errada.

**Problema**: são os dois sintomas de "problema na FK", mas com causas diferentes e soluções iguais (ambos precisam de 3ª tabela). Ainda assim, o **raciocínio** tem de ser claro.

!!! success "Correcto — distinção precisa"
    - **NULLs** = células vazias (algo **opcional** que não existe) → **Regra 5**
    - **Repetições** = linhas iguais ou quase iguais (muitos-para-muitos) → **Regra 6**

---

### B4. Ignorar a participação obrigatória / opcional

!!! danger "Errado"
    *"Cada Cidadão tem um Advogado. Regra 4, 2 tabelas, resolvido."*

**Problema**: nem todo cidadão tem advogado. Se colocar `cedulaAdvogado` na tabela `Cidadao`, vai ter muitas células vazias (NULLs) — porque a maioria dos cidadãos **não tem** advogado atribuído.

| NIF | nome | cedulaAdv |
|---|---|---|
| 100111 | João Silva | A-234 |
| 200222 | Maria Costa | *(vazio)* |
| 300333 | Pedro Lima | *(vazio)* |

!!! success "Correcto"
    1:N com participação **opcional** (não obrigatória) no lado N → **Regra 5** → tabela `Representacao(NIF, cedulaAdvogado)` só com os que *têm* advogado.

---

## C. Erros na escolha de chaves

### C1. Escolher email ou nome como PK

!!! danger "Errado"
    `Aluno(email, nome, curso)` — usar `email` como chave primária.

**Problema**: o email **pode mudar** (muitas vezes muda no fim do curso). Quando muda, toda a base de dados com FKs apontando para aquele email fica quebrada.

!!! success "Correcto"
    `Aluno(numAluno, nome, email, curso)` — usar um **código interno estável**. Emails são óptimas **chaves candidatas** (únicas) mas PKs devem ser imutáveis.

**Princípio**: PK deve ser **estável no tempo**. Se pode mudar (email, telefone, BI renovado, morada), **não serve**.

---

### C2. Escolher chave composta quando existe simples

!!! danger "Errado"
    `Requisicao((matricula, codMotorista, dataInicio), destino, km)` — PK composta de 3 atributos.

**Problema**: chaves compostas longas são **desconfortáveis** — todas as FKs que apontem para esta tabela têm de ser também de 3 campos. Complica o modelo sem necessidade.

!!! success "Correcto"
    `Requisicao(codRequisicao, #matricula, #codMotorista, dataInicio, dataFim, destino, km)` — criar um código interno simples. O trio `(matricula, codMotorista, dataInicio)` mantém-se como **candidata** (UNIQUE) mas a PK é simples.

**Regra prática**: chaves simples > compostas, sempre que possível.

---

### C3. Usar BI / CC como PK em vez de código interno

!!! danger "Errado"
    `Funcionario(BI, nome, cargo)` — PK é o BI (número do cartão de cidadão).

**Problema**: o BI **expira e renova-se** com novo número. Quando alguém renova o cartão, a PK teria de mudar, e todas as referências (FKs) teriam de mudar também.

!!! success "Correcto"
    `Funcionario(codFuncionario, nome, BI, cargo)` — BI é **candidata** (UNIQUE) mas PK é um código interno estável.

---

## D. Erros de notação

### D1. Esquecer o `#` antes das FKs

!!! danger "Errado"
    `Processo(numProcesso, tipoObra, codRequerente)` — como se distingue a PK da FK?

**Problema**: notação ambígua. Quem lê não sabe o que é `codRequerente` — atributo normal ou FK.

!!! success "Correcto"
    `Processo(numProcesso, tipoObra, #codRequerente)` — o `#` marca claramente que `codRequerente` é uma chave estrangeira que aponta para outra tabela.

---

### D2. Não sublinhar a PK

!!! danger "Errado"
    `Livro(ISBN, titulo, ano)` — PK identificada só pela posição.

**Problema**: sem marca visual, um leitor apressado não sabe qual é a chave primária. Convenção perdida.

!!! success "Correcto"
    `Livro(**_ISBN_**, titulo, ano)` — a PK está **sublinhada** (ou marcada com negrito) para destacar.

---

### D3. Usar "tem" para todas as relações

!!! danger "Errado"
    Relações: Leitor **tem** Livro; Autor **tem** Livro; Departamento **tem** Viatura.

**Problema**: "tem" é vago e não descreve a natureza da relação. Dois "tem" diferentes têm semânticas distintas (requisitar, escrever, possuir).

!!! success "Correcto"
    Leitor **requisita** Livro; Autor **escreve** Livro; Departamento **possui** Viatura. Verbos específicos clarificam a semântica.

---

## E. Erros estruturais que custam caro

### E1. Guardar valores não atómicos numa única célula

!!! danger "Errado"
    `Contacto: "João Silva / 918123456"` — nome e telefone na mesma coluna.

**Problema**: impossível pesquisar só por nome ou só por telefone. Impossível validar formatos separadamente. Dado **não atómico** viola a 1ª regra básica de bases de dados.

!!! success "Correcto"
    Colunas separadas: `nome` e `telefone`. Cada célula guarda **um único valor atómico**.

---

### E2. Repetir o mesmo dado em várias tabelas

!!! danger "Errado"
    Ter o nome do leitor guardado tanto na tabela `Leitor` como na tabela `Emprestimo`.

**Problema**: quando o leitor muda de nome (casamento, correcção), é preciso actualizar em **vários sítios**. Se esquecer um, os dados ficam inconsistentes.

!!! success "Correcto"
    Nome só em `Leitor(codLeitor, nome, ...)`. Na tabela `Emprestimo`, apenas a FK `#codLeitor` — o nome é obtido por JOIN quando necessário.

**Princípio**: cada dado deve ser guardado **num único sítio** (single source of truth).

---

### E3. Modelar ternárias quando binárias chegam

!!! danger "Errado"
    Criar uma relação ternária `Compra(Cliente, Produto, Loja)` quando na verdade são duas binárias: `Cliente→Loja` (onde compra) e `Cliente→Produto` (o que compra).

**Problema**: relações ternárias são **difíceis de interpretar** e gerar em SQL. Na maioria dos casos, podem ser decompostas em relações binárias mais simples sem perda de informação.

!!! success "Correcto"
    Apenas modele ternária se for **genuinamente necessária** (ex: estudante-disciplina-professor onde a combinação dos três é relevante).

---

## Checklist antes de entregar

Antes de dar o modelo por terminado, percorra esta lista:

- [ ] Toda a entidade tem **atributos próprios** (não é apenas um valor que cabe dentro de outra)?
- [ ] Toda a relação M:N tem **tabela associativa**?
- [ ] Toda a PK é **estável no tempo** (não é email, nem BI, nem nome)?
- [ ] As **participações** (obrigatória / opcional) estão marcadas no DER?
- [ ] Todas as FKs estão marcadas com `#` e apontam para PKs **existentes**?
- [ ] PKs compostas só existem quando **não há alternativa simples razoável**?
- [ ] Cada dado é guardado **num único sítio** (sem redundância)?
- [ ] Nenhuma célula tem valores não atómicos (`"nome / telefone"`)?

Se respondeu **sim** a tudo — o modelo está robusto.

---

!!! tip "Próximo passo"
    Está a praticar a Fase 5 e ainda sente dúvidas? Use o [**worksheet de treino com 10 cenários**](worksheets/worksheet-fase5-treino.docx) para consolidar o método.
