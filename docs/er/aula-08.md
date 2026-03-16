# Modelo Completo e Normalização Prática

## Objectivos

- [ ] Identificar e eliminar redundância de dados num modelo E-R
- [ ] Aplicar regras práticas de normalização
- [ ] Converter um diagrama E-R completo em esquema relacional
- [ ] Definir domínios de atributos para implementação
- [ ] Preparar o modelo de dados para desenvolvimento de aplicação

---

## Conceitos-chave — Normalização prática (3 regras simples)

| Regra | Pergunta-guia | Acção | Exemplo |
|-------|---------------|-------|---------|
| **Sem repetição** | "Este dado aparece copiado em várias linhas?" | Separar numa nova entidade | Nome do espaço repetido em cada evento → Entidade Espaço |
| **Cada facto no seu lugar** | "Este atributo depende da chave ou de outro atributo?" | Mover para a entidade correcta | Morada do patrocinador na tabela Patrocínio → mover para Patrocinador |
| **Sem listas numa célula** | "Este campo contém vários valores separados por vírgulas?" | Criar relação M:N | "Jazz, Fado, Rock" num campo género → tabela Artista ↔ Género |

!!! note "Normalização sem formalismo"
    Na sebenta e na literatura, a normalização é apresentada com as formas normais (1FN, 2FN, 3FN). Nesta aula usamos 3 regras práticas equivalentes que são mais fáceis de aplicar no contexto da AP. O resultado final é o mesmo: tabelas sem redundância.

---

## Cenário — Revisão do modelo E-R de eventos

!!! abstract "Contexto"
    A Câmara Municipal de Óbidos quer avançar com a implementação da base de dados para gestão de eventos. A equipa de SI já tem o modelo E-R das aulas anteriores. Agora precisa de:

    1. Refinar o modelo — garantir que não há redundância
    2. Converter em tabelas relacionais finais
    3. Definir domínios dos atributos
    4. Preparar a especificação para o fornecedor de software

### Modelo com problemas — "versão do estagiário"

Antes de avançar para o exercício principal, vamos analisar uma primeira versão do modelo E-R que um estagiário preparou. Esta versão contém **erros e redundâncias propositados** que devem ser identificados e corrigidos.

**Problemas a detectar:**

| # | Problema | Regra violada | Correcção |
|---|----------|---------------|-----------|
| 1 | Atributo `nomeEspaco` dentro da entidade Evento | Sem repetição — o nome do espaço repete-se em cada evento que lá decorre | Criar entidade Espaço e relacionar com Evento |
| 2 | Campo `artistas` como texto livre dentro de Evento ("João Silva, Maria Santos") | Sem listas numa célula — vários valores num só campo | Criar relação M:N entre Evento e Artista |
| 3 | Atributo `idade` armazenado na entidade Artista | Cada facto no seu lugar — a idade é derivável de `dataNascimento` | Remover `idade` e calcular a partir de `dataNascimento` |
| 4 | Relação Evento ↔ Patrocinador sem tabela associativa (M:N tratada como 1:N) | Sem repetição — um evento pode ter vários patrocinadores e vice-versa | Criar tabela associativa Patrocínio |
| 5 | Campo `totalPatrocinios` armazenado na entidade Evento | Cada facto no seu lugar — valor calculável a partir dos registos de Patrocínio | Remover o campo e calcular quando necessário |

---

## Exercício — Sistema de Gestão de Formações Internas (9 fases)

!!! abstract "Cenário"
    A Câmara Municipal de Óbidos organiza formações internas para os seus funcionários — segurança no trabalho, atendimento ao público, ferramentas digitais, primeiros socorros, entre outras. Actualmente:

    - As inscrições são feitas por email ao departamento de RH
    - Os certificados são emitidos manualmente em Word
    - Não existe registo centralizado de quem frequentou o quê
    - Os formadores podem ser internos (funcionários) ou externos (empresas de formação)
    - Cada formação tem uma sala atribuída, datas, horários e número máximo de participantes
    - No final, cada participante avalia a formação (1 a 5 estrelas + comentário)

### Fase 1 — Determinar entidades

| Entidade | Descrição | Exemplos |
|----------|-----------|----------|
| Funcionário | Pessoa que trabalha na câmara | Ana Silva (Técnica Superior, Dept. Cultura) |
| Departamento | Unidade orgânica | Cultura, Obras, Recursos Humanos |
| Formação | Acção de formação oferecida | "Segurança no Trabalho 2025" |
| Formador | Pessoa/empresa que dá a formação | Dr. Pedro Costa (interno) / SafetyPro, Ldª (externo) |
| Sala | Espaço onde decorre a formação | Sala 1 (30 lugares, projector) |

### Fase 2 — Desenhar DER simplificado

Representar as seguintes relações no ERDPlus:

- **Funcionário** — inscreve → **Formação**
- **Departamento** — tem → **Funcionário**
- **Formação** — é dada por → **Formador**
- **Formação** — decorre em → **Sala**

### Fase 3 — Definir pressupostos

Regras de negócio a documentar:

1. Cada funcionário pertence a um departamento; cada departamento tem vários funcionários.
2. Cada funcionário pode inscrever-se em várias formações; cada formação pode ter vários inscritos.
3. Cada formação é dada por um formador; cada formador pode dar várias formações.
4. Cada formação decorre numa sala; cada sala pode acolher várias formações.
5. Todos os funcionários pertencem a um departamento.
6. Pode haver formadores sem formações atribuídas.
7. Todas as formações têm sala e formador atribuídos.
8. Nem todos os funcionários se inscrevem em formações.

### Fase 4 — Desenhar DER completo

Definir cardinalidades e participações:

| Relação | Cardinalidade | Participação |
|---------|---------------|--------------|
| Departamento → Funcionário | 1:N | Obrigatória lado N |
| Funcionário ↔ Formação | M:N | Não obrigatória em ambos os lados |
| Formador → Formação | 1:N | Obrigatória lado N, não obrigatória lado 1 |
| Sala → Formação | 1:N | Obrigatória lado N |

### Fase 5 — Determinar tabelas (aplicar regras)

| Relação | Card. | Partic. | Regra | Nº Tabelas |
|---------|-------|---------|-------|------------|
| Dept → Funcionário | 1:N | Obrig. lado N | Regra 4 | 2 |
| Func. ↔ Formação | M:N | — | Regra 6 | 3 (inclui Inscrição) |
| Formador → Formação | 1:N | Obrig. lado N, não obrig. lado 1 | Regra 4 | 2 |
| Sala → Formação | 1:N | Obrig. lado N | Regra 4 | 2 |

**Total de tabelas distintas: 6** — Departamento, Funcionário, Formação, Formador, Sala, Inscrição

### Fase 6 — Chaves candidatas

| Tabela | Chaves candidatas |
|--------|-------------------|
| Funcionário | numFuncionario / NIF / BI |
| Departamento | codDepartamento / sigla |
| Formação | codFormacao |
| Formador | codFormador / NIF |
| Sala | codSala / nome+piso |
| Inscrição | numFuncionario + codFormacao |

### Fase 7 — Chaves primárias

| Tabela | PK escolhida | Justificação |
|--------|--------------|--------------|
| Funcionário | numFuncionario | Numérico, já usado internamente |
| Departamento | codDepartamento | Numérico sequencial |
| Formação | codFormacao | Numérico sequencial |
| Formador | codFormador | Numérico sequencial |
| Sala | codSala | Numérico sequencial |
| Inscrição | numFuncionario + codFormacao | Chave composta (identifica inscrição) |

!!! tip "Preferir chaves numéricas"
    Chaves numéricas são mais eficientes, ocupam menos espaço e evitam problemas com caracteres especiais. O NIF pode ser chave candidata, mas usar um código sequencial como PK é mais robusto.

### Fase 8 — Tabelas finais

```
Departamento(codDepartamento, nome, sigla, localizacao)
Funcionario(numFuncionario, nome, email, telefone, cargo, codDepartamento)
Formacao(codFormacao, titulo, descricao, dataInicio, dataFim, horaInicio, horaFim, maxParticipantes, codFormador, codSala)
Formador(codFormador, nome, tipo, NIF, email, telefone, empresa)
Sala(codSala, nome, piso, capacidade, equipamento)
Inscricao(numFuncionario, codFormacao, dataInscricao, presenca, avaliacao, comentario)
```

!!! info "Notação"
    PKs sublinhadas. FKs a itálico. Exemplo: Funcionario(**numFuncionario**, nome, ..., *codDepartamento*)

### Fase 9 — Domínio dos atributos

**Formação:**

| Campo | Tipo de dados | Características |
|-------|---------------|-----------------|
| codFormacao | Número inteiro | Chave primária, auto-incremento |
| titulo | Texto (100) | Obrigatório |
| descricao | Texto (500) | Opcional |
| dataInicio | Data | Obrigatório, ≥ data actual |
| dataFim | Data | Obrigatório, ≥ dataInicio |
| horaInicio | Hora | Formato HH:MM |
| horaFim | Hora | > horaInicio |
| maxParticipantes | Número inteiro | Obrigatório, entre 5 e 50 |
| codFormador | Número inteiro | FK → Formador, obrigatório |
| codSala | Número inteiro | FK → Sala, obrigatório |

**Inscrição:**

| Campo | Tipo de dados | Características |
|-------|---------------|-----------------|
| numFuncionario | Número inteiro | PK (parte 1), FK → Funcionário |
| codFormacao | Número inteiro | PK (parte 2), FK → Formação |
| dataInscricao | Data | Obrigatório, valor pré-definido: data actual |
| presenca | Sim/Não | Valor pré-definido: Não |
| avaliacao | Número inteiro | Opcional, entre 1 e 5 |
| comentario | Texto (250) | Opcional |

---

## Tarefa final — Preparar para a app

!!! abstract "Reflexão"
    Que funcionalidades pode a aplicação oferecer com base neste modelo de dados?

| Funcionalidade da app | Entidades envolvidas | Dados necessários |
|----------------------|----------------------|-------------------|
| Catálogo de formações | Formação, Formador, Sala | Título, datas, formador, sala, vagas |
| Inscrição online | Funcionário, Formação, Inscrição | Verificar vagas, registar inscrição |
| Registo de presenças | Inscrição | Actualizar presença (tablet na sala) |
| Certificado automático | Funcionário, Formação, Inscrição | Gerar PDF com nome, formação, data, horas |
| Painel de gestão (dashboard) | Todas | Formações por departamento, taxa de presença, avaliações |

!!! tip "Ponte para a Aula 9"
    Na próxima aula, vamos usar este modelo de dados como base para criar uma aplicação com IA. Um bom modelo de dados é a fundação de qualquer sistema de informação.
