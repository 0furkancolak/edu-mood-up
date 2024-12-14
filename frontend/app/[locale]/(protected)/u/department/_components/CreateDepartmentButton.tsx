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

export function CreateDepartmentButton() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    facultyId: "",
    headOfDepartment: "",
  })

  // TODO: Fetch faculties from API
  const faculties = [
    { id: "1", name: "Mühendislik Fakültesi" },
    { id: "2", name: "Tıp Fakültesi" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // TODO: API call to create department
      console.log("Creating department:", formData)
      setOpen(false)
      setFormData({ name: "", facultyId: "", headOfDepartment: "" })
    } catch (error) {
      console.error("Error creating department:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Bölüm
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Yeni Bölüm Oluştur</DialogTitle>
            <DialogDescription>
              Yeni bir bölüm oluşturmak için aşağıdaki formu doldurun.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Bölüm Adı</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Örn: Bilgisayar Mühendisliği"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="faculty">Fakülte</Label>
              <Select
                value={formData.facultyId}
                onValueChange={(value) =>
                  setFormData({ ...formData, facultyId: value })
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
              <Label htmlFor="head">Bölüm Başkanı</Label>
              <Input
                id="head"
                value={formData.headOfDepartment}
                onChange={(e) =>
                  setFormData({ ...formData, headOfDepartment: e.target.value })
                }
                placeholder="Örn: Prof. Dr. Ahmet Yılmaz"
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