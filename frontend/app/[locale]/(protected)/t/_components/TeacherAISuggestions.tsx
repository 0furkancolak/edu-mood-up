import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"

export default function TeacherAISuggestions() {
  // Bu veriler API'den gelecek
  const suggestions = [
    {
      id: 1,
      suggestion: "Öğrencilerin ortalama ruh hali son hafta düşüş gösterdi. Derslerde daha interaktif aktiviteler planlayabilirsiniz.",
    },
    {
      id: 2,
      suggestion: "Matematik dersinde katılım oranı diğer derslere göre daha düşük. Konuları daha küçük parçalara bölerek anlatmayı deneyebilirsiniz.",
    },
    {
      id: 3,
      suggestion: "Pozitif geri bildirim alan öğretim yöntemlerinizi diğer derslerde de kullanabilirsiniz.",
    }
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Yapay Zeka Önerileri
        </CardTitle>
        <Lightbulb className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((item) => (
            <div
              key={item.id}
              className="flex items-start space-x-2 rounded-lg border p-3"
            >
              <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5" />
              <p className="text-sm text-muted-foreground">{item.suggestion}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 