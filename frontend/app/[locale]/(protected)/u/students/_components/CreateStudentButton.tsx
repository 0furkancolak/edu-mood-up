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

export function CreateStudentButton() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentNumber: "",
    facultyId: "",
    departmentId: "",
  })

  // TODO: Fetch faculties and departments from API
  const faculties = [
    { id: "1", name: "Mühendislik Fakültesi" },
    { id: "2", name: "Tıp Fakültesi" },
  ]

  const departments = [
    { id: "1", facultyId: "1", name: "Bilgisayar Mühendisliği" },
    { id: "2", facultyId: "1", name: "Makine Mühendisliği" },
    { id: "3", facultyId: "2", name: "Tıp" },
  ]

  const filteredDepartments = departments.filter(
    (dept) => dept.facultyId === formData.facultyId
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // TODO: API call to create student
      console.log("Creating student:", formData)
      setOpen(false)
      setFormData({
        name: "",
        email: "",
        studentNumber: "",
        facultyId: "",
        departmentId: "",
      })
    } catch (error) {
      console.error("Error creating student:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Öğrenci
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Yeni Öğrenci Ekle</DialogTitle>
            <DialogDescription>
              Yeni bir öğrenci eklemek için aşağıdaki formu doldurun.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Ad Soyad</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Örn: Ali Yılmaz"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="studentNumber">Öğrenci Numarası</Label>
              <Input
                id="studentNumber"
                value={formData.studentNumber}
                onChange={(e) =>
                  setFormData({ ...formData, studentNumber: e.target.value })
                }
                placeholder="Örn: 2024001"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="ornek@stu.edu.tr"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="faculty">Fakülte</Label>
              <Select
                value={formData.facultyId}
                onValueChange={(value) =>
                  setFormData({ ...formData, facultyId: value, departmentId: "" })
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
                  setFormData({ ...formData, departmentId: value })
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