# Exercícios Guiados — BPMN na Administração Pública

Quatro exercícios guiados passo-a-passo para construir diagramas BPMN no [bpmn.io](https://bpmn.io). Cada exercício indica exactamente que elementos usar e onde os colocar — ideal para consolidar a notação antes de avançar para os exercícios autónomos.

!!! info "Como usar estes exercícios"
    1. Abrir o [bpmn.io](https://bpmn.io) → **Try online**
    2. Seguir as tarefas pela ordem indicada (AS-IS primeiro, TO-BE depois)
    3. Consultar a [Visão Geral BPMN](index.md) sempre que surgir dúvida sobre um símbolo

!!! info "Estrutura de cada exercício"
    1. **Tarefa 1** — Criar pool e lanes (estrutura base)
    2. **Tarefa 2** — Modelar o fluxo AS-IS (passo-a-passo)
    3. **Tarefa 3** — Anotar problemas com text annotations
    4. **Tarefa 4** — Propor melhorias TO-BE (com novos elementos BPMN)

---

## Caso 1 — Pedido de Subsídio de Desemprego na Loja do Cidadão

### Contexto

!!! abstract "Cenário"
    A **Loja do Cidadão de Leiria** recebe diariamente pedidos de subsídio de desemprego. O processo envolve atendimento presencial, verificação de documentação e comunicação com os serviços centrais da Segurança Social. Actualmente, grande parte do processo depende de papel e de consultas manuais ao sistema.

### Processo AS-IS

| Passo | Descrição | Actor |
|-------|-----------|-------|
| 1 | Cidadão dirige-se à Loja do Cidadão com documentação | Cidadão |
| 2 | Técnico de atendimento verifica identidade e documentação | Técnico Atendimento |
| 3 | Se documentação incompleta, cidadão é informado do que falta e volta no dia seguinte | Técnico Atendimento |
| 4 | Técnico preenche formulário de pedido no sistema (campos manuais, sem validação) | Técnico Atendimento |
| 5 | Técnico imprime comprovativo e entrega ao cidadão | Técnico Atendimento |
| 6 | Pedido fica em fila de espera digital para análise pelo back-office | Back-office SS |
| 7 | Técnico do back-office verifica histórico contributivo (consulta manual a outro sistema) | Back-office SS |
| 8 | Se dados inconsistentes, back-office envia email ao técnico de atendimento a pedir esclarecimento | Back-office SS |
| 9 | Back-office emite decisão: deferido ou indeferido | Back-office SS |
| 10 | Cidadão recebe carta com a decisão (7–15 dias depois) | Cidadão |

### Tarefa 1 — Estrutura base

Criar um pool com **3 lanes**:

| Lane | Actor |
|------|-------|
| Cidadão | Inicia o pedido e recebe a decisão |
| Técnico de Atendimento | Verifica documentação e regista pedido |
| Back-office Segurança Social | Analisa pedido e emite decisão |

### Tarefa 2 — Modelar o fluxo principal

Representar os seguintes elementos, pela ordem indicada:

1. **Evento de início** (círculo fino) na lane Cidadão → cidadão apresenta-se com documentação
2. **Tarefa** na lane Técnico → "Verificar identidade e documentação"
3. **Gateway exclusivo** (losango com X) → "Documentação completa?"
    - **Não** → **Tarefa** "Informar cidadão do que falta" → **Evento de fim** (pedido não prossegue nesta visita)
    - **Sim** → continuar para o passo seguinte
4. **Tarefa** na lane Técnico → "Preencher formulário de pedido"
5. **Tarefa** na lane Técnico → "Imprimir e entregar comprovativo"
6. **Tarefa** na lane Back-office → "Verificar histórico contributivo"
7. **Gateway exclusivo** → "Dados consistentes?"
    - **Não** → **Tarefa** "Solicitar esclarecimento ao atendimento" → após recepção do esclarecimento, fluxo regressa ao passo 6 (Verificar histórico contributivo)
    - **Sim** → continuar
8. **Tarefa** na lane Back-office → "Emitir decisão"
9. **Tarefa** na lane Cidadão → "Receber carta com decisão"
10. **Evento de fim** (círculo grosso)

!!! tip "Dica"
    Começar pelo caminho principal (documentação completa, dados consistentes) e só depois adicionar os caminhos de excepção.

### Tarefa 3 — Anotar problemas

Usar **anotações de texto** para marcar:

- "⚠ Formulário sem validação — dados podem estar incompletos" (junto ao passo 4)
- "⚠ Consulta manual a outro sistema — lento e propenso a erro" (junto ao passo 7)
- "⚠ Cidadão espera 7–15 dias sem qualquer actualização" (junto ao passo 10)

### Tarefa 4 — Propor melhorias TO-BE

Criar um **novo diagrama** com as seguintes melhorias. Para cada melhoria, indicar o princípio de redesenho aplicado:

| Problema AS-IS | Melhoria TO-BE | Princípio | Elemento BPMN |
|----------------|----------------|-----------|---------------|
| Formulário sem validação | Formulário digital com campos obrigatórios e validação automática | Padronização | :material-cog: Service Task → "Validar dados do pedido" |
| Consulta manual ao histórico | Integração automática com sistema de histórico contributivo | Automatização | :material-cog: Service Task → "Consultar histórico contributivo" |
| Cidadão espera 7–15 dias sem informação | Notificação automática por SMS/email em cada mudança de estado | Monitorização | :material-email-arrow-right-outline: Evento intermédio de mensagem |

!!! tip "Dica TO-BE"
    Adicionar uma lane **Sistema / Plataforma** ao pool para representar as tarefas automatizadas (Service Tasks). Comparar os dois diagramas lado a lado para evidenciar as melhorias.

---

## Caso 2 — Pedido de Matrícula / Transferência numa Escola Secundária

### Contexto

!!! abstract "Cenário"
    A **Escola Secundária Domingos Sequeira** (Leiria) recebe no início de cada ano lectivo dezenas de pedidos de matrícula e transferência. O processo envolve o encarregado de educação, a secretaria e a direcção. Actualmente, tudo funciona com formulários em papel e comunicações por telefone.

### Processo AS-IS

| Passo | Descrição | Actor |
|-------|-----------|-------|
| 1 | Encarregado de educação (EE) entrega formulário de matrícula na secretaria | EE |
| 2 | Funcionário verifica se a documentação está completa (boletim de vacinas, certificado anterior) | Secretaria |
| 3 | Se incompleta, EE é contactado por telefone para entregar documentos em falta | Secretaria |
| 4 | Funcionário regista matrícula no sistema SIGE (introdução manual de todos os campos) | Secretaria |
| 5 | Se é transferência, secretaria pede processo do aluno à escola de origem por ofício | Secretaria |
| 6 | Direcção analisa pedidos e faz distribuição pelas turmas | Direcção |
| 7 | Após atribuição de turma, secretaria actualiza o sistema | Secretaria |
| 8 | Secretaria notifica o EE da turma atribuída **e** actualiza o sistema com o horário — em simultâneo | Secretaria |
| 9 | EE recebe carta com informação da turma e horário | EE |

### Tarefa 1 — Estrutura base

Criar um pool com **3 lanes**:

| Lane | Actor |
|------|-------|
| Encarregado de Educação | Entrega documentação e recebe resultado |
| Secretaria | Verifica, regista e comunica |
| Direcção | Decide distribuição por turmas |

### Tarefa 2 — Modelar o fluxo principal

1. **Evento de início** na lane EE → "EE entrega formulário de matrícula"
2. **Tarefa** na lane Secretaria → "Verificar documentação"
3. **Gateway exclusivo** → "Documentação completa?"
    - **Não** → **Tarefa** "Contactar EE por telefone" → após entrega dos documentos em falta, fluxo regressa ao passo 2 (Verificar documentação)
    - **Sim** → continuar
4. **Tarefa** na lane Secretaria → "Registar matrícula no SIGE"
5. **Gateway exclusivo** → "É transferência?"
    - **Sim** → **Tarefa** "Pedir processo à escola de origem" (Send Task — comunicação externa) → segue para o passo 6
    - **Não** → segue directamente para o passo 6
6. **Tarefa** na lane Direcção → "Distribuir alunos pelas turmas"
7. **Gateway paralelo** (losango com **+**) → abre duas ramificações simultâneas:
    - Ramificação A: **Tarefa** "Notificar EE da turma atribuída"
    - Ramificação B: **Tarefa** "Actualizar horário no sistema"
8. **Gateway paralelo** (fecho) → convergência das duas ramificações
9. **Evento de fim**

!!! warning "Atenção ao gateway paralelo"
    O gateway paralelo que abre no passo 7 **deve ser fechado** por outro gateway paralelo no passo 8. Esquecer o fecho é o erro mais frequente em BPMN.

### Tarefa 3 — Anotar problemas

- "⚠ Formulário em papel — risco de extravio" (junto ao passo 1)
- "⚠ Introdução manual no SIGE — erros de transcrição" (junto ao passo 4)
- "⚠ Ofício em papel para escola de origem — semanas de espera" (junto ao passo 5)

### Tarefa 4 — Propor melhorias TO-BE

| Problema AS-IS | Melhoria TO-BE | Princípio | Elemento BPMN |
|----------------|----------------|-----------|---------------|
| Formulário em papel | Formulário online com upload de documentos e validação automática | Padronização | :material-cog: Service Task → "Validar documentação submetida" |
| Introdução manual no SIGE | Integração directa: dados do formulário online alimentam o SIGE automaticamente | Automatização | :material-cog: Service Task → "Registar matrícula no SIGE" |
| Ofício em papel para escola de origem | Pedido electrónico via plataforma inter-escolas (ex.: SIGE nacional) | Automatização | :material-cog: Service Task → "Solicitar processo à escola de origem" |
| EE sem visibilidade do estado | Portal de acompanhamento onde o EE consulta o estado da matrícula | Monitorização | :material-email-arrow-right-outline: Notificações automáticas por email |

---

## Caso 3 — Pedido de Licença de Ruído para Evento na Câmara Municipal

### Contexto

!!! abstract "Cenário"
    A **Câmara Municipal de Marinha Grande** recebe pedidos de licença especial de ruído para eventos (festas, concertos, feiras). O processo exige parecer interno e comunicação à PSP para fiscalização. Actualmente é gerido com formulários em papel e despachos manuais.

### Processo AS-IS

| Passo | Descrição | Actor |
|-------|-----------|-------|
| 1 | Requerente entrega formulário no balcão com dados do evento (local, data, horário, tipo de ruído) | Requerente |
| 2 | Técnico do gabinete de apoio verifica se o formulário está completo e se o evento é em zona permitida | Gabinete de Apoio |
| 3 | Se zona ou horário não permitidos, pedido é indeferido imediatamente | Gabinete de Apoio |
| 4 | Técnico prepara informação técnica com parecer e envia ao vereador responsável | Gabinete de Apoio |
| 5 | Vereador analisa e despacha: deferido, deferido com condições, ou indeferido | Vereador |
| 6 | Técnico redige ofício com a decisão e comunica ao requerente por carta | Gabinete de Apoio |
| 7 | Se deferido, técnico envia comunicação à PSP local por ofício para fiscalização no dia do evento | Gabinete de Apoio |
| 8 | Requerente recebe decisão e, se deferido, paga taxa no balcão | Requerente |
| 9 | Técnico emite alvará de licença especial de ruído | Gabinete de Apoio |
| 10 | No dia do evento, ninguém verifica se as condições impostas são cumpridas | — |

### Tarefa 1 — Estrutura base

Criar um pool com **3 lanes**:

| Lane | Actor |
|------|-------|
| Requerente | Submete pedido, recebe decisão, paga taxa |
| Gabinete de Apoio | Verifica, prepara parecer, comunica |
| Vereador | Decide (despacho) |

### Tarefa 2 — Modelar o fluxo principal

1. **Evento de início** na lane Requerente → "Requerente entrega formulário"
2. **Tarefa** na lane Gabinete → "Verificar formulário e zona"
3. **Gateway exclusivo** → "Zona e horário permitidos?"
    - **Não** → **Tarefa** "Indeferir pedido" → **Evento de fim**
    - **Sim** → continuar
4. **Tarefa** na lane Gabinete → "Preparar informação técnica"
5. **Tarefa** na lane Vereador → "Analisar e despachar"
6. **Gateway exclusivo** → "Decisão?"
    - **Indeferido** → **Tarefa** "Comunicar indeferimento ao requerente" → **Evento de fim**
    - **Deferido / Deferido com condições** → continuar
7. **Tarefa** na lane Gabinete → "Comunicar decisão ao requerente"
8. **Send Task** (ícone de envelope com seta) na lane Gabinete → "Enviar ofício à PSP para fiscalização"
9. **Tarefa** na lane Requerente → "Pagar taxa no balcão"
10. **Tarefa** na lane Gabinete → "Emitir alvará de licença"
11. **Evento de fim**

!!! note "Send Task"
    No passo 8, usar uma **Send Task** (rectângulo com envelope) em vez de uma tarefa normal. A Send Task indica que há comunicação enviada para fora do pool — neste caso, para a PSP. Não é necessário criar um pool para a PSP neste exercício.

### Tarefa 3 — Anotar problemas

- "⚠ Formulário em papel — requerente pode ter de voltar por dados em falta" (junto ao passo 1)
- "⚠ Comunicação à PSP por ofício — pode não chegar a tempo do evento" (junto ao passo 8)
- "⚠ Nenhuma verificação no dia do evento — condições podem ser violadas" (junto ao passo 10)

### Tarefa 4 — Propor melhorias TO-BE

| Problema AS-IS | Melhoria TO-BE | Princípio | Elemento BPMN |
|----------------|----------------|-----------|---------------|
| Formulário em papel | Formulário online com validação de zona e horário integrada (dados do PDM) | Padronização + Automatização | :material-cog: Service Task → "Validar zona e horário" |
| Comunicação à PSP por ofício | Notificação electrónica automática à PSP via plataforma partilhada | Automatização | :material-cog: Service Task → "Notificar PSP electronicamente" |
| Nenhuma verificação no dia do evento | Checklist digital de fiscalização com registo obrigatório pós-evento | Monitorização | Tarefa + Evento intermédio de temporização (após data do evento) |
| Pagamento presencial obrigatório | Pagamento online com emissão automática de alvará em PDF | Eliminação | :material-cog: Service Task → "Emitir alvará digital" |

---

## Caso 4 — Marcação e Realização de Consulta no Centro de Saúde

### Contexto

!!! abstract "Cenário"
    O **Centro de Saúde de Vila Feliz** (extensão de saúde) gere consultas de medicina geral e familiar. O processo de marcação e realização de consulta envolve o utente, a recepção, o enfermeiro e o médico. O sistema de marcação é parcialmente informatizado, mas a comunicação interna depende de chamadas em voz alta e fichas em papel.

### Processo AS-IS

| Passo | Descrição | Actor |
|-------|-----------|-------|
| 1 | Utente telefona ou dirige-se à recepção para marcar consulta | Utente |
| 2 | Recepcionista verifica disponibilidade na agenda (sistema informático) | Recepção |
| 3 | Se não há vaga, utente é colocado em lista de espera (caderno em papel) | Recepção |
| 4 | Se há vaga, recepcionista marca consulta e informa utente da data e hora | Recepção |
| 5 | No dia da consulta, utente apresenta-se na recepção | Utente |
| 6 | Recepcionista confirma presença e coloca ficha na pilha do médico | Recepção |
| 7 | Utente aguarda na sala de espera (sem previsão de tempo) | Utente |
| 8 | Enfermeiro chama utente para pré-triagem: mede tensão, peso, temperatura | Enfermeiro |
| 9 | Enfermeiro regista valores na ficha de papel e devolve utente à sala de espera | Enfermeiro |
| 10 | Médico chama utente (em voz alta) para o consultório | Médico |
| 11 | Médico consulta ficha, realiza consulta e redige notas no sistema | Médico |
| 12 | Se necessário exames, médico emite requisição em papel | Médico |
| 13 | Se necessário receita, médico emite receita electrónica | Médico |
| 14 | Utente regressa à recepção para marcar exames ou próxima consulta | Utente |

### Tarefa 1 — Estrutura base

Criar um pool com **4 lanes**:

| Lane | Actor |
|------|-------|
| Utente | Marca consulta, aguarda, é atendido |
| Recepção | Gere agenda, confirma presença |
| Enfermeiro | Pré-triagem (sinais vitais) |
| Médico | Consulta, prescrição, requisição |

### Tarefa 2 — Modelar o fluxo principal

1. **Evento de início** na lane Utente → "Utente contacta recepção"
2. **Tarefa** na lane Recepção → "Verificar disponibilidade na agenda"
3. **Gateway exclusivo** → "Há vaga?"
    - **Não** → **Tarefa** "Registar em lista de espera" → **Evento de fim** (processo interrompido até vaga)
    - **Sim** → **Tarefa** "Marcar consulta e informar utente"
4. **Evento intermédio de temporização** (:material-clock-outline: círculo duplo com relógio) na lane Utente → "Aguardar dia da consulta"
5. **Tarefa** na lane Utente → "Apresentar-se na recepção"
6. **Tarefa** na lane Recepção → "Confirmar presença e preparar ficha"
7. **Tarefa** na lane Enfermeiro → "Realizar pré-triagem (tensão, peso, temperatura)"
8. **Tarefa** na lane Enfermeiro → "Registar valores na ficha"
9. **Tarefa** na lane Médico → "Realizar consulta"
10. **Gateway exclusivo** → "Necessita exames?"
    - **Sim** → **Tarefa** "Emitir requisição de exames" → ambos os caminhos convergem antes do passo 11
    - **Não** → continuar
11. **Gateway exclusivo** → "Necessita receita?"
    - **Sim** → **Tarefa** "Emitir receita electrónica" → ambos os caminhos convergem antes do passo 12
    - **Não** → continuar
12. **Tarefa** na lane Utente → "Marcar exames ou próxima consulta na recepção"

!!! note "Gateways independentes"
    Os gateways dos passos 10 e 11 são **independentes**: o utente pode necessitar de exames, de receita, de ambos, ou de nenhum. Modelar sequencialmente — não são alternativas exclusivas entre si.
13. **Evento de fim**

!!! note "Evento intermédio de temporização"
    O passo 4 usa um **evento intermédio de temporização** (círculo duplo com relógio). Este elemento indica que o processo pára e aguarda que passe um período de tempo — neste caso, os dias até à consulta. No bpmn.io: clicar no elemento → chave inglesa → seleccionar "Timer Intermediate Catch Event".

### Tarefa 3 — Anotar problemas

- "⚠ Lista de espera em caderno de papel — utentes esquecidos" (junto ao passo 3)
- "⚠ Utente sem previsão de tempo de espera — insatisfação" (junto ao passo 7)
- "⚠ Ficha de papel — valores de pré-triagem podem perder-se" (junto ao passo 9)
- "⚠ Chamada em voz alta — utentes não ouvem, perdem a vez" (junto ao passo 10)

### Tarefa 4 — Propor melhorias TO-BE

| Problema AS-IS | Melhoria TO-BE | Princípio | Elemento BPMN |
|----------------|----------------|-----------|---------------|
| Lista de espera em caderno | Lista de espera digital com notificação automática quando há vaga | Automatização | :material-cog: Service Task → "Notificar utente de vaga disponível" |
| Ficha de papel na pré-triagem | Registo digital dos sinais vitais directamente no sistema clínico (tablet) | Automatização | :material-cog: Service Task → "Registar sinais vitais no sistema" |
| Chamada em voz alta | Sistema de senhas electrónico com ecrã na sala de espera | Automatização | :material-cog: Service Task → "Chamar utente por ecrã e SMS" |
| Utente sem previsão de espera | Ecrã na sala de espera com tempo estimado e posição na fila | Monitorização | :material-cog: Service Task → "Actualizar tempo estimado de espera" |
| Requisição de exames em papel | Requisição electrónica integrada com laboratório | Automatização + Eliminação | :material-cog: Service Task → "Enviar requisição electrónica ao laboratório" |

---

!!! tip "Próximo passo"
    Depois de completar estes exercícios guiados, avançar para os [Exercícios](exercicios.md) — cenários onde o diagrama é construído de forma autónoma, sem orientação passo-a-passo.
