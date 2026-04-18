// Gerador de worksheets .docx para o modulo E-R
// Usa docx (npm install -g docx)

const docxPath = require('path').join(process.env.APPDATA, 'npm', 'node_modules', 'docx');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, PageOrientation, LevelFormat,
  HeadingLevel, BorderStyle, WidthType, ShadingType,
  PageNumber, PageBreak, TabStopType, TabStopPosition
} = require(docxPath);
const fs = require('fs');
const path = require('path');

// ==== CONSTANTES DE PÁGINA A4 ====
const A4_W = 11906;
const A4_H = 16838;
const MARGIN = 1134; // 2cm
const CW = A4_W - 2 * MARGIN; // 9638 DXA content width

// ==== CORES (tema MkDocs Material primary) ====
const DARK_BLUE = "1F3864";
const LIGHT_BLUE = "DCE6F1";
const LIGHT_GREY = "F2F2F2";

// ==== HELPERS ====
const border = () => ({ style: BorderStyle.SINGLE, size: 4, color: "AAAAAA" });
const borders = () => ({ top: border(), bottom: border(), left: border(), right: border() });
const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };

function P(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 80 },
    alignment: opts.align,
    children: [new TextRun({
      text: text ?? "",
      bold: opts.bold,
      italics: opts.italic,
      size: opts.size,
      color: opts.color,
    })],
  });
}
function PMulti(runs, opts = {}) {
  return new Paragraph({ spacing: { after: opts.after ?? 80 }, alignment: opts.align, children: runs });
}
function space(after = 200) { return new Paragraph({ spacing: { after }, children: [new TextRun("")] }); }

function H1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 200, after: 200 },
    children: [new TextRun({ text, bold: true, size: 36, color: DARK_BLUE })],
  });
}
function H2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 220, after: 140 },
    children: [new TextRun({ text, bold: true, size: 28, color: DARK_BLUE })],
  });
}
function H3(text) {
  return new Paragraph({
    spacing: { before: 160, after: 100 },
    children: [new TextRun({ text, bold: true, size: 24, color: DARK_BLUE })],
  });
}

function headerCell(text, width, fontSize = 20) {
  return new TableCell({
    borders: borders(),
    width: { size: width, type: WidthType.DXA },
    shading: { fill: DARK_BLUE, type: ShadingType.CLEAR },
    margins: cellMargins,
    children: [new Paragraph({
      children: [new TextRun({ text, bold: true, color: "FFFFFF", size: fontSize })],
    })],
  });
}
function cell(text, width, opts = {}) {
  const sz = opts.size ?? 20;
  const paras = String(text ?? "").split("\n").map(line =>
    new Paragraph({ children: [new TextRun({ text: line, size: sz, bold: opts.bold })] })
  );
  return new TableCell({
    borders: borders(),
    width: { size: width, type: WidthType.DXA },
    shading: opts.fill ? { fill: opts.fill, type: ShadingType.CLEAR } : undefined,
    margins: opts.tight ? { top: 40, bottom: 40, left: 80, right: 80 } : cellMargins,
    children: paras,
  });
}
function emptyCell(width, height = 300) {
  return new TableCell({
    borders: borders(),
    width: { size: width, type: WidthType.DXA },
    margins: cellMargins,
    children: [new Paragraph({ children: [new TextRun("")], spacing: { after: height } })],
  });
}

function makeTable(headers, widths, dataRows = [], blankRows = 0, opts = {}) {
  const hdrSize = opts.headerSize ?? 20;
  const cellSize = opts.cellSize ?? 20;
  const tight = !!opts.tight;
  const rows = [];
  rows.push(new TableRow({
    tableHeader: true,
    children: headers.map((h, i) => headerCell(h, widths[i], hdrSize)),
  }));
  dataRows.forEach(r => {
    rows.push(new TableRow({
      children: r.map((v, i) => cell(v, widths[i], { size: cellSize, tight })),
    }));
  });
  for (let i = 0; i < blankRows; i++) {
    rows.push(new TableRow({
      children: widths.map(w => emptyCell(w)),
    }));
  }
  return new Table({
    width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    columnWidths: widths,
    rows,
  });
}

// linhas em branco simples para texto manuscrito
function blankLines(n = 4) {
  const lines = [];
  for (let i = 0; i < n; i++) {
    lines.push(new Paragraph({
      spacing: { after: 120 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA", space: 1 } },
      children: [new TextRun("")],
    }));
  }
  return lines;
}

// caixa cinzenta com dica
function hint(text) {
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [CW],
    rows: [new TableRow({
      children: [new TableCell({
        borders: borders(),
        width: { size: CW, type: WidthType.DXA },
        shading: { fill: LIGHT_GREY, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 200, right: 200 },
        children: [new Paragraph({
          children: [new TextRun({ text: "Pergunta-guia: ", bold: true, color: DARK_BLUE, size: 20 }),
                     new TextRun({ text, size: 20 })],
        })],
      })],
    })],
  });
}

// ==== CABEÇALHO E RODAPÉ ====
function buildHeader(worksheetTitle) {
  const nameLine = new Paragraph({
    tabStops: [
      { type: TabStopType.LEFT, position: 3600 },
      { type: TabStopType.LEFT, position: 6400 },
      { type: TabStopType.LEFT, position: 8800 },
    ],
    children: [
      new TextRun({ text: "Nome: ", bold: true, size: 20 }),
      new TextRun({ text: "_______________________________\t", size: 20 }),
      new TextRun({ text: "Nº: ", bold: true, size: 20 }),
      new TextRun({ text: "__________\t", size: 20 }),
      new TextRun({ text: "Data: ", bold: true, size: 20 }),
      new TextRun({ text: "___ / ___ / _____", size: 20 }),
    ],
  });
  const subtitle = new Paragraph({
    alignment: AlignmentType.RIGHT,
    spacing: { after: 60 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: DARK_BLUE, space: 4 } },
    children: [new TextRun({ text: worksheetTitle, italics: true, size: 18, color: DARK_BLUE })],
  });
  return new Header({ children: [nameLine, subtitle] });
}
function buildFooter() {
  return new Footer({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      border: { top: { style: BorderStyle.SINGLE, size: 4, color: DARK_BLUE, space: 4 } },
      children: [
        new TextRun({ text: "STI — MAP — 2025/2026    |    Página ", size: 16, color: "666666" }),
        new TextRun({ children: [PageNumber.CURRENT], size: 16, color: "666666" }),
        new TextRun({ text: " de ", size: 16, color: "666666" }),
        new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, color: "666666" }),
      ],
    })],
  });
}

// ==== CONSTRUTOR DE FASES (reutilizável) ====
// cada fase: título + descrição + pergunta-guia (opcional) + tabela/espaço

