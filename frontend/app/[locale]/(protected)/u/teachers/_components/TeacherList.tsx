"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTable } from "@/components/ui/data-table"
import { BookOpen, GraduationCap, Mail, School2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Teacher {
  id: number
  name: string
  email: string
  department: string
  faculty: string
  courses: string[]
  totalStudents: number
}

const columns: ColumnDef<Teacher>[] = [
  {
    accessorKey: "name",
    header: "İsim",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
    cell: ({ row }) => {
      const teacher = row.original
      return (
        <div className="space-y-1">
          <div className="font-medium">{teacher.name}</div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{teacher.email}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "faculty",
    header: "Fakülte",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "department",
    header: "Bölüm",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "courses",
    header: "Dersler",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
    cell: ({ row }) => {
      const courses = row.getValue("courses") as string[]
      return (
        <div className="flex flex-wrap gap-1">
          {courses.map((course, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {course}
            </Badge>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: "totalStudents",
    header: "Öğrenci Sayısı",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
    cell: ({ row }) => {
      const students = row.getValue("totalStudents") as number
      return (
        <div className="flex items-center justify-center gap-2">
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
          <span>{students}</span>
        </div>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const teacher = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(teacher.email)}
            >
              E-posta adresini kopyala
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Öğretmen detayları</DropdownMenuItem>
            <DropdownMenuItem>Ders programı</DropdownMenuItem>
            <DropdownMenuItem>Öğrenci listesi</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function TeacherList({ teachers }: { teachers: Teacher[] }) {
  return (
    <DataTable 
      columns={columns} 
      data={teachers}
      filterColumn="name"
      filterPlaceholder="İsim veya e-posta ile ara..."
    />
  )
} 