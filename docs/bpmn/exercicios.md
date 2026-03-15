# Exercícios Práticos — BPMN na Administração Pública

<span class="aula-badge">Prática</span>

Quatro cenários de organismos públicos portugueses para praticar mapeamento de processos em BPMN 2.0. Cada exercício pode ser resolvido individualmente ou em grupo no [bpmn.io](https://bpmn.io).

!!! info "Estrutura de cada exercício"
    1. **Contexto** — cenário e organismo
    2. **Processo AS-IS** — passos do processo actual com problemas identificados
    3. **Tarefa principal** — modelar o AS-IS no bpmn.io
    4. **Tarefa bónus** — propor melhorias TO-BE

---

## Exercício 1 — Triagem na Urgência Hospitalar

### Contexto

!!! abstract "Cenário"
    O **Hospital Distrital de Leiria** recebe diariamente dezenas de doentes na urgência geral. O processo de triagem determina a prioridade de atendimento, mas apresenta ineficiências que geram tempos de espera elevados e insatisfação dos utentes. O hospital não dispõe de sistema de triagem informatizado — tudo é gerido em papel e por comunicação verbal.

### Processo AS-IS

| Passo | Descrição | Actor |
|-------|-----------|-------|
| 1 | Utente chega à urgência e dirige-se ao balcão de admissão | Utente |
| 2 | Administrativo regista dados do utente em ficha de papel | Administrativo |
| 3 | Administrativo entrega ficha ao enfermeiro de triagem | Administrativo |
| 4 | Enfermeiro avalia sintomas e classifica prioridade (pulseira) | Enfermeiro triagem |
| 5 | Enfermeiro escreve à mão a prioridade na ficha e coloca pulseira | Enfermeiro triagem |
| 6 | Ficha é colocada numa pilha, por ordem de prioridade | Enfermeiro triagem |
| 7 | Médico chama o próximo doente da pilha | Médico |
| 8 | Se necessário exames, médico preenche requisição em papel | Médico |
| 9 | Utente desloca-se aos exames com a requisição | Utente |
| 10 | Resultados dos exames entregues em mão ao médico | Técnico de diagnóstico |
| 11 | Médico decide: alta, internamento ou reencaminhamento | Médico |
| 12 | Administrativo regista saída do utente — se não se esquecer | Administrativo |

### Problemas identificados

| Problema | Impacto |
|----------|---------|
| Registo em papel sem campos obrigatórios | Dados incompletos, erros de identificação |
| Sem sistema de chamada — doentes chamados em voz alta | Doentes não ouvem, saem da sala, perdem a vez |
| Ficha física pode ser perdida ou trocada | Risco clínico — doente errado atendido |
| Requisição de exames em papel | Resultados demoram, extraviam-se entre serviços |
| Sem registo de tempos | Impossível medir tempo de espera real por prioridade |
| Saída do utente nem sempre registada | Estatísticas de ocupação incorrectas |

### Tarefa — Modelar o AS-IS

1. Criar um diagrama BPMN no [bpmn.io](https://bpmn.io) com **4 lanes**: Utente, Administrativo, Enfermeiro de Triagem, Médico.
2. Representar os 12 passos do processo, incluindo o gateway de decisão (passo 11).
3. Usar **anotações de texto** para marcar pelo menos 3 problemas no diagrama.
4. Exportar em `.bpmn` e `.png`.

### Tarefa bónus — Propor melhorias TO-BE

Propor **3 melhorias concretas** ao processo, indicando:

- O que muda (princípio de redesenho aplicado)
- Que tipo de tarefa BPMN substituiria a actual (User Task, Service Task, etc.)
- Impacto esperado

!!! tip "Exemplos de melhoria"
    - Triagem com sistema digital (ex.: Triagem de Manchester informatizada) → User Task em vez de Manual Task
    - Sistema de chamada electrónica com ecrã na sala de espera → Service Task
    - Requisição de exames electrónica com resultados no sistema → eliminação de deslocação do utente

---

## Exercício 2 — Pedido de Equivalência na Universidade

### Contexto

!!! abstract "Cenário"
    A **ESTG-IPL** (Escola Superior de Tecnologia e Gestão) recebe todos os semestres dezenas de pedidos de equivalência de unidades curriculares (UC). O processo envolve serviços académicos, coordenadores de curso e docentes. Actualmente é gerido por email, formulários em papel e decisões verbais — sem sistema integrado de acompanhamento.

### Processo AS-IS

| Passo | Descrição | Actor |
|-------|-----------|-------|
| 1 | Estudante entrega requerimento em papel nos serviços académicos, acompanhado de certificado e programas das UC de origem | Estudante |
| 2 | Funcionário dos serviços académicos verifica se a documentação está completa | Serviços académicos |
| 3 | Se incompleta, contacta o estudante por email para pedir documentos em falta | Serviços académicos |
| 4 | Funcionário regista o pedido numa folha Excel e encaminha por email ao coordenador de curso | Serviços académicos |
| 5 | Coordenador de curso analisa e identifica docente(s) responsável(eis) pelas UC de destino | Coordenador |
| 6 | Coordenador encaminha por email ao(s) docente(s) com pedido de parecer | Coordenador |
| 7 | Docente compara programas e emite parecer (favorável, desfavorável, parcial) — por email | Docente |
| 8 | Coordenador recolhe pareceres e elabora proposta de decisão | Coordenador |
| 9 | Proposta enviada ao Conselho Técnico-Científico (CTC) para deliberação | Coordenador |
| 10 | CTC delibera em reunião — acta registada em papel | CTC |
| 11 | Serviços académicos comunicam resultado ao estudante por carta registada | Serviços académicos |
| 12 | Se deferido, serviços académicos actualizam manualmente o plano curricular do estudante | Serviços académicos |

### Problemas identificados

| Problema | Impacto |
|----------|---------|
| Documentação em papel — extravios frequentes | Pedidos perdidos, necessidade de repetir entrega |
| Email como ferramenta de workflow | Sem rastreabilidade, pareceres esquecidos |
| Estudante sem visibilidade do estado | Contactos repetidos aos serviços académicos |
| Tempo de resposta variável (2 semanas a 4 meses) | Estudantes sem plano curricular definido |
| Actualização manual do plano curricular | Erros de transcrição, UC por registar |
| Sem prazo definido para parecer do docente | Bloqueio total do processo |

### Tarefa — Modelar o AS-IS

1. Criar um diagrama BPMN com **4 lanes**: Estudante, Serviços Académicos, Coordenador de Curso, Docente.
2. Representar os 12 passos, incluindo o gateway no passo 2 (documentação completa?).
3. Anotar pelo menos 3 problemas com **anotações de texto**.
4. Exportar em `.bpmn` e `.png`.

### Tarefa bónus — Propor melhorias TO-BE

Propor **3 melhorias concretas**, por exemplo:

- Portal online de submissão com validação de campos obrigatórios
- Dashboard de acompanhamento visível pelo estudante
- Notificação automática ao docente com prazo para resposta

---

## Exercício 3 — Registo de Queixa-Crime na PSP

### Contexto

!!! abstract "Cenário"
    A **esquadra da PSP de Leiria** recebe queixas-crime presencialmente. O processo envolve agentes, oficiais e o Ministério Público. O registo é feito em formulários próprios, mas a comunicação entre entidades é predominantemente em papel, gerando atrasos na investigação e perda de informação.

### Processo AS-IS

| Passo | Descrição | Actor |
|-------|-----------|-------|
| 1 | Cidadão dirige-se à esquadra e é recebido pelo agente de serviço | Cidadão |
| 2 | Agente verifica identidade do queixoso (documento de identificação) | Agente |
| 3 | Agente regista a queixa em formulário próprio (papel carbonado em triplicado) | Agente |
| 4 | Agente entrega cópia da queixa ao cidadão | Agente |
| 5 | Oficial de serviço revê a queixa e classifica o tipo de crime | Oficial |
| 6 | Oficial decide: investigação interna ou reencaminhamento para PJ/GNR | Oficial |
| 7 | Se investigação interna, oficial atribui a agente investigador | Oficial |
| 8 | Agente investigador realiza diligências e elabora relatório | Agente investigador |
| 9 | Relatório enviado por correio interno ao Ministério Público | Oficial |
| 10 | MP acusa, arquiva ou pede diligências complementares — resposta por ofício | MP |
| 11 | Cidadão não recebe actualização até decisão final do MP | — |
| 12 | Se pedidas diligências complementares, o ciclo repete-se a partir do passo 8 | Agente investigador |

### Problemas identificados

| Problema | Impacto |
|----------|---------|
| Formulário em papel carbonado (3 vias) | Texto ilegível, erros de preenchimento |
| Classificação do crime dependente do oficial presente | Inconsistência na classificação entre turnos |
| Comunicação com MP por correio interno (papel) | Atrasos de dias/semanas, documentos extraviados |
| Cidadão sem qualquer actualização | Desconfiança no sistema judicial, reclamações |
| Sem registo digital de diligências | Impossível medir prazos ou detectar processos parados |
| Ciclo de diligências complementares sem prazo | Processos arrastam-se indefinidamente |

### Tarefa — Modelar o AS-IS

1. Criar um diagrama BPMN com **2 pools**: PSP (com lanes: Agente, Oficial, Agente Investigador) e Ministério Público (pool separado).
2. Representar os 12 passos, incluindo os gateways nos passos 6 e 10.
3. Usar **fluxo de mensagem** (seta tracejada) entre os pools PSP e MP.
4. Anotar pelo menos 3 problemas.
5. Exportar em `.bpmn` e `.png`.

!!! warning "Atenção — dois pools"
    Este exercício exige dois pools porque a PSP e o Ministério Público são **entidades autónomas**. Lembrar: fluxos de sequência (seta sólida) apenas dentro do mesmo pool; entre pools, usar fluxos de mensagem (seta tracejada).

### Tarefa bónus — Propor melhorias TO-BE

Propor **3 melhorias concretas**, por exemplo:

- Registo digital da queixa com assinatura electrónica
- Plataforma de comunicação segura PSP ↔ MP (eliminação do correio interno)
- Notificação automática ao cidadão em cada mudança de estado processual

---

## Exercício 4 — Licença de Ocupação de Via Pública na Junta de Freguesia

### Contexto

!!! abstract "Cenário"
    A **Junta de Freguesia de Marinha Grande** recebe pedidos de licença de ocupação temporária de via pública — para obras, mudanças, eventos ou feiras. O processo envolve a junta, a câmara municipal (para vias sob sua jurisdição) e, em alguns casos, a GNR. Actualmente é gerido com formulários em papel e deliberações em reunião de junta.

### Processo AS-IS

| Passo | Descrição | Actor |
|-------|-----------|-------|
| 1 | Requerente entrega formulário em papel na junta, acompanhado de planta de localização | Requerente |
| 2 | Funcionário verifica se a documentação está completa | Funcionário |
| 3 | Se a via é municipal (não da freguesia), o pedido é reencaminhado à câmara por ofício | Funcionário |
| 4 | Se a via é da freguesia, o presidente da junta analisa e emite parecer | Presidente da junta |
| 5 | Pedido incluído na próxima reunião de junta para deliberação | Órgão deliberativo |
| 6 | Junta delibera: deferido, indeferido ou deferido com condições | Órgão deliberativo |
| 7 | Funcionário comunica decisão ao requerente por carta | Funcionário |
| 8 | Se deferido, requerente paga taxa de ocupação no balcão | Requerente |
| 9 | Funcionário emite alvará de licença (documento A4 com carimbo) | Funcionário |
| 10 | Se necessário condicionamento de trânsito, junta comunica à GNR por ofício | Funcionário |
| 11 | Após o período de ocupação, ninguém verifica se a via foi reposta | — |

### Problemas identificados

| Problema | Impacto |
|----------|---------|
| Formulário em papel sem modelo padronizado | Informação incompleta, pedidos recusados à chegada |
| Reencaminhamento à câmara por ofício (papel) | Semanas de atraso, sem acompanhamento |
| Deliberação apenas em reunião (quinzenal ou mensal) | Tempo de resposta mínimo: 2–4 semanas |
| Comunicação da decisão por carta | Requerente sem saber quando esperar resposta |
| Pagamento presencial obrigatório | Deslocação adicional do requerente |
| Sem verificação de reposição da via | Vias degradadas após obras sem responsabilização |
| Comunicação com GNR por ofício | Condicionamento de trânsito não activado a tempo |

### Tarefa — Modelar o AS-IS

1. Criar um diagrama BPMN com **1 pool** (Junta de Freguesia) com **3 lanes**: Requerente, Funcionário, Órgão Deliberativo (Presidente + Junta).
2. Representar os 11 passos, incluindo os gateways nos passos 3 (via municipal?) e 6 (decisão).
3. Anotar pelo menos 3 problemas.
4. Exportar em `.bpmn` e `.png`.

!!! tip "Dica"
    A comunicação com a câmara municipal e a GNR (passos 3 e 10) pode ser representada como **Send Task** no limite do pool, ou como um segundo pool se quiserem detalhar a interacção. Para este exercício, a versão simplificada (Send Task) é suficiente.

### Tarefa bónus — Propor melhorias TO-BE

Propor **3 melhorias concretas**, por exemplo:

- Formulário online com validação automática e upload de planta
- Deliberação simplificada por despacho do presidente (abaixo de determinado limiar)
- Pagamento online com emissão automática de alvará em PDF

---

## Critérios de avaliação (comuns a todos os exercícios)

| Critério | Peso |
|----------|------|
| Uso correcto dos símbolos BPMN (eventos, tarefas, gateways) | 30% |
| Lanes correctamente atribuídas aos actores reais | 20% |
| Fluxo completo do início ao fim, sem lacunas | 20% |
| Problemas anotados com anotações de texto | 15% |
| Legibilidade e organização visual do diagrama | 15% |

!!! danger "Erro crítico"
    Criar um AS-IS idealizado em vez de representar a realidade. O mapeamento AS-IS documenta o que **acontece**, não o que **deveria** acontecer. Resistir à tentação de "melhorar" o processo nesta fase.
