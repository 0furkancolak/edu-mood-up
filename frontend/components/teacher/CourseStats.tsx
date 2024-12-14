import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const mockCourses = [
  {
    name: "Mathematics 101",
    averageScore: 4.2,
    totalResponses: 25,
    moodDistribution: {
      "😄": 12,
      "🙂": 8,
      "😐": 3,
      "🙁": 1,
      "😢": 1,
    },
  },
  {
    name: "Physics 101",
    averageScore: 3.8,
    totalResponses: 20,
    moodDistribution: {
      "😄": 8,
      "🙂": 7,
      "😐": 3,
      "🙁": 2,
      "😢": 0,
    },
  },
]

export function CourseStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {mockCourses.map((course, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{course.name}</CardTitle>
            <CardDescription>
              Average Score: {course.averageScore.toFixed(1)} / 5.0
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>Total Responses: {course.totalResponses}</div>
              <div className="flex justify-between items-center border rounded-lg p-3">
                {Object.entries(course.moodDistribution).map(([mood, count]) => (
                  <div key={mood} className="text-center">
                    <div className="text-2xl mb-1">{mood}</div>
                    <div className="text-sm text-muted-foreground">{count}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 