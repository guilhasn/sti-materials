# Power BI — Análise de Dados na Administração Pública

Este módulo introduz o **Power BI** como ferramenta de análise e visualização de dados em contexto de administração pública. As três aulas usam o cenário da **Câmara Municipal de Vila Feliz** (continuidade dos módulos BPMN e E-R) e dados reais portugueses (contratação pública, atendimento, eventos).

!!! info "Pré-requisitos"
    - Módulos **Excel**, **BPMN** e **E-R** concluídos
    - Computador com **Windows 10/11** (Power BI Desktop é gratuito mas não tem versão Mac nativa)
    - Conta Microsoft (pessoal ou institucional `@ipleiria.pt`) — só obrigatória para publicar no Power BI Service
    - Acesso à internet
    - Recomendado: 2 monitores para ter dataset e dashboard lado a lado

!!! tip "Recursos de consulta rápida"
    - :material-file-document-outline: [**Ficha de Consulta Rápida**](cheat-sheet.md) — A4 imprimível com atalhos, notação e DAX mínimo
    - :material-alert-outline: [**Erros Frequentes**](erros-frequentes.md) — anti-padrões com correcções
    - :material-function: [**DAX Mínimo**](dax-minimo.md) — referência rápida (15-20 min de estudo)

---

## Porquê Power BI na AP?

A Administração Pública gera dados em volume crescente — contratos, atendimentos, processos, recursos humanos, execução orçamental — e a forma tradicional de os analisar (folhas Excel separadas, relatórios em Word, gráficos avulsos) deixou de chegar. **Power BI** resolve quatro problemas concretos:

- **Junta dados de várias fontes** numa única visão (Excel + BD + ficheiros mensais)
- **Refresh automático** — o relatório actualiza-se sozinho quando os dados mudam
- **Interactividade** — o utilizador filtra, faz drill-down, explora sem ter de pedir ajuda à equipa de análise
- **Acessível para não-técnicos** — quem sabe Excel aprende Power BI rapidamente

!!! tip "Analogia com os módulos anteriores"
    - O **BPMN** mapeou os **processos** (quem faz o quê)
    - O **E-R** modelou os **dados** (que informação se guarda)
    - O **Power BI** transforma esses dados em **decisão** (que indicadores mostrar à chefia, ao munícipe, à auditoria)

---

## Estrutura do módulo

| Aula | Pergunta-chave | O que se faz |
|------|---------------|--------------|
| **Aula 9 — Do Excel ao Dashboard** | "Como faço um dashboard?" | Importar Excel/CSV, Power Query básico, primeiras visualizações |
| **Aula 10 — Da Tabela ao Modelo** | "Como junto dados de várias fontes?" | Power Query avançado, modelo de dados, **DAX mínimo**, categoria de dados |
| **Aula 11 — Do Dashboard ao Munícipe** | "Como partilho com segurança?" | Visualizações avançadas, Top N, Power BI Service, RGPD, governança |

---

## Os três componentes do Power BI

| Componente | Onde corre | Para quê |
|---|---|---|
| **Power BI Desktop** | Windows (gratuito) | **Criar** — onde se ligam dados, transformam, modelam, desenham relatórios |
| **Power BI Service** | Cloud (`app.powerbi.com`) | **Partilhar** — onde se publicam relatórios, agendam refreshes, gerem permissões |
| **Power BI Mobile** | iOS / Android | **Consumir** — chefias e técnicos consultam dashboards no telemóvel |

Regra: **cria-se no Desktop, vive-se no Service, consulta-se no Mobile**.

---

## Conceitos rápidos

| Conceito | O que é | Exemplo AP |
|----------|---------|------------|
| **Dataset / Modelo Semântico** | Conjunto de tabelas relacionadas + medidas | Tabela Atendimento + Tabela Funcionário + Tabela Departamento |
| **Relatório (Report)** | Multi-página com visuais interactivos | Painel "Indicadores DIMSI 2025/2026" |
| **Dashboard** | Página única no Service que junta tiles de vários relatórios | Painel executivo do Vereador |
| **Visual** | Gráfico, tabela, cartão, slicer | Cartão "Total atendimentos hoje" |
| **Medida** | Cálculo agregado escrito em DAX | `Total = SUM(Atendimento[Duração])` |
| **Slicer** | Filtro interactivo no relatório | Lista pendente "Departamento" |
| **Workspace** | Pasta no Service onde se publica | "DIMSI — Indicadores 2025" |

---

## Workflow padrão — 5 passos

Todos os relatórios seguem a mesma sequência:

1. **Get** — ligar a fontes de dados (Excel, CSV, SQL, Web)
2. **Transform** — limpar e moldar com Power Query (remover lixo, mudar tipos, juntar tabelas)
3. **Model** — definir relacionamentos entre tabelas e medidas DAX
4. **Visualize** — desenhar o relatório com gráficos, cartões, mapas
5. **Publish** — enviar para o Power BI Service e partilhar com a organização

!!! warning "Não saltar o Power Query"
    A tentação do iniciante é ligar o Excel e ir directo para os gráficos. Faça **sempre** uma passagem pelo Power Query: confirmar tipos de coluna, remover linhas em branco, formatar nomes. Cinco minutos aqui poupam horas a depurar visuais depois.

---

## Notação Chen → Modelo Power BI

A ponte com o módulo E-R: o **modelo conceptual** (Chen, com losangos) que aprendeu transforma-se num **modelo analítico** (star schema) no Power BI.

| Modelo E-R operacional | Modelo Power BI analítico |
|---|---|
| Normalizado (3FN) | Desnormalizado (estrela) |
| Várias tabelas pequenas (Pessoa, Morada, Contacto) | Uma tabela "achatada" Dim_Munícipe |
| Optimizado para INSERT/UPDATE | Optimizado para leitura e agregação |
| Relações fortes (FK + integridade) | Relações lógicas para propagar filtros |

Em Power BI, organize o modelo em **estrela**: uma tabela **facto** central (eventos: atendimentos, contratos, processos) ligada a várias **dimensões** (Munícipe, Data, Departamento, Tipo).

!!! tip "Regra prática"
    Se a sua tabela tem **valores numéricos para somar** (€, durações, contagens) → é provável que seja **facto**. Se descreve **contexto** (nomes, categorias, datas) → é **dimensão**.

---

## Datasets sugeridos para praticar

**Da Câmara Municipal de Vila Feliz** (datasets sintéticos, fornecidos pelo docente):

- `eventos-vila-feliz.xlsx` — gestão de eventos culturais (Evento, Espaço, Artista, Patrocinador)
- `atendimento-vila-feliz.xlsx` — atendimento ao munícipe (Data, Canal, Departamento, Tempo)

**Datasets reais portugueses** (usados nas fichas práticas):

- [**dados.gov.pt**](https://dados.gov.pt) — portal central de dados abertos
- [**Portal BASE**](https://www.base.gov.pt) — contratos públicos (a usar na Ficha 02/05)
- [**PORDATA Municípios**](https://www.pordata.pt/municipios) — séries comparáveis por município
- [**INE**](https://www.ine.pt) — Censos, despesa, RH AP local
- [**Mais Transparência**](https://transparencia.gov.pt) — indicadores municipais

---

## Considerações para Administração Pública

!!! warning "RGPD e dados pessoais"
    Quando os dados contêm informação pessoal (NIF, nome, morada), aplica-se o RGPD. Em particular:

    - **Minimizar** — só importar as colunas necessárias para o relatório
    - **Pseudonimizar** — substituir NIFs por códigos quando possível
    - **Sensitivity Labels** (Microsoft Purview) — etiquetar relatórios como "Confidencial — RGPD"
    - **NUNCA** usar `Publish to Web` (gera URL pública sem autenticação) — a CISA recomenda explicitamente desactivar esta funcionalidade em organismos públicos

---

## Próximo passo

[Aula 9 — Do Excel ao Dashboard :material-arrow-right:](aula-09.md){ .md-button .md-button--primary }
