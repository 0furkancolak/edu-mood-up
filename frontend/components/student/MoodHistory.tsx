import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const mockData = [
  { date: "2023-12-14", course: "Mathematics", mood: "😄", score: 5 },
  { date: "2023-12-14", course: "Physics", mood: "🙂", score: 4 },
  { date: "2023-12-13", course: "Chemistry", mood: "😐", score: 3 },
]

export function MoodHistory() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Mood</TableHead>
            <TableHead className="text-right">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.course}</TableCell>
              <TableCell>
                <span className="text-2xl">{item.mood}</span>
              </TableCell>
              <TableCell className="text-right">{item.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 