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
import { useState } from "react"
import { Plus } from "lucide-react"

export function CreateFacultyButton() {
  const [open, setOpen] = useState(false)
  const [facultyName, setFacultyName] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // TODO: API call to create faculty
      console.log("Creating faculty:", facultyName)
      setOpen(false)
      setFacultyName("")
    } catch (error) {
      console.error("Error creating faculty:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Fakülte
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Yeni Fakülte Oluştur</DialogTitle>
            <DialogDescription>
              Yeni bir fakülte oluşturmak için aşağıdaki formu doldurun.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Fakülte Adı</Label>
              <Input
                id="name"
                value={facultyName}
                onChange={(e) => setFacultyName(e.target.value)}
                placeholder="Örn: Mühendislik Fakültesi"
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