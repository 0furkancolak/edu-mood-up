import { UniversityLessonList } from "./_components/UniversityLessonList"
import { CreateLessonButton } from "./_components/CreateLessonButton"

export default async function UniversityLessonsPage() {
  // TODO: Fetch lessons from API
  const lessons = [
    {
      id: 1,
      code: "CSE101",
      name: "Algoritma ve Programlama",
      faculty: "Mühendislik Fakültesi",
      department: "Bilgisayar Mühendisliği",
      teacher: "Prof. Dr. Ahmet Yılmaz",
      students: 45,
      schedule: "Pazartesi 09:00-12:00",
      status: "active",
    },
    {
      id: 2,
      code: "CSE102",
      name: "Veri Yapıları",
      faculty: "Mühendislik Fakültesi",
      department: "Bilgisayar Mühendisliği",
      teacher: "Doç. Dr. Ayşe Kaya",
      students: 40,
      schedule: "Çarşamba 13:00-16:00",
      status: "active",
    },
    {
      id: 3,
      code: "MED101",
      name: "Anatomi",
      faculty: "Tıp Fakültesi",
      department: "Tıp",
      teacher: "Prof. Dr. Mehmet Demir",
      students: 60,
      schedule: "Salı 09:00-12:00",
      status: "active",
    },
  ]

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dersler</h1>
        <CreateLessonButton />
      </div>
      <UniversityLessonList lessons={lessons} />
    </div>
  )
}
