import { DepartmentList } from "./_components/DepartmentList"
import { CreateDepartmentButton } from "./_components/CreateDepartmentButton"

export default async function DepartmentPage() {
  // TODO: Fetch departments from API
  const departments = [
    {
      id: 1,
      name: "Bilgisayar Mühendisliği",
      facultyName: "Mühendislik Fakültesi",
      headOfDepartment: "Prof. Dr. Ahmet Yılmaz",
      totalTeachers: 15,
      totalStudents: 300,
      totalCourses: 24,
    },
    {
      id: 2,
      name: "Makine Mühendisliği",
      facultyName: "Mühendislik Fakültesi",
      headOfDepartment: "Prof. Dr. Mehmet Demir",
      totalTeachers: 18,
      totalStudents: 350,
      totalCourses: 28,
    },
  ]

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bölümler</h1>
        <CreateDepartmentButton />
      </div>
      <DepartmentList departments={departments} />
    </div>
  )
}
