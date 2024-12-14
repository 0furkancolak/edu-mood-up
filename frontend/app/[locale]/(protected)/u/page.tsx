import { UniversityStats } from "@/components/university/UniversityStats"

export default function UniversityPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">University Dashboard</h1>
      <UniversityStats />
    </div>
  )
} 