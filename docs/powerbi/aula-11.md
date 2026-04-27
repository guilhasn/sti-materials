# Aula 11 — Do Dashboard ao Munícipe

## Objectivos

- [ ] Aplicar **filtros Top N** para destacar os principais valores.
- [ ] Configurar **Editar Interações** entre visuais (Filtro / Realçar / Nenhum).
- [ ] Adicionar **slicers** (filtros interactivos) ao relatório.
- [ ] Publicar o relatório no **Power BI Service**.
- [ ] Configurar **refresh agendado** (com gateway local quando necessário).
- [ ] Partilhar via **Apps** com controlo de acesso.
- [ ] Aplicar cuidados de **RGPD** e governança em contexto AP.

---

## Conceitos-chave

| Conceito | Significado |
|----------|------------|
| **Top N** | Filtro que mostra apenas os N maiores/menores valores |
| **Edit Interactions** | Define como cliques num visual afectam outros (Filter / Highlight / None) |
| **Slicer** | Filtro interactivo no canvas (lista, dropdown, datas, between) |
| **Power BI Service** | Plataforma cloud (`app.powerbi.com`) onde se publica e partilha |
| **Workspace** | "Pasta partilhada" no Service onde vivem datasets e relatórios |
| **Gateway** | Aplicação no servidor da câmara que liga o Service a fontes locais |
| **App** | Empacotamento oficial de um workspace para distribuição massiva |
| **RLS — Row-Level Security** | Mostrar dados diferentes a utilizadores diferentes |
| **Sensitivity Labels** | Etiquetas Microsoft Purview ("Confidencial — RGPD") |

---

## Cenário — Dashboard Executivo de Contratação Pública

