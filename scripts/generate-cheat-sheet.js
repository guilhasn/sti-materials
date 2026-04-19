// Gerador da Ficha de Consulta Rapida (Cheat Sheet) do modulo E-R
// Formato: 1 pagina A4 paisagem, densa, para imprimir e consultar ao lado do teclado.
// Executar: node scripts/generate-cheat-sheet.js

const docxPath = require('path').join(process.env.APPDATA, 'npm', 'node_modules', 'docx');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, PageOrientation,
  BorderStyle, WidthType, ShadingType,
  SectionType,
} = require(docxPath);
const fs = require('fs');
const path = require('path');

// ==== PAGINA A4 PAISAGEM ====
const A4_W = 11906;  // edge curta (usado como width do short edge)
const A4_H = 16838;  // edge longa (usada como height, vira largura em landscape)
const MARGIN = 567;  // 1 cm
// Em landscape, largura efectiva = A4_H - 2*MARGIN = 15704 DXA
const LANDSCAPE_W = A4_H - 2 * MARGIN;

// Largura de cada coluna com gap de 400 DXA entre elas
const COL_GAP = 400;
const COL_W = Math.floor((LANDSCAPE_W - COL_GAP) / 2);

// ==== CORES ====
const DARK_BLUE = "1F3864";
const LIGHT_BLUE = "DCE6F1";
const LIGHT_GREY = "F5F5F5";
const ACCENT_GREEN = "2E7D32";
const ACCENT_ORANGE = "E65100";
const ACCENT_RED = "C62828";

// ==== HELPERS ====
const border = (color = "888888") => ({ style: BorderStyle.SINGLE, size: 4, color });
const borders = (color = "888888") => ({ top: border(color), bottom: border(color), left: border(color), right: border(color) });
const cellMargins = { top: 40, bottom: 40, left: 60, right: 60 };

function P(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 40 },
    alignment: opts.align,
    children: [new TextRun({
      text: text ?? "", bold: opts.bold, italics: opts.italic,
      size: opts.size ?? 16, color: opts.color,
      font: opts.font,
    })],
  });
}
function PMulti(runs, opts = {}) {
  return new Paragraph({ spacing: { after: opts.after ?? 40 }, alignment: opts.align, children: runs });
}

// Cabecalho de seccao (barra azul fina)
function SectionHeading(text, color = DARK_BLUE) {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    shading: { fill: color, type: ShadingType.CLEAR },
    children: [new TextRun({ text: "  " + text, bold: true, size: 18, color: "FFFFFF" })],
  });
}

// Celula compacta
function cell(text, width, opts = {}) {
  const paras = String(text ?? "").split("\n").map(line =>
    new Paragraph({
      spacing: { after: 0 },
      children: [new TextRun({
        text: line, size: opts.size ?? 14, bold: opts.bold, italics: opts.italic,
        color: opts.color, font: opts.font,
      })],
    })
  );
  return new TableCell({
    borders: borders(opts.borderColor || "AAAAAA"),
    width: { size: width, type: WidthType.DXA },
    shading: opts.fill ? { fill: opts.fill, type: ShadingType.CLEAR } : undefined,
    margins: cellMargins, children: paras,
  });
}
function hcell(text, width, color = DARK_BLUE) {
  return new TableCell({
    borders: borders("666666"),
    width: { size: width, type: WidthType.DXA },
    shading: { fill: color, type: ShadingType.CLEAR },
    margins: cellMargins,
    children: [new Paragraph({
      children: [new TextRun({ text, bold: true, color: "FFFFFF", size: 14 })],
    })],
  });
}

function compactTable(headers, widths, rows, opts = {}) {
  const trs = [new TableRow({
    tableHeader: true,
    children: headers.map((h, i) => hcell(h, widths[i], opts.headerColor)),
  })];
  rows.forEach(r => trs.push(new TableRow({
    children: r.map((v, i) => cell(v, widths[i], { size: 13, fill: i === r.length - 1 && opts.highlightLast ? LIGHT_BLUE : undefined })),
  })));
  return new Table({
    width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    columnWidths: widths, rows: trs,
  });
}

// ==== CONTEUDO ====

// TITULO CENTRAL (topo, fullwidth)
const titulo = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: DARK_BLUE, space: 2 } },
    children: [
      new TextRun({ text: "Modelacao E-R — ", bold: true, size: 28, color: DARK_BLUE }),
      new TextRun({ text: "Ficha de Consulta Rapida", bold: true, size: 28, color: ACCENT_ORANGE }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
    children: [new TextRun({
      text: "STI — Mestrado em Administracao Publica — ESTG-IPL",
      italics: true, size: 14, color: "666666",
    })],
  }),
];

// ==== COLUNA ESQUERDA: NOTACAO + ATRIBUTOS + RELACIONAL ====

