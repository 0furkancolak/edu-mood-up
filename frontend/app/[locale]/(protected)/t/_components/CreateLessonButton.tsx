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
    departmentId: "",
    schedule: "",
    capacity: "",
  })

  // TODO: Fetch departments from API
  const departments = [
    { id: "1", name: "Bilgisayar Mühendisliği" },
    { id: "2", name: "Makine Mühendisliği" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // TODO: API call to create lesson
      console.log("Creating lesson:", formData)
      setOpen(false)
      setFormData({
        code: "",
        name: "",
        departmentId: "",
        schedule: "",
        capacity: "",
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
            <DialogTitle>Yeni Ders Oluştur</DialogTitle>
            <DialogDescription>
              Yeni bir ders oluşturmak için aşağıdaki formu doldurun.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
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
                <Label htmlFor="capacity">Kontenjan</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData({ ...formData, capacity: e.target.value })
                  }
                  placeholder="Örn: 50"
                />
              </div>
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
              <Label htmlFor="department">Bölüm</Label>
              <Select
                value={formData.departmentId}
                onValueChange={(value) =>
                  setFormData({ ...formData, departmentId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Bölüm seçin" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((department) => (
                    <SelectItem key={department.id} value={department.id}>
                      {department.name}
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
            <Button type="submit">Oluştur</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 