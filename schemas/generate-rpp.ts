import { z } from "zod";

const requiredText = (label: string, max = 1500) =>
  z.string().trim().min(2, `${label} wajib diisi`).max(max, `${label} terlalu panjang`);

const optionalText = (max = 1500) => z.string().trim().max(max).optional().default("");

export const curriculumSchema = z.enum(["kurikulum-merdeka", "kurikulum-2013"]);
export const inputModeSchema = z.enum(["full-ai", "fully-custom"]);

export const generateRppSchema = z
  .object({
    curriculum: curriculumSchema,
    inputMode: inputModeSchema.default("full-ai"),
    schoolName: requiredText("Nama sekolah", 200),
    subject: requiredText("Mata pelajaran", 200),
    gradeLevel: requiredText("Kelas / fase", 200),
    semester: z.enum(["Ganjil", "Genap"]),
    topic: requiredText("Topik / pokok bahasan", 300),
    academicYear: requiredText("Tahun ajaran", 100),
    timeAllocation: requiredText("Alokasi waktu", 200),
    kompetensiInti: optionalText(2500),
    kompetensiDasar: optionalText(2500),
    indikatorKompetensi: optionalText(2500),
    learningGoals: requiredText("Tujuan pembelajaran", 2500),
    learningOutcomes: optionalText(2500),
    atp: optionalText(2500),
    material: optionalText(2500),
    studentCharacteristics: optionalText(2000),
    teachingMethod: optionalText(1200),
    learningModel: optionalText(1200),
    learningMedia: optionalText(1200),
    learningResources: optionalText(1200),
    differentiationStrategy: optionalText(2000),
    assessmentPlan: optionalText(2000),
    reflectionPlan: optionalText(2000),
    followUpPlan: optionalText(2000),
    formatPreference: optionalText(1500),
    notesForAI: optionalText(2000),
    outputLanguage: z.enum(["Bahasa Indonesia", "English"]).default("Bahasa Indonesia"),
    writingStyle: z.enum(["formal", "semi-formal"]).default("formal"),
    detailLevel: z.enum(["ringkas", "sedang", "lengkap"]).default("sedang"),
  })
  .superRefine((data, ctx) => {
    const totalChars = Object.values(data)
      .filter((value) => typeof value === "string")
      .reduce((count, value) => count + value.length, 0);

    if (totalChars > 12000) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Total isi input terlalu panjang. Ringkas beberapa field agar generate tetap efisien.",
        path: ["notesForAI"],
      });
    }

    if (data.curriculum === "kurikulum-2013") {
      const hasCoreCompetency = Boolean(
        data.learningOutcomes.trim() || data.kompetensiDasar.trim() || data.kompetensiInti.trim(),
      );

      if (data.inputMode === "full-ai" && data.learningOutcomes.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Isi ringkasan kompetensi / KI-KD agar mode Isi Full AI punya arah yang cukup jelas.",
          path: ["learningOutcomes"],
        });
      }

      if (data.inputMode === "fully-custom" && !hasCoreCompetency) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Untuk K-13, isi minimal salah satu dari ringkasan kompetensi, KI, atau KD.",
          path: ["kompetensiDasar"],
        });
      }
    }

    if (data.curriculum === "kurikulum-merdeka" && data.learningOutcomes.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "CP wajib diisi agar draft Kurikulum Merdeka tetap akurat.",
        path: ["learningOutcomes"],
      });
    }

    if (data.curriculum === "kurikulum-merdeka" && data.inputMode === "fully-custom" && data.atp.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "ATP wajib diisi pada mode Fully Custom agar alur pembelajaran lebih presisi.",
        path: ["atp"],
      });
    }
  });

export type GenerateRppValues = z.infer<typeof generateRppSchema>;
export type InputMode = z.infer<typeof inputModeSchema>;

export const defaultGenerateRppValues: GenerateRppValues = {
  curriculum: "kurikulum-merdeka",
  inputMode: "full-ai",
  schoolName: "",
  subject: "",
  gradeLevel: "",
  semester: "Ganjil",
  topic: "",
  academicYear: "",
  timeAllocation: "2 x 45 menit",
  kompetensiInti: "",
  kompetensiDasar: "",
  indikatorKompetensi: "",
  learningGoals: "",
  learningOutcomes: "",
  atp: "",
  material: "",
  studentCharacteristics: "",
  teachingMethod: "",
  learningModel: "",
  learningMedia: "",
  learningResources: "",
  differentiationStrategy: "",
  assessmentPlan: "",
  reflectionPlan: "",
  followUpPlan: "",
  formatPreference: "",
  notesForAI: "",
  outputLanguage: "Bahasa Indonesia",
  writingStyle: "formal",
  detailLevel: "sedang",
};
