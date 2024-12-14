import { CourseStats } from "@/components/teacher/CourseStats"

export default function TeacherPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Course Feedback Dashboard</h1>
      <CourseStats />
    </div>
  )
} 