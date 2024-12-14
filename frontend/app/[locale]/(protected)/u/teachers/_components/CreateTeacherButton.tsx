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

export function CreateTeacherButton() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    departmentId: "",
    title: "",
  })

  // TODO: Fetch departments from API
  const departments = [
    { id: "1", name: "Bilgisayar Mühendisliği" },
    { id: "2", name: "Makine Mühendisliği" },
  ]

  const titles = [
    "Prof. Dr.",
    "Doç. Dr.",
    "Dr. Öğr. Üyesi",
    "Öğr. Gör.",
    "Arş. Gör.",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // TODO: API call to create teacher
      console.log("Creating teacher:", formData)
      setOpen(false)
      setFormData({ name: "", email: "", departmentId: "", title: "" })
    } catch (error) {
      console.error("Error creating teacher:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Öğretmen
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Yeni Öğretmen Ekle</DialogTitle>
            <DialogDescription>
              Yeni bir öğretmen eklemek için aşağıdaki formu doldurun.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Unvan</Label>
              <Select
                value={formData.title}
                onValueChange={(value) =>
                  setFormData({ ...formData, title: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Unvan seçin" />
                </SelectTrigger>
                <SelectContent>
                  {titles.map((title) => (
                    <SelectItem key={title} value={title}>
                      {title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Ad Soyad</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Örn: Ahmet Yılmaz"
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
                placeholder="ornek@edu.tr"
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