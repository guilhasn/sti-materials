# Plano — Módulo Base de Dados / Modelo E-R (Aulas 6–8)

## Filosofia pedagógica

Replicar exactamente a estrutura do módulo BPMN:

| BPMN (Aulas 4–5) | Base de Dados (Aulas 6–8) |
|-------------------|---------------------------|
| `bpmn/index.md` — Visão Geral (notação) | `base-dados/index.md` — Visão Geral (modelo E-R, regras) |
| `bpmn/aula-04.md` — Mapeamento AS-IS | `base-dados/aula-06.md` — Entidades, Atributos e Relacionamentos |
| `bpmn/aula-05.md` — Redesenho TO-BE | `base-dados/aula-07.md` — Cardinalidade, Participação e Regras |
| — | `base-dados/aula-08.md` — Caso Integrador (9 passos) |
| `bpmn/casos-guiados.md` — 4 exercícios guiados | `base-dados/exercicios-guiados.md` — 4 exercícios guiados |
| `bpmn/exercicios.md` — 4 exercícios autónomos | `base-dados/exercicios.md` — 4 exercícios autónomos |

**Continuidade narrativa**: O caso-âncora das Aulas 6 e 7 é novamente a **Câmara Municipal de Pombal** — os alunos já conhecem o processo de pedidos de intervenção (Tempestade Kristin) pelo BPMN, e agora vão modelar a base de dados que suportaria esse processo. Isto cria uma ponte natural: "já mapeámos o processo, agora desenhamos os dados que o alimentam".

---

## Ficheiros a criar

```
docs/
  base-dados/
    index.md              ← Visão Geral do módulo (teoria E-R + regras)
    aula-06.md            ← Entidades, Atributos e Relacionamentos
    aula-07.md            ← Cardinalidade, Participação e Regras de Conversão
    aula-08.md            ← Caso Integrador: Da Análise à Base de Dados
    exercicios-guiados.md ← 4 casos guiados passo-a-passo
    exercicios.md         ← 4 exercícios autónomos
```

Actualizar `mkdocs.yml`:
```yaml
- Base de Dados (Aulas 6–8):
    - Visão Geral: base-dados/index.md
    - Entidades e Relacionamentos: base-dados/aula-06.md
    - Cardinalidade e Regras: base-dados/aula-07.md
    - Caso Integrador: base-dados/aula-08.md
    - Exercícios Guiados: base-dados/exercicios-guiados.md
    - Exercícios: base-dados/exercicios.md
```

---

## Conteúdo detalhado de cada ficheiro

### 1. `index.md` — Visão Geral: Modelo Entidade-Relacionamento

Página de referência (equivalente ao `bpmn/index.md`), com toda a teoria necessária:

- **Porquê modelar dados na Administração Pública?** — contextualização (sistemas de gestão de munícipes, licenciamentos, recursos humanos, etc.)
- **Conceito de Base de Dados** — definição, SGBD, problemas de redundância (pp. 2–7 da sebenta)
- **Modelação de dados** — E-R como ferramenta de design
- **Entidades** — definição, notação (rectângulo), exemplos AP
- **Atributos** — tipos: atómicos, compostos, identificadores (PK), candidatos, estrangeiros (FK), simples vs compostos; regras (não calcular, informação atómica)
- **Relacionamentos** — definição, notação (losango), grau (unário, binário, ternário, múltiplo)
- **Cardinalidade** — 1:1, 1:N, N:M com exemplos AP
- **Participação** — obrigatória vs não obrigatória
- **Tabela-resumo das 7 regras de conversão** — referência rápida
- **Nomenclatura** — `ENTIDADE(atributo1, atributo2, ...)` com sublinhado para PK
- **Fases de criação de uma BD** — os 9 passos (pp. 53 da sebenta)
- **Erros comuns** — tabela tipo "O que está mal → Como corrigir"

### 2. `aula-06.md` — Entidades, Atributos e Relacionamentos

**Objectivos:**
- [ ] Identificar entidades a partir de uma descrição textual de um processo
- [ ] Definir atributos adequados para cada entidade, distinguindo atómicos de compostos
- [ ] Escolher chaves primárias e identificar chaves candidatas
- [ ] Desenhar um diagrama E-R simplificado (sem cardinalidade)

**Conceitos-chave** (tabela): Entidade, Atributo, Chave Primária, Chave Candidata, Chave Estrangeira, Relacionamento

