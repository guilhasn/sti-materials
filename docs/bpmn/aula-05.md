# Aula 5 — Redesenho TO-BE com Sistemas de Informação

<span class="aula-badge">Aula 5</span>

## Objectivos

- [ ] Aplicar princípios de redesenho de processos ao cenário AS-IS mapeado na Aula 4.
- [ ] Integrar sistemas de informação como motor de melhoria (e não como fim em si).
- [ ] Construir o diagrama TO-BE no bpmn.io.
- [ ] Comparar AS-IS e TO-BE com métricas concretas.

---

## Conceitos-chave

### Princípios de redesenho

| Princípio | Descrição | Exemplo no caso |
|-----------|-----------|-----------------|
| **Eliminação** | Remover actividades que não acrescentam valor | Eliminar dupla validação manual |
| **Automatização** | Substituir tarefas manuais por acções do sistema | Registo num formulário digital com atribuição automática |
| **Paralelismo** | Executar actividades em simultâneo quando possível | Notificar cidadão e serviço ao mesmo tempo |
| **Padronização** | Uniformizar a forma como as tarefas são executadas | Modelo único de pedido com campos obrigatórios |
| **Monitorização** | Adicionar pontos de medição ao processo | Dashboard com tempos de resposta por serviço |

!!! note "SI como meio, não como fim"
    O redesenho TO-BE não é "meter um sistema informático". É repensar o processo e usar tecnologia para eliminar desperdício, acelerar respostas e dar transparência ao cidadão.

---

## Cenário — Processo TO-BE com SI integrado

!!! abstract "Contexto"
    A Câmara Municipal decide implementar uma **plataforma digital de gestão de pedidos** para substituir o processo informal mapeado na Aula 4. O objectivo: rastreabilidade total, tempos de resposta mensuráveis e cidadão informado em cada etapa.

### Descrição do processo redesenhado (TO-BE)

1. O **cidadão** submete pedido por **formulário online** (portal municipal) ou presencialmente no balcão, onde o técnico utiliza o mesmo formulário digital.
2. O **sistema** valida campos obrigatórios e atribui **número de registo único**.
3. O **sistema** classifica automaticamente o serviço responsável com base no tipo de dano seleccionado (regras pré-configuradas).
4. Gateway: classificação automática com confiança?
    - Sim → encaminhamento automático ao serviço
    - Não → fila de triagem manual para o técnico de atendimento
5. O **chefe de divisão** recebe **notificação automática** com o pedido e os dados completos.
6. O chefe de divisão valida e atribui técnico de campo — o **cidadão recebe SMS/email** com a informação de que o pedido está em análise.
7. O **técnico de campo** regista visita e relatório directamente na plataforma (tablet/telemóvel).
8. O **sistema** actualiza o estado do pedido e **notifica o cidadão** da conclusão da visita.
9. O chefe de divisão aprova a intervenção — o **sistema** regista a decisão e actualiza prazos.
10. Após execução da intervenção, o pedido é **encerrado formalmente** no sistema com data, descrição e custo.
11. O cidadão recebe **notificação de encerramento** e pode avaliar o serviço.

### Melhorias face ao AS-IS

| Dimensão | AS-IS | TO-BE |
|----------|-------|-------|
| Registo | Papel / Excel local | Formulário digital centralizado |
| Classificação | Manual, com dúvidas | Automática com fallback para triagem |
| Encaminhamento | Email / nota interna | Automático com notificação |
| Visibilidade cidadão | Nenhuma | SMS/email em cada mudança de estado |
| Rastreabilidade | Inexistente | Número único, histórico completo |
| Encerramento | Informal | Formal com data, custo e avaliação |
| Medição | Impossível | Dashboard com KPI em tempo real |

---

## Exercício — Desenhar o processo TO-BE

### Preparação

1. Abrir o diagrama AS-IS da Aula 4 (ou uma cópia).
2. Criar um **novo diagrama** para o TO-BE — não desenhar por cima do AS-IS.
3. Consultar a [Notação BPMN 2.0](index.md) para os novos elementos.

### Tarefas

**Tarefa 1 — Novas lanes**

Actualizar a estrutura de lanes para reflectir o papel do sistema:

| Lane | Actor |
|------|-------|
| Cidadão | Inicia pedido (online ou presencial) |
| Sistema / Plataforma | Validação, classificação, notificações |
| Atendimento | Triagem manual (apenas excepções) |
| Serviço Responsável | Chefe de divisão + técnico de campo |

**Tarefa 2 — Modelar o fluxo TO-BE**

Representar o processo redesenhado incluindo:

1. Evento de início: cidadão submete formulário
2. Tarefa de serviço (service task): sistema valida e atribui número
3. Tarefa de serviço: classificação automática
4. Gateway exclusivo: classificação com confiança?
5. Fluxo principal e fluxo de excepção (triagem)
6. Evento intermédio de mensagem: notificação ao cidadão
7. Tarefas no serviço responsável (validação, visita, relatório)
8. Eventos intermédios de mensagem: notificações ao cidadão em cada transição
9. Encerramento formal com evento de fim

!!! tip "Novos elementos BPMN a usar"
    Neste diagrama, introduzir dois tipos de tarefa novos:

    - **Service Task** (ícone de engrenagem) — actividade executada pelo sistema sem intervenção humana
    - **Evento intermédio de mensagem** (envelope no círculo) — notificação enviada ou recebida

**Tarefa 3 — Tabela comparativa**

Preencher uma tabela com pelo menos **5 diferenças concretas** entre AS-IS e TO-BE, indicando para cada uma:

- O que mudou
- Que princípio de redesenho foi aplicado
- Qual o impacto esperado

**Tarefa 4 — Indicadores de melhoria**

Propor **3 KPI (Key Performance Indicators)** que o sistema TO-BE permite medir e que eram impossíveis de medir no AS-IS. Para cada KPI indicar:

- Nome do indicador
- Fórmula ou método de cálculo
- Valor-alvo razoável

!!! warning "Atenção"
    O TO-BE deve ser ambicioso mas realista. Propor tecnologias que a câmara não tem capacidade de implementar (ex.: inteligência artificial avançada, blockchain) desvia o foco do que é alcançável.

!!! danger "Erro crítico"
    Redesenhar o processo TO-BE sem resolver os problemas identificados no AS-IS. O TO-BE não é um diagrama "bonito" — é a resposta directa a cada problema mapeado.

!!! tip "Dica"
    Começar por listar os problemas do AS-IS e para cada um definir a solução. Só depois desenhar o diagrama TO-BE — garante que nenhum problema fica por resolver.

---

## Interpretação para decisão pública

O redesenho TO-BE é o artefacto que permite a um dirigente municipal ou vereador avaliar o investimento necessário em sistemas de informação. Ao comparar AS-IS e TO-BE lado a lado, a decisão deixa de ser "devemos comprar software?" e passa a ser "que problemas concretos vamos resolver e com que ganho mensurável?". Esta é a base de qualquer proposta de investimento em transformação digital na administração pública.
