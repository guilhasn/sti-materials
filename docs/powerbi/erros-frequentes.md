# Erros Frequentes — Anti-padrões em Power BI

Catálogo dos erros mais comuns que os iniciantes cometem em Power BI, com exemplos concretos e correcções. Use como consulta rápida quando algo não está a correr bem.

---

## A. Erros de importação e Power Query

### A1. Saltar o Power Query

!!! danger "Errado"
    Clicar em **Carregar** logo no Navegador e ir directo aos gráficos.

**Problema**: tipos de coluna ficam errados (datas como texto, números como texto), espaços extra escondem-se, lixo persiste no modelo. Quando vir o resultado nos visuais, não sabe se o erro é dos dados ou do gráfico.

!!! success "Correcto"
    **Sempre** clicar em **Transformar Dados** primeiro. Nem que seja só para confirmar tipos. Cinco minutos aqui poupam horas a depurar.

---

### A2. Datas portuguesas tratadas como inglês

!!! danger "Errado"
    Importar Excel com datas no formato `DD/MM/AAAA` e o Power BI interpretar como `MM/DD/AAAA` — `01/03/2025` vira "1 de Março" em vez de "3 de Janeiro" (ou vice-versa).

**Problema**: meses errados destroem qualquer análise temporal.

!!! success "Correcto"
    Botão direito na coluna → **Change Type → Using Locale** → escolher **Português (Portugal)**.

---

### A3. Tipo errado deixado por defeito

!!! danger "Errado"
    Coluna `NIF` carregada como **número inteiro** (perde os zeros à esquerda) ou coluna `Quantidade` carregada como **texto** (não soma).

**Problema**: cálculos não funcionam, ou perde-se dígitos significativos.

!!! success "Correcto"
    Verificar **manualmente** o tipo de cada coluna no Power Query (ícone à esquerda do nome). Regra: NIFs e códigos com zeros → **Texto**; valores numéricos para somar → **Número**.

---

### A4. Não tratar `null` como deveria ser

!!! danger "Errado"
    Numa Conditional Column, no campo Valor escrever `null` como texto.

**Problema**: o Power Query procura literalmente o **texto** "null" (4 caracteres) — nunca encontra o valor `null` real.

!!! success "Correcto"
    Clicar no ícone do menu pendente (ABC/123) à esquerda do campo Valor → escolher **null** como tipo de valor.

---

### A5. Edição manual no Excel em vez de Power Query

!!! danger "Errado"
    Ver que a coluna está suja → abrir o Excel → corrigir manualmente → voltar a importar.

**Problema**: no próximo mês, quando o Excel for actualizado, o trabalho perde-se. Repete-se eternamente.

!!! success "Correcto"
    Fazer a limpeza **em Power Query**. Cada passo fica registado em **Applied Steps** — quando o Excel for refreshado, todos os passos repetem-se automaticamente.

---

## B. Erros de modelação

### B1. Tabela única achatada

!!! danger "Errado"
    Importar uma só tabela com tudo: nome do munícipe, departamento, atendimento, data, observações. 50 colunas, 200.000 linhas.

**Problema**: filtros ficam confusos, performance má, não há reutilização. Quem quiser saber "quantos atendimentos por departamento" tem de fazer DAX complexo.

!!! success "Correcto"
    **Star Schema**: tabela facto `Atendimentos` (eventos, IDs, métricas) + dimensões `Munícipe`, `Departamento`, `Data`. Relacionar por chaves.

---

### B2. Direcção do filtro bidireccional desnecessária

!!! danger "Errado"
    Mudar a direcção do filtro para **Both** (bidireccional) "para garantir que tudo filtra tudo".

**Problema**: cria caminhos ambíguos, o Power BI gere mal os filtros, performance cai, pode causar resultados inesperados.

!!! success "Correcto"
    Manter **Single** (default). Bidireccional só quando há razão concreta — e é raro em modelos AP simples.

---

### B3. Não marcar Date Table

!!! danger "Errado"
    Ter uma coluna `Data` na tabela Atendimentos e usá-la directamente como eixo temporal.

**Problema**: dias sem atendimentos **desaparecem do gráfico** (continuidade quebrada). Funções de inteligência temporal podem dar resultados incorrectos.