function fase1(rows = []) {
  return [
    H2("Fase 1 — Determinar entidades"),
    P("Liste as entidades que identifica no cenário. Uma entidade representa algo que existe independentemente (pessoa, objecto, evento) e sobre a qual queremos guardar dados."),
    hint("Que «coisas» o cenário descreve? Cada uma pode tornar-se uma entidade?"),
    space(120),
    makeTable(["Entidade", "Descrição curta"], [3200, 6438], rows, Math.max(1, 6 - rows.length)),
    space(),
  ];
}
function fase2(rows = []) {
  return [
    H2("Fase 2 — Desenhar DER simplificado"),
    P("Liste as relações entre pares de entidades, sem atributos ainda. Pode esboçar o diagrama em papel ou começar no ERDPlus."),
    hint("Entre que entidades existe ligação? Use um verbo curto para dar nome à relação."),
    space(120),
    makeTable(["Relação (verbo)", "Entidade A", "Entidade B"], [3200, 3200, 3238], rows, Math.max(1, 5 - rows.length)),
    space(),
  ];
}
function fase3(examples = [], opts = {}) {
  const isSolution = !!opts.solution;
  const out = [
    H2("Fase 3 — Definir pressupostos"),
    P("Um pressuposto é uma regra de negócio explícita que justifica as cardinalidades. Escreva frases claras do tipo «Cada X tem um Y» ou «Um Z pode ter vários W»."),
    hint("O que é obrigatório? O que é opcional? Qual é o máximo de ligações em cada lado?"),
    space(120),
  ];
  examples.forEach((ex, i) => {
    out.push(new Paragraph({
      spacing: { after: 120 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA", space: 1 } },
      children: [new TextRun({
        text: `${i + 1}. ${ex}`,
        italics: !isSolution,
        size: 22,
        color: isSolution ? "000000" : "555555",
      })],
    }));
  });
  if (!isSolution) {
    const blanks = Math.max(1, 7 - examples.length);
    for (let i = 0; i < blanks; i++) {
      out.push(new Paragraph({
        spacing: { after: 120 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA", space: 1 } },
        children: [new TextRun({ text: `${examples.length + i + 1}.`, size: 22 })],
      }));
    }
  }
  out.push(space());
  return out;
}
function fase4(rows = []) {
  return [
    H2("Fase 4 — Desenhar DER completo"),
    P("Para cada entidade indique os atributos, a chave primária candidata e as cardinalidades das suas relações (1:1, 1:N, M:N) com indicação de obrigatoriedade."),
    hint("Desenhe no ERDPlus com atributos em elipses, chave sublinhada e cardinalidades nas linhas da relação."),
    space(120),
    makeTable(
      ["Entidade", "Atributos", "PK candidata", "Cardinalidades"],
      [2000, 3638, 1600, 2400],
      rows, Math.max(1, 5 - rows.length)
    ),
    space(),
  ];
}
// Bloco estruturado para UMA relação dentro da Fase 5
function fase5RelBlock(n) {
  return [
    new Paragraph({
      spacing: { before: 200, after: 80 },
      shading: { fill: LIGHT_BLUE, type: ShadingType.CLEAR },
      children: [new TextRun({ text: `  Relação ${n}:  ________________________________________________________________`, bold: true, size: 22, color: DARK_BLUE })],
    }),
    P("Passo A — Tentativa: coloque a FK no lado mais natural e escreva 3 linhas com dados plausíveis.", { bold: true, size: 20 }),
    makeTable(["", "", "", ""], [2410, 2410, 2409, 2409], [], 3),
    space(80),
    P("Passo B — Observe a tabela:", { bold: true, size: 20 }),
    new Paragraph({
      spacing: { after: 80 },
      children: [new TextRun({ text: "☐  Há células vazias (NULLs)?          ☐  Há linhas repetidas?", size: 20 })],
    }),
    P("Passo C — Decisão:", { bold: true, size: 20 }),
    new Paragraph({
      spacing: { after: 80 },
      children: [new TextRun({ text: "☐  Tudo limpo → ficam 2 tabelas          ☐  Criar tabela associativa: _______________________ → 3 tabelas", size: 20 })],
    }),
    P("Passo D — Regra aplicada: Regra _____", { bold: true, size: 20 }),
    space(200),
  ];
}

function fase5(numRelations = 3) {
  const blocks = [];
  for (let i = 1; i <= numRelations; i++) {
    blocks.push(...fase5RelBlock(i));
  }
  return [
    H2("Fase 5 — Determinar tabelas (abordagem intuitiva)"),
    P("Para cada relação, aplique o método em 4 passos: (A) tentativa com 3 linhas de dados reais; (B) observação de vazios ou repetições; (C) decisão; (D) nome da regra."),
    PMulti([
      new TextRun({ text: "Lembrete rápido: ", bold: true, size: 20 }),
      new TextRun({ text: "tudo limpo → ", size: 20 }),
      new TextRun({ text: "Regra 4 (2 tabelas)", bold: true, size: 20, color: DARK_BLUE }),
      new TextRun({ text: "   |   NULLs → ", size: 20 }),
      new TextRun({ text: "Regra 5 (3 tabelas)", bold: true, size: 20, color: DARK_BLUE }),
      new TextRun({ text: "   |   repetições → ", size: 20 }),
      new TextRun({ text: "Regra 6 (3 tabelas)", bold: true, size: 20, color: DARK_BLUE }),
    ]),
    space(120),
    ...blocks,
  ];
}

// Bloco de Fase 5 com solução completa (usado em worksheets "com solução")
function fase5SolBlock(s) {
  return [
    new Paragraph({
      spacing: { before: 200, after: 80 },
      shading: { fill: LIGHT_BLUE, type: ShadingType.CLEAR },
      children: [new TextRun({ text: `  Relação: ${s.nome}`, bold: true, size: 22, color: DARK_BLUE })],
    }),
    new Paragraph({
      spacing: { after: 80 },
      children: [
        new TextRun({ text: "Passo A — Tentativa: ", bold: true, size: 20 }),
        new TextRun({ text: s.tentativa, size: 20 }),
      ],
    }),
    makeTable(s.headers, [2410, 2410, 2409, 2409], s.rows, 0),
    space(80),
    new Paragraph({
      spacing: { after: 60 },
      children: [
        new TextRun({ text: "Passo B — Observação: ", bold: true, size: 20 }),
        new TextRun({ text: (s.temNull ? "☑" : "☐") + "  Há NULLs?     ", size: 20 }),
        new TextRun({ text: (s.temRep ? "☑" : "☐") + "  Há repetições?", size: 20 }),
      ],
    }),
    new Paragraph({
      spacing: { after: 60 },
      children: [
        new TextRun({ text: "Passo C — Decisão: ", bold: true, size: 20 }),
        new TextRun({ text: (!s.decisao3 ? "☑" : "☐") + "  Fica assim (2 tabelas)     ", size: 20 }),
        new TextRun({ text: (s.decisao3 ? "☑" : "☐") + `  Criar tabela associativa: ${s.assoc || "—"} (3 tabelas)`, size: 20 }),
      ],
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [
        new TextRun({ text: "Passo D — Regra aplicada: ", bold: true, size: 20 }),
        new TextRun({ text: `Regra ${s.regra}`, bold: true, size: 20, color: DARK_BLUE }),
        ...(s.nota ? [new TextRun({ text: `  (${s.nota})`, italics: true, size: 20 })] : []),
      ],
    }),
  ];
}

function fase5Sol(scenarios) {
  return [
    H2("Fase 5 — Determinar tabelas (abordagem intuitiva)"),
    P("Solução passo-a-passo para cada relação, seguindo o método: (A) tentativa com dados; (B) observação; (C) decisão; (D) nome da regra."),
    space(120),
    ...scenarios.flatMap(s => fase5SolBlock(s)),
  ];
}
function fase6(rows = []) {
  return [
    H2("Fase 6 — Determinar chaves candidatas"),
    P("Para cada tabela, identifique os atributos (ou combinações) que podem identificar univocamente uma linha."),
    hint("Que atributos são únicos por natureza? Qual serve para distinguir linhas sem ambiguidade?"),
    space(120),
    makeTable(["Tabela", "Chaves candidatas"], [3200, 6438], rows, Math.max(1, 6 - rows.length)),
    space(),
  ];
}
function fase7(rows = []) {
  return [
    H2("Fase 7 — Determinar chaves primárias"),
    P("Escolha a PK de cada tabela entre as chaves candidatas. Justifique a escolha (estabilidade, simplicidade, comprimento)."),
    hint("Prefira códigos internos a dados que podem mudar (ex.: CC, email). Simples vence compostas sempre que possível."),
    space(120),
    makeTable(["Tabela", "PK escolhida", "Justificação"], [2400, 2800, 4438], rows, Math.max(1, 6 - rows.length)),
    space(),
  ];
}
function fase8(schema = []) {
  const out = [
    H2("Fase 8 — Definir tabelas finais (esquema relacional)"),
    P("Escreva o esquema relacional final na notação TABELA(pk, atributo, #fk). Sublinhe a chave primária e prefixe as chaves estrangeiras com #."),
    hint("Uma linha por tabela. As FKs apontam para as PKs das tabelas referenciadas."),
    space(120),
  ];
  if (schema.length) {
    schema.forEach(line => {
      out.push(new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun({ text: line, font: "Consolas", size: 22, color: DARK_BLUE })],
      }));
    });
  } else {
    out.push(...blankLines(10));
  }
  out.push(space());
  return out;
}
function fase9(rows = [], entidade = "") {
  const heading = entidade
    ? `Fase 9 — Definir domínio dos atributos (entidade ${entidade})`
    : "Fase 9 — Definir domínio dos atributos (entidade principal)";
  return [
    H2(heading),
    P("Para a entidade mais central do modelo, defina o tipo de dados, obrigatoriedade e restrições de cada atributo."),
    hint("Tipos comuns: INTEGER, VARCHAR(n), DATE, DECIMAL(p,s), TEXT, BOOLEAN."),
    space(120),
    makeTable(
      ["Atributo", "Tipo", "Obrigatório", "Restrição"],
      [2800, 2600, 1600, 2638],
      rows, Math.max(1, 7 - rows.length)
    ),
    space(),
  ];
}

function contextoSection(contextoHtml, dadosHeaders, dadosRows, opts = {}) {
  const out = [H2("Contexto")];
  contextoHtml.forEach(p => out.push(P(p, { italic: true })));
  if (dadosHeaders) {
    out.push(H3("Dados actuais (exemplo)"));
    const n = dadosHeaders.length;
    // Fonte automaticamente menor para tabelas com muitas colunas
    const compact = n > 6;
    const widths = dadosHeaders.map(() => Math.floor(CW / n));
    const diff = CW - widths.reduce((a,b) => a+b, 0);
    widths[0] += diff;
    out.push(makeTable(dadosHeaders, widths, dadosRows, 0, {
      headerSize: compact ? 14 : 20,
      cellSize: compact ? 14 : 20,
      tight: compact,
    }));
    out.push(space());
  }
  return out;
}

// ==== CONTEÚDOS ====

const fasesAll = (opts = {}) => {
  const s = opts.scaffold || {};
  const isSol = !!opts.solution;
  return [
    ...fase1(s.f1),
    ...fase2(s.f2),
    ...fase3(s.f3, { solution: isSol }),
    ...fase4(s.f4),
    ...(isSol && s.f5 ? fase5Sol(s.f5) : fase5(opts.numRelations ?? 3)),
    ...fase6(s.f6),
    ...fase7(s.f7),
    ...fase8(isSol ? (s.f8 || []) : []),
    ...fase9(s.f9, s.f9entidade),
  ];
};

// --- TEMPLATE GENÉRICO ---
const templateDoc = {
  filename: "template-er.docx",
  headerTitle: "Template E-R — 9 Fases",
  sections: [
    H1("Template — Modelação E-R em 9 Fases"),
    P("Este template aplica-se a qualquer cenário de administração pública. Preencha o contexto, os dados actuais (se aplicável) e avance pelas nove fases pela ordem indicada."),
    space(),
    H2("Cenário"),
    P("Descreva em 2-3 frases o contexto do problema: organização, processo e dados actuais."),
    space(120),
    ...blankLines(6),
    space(),
    H3("Dados actuais (se aplicável)"),
    P("Se tiver uma folha Excel ou registo em papel, transcreva as colunas e 2-3 linhas exemplificativas abaixo.", { italic: true }),
    makeTable(["Coluna 1", "Coluna 2", "Coluna 3", "Coluna 4", "Coluna 5"],
              [1928, 1928, 1928, 1928, 1926], [], 4),
    space(),
    ...fasesAll(),
  ],
};

