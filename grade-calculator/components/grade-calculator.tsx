"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function GradeCalculator() {
  const [grades, setGrades] = useState<number[]>([])
  const [currentGrade, setCurrentGrade] = useState<string>("")

  const addGrade = () => {
    const gradeNumber = Number.parseFloat(currentGrade)
    if (!isNaN(gradeNumber) && gradeNumber >= 0 && gradeNumber <= 100) {
      setGrades([...grades, gradeNumber])
      setCurrentGrade("")
    }
  }

  const calculateAverage = () => {
    if (grades.length === 0) return 0
    const sum = grades.reduce((acc, grade) => acc + grade, 0)
    return (sum / grades.length).toFixed(2)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Enter Your Grades</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="grade">Grade (0-100)</Label>
            <div className="flex space-x-2">
              <Input
                id="grade"
                type="number"
                min="0"
                max="100"
                value={currentGrade}
                onChange={(e) => setCurrentGrade(e.target.value)}
                placeholder="Enter grade"
              />
              <Button onClick={addGrade}>Add</Button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Entered Grades:</h3>
            <p>{grades.join(", ")}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full text-center">
          <p className="text-lg font-semibold">Average Grade: {calculateAverage()}</p>
        </div>
      </CardFooter>
    </Card>
  )
}

