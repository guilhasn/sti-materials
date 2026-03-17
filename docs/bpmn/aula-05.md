# Redesenho TO-BE com Sistemas de Informação

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

**Tarefa 1 — Estrutura base**

Criar **1 pool** (Câmara Municipal de Vila Feliz — Processo Redesenhado) com **5 lanes**:

| Lane | Quem é | O que faz neste processo |
|------|--------|--------------------------|
| Cidadão | Munícipe afectado pela tempestade | Submete pedido e recebe notificações |
| Sistema / Plataforma | Plataforma digital de gestão de pedidos | Valida, classifica, notifica e regista automaticamente |
| Técnico de Atendimento | Funcionário do balcão | Triagem manual apenas em casos de excepção |
| Chefe de Divisão | Responsável pelo serviço técnico | Valida pedido e decide intervenção |
| Técnico de Campo | Técnico operacional | Realiza visita ao local e regista relatório na plataforma |

!!! tip "No bpmn.io"
    Criar o pool → clicar com botão direito dentro do pool → **Add Lane** para adicionar lanes. Nomear cada lane com o nome do actor.

**Tarefa 2 — Modelar o fluxo TO-BE**

Representar os seguintes elementos, colocando cada um na lane do actor correcto:

1. :material-circle-outline:{ .icon-green } **Evento de início** (lane Cidadão) → "Submeter pedido no portal municipal"
    - O cidadão preenche um formulário online no portal da câmara (ou o técnico de atendimento preenche no balcão usando o mesmo formulário digital). Campos obrigatórios garantem dados completos.
2. :material-cog:{ .icon-blue } **Service Task** (lane Sistema) → "Validar dados e atribuir número de registo"
    - O sistema valida automaticamente os campos obrigatórios e gera um número de registo único. O cidadão recebe confirmação imediata com o número.
3. :material-cog:{ .icon-blue } **Service Task** (lane Sistema) → "Classificar serviço responsável"
    - Com base no tipo de dano seleccionado pelo cidadão, o sistema aplica regras pré-configuradas para determinar o serviço competente (obras, protecção civil, ambiente, habitação).
4. :material-rhombus:{ .icon-orange } **Gateway exclusivo** (lane Sistema) → "Classificação automática com confiança?"
    - **Não** → :material-square-rounded:{ .icon-blue } **Tarefa** (lane Técnico de Atendimento) → "Triagem manual" — o técnico revê o pedido e atribui manualmente o serviço. Segue para o passo 5.
    - **Sim** → segue directamente para o passo 5.
5. :material-cog:{ .icon-blue } **Service Task** (lane Sistema) → "Encaminhar pedido e notificar chefe de divisão"
    - O sistema encaminha automaticamente o pedido ao chefe de divisão do serviço competente e envia-lhe uma notificação.
6. :material-square-rounded:{ .icon-blue } **Tarefa** (lane Chefe de Divisão) → "Validar pedido e atribuir técnico de campo"
    - O chefe de divisão consulta o pedido na plataforma com todos os dados e atribui um técnico de campo.
7. :material-email-arrow-right-outline:{ .icon-green } **Evento intermédio de mensagem** (lane Sistema) → "Notificar cidadão: pedido em análise"
    - O sistema envia SMS/email ao cidadão a informar que o pedido está a ser tratado e por quem.
8. :material-square-rounded:{ .icon-blue } **Tarefa** (lane Técnico de Campo) → "Realizar visita e registar relatório na plataforma"
    - O técnico desloca-se ao local, avalia a situação e regista o relatório directamente na plataforma via tablet ou telemóvel. Fotografias podem ser anexadas.
9. :material-cog:{ .icon-blue } **Service Task** (lane Sistema) → "Actualizar estado e notificar cidadão: visita concluída"
    - O sistema actualiza automaticamente o estado do pedido e envia notificação ao cidadão.
10. :material-square-rounded:{ .icon-blue } **Tarefa** (lane Chefe de Divisão) → "Aprovar intervenção"
    - O chefe de divisão analisa o relatório na plataforma e aprova o tipo de intervenção necessária. O sistema regista a decisão e actualiza prazos.
11. :material-cog:{ .icon-blue } **Service Task** (lane Sistema) → "Encerrar pedido e notificar cidadão"
    - Após execução da intervenção, o pedido é encerrado formalmente no sistema com data, descrição e custo. O cidadão recebe notificação final e pode avaliar o serviço.
12. :material-circle:{ .icon-red } **Evento de fim** (lane Sistema) → "Pedido encerrado formalmente"

!!! tip "Novos elementos BPMN a usar"
    Neste diagrama, introduzir dois tipos de elemento novos:

    - :material-cog: **Service Task** (rectângulo com engrenagem) — actividade executada pelo sistema sem intervenção humana
    - :material-email-arrow-right-outline: **Evento intermédio de mensagem** (círculo duplo com envelope) — notificação enviada ao cidadão

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