// --- SCAFFOLD DATA PER CASE (plumbing pré-preenchido) ---

// Nota pedagógica: apenas "plumbing" (continuidade entre fases) é pré-preenchido.
// Todo o raciocínio (cardinalidades, participações, tentativas Fase 5, PKs, justificações) fica em branco.

const scaffoldCaso1 = {
  f1: [["Leitor", ""], ["Livro", ""], ["Autor", ""]],
  f2: [["", "", ""], ["", "", ""]], // deixar em branco — identificar relações É pensamento
  f3: ["Cada leitor tem um código único e pode requisitar vários livros ao longo do tempo."],
  f4: [["Leitor", "", "", ""], ["Livro", "", "", ""], ["Autor", "", "", ""]],
  f6: [["Leitor", ""], ["Livro", ""], ["Autor", ""], ["Emprestimo", ""], ["Autoria", ""]],
  f7: [["Leitor", "", ""], ["Livro", "", ""], ["Autor", "", ""], ["Emprestimo", "", ""], ["Autoria", "", ""]],
  f9entidade: "Leitor",
  f9: [["codLeitor", "", "", ""], ["nome", "", "", ""], ["BI", "", "", ""],
       ["morada", "", "", ""], ["telefone", "", "", ""], ["email", "", "", ""]],
};

const scaffoldCaso2 = {
  f1: [["Requerente", ""], ["Processo", ""], ["Técnico", ""]],
  f3: ["Cada processo pertence a exactamente um requerente."],
  f4: [["Requerente", "", "", ""], ["Processo", "", "", ""], ["Técnico", "", "", ""]],
  f6: [["Requerente", ""], ["Processo", ""], ["Tecnico", ""], ["Parecer", ""]],
  f7: [["Requerente", "", ""], ["Processo", "", ""], ["Tecnico", "", ""], ["Parecer", "", ""]],
  f9entidade: "Processo",
  f9: [["numProcesso", "", "", ""], ["tipoObra", "", "", ""], ["descricao", "", "", ""],
       ["localizacao", "", "", ""], ["dataEntrada", "", "", ""], ["estado", "", "", ""],
       ["codRequerente (FK)", "", "", ""]],
};

const scaffoldCaso3 = {
  f1: [["Utente", ""], ["Refeição", ""], ["Voluntário", ""], ["Rota", ""]],
  f3: ["Cada utente pode receber várias refeições (uma ou duas por dia)."],
  f4: [["Utente", "", "", ""], ["Refeição", "", "", ""], ["Voluntário", "", "", ""], ["Rota", "", "", ""]],
  f6: [["Utente", ""], ["Refeicao", ""], ["Voluntario", ""], ["Rota", ""], ["Entrega", ""]],
  f7: [["Utente", "", ""], ["Refeicao", "", ""], ["Voluntario", "", ""], ["Rota", "", ""], ["Entrega", "", ""]],
  f9entidade: "Utente",
  f9: [["codUtente", "", "", ""], ["nome", "", "", ""], ["morada", "", "", ""],
       ["telefone", "", "", ""], ["contactoEmergencia", "", "", ""], ["restricoes", "", "", ""]],
};

const scaffoldCaso4 = {
  f1: [["Viatura", ""], ["Motorista", ""], ["Departamento", ""], ["Manutenção", ""]],
  f3: ["Cada viatura está atribuída a um departamento."],
  f4: [["Viatura", "", "", ""], ["Motorista", "", "", ""], ["Departamento", "", "", ""], ["Manutenção", "", "", ""]],
  f6: [["Viatura", ""], ["Motorista", ""], ["Departamento", ""], ["Manutencao", ""], ["Requisicao", ""]],
  f7: [["Viatura", "", ""], ["Motorista", "", ""], ["Departamento", "", ""], ["Manutencao", "", ""], ["Requisicao", "", ""]],
  f9entidade: "Viatura",
  f9: [["matricula", "", "", ""], ["marca", "", "", ""], ["modelo", "", "", ""],
       ["ano", "", "", ""], ["combustivel", "", "", ""], ["quilometragem", "", "", ""],
       ["estado", "", "", ""], ["codDepartamento (FK)", "", "", ""]],
};

// --- DADOS DE SOLUÇÃO COMPLETA (todos os pontos pré-preenchidos) ---

const solucaoCaso1 = {
  f1: [
    ["Leitor", "Pessoa registada na biblioteca"],
    ["Livro", "Obra do acervo"],
    ["Autor", "Quem escreveu a obra"],
  ],
  f2: [
    ["requisita", "Leitor", "Livro"],
    ["escreve", "Autor", "Livro"],
  ],
  f3: [
    "Cada leitor tem um código único e pode requisitar vários livros ao longo do tempo.",
    "Um livro pode ser requisitado por vários leitores (em datas diferentes).",
    "Um livro tem pelo menos um autor; pode ter vários co-autores.",
    "Um autor pode escrever vários livros.",
    "Nem todo leitor tem empréstimo activo; nem todo livro está emprestado.",
    "O mesmo leitor pode requisitar o mesmo livro em datas diferentes.",
  ],
  f4: [
    ["Leitor", "codLeitor, nome, BI, morada, telefone, email", "codLeitor", "requisita Livro (M:N)"],
    ["Livro", "ISBN, titulo, anoPublicacao, editora, numExemplares", "ISBN", "requisitado (M:N); escrito (M:N)"],
    ["Autor", "codAutor, nome, nacionalidade", "codAutor", "escreve Livro (M:N)"],
  ],
  f5: [
    {
      nome: "Leitor ↔ Livro (M:N)",
      tentativa: "Colocar ISBN na tabela LEITOR:",
      headers: ["codLeitor", "nome", "BI", "ISBN"],
      rows: [
        ["1", "Ana Costa", "12345678", "978-85-01-1"],
        ["1", "Ana Costa", "12345678", "978-972-1"],
        ["2", "João Silva", "87654321", "978-85-01-1"],
      ],
      temNull: false, temRep: true,
      decisao3: true, assoc: "Empréstimo", regra: 6,
      nota: "M:N exige sempre tabela associativa",
    },
    {
      nome: "Autor ↔ Livro (M:N)",
      tentativa: "Colocar codAutor na tabela LIVRO:",
      headers: ["ISBN", "titulo", "ano", "codAutor"],
      rows: [
        ["978-85-01-1", "Dom Casmurro", "1899", "10"],
        ["978-99-01", "Obra Conjunta", "2020", "10"],
        ["978-99-01", "Obra Conjunta", "2020", "11"],
      ],
      temNull: false, temRep: true,
      decisao3: true, assoc: "Autoria", regra: 6,
    },
  ],
  f6: [
    ["Leitor", "codLeitor; BI"],
    ["Livro", "ISBN"],
    ["Autor", "codAutor"],
    ["Empréstimo", "(codLeitor, ISBN, dataEmprestimo)"],
    ["Autoria", "(codAutor, ISBN)"],
  ],
  f7: [
    ["Leitor", "codLeitor", "Código interno estável; BI pode mudar (CC novo)"],
    ["Livro", "ISBN", "Identificador internacional único"],
    ["Autor", "codAutor", "Código interno; nomes podem repetir-se"],
    ["Empréstimo", "(codLeitor, ISBN, dataEmprestimo)", "Mesmo leitor pode requisitar mesmo livro em datas distintas"],
    ["Autoria", "(codAutor, ISBN)", "Um autor só co-assina uma vez o mesmo livro"],
  ],
  f8: [
    "Leitor(codLeitor, nome, BI, morada, telefone, email)",
    "Livro(ISBN, titulo, anoPublicacao, editora, numExemplares)",
    "Autor(codAutor, nome, nacionalidade)",
    "Empréstimo(#codLeitor, #ISBN, dataEmprestimo, dataDevolucao, devolvido)",
    "Autoria(#codAutor, #ISBN)",
  ],
  f9entidade: "Leitor",
  f9: [
    ["codLeitor", "INTEGER", "Sim", "PK, auto-incremento"],
    ["nome", "VARCHAR(100)", "Sim", "—"],
    ["BI", "VARCHAR(15)", "Sim", "Único"],
    ["morada", "VARCHAR(200)", "Sim", "—"],
    ["telefone", "VARCHAR(15)", "Não", "Formato nacional"],
    ["email", "VARCHAR(100)", "Não", "Formato email válido"],
  ],
};

