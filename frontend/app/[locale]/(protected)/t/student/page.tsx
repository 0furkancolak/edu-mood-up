import TeacherStudentList from "../../t/_components/TeacherStudentList";


export default async function TeacherStudentPage() {


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Öğrencilerim</h1>
      </div>
      <TeacherStudentList />
    </div>
  )
}
