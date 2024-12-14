"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const moods = [
  { score: 5, emoji: "😄", label: "Çok İyi" },
  { score: 4, emoji: "🙂", label: "İyi" },
  { score: 3, emoji: "😐", label: "Normal" },
  { score: 2, emoji: "🙁", label: "Kötü" },
  { score: 1, emoji: "😢", label: "Çok Kötü" },
]

interface Feedback {
  id: number
  lesson: string
  date: string
  averageScore: number
  responses: number
}

export function StudentFeedback({ feedback }: { feedback: Feedback[] }) {
  const getMoodForScore = (score: number) => {
    const mood = moods.find((m) => Math.round(score) === m.score)
    return mood || moods[2] // Default to neutral if no match
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Öğrenci Geri Bildirimleri</CardTitle>
        <CardDescription>Son derslerdeki öğrenci duygu durumları</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {feedback.map((item) => {
            const mood = getMoodForScore(item.averageScore)
            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <div className="font-medium">{item.lesson}</div>
                  <div className="text-sm text-muted-foreground">
                    {item.date}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-1">{mood.emoji}</div>
                  <div className="text-sm text-muted-foreground">
                    {mood.label}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
} 