const solucaoCaso2 = {
  f1: [
    ["Requerente", "Pessoa/entidade que pede licenciamento"],
    ["Processo", "Pedido de licenciamento"],
    ["Técnico", "Funcionário que analisa"],
  ],
  f2: [
    ["submete", "Requerente", "Processo"],
    ["analisa", "Técnico", "Processo"],
  ],
  f3: [
    "Cada processo pertence a exactamente um requerente.",
    "Um requerente pode ter vários processos ao longo do tempo.",
    "Um processo é analisado por vários técnicos de especialidades distintas.",
    "Um técnico analisa vários processos.",
    "Cada parecer resulta da combinação (técnico, processo) e tem data, resultado e observações.",
    "Todo processo tem um requerente; nem todo requerente tem processo activo.",
  ],
  f4: [
    ["Requerente", "codRequerente, nome, NIF, morada, telefone", "codRequerente", "submete Processo (1:N)"],
    ["Processo", "numProcesso, tipoObra, descricao, localizacao, dataEntrada, estado", "numProcesso", "submetido (N:1); analisado (M:N)"],
    ["Técnico", "codTecnico, nome, especialidade, email", "codTecnico", "analisa Processo (M:N)"],
  ],
  f5: [
    {
      nome: "Requerente → Processo (1:N, obrigatória lado N)",
      tentativa: "Colocar codRequerente na tabela PROCESSO:",
      headers: ["numProcesso", "tipoObra", "localizacao", "codRequerente"],
      rows: [
        ["P-2025/001", "Construção", "Zona Industrial", "101"],
        ["P-2025/002", "Ampliação", "Av. Central", "102"],
        ["P-2025/003", "Demolição", "R. Nova", "101"],
      ],
      temNull: false, temRep: false,
      decisao3: false, assoc: "", regra: 4,
    },
    {
      nome: "Técnico ↔ Processo (M:N)",
      tentativa: "Colocar codTecnico na tabela PROCESSO:",
      headers: ["numProcesso", "tipoObra", "codTecnico", "dataParecer"],
      rows: [
        ["P-2025/001", "Construção", "10", "2025-03-10"],
        ["P-2025/001", "Construção", "11", "2025-03-12"],
        ["P-2025/002", "Ampliação", "10", "2025-03-15"],
      ],
      temNull: false, temRep: true,
      decisao3: true, assoc: "Parecer", regra: 6,
      nota: "A tabela Parecer tem atributos próprios (data, resultado, observações)",
    },
  ],
  f6: [
    ["Requerente", "codRequerente; NIF"],
    ["Processo", "numProcesso"],
    ["Técnico", "codTecnico; email"],
    ["Parecer", "(numProcesso, codTecnico)"],
  ],
  f7: [
    ["Requerente", "codRequerente", "Código interno estável"],
    ["Processo", "numProcesso", "Identificador oficial já usado na Câmara"],
    ["Técnico", "codTecnico", "Código interno; email pode mudar"],
    ["Parecer", "(numProcesso, codTecnico)", "Um técnico dá um parecer a um processo"],
  ],
  f8: [
    "Requerente(codRequerente, nome, NIF, morada, telefone)",
    "Processo(numProcesso, tipoObra, descricao, localizacao, dataEntrada, estado, #codRequerente)",
    "Tecnico(codTecnico, nome, especialidade, email)",
    "Parecer(#numProcesso, #codTecnico, dataParecer, resultado, observacoes)",
  ],
  f9entidade: "Processo",
  f9: [
    ["numProcesso", "VARCHAR(15)", "Sim", "PK, formato P-AAAA/NNN"],
    ["tipoObra", "VARCHAR(30)", "Sim", "{Construção, Ampliação, Demolição, Alteração}"],
    ["descricao", "TEXT", "Sim", "—"],
    ["localizacao", "VARCHAR(200)", "Sim", "—"],
    ["dataEntrada", "DATE", "Sim", "≤ data actual"],
    ["estado", "VARCHAR(20)", "Sim", "{Pendente, Em análise, Aprovado, Rejeitado}"],
    ["codRequerente", "INTEGER", "Sim", "FK → Requerente"],
  ],
};

const solucaoCaso3 = {
  f1: [
    ["Utente", "Pessoa que recebe refeições"],
    ["Refeição", "Almoço/jantar de um dado dia (ementa)"],
    ["Voluntário", "Quem entrega"],
    ["Rota", "Percurso de distribuição numa zona"],
  ],
  f2: [
    ["recebe", "Utente", "Refeição"],
    ["percorre", "Voluntário", "Rota"],
  ],
  f3: [
    "Cada utente pode receber várias refeições (uma ou duas por dia).",
    "A mesma refeição (ementa do dia) é entregue a vários utentes.",
    "Cada rota é percorrida por um voluntário por turno.",
    "O mesmo voluntário pode percorrer várias rotas ao longo do tempo.",
    "Todo utente registado recebe refeições.",
    "Cada utente pode ter restrições alimentares próprias.",
  ],
  f4: [
    ["Utente", "codUtente, nome, morada, telefone, contactoEmergencia, restricoes", "codUtente", "recebe Refeição (M:N)"],
    ["Refeição", "codRefeicao, data, tipo, ementa, calorias", "codRefeicao", "recebida por Utente (M:N)"],
    ["Voluntário", "codVoluntario, nome, telefone, cartaConducao, disponibilidade", "codVoluntario", "percorre Rota (1:N)"],
    ["Rota", "codRota, nome, zona, distanciaKm", "codRota", "percorrida por Voluntário (N:1)"],
  ],
  f5: [
    {
      nome: "Utente ↔ Refeição (M:N)",
      tentativa: "Colocar codUtente na tabela REFEIÇÃO:",
      headers: ["codRefeicao", "data", "tipo", "codUtente"],
      rows: [
        ["R-001", "2025-04-15", "Almoço", "50"],
        ["R-001", "2025-04-15", "Almoço", "51"],
        ["R-001", "2025-04-15", "Almoço", "52"],
      ],
      temNull: false, temRep: true,
      decisao3: true, assoc: "Entrega", regra: 6,
    },
    {
      nome: "Voluntário → Rota (1:N)",
      tentativa: "Colocar codVoluntario na tabela ROTA:",
      headers: ["codRota", "nome", "zona", "codVoluntario"],
      rows: [
        ["R01", "Centro", "Centro da vila", "7"],
        ["R02", "Norte", "Zona norte", "7"],
        ["R03", "Sul", "Zona sul", "9"],
      ],
      temNull: false, temRep: false,
      decisao3: false, assoc: "", regra: 4,
    },
  ],
  f6: [
    ["Utente", "codUtente"],
    ["Refeição", "codRefeicao; (data, tipo)"],
    ["Voluntário", "codVoluntario"],
    ["Rota", "codRota"],
    ["Entrega", "(codUtente, codRefeicao)"],
  ],
  f7: [
    ["Utente", "codUtente", "Código interno estável"],
    ["Refeição", "codRefeicao", "Simples; preferível a chave composta (data, tipo)"],
    ["Voluntário", "codVoluntario", "Código interno"],
    ["Rota", "codRota", "Código interno"],
    ["Entrega", "(codUtente, codRefeicao)", "Uma entrega por utente/refeição"],
  ],
  f8: [
    "Utente(codUtente, nome, morada, telefone, contactoEmergencia, restricoes)",
    "Refeicao(codRefeicao, data, tipo, ementa, calorias)",
    "Voluntario(codVoluntario, nome, telefone, cartaConducao, disponibilidade)",
    "Rota(codRota, nome, zona, distanciaKm, #codVoluntario)",
    "Entrega(#codUtente, #codRefeicao, horaEntrega, observacoes)",
  ],
  f9entidade: "Utente",
  f9: [
    ["codUtente", "INTEGER", "Sim", "PK, auto-incremento"],
    ["nome", "VARCHAR(100)", "Sim", "—"],
    ["morada", "VARCHAR(200)", "Sim", "Zona de cobertura da IPSS"],
    ["telefone", "VARCHAR(15)", "Não", "—"],
    ["contactoEmergencia", "VARCHAR(100)", "Sim", "Nome + telefone"],
    ["restricoes", "TEXT", "Não", "Ex.: diabético, sem glúten"],
  ],
};

