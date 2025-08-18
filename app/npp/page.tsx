"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ArrowLeft,
  Play,
  BarChart3,
  Clock,
  Cpu,
  TrendingUp,
  Plus,
  Trash2,
  User,
  Linkedin,
  Instagram,
  Github,
  X,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface ProcessInfo {
  job: string
  at: number
  bt: number
  ft: number
  tat: number
  wat: number
}

interface GanttChartInfo {
  job: string
  start: number
  stop: number
}

interface ProcessInput {
  id: number
  arrivalTime: string
  burstTime: string
}

const fcfs = (arrivalTime: number[], burstTime: number[]) => {
  const processesInfo = arrivalTime
    .map((item, index) => {
      const job = arrivalTime.length > 26 ? `P${index + 1}` : (index + 10).toString(36).toUpperCase()

      return {
        job,
        at: item,
        bt: burstTime[index],
      }
    })
    .sort((obj1, obj2) => {
      if (obj1.at > obj2.at) {
        return 1
      }
      if (obj1.at < obj2.at) {
        return -1
      }
      return 0
    })

  const finishTime: number[] = []
  const ganttChartInfo: GanttChartInfo[] = []

  const solvedProcessesInfo = processesInfo.map((process, index) => {
    if (index === 0 || process.at > finishTime[index - 1]) {
      finishTime[index] = process.at + process.bt

      ganttChartInfo.push({
        job: process.job,
        start: process.at,
        stop: finishTime[index],
      })
    } else {
      finishTime[index] = finishTime[index - 1] + process.bt

      ganttChartInfo.push({
        job: process.job,
        start: finishTime[index - 1],
        stop: finishTime[index],
      })
    }

    return {
      ...process,
      ft: finishTime[index],
      tat: finishTime[index] - process.at,
      wat: finishTime[index] - process.at - process.bt,
    }
  })

  return { solvedProcessesInfo, ganttChartInfo }
}

