import { TeacherList } from "./_components/TeacherList"
import { CreateTeacherButton } from "./_components/CreateTeacherButton"

export default async function TeachersPage() {
  // TODO: Fetch teachers from API
  const teachers = [
    {
      id: 1,
      name: "Prof. Dr. Ahmet Yılmaz",
      email: "ahmet.yilmaz@edu.tr",
      department: "Bilgisayar Mühendisliği",
      faculty: "Mühendislik Fakültesi",
      courses: ["Algoritma", "Veri Yapıları", "Programlama"],
      totalStudents: 120,
      averageMoodScore: 4.5,
    },
    {
      id: 2,
      name: "Doç. Dr. Ayşe Kaya",
      email: "ayse.kaya@edu.tr",
      department: "Makine Mühendisliği",
      faculty: "Mühendislik Fakültesi",
      courses: ["Termodinamik", "Akışkanlar Mekaniği"],
      totalStudents: 90,
      averageMoodScore: 4.2,
    },
  ]

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Öğretmenler</h1>
        <CreateTeacherButton />
      </div>
      <TeacherList teachers={teachers} />
    </div>
  )
}
