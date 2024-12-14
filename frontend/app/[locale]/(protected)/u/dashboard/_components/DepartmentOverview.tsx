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
import { Building2, GraduationCap, School2 } from "lucide-react"

interface Department {
  name: string
  faculty: string
  students: number
  teachers: number
}

export function DepartmentOverview({ departments }: { departments: Department[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bölüm Genel Bakış</CardTitle>
        <CardDescription>
          Bölümlerin öğrenci ve öğretmen sayıları
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bölüm</TableHead>
              <TableHead>Fakülte</TableHead>
              <TableHead className="text-center">Öğrenci</TableHead>
              <TableHead className="text-center">Öğretmen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.map((department, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span>{department.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {department.faculty}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span>{department.students}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <School2 className="h-4 w-4 text-muted-foreground" />
                    <span>{department.teachers}</span>
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