export default function FCFSPage() {
  const router = useRouter()
  const [processes, setProcesses] = useState<ProcessInput[]>([
    { id: 1, arrivalTime: "", burstTime: "" },
    { id: 2, arrivalTime: "", burstTime: "" },
    { id: 3, arrivalTime: "", burstTime: "" },
  ])
  const [results, setResults] = useState<{
    solvedProcessesInfo: ProcessInfo[]
    ganttChartInfo: GanttChartInfo[]
  } | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showDeveloperModal, setShowDeveloperModal] = useState(false)

  const addProcess = () => {
    const newId = Math.max(...processes.map((p) => p.id)) + 1
    setProcesses([...processes, { id: newId, arrivalTime: "", burstTime: "" }])
  }

  const removeProcess = (id: number) => {
    if (processes.length > 1) {
      setProcesses(processes.filter((p) => p.id !== id))
    }
  }

  const updateProcess = (id: number, field: "arrivalTime" | "burstTime", value: string) => {
    setProcesses(processes.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  const handleSolve = async () => {
    try {
      setIsCalculating(true)
      await new Promise((resolve) => setTimeout(resolve, 500))

      const arrivalArray = processes.map((p) => Number.parseFloat(p.arrivalTime)).filter((n) => !isNaN(n))
      const burstArray = processes.map((p) => Number.parseFloat(p.burstTime)).filter((n) => !isNaN(n))

      if (arrivalArray.length === 0 || burstArray.length === 0) {
        alert("Please enter valid arrival times and burst times")
        setIsCalculating(false)
        return
      }

      if (arrivalArray.length !== burstArray.length || arrivalArray.length !== processes.length) {
        alert("Please fill in all process fields")
        setIsCalculating(false)
        return
      }

      const result = fcfs(arrivalArray, burstArray)
      setResults(result)
      setIsCalculating(false)
    } catch (error) {
      alert("Please enter valid numbers")
      setIsCalculating(false)
    }
  }

  const GanttChart = ({ ganttChartInfo }: { ganttChartInfo: GanttChartInfo[] }) => {
    const maxTime = Math.max(...ganttChartInfo.map((item) => item.stop))
    const colors = [
      "bg-blue-500",
      "bg-emerald-500",
      "bg-amber-500",
      "bg-rose-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ]

    // Create timeline markers
    const timelineMarkers = []
    const uniqueTimes = [...new Set([0, ...ganttChartInfo.flatMap((item) => [item.start, item.stop])])].sort(
      (a, b) => a - b,
    )

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          Gantt Chart
        </h3>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          {/* Process blocks */}
          <div className="flex border border-gray-300 dark:border-gray-600 rounded overflow-hidden mb-4">
            {ganttChartInfo.map((item, index) => (
              <div
                key={index}
                className={`${colors[index % colors.length]} text-white text-center py-4 px-2 font-semibold flex items-center justify-center transition-all duration-300 hover:opacity-80`}
                style={{
                  width: `${((item.stop - item.start) / maxTime) * 100}%`,
                  minWidth: "60px",
                }}
              >
                {item.job}
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="flex justify-between items-center">
              {uniqueTimes.map((time, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-px h-3 bg-gray-400 dark:bg-gray-500"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Cpu className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">First Come First Serve (FCFS)</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Non-preemptive CPU Scheduling</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5 text-blue-600" />
                Process Input
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Processes</Label>
                  <Button
                    onClick={addProcess}
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <Plus className="w-4 h-4" />
                    Add Process
                  </Button>
                </div>

                <div className="space-y-3">
                  {processes.map((process, index) => (
                    <div
                      key={process.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">P{index + 1}</span>
                      </div>
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs text-gray-600 dark:text-gray-400">Arrival Time</Label>
                          <Input
                            type="number"
                            placeholder="0"
                            value={process.arrivalTime}
                            onChange={(e) => updateProcess(process.id, "arrivalTime", e.target.value)}
                            className="h-9"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600 dark:text-gray-400">Burst Time</Label>
                          <Input
                            type="number"
                            placeholder="1"
                            value={process.burstTime}
                            onChange={(e) => updateProcess(process.id, "burstTime", e.target.value)}
                            className="h-9"
                          />
                        </div>
                      </div>
                      {processes.length > 1 && (
                        <Button
                          onClick={() => removeProcess(process.id)}
                          size="sm"
                          variant="ghost"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleSolve}
                disabled={isCalculating}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                {isCalculating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Calculating...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Solve Algorithm
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
                Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="space-y-6">
                  <GanttChart ganttChartInfo={results.ganttChartInfo} />

                  {/* Statistics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
                      <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg Turnaround Time</p>
                      <p className="text-xl font-bold text-blue-600">
                        {(
                          results.solvedProcessesInfo.reduce((sum, p) => sum + p.tat, 0) /
                          results.solvedProcessesInfo.length
                        ).toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 text-center">
                      <TrendingUp className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg Waiting Time</p>
                      <p className="text-xl font-bold text-emerald-600">
                        {(
                          results.solvedProcessesInfo.reduce((sum, p) => sum + p.wat, 0) /
                          results.solvedProcessesInfo.length
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Process Table */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Process Details</h3>
                    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50 dark:bg-gray-800">
                            <TableHead className="font-semibold">Process</TableHead>
                            <TableHead className="font-semibold">Arrival</TableHead>
                            <TableHead className="font-semibold">Burst</TableHead>
                            <TableHead className="font-semibold">Finish</TableHead>
                            <TableHead className="font-semibold">Turnaround</TableHead>
                            <TableHead className="font-semibold">Waiting</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {results.solvedProcessesInfo.map((process, index) => (
                            <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                              <TableCell className="font-medium text-blue-600">{process.job}</TableCell>
                              <TableCell>{process.at}</TableCell>
                              <TableCell>{process.bt}</TableCell>
                              <TableCell>{process.ft}</TableCell>
                              <TableCell className="text-blue-600">{process.tat}</TableCell>
                              <TableCell className="text-emerald-600">{process.wat}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                  <BarChart3 className="w-16 h-16 mb-4" />
                  <p className="text-lg font-medium mb-2">Ready for Analysis</p>
                  <p className="text-center text-sm">
                    Add your processes and click "Solve Algorithm" to see the FCFS scheduling visualization.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating developer credits button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setShowDeveloperModal(true)}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          size="sm"
        >
          <User className="w-5 h-5" />
        </Button>
      </div>

      {/* Developer credits modal */}
      {showDeveloperModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 transform animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="relative p-6">
              <Button
                onClick={() => setShowDeveloperModal(false)}
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <X className="w-4 h-4" />
              </Button>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <User className="w-8 h-8 text-white" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Developer</h3>
                  <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mt-1">RegieSanJuan (Regie)</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Created with passion for algorithm visualization
                  </p>
                </div>

                <div className="flex justify-center gap-4 pt-4">
                  <a
                    href="https://www.linkedin.com/in/regie-san-juan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 hover:scale-105 transform"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>

                  <a
                    href="https://github.com/RegieSanJuan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 hover:scale-105 transform"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>

                  <a
                    href="https://www.instagram.com/eiger____/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg transition-all duration-200 hover:scale-105 transform"
                  >
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </a>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">AlgoFlow • FCFS Algorithm Visualizer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
