import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { InputField, SelectField, TextareaField } from "@/components/fields";
import type { GenerateRppValues } from "@/schemas/generate-rpp";

const selectOptions = {
  semester: [
    { label: "Ganjil", value: "Ganjil" },
    { label: "Genap", value: "Genap" },
  ],
  writingStyle: [
    { label: "Formal", value: "formal" },
    { label: "Semi formal", value: "semi-formal" },
  ],
  detailLevel: [
    { label: "Ringkas", value: "ringkas" },
    { label: "Sedang", value: "sedang" },
    { label: "Lengkap", value: "lengkap" },
  ],
  outputLanguage: [
    { label: "Bahasa Indonesia", value: "Bahasa Indonesia" },
    { label: "English", value: "English" },
  ],
};

export function GenerationForm({
  curriculum,
  register,
  errors,
}: {
  curriculum: GenerateRppValues["curriculum"];
  register: UseFormRegister<GenerateRppValues>;
  errors: FieldErrors<GenerateRppValues>;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <InputField label="Nama sekolah / satuan pendidikan" required error={errors.schoolName?.message} {...register("schoolName")} />
      <InputField label="Mata pelajaran" required error={errors.subject?.message} {...register("subject")} />
      <InputField label="Kelas / fase" required error={errors.gradeLevel?.message} {...register("gradeLevel")} />
      <SelectField label="Semester" options={selectOptions.semester} required error={errors.semester?.message} {...register("semester")} />
      <InputField label="Topik / pokok bahasan" required error={errors.topic?.message} {...register("topic")} />
      <InputField label="Tahun ajaran" required helperText="Contoh: 2026/2027" error={errors.academicYear?.message} {...register("academicYear")} />
      <InputField label="Alokasi waktu" required helperText="Contoh: 2 x 45 menit" error={errors.timeAllocation?.message} {...register("timeAllocation")} />

      <TextareaField
        label={curriculum === "kurikulum-2013" ? "Kompetensi / capaian" : "Capaian pembelajaran (CP)"}
        rows={5}
        error={errors.learningOutcomes?.message}
        {...register("learningOutcomes")}
        className="md:col-span-2"
      />
      <TextareaField
        label={curriculum === "kurikulum-2013" ? "Tujuan pembelajaran / indikator" : "Tujuan pembelajaran (TP)"}
        required
        rows={5}
        error={errors.learningGoals?.message}
        {...register("learningGoals")}
        className="md:col-span-2"
      />
      <TextareaField label="ATP / alur pembelajaran" rows={4} error={errors.atp?.message} {...register("atp")} className="md:col-span-2" />
      <TextareaField label="Model pembelajaran" rows={4} error={errors.learningModel?.message} {...register("learningModel")} />
      <TextareaField label="Metode pembelajaran" rows={4} error={errors.teachingMethod?.message} {...register("teachingMethod")} />
      <TextareaField label="Media / alat / bahan" rows={4} error={errors.learningMedia?.message} {...register("learningMedia")} />
      <TextareaField label="Sumber belajar" rows={4} error={errors.learningResources?.message} {...register("learningResources")} />
      <TextareaField label="Rencana asesmen" rows={4} error={errors.assessmentPlan?.message} {...register("assessmentPlan")} className="md:col-span-2" />
      <TextareaField
        label="Catatan tambahan untuk AI"
        helperText="Tambahkan konteks khusus, gaya dokumen, atau kebutuhan sekolah bila perlu."
        rows={4}
        error={errors.notesForAI?.message}
        {...register("notesForAI")}
        className="md:col-span-2"
      />
      <SelectField label="Gaya bahasa" options={selectOptions.writingStyle} error={errors.writingStyle?.message} {...register("writingStyle")} />
      <SelectField label="Tingkat detail" options={selectOptions.detailLevel} error={errors.detailLevel?.message} {...register("detailLevel")} />
      <SelectField label="Bahasa output" options={selectOptions.outputLanguage} error={errors.outputLanguage?.message} {...register("outputLanguage")} />
    </div>
  );
}
