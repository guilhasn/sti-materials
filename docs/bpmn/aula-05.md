# Aula 5 — Redesenho TO-BE com Sistemas de Informacao

<span class="aula-badge">Aula 5</span><span class="duracao-badge">120 min</span>

## Objectivos

- [ ] Aplicar principios de redesenho de processos ao cenario AS-IS mapeado na Aula 4.
- [ ] Integrar sistemas de informacao como motor de melhoria (e nao como fim em si).
- [ ] Construir o diagrama TO-BE no bpmn.io.
- [ ] Comparar AS-IS e TO-BE com metricas concretas.

---

## Conceitos-chave

### Principios de redesenho

| Principio | Descricao | Exemplo no caso |
|-----------|-----------|-----------------|
| **Eliminacao** | Remover actividades que nao acrescentam valor | Eliminar dupla validacao manual |
| **Automatizacao** | Substituir tarefas manuais por accoes do sistema | Registo num formulario digital com atribuicao automatica |
| **Paralelismo** | Executar actividades em simultaneo quando possivel | Notificar cidadao e servico ao mesmo tempo |
| **Padronizacao** | Uniformizar a forma como as tarefas sao executadas | Modelo unico de pedido com campos obrigatorios |
| **Monitorizacao** | Adicionar pontos de medicao ao processo | Dashboard com tempos de resposta por servico |

!!! note "SI como meio, nao como fim"
    O redesenho TO-BE nao e "meter um sistema informatico". E repensar o processo e usar tecnologia para eliminar desperdicio, acelerar respostas e dar transparencia ao cidadao.

---

## Cenario — Processo TO-BE com SI integrado

!!! abstract "Contexto"
    A Camara Municipal decide implementar uma **plataforma digital de gestao de pedidos** para substituir o processo informal mapeado na Aula 4. O objectivo: rastreabilidade total, tempos de resposta mensuraveis e cidadao informado em cada etapa.

### Descricao do processo redesenhado (TO-BE)

1. O **cidadao** submete pedido por **formulario online** (portal municipal) ou presencialmente no balcao, onde o tecnico utiliza o mesmo formulario digital.
2. O **sistema** valida campos obrigatorios e atribui **numero de registo unico**.
3. O **sistema** classifica automaticamente o servico responsavel com base no tipo de dano seleccionado (regras pre-configuradas).
4. Gateway: classificacao automatica com confianca?
    - Sim → encaminhamento automatico ao servico
    - Nao → fila de triagem manual para o tecnico de atendimento
5. O **chefe de divisao** recebe **notificacao automatica** com o pedido e os dados completos.
6. O chefe de divisao valida e atribui tecnico de campo — o **cidadao recebe SMS/email** com a informacao de que o pedido esta em analise.
7. O **tecnico de campo** regista visita e relatorio directamente na plataforma (tablet/telemovel).
8. O **sistema** actualiza o estado do pedido e **notifica o cidadao** da conclusao da visita.
9. O chefe de divisao aprova a intervencao — o **sistema** regista a decisao e actualiza prazos.
10. Apos execucao da intervencao, o pedido e **encerrado formalmente** no sistema com data, descricao e custo.
11. O cidadao recebe **notificacao de encerramento** e pode avaliar o servico.

### Melhorias face ao AS-IS

| Dimensao | AS-IS | TO-BE |
|----------|-------|-------|
| Registo | Papel / Excel local | Formulario digital centralizado |
| Classificacao | Manual, com duvidas | Automatica com fallback para triagem |
| Encaminhamento | Email / nota interna | Automatico com notificacao |
| Visibilidade cidadao | Nenhuma | SMS/email em cada mudanca de estado |
| Rastreabilidade | Inexistente | Numero unico, historico completo |
| Encerramento | Informal | Formal com data, custo e avaliacao |
| Medicao | Impossivel | Dashboard com KPI em tempo real |

---

