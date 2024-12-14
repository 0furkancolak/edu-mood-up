"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Building2, GraduationCap, School2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Faculty {
  id: number
  name: string
  departments: number
  teachers: number
  students: number
}

export function FacultyList({ faculties }: { faculties: Faculty[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {faculties.map((faculty) => (
        <Card key={faculty.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>{faculty.name}</CardTitle>
            <CardDescription>Fakülte Detayları</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>{faculty.departments} Bölüm</span>
                </div>
                <div className="flex items-center gap-2">
                  <School2 className="h-4 w-4 text-muted-foreground" />
                  <span>{faculty.teachers} Öğretmen</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span>{faculty.students} Öğrenci</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Aktif</span>
                </div>
              </div>
              <div className="flex justify-end">
                <Link href={`/faculty/${faculty.id}`}>
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