**Cenário** — Câmara Municipal de Pombal: Gestão de Pedidos de Intervenção
> Após mapear o processo com BPMN (Aulas 4–5), a equipa de SI da Câmara precisa agora de desenhar a base de dados que vai suportar a nova plataforma digital de gestão de pedidos. A primeira etapa é identificar que informação precisa de ser armazenada.

**Exercício — 4 Tarefas:**

**Tarefa 1 — Identificar entidades**
A partir da descrição do processo (que já conhecem do BPMN), identificar as entidades:
- Munícipe, Pedido, Serviço (Divisão), Funcionário, Visita, Intervenção
- Tabela: Entidade | O que representa | Exemplo de instância

**Tarefa 2 — Definir atributos**
Para cada entidade, definir atributos com tipo:
- Munícipe(NIF, nome, morada, telefone, email)
- Pedido(numPedido, dataRegisto, descricao, localizacao, estado, prioridade)
- Etc.
- Identificar PK e chaves candidatas

**Tarefa 3 — Identificar relacionamentos**
- Munícipe --submete--> Pedido
- Funcionário --regista--> Pedido
- Serviço --recebe--> Pedido
- Funcionário --realiza--> Visita
- Pedido --origina--> Visita
- Visita --gera--> Intervenção
- Tabela: Entidade A | Verbo | Entidade B

**Tarefa 4 — Desenhar DER simplificado**
- Desenhar no papel ou ferramenta (draw.io / dbdiagram.io)
- Rectângulos para entidades, losangos para relacionamentos, linhas a ligar
- Sem cardinalidade nem participação (isso é a Aula 7)

### 3. `aula-07.md` — Cardinalidade, Participação e Regras de Conversão

**Objectivos:**
- [ ] Classificar cada relacionamento quanto à cardinalidade (1:1, 1:N, N:M)
- [ ] Definir a participação (obrigatória/não obrigatória) de cada entidade num relacionamento
- [ ] Aplicar as 7 regras de conversão para obter as tabelas finais
- [ ] Distinguir quando são necessárias 1, 2 ou 3 tabelas para representar um relacionamento

**Conceitos-chave** (tabela): Cardinalidade, Participação obrigatória, Regras 1–7, Chave estrangeira, Tabela de relacionamento

**Cenário** — Continuação: Câmara Municipal de Pombal
> Com as entidades e atributos definidos na Aula 6, é hora de completar o modelo: definir pressupostos, aplicar cardinalidade e participação, e converter tudo em tabelas prontas para implementar num SGBD.

**Exercício — 4 Tarefas:**

**Tarefa 1 — Definir pressupostos**
Para cada relacionamento, escrever os pressupostos:
- "Cada munícipe pode submeter vários pedidos; cada pedido é submetido por um único munícipe"
- "Todos os pedidos têm de ter um munícipe; podem existir munícipes sem pedidos"
- Etc. para todos os relacionamentos
- Tabela: Relacionamento | Pressuposto | Cardinalidade | Participação

**Tarefa 2 — Completar o DER**
- Acrescentar cardinalidade (1, N, M) e participação (linha vertical = obrigatória) ao diagrama da Aula 6
- Verificar coerência com os pressupostos

**Tarefa 3 — Aplicar regras e obter tabelas**
Para cada relacionamento, indicar:
- Regra aplicada (1–7)
- Número de tabelas resultantes
- Tabelas com atributos, PKs sublinhadas, FKs identificadas
- Resultado final: conjunto de tabelas sem redundância

**Tarefa 4 — Definir domínios**
- Para 2–3 tabelas principais, definir domínio dos atributos:
- Tabela: Campo | Tipo de dados | Características (obrigatório, formato, domínio)

### 4. `aula-08.md` — Caso Integrador: Da Análise à Base de Dados

**Objectivos:**
- [ ] Realizar autonomamente as 9 fases de criação de uma base de dados
- [ ] Integrar todos os conceitos: entidades, atributos, DER, pressupostos, regras, tabelas, domínios
- [ ] Justificar cada decisão de modelação

**Cenário** — NOVO: Sistema de Gestão de Formações Internas da Câmara Municipal
> A Câmara Municipal de Pombal organiza formações internas para os seus funcionários (segurança no trabalho, atendimento ao público, software de gestão, etc.). Actualmente, as inscrições são feitas por email, os certificados são emitidos em Word, e não existe registo centralizado de quem frequentou o quê.

