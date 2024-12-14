interface Lesson {
  id: number;
  code: string;
  name: string;
  faculty: string;
  department: string;
  teacher: string;
  students: number;
  schedule: string;
  status: string;
}

export function UniversityLessonList({ lessons }: { lessons: Lesson[] }) {
  return (
    <div className="space-y-4">
      {lessons.map((lesson) => (
        <div key={lesson.id} className="p-4 border rounded-lg">
          <h3 className="font-bold">{lesson.code} - {lesson.name}</h3>
          <p>{lesson.faculty} - {lesson.department}</p>
          <p>Öğretmen: {lesson.teacher}</p>
          <p>Öğrenci Sayısı: {lesson.students}</p>
          <p>Ders Programı: {lesson.schedule}</p>
        </div>
      ))}
    </div>
  );
} 