const colEsquerda = [
  // --- NOTACAO CHEN ---
  SectionHeading("1. Notacao Chen (diagrama E-R)"),
  compactTable(
    ["Elemento", "Simbolo", "Significado"],
    [1400, 1400, 3500],
    [
      ["Entidade", "Rectangulo", "Coisa com identidade propria (Leitor, Livro)"],
      ["Relacao", "Losango", "Ligacao entre entidades (requisita, escreve)"],
      ["Atributo", "Elipse", "Propriedade de entidade ou relacao"],
      ["Atributo-chave", "Elipse sublinhada", "PK - identifica univocamente (sublinhado)"],
      ["Multivalor", "Elipse dupla", "Pode ter varios valores (telefones)"],
      ["Derivado", "Elipse tracejada", "Calculado (idade a partir da data nasc.)"],
      ["Participacao obrig.", "Linha dupla", "Todo X tem Y obrigatoriamente"],
      ["Participacao opc.", "Linha simples", "X pode ter Y (opcional)"],
    ]
  ),

  new Paragraph({ spacing: { after: 80 }, children: [new TextRun("")] }),

  // --- 5 TIPOS DE ATRIBUTOS ---
  SectionHeading("2. 5 Tipos de Atributos"),
  compactTable(
    ["Tipo", "Exemplo"],
    [2200, 4100],
    [
      ["Atomico (simples)", "codLeitor, NIF, ano"],
      ["Composto", "morada = {rua, num, cidade, CP}"],
      ["Multivalor", "telefones = [912..., 926...]"],
      ["Derivado", "idade = hoje - dataNascimento"],
      ["Chave (PK)", "ISBN, codLeitor, matricula"],
    ]
  ),

  new Paragraph({ spacing: { after: 80 }, children: [new TextRun("")] }),

  // --- NOTACAO RELACIONAL ---
  SectionHeading("3. Notacao Relacional (esquema final)"),
  new Paragraph({
    spacing: { after: 60 },
    children: [new TextRun({
      text: "TABELA(pk_sublinhada, atributo1, atributo2, #fk → TabelaOutra)",
      font: "Consolas", size: 14, color: DARK_BLUE,
    })],
  }),
  new Paragraph({
    spacing: { after: 40 },
    children: [new TextRun({ text: "Regras de notacao:", bold: true, size: 14 })],
  }),
  new Paragraph({
    spacing: { after: 30 }, bullet: { level: 0 },
    children: [new TextRun({ text: "PK sublinhada (ou a negrito)", size: 13 })],
  }),
  new Paragraph({
    spacing: { after: 30 }, bullet: { level: 0 },
    children: [new TextRun({ text: "FK prefixada com # (hash)", size: 13 })],
  }),
  new Paragraph({
    spacing: { after: 30 }, bullet: { level: 0 },
    children: [new TextRun({ text: "Uma tabela por linha", size: 13 })],
  }),
  new Paragraph({
    spacing: { after: 80 }, bullet: { level: 0 },
    children: [new TextRun({ text: "Exemplo: Emprestimo(#codLeitor, #ISBN, data, devolvido)", size: 13, font: "Consolas", color: DARK_BLUE })],
  }),

  // --- 9 FASES ---
  SectionHeading("4. 9 Fases de Criacao de uma BD"),
  compactTable(
    ["#", "Fase", "Resultado"],
    [500, 2500, 3300],
    [
      ["1", "Determinar entidades", "Lista de entidades relevantes"],
      ["2", "Desenhar DER simplificado", "Diagrama com entidades e relacoes"],
      ["3", "Definir pressupostos", "Regras de negocio documentadas"],
      ["4", "Desenhar DER completo", "Atributos, PKs e cardinalidades"],
      ["5", "Determinar tabelas", "Esquema relacional preliminar"],
      ["6", "Determinar chaves candidatas", "Lista de possiveis identificadores"],
      ["7", "Determinar chaves primarias", "PK escolhida para cada tabela"],
      ["8", "Definir tabelas finais", "Esquema completo com PKs e FKs"],
      ["9", "Definir dominio dos atributos", "Tipos e restricoes"],
    ]
  ),
];

// ==== COLUNA DIREITA: METODO FASE 5 + ATALHO + 7 REGRAS + TIPOS DADOS ====