Descrição textual rica com:
- Funcionários com dados pessoais e departamento
- Formações com tema, formador (interno ou externo), sala, datas
- Inscrições com data, estado (inscrito/presente/faltou), avaliação
- Certificados emitidos
- Formadores externos com dados de facturação

**Exercício — 9 Fases (seguindo a sebenta):**
1. Determinar entidades (Funcionário, Departamento, Formação, Formador, Inscrição, Certificado)
2. Desenhar DER simplificado
3. Definir pressupostos
4. Desenhar DER completo (com cardinalidade e participação)
5. Determinar tabelas necessárias (aplicar regras)
6. Determinar chaves candidatas
7. Determinar chaves primárias
8. Definir tabelas finais (com PKs e FKs)
9. Definir domínio dos atributos

### 5. `exercicios-guiados.md` — 4 Exercícios Guiados

Estrutura idêntica ao `bpmn/casos-guiados.md`:
- Info box com instruções de utilização
- Cada exercício tem 4 tarefas:
  1. Identificar entidades e atributos
  2. Desenhar DER com cardinalidade e participação
  3. Aplicar regras e definir tabelas
  4. Definir domínios (para tabela principal)

**Caso 1 — Biblioteca Municipal de Pombal** (simples: 1:N)
- Contexto: gestão de empréstimos de livros
- Entidades: Leitor, Livro, Empréstimo
- Relacionamentos: Leitor--requisita-->Livro (N:M via Empréstimo)
- Progressão: começa simples, depois adiciona Autor e Categoria

**Caso 2 — Licenciamento de Obras Particulares** (1:N + N:M)
- Contexto: Câmara recebe pedidos de obras, pareceres de técnicos
- Entidades: Requerente, Processo, Técnico, Parecer
- Inclui: chave composta na tabela Parecer

**Caso 3 — Gestão de Refeições Sociais na IPSS** (ternário)
- Contexto: IPSS distribui refeições a idosos via voluntários
- Entidades: Utente, Refeição, Voluntário, Rota
- Inclui: relacionamento ternário (voluntário entrega refeição a utente numa rota)

**Caso 4 — Gestão de Viaturas e Motoristas da Câmara** (múltiplos relacionamentos)
- Contexto: pool de viaturas partilhadas entre serviços
- Entidades: Viatura, Motorista, Serviço, Requisição, Manutenção
- Inclui: dois relacionamentos entre Viatura e Motorista (conduz / requisita)

### 6. `exercicios.md` — 4 Exercícios Autónomos

Cenário + descrição textual + tabela de entidades esperadas + dicas. Sem passo-a-passo.

**Exercício 1 — Centro de Saúde: Gestão de Consultas**
- Entidades: Utente, Médico, Consulta, Especialidade, Receita, Exame

**Exercício 2 — Escola Profissional: Gestão de Estágios**
- Entidades: Aluno, Curso, Empresa, Estágio, Orientador, Avaliação

**Exercício 3 — Junta de Freguesia: Gestão de Equipamentos Desportivos**
- Entidades: Equipamento, Espaço, Utilizador, Reserva, Manutenção

**Exercício 4 — Protecção Civil Municipal: Gestão de Ocorrências**
- Entidades: Ocorrência, Agente, Equipa, Recurso, Zona, Relatório
- Complexidade extra: ligação conceptual ao BPMN (processo de resposta a emergências)

---

## Ferramentas recomendadas

- **draw.io / diagrams.net** — para desenhar diagramas E-R (gratuito, online)
- **dbdiagram.io** — para definir tabelas com sintaxe simples (gratuito)
- **Papel e caneta** — encorajado nas primeiras tarefas (pensar antes de digitalizar)

---

## Ordem de implementação

1. Criar pasta `docs/base-dados/`
2. `index.md` — Visão Geral (teoria completa E-R)
3. `aula-06.md` — Entidades, Atributos e Relacionamentos
4. `aula-07.md` — Cardinalidade, Participação e Regras
5. `aula-08.md` — Caso Integrador
6. `exercicios-guiados.md` — 4 casos guiados
7. `exercicios.md` — 4 exercícios autónomos
8. Actualizar `mkdocs.yml` com nova secção de navegação
9. Testar no servidor local
10. Commit e push

Todos os textos em **Português Europeu (PT-PT)**, nunca PT-BR.