const solucaoCaso4 = {
  f1: [
    ["Viatura", "Veículo do pool municipal"],
    ["Motorista", "Funcionário habilitado a conduzir"],
    ["Departamento", "Serviço municipal"],
    ["Manutenção", "Intervenção técnica sobre uma viatura"],
  ],
  f2: [
    ["pertence_v", "Viatura", "Departamento"],
    ["pertence_m", "Motorista", "Departamento"],
    ["requisita", "Viatura", "Motorista"],
    ["tem_manutencao", "Viatura", "Manutenção"],
  ],
  f3: [
    "Cada viatura está atribuída a um departamento.",
    "Cada motorista pertence a um departamento.",
    "Um motorista pode conduzir várias viaturas (em momentos diferentes).",
    "Uma viatura pode ser conduzida por vários motoristas ao longo do tempo.",
    "Cada manutenção refere-se a uma única viatura.",
    "Uma viatura pode ter várias manutenções ao longo da sua vida útil.",
  ],
  f4: [
    ["Viatura", "matricula, marca, modelo, ano, combustivel, quilometragem, estado", "matricula", "Dep. (N:1); Mot. (M:N); Manut. (1:N)"],
    ["Motorista", "codMotorista, nome, numCartaConducao, categorias, telefone", "codMotorista", "Dep. (N:1); Viatura (M:N)"],
    ["Departamento", "codDepartamento, nome, responsavel", "codDepartamento", "tem Viaturas e Motoristas (1:N)"],
    ["Manutenção", "codManutencao, data, tipo, descricao, custo, oficina", "codManutencao", "refere-se a Viatura (N:1)"],
  ],
  f5: [
    {
      nome: "Viatura → Departamento (N:1, obrigatória)",
      tentativa: "Colocar codDepartamento na tabela VIATURA:",
      headers: ["matricula", "marca", "modelo", "codDep"],
      rows: [
        ["12-AB-34", "Renault", "Clio", "3"],
        ["34-CD-56", "Ford", "Transit", "3"],
        ["56-EF-78", "Peugeot", "3008", "5"],
      ],
      temNull: false, temRep: false,
      decisao3: false, assoc: "", regra: 4,
    },
    {
      nome: "Motorista → Departamento (N:1, obrigatória)",
      tentativa: "Colocar codDepartamento na tabela MOTORISTA (análise simétrica):",
      headers: ["codMot", "nome", "carta", "codDep"],
      rows: [
        ["M-01", "João Silva", "B", "3"],
        ["M-02", "Ana Costa", "B", "5"],
        ["M-03", "Pedro Lima", "C", "3"],
      ],
      temNull: false, temRep: false,
      decisao3: false, assoc: "", regra: 4,
    },
    {
      nome: "Viatura ↔ Motorista (M:N)",
      tentativa: "Colocar codMotorista na tabela VIATURA:",
      headers: ["matricula", "marca", "codMot", "data"],
      rows: [
        ["12-AB-34", "Renault Clio", "M-01", "2025-03-01"],
        ["12-AB-34", "Renault Clio", "M-02", "2025-03-15"],
        ["34-CD-56", "Ford Transit", "M-01", "2025-03-10"],
      ],
      temNull: false, temRep: true,
      decisao3: true, assoc: "Requisição", regra: 6,
      nota: "Atributos próprios (datas, destino, km) justificam PK simples codRequisicao",
    },
    {
      nome: "Viatura → Manutenção (1:N, obrigatória lado N)",
      tentativa: "Colocar matricula na tabela MANUTENÇÃO:",
      headers: ["codManut", "data", "tipo", "matricula"],
      rows: [
        ["MAN-001", "2025-01-15", "Revisão", "12-AB-34"],
        ["MAN-002", "2025-02-03", "Pneus", "12-AB-34"],
        ["MAN-003", "2025-02-20", "Óleo", "34-CD-56"],
      ],
      temNull: false, temRep: false,
      decisao3: false, assoc: "", regra: 4,
    },
  ],
  f6: [
    ["Viatura", "matricula"],
    ["Motorista", "codMotorista; numCartaConducao"],
    ["Departamento", "codDepartamento; nome"],
    ["Manutenção", "codManutencao"],
    ["Requisição", "codRequisicao; (matricula, codMotorista, dataInicio)"],
  ],
  f7: [
    ["Viatura", "matricula", "Identificador oficial único"],
    ["Motorista", "codMotorista", "Código interno estável"],
    ["Departamento", "codDepartamento", "Código interno"],
    ["Manutenção", "codManutencao", "Código interno sequencial"],
    ["Requisição", "codRequisicao", "Chave simples evita composta longa"],
  ],
  f8: [
    "Viatura(matricula, marca, modelo, ano, combustivel, quilometragem, estado, #codDepartamento)",
    "Motorista(codMotorista, nome, numCartaConducao, categorias, telefone, #codDepartamento)",
    "Departamento(codDepartamento, nome, responsavel)",
    "Requisicao(codRequisicao, #matricula, #codMotorista, dataInicio, dataFim, destino, kmInicio, kmFim, estado)",
    "Manutencao(codManutencao, #matricula, data, tipo, descricao, custo, oficina)",
  ],
  f9entidade: "Viatura",
  f9: [
    ["matricula", "VARCHAR(10)", "Sim", "PK, formato NN-NN-NN"],
    ["marca", "VARCHAR(30)", "Sim", "—"],
    ["modelo", "VARCHAR(30)", "Sim", "—"],
    ["ano", "INTEGER", "Sim", "1980 ≤ ano ≤ ano actual"],
    ["combustivel", "VARCHAR(15)", "Sim", "{Gasolina, Gasóleo, Eléctrico, Híbrido}"],
    ["quilometragem", "INTEGER", "Sim", "≥ 0"],
    ["estado", "VARCHAR(20)", "Sim", "{Disponível, Requisitada, Manutenção, Abatida}"],
    ["codDepartamento", "INTEGER", "Sim", "FK → Departamento"],
  ],
};

// --- GUIADOS (reaproveitam o contexto de casos-guiados.md) ---

const guiado1 = {
  filename: "worksheet-guiado-1-biblioteca.docx",
  headerTitle: "Caso Guiado 1 — Biblioteca Municipal de Vila Feliz",
  sections: [
    H1("Caso Guiado 1 — Biblioteca Municipal de Vila Feliz"),
    ...contextoSection(
      ["A Biblioteca Municipal de Vila Feliz gere um acervo de mais de 15.000 volumes e serve centenas de leitores registados. Actualmente, os empréstimos são registados numa folha Excel com todos os dados misturados: nome do leitor, morada, título do livro, autor, data do empréstimo — tudo na mesma linha."],
      ["Leitor", "BI", "Morada", "Livro", "Autor", "ISBN", "DataEmpr.", "DataDev."],
      [
        ["Ana Costa", "12345678", "R. Principal, 1, Vila Feliz", "Dom Casmurro", "Machado de Assis", "978-85-01-1", "2025-01-10", "2025-01-25"],
        ["Ana Costa", "12345678", "R. Principal, 1, Vila Feliz", "Os Maias", "Eça de Queirós", "978-972-1", "2025-01-15", "2025-01-30"],
        ["João Silva", "87654321", "Av. Heróis, 5, Vila Feliz", "Dom Casmurro", "Machado de Assis", "978-85-01-1", "2025-02-01", "2025-02-15"],
      ]
    ),
    ...fasesAll(),
  ],
};

const guiado2 = {
  filename: "worksheet-guiado-2-licenciamento.docx",
  headerTitle: "Caso Guiado 2 — Licenciamento de Obras Particulares",
  sections: [
    H1("Caso Guiado 2 — Licenciamento de Obras Particulares"),
    ...contextoSection(
      ["O Gabinete de Urbanismo da Câmara Municipal de Vila Feliz recebe pedidos de licenciamento de obras particulares (construção, ampliação, demolição). Cada pedido é analisado por técnicos que emitem pareceres. Actualmente, o registo é feito em processos físicos e numa folha Excel com dados do requerente, obra e pareceres todos juntos."],
      ["Requerente", "NIF", "Morada", "NumProc.", "TipoObra", "Localização", "Técnico", "Especialidade", "Parecer", "DataParecer"],
      [
        ["Manuel Ferreira", "123456789", "R. Nova, 3, Vila Feliz", "P-2025/001", "Construção", "Lote 15, Z. Industrial", "Carlos Mendes", "Arquitectura", "Favorável", "2025-03-10"],
        ["Manuel Ferreira", "123456789", "R. Nova, 3, Vila Feliz", "P-2025/001", "Construção", "Lote 15, Z. Industrial", "Rita Sousa", "Eng. Civil", "Favorável c/ cond.", "2025-03-12"],
        ["Sofia Lopes", "987654321", "Av. Mar, 8, Vila Feliz", "P-2025/002", "Ampliação", "R. Oliveira, 22, Vila Feliz", "Carlos Mendes", "Arquitectura", "Desfavorável", "2025-03-15"],
      ]
    ),
    ...fasesAll(),
  ],
};

const guiado3 = {
  filename: "worksheet-guiado-3-refeicoes.docx",
  headerTitle: "Caso Guiado 3 — Refeições Sociais IPSS",
  sections: [
    H1("Caso Guiado 3 — Refeições Sociais IPSS"),
    ...contextoSection(
      ["Uma IPSS (Instituição Particular de Solidariedade Social) de Vila Feliz distribui refeições ao domicílio a idosos e pessoas com mobilidade reduzida. Os voluntários entregam as refeições seguindo rotas pré-definidas. Cada utente pode ter restrições alimentares. O registo actual é feito em papel e num quadro na cozinha.",
       "Os voluntários têm turnos rotativos e cada rota cobre uma zona diferente da vila."],
      null, null
    ),
    ...fasesAll(),
  ],
};

const guiado4 = {
  filename: "worksheet-guiado-4-viaturas.docx",
  headerTitle: "Caso Guiado 4 — Viaturas e Motoristas da Câmara",
  sections: [
    H1("Caso Guiado 4 — Viaturas e Motoristas da Câmara"),
    ...contextoSection(
      ["A Câmara Municipal de Vila Feliz gere um pool de viaturas partilhadas entre serviços. Os motoristas são funcionários que podem conduzir diferentes viaturas. Cada viatura tem manutenções periódicas registadas. As requisições são feitas por departamentos para datas específicas. Actualmente, o controlo é feito em folhas Excel separadas — uma para viaturas, outra para motoristas, outra para requisições — sem ligação entre elas."],
      null, null
    ),
    ...fasesAll({ numRelations: 4 }),
  ],
};

// --- VERSÕES "COM APOIO" (scaffold) DOS GUIADOS ---
// Mesmo conteúdo dos guiados, mas com plumbing pré-preenchido (nomes de entidades/tabelas repetidos entre fases).
// Raciocínio (cardinalidades, Fase 5, PKs, justificações) fica em branco.

function scaffoldIntro() {
  return [
    new Paragraph({
      spacing: { before: 80, after: 120 },
      shading: { fill: "FFF4E5", type: ShadingType.CLEAR },
      border: {
        top: { style: BorderStyle.SINGLE, size: 4, color: "F5A623" },
        bottom: { style: BorderStyle.SINGLE, size: 4, color: "F5A623" },
        left: { style: BorderStyle.SINGLE, size: 4, color: "F5A623" },
        right: { style: BorderStyle.SINGLE, size: 4, color: "F5A623" },
      },
      children: [new TextRun({
        text: "Versão com apoio — os nomes de entidades e tabelas já estão listados (continuidade entre fases). A si cabe preencher o raciocínio: atributos, cardinalidades, tentativas da Fase 5, chaves primárias e justificações.",
        italics: true, size: 20, color: "8A5A00",
      })],
    }),
  ];
}

