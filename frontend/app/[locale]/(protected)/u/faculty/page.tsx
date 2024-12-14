import { FacultyList } from "./_components/FacultyList"
import { CreateFacultyButton } from "./_components/CreateFacultyButton"

export default async function FacultyPage() {
  // TODO: Fetch faculties from API
  const faculties = [
    { id: 1, name: "Mühendislik Fakültesi", departments: 5, teachers: 45, students: 1200 },
    { id: 2, name: "Tıp Fakültesi", departments: 3, teachers: 60, students: 800 },
  ]

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Fakülteler</h1>
        <CreateFacultyButton />
      </div>
      <FacultyList faculties={faculties} />
    </div>
  )
}
