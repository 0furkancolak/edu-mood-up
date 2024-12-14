"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { Plus } from "lucide-react"

export function CreateLessonButton() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    facultyId: "",
    departmentId: "",
    teacherId: "",
    schedule: "",
  })

  // TODO: Fetch faculties, departments and teachers from API
  const faculties = [
    { id: "1", name: "Mühendislik Fakültesi" },
    { id: "2", name: "Tıp Fakültesi" },
  ]

  const departments = [
    { id: "1", facultyId: "1", name: "Bilgisayar Mühendisliği" },
    { id: "2", facultyId: "1", name: "Makine Mühendisliği" },
    { id: "3", facultyId: "2", name: "Tıp" },
  ]

  const teachers = [
    { id: "1", name: "Prof. Dr. Ahmet Yılmaz", departmentId: "1" },
    { id: "2", name: "Doç. Dr. Ayşe Kaya", departmentId: "1" },
    { id: "3", name: "Prof. Dr. Mehmet Demir", departmentId: "3" },
  ]

  const filteredDepartments = departments.filter(
    (dept) => dept.facultyId === formData.facultyId
  )

  const filteredTeachers = teachers.filter(
    (teacher) => teacher.departmentId === formData.departmentId
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // TODO: API call to create lesson
      console.log("Creating lesson:", formData)
      setOpen(false)
      setFormData({
        code: "",
        name: "",
        facultyId: "",
        departmentId: "",
        teacherId: "",
        schedule: "",
      })
    } catch (error) {
      console.error("Error creating lesson:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Ders
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Yeni Ders Ekle</DialogTitle>
            <DialogDescription>
              Yeni bir ders eklemek için aşağıdaki formu doldurun.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="code">Ders Kodu</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                placeholder="Örn: CSE101"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Ders Adı</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Örn: Algoritma ve Programlama"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="faculty">Fakülte</Label>
              <Select
                value={formData.facultyId}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    facultyId: value,
                    departmentId: "",
                    teacherId: "",
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Fakülte seçin" />
                </SelectTrigger>
                <SelectContent>
                  {faculties.map((faculty) => (
                    <SelectItem key={faculty.id} value={faculty.id}>
                      {faculty.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="department">Bölüm</Label>
              <Select
                value={formData.departmentId}
                onValueChange={(value) =>
                  setFormData({ ...formData, departmentId: value, teacherId: "" })
                }
                disabled={!formData.facultyId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Bölüm seçin" />
                </SelectTrigger>
                <SelectContent>
                  {filteredDepartments.map((department) => (
                    <SelectItem key={department.id} value={department.id}>
                      {department.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="teacher">Öğretmen</Label>
              <Select
                value={formData.teacherId}
                onValueChange={(value) =>
                  setFormData({ ...formData, teacherId: value })
                }
                disabled={!formData.departmentId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Öğretmen seçin" />
                </SelectTrigger>
                <SelectContent>
                  {filteredTeachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="schedule">Ders Programı</Label>
              <Input
                id="schedule"
                value={formData.schedule}
                onChange={(e) =>
                  setFormData({ ...formData, schedule: e.target.value })
                }
                placeholder="Örn: Pazartesi 09:00-12:00"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              İptal
            </Button>
            <Button type="submit">Ekle</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 