const guiado1Scaffold = {
  filename: "worksheet-guiado-1-biblioteca-scaffold.docx",
  headerTitle: "Caso Guiado 1 (com apoio) — Biblioteca Municipal de Vila Feliz",
  sections: [
    H1("Caso Guiado 1 — Biblioteca Municipal de Vila Feliz"),
    ...scaffoldIntro(),
    ...contextoSection(
      ["A Biblioteca Municipal de Vila Feliz gere um acervo de mais de 15.000 volumes e serve centenas de leitores registados. Actualmente, os empréstimos são registados numa folha Excel com todos os dados misturados: nome do leitor, morada, título do livro, autor, data do empréstimo — tudo na mesma linha."],
      ["Leitor", "BI", "Morada", "Livro", "Autor", "ISBN", "DataEmpr.", "DataDev."],
      [
        ["Ana Costa", "12345678", "R. Principal, 1, Vila Feliz", "Dom Casmurro", "Machado de Assis", "978-85-01-1", "2025-01-10", "2025-01-25"],
        ["Ana Costa", "12345678", "R. Principal, 1, Vila Feliz", "Os Maias", "Eça de Queirós", "978-972-1", "2025-01-15", "2025-01-30"],
        ["João Silva", "87654321", "Av. Heróis, 5, Vila Feliz", "Dom Casmurro", "Machado de Assis", "978-85-01-1", "2025-02-01", "2025-02-15"],
      ]
    ),
    ...fasesAll({ scaffold: scaffoldCaso1 }),
  ],
};

const guiado2Scaffold = {
  filename: "worksheet-guiado-2-licenciamento-scaffold.docx",
  headerTitle: "Caso Guiado 2 (com apoio) — Licenciamento de Obras Particulares",
  sections: [
    H1("Caso Guiado 2 — Licenciamento de Obras Particulares"),
    ...scaffoldIntro(),
    ...contextoSection(
      ["O Gabinete de Urbanismo da Câmara Municipal de Vila Feliz recebe pedidos de licenciamento de obras particulares (construção, ampliação, demolição). Cada pedido é analisado por técnicos que emitem pareceres. Actualmente, o registo é feito em processos físicos e numa folha Excel com dados do requerente, obra e pareceres todos juntos."],
      ["Requerente", "NIF", "Morada", "NumProc.", "TipoObra", "Localização", "Técnico", "Especialidade", "Parecer", "DataParecer"],
      [
        ["Manuel Ferreira", "123456789", "R. Nova, 3, Vila Feliz", "P-2025/001", "Construção", "Lote 15, Z. Industrial", "Carlos Mendes", "Arquitectura", "Favorável", "2025-03-10"],
        ["Manuel Ferreira", "123456789", "R. Nova, 3, Vila Feliz", "P-2025/001", "Construção", "Lote 15, Z. Industrial", "Rita Sousa", "Eng. Civil", "Favorável c/ cond.", "2025-03-12"],
        ["Sofia Lopes", "987654321", "Av. Mar, 8, Vila Feliz", "P-2025/002", "Ampliação", "R. Oliveira, 22, Vila Feliz", "Carlos Mendes", "Arquitectura", "Desfavorável", "2025-03-15"],
      ]
    ),
    ...fasesAll({ scaffold: scaffoldCaso2 }),
  ],
};

const guiado3Scaffold = {
  filename: "worksheet-guiado-3-refeicoes-scaffold.docx",
  headerTitle: "Caso Guiado 3 (com apoio) — Refeições Sociais IPSS",
  sections: [
    H1("Caso Guiado 3 — Refeições Sociais IPSS"),
    ...scaffoldIntro(),
    ...contextoSection(
      ["Uma IPSS (Instituição Particular de Solidariedade Social) de Vila Feliz distribui refeições ao domicílio a idosos e pessoas com mobilidade reduzida. Os voluntários entregam as refeições seguindo rotas pré-definidas. Cada utente pode ter restrições alimentares. O registo actual é feito em papel e num quadro na cozinha.",
       "Os voluntários têm turnos rotativos e cada rota cobre uma zona diferente da vila."],
      null, null
    ),
    ...fasesAll({ scaffold: scaffoldCaso3 }),
  ],
};

const guiado4Scaffold = {
  filename: "worksheet-guiado-4-viaturas-scaffold.docx",
  headerTitle: "Caso Guiado 4 (com apoio) — Viaturas e Motoristas da Câmara",
  sections: [
    H1("Caso Guiado 4 — Viaturas e Motoristas da Câmara"),
    ...scaffoldIntro(),
    ...contextoSection(
      ["A Câmara Municipal de Vila Feliz gere um pool de viaturas partilhadas entre serviços. Os motoristas são funcionários que podem conduzir diferentes viaturas. Cada viatura tem manutenções periódicas registadas. As requisições são feitas por departamentos para datas específicas. Actualmente, o controlo é feito em folhas Excel separadas — uma para viaturas, outra para motoristas, outra para requisições — sem ligação entre elas."],
      null, null
    ),
    ...fasesAll({ numRelations: 4, scaffold: scaffoldCaso4 }),
  ],
};

// --- VERSÕES "COM SOLUÇÃO" (tudo pré-preenchido) ---

function solucaoIntro() {
  return [
    new Paragraph({
      spacing: { before: 80, after: 120 },
      shading: { fill: "E8F4E8", type: ShadingType.CLEAR },
      border: {
        top: { style: BorderStyle.SINGLE, size: 4, color: "2E7D32" },
        bottom: { style: BorderStyle.SINGLE, size: 4, color: "2E7D32" },
        left: { style: BorderStyle.SINGLE, size: 4, color: "2E7D32" },
        right: { style: BorderStyle.SINGLE, size: 4, color: "2E7D32" },
      },
      children: [new TextRun({
        text: "Versão com solução — todos os campos estão pré-preenchidos. Use para conferência após ter resolvido autonomamente, ou para consulta quando bloquear. Para maximizar a aprendizagem, tente primeiro a versão em branco.",
        italics: true, size: 20, color: "1B5E20",
      })],
    }),
  ];
}

const guiado1Solucao = {
  filename: "worksheet-guiado-1-biblioteca-solucao.docx",
  headerTitle: "Caso Guiado 1 (solução) — Biblioteca Municipal de Vila Feliz",
  sections: [
    H1("Caso Guiado 1 — Biblioteca Municipal de Vila Feliz"),
    ...solucaoIntro(),
    ...contextoSection(
      ["A Biblioteca Municipal de Vila Feliz gere um acervo de mais de 15.000 volumes e serve centenas de leitores registados. Actualmente, os empréstimos são registados numa folha Excel com todos os dados misturados: nome do leitor, morada, título do livro, autor, data do empréstimo — tudo na mesma linha."],
      ["Leitor", "BI", "Morada", "Livro", "Autor", "ISBN", "DataEmpr.", "DataDev."],
      [
        ["Ana Costa", "12345678", "R. Principal, 1, Vila Feliz", "Dom Casmurro", "Machado de Assis", "978-85-01-1", "2025-01-10", "2025-01-25"],
        ["Ana Costa", "12345678", "R. Principal, 1, Vila Feliz", "Os Maias", "Eça de Queirós", "978-972-1", "2025-01-15", "2025-01-30"],
        ["João Silva", "87654321", "Av. Heróis, 5, Vila Feliz", "Dom Casmurro", "Machado de Assis", "978-85-01-1", "2025-02-01", "2025-02-15"],
      ]
    ),
    ...fasesAll({ scaffold: solucaoCaso1, solution: true }),
  ],
};

const guiado2Solucao = {
  filename: "worksheet-guiado-2-licenciamento-solucao.docx",
  headerTitle: "Caso Guiado 2 (solução) — Licenciamento de Obras Particulares",
  sections: [
    H1("Caso Guiado 2 — Licenciamento de Obras Particulares"),
    ...solucaoIntro(),
    ...contextoSection(
      ["O Gabinete de Urbanismo da Câmara Municipal de Vila Feliz recebe pedidos de licenciamento de obras particulares (construção, ampliação, demolição). Cada pedido é analisado por técnicos que emitem pareceres. Actualmente, o registo é feito em processos físicos e numa folha Excel com dados do requerente, obra e pareceres todos juntos."],
      ["Requerente", "NIF", "Morada", "NumProc.", "TipoObra", "Localização", "Técnico", "Especialidade", "Parecer", "DataParecer"],
      [
        ["Manuel Ferreira", "123456789", "R. Nova, 3, Vila Feliz", "P-2025/001", "Construção", "Lote 15, Z. Industrial", "Carlos Mendes", "Arquitectura", "Favorável", "2025-03-10"],
        ["Manuel Ferreira", "123456789", "R. Nova, 3, Vila Feliz", "P-2025/001", "Construção", "Lote 15, Z. Industrial", "Rita Sousa", "Eng. Civil", "Favorável c/ cond.", "2025-03-12"],
        ["Sofia Lopes", "987654321", "Av. Mar, 8, Vila Feliz", "P-2025/002", "Ampliação", "R. Oliveira, 22, Vila Feliz", "Carlos Mendes", "Arquitectura", "Desfavorável", "2025-03-15"],
      ]
    ),
    ...fasesAll({ scaffold: solucaoCaso2, solution: true }),
  ],
};

const guiado3Solucao = {
  filename: "worksheet-guiado-3-refeicoes-solucao.docx",
  headerTitle: "Caso Guiado 3 (solução) — Refeições Sociais IPSS",
  sections: [
    H1("Caso Guiado 3 — Refeições Sociais IPSS"),
    ...solucaoIntro(),
    ...contextoSection(
      ["Uma IPSS (Instituição Particular de Solidariedade Social) de Vila Feliz distribui refeições ao domicílio a idosos e pessoas com mobilidade reduzida. Os voluntários entregam as refeições seguindo rotas pré-definidas. Cada utente pode ter restrições alimentares. O registo actual é feito em papel e num quadro na cozinha.",
       "Os voluntários têm turnos rotativos e cada rota cobre uma zona diferente da vila."],
      null, null
    ),
    ...fasesAll({ scaffold: solucaoCaso3, solution: true }),
  ],
};

