"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
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
import { GraduationCap, Mail, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Student {
  id: number
  name: string
  studentNumber: string
  email: string
  faculty: string
  department: string
  enrolledCourses: number
  status: "active" | "inactive" | "graduated"
}

const columns: ColumnDef<Student | any>[] = [
  {
    accessorKey: "name",
    header: "İsim",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "studentNumber",
    header: "Öğrenci No",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "email",
    header: "E-posta",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
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
    accessorKey: "enrolledCourses",
    header: "Ders Sayısı",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
    cell: ({ row }) => {
      const courses = row.getValue("enrolledCourses") as number
      return (
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span>{courses}</span>
          </div>
          <span className="text-xs text-muted-foreground">Ders</span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Durum",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <div className="flex justify-center">
          {status === "active" && (
            <Badge className="bg-green-500">Aktif</Badge>
          )}
          {status === "inactive" && (
            <Badge variant="secondary">Pasif</Badge>
          )}
          {status === "graduated" && (
            <Badge variant="outline">Mezun</Badge>
          )}
        </div>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const student = row.original

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
              onClick={() => navigator.clipboard.writeText(student.studentNumber)}
            >
              Öğrenci numarasını kopyala
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Öğrenci detayları</DropdownMenuItem>
            <DropdownMenuItem>Ders programı</DropdownMenuItem>
            <DropdownMenuItem>Not dökümü</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function UniversityStudentList({ students }: { students: Student[] | any }) {
  return (
    <DataTable 
      columns={columns} 
      data={students}
    />
  )
} 