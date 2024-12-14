"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

interface UniversitySettings {
  teacherEmailDomain: string
  studentEmailDomain: string
  universityName: string
  academicYear: string
  currentSemester: string
}

export function UniversitySettingsForm({
  initialSettings,
}: {
  initialSettings: UniversitySettings
}) {
  const [settings, setSettings] = useState(initialSettings)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // TODO: API call to update settings
      console.log("Updating settings:", settings)
    } catch (error) {
      console.error("Error updating settings:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Genel Ayarlar</CardTitle>
            <CardDescription>
              Üniversitenin genel ayarlarını buradan yönetebilirsiniz.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="universityName">Üniversite Adı</Label>
              <Input
                id="universityName"
                value={settings.universityName}
                onChange={(e) =>
                  setSettings({ ...settings, universityName: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="academicYear">Akademik Yıl</Label>
              <Input
                id="academicYear"
                value={settings.academicYear}
                onChange={(e) =>
                  setSettings({ ...settings, academicYear: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="semester">Dönem</Label>
              <Select
                value={settings.currentSemester}
                onValueChange={(value) =>
                  setSettings({ ...settings, currentSemester: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Dönem seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Güz">Güz</SelectItem>
                  <SelectItem value="Bahar">Bahar</SelectItem>
                  <SelectItem value="Yaz">Yaz</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>E-posta Ayarları</CardTitle>
            <CardDescription>
              Öğretmen ve öğrenci e-posta domain ayarlarını buradan
              yapabilirsiniz.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="teacherDomain">Öğretmen E-posta Domain</Label>
              <div className="flex items-center gap-2">
                <span>@</span>
                <Input
                  id="teacherDomain"
                  value={settings.teacherEmailDomain}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      teacherEmailDomain: e.target.value,
                    })
                  }
                  placeholder="edu.tr"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="studentDomain">Öğrenci E-posta Domain</Label>
              <div className="flex items-center gap-2">
                <span>@</span>
                <Input
                  id="studentDomain"
                  value={settings.studentEmailDomain}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      studentEmailDomain: e.target.value,
                    })
                  }
                  placeholder="stu.edu.tr"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <CardFooter className="flex justify-end">
          <Button type="submit">Ayarları Kaydet</Button>
        </CardFooter>
      </div>
    </form>
  )
} 