## Exercicio — Desenhar o processo TO-BE

### Preparacao

1. Abrir o diagrama AS-IS da Aula 4 (ou uma copia).
2. Criar um **novo diagrama** para o TO-BE — nao desenhar por cima do AS-IS.
3. Consultar a [Cheatsheet BPMN 2.0](../referencia/cheatsheet-bpmn.md) para os novos elementos.

### Tarefas

**Tarefa 1 — Novas lanes**

Actualizar a estrutura de lanes para reflectir o papel do sistema:

| Lane | Actor |
|------|-------|
| Cidadao | Inicia pedido (online ou presencial) |
| Sistema / Plataforma | Validacao, classificacao, notificacoes |
| Atendimento | Triagem manual (apenas excepcoes) |
| Servico Responsavel | Chefe de divisao + tecnico de campo |

**Tarefa 2 — Modelar o fluxo TO-BE**

Representar o processo redesenhado incluindo:

1. Evento de inicio: cidadao submete formulario
2. Tarefa de servico (service task): sistema valida e atribui numero
3. Tarefa de servico: classificacao automatica
4. Gateway exclusivo: classificacao com confianca?
5. Fluxo principal e fluxo de excepcao (triagem)
6. Evento intermedio de mensagem: notificacao ao cidadao
7. Tarefas no servico responsavel (validacao, visita, relatorio)
8. Eventos intermedios de mensagem: notificacoes ao cidadao em cada transicao
9. Encerramento formal com evento de fim

!!! tip "Novos elementos BPMN a usar"
    Neste diagrama, introduzir dois tipos de tarefa novos:

    - **Service Task** (icone de engrenagem) — actividade executada pelo sistema sem intervencao humana
    - **Evento intermedio de mensagem** (envelope no circulo) — notificacao enviada ou recebida

**Tarefa 3 — Tabela comparativa**

Preencher uma tabela com pelo menos **5 diferencas concretas** entre AS-IS e TO-BE, indicando para cada uma:

- O que mudou
- Que principio de redesenho foi aplicado
- Qual o impacto esperado

**Tarefa 4 — Indicadores de melhoria**

Propor **3 KPI (Key Performance Indicators)** que o sistema TO-BE permite medir e que eram impossiveis de medir no AS-IS. Para cada KPI indicar:

- Nome do indicador
- Formula ou metodo de calculo
- Valor-alvo razoavel

!!! warning "Atencao"
    O TO-BE deve ser ambicioso mas realista. Propor tecnologias que a camara nao tem capacidade de implementar (ex.: inteligencia artificial avancada, blockchain) desvia o foco do que e alcancavel.

!!! danger "Erro critico"
    Redesenhar o processo TO-BE sem resolver os problemas identificados no AS-IS. O TO-BE nao e um diagrama "bonito" — e a resposta directa a cada problema mapeado.

!!! tip "Dica"
    Comecar por listar os problemas do AS-IS e para cada um definir a solucao. So depois desenhar o diagrama TO-BE — garante que nenhum problema fica por resolver.

---

## Criterios de avaliacao

| Criterio | Peso |
|----------|------|
| Uso correcto dos novos elementos BPMN (service tasks, mensagens) | 25% |
| Lanes reflectem correctamente o papel do sistema | 15% |
| Cada problema do AS-IS tem solucao no TO-BE | 25% |
| Tabela comparativa completa e fundamentada | 20% |
| KPI propostos sao mensuraveis e relevantes | 15% |

---

## Interpretacao para decisao publica

O redesenho TO-BE e o artefacto que permite a um dirigente municipal ou vereador avaliar o investimento necessario em sistemas de informacao. Ao comparar AS-IS e TO-BE lado a lado, a decisao deixa de ser "devemos comprar software?" e passa a ser "que problemas concretos vamos resolver e com que ganho mensuravel?". Esta e a base de qualquer proposta de investimento em transformacao digital na administracao publica.
