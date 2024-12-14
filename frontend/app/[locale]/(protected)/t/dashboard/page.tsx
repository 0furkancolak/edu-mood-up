import { LessonOverview } from "../_components/LessonOverview";
import { StudentFeedback } from "../_components/StudentFeedback";
import TeacherAISuggestions from "../_components/TeacherAISuggestions";
import { TeacherStats } from "../_components/TeacherStats";

const stats = {
  totalStudents: 100,
  totalLessons: 50,
  averageMoodScore: 4.5,
  participationRate: 95,
};

export default function TeacherDashboardPage() {
  return (
    <div className="container space-y-8">
      <TeacherStats stats={stats} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <LessonOverview lessons={[]} />
        <div className="lg:col-span-3 space-y-4">
          <TeacherAISuggestions />
          <StudentFeedback feedback={[]} />
        </div>
      </div>
    </div>
  )
}
