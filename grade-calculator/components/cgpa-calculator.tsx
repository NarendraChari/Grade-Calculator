"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Subject = {
  grade: string
  credit: number
}

const gradePoints: { [key: string]: number } = {
  "A+": 10,
  A: 9,
  B: 8,
  C: 7,
  D: 6,
  E: 5,
  F: 0,
}

const creditOptions = [3, 2, 1.5, 1]

export default function CGPACalculator() {
  const [numSubjects, setNumSubjects] = useState<number>(1)
  const [subjects, setSubjects] = useState<Subject[]>([{ grade: "A+", credit: 3 }])
  const [cgpa, setCGPA] = useState<number>(0)

  useEffect(() => {
    setSubjects(Array(numSubjects).fill({ grade: "A+", credit: 3 }))
  }, [numSubjects])

  const handleGradeChange = (index: number, grade: string) => {
    const newSubjects = [...subjects]
    newSubjects[index].grade = grade
    setSubjects(newSubjects)
  }

  const handleCreditChange = (index: number, credit: number) => {
    const newSubjects = [...subjects]
    newSubjects[index].credit = credit
    setSubjects(newSubjects)
  }

  const calculateCGPA = () => {
    let totalGradePoints = 0
    let totalCredits = 0

    subjects.forEach((subject) => {
      totalGradePoints += gradePoints[subject.grade] * subject.credit
      totalCredits += subject.credit
    })

    const calculatedCGPA = totalGradePoints / totalCredits
    setCGPA(Number.parseFloat(calculatedCGPA.toFixed(2)))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>CGPA Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="numSubjects">Number of Subjects</Label>
            <Select onValueChange={(value) => setNumSubjects(Number.parseInt(value))}>
              <SelectTrigger id="numSubjects">
                <SelectValue placeholder="Select number of subjects" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Credits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((subject, index) => (
                <TableRow key={index}>
                  <TableCell>Subject {index + 1}</TableCell>
                  <TableCell>
                    <Select onValueChange={(value) => handleGradeChange(index, value)}>
                      <SelectTrigger id={`grade-${index}`}>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(gradePoints).map((grade) => (
                          <SelectItem key={grade} value={grade}>
                            {grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select onValueChange={(value) => handleCreditChange(index, Number.parseFloat(value))}>
                      <SelectTrigger id={`credit-${index}`}>
                        <SelectValue placeholder="Select credits" />
                      </SelectTrigger>
                      <SelectContent>
                        {creditOptions.map((credit) => (
                          <SelectItem key={credit} value={credit.toString()}>
                            {credit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <Button onClick={calculateCGPA} className="mb-4">
          Calculate CGPA
        </Button>
        <p className="text-lg font-semibold">CGPA: {cgpa}</p>
      </CardFooter>
    </Card>
  )
}

