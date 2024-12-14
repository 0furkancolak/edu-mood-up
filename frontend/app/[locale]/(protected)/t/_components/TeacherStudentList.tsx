"use client"

import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"

interface Student {
  id: string
  name: string
  department: string
  lesson: string
  status: "active" | "inactive"
}

export default function TeacherStudentList() {
  const columns: ColumnDef<Student>[] = [
    { accessorKey: "id", header: "Öğrenci No" },
    { accessorKey: "name", header: "Ad Soyad" },
    { accessorKey: "department", header: "Bölüm" },
    { accessorKey: "lesson", header: "Ders" },
    {
      accessorKey: "status",
      header: "Durum",
      cell: ({ row }) => (
        <Badge variant={row.original.status === "active" ? "default" : "secondary"}>
          {row.original.status === "active" ? "Aktif" : "Pasif"}
        </Badge>
      ),
    },
  ]

  const data: Student[] = [
    {
      id: "20201701001",
      name: "Ahmet Yılmaz",
      department: "Bilgisayar Mühendisliği",
      lesson: "Algoritma ve Programlama",
      status: "active",
    },
    {
      id: "20201701002",
      name: "Ayşe Demir",
      department: "Bilgisayar Mühendisliği",
      lesson: "Veri Yapıları",
      status: "active",
    },
  ]

  return <DataTable columns={columns} data={data} />
} 