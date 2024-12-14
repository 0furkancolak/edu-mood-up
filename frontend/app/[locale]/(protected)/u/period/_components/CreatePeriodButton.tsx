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

export function CreatePeriodButton() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    academicYear: "",
    term: "",
    startDate: "",
    endDate: "",
  })

  const academicYears = [
    "2023-2024",
    "2024-2025",
    "2025-2026",
  ]

  const terms = [
    { id: "fall", name: "Güz" },
    { id: "spring", name: "Bahar" },
    { id: "summer", name: "Yaz" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // TODO: API call to create period
      console.log("Creating period:", formData)
      setOpen(false)
      setFormData({
        academicYear: "",
        term: "",
        startDate: "",
        endDate: "",
      })
    } catch (error) {
      console.error("Error creating period:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Yarıyıl
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Yeni Yarıyıl Oluştur</DialogTitle>
            <DialogDescription>
              Yeni bir yarıyıl oluşturmak için aşağıdaki formu doldurun.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="academicYear">Akademik Yıl</Label>
              <Select
                value={formData.academicYear}
                onValueChange={(value) =>
                  setFormData({ ...formData, academicYear: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Akademik yıl seçin" />
                </SelectTrigger>
                <SelectContent>
                  {academicYears.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="term">Dönem</Label>
              <Select
                value={formData.term}
                onValueChange={(value) =>
                  setFormData({ ...formData, term: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Dönem seçin" />
                </SelectTrigger>
                <SelectContent>
                  {terms.map((term) => (
                    <SelectItem key={term.id} value={term.id}>
                      {term.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Başlangıç Tarihi</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">Bitiş Tarihi</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                />
              </div>
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