const colDireita = [
  // --- METODO DA FASE 5 ---
  SectionHeading("5. Fase 5 — Metodo dos 4 Passos", ACCENT_ORANGE),
  new Paragraph({
    spacing: { after: 40 },
    children: [new TextRun({ text: "Para cada relacao, faca este exercicio mental:", italics: true, size: 13 })],
  }),
  compactTable(
    ["Passo", "O que faz"],
    [1000, 5300],
    [
      ["A — Tentativa", "Meta a FK no lado mais natural. Escreva 3 linhas com dados reais."],
      ["B — Observacao", "Aparecem NULLs (celulas vazias)? Aparecem linhas repetidas?"],
      ["C — Decisao", "Tudo limpo → 2 tabelas. Com problemas → criar tabela associativa (3 tabelas)."],
      ["D — Regra", "Nomeie a regra aplicada (4, 5 ou 6)."],
    ]
  ),

  new Paragraph({ spacing: { after: 80 }, children: [new TextRun("")] }),

  // --- ATALHO MENTAL ---
  SectionHeading("6. Atalho Mental (o mais importante!)", ACCENT_ORANGE),
  compactTable(
    ["O que ve na tentativa?", "O que faz?", "Regra"],
    [2600, 2800, 900],
    [
      ["Tudo limpo (sem NULLs nem repeticoes)", "Fica com 2 tabelas", "Regra 4"],
      ["Celulas vazias (NULLs)", "Cria 3a tabela associativa", "Regra 5"],
      ["Linhas repetidas", "Cria 3a tabela associativa", "Regra 6"],
    ],
    { highlightLast: true }
  ),

  new Paragraph({ spacing: { after: 80 }, children: [new TextRun("")] }),

  // --- 7 REGRAS ---
  SectionHeading("7. Tabela Completa das 7 Regras"),
  compactTable(
    ["R", "Cardinalidade", "Participacao", "N.º Tabelas", "Onde fica a FK"],
    [300, 1200, 1900, 900, 2000],
    [
      ["1", "1:1", "Obrig. ambas", "1", "PK qualquer"],
      ["2", "1:1", "Obrig. numa", "2", "PK nao-obrig. → obrig."],
      ["3", "1:1", "Nenhuma obrig.", "3", "Tabela de relacao"],
      ["4", "1:N", "Obrig. lado N", "2", "PK do lado 1 → no N"],
      ["5", "1:N", "Nao obrig. N", "3", "Tabela de relacao"],
      ["6", "M:N", "Indiferente", "3", "Tabela assoc. com ambas"],
      ["7", "Ternaria", "Indiferente", "4", "Tabela com todas PKs"],
    ]
  ),

  new Paragraph({ spacing: { after: 80 }, children: [new TextRun("")] }),

  // --- TIPOS DE DADOS ---
  SectionHeading("8. Tipos de Dados Comuns (Fase 9)"),
  compactTable(
    ["Tipo", "Uso tipico"],
    [2000, 4300],
    [
      ["INTEGER", "Codigos internos, contadores, idades"],
      ["VARCHAR(n)", "Texto de tamanho variavel (nome, morada)"],
      ["TEXT", "Texto longo livre (descricoes, observacoes)"],
      ["DATE", "Datas (2025-01-15)"],
      ["DATETIME", "Data + hora"],
      ["DECIMAL(p,s)", "Valores monetarios (preco, custo)"],
      ["BOOLEAN", "Sim/Nao (activo, devolvido)"],
    ]
  ),
];

// ==== BUILD ====
// Usar duas seccoes: cabecalho fullwidth, depois duas colunas
// OU usar tabela 1x2 como layout para simular duas colunas
// Opcao mais robusta: layout em tabela

const layoutTable = new Table({
  width: { size: LANDSCAPE_W, type: WidthType.DXA },
  columnWidths: [COL_W, COL_GAP, COL_W],
  rows: [new TableRow({
    children: [
      new TableCell({
        borders: {
          top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
        },
        width: { size: COL_W, type: WidthType.DXA },
        margins: { top: 0, bottom: 0, left: 0, right: 100 },
        children: colEsquerda,
      }),
      new TableCell({
        borders: {
          top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
        },
        width: { size: COL_GAP, type: WidthType.DXA },
        children: [new Paragraph("")],
      }),
      new TableCell({
        borders: {
          top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
        },
        width: { size: COL_W, type: WidthType.DXA },
        margins: { top: 0, bottom: 0, left: 100, right: 0 },
        children: colDireita,
      }),
    ],
  })],
});

// Rodape curto
const rodape = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 120, after: 0 },
    border: { top: { style: BorderStyle.SINGLE, size: 6, color: DARK_BLUE, space: 2 } },
    children: [
      new TextRun({ text: "Site completo: ", size: 14, color: "666666" }),
      new TextRun({ text: "guilhasn.github.io/sti-materials/er/", size: 14, color: DARK_BLUE, bold: true }),
      new TextRun({ text: "   |   Versao 2025/2026", italics: true, size: 14, color: "666666" }),
    ],
  }),
];

const doc = new Document({
  creator: "ESTG-IPL MAP STI",
  title: "Ficha de Consulta Rapida — Modelacao E-R",
  styles: {
    default: { document: { run: { font: "Calibri", size: 18 } } },
  },
  sections: [{
    properties: {
      page: {
        size: {
          width: A4_W,
          height: A4_H,
          orientation: PageOrientation.LANDSCAPE,
        },
        margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN },
      },
    },
    children: [
      ...titulo,
      layoutTable,
      ...rodape,
    ],
  }],
});

const OUT_DIR = path.join(__dirname, '..', 'docs', 'er', 'worksheets');
const outPath = path.join(OUT_DIR, "cheat-sheet-er.docx");
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outPath, buffer);
  console.log("✓", outPath);
});
