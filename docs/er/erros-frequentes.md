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

### B1. Esquecer que N:M precisa **sempre** de tabela da relação (Regra 6)

!!! danger "Errado"
    *"Um Aluno inscreve-se em várias UCs, uma UC tem vários alunos. Meto `codUC` na tabela Aluno e está resolvido."*

**Problema**: se João se inscreve em 5 UCs, a tabela Aluno teria 5 linhas para ele — os dados pessoais ficariam repetidos e a chave primária seria ambígua. A Regra 6 existe precisamente para evitar isso.

!!! success "Correcto — aplicar Regra 6"
    N:M → **3 tabelas**. Além de **ALUNO** e **UC**, criar tabela da relação **INSCRICAO** (<u>numAluno</u>, <u>codUC</u>, dataInscricao, nota) — PK composta; ambos FKs.

**Como evitar**: quando identificar cardinalidade **N:M**, a regra é sempre a 6. Não há excepção.

---

### B2. Criar tabela da relação onde não é preciso (confundir Regra 4 com Regra 6)

!!! danger "Errado"
    *"Para a relação Requerente → Processo (1:N obrigatória), crio uma tabela **SUBMISSAO** (<u>codRequerente</u>, <u>numProcesso</u>)."*

**Problema**: desnecessário. Na Regra 4 (1:N com obrigatoriedade no lado N), a FK entra directamente na tabela do lado N. Criar uma tabela da relação adiciona complexidade sem benefício.

!!! success "Correcto — aplicar Regra 4"
    1:N obrigatória no N → **2 tabelas**. **PROCESSO** (<u>numProcesso</u>, ..., codRequerente) — `codRequerente` é FK.

**Como evitar**: sempre que for **1:N** com obrigatoriedade no lado N, aplica-se a Regra 4 (2 tabelas), nunca a Regra 6.

---

### B3. Confundir Regra 4 com Regra 5 (ignorar participação)

!!! danger "Errado"
    *"Relação Cidadão → Advogado, 1:N, aplica-se a Regra 4: FK `cedulaAdvogado` na tabela Cidadao."*

**Problema**: se nem todo cidadão tem advogado, a Regra 4 não se aplica — porque exige **participação obrigatória** do lado N. Usar a Regra 4 neste caso geraria muitas células vazias (NULLs) na coluna `cedulaAdvogado`.

!!! success "Correcto — aplicar Regra 5"
    1:N **sem** obrigatoriedade no lado N → **3 tabelas**. Tabela da relação **REPRESENTACAO** (<u>NIF</u>, <u>cedulaAdvogado</u>, dataInicio) só com os cidadãos que *têm* advogado — PK composta; ambos FKs.

**Como evitar**: antes de escolher entre Regra 4 e Regra 5, confirmar **sempre** se a participação do lado N é obrigatória ou não.

---

### B4. Identificar cardinalidade errada (1:N onde é N:M, ou vice-versa)

!!! danger "Errado"
    *"Cada Aluno tem uma UC; cada UC tem vários alunos → 1:N."*

**Problema**: a pergunta está incompleta. Tem de se confirmar os **dois lados**:

- "Um aluno tem **apenas uma** UC? Ou várias?"
- "Uma UC tem vários alunos? Ou só um?"

Se cada aluno tem várias UCs E cada UC tem vários alunos → **N:M**, não 1:N.

!!! success "Correcto"
    Sempre verificar os dois sentidos da relação antes de decidir a cardinalidade. Só assim se escolhe a regra correcta.

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
    **REQUISICAO** (<u>codRequisicao</u>, matricula, codMotorista, dataInicio, dataFim, destino, km) — criar um código interno simples; `matricula` e `codMotorista` são FKs. O trio `(matricula, codMotorista, dataInicio)` mantém-se como **candidata** (UNIQUE) mas a PK é simples.

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

### D1. Não sublinhar a chave primária (PK)

!!! danger "Errado"
    `LIVRO (cota, ISBN, título, ano)` — PK identificada apenas pela posição (primeira coluna).

**Problema**: sem marca visual, um leitor apressado não sabe qual é a chave primária. A convenção académica exige sublinhado.

!!! success "Correcto"
    **LIVRO** (<u>cota</u>, ISBN, título, ano) — a PK fica **sublinhada**.

**Regra**: a notação padrão usa apenas **sublinhado para PK**. As FKs são identificadas pelo texto descritivo que acompanha a tabela (ex.: *"onde `cota` é FK para LIVRO"*) ou pelas setas do diagrama E-R original.

---

### D2. Não identificar as FKs no texto

!!! danger "Errado"
    **PROCESSO** (<u>numProcesso</u>, tipoObra, descricao, codRequerente) — e ponto final.

**Problema**: quem lê não sabe se `codRequerente` é apenas um atributo comum ou se referencia a PK de outra tabela.

!!! success "Correcto"
    **PROCESSO** (<u>numProcesso</u>, tipoObra, descricao, codRequerente) — onde `codRequerente` é **FK** para REQUERENTE.

**Dica**: identifica todas as FKs por baixo do esquema, como notas, ou integra-as na descrição natural do modelo.

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
    Nome só em **LEITOR** (<u>codLeitor</u>, nome, ...). Na tabela **EMPRESTIMO**, apenas o atributo `codLeitor` como FK — o nome é obtido por JOIN quando necessário.

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
    Está a praticar a Fase 5 e ainda sente dúvidas? Use o [**worksheet de treino com 10 cenários**](worksheets/worksheet-fase5-treino.docx) para consolidar a **identificação da regra correcta** (1 a 6).
