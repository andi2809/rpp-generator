import { Document, HeadingLevel, Packer, Paragraph, Table, TableCell, TableRow, TextRun, WidthType } from "docx";

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

function createParagraph(line: string) {
  if (!line.trim()) {
    return new Paragraph({ text: "" });
  }

  if (line.startsWith("# ")) {
    return new Paragraph({ text: line.replace(/^#\s+/, ""), heading: HeadingLevel.HEADING_1 });
  }

  if (line.startsWith("## ")) {
    return new Paragraph({ text: line.replace(/^##\s+/, ""), heading: HeadingLevel.HEADING_2 });
  }

  if (line.startsWith("### ")) {
    return new Paragraph({ text: line.replace(/^###\s+/, ""), heading: HeadingLevel.HEADING_3 });
  }

  if (/^\d+\.\s+/.test(line)) {
    return new Paragraph({
      numbering: {
        reference: "rpp-numbered",
        level: 0,
      },
      children: [new TextRun(line.replace(/^\d+\.\s+/, ""))],
    });
  }

  if (line.startsWith("- ")) {
    return new Paragraph({
      bullet: { level: 0 },
      children: [new TextRun(line.replace(/^-\s+/, ""))],
    });
  }

  return new Paragraph({ children: [new TextRun(line)] });
}

function parseMarkdownTable(lines: string[]) {
  const rows = lines
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim()));

  if (rows.length < 2) {
    return rows.map((row) => new Paragraph({ text: row.join(" | ") }));
  }

  const bodyRows = rows.filter((_, index) => index !== 1);

  return [
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: bodyRows.map((row) =>
        new TableRow({
          children: row.map(
            (cell) =>
              new TableCell({
                children: [new Paragraph({ text: cell })],
              }),
          ),
        }),
      ),
    }),
  ];
}

function markdownToDocxNodes(markdown: string) {
  const lines = markdown.split("\n");
  const nodes: Array<Paragraph | Table> = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (line.trim().startsWith("|")) {
      const tableLines = [line];
      let cursor = index + 1;

      while (cursor < lines.length && lines[cursor].trim().startsWith("|")) {
        tableLines.push(lines[cursor]);
        cursor += 1;
      }

      nodes.push(...parseMarkdownTable(tableLines));
      index = cursor - 1;
      continue;
    }

    nodes.push(createParagraph(line));
  }

  return nodes;
}

export async function exportMarkdownToDocxFile(markdown: string, fileName = "rpp.docx") {
  const children = markdownToDocxNodes(markdown);

  const doc = new Document({
    numbering: {
      config: [
        {
          reference: "rpp-numbered",
          levels: [
            {
              level: 0,
              format: "decimal",
              text: "%1.",
              alignment: "start",
              style: {
                paragraph: {
                  indent: { left: 720, hanging: 260 },
                },
              },
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: {},
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  downloadBlob(blob, fileName);
}