!!! success "Correcto"
    Criar uma **Date Table** com todos os dias do ano (via Power Query ou auto-date) e marcá-la como **Date Table** (botão direito → *Mark as Date Table*).

---

## C. Erros de visualização

### C1. Pie chart com 10+ categorias

!!! danger "Errado"
    Usar gráfico circular (pie/donut) para mostrar 12 departamentos.

**Problema**: o cérebro humano tem dificuldade em comparar fatias de pizza pequenas. Impossível ver qual é maior entre fatias de 7% e 8%.

!!! success "Correcto"
    **Barras horizontais ordenadas por valor**. Para 6+ categorias é sempre superior ao pie. Se mesmo assim quiser pie, use **donut com total ao centro** e máximo 5 fatias.

---

### C2. Gráfico de colunas com eixo Y truncado

!!! danger "Errado"
    Mostrar duas colunas: `99%` e `100%`. Por defeito o Power BI pode truncar o eixo a `98%`, fazendo parecer que `100%` é o dobro de `99%`.

**Problema**: distorce visualmente as diferenças.

!!! success "Correcto"
    Eixos numéricos devem **começar em 0** quase sempre. Se quiser destacar a diferença, use uma medida `Diferença = [b] - [a]` e mostre apenas a diferença.

---

### C3. Demasiadas cores

!!! danger "Errado"
    Cada coluna do gráfico com uma cor diferente. Legenda com 12 entradas.

**Problema**: cor a mais é ruído. O cérebro não distingue 12 cores.

!!! success "Correcto"
    **3-5 cores no máximo.** Reservar cor **forte para o que importa** destacar; outras categorias em tons de cinzento ou neutros.

---

### C4. 3D, sombras, gradientes

!!! danger "Errado"
    Activar 3D no gráfico de colunas "para ficar mais bonito".

**Problema**: distorce as proporções, dificulta leitura, é pura decoração (chartjunk).

!!! success "Correcto"
    **Sempre 2D, sempre liso**. Edward Tufte chama-lhe "data-ink ratio" — cada pixel deve transportar informação.

---

### C5. Mapa quando uma tabela chega

!!! danger "Errado"
    Mostrar um mapa só para indicar 3 valores por distrito.

**Problema**: mapa é pesado, lento, e para 3 valores uma tabela ordenada é muito mais legível.

!!! success "Correcto"
    Mapas são úteis quando há **densidade ou distribuição espacial significativa** (ex.: 18 distritos com ocorrências). Para poucos valores, **tabela** ou **barras**.

---

## D. Erros DAX

### D1. Confundir Coluna Calculada com Medida

!!! danger "Errado"
    Criar `Total Vendas` como coluna calculada, depois arrastar para um cartão e ver `Sum of Total Vendas` em todas as linhas somadas.

**Problema**: coluna calculada é por linha — fica gravada e ocupa memória; numa medida agregada é diferente.

!!! success "Correcto"
    Para **KPIs agregados**, use **Medida**. Para **valor por linha**, use coluna calculada (ou Power Query Custom Column).

---

### D2. Usar `/` em vez de `DIVIDE`

!!! danger "Errado"
    `Margem = [Lucro] / [Vendas]`

**Problema**: quando `[Vendas] = 0`, dá erro (`Infinity` ou `NaN`). O cartão fica feio com erro vermelho.

!!! success "Correcto"
    `Margem = DIVIDE([Lucro], [Vendas])` — devolve em branco em vez de erro. Limpo no visual.

---

### D3. Reescrever em DAX o que Power Query faz melhor

!!! danger "Errado"
    Criar coluna calculada DAX `Total = [Preço] * [Quantidade]` quando este cálculo é simples e linha-a-linha.

**Problema**: ocupa memória no modelo, é menos eficiente que a alternativa.

!!! success "Correcto"
    **Power Query → Custom Column** com `[Preço] * [Quantidade]`. Calcula uma vez ao carregar, comprime melhor, mais rápido.

    DAX só para **medidas agregadas** (KPIs) ou cálculos que atravessam relações.

---

### D4. Tentar usar CALCULATE / FILTER sem entender contextos

!!! danger "Errado"
    Copiar do StackOverflow uma fórmula com `CALCULATE(SUM(...), FILTER(ALL(...), ...))` sem perceber.

**Problema**: muitas vezes funciona "por acidente", outras dá resultados errados sem dar erro visível. Difícil debugar sem saber teoria.

