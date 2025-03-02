import CGPACalculator from "@/components/cgpa-calculator"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">CGPA Calculator</h1>
          <ThemeToggle />
        </div>
        <CGPACalculator />
      </main>
    </ThemeProvider>
  )
}

