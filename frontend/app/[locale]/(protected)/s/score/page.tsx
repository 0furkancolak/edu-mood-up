import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"

export default function ScorePage() {
  
  const scores = [
    { id: 1, lesson: "Matematik", date: "2024-01-15", score: 85, mood: "Mutlu" },
    { id: 2, lesson: "Fizik", date: "2024-01-14", score: 90, mood: "Çok İyi" },
    { id: 3, lesson: "Kimya", date: "2024-01-13", score: 75, mood: "Normal" },
  ]

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Ders Skorları</h1>

      <Card className="p-4">
        <Table>
          <TableCaption>Önceki derslerin skorları</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Ders</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead>Skor</TableHead>
              <TableHead>Ruh Hali</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scores.map((score) => (
              <TableRow key={score.id}>
                <TableCell>{score.lesson}</TableCell>
                <TableCell>{score.date}</TableCell>
                <TableCell>{score.score}</TableCell>
                <TableCell>{score.mood}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
