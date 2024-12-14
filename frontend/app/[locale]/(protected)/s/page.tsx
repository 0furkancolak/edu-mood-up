import { MoodSelector } from "@/components/student/MoodSelector"

export default function StudentPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">How are you feeling about this lesson?</h1>
      <MoodSelector />
    </div>
  )
} 