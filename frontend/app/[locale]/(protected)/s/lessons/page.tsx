import React from 'react'
import { Card, CardContent } from "@/components/ui/card"

interface DailyLesson {
  time: string
  subject: string
  teacher?: string
  classroom?: string
}

interface WeeklySchedule {
  monday: DailyLesson[]
  tuesday: DailyLesson[]
  wednesday: DailyLesson[]
  thursday: DailyLesson[]
  friday: DailyLesson[]
}

const weeklySchedule: WeeklySchedule = {
  monday: [
    { time: "09:00 - 09:45", subject: "Matematik" },
    { time: "10:00 - 10:45", subject: "Türkçe" },
    { time: "13:15 - 14:00", subject: "Fizik" },
  ],
  tuesday: [
    { time: "09:00 - 09:45", subject: "Fizik" },
    { time: "11:30 - 12:15", subject: "Tarih" },
  ],
  wednesday: [
    { time: "10:00 - 10:45", subject: "Kimya" },
    { time: "11:30 - 12:15", subject: "Coğrafya" },
    { time: "14:15 - 15:00", subject: "Matematik" },
  ],
  thursday: [
    { time: "09:00 - 09:45", subject: "Biyoloji" },
    { time: "13:15 - 14:00", subject: "Matematik" },
  ],
  friday: [
    { time: "10:00 - 10:45", subject: "İngilizce" },
    { time: "11:30 - 12:15", subject: "Fizik" },
  ]
}

export default function LessonSchedule() {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] as const

  return (
    <div className="p-3">
      <h1 className="text-2xl font-bold mb-6">Haftalık Ders Programı</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {days.map((day) => (
          <Card key={day}>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">
                {day === 'monday' && 'Pazartesi'}
                {day === 'tuesday' && 'Salı'}
                {day === 'wednesday' && 'Çarşamba'}
                {day === 'thursday' && 'Perşembe'}
                {day === 'friday' && 'Cuma'}
              </h2>
              <div className="space-y-3">
                {weeklySchedule[day].map((lesson, index) => (
                  <div
                    key={index}
                    className="p-3 bg-slate-50 rounded-lg"
                  >
                    <div className="text-sm font-medium text-slate-500">
                      {lesson.time}
                    </div>
                    <div className="font-medium">
                      {lesson.subject}
                    </div>
                    {lesson.teacher && (
                      <div className="text-sm text-slate-500">
                        {lesson.teacher}
                      </div>
                    )}
                    {lesson.classroom && (
                      <div className="text-sm text-slate-500">
                        Sınıf: {lesson.classroom}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
