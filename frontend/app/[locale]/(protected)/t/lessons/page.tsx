import { LinkTabs, LinkTabsList, LinkTabsTrigger } from "@/components/ui/link-tabs"
import { Card } from "@/components/ui/card"
import TeacherLessonList from "../_components/TeacherLessonList"
import { CreateLessonButton } from "../_components/CreateLessonButton"

export default function TeacherLessonsPage() {
  return (
    <div className="container space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dersler</h1>
        <CreateLessonButton />
      </div>

      <LinkTabs defaultValue="current" className="w-full">
        <LinkTabsList>
          <LinkTabsTrigger value="current" href="/t/lessons">
            Mevcut Dönem Dersleri
          </LinkTabsTrigger>
          <LinkTabsTrigger value="past" href="/t/lessons/past">
            Geçmiş Dönem Dersleri
          </LinkTabsTrigger>
        </LinkTabsList>
      </LinkTabs>

      <Card className="p-4">
        <TeacherLessonList />
      </Card>
    </div>
  )
}
