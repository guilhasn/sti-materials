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

function fase1() {
  return [
    H2("Fase 1 — Determinar entidades"),
    P("Liste as entidades que identifica no cenário. Uma entidade representa algo que existe independentemente (pessoa, objecto, evento) e sobre a qual queremos guardar dados."),
    hint("Que «coisas» o cenário descreve? Cada uma pode tornar-se uma entidade?"),
    space(120),
    makeTable(["Entidade", "Descrição curta"], [3200, 6438], [], 6),
    space(),
  ];
}
function fase2() {
  return [
    H2("Fase 2 — Desenhar DER simplificado"),
    P("Liste as relações entre pares de entidades, sem atributos ainda. Pode esboçar o diagrama em papel ou começar no ERDPlus."),
    hint("Entre que entidades existe ligação? Use um verbo curto para dar nome à relação."),
    space(120),
    makeTable(["Relação (verbo)", "Entidade A", "Entidade B"], [3200, 3200, 3238], [], 5),
    space(),
  ];
}
function fase3() {
  return [
    H2("Fase 3 — Definir pressupostos"),
    P("Um pressuposto é uma regra de negócio explícita que justifica as cardinalidades. Escreva frases claras do tipo «Cada X tem um Y» ou «Um Z pode ter vários W»."),
    hint("O que é obrigatório? O que é opcional? Qual é o máximo de ligações em cada lado?"),
    space(120),
    ...blankLines(7),
    space(),
  ];
}
function fase4() {
  return [
    H2("Fase 4 — Desenhar DER completo"),
    P("Para cada entidade indique os atributos, a chave primária candidata e as cardinalidades das suas relações (1:1, 1:N, M:N) com indicação de obrigatoriedade."),
    hint("Desenhe no ERDPlus com atributos em elipses, chave sublinhada e cardinalidades nas linhas da relação."),
    space(120),
    makeTable(
      ["Entidade", "Atributos", "PK candidata", "Cardinalidades"],
      [2000, 3638, 1600, 2400],
      [], 5
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
function fase6() {
  return [
    H2("Fase 6 — Determinar chaves candidatas"),
    P("Para cada tabela, identifique os atributos (ou combinações) que podem identificar univocamente uma linha."),
    hint("Que atributos são únicos por natureza? Qual serve para distinguir linhas sem ambiguidade?"),
    space(120),
    makeTable(["Tabela", "Chaves candidatas"], [3200, 6438], [], 6),
    space(),
  ];
}
function fase7() {
  return [
    H2("Fase 7 — Determinar chaves primárias"),
    P("Escolha a PK de cada tabela entre as chaves candidatas. Justifique a escolha (estabilidade, simplicidade, comprimento)."),
    hint("Prefira códigos internos a dados que podem mudar (ex.: CC, email). Simples vence compostas sempre que possível."),
    space(120),
    makeTable(["Tabela", "PK escolhida", "Justificação"], [2400, 2800, 4438], [], 6),
    space(),
  ];
}
function fase8() {
  return [
    H2("Fase 8 — Definir tabelas finais (esquema relacional)"),
    P("Escreva o esquema relacional final na notação TABELA(pk, atributo, #fk). Sublinhe a chave primária e prefixe as chaves estrangeiras com #."),
    hint("Uma linha por tabela. As FKs apontam para as PKs das tabelas referenciadas."),
    space(120),
    ...blankLines(10),
    space(),
  ];
}
function fase9() {
  return [
    H2("Fase 9 — Definir domínio dos atributos (entidade principal)"),
    P("Para a entidade mais central do modelo, defina o tipo de dados, obrigatoriedade e restrições de cada atributo."),
    hint("Tipos comuns: INTEGER, VARCHAR(n), DATE, DECIMAL(p,s), TEXT, BOOLEAN."),
    space(120),
    makeTable(
      ["Atributo", "Tipo", "Obrigatório", "Restrição"],
      [2800, 2600, 1600, 2638],
      [], 7
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

const fasesAll = (opts = {}) => [
  ...fase1(), ...fase2(), ...fase3(), ...fase4(),
  ...fase5(opts.numRelations ?? 3),
  ...fase6(), ...fase7(), ...fase8(), ...fase9(),
];

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
