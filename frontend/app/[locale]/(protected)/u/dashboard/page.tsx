import { UniversityOverview } from "./_components/UniversityOverview"
import { FacultyOverview } from "./_components/FacultyOverview"
import { DepartmentOverview } from "./_components/DepartmentOverview"
import { SemesterMoodStats } from "./_components/SemesterMoodStats"

export default async function UniversityDashboardPage() {
  // TODO: Fetch university stats from API
  const stats = {
    totalStudents: 12500,
    totalTeachers: 450,
    totalCourses: 850,
    totalFaculties: 8,
    totalDepartments: 35,
    participationRate: 85,
    faculties: [
      { name: "Mühendislik", students: 3500, teachers: 120, departments: 8 },
      { name: "Tıp", students: 2000, teachers: 150, departments: 5 },
      { name: "İşletme", students: 2800, teachers: 80, departments: 6 },
    ],
    departments: [
      { name: "Bilgisayar Müh.", faculty: "Mühendislik", students: 800, teachers: 25 },
      { name: "Makine Müh.", faculty: "Mühendislik", students: 750, teachers: 22 },
      { name: "İç Hastalıkları", faculty: "Tıp", students: 400, teachers: 35 },
    ],
    semesterMoods: [
      { semester: "2023-2024 Güz", averageMood: 4.2, participationRate: 85 },
      { semester: "2022-2023 Bahar", averageMood: 4.1, participationRate: 82 },
      { semester: "2022-2023 Güz", averageMood: 4.0, participationRate: 80 },
      { semester: "2021-2022 Bahar", averageMood: 3.9, participationRate: 78 },
      { semester: "2021-2022 Güz", averageMood: 3.8, participationRate: 75 },
    ],
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Üniversite Genel Durum</h1>
      
      <div className="grid gap-6">
        <UniversityOverview stats={stats} />
        
        <div className="grid md:grid-cols-2 gap-6">
          <FacultyOverview faculties={stats.faculties} />
          <DepartmentOverview departments={stats.departments} />
        </div>
        
        <SemesterMoodStats semesters={stats.semesterMoods} />
      </div>
    </div>
  )
}
