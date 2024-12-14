"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Smile, Users } from "lucide-react"

interface SemesterMood {
  semester: string
  averageMood: number
  participationRate: number
}

export function SemesterMoodStats({ semesters }: { semesters: SemesterMood[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dönemlik Mood İstatistikleri</CardTitle>
        <CardDescription>
          Dönemlere göre ortalama mood ve katılım oranları
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Dönem</TableHead>
              <TableHead className="text-center">Ortalama Mood</TableHead>
              <TableHead className="text-center">Katılım Oranı</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {semesters.map((semester, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {semester.semester}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1">
                      <Smile className="h-4 w-4 text-muted-foreground" />
                      <span>{semester.averageMood.toFixed(1)}</span>
                    </div>
                    <Progress
                      value={(semester.averageMood / 5) * 100}
                      className="h-1 w-20"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>%{semester.participationRate}</span>
                    </div>
                    <Progress
                      value={semester.participationRate}
                      className="h-1 w-20"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
} 