"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"

const moods = [
  { emoji: "😄", score: 5, label: "Very Happy" },
  { emoji: "🙂", score: 4, label: "Happy" },
  { emoji: "😐", score: 3, label: "Neutral" },
  { emoji: "🙁", score: 2, label: "Unhappy" },
  { emoji: "😢", score: 1, label: "Very Unhappy" },
]

export function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)

  const handleSubmit = async () => {
    if (selectedMood === null) return

    try {
      // TODO: API call to save mood
      console.log('Saving mood:', selectedMood)
    } catch (error) {
      console.error('Error saving mood:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-5 gap-4">
        {moods.map((mood, index) => (
          <button
            key={index}
            onClick={() => setSelectedMood(mood.score)}
            className={`p-4 text-4xl rounded-lg transition-all ${
              selectedMood === mood.score
                ? 'bg-primary/20 scale-110'
                : 'hover:bg-secondary'
            }`}
          >
            <div className="text-6xl mb-2">{mood.emoji}</div>
            <div className="text-sm">{mood.label}</div>
          </button>
        ))}
      </div>
      
      <Button
        onClick={handleSubmit}
        disabled={selectedMood === null}
        className="w-full"
      >
        Submit Feedback
      </Button>
    </div>
  )
} 