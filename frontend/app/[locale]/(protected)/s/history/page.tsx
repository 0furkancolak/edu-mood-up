import { MoodHistory } from "@/components/student/MoodHistory"

export default function StudentHistoryPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Feedback History</h1>
      <MoodHistory />
    </div>
  )
} 