!!! abstract "Contexto"
    A vereadora pediu um **dashboard de contratação pública 2024** para apresentação à Assembleia Municipal. Tem de mostrar:

    - Total de valor adjudicado (cartão grande)
    - **TOP 10** entidades adjudicantes (gráfico de barras)
    - **TOP 20** códigos CPV mais usados
    - Mapa de Portugal com volume por distrito
    - Filtro por trimestre

    No fim, o relatório vai ser **publicado no Power BI Service** e partilhado com vereadores e directores de divisão. Tem de garantir que **o público externo não tem acesso** (RGPD).

    Vai aplicar à **Ficha Prática 02/05** com o ficheiro [`contratos2019.xlsx`](exercicios.md#ficha-02).

---

## Tarefa 1 — Filtros Top N

A vereadora não quer ver as 200 entidades adjudicantes — só as **10 principais por valor**.

1. Clicar no visual de barras com `Entidade Adjudicante` no eixo Y e `Valor Total` no eixo X
2. No painel **Filters** (à direita), expandir a secção **Filtros neste visual**
3. Encontrar o campo `Entidade Adjudicante` e expandir
4. **Tipo de filtro**: mudar para **N Principais** (Top N)
5. Mostrar itens: **Superior** + número `10`
6. **Por valor**: arrastar a medida que define o ranking (ex.: `Total Adjudicado`)
7. Clicar **Aplicar filtro**

!!! warning "Top N só funciona ao nível do visual"
    Se quiser Top N na **página inteira** (afectando todos os visuais simultaneamente), o Power BI **não suporta directamente** — exige uma medida DAX com `RANKX`, que está fora do âmbito desta aula. Para o seu caso, basta aplicar Top N a cada visual individualmente.

---

## Tarefa 2 — Editar Interações

Por defeito, clicar num visual filtra todos os outros. Há casos em que não queremos isso.

**Caso típico**: o cartão "Total adjudicado" deve mostrar **sempre o total geral**, mesmo quando o utilizador clica numa barra do gráfico Top 10.

### Passo a passo

1. Clicar no visual "fonte" (gráfico de barras Top 10)
2. Separador **Formato → Editar Interações** (na ribbon)
3. Os outros visuais ganham 3 ícones no canto superior direito:
    - :material-filter: **Filtro** — filtra dados (default em tabelas)
    - :material-format-paint: **Realçar** — destaca, esmaece o resto (default em colunas/barras)
    - :material-cancel: **Nenhum** — ignora a selecção
4. No cartão "Total adjudicado", clicar em **Nenhum** (círculo cortado)
5. Clicar de novo em **Editar Interações** para sair do modo de edição

### Quando usar cada modo

| Modo | Quando |
|------|--------|
| **Filtro** | Tabelas, listas, mapas (default) |
| **Realçar** | Quando quer ver a fatia em contexto sem perder o todo |
| **Nenhum** | KPIs, cartões com totais gerais, slicers de "ano fiscal" |

---

## Tarefa 3 — Slicers (filtros interactivos)

Slicer é um filtro **visível no canvas** que o utilizador final pode mexer.

1. Clicar num espaço vazio → ícone **Slicer** no painel Visualizations
2. Arrastar o campo `Trimestre` para Field
3. No menu pendente do slicer (canto superior direito), escolher o estilo:
    - **Lista** (default) — checkboxes
    - **Dropdown** — poupa espaço
    - **Between** — para datas/números (intervalo)
    - **Relative date** — "últimos 7 dias", "este mês"

!!! tip "Slicer de data — usar Between"
    Para um slicer de datas, o estilo **Between** dá ao utilizador um *handle* que arrasta para definir o intervalo. Mais usável que checkboxes.

---

## Tarefa 4 — Publicar no Power BI Service

1. **File → Publish → Publish to Power BI**
2. Escolher um **workspace partilhado** (NUNCA usar **My Workspace** para produção)
3. Esperar pela mensagem "Success" — o relatório vai para `app.powerbi.com`

### O que fica no Service

O `.pbix` decompõe-se em **dois objectos** separados:

- **Modelo Semântico** (antes "Dataset") — modelo + queries + medidas
- **Relatório (Report)** — páginas e visuais

Vários relatórios podem reutilizar o mesmo modelo semântico (sem duplicar dados).

---

## Tarefa 5 — Refresh agendado

O `.pbix` no Service tem uma **cópia local dos dados**. Para se manter actualizado:

1. No Service, ir ao **Modelo Semântico** → **Settings → Scheduled refresh**
2. Activar; escolher fuso horário e até 8 horários por dia (Pro) ou 48 (PPU/Fabric)

### Quando os dados estão num servidor local

Se o Excel ou a base de dados estão na rede da câmara (não na cloud), precisa de um **On-premises Data Gateway**:

1. Pedir ao DIMSI/IT para instalar o **Power BI Gateway** num servidor da câmara (download gratuito)
2. No Service, em **Settings → Gateway connection**, configurar a credencial
3. O Gateway faz a ponte segura entre o Service e os dados locais

!!! warning "4 falhas → desactiva"
    Se o refresh agendado falhar **4 vezes consecutivas**, o Power BI desactiva-o automaticamente. Configure notificações por email para perceber rapidamente.

---

## Tarefa 6 — Partilhar via Apps

Em vez de partilhar o relatório individualmente (botão Share), use **Apps**.

1. No workspace → botão **Create app**
2. Definir audiências:
    - "Vereadores" (5 pessoas)
    - "Chefes de Divisão" (15 pessoas)
    - "Equipa DIMSI" (3 pessoas)
3. Cada audiência vê apenas os relatórios autorizados
4. Publicar a App
5. Os utilizadores acedem via link — vêem uma interface limpa, sem o ruído do workspace de desenvolvimento

!!! tip "Apps é o canal recomendado para AP"
    Apps permitem entrega massiva controlada. Use sempre que for distribuir um relatório a mais de 3-4 pessoas.

---

## Tarefa 7 — RLS introdutório

**Cenário**: cada chefe de divisão deve ver apenas os contratos da sua própria divisão.

### Configurar (no Desktop)

1. Vista de Modelo → **Modeling → Manage Roles → Create**
2. Nome do papel: `Divisão Urbanismo`
3. Tabela `Contratos` → filtro: `[Divisão] = "Urbanismo"`
4. OK

Repetir para cada divisão.

### Atribuir utilizadores (no Service)

1. Service → Modelo Semântico → **Security**
2. Para cada papel, adicionar utilizadores ou grupos do Active Directory

!!! info "RLS dinâmico (avançado)"
    Em vez de criar 20 papéis, pode-se usar **RLS dinâmico** com `USERPRINCIPALNAME()` — o Power BI identifica quem está autenticado e filtra automaticamente. Tópico avançado, fora do âmbito desta aula.

---

## Tarefa 8 — Considerações AP (RGPD e governança)

### Sensitivity Labels

1. No Service → Modelo Semântico → **Settings → Sensitivity label**
2. Aplicar etiqueta apropriada:
    - **Público** — relatórios para o portal de transparência municipal
    - **Interno** — uso normal dentro da câmara
    - **Confidencial — RGPD** — contém dados pessoais
    - **Restrito** — apenas alta direcção

A etiqueta **acompanha o ficheiro** mesmo quando exportado para Excel/PDF.

### Bloquear "Publish to Web"

A funcionalidade `Publish to Web` gera um URL **público sem autenticação**. A **CISA** (Cybersecurity and Infrastructure Security Agency) recomenda **explicitamente desactivar esta opção em organismos públicos**.

1. Tenant Admin → **Settings → Tenant settings → Publish to Web**
2. Desactivar globalmente, ou restringir a um grupo AD muito pequeno

!!! danger "Casos reais"
    Já foram detectados municípios a expor PII e dados de saúde por engano através de Publish to Web. **Nunca o use** para relatórios com dados sensíveis.

### Outras boas práticas RGPD

- **Minimizar dados** — só importe colunas necessárias (não importe NIF se ninguém vai usar)
- **Pseudonimizar** — substituir NIFs por códigos onde possível
- **Documentar a base legal** — em contexto AP, costuma ser interesse público (Art.º 6º/1/e) ou cumprimento de obrigação legal (Art.º 6º/1/c)
- **Logs de auditoria** — Microsoft Purview Audit Log regista quem viu, partilhou ou exportou cada relatório

---

## Tarefa 9 — Power BI Mobile

1. Instalar **Power BI** (iOS / Android) no smartphone
2. Login com a mesma conta usada no Service
3. As Apps publicadas aparecem na lista
4. Para optimizar a visualização móvel: no Desktop, criar um **Mobile Layout** (`View → Mobile layout`) — canvas vertical com visuais reorganizados

!!! warning "Sem Mobile Layout"
    Sem um layout específico, o Power BI tenta encaixar o relatório no ecrã pequeno e o resultado costuma ser ilegível. **Crie sempre Mobile Layout** para os relatórios principais.

---

## Tarefa 10 — Aplicar à Ficha 02/05

Agora resolva a [**Ficha Prática 02 (ou 05)**](exercicios.md#ficha-02) com o ficheiro `contratos2019.xlsx`. Vai aplicar:

- Power Query: Split Column (NIF + Nome), Local Execução em 3 colunas, Conditional Column (Concelho2)
- Visualizações: Cartão (total), Top 10 (barras), Mapa Portugal, Top 20 CPV
- Editar Interações
- Publicar no Service (opcional na aula, mas exigido na prática)

---

## Checklist da aula

- [ ] Filtros Top N
- [ ] Editar Interações (Filter / Highlight / None)
- [ ] Slicers (lista, dropdown, between)
- [ ] Publicar no Power BI Service
- [ ] Configurar refresh agendado
- [ ] Gateway local (conceito)
- [ ] Partilhar via App
- [ ] RLS básico
- [ ] Sensitivity Labels
- [ ] Bloquear Publish to Web
- [ ] Mobile Layout

---

!!! tip "Fim do módulo"
    Concluiu o módulo Power BI! O próximo passo é **resolver autonomamente** as 3 fichas práticas. Se ficar bloqueado, consulte:

    - [Ficha de Consulta Rápida](cheat-sheet.md) — atalhos visuais
    - [Erros Frequentes](erros-frequentes.md) — anti-padrões
    - [DAX Mínimo](dax-minimo.md) — referência das 5 funções essenciais

    Bons dashboards!