const guiado4Solucao = {
  filename: "worksheet-guiado-4-viaturas-solucao.docx",
  headerTitle: "Caso Guiado 4 (solução) — Viaturas e Motoristas da Câmara",
  sections: [
    H1("Caso Guiado 4 — Viaturas e Motoristas da Câmara"),
    ...solucaoIntro(),
    ...contextoSection(
      ["A Câmara Municipal de Vila Feliz gere um pool de viaturas partilhadas entre serviços. Os motoristas são funcionários que podem conduzir diferentes viaturas. Cada viatura tem manutenções periódicas registadas. As requisições são feitas por departamentos para datas específicas. Actualmente, o controlo é feito em folhas Excel separadas — uma para viaturas, outra para motoristas, outra para requisições — sem ligação entre elas."],
      null, null
    ),
    ...fasesAll({ numRelations: 4, scaffold: solucaoCaso4, solution: true }),
  ],
};

// --- AUTÓNOMOS (de exercicios.md, sem pistas de entidades esperadas) ---

const auto1 = {
  filename: "worksheet-autonomo-1-obras.docx",
  headerTitle: "Exercício Autónomo 1 — Obras e Empreitadas",
  sections: [
    H1("Exercício Autónomo 1 — Obras e Empreitadas"),
    ...contextoSection(
      ["A Câmara Municipal de Vila Feliz gere actualmente mais de 30 obras públicas em simultâneo — estradas, escolas, equipamentos desportivos, espaços verdes. Cada obra é adjudicada a um empreiteiro através de concurso público. Um fiscal da câmara acompanha a execução. Actualmente, os dados estão em pastas físicas e folhas Excel separadas por ano."],
      ["Obra", "Local", "Empreiteiro", "NIFEmpr.", "Contacto", "Fiscal", "DataInício", "DataFim", "Valor", "Estado"],
      [
        ["Requal. EN8", "Km 45-52", "Construções Silva", "501234567", "J. Silva / 918...", "Eng. Ana Costa", "2024-09-01", "2025-03-30", "850 000€", "Em curso"],
        ["Pavilhão Escolar", "EB Vila Feliz", "Construções Silva", "501234567", "J. Silva / 918...", "Eng. Pedro Lopes", "2024-11-15", "2025-06-30", "320 000€", "Em curso"],
        ["Parque Urbano", "Zona Norte", "Jardins & Co", "509876543", "M. Jardim / 926...", "Eng. Ana Costa", "2025-01-10", "2025-08-30", "175 000€", "Adjudicada"],
      ]
    ),
    ...fasesAll(),
  ],
};

const auto2 = {
  filename: "worksheet-autonomo-2-valencias.docx",
  headerTitle: "Exercício Autónomo 2 — IPSS: Utentes e Valências",
  sections: [
    H1("Exercício Autónomo 2 — IPSS: Utentes e Valências"),
    ...contextoSection(
      ["O Centro Social e Paroquial de Vila Feliz oferece várias valências: lar de idosos, centro de dia, apoio domiciliário, creche e ATL. Cada utente pode estar inscrito em uma ou mais valências. A cada utente é atribuído um técnico responsável (assistente social, enfermeiro, educador). Os familiares são contactados em caso de emergência. A gestão é feita em fichas de papel e num Excel por valência."],
      ["Utente", "DataNasc", "Valência", "Mensal.", "Técnico", "FunçãoTec.", "Familiar", "TelFam.", "Parent.", "DataInscr.", "Estado"],
      [
        ["Maria Santos", "1942-03-15", "Lar", "850€", "Dr. João Alves", "Assist. Social", "Ana Santos", "912345678", "Filha", "2023-06-01", "Activo"],
        ["Maria Santos", "1942-03-15", "Centro de Dia", "320€", "Dr. João Alves", "Assist. Social", "Ana Santos", "912345678", "Filha", "2024-01-10", "Activo"],
        ["António Ferreira", "1938-11-22", "Lar", "950€", "Enf. Rosa Lima", "Enfermeira", "Pedro Ferreira", "926789012", "Filho", "2022-09-15", "Activo"],
        ["Sofia Mendes", "2020-07-08", "Creche", "280€", "Ed. Clara Dias", "Educadora", "Joana Mendes", "918456789", "Mãe", "2024-09-01", "Activo"],
      ]
    ),
    ...fasesAll(),
  ],
};

const auto3 = {
  filename: "worksheet-autonomo-3-estagios.docx",
  headerTitle: "Exercício Autónomo 3 — ESTG-IPL: Estágios Curriculares",
  sections: [
    H1("Exercício Autónomo 3 — ESTG-IPL: Estágios Curriculares"),
    ...contextoSection(
      ["A ESTG-IPL gere estágios curriculares para todos os cursos de licenciatura. Cada aluno é colocado numa empresa da região, com um orientador da escola e um supervisor da empresa. O processo actual é gerido por email entre coordenadores, alunos e empresas. Não existe base de dados centralizada — cada coordenador tem o seu Excel."],
      ["Aluno", "NumAluno", "Curso", "Empresa", "NIFEmp.", "Supervisor", "OrientESTG", "Tema", "DataIni", "DataFim", "Nota"],
      [
        ["João Silva", "2100123", "EI", "TechLeiria", "501111222", "Dr. Rui Costa", "Prof. Ana Matos", "App Mobile", "2025-02-01", "2025-06-30", "—"],
        ["Maria Costa", "2100456", "EI", "TechLeiria", "501111222", "Dr. Rui Costa", "Prof. Ana Matos", "Chatbot IA", "2025-02-01", "2025-06-30", "—"],
        ["Pedro Santos", "2100789", "GAP", "CM Leiria", "500222333", "Dra. Sofia Lima", "Prof. Carlos Dias", "Gestão RH", "2025-03-01", "2025-07-31", "—"],
        ["Ana Ferreira", "2100234", "CTESP-TI", "WebSoft", "509444555", "Eng. Tiago Lopes", "Prof. Ana Matos", "E-commerce", "2025-02-15", "2025-05-15", "—"],
      ]
    ),
    ...fasesAll(),
  ],
};

const auto4 = {
  filename: "worksheet-autonomo-4-protecao-civil.docx",
  headerTitle: "Exercício Autónomo 4 — Protecção Civil Municipal",
  sections: [
    H1("Exercício Autónomo 4 — Protecção Civil Municipal"),
    ...contextoSection(
      ["O Serviço Municipal de Protecção Civil de Vila Feliz regista e gere ocorrências (inundações, incêndios, quedas de árvores, deslizamentos). Cada ocorrência mobiliza equipas e recursos (viaturas, geradores, bombas). Um agente de protecção civil coordena a resposta. Actualmente, o registo é feito por telefone e num quadro branco na sala de operações.",
       "Quando chega um alerta, o operador escreve no quadro branco tipo, local e hora. O coordenador decide que equipas enviar. No final, o chefe de equipa preenche um formulário em papel que é arquivado por mês."],
      null, null
    ),
    ...fasesAll(),
  ],
};

// --- WORKSHEET DE TREINO DA FASE 5 ---

