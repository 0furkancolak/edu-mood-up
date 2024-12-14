import { PeriodList } from "../period/_components/PeriodList"
import { CreatePeriodButton } from "../period/_components/CreatePeriodButton"

export default async function PeriodPage() {
  // TODO: Fetch periods from API
  const periods = [
    {
      id: 1,
      name: "2023-2024 Güz",
      startDate: "2023-09-15",
      endDate: "2024-01-15",
      status: "active",
      totalCourses: 245,
      totalTeachers: 120,
      totalStudents: 3500,
      averageMoodScore: 4.2,
    },
    {
      id: 2,
      name: "2023-2024 Bahar",
      startDate: "2024-02-15",
      endDate: "2024-06-15",
      status: "upcoming",
      totalCourses: 240,
      totalTeachers: 118,
      totalStudents: 3450,
      averageMoodScore: 0,
    },
  ]

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Yarıyıllar</h1>
        <CreatePeriodButton />
      </div>
      <PeriodList periods={periods} />
    </div>
  )
}
