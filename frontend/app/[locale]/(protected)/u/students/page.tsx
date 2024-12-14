import { UniversityStudentList } from "../students/_components/UniversityStudentList"
import { CreateStudentButton } from "../students/_components/CreateStudentButton"

export default async function UniversityStudentsPage() {
  // TODO: Fetch students from API
  const students = [
    {
      id: 1,
      name: "Ali Yılmaz",
      studentNumber: "2024001",
      email: "ali.yilmaz@stu.edu.tr",
      faculty: "Mühendislik Fakültesi",
      department: "Bilgisayar Mühendisliği",
      enrolledCourses: 6,
      status: "active",
    },
    {
      id: 2,
      name: "Ayşe Demir",
      studentNumber: "2024002",
      email: "ayse.demir@stu.edu.tr",
      faculty: "Mühendislik Fakültesi",
      department: "Bilgisayar Mühendisliği",
      enrolledCourses: 5,
      status: "active",
    },
    {
      id: 3,
      name: "Mehmet Kaya",
      studentNumber: "2024003",
      email: "mehmet.kaya@stu.edu.tr",
      faculty: "Tıp Fakültesi",
      department: "Tıp",
      enrolledCourses: 7,
      status: "active",
    },
  ]

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Öğrenciler</h1>
        <CreateStudentButton />
      </div>
      <UniversityStudentList students={students} />
    </div>
  )
}
