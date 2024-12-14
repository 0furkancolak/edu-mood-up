"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Lesson {
  id: number
  lesson: string
  date: string
  averageScore: number
  responses: number
}

export function LessonOverview({ lessons }: { lessons: Lesson[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ders Genel Bakış</CardTitle>
        <CardDescription>Son derslerin mood skorları</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{lesson.lesson}</div>
                  <div className="text-sm text-muted-foreground">
                    {lesson.date}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    {lesson.averageScore.toFixed(1)}/5.0
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {lesson.responses} yanıt
                  </div>
                </div>
              </div>
              <Progress
                value={(lesson.averageScore / 5) * 100}
                className="h-2"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 