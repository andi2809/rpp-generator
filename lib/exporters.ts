"use client";

export async function exportPreviewToPdf(element: HTMLElement, fileName = "rpp.pdf") {
  const html2pdfModule = await import("html2pdf.js");
  const html2pdf = (html2pdfModule as { default: any }).default;

  await html2pdf()
    .set({
      margin: [12, 12, 12, 12],
      filename: fileName,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] },
    })
    .from(element)
    .save();
}

export async function exportMarkdownToDocx(markdown: string, fileName = "rpp.docx") {
  const { exportMarkdownToDocxFile } = await import("@/lib/docx-export");
  await exportMarkdownToDocxFile(markdown, fileName);
}