const trainingScenarios = [
  {
    titulo: "Município e Funcionários",
    descr: "Cada Funcionário pertence a um Município (obrigatório). Um Município tem vários funcionários.",
    atrib: "Funcionário(codFunc, nome, cargo)   |   Município(codMun, nome, distrito)",
    tentativa: "Colocámos codMun na tabela FUNCIONÁRIO:",
    headers: ["codFunc", "nome", "cargo", "codMun"],
    rows: [
      ["101", "Ana Silva", "Jurista", "3"],
      ["102", "João Pinto", "Contabilista", "3"],
      ["103", "Rita Costa", "Arquitecta", "5"],
    ],
  },
  {
    titulo: "Projecto e Departamentos",
    descr: "Um Projecto envolve vários Departamentos. Um Departamento participa em vários projectos ao longo do ano.",
    atrib: "Projecto(codProj, nome, orcamento)   |   Departamento(codDep, nome, responsavel)",
    tentativa: "Colocámos codDep na tabela PROJECTO:",
    headers: ["codProj", "nome", "orcamento", "codDep"],
    rows: [
      ["P01", "Modernização IT", "50.000€", "2"],
      ["P01", "Modernização IT", "50.000€", "5"],
      ["P02", "Sede Nova", "200.000€", "2"],
    ],
  },
  {
    titulo: "Cidadão e Advogado",
    descr: "Um Cidadão pode ter um Advogado associado ao seu processo (opcional). Um Advogado representa vários cidadãos.",
    atrib: "Cidadao(NIF, nome, morada)   |   Advogado(cedula, nome, especialidade)",
    tentativa: "Colocámos cedulaAdv na tabela CIDADÃO (já que o advogado é opcional):",
    headers: ["NIF", "nome", "morada", "cedulaAdv"],
    rows: [
      ["100111222", "João Silva", "R. X, Vila Feliz", "A-234"],
      ["200222333", "Maria Costa", "Av. Y, Vila Feliz", "(vazio)"],
      ["300333444", "Pedro Lima", "R. Z, Vila Feliz", "(vazio)"],
    ],
  },
  {
    titulo: "Fornecedor e Facturas",
    descr: "Cada Factura é emitida por um único Fornecedor. Um Fornecedor emite várias facturas.",
    atrib: "Fornecedor(NIF, nome, contacto)   |   Factura(numFact, data, valor)",
    tentativa: "Colocámos NIFForn na tabela FACTURA:",
    headers: ["numFact", "data", "valor", "NIFForn"],
    rows: [
      ["F-001", "2025-01-10", "1.200€", "500111222"],
      ["F-002", "2025-01-15", "850€", "500111222"],
      ["F-003", "2025-02-03", "2.400€", "509333444"],
    ],
  },
  {
    titulo: "Aluno e Unidade Curricular",
    descr: "Um Aluno inscreve-se em várias UCs. Uma UC tem vários alunos inscritos. Cada inscrição tem data e nota final.",
    atrib: "Aluno(numAluno, nome, curso)   |   UC(codUC, nome, ECTS)",
    tentativa: "Colocámos codUC na tabela ALUNO:",
    headers: ["numAluno", "nome", "curso", "codUC"],
    rows: [
      ["2100123", "João Silva", "GAP", "UC001"],
      ["2100123", "João Silva", "GAP", "UC002"],
      ["2100456", "Maria Costa", "GAP", "UC001"],
    ],
  },
  {
    titulo: "Receita e Medicamentos",
    descr: "Uma Receita contém vários Medicamentos. Um Medicamento pode constar em várias receitas, com dose prescrita.",
    atrib: "Receita(numReceita, data, medico)   |   Medicamento(codMed, nome, dosagem)",
    tentativa: "Colocámos codMed na tabela RECEITA:",
    headers: ["numReceita", "data", "medico", "codMed"],
    rows: [
      ["R-100", "2025-03-01", "Dr. Silva", "M-11"],
      ["R-100", "2025-03-01", "Dr. Silva", "M-23"],
      ["R-101", "2025-03-02", "Dr. Costa", "M-11"],
    ],
  },
  {
    titulo: "Sala e Edifício",
    descr: "Cada Sala pertence a um Edifício. Um Edifício tem várias salas.",
    atrib: "Sala(codSala, piso, capacidade)   |   Edificio(codEdif, nome, morada)",
    tentativa: "Colocámos codEdif na tabela SALA:",
    headers: ["codSala", "piso", "capacidade", "codEdif"],
    rows: [
      ["S-101", "1", "30", "E-01"],
      ["S-102", "1", "25", "E-01"],
      ["S-201", "2", "40", "E-02"],
    ],
  },
  {
    titulo: "Ocorrência e Coordenador",
    descr: "Cada Ocorrência tem um Coordenador atribuído (obrigatório). Um Coordenador gere várias ocorrências ao longo do turno.",
    atrib: "Ocorrencia(numOcor, tipo, data)   |   Coordenador(codCoord, nome, turno)",
    tentativa: "Colocámos codCoord na tabela OCORRÊNCIA:",
    headers: ["numOcor", "tipo", "data", "codCoord"],
    rows: [
      ["O-001", "Inundação", "2025-01-15", "C-11"],
      ["O-002", "Árvore caída", "2025-02-03", "C-11"],
      ["O-003", "Incêndio", "2025-02-20", "C-22"],
    ],
  },
  {
    titulo: "Motorista e Viatura",
    descr: "Um Motorista conduz várias Viaturas ao longo do tempo. Uma Viatura é conduzida por vários motoristas, com data de início e fim.",
    atrib: "Motorista(codMot, nome, carta)   |   Viatura(matricula, marca, modelo)",
    tentativa: "Colocámos matricula na tabela MOTORISTA:",
    headers: ["codMot", "nome", "carta", "matricula"],
    rows: [
      ["M-01", "João Silva", "B", "12-AB-34"],
      ["M-01", "João Silva", "B", "56-CD-78"],
      ["M-02", "Ana Costa", "B", "12-AB-34"],
    ],
  },
  {
    titulo: "Livro e Editora",
    descr: "Cada Livro é publicado por uma Editora. Uma Editora publica vários livros.",
    atrib: "Livro(ISBN, titulo, ano)   |   Editora(codEd, nome, pais)",
    tentativa: "Colocámos codEd na tabela LIVRO:",
    headers: ["ISBN", "titulo", "ano", "codEd"],
    rows: [
      ["978-85-01-1", "Os Maias", "1888", "10"],
      ["978-85-02-2", "A Cidade e as Serras", "1901", "10"],
      ["978-85-03-3", "Memorial do Convento", "1982", "15"],
    ],
  },
];

function trainingScenarioBlock(n, s) {
  return [
    new Paragraph({
      spacing: { before: 240, after: 100 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: DARK_BLUE, space: 2 } },
      children: [new TextRun({ text: `Cenário ${n} — ${s.titulo}`, bold: true, size: 26, color: DARK_BLUE })],
    }),
    P(s.descr, { italic: true }),
    new Paragraph({
      spacing: { after: 80 },
      children: [
        new TextRun({ text: "Atributos: ", bold: true, size: 20 }),
        new TextRun({ text: s.atrib, size: 20 }),
      ],
    }),
    new Paragraph({
      spacing: { after: 80 },
      children: [
        new TextRun({ text: "Passo A — Tentativa já feita. ", bold: true, size: 20 }),
        new TextRun({ text: s.tentativa, size: 20 }),
      ],
    }),
    makeTable(s.headers, [2410, 2410, 2409, 2409], s.rows, 0),
    space(80),
    new Paragraph({
      spacing: { after: 60 },
      children: [
        new TextRun({ text: "Passo B — Observe: ", bold: true, size: 20 }),
        new TextRun({ text: "☐  Há NULLs?     ☐  Há repetições?            ", size: 20 }),
      ],
    }),
    new Paragraph({
      spacing: { after: 60 },
      children: [
        new TextRun({ text: "Passo C — Decisão: ", bold: true, size: 20 }),
        new TextRun({ text: "☐  Fica assim (2 tabelas)     ☐  Criar tabela associativa: _______________ (3 tabelas)", size: 20 }),
      ],
    }),
    new Paragraph({
      spacing: { after: 200 },
      children: [
        new TextRun({ text: "Passo D — Regra aplicada: Regra _____", bold: true, size: 20 }),
      ],
    }),
  ];
}

const trainingDoc = {
  filename: "worksheet-fase5-treino.docx",
  headerTitle: "Treino de Fase 5 — 10 Cenários",
  sections: [
    H1("Treino de Fase 5 — 10 Cenários"),
    P("Este worksheet isola apenas a Fase 5 da modelação E-R: decidir se uma relação se converte em 2 tabelas (FK do lado natural) ou em 3 tabelas (com tabela associativa). Em cada cenário, a Tentativa (Passo A) já foi feita por si — a sua tarefa é observar a tabela pré-preenchida, detectar o problema (se houver) e decidir. Faça os 10 cenários de seguida para ganhar automatismo."),
    space(120),
    new Paragraph({
      spacing: { after: 120 },
      shading: { fill: LIGHT_GREY, type: ShadingType.CLEAR },
      border: { top: border(), bottom: border(), left: border(), right: border() },
      children: [
        new TextRun({ text: "Método em 4 passos:", bold: true, size: 22, color: DARK_BLUE }),
      ],
    }),
    PMulti([
      new TextRun({ text: "A. ", bold: true, size: 20 }),
      new TextRun({ text: "(feito) Tabela-tentativa com a FK no lado natural.    ", size: 20 }),
      new TextRun({ text: "B. ", bold: true, size: 20 }),
      new TextRun({ text: "Observe: há NULLs? há repetições?", size: 20 }),
    ]),
    PMulti([
      new TextRun({ text: "C. ", bold: true, size: 20 }),
      new TextRun({ text: "Decida: 2 tabelas (limpo) ou 3 tabelas (com assoc).    ", size: 20 }),
      new TextRun({ text: "D. ", bold: true, size: 20 }),
      new TextRun({ text: "Nomeie a regra (4 / 5 / 6).", size: 20 }),
    ]),
    space(),
    makeTable(
      ["Situação", "O que faz", "Regra"],
      [3500, 4138, 2000],
      [
        ["Tudo limpo (sem NULLs nem repetições)", "Fica com 2 tabelas", "Regra 4"],
        ["Aparecem células vazias (NULLs)", "Cria 3ª tabela associativa", "Regra 5"],
        ["Aparecem linhas repetidas", "Cria 3ª tabela associativa", "Regra 6"],
      ]
    ),
    space(),
    ...trainingScenarios.flatMap((s, i) => trainingScenarioBlock(i + 1, s)),
  ],
};

// ==== BUILD DE DOCUMENTO ====
function buildDocument({ headerTitle, sections }) {
  return new Document({
    creator: "ESTG-IPL — MAP — STI",
    title: headerTitle,
    styles: {
      default: { document: { run: { font: "Calibri", size: 22 } } },
      paragraphStyles: [
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 36, bold: true, font: "Calibri", color: DARK_BLUE },
          paragraph: { spacing: { before: 240, after: 240 }, outlineLevel: 0 } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 28, bold: true, font: "Calibri", color: DARK_BLUE },
          paragraph: { spacing: { before: 240, after: 160 }, outlineLevel: 1 } },
      ],
    },
    sections: [{
      properties: {
        page: {
          size: { width: A4_W, height: A4_H },
          margin: { top: 1440, right: MARGIN, bottom: 1440, left: MARGIN, header: 720, footer: 720 },
        },
      },
      headers: { default: buildHeader(headerTitle) },
      footers: { default: buildFooter() },
      children: sections,
    }],
  });
}

// ==== GERAR TODOS ====
const OUT_DIR = path.join(__dirname, '..', 'docs', 'er', 'worksheets');
const docs = [
  templateDoc,
  trainingDoc,
  guiado1, guiado2, guiado3, guiado4,
  guiado1Scaffold, guiado2Scaffold, guiado3Scaffold, guiado4Scaffold,
  guiado1Solucao, guiado2Solucao, guiado3Solucao, guiado4Solucao,
  auto1, auto2, auto3, auto4,
];

(async () => {
  for (const d of docs) {
    const doc = buildDocument(d);
    const buffer = await Packer.toBuffer(doc);
    const outPath = path.join(OUT_DIR, d.filename);
    fs.writeFileSync(outPath, buffer);
    console.log("✓", d.filename);
  }
  console.log("Done.");
})();
