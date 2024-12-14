"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface MoodTrend {
  date: string
  score: number
}

export function MoodStats({ trend }: { trend: MoodTrend[] }) {
  const data = trend.map((item) => ({
    name: item.date,
    value: item.score,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mood Trendi</CardTitle>
        <CardDescription>
          Aylara göre ortalama mood değişimi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[0, 5]}
                ticks={[0, 1, 2, 3, 4, 5]}
              />
              <Bar
                dataKey="value"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
                className="fill-primary"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
} 