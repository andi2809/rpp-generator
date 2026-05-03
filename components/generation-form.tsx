import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { CollapsibleSection } from "@/components/collapsible-section";
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
  inputMode,
  register,
  errors,
}: {
  curriculum: GenerateRppValues["curriculum"];
  inputMode: GenerateRppValues["inputMode"];
  register: UseFormRegister<GenerateRppValues>;
  errors: FieldErrors<GenerateRppValues>;
}) {
  const isK13 = curriculum === "kurikulum-2013";
  const isFullAi = inputMode === "full-ai";
  const additionalDescription = isFullAi
    ? "Buka bagian ini jika Anda ingin memberi arahan tambahan. Jika dibiarkan kosong, AI akan membantu melengkapinya."
    : "Buka bagian ini untuk menambahkan detail opsional tanpa membuat form utama terasa terlalu padat.";

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <InputField label="Nama sekolah / satuan pendidikan" required error={errors.schoolName?.message} {...register("schoolName")} />
      <InputField label="Mata pelajaran" required error={errors.subject?.message} {...register("subject")} />
      <InputField label={isK13 ? "Kelas" : "Fase / kelas"} required error={errors.gradeLevel?.message} {...register("gradeLevel")} />
      <SelectField label="Semester" options={selectOptions.semester} required error={errors.semester?.message} {...register("semester")} />
      <InputField label="Topik / pokok bahasan" required error={errors.topic?.message} {...register("topic")} />
      <InputField label="Tahun ajaran" required helperText="Contoh: 2026/2027" error={errors.academicYear?.message} {...register("academicYear")} />
      <InputField label="Alokasi waktu" required helperText="Contoh: 2 x 45 menit" error={errors.timeAllocation?.message} {...register("timeAllocation")} />

      {isK13 ? (
        <>
          <TextareaField
            label={isFullAi ? "Kompetensi acuan / ringkasan KI-KD" : "Kompetensi / capaian pendukung"}
            required={isFullAi}
            helperText={isFullAi ? "Cukup isi ringkasan kompetensi utama agar AI punya arah yang jelas." : "Isi jika ada ringkasan kompetensi tambahan di luar KI/KD."}
            rows={4}
            error={errors.learningOutcomes?.message}
            {...register("learningOutcomes")}
            className="md:col-span-2"
          />
          <TextareaField
            label="Tujuan pembelajaran"
            required
            rows={5}
            error={errors.learningGoals?.message}
            {...register("learningGoals")}
            className="md:col-span-2"
          />

          {!isFullAi ? (
            <>
              <TextareaField
                label="Kompetensi Inti (KI)"
                rows={4}
                error={errors.kompetensiInti?.message}
                {...register("kompetensiInti")}
                className="md:col-span-2"
              />
              <TextareaField
                label="Kompetensi Dasar (KD)"
                rows={4}
                error={errors.kompetensiDasar?.message}
                {...register("kompetensiDasar")}
                className="md:col-span-2"
              />
              <TextareaField
                label="Indikator pencapaian kompetensi"
                rows={4}
                error={errors.indikatorKompetensi?.message}
                {...register("indikatorKompetensi")}
                className="md:col-span-2"
              />
              <TextareaField label="Materi pembelajaran" rows={4} error={errors.material?.message} {...register("material")} className="md:col-span-2" />
              <TextareaField label="Model pembelajaran" rows={4} error={errors.learningModel?.message} {...register("learningModel")} />
              <TextareaField label="Metode / pendekatan pembelajaran" rows={4} error={errors.teachingMethod?.message} {...register("teachingMethod")} />
              <TextareaField label="Media / alat / bahan" rows={4} error={errors.learningMedia?.message} {...register("learningMedia")} />
              <TextareaField label="Sumber belajar" rows={4} error={errors.learningResources?.message} {...register("learningResources")} />
              <TextareaField
                label="Rencana penilaian"
                helperText="Jelaskan penilaian sikap, pengetahuan, dan keterampilan bila sudah ada arahan khusus."
                rows={4}
                error={errors.assessmentPlan?.message}
                {...register("assessmentPlan")}
                className="md:col-span-2"
              />
            </>
          ) : null}
        </>
      ) : (
        <>
          <TextareaField
            label="Capaian pembelajaran (CP)"
            required
            rows={5}
            error={errors.learningOutcomes?.message}
            {...register("learningOutcomes")}
            className="md:col-span-2"
          />
          <TextareaField
            label="Tujuan pembelajaran (TP)"
            required
            rows={5}
            error={errors.learningGoals?.message}
            {...register("learningGoals")}
            className="md:col-span-2"
          />

          {!isFullAi ? (
            <>
              <TextareaField
                label="ATP / alur tujuan pembelajaran"
                required
                rows={4}
                error={errors.atp?.message}
                {...register("atp")}
                className="md:col-span-2"
              />
              <TextareaField label="Materi / elemen yang dipelajari" rows={4} error={errors.material?.message} {...register("material")} className="md:col-span-2" />
              <TextareaField
                label="Karakteristik peserta didik"
                rows={4}
                error={errors.studentCharacteristics?.message}
                {...register("studentCharacteristics")}
                className="md:col-span-2"
              />
              <TextareaField label="Model pembelajaran" rows={4} error={errors.learningModel?.message} {...register("learningModel")} />
              <TextareaField label="Metode / pendekatan pembelajaran" rows={4} error={errors.teachingMethod?.message} {...register("teachingMethod")} />
              <TextareaField label="Media / alat / bahan" rows={4} error={errors.learningMedia?.message} {...register("learningMedia")} />
              <TextareaField label="Sumber belajar" rows={4} error={errors.learningResources?.message} {...register("learningResources")} />
              <TextareaField
                label="Strategi diferensiasi"
                helperText="Misalnya diferensiasi konten, proses, produk, atau dukungan belajar."
                rows={4}
                error={errors.differentiationStrategy?.message}
                {...register("differentiationStrategy")}
                className="md:col-span-2"
              />
              <TextareaField
                label="Rencana asesmen"
                helperText="Jelaskan asesmen diagnostik, formatif, dan sumatif bila sudah ada arahan khusus."
                rows={4}
                error={errors.assessmentPlan?.message}
                {...register("assessmentPlan")}
                className="md:col-span-2"
              />
            </>
          ) : null}
        </>
      )}

      <CollapsibleSection title="Data Tambahan" description={additionalDescription}>
        {isK13 ? (
          <>
            {isFullAi ? (
              <>
                <TextareaField
                  label="Kompetensi Inti (KI)"
                  rows={4}
                  error={errors.kompetensiInti?.message}
                  {...register("kompetensiInti")}
                  className="md:col-span-2"
                />
                <TextareaField
                  label="Kompetensi Dasar (KD)"
                  rows={4}
                  error={errors.kompetensiDasar?.message}
                  {...register("kompetensiDasar")}
                  className="md:col-span-2"
                />
                <TextareaField
                  label="Indikator pencapaian kompetensi"
                  rows={4}
                  error={errors.indikatorKompetensi?.message}
                  {...register("indikatorKompetensi")}
                  className="md:col-span-2"
                />
                <TextareaField label="Materi pembelajaran" rows={4} error={errors.material?.message} {...register("material")} className="md:col-span-2" />
                <TextareaField label="Model pembelajaran" rows={4} error={errors.learningModel?.message} {...register("learningModel")} />
                <TextareaField label="Metode / pendekatan pembelajaran" rows={4} error={errors.teachingMethod?.message} {...register("teachingMethod")} />
                <TextareaField label="Media / alat / bahan" rows={4} error={errors.learningMedia?.message} {...register("learningMedia")} />
                <TextareaField label="Sumber belajar" rows={4} error={errors.learningResources?.message} {...register("learningResources")} />
                <TextareaField
                  label="Rencana penilaian"
                  helperText="Jelaskan penilaian sikap, pengetahuan, dan keterampilan bila ada arahan khusus."
                  rows={4}
                  error={errors.assessmentPlan?.message}
                  {...register("assessmentPlan")}
                  className="md:col-span-2"
                />
              </>
            ) : null}
            <TextareaField
              label="Remedial dan pengayaan"
              rows={4}
              error={errors.followUpPlan?.message}
              {...register("followUpPlan")}
              className="md:col-span-2"
            />
          </>
        ) : (
          <>
            {isFullAi ? (
              <>
                <TextareaField label="ATP / alur tujuan pembelajaran" rows={4} error={errors.atp?.message} {...register("atp")} className="md:col-span-2" />
                <TextareaField label="Materi / elemen yang dipelajari" rows={4} error={errors.material?.message} {...register("material")} className="md:col-span-2" />
                <TextareaField
                  label="Karakteristik peserta didik"
                  rows={4}
                  error={errors.studentCharacteristics?.message}
                  {...register("studentCharacteristics")}
                  className="md:col-span-2"
                />
                <TextareaField label="Model pembelajaran" rows={4} error={errors.learningModel?.message} {...register("learningModel")} />
                <TextareaField label="Metode / pendekatan pembelajaran" rows={4} error={errors.teachingMethod?.message} {...register("teachingMethod")} />
                <TextareaField label="Media / alat / bahan" rows={4} error={errors.learningMedia?.message} {...register("learningMedia")} />
                <TextareaField label="Sumber belajar" rows={4} error={errors.learningResources?.message} {...register("learningResources")} />
                <TextareaField
                  label="Strategi diferensiasi"
                  helperText="Misalnya diferensiasi konten, proses, produk, atau dukungan belajar."
                  rows={4}
                  error={errors.differentiationStrategy?.message}
                  {...register("differentiationStrategy")}
                  className="md:col-span-2"
                />
                <TextareaField
                  label="Rencana asesmen"
                  helperText="Jelaskan asesmen diagnostik, formatif, dan sumatif bila ada arahan khusus."
                  rows={4}
                  error={errors.assessmentPlan?.message}
                  {...register("assessmentPlan")}
                  className="md:col-span-2"
                />
              </>
            ) : null}
            <TextareaField label="Refleksi" rows={4} error={errors.reflectionPlan?.message} {...register("reflectionPlan")} className="md:col-span-2" />
            <TextareaField
              label="Tindak lanjut / remedial / pengayaan"
              rows={4}
              error={errors.followUpPlan?.message}
              {...register("followUpPlan")}
              className="md:col-span-2"
            />
          </>
        )}

        <TextareaField
          label="Preferensi format"
          helperText="Misalnya ingin sangat formal, ringkas, banyak tabel, atau menyesuaikan format administrasi sekolah."
          rows={3}
          error={errors.formatPreference?.message}
          {...register("formatPreference")}
          className="md:col-span-2"
        />
        <TextareaField
          label="Catatan tambahan untuk AI"
          helperText="Tambahkan konteks khusus sekolah atau kebutuhan lain yang belum tertampung di field lain."
          rows={4}
          error={errors.notesForAI?.message}
          {...register("notesForAI")}
          className="md:col-span-2"
        />
        <SelectField label="Gaya bahasa" options={selectOptions.writingStyle} error={errors.writingStyle?.message} {...register("writingStyle")} />
        <SelectField label="Tingkat detail" options={selectOptions.detailLevel} error={errors.detailLevel?.message} {...register("detailLevel")} />
        <SelectField label="Bahasa output" options={selectOptions.outputLanguage} error={errors.outputLanguage?.message} {...register("outputLanguage")} />
      </CollapsibleSection>
    </div>
  );
}
