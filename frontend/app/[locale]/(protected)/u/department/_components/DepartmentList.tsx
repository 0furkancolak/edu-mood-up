"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BookOpen, GraduationCap, School2, User2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Department {
  id: number
  name: string
  facultyName: string
  headOfDepartment: string
  totalTeachers: number
  totalStudents: number
  totalCourses: number
}

export function DepartmentList({ departments }: { departments: Department[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {departments.map((department) => (
        <Card key={department.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>{department.name}</CardTitle>
            <CardDescription>{department.facultyName}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User2 className="h-4 w-4" />
                <span>{department.headOfDepartment}</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center gap-1">
                  <School2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{department.totalTeachers}</span>
                  <span className="text-xs text-muted-foreground">Öğretmen</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{department.totalStudents}</span>
                  <span className="text-xs text-muted-foreground">Öğrenci</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{department.totalCourses}</span>
                  <span className="text-xs text-muted-foreground">Ders</span>
                </div>
              </div>
              <div className="flex justify-end">
                <Link href={`/department/${department.id}`}>
                  <Button variant="outline">Detayları Görüntüle</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 