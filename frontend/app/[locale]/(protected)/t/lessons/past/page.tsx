import { LinkTabs, LinkTabsList, LinkTabsTrigger } from "@/components/ui/link-tabs"
import { Card } from "@/components/ui/card"
import TeacherLessonList from "../../_components/TeacherLessonList"

export default function TeacherPastLessonsPage() {
  return (
    <div className="container space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dersler</h1>
      </div>

      <LinkTabs defaultValue="past" className="w-full">
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
        <TeacherLessonList isPastLessons />
      </Card>
    </div>
  )
} 