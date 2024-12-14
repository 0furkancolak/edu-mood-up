"use client"

import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Check, X, Eye } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"

interface Lesson {
  id: number
  code: string
  name: string
  department: string
  students: number
  schedule: string
  status: "active" | "inactive"
  pendingStudents: number
}

interface TeacherLessonListProps {
  isPastLessons?: boolean
}

export default function TeacherLessonList({ isPastLessons = false }: TeacherLessonListProps) {
  const lessons: Lesson[] = [
    {
      id: 1,
      code: "CSE101",
      name: "Algoritma ve Programlama",
      department: "Bilgisayar Mühendisliği",
      students: 45,
      schedule: "Pazartesi 09:00-12:00",
      status: "active",
      pendingStudents: 5,
    },
    {
      id: 2,
      code: "CSE102",
      name: "Veri Yapıları",
      department: "Bilgisayar Mühendisliği",
      students: 40,
      schedule: "Çarşamba 13:00-16:00",
      status: "active",
      pendingStudents: 3,
    },
  ]

  const columns: ColumnDef<Lesson>[] = [
    {
      accessorKey: "code",
      header: "Ders Kodu",
    },
    {
      accessorKey: "name",
      header: "Ders Adı",
    },
    {
      accessorKey: "department",
      header: "Bölüm",
    },
    {
      accessorKey: "students",
      header: "Öğrenci Sayısı",
    },
    {
      accessorKey: "schedule",
      header: "Ders Programı",
    },
    {
      accessorKey: "status",
      header: "Durum",
      cell: ({ row }) => (
        <Badge variant={row.original.status === "active" ? "default" : "secondary"}>
          {row.original.status === "active" ? "Aktif" : "Pasif"}
        </Badge>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Eye className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {row.original.code} - {row.original.name}
              </DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="details" className="w-full">
              <TabsList>
                <TabsTrigger value="details">Ders Detayları</TabsTrigger>
                <TabsTrigger value="students">
                  Öğrenciler
                  {row.original.pendingStudents > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {row.original.pendingStudents}
                    </Badge>
                  )}
                </TabsTrigger>
                {!isPastLessons && (
                  <TabsTrigger value="pending">Bekleyen Öğrenciler</TabsTrigger>
                )}
              </TabsList>
              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Ders Kodu</h4>
                    <p className="text-sm text-muted-foreground">{row.original.code}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Ders Adı</h4>
                    <p className="text-sm text-muted-foreground">{row.original.name}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Bölüm</h4>
                    <p className="text-sm text-muted-foreground">{row.original.department}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Ders Programı</h4>
                    <p className="text-sm text-muted-foreground">{row.original.schedule}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="students">
                <DataTable
                  columns={[
                    { accessorKey: "id", header: "Öğrenci No" },
                    { accessorKey: "name", header: "Ad Soyad" },
                    { accessorKey: "department", header: "Bölüm" },
                  ]}
                  data={[
                    { id: "20201701001", name: "Ahmet Yılmaz", department: "Bilgisayar Mühendisliği" },
                    { id: "20201701002", name: "Ayşe Demir", department: "Bilgisayar Mühendisliği" },
                  ]}
                />
              </TabsContent>
              {!isPastLessons && (
                <TabsContent value="pending">
                  <DataTable
                    columns={[
                      { accessorKey: "id", header: "Öğrenci No" },
                      { accessorKey: "name", header: "Ad Soyad" },
                      { accessorKey: "department", header: "Bölüm" },
                      {
                        id: "actions",
                        cell: () => (
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" className="text-green-500">
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ),
                      },
                    ]}
                    data={[
                      { id: "20201701003", name: "Mehmet Kaya", department: "Bilgisayar Mühendisliği" },
                      { id: "20201701004", name: "Zeynep Şahin", department: "Bilgisayar Mühendisliği" },
                    ]}
                  />
                </TabsContent>
              )}
            </Tabs>
          </DialogContent>
        </Dialog>
      ),
    },
  ]

  return <DataTable columns={columns} data={lessons} />
} 