!!! success "Correcto"
    No nível iniciante, fique pelas **5 funções essenciais** (SUM, AVERAGE, COUNT, COUNTROWS, DIVIDE). Se precisa de CALCULATE, é sinal de pedir ajuda ou estudar mais.

---

## E. Erros de partilha e governança

### E1. Publish to Web com dados sensíveis

!!! danger "Errado — pode ser ilegal"
    Usar **File → Publish to Web** num relatório com dados de munícipes.

**Problema**: gera um URL **público sem autenticação**. Qualquer pessoa com o link vê os dados, incluindo motores de busca. Já houve casos reais de municípios a expor PII e dados de saúde por engano.

!!! success "Correcto"
    **Bloquear globalmente** Publish to Web nas Tenant Settings. Para partilhar com público, use **Embed in Reports → Secure embed** ou outro mecanismo autenticado.

---

### E2. Usar My Workspace para produção

!!! danger "Errado"
    Publicar relatórios oficiais em **My Workspace** (espaço pessoal).

**Problema**: ninguém mais tem acesso. Quando o autor sair da câmara, tudo se perde.

!!! success "Correcto"
    Sempre publicar em **workspace partilhado** (criado para a divisão/projecto). Vários membros têm acesso, gestão centralizada.

---

### E3. Sem Sensitivity Label

!!! danger "Errado"
    Publicar relatório com NIFs, moradas, dados pessoais — sem qualquer etiqueta.

**Problema**: utilizador exporta para Excel, partilha por email, sai do controlo. Sem etiqueta, não há rasto.

!!! success "Correcto"
    Aplicar Sensitivity Label "Confidencial — RGPD" no Service. A etiqueta acompanha o ficheiro mesmo exportado.

---

### E4. Esquecer de configurar refresh

!!! danger "Errado"
    Publicar relatório e nunca configurar **Scheduled Refresh**.

**Problema**: dados ficam congelados na data de publicação. Daqui a um mês, os números estão desactualizados — mas ninguém repara.

!!! success "Correcto"
    No Service → Modelo Semântico → **Settings → Scheduled refresh** → activar. Configurar horário e notificações de falha por email.

---

## F. Outros erros comuns

### F1. Não usar Mobile Layout

!!! danger "Errado"
    Vereador tenta abrir relatório no telemóvel. Letra minúscula, gráficos esmagados.

!!! success "Correcto"
    No Desktop → **View → Mobile Layout** → reorganizar visuais em formato vertical.

---

### F2. Ficheiro `.pbix` no email

!!! danger "Errado"
    Enviar `relatorio.pbix` por email.

**Problema**: contém os dados embebidos. Pode estar a partilhar dados sensíveis sem perceber. Email não é canal seguro.

!!! success "Correcto"
    Publicar no Service e partilhar **link**, ou usar **Apps**. O `.pbix` fica no autor.

---

### F3. Esquecer de fazer Refresh no Desktop após mudar dados

!!! danger "Errado"
    Adicionar linhas ao Excel fonte → abrir Power BI → ver os números antigos.

!!! success "Correcto"
    `Home → Refresh` para recarregar das fontes. Power BI Desktop **não actualiza automaticamente** quando o Excel muda.

---

## Checklist antes de partilhar

Antes de publicar/partilhar um relatório, percorra esta lista:

- [ ] Todas as colunas têm o **tipo certo**?
- [ ] Não há **datas em formato errado** (PT vs EN)?
- [ ] **Star schema** organizado (facto + dimensões)?
- [ ] **Relacionamentos** entre tabelas correctos?
- [ ] **Categoria de Dados** marcada para colunas geográficas e URLs de imagem?
- [ ] Visuais com **tipo apropriado** ao dado (não pie com 10 categorias)?
- [ ] **Cores intencionais** (3-5, não decorativas)?
- [ ] **Mobile Layout** criado se for para telemóvel?
- [ ] **Sensitivity Label** aplicada se há dados pessoais?
- [ ] Publicar em **workspace partilhado** (não My Workspace)?
- [ ] **Refresh agendado** configurado?
- [ ] **Publish to Web** desactivado?
- [ ] Distribuir via **App** com audiências definidas?

Se respondeu **sim** a todas — está pronto para partilhar.
