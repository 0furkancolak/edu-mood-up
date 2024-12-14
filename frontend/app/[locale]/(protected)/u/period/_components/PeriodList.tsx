"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, GraduationCap, School2, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Period {
  id: number
  name: string
  startDate: string
  endDate: string
  status: "active" | "upcoming" | "completed"
  totalCourses: number
  totalTeachers: number
  totalStudents: number
  averageMoodScore: number
}

export function PeriodList({ periods }: { periods: Period[] | any }) {
  const getStatusBadge = (status: Period["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Aktif</Badge>
      case "upcoming":
        return <Badge variant="secondary">Yaklaşan</Badge>
      case "completed":
        return <Badge variant="outline">Tamamlandı</Badge>
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {periods.map((period: Period | any) => (
        <Card key={period.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{period.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Calendar className="h-4 w-4" />
                  {period.startDate} - {period.endDate}
                </CardDescription>
              </div>
              {getStatusBadge(period.status)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="flex flex-col items-center gap-1">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {period.totalCourses}
                  </span>
                  <span className="text-xs text-muted-foreground">Ders</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <School2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {period.totalTeachers}
                  </span>
                  <span className="text-xs text-muted-foreground">Öğretmen</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {period.totalStudents}
                  </span>
                  <span className="text-xs text-muted-foreground">Öğrenci</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Smile className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {period.averageMoodScore.toFixed(1)}
                  </span>
                  <span className="text-xs text-muted-foreground">Mood</span>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Link href={`/period/${period.id}/courses`}>
                  <Button variant="outline" size="sm">
                    Dersler
                  </Button>
                </Link>
                <Link href={`/period/${period.id}`}>
                  <Button variant="outline" size="sm">
                    Detaylar
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 