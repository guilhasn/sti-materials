# Do Processo BPMN ao Modelo de Dados

## Objectivos

- [ ] Extrair entidades e atributos a partir de um diagrama BPMN.
- [ ] Identificar que dados cada tarefa BPMN necessita ou produz.
- [ ] Definir pressupostos de cardinalidade e participação.
- [ ] Aplicar as regras de conversão para obter tabelas relacionais.

---

## Conceitos-chave

### Elementos fundamentais da conversão BPMN → E-R

| Conceito | Significado | Exemplo |
|----------|------------|---------|
| **Pressuposto** | Regra de negócio que define cardinalidade e participação | "Cada evento tem pelo menos um espaço" |
| **Participação obrigatória** | Todos os registos da entidade participam na relação | Todo evento é organizado por um funcionário |
| **Participação não obrigatória** | Nem todos os registos participam | Nem todo espaço tem eventos marcados |
| **Regra de conversão** | Regra que transforma o DER em tabelas | Regras 1–7 (ver Visão Geral) |
| **Esquema relacional** | Conjunto final de tabelas com PKs e FKs | Evento(codEvento, nome, ...) |

!!! note "A ponte BPMN → E-R"
    Um processo BPMN mostra quem faz o quê e em que ordem. Mas cada tarefa lê ou escreve dados. Modelar esses dados é o passo seguinte para construir o sistema de informação.

---

## Cenário — Da organização de eventos ao modelo de dados

!!! abstract "Contexto"
    A equipa de SI da Câmara de Óbidos mapeou o processo de organização de eventos com BPMN. Agora precisa de desenhar a base de dados que vai suportar esse processo. O ponto de partida é o diagrama BPMN — de cada tarefa, extraímos os dados necessários.

### Processo BPMN de referência

| Passo | Tarefa BPMN | Actor |
|-------|------------|-------|
| 1 | Organizador submete proposta de evento | Organizador |
| 2 | Técnico verifica disponibilidade de espaço | Técnico Cultural |
| 3 | Vereador aprova ou rejeita proposta | Vereador |
| 4 | Técnico reserva espaço(s) para o evento | Técnico Cultural |
| 5 | Técnico contacta e contrata artistas | Técnico Cultural |
| 6 | Técnico confirma patrocínios | Técnico Cultural |
| 7 | Sistema regista bilhetes vendidos | Sistema |
| 8 | Responsável regista participação no evento | Responsável Evento |
| 9 | Técnico elabora relatório de encerramento | Técnico Cultural |

---

## Exercício — Do BPMN ao E-R

### Tarefas

**Tarefa 1 — Mapear dados por tarefa BPMN**

Para cada tarefa do processo, identificar que dados são lidos e escritos:

| Tarefa BPMN | Dados que lê | Dados que escreve | Entidade(s) |
|-------------|-------------|-------------------|-------------|
| Submeter proposta | — | Nome, datas, tipo, orçamento previsto | Evento |
| Verificar disponibilidade | Espaços, datas ocupadas | — | Espaço, Reserva |
| Aprovar proposta | Proposta, orçamento | Estado (aprovado/rejeitado) | Evento |
| Reservar espaço | Espaço, evento, datas | Data reserva, estado | Reserva (Evento ↔ Espaço) |
| Contratar artistas | Artistas disponíveis | Cachet, condições | Participação (Evento ↔ Artista) |
| Confirmar patrocínios | Patrocinadores, valores | Valor confirmado | Patrocínio (Evento ↔ Patrocinador) |
| Registar bilhetes | Evento, tipo bilhete | Quantidade vendida, receita | Bilhete |
| Registar participação | Evento | Nº participantes, avaliação | Evento (actualizar) |
| Elaborar relatório | Todos os dados do evento | Relatório final | Evento (actualizar) |

!!! tip "Regra prática"
    Se uma tarefa BPMN escreve dados sobre duas entidades diferentes ligadas entre si, provavelmente existe uma relação entre essas entidades.

**Tarefa 2 — Definir pressupostos**

Para cada relação identificada, escrever os pressupostos de negócio:

| Relação | Pressuposto | Cardinalidade | Participação |
|---------|------------|---------------|-------------|
| Evento ↔ Espaço | Cada evento realiza-se em um ou mais espaços; cada espaço pode acolher vários eventos | M:N | Obrigatória no Evento (todo evento tem espaço); não obrigatória no Espaço |
| Evento ↔ Artista | Cada evento pode ter vários artistas; cada artista pode actuar em vários eventos | M:N | Não obrigatória em ambas |
| Evento ↔ Patrocinador | Cada evento pode ter vários patrocinadores; cada patrocinador pode patrocinar vários eventos | M:N | Não obrigatória em ambas |
| Evento ↔ Bilhete | Cada evento tem vários tipos de bilhete; cada bilhete pertence a um evento | 1:N | Obrigatória no Bilhete |
| Funcionário ↔ Evento | Cada funcionário pode organizar vários eventos; cada evento é organizado por um funcionário | 1:N | Obrigatória no Evento |

!!! warning "Cuidado com os pressupostos"
    Os pressupostos definem as regras do negócio. Um pressuposto errado gera um modelo errado. Exemplo: se assumirmos que cada evento só tem um espaço (1:N), mas na realidade o Festival de Chocolate usa 5 espaços diferentes, o modelo não funcionará.

**Tarefa 3 — Aplicar regras de conversão**

Para cada relação, indicar a regra e as tabelas resultantes:

| Relação | Cardinalidade | Participação | Regra | Tabelas |
|---------|--------------|-------------|-------|---------|
| Evento ↔ Espaço | M:N | — | Regra 6 | Evento, Espaço, **Reserva**(codEvento, codEspaco, dataReserva) |
| Evento ↔ Artista | M:N | — | Regra 6 | Evento, Artista, **Participacao**(codEvento, codArtista, cachet, dataActuacao) |
| Evento ↔ Patrocinador | M:N | — | Regra 6 | Evento, Patrocinador, **Patrocinio**(codEvento, codPatrocinador, valor, tipo) |
| Evento ↔ Bilhete | 1:N | Obrig. lado N | Regra 4 | Evento, **Bilhete**(codBilhete, codEvento, tipo, preco, qtdVendida) |
| Funcionário ↔ Evento | 1:N | Obrig. lado N | Regra 4 | Funcionário, Evento(... codFuncionario) |

**Resultado final — Esquema relacional:**

```
Evento(codEvento, nome, dataInicio, dataFim, edicao, orcamento, estado, codFuncionario)
Espaco(codEspaco, nome, localizacao, tipo, lotacao)
Artista(codArtista, nome, tipo, contacto, email)
Patrocinador(codPatrocinador, nome, NIF, contacto, email)
Funcionario(codFuncionario, nome, cargo, departamento, email)
Bilhete(codBilhete, codEvento, tipo, preco, qtdVendida)
Reserva(codEvento, codEspaco, dataReserva, estado)
Participacao(codEvento, codArtista, cachet, dataActuacao, palco)
Patrocinio(codEvento, codPatrocinador, valor, tipo, contrapartida)
```

!!! info "Nota"
    No ERDPlus, a funcionalidade **Convert to Relational Schema** gera automaticamente o esquema relacional a partir do diagrama E-R. Comparar o resultado automático com o manual para verificar.

**Tarefa 4 — Comparar AS-IS vs. E-R**

| Antes (Excel) | Depois (Modelo E-R) | Melhoria |
|--------------|--------------------|---------|
| Dados do artista copiados em cada linha | Entidade Artista separada | Sem redundância |
| Patrocínio misturado com evento | Tabela Patrocínio com FK | Dados isolados, totais por patrocinador |
| Sem chave única | Cada entidade tem PK | Registos únicos e rastreáveis |
| Impossível saber nº total de eventos por espaço | Tabela Reserva permite consultas | Análise possível |
| Uma só folha enorme | 9 tabelas normalizadas | Estrutura clara e sem redundância |

!!! tip "Reflexão"
    Reparem como o processo BPMN nos guiou na identificação das entidades. Cada tarefa BPMN que "escreve dados" indicou-nos uma entidade ou uma relação. O BPMN mostra o "como"; o E-R mostra o "o quê".

---

## Interpretação para decisão pública

A passagem do BPMN ao modelo E-R é um passo fundamental em qualquer projecto de sistema de informação na AP. O diagrama BPMN identifica os dados que circulam no processo; o modelo E-R organiza esses dados de forma estruturada, eliminando redundâncias e garantindo integridade. Juntos, constituem a base documental para a especificação de requisitos de um sistema de informação — do processo ao software, com rastreabilidade completa.
