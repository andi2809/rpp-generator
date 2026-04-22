import { z } from "zod";

const requiredText = (label: string, max = 1500) =>
  z.string().trim().min(2, `${label} wajib diisi`).max(max, `${label} terlalu panjang`);

const optionalText = (max = 1500) => z.string().trim().max(max).optional().default("");

export const curriculumSchema = z.enum(["kurikulum-merdeka", "kurikulum-2013"]);

export const generateRppSchema = z
  .object({
    curriculum: curriculumSchema,
    schoolName: requiredText("Nama sekolah", 200),
    subject: requiredText("Mata pelajaran", 200),
    gradeLevel: requiredText("Kelas / fase", 200),
    semester: z.enum(["Ganjil", "Genap"]),
    topic: requiredText("Topik / pokok bahasan", 300),
    academicYear: requiredText("Tahun ajaran", 100),
    timeAllocation: requiredText("Alokasi waktu", 200),
    learningGoals: requiredText("Tujuan pembelajaran", 2500),
    learningOutcomes: optionalText(2500),
    atp: optionalText(2500),
    teachingMethod: optionalText(1000),
    learningModel: optionalText(1000),
    learningMedia: optionalText(1200),
    learningResources: optionalText(1200),
    assessmentPlan: optionalText(2000),
    notesForAI: optionalText(2000),
    outputLanguage: z.enum(["Bahasa Indonesia", "English"]).default("Bahasa Indonesia"),
    writingStyle: z.enum(["formal", "semi-formal"]).default("formal"),
    detailLevel: z.enum(["ringkas", "sedang", "lengkap"]).default("sedang"),
  })
  .superRefine((data, ctx) => {
    const totalChars = Object.values(data)
      .filter((value) => typeof value === "string")
      .reduce((count, value) => count + value.length, 0);

    if (totalChars > 7000) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Total isi input terlalu panjang. Ringkas beberapa field agar generate tetap efisien.",
        path: ["notesForAI"],
      });
    }

    if (data.curriculum === "kurikulum-2013" && data.learningOutcomes.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Kompetensi / capaian untuk K-13 sebaiknya diisi agar draft lebih akurat.",
        path: ["learningOutcomes"],
      });
    }
  });

export type GenerateRppValues = z.infer<typeof generateRppSchema>;

export const defaultGenerateRppValues: GenerateRppValues = {
  curriculum: "kurikulum-merdeka",
  schoolName: "",
  subject: "",
  gradeLevel: "",
  semester: "Ganjil",
  topic: "",
  academicYear: "",
  timeAllocation: "2 x 45 menit",
  learningGoals: "",
  learningOutcomes: "",
  atp: "",
  teachingMethod: "",
  learningModel: "",
  learningMedia: "",
  learningResources: "",
  assessmentPlan: "",
  notesForAI: "",
  outputLanguage: "Bahasa Indonesia",
  writingStyle: "formal",
  detailLevel: "sedang",
};
