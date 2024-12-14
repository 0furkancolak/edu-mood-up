import { UniversitySettingsForm } from "./_components/UniversitySettingsForm"

export default async function UniversitySettingsPage() {
  // TODO: Fetch university settings from API
  const settings = {
    teacherEmailDomain: "edu.tr",
    studentEmailDomain: "stu.edu.tr",
    universityName: "Örnek Üniversitesi",
    academicYear: "2023-2024",
    currentSemester: "Bahar",
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Üniversite Ayarları</h1>
      <UniversitySettingsForm initialSettings={settings} />
    </div>
  )
}
