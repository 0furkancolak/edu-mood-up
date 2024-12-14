import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const mockDepartments = [
  {
    name: "Computer Science",
    averageScore: 4.1,
    totalCourses: 15,
    totalResponses: 450,
    moodDistribution: {
      "😄": 200,
      "🙂": 150,
      "😐": 60,
      "🙁": 30,
      "😢": 10,
    },
  },
  {
    name: "Mathematics",
    averageScore: 3.9,
    totalCourses: 12,
    totalResponses: 380,
    moodDistribution: {
      "😄": 150,
      "🙂": 130,
      "😐": 70,
      "🙁": 20,
      "😢": 10,
    },
  },
]

export function UniversityStats() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="departments">Departments</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Responses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockDepartments.reduce((acc, dept) => acc + dept.totalResponses, 0)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(mockDepartments.reduce((acc, dept) => acc + dept.averageScore, 0) / mockDepartments.length).toFixed(1)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockDepartments.reduce((acc, dept) => acc + dept.totalCourses, 0)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Departments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockDepartments.length}</div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="departments">
        <div className="grid gap-4 md:grid-cols-2">
          {mockDepartments.map((dept, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{dept.name}</CardTitle>
                <CardDescription>
                  Average Score: {dept.averageScore.toFixed(1)} / 5.0
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>Total Courses: {dept.totalCourses}</div>
                    <div>Total Responses: {dept.totalResponses}</div>
                  </div>
                  <div className="flex justify-between items-center border rounded-lg p-3">
                    {Object.entries(dept.moodDistribution).map(([mood, count]) => (
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
      </TabsContent>
    </Tabs>
  )
} 