"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Building2, GraduationCap, School2 } from "lucide-react"

interface Faculty {
  name: string
  students: number
  teachers: number
  departments: number
}

export function FacultyOverview({ faculties }: { faculties: Faculty[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fakülte Genel Bakış</CardTitle>
        <CardDescription>
          Fakültelerin öğrenci ve öğretmen sayıları
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {faculties.map((faculty, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{faculty.name}</span>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" />
                      <span>{faculty.students} Öğrenci</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <School2 className="h-3 w-3" />
                      <span>{faculty.teachers} Öğretmen</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      <span>{faculty.departments} Bölüm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 