"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock, CheckCircle, AlertTriangle, Pause, Play, RotateCcw } from "lucide-react"

type MigrationStep = {
  id: string
  name: string
  status: "pending" | "running" | "completed" | "error"
  progress: number
  startTime?: Date
  endTime?: Date
  error?: string
}

type MigrationProgress = {
  id: string
  name: string
  overallProgress: number
  status: "running" | "paused" | "completed" | "error"
  startTime: Date
  estimatedEndTime?: Date
  steps: MigrationStep[]
  currentStep: string
  recordsProcessed: number
  totalRecords: number
  tablesCompleted: number
  totalTables: number
}

const sampleProgress: MigrationProgress = {
  id: "mig-1002",
  name: "CRM Lift-and-Shift",
  overallProgress: 65,
  status: "running",
  startTime: new Date("2025-07-01T08:10:00"),
  estimatedEndTime: new Date("2025-07-01T10:30:00"),
  currentStep: "migrate-orders",
  recordsProcessed: 156000,
  totalRecords: 240000,
  tablesCompleted: 2,
  totalTables: 4,
  steps: [
    {
      id: "connect-source",
      name: "Connect to Source Database",
      status: "completed",
      progress: 100,
      startTime: new Date("2025-07-01T08:10:00"),
      endTime: new Date("2025-07-01T08:10:15"),
    },
    {
      id: "connect-destination",
      name: "Connect to Destination Database",
      status: "completed",
      progress: 100,
      startTime: new Date("2025-07-01T08:10:15"),
      endTime: new Date("2025-07-01T08:10:30"),
    },
    {
      id: "migrate-users",
      name: "Migrate Users Table",
      status: "completed",
      progress: 100,
      startTime: new Date("2025-07-01T08:10:30"),
      endTime: new Date("2025-07-01T08:15:00"),
    },
    {
      id: "migrate-orders",
      name: "Migrate Orders Table",
      status: "running",
      progress: 65,
      startTime: new Date("2025-07-01T08:15:00"),
    },
    {
      id: "migrate-order-items",
      name: "Migrate Order Items Table",
      status: "pending",
      progress: 0,
    },
    {
      id: "migrate-invoices",
      name: "Migrate Invoices Table",
      status: "pending",
      progress: 0,
    },
  ]
}

export default function MigrationProgress({ migrationId }: { migrationId: string }) {
  const [progress, setProgress] = useState<MigrationProgress>(sampleProgress)
  const [isPaused, setIsPaused] = useState(false)

  // Simulate real-time progress updates
  useEffect(() => {
    if (progress.status !== "running" || isPaused) return

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = { ...prev }
        
        // Update current step progress
        const currentStepIndex = newProgress.steps.findIndex(s => s.id === newProgress.currentStep)
        if (currentStepIndex >= 0) {
          const currentStep = newProgress.steps[currentStepIndex]
          if (currentStep.status === "running") {
            currentStep.progress = Math.min(100, currentStep.progress + Math.random() * 5)
            
            // If step is complete, move to next
            if (currentStep.progress >= 100) {
              currentStep.status = "completed"
              currentStep.endTime = new Date()
              
              // Move to next step
              const nextStepIndex = currentStepIndex + 1
              if (nextStepIndex < newProgress.steps.length) {
                newProgress.steps[nextStepIndex].status = "running"
                newProgress.steps[nextStepIndex].startTime = new Date()
                newProgress.currentStep = newProgress.steps[nextStepIndex].id
                newProgress.tablesCompleted++
              } else {
                // All steps complete
                newProgress.status = "completed"
                newProgress.overallProgress = 100
              }
            }
          }
        }
        
        // Update overall progress
        const completedSteps = newProgress.steps.filter(s => s.status === "completed").length
        newProgress.overallProgress = Math.round((completedSteps / newProgress.steps.length) * 100)
        
        // Update records processed
        newProgress.recordsProcessed = Math.min(
          newProgress.totalRecords,
          newProgress.recordsProcessed + Math.floor(Math.random() * 1000)
        )
        
        return newProgress
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [progress.status, isPaused])

  const formatDuration = (start: Date, end?: Date) => {
    const duration = end ? end.getTime() - start.getTime() : Date.now() - start.getTime()
    const minutes = Math.floor(duration / 60000)
    const seconds = Math.floor((duration % 60000) / 1000)
    return `${minutes}m ${seconds}s`
  }

  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-500" />
      case "running": return <RotateCcw className="h-4 w-4 text-blue-500 animate-spin" />
      case "error": return <AlertTriangle className="h-4 w-4 text-red-500" />
      default: return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
    setProgress(prev => ({
      ...prev,
      status: !isPaused ? "paused" : "running"
    }))
  }

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{progress.name}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={progress.status === "running" ? "default" : "secondary"}>
                {progress.status === "running" ? "Running" : progress.status === "paused" ? "Paused" : "Completed"}
              </Badge>
              {progress.status === "running" && (
                <Button variant="outline" size="sm" onClick={togglePause}>
                  {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{progress.overallProgress}%</span>
            </div>
            <Progress value={progress.overallProgress} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Records Processed</div>
              <div className="font-medium">
                {progress.recordsProcessed.toLocaleString()} / {progress.totalRecords.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Tables Completed</div>
              <div className="font-medium">{progress.tablesCompleted} / {progress.totalTables}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Started</div>
              <div className="font-medium">{progress.startTime.toLocaleTimeString()}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Estimated End</div>
              <div className="font-medium">
                {progress.estimatedEndTime?.toLocaleTimeString() ?? "Calculating..."}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Migration Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {progress.steps.map((step) => (
              <div key={step.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStepIcon(step.status)}
                    <span className="text-sm font-medium">{step.name}</span>
                    {step.status === "running" && (
                      <Badge variant="outline" className="text-xs">
                        {step.progress.toFixed(1)}%
                      </Badge>
                    )}
                  </div>
                  {step.startTime && (
                    <span className="text-xs text-muted-foreground">
                      {formatDuration(step.startTime, step.endTime)}
                    </span>
                  )}
                </div>
                {step.status === "running" && (
                  <Progress value={step.progress} className="h-1" />
                )}
                {step.error && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription>{step.error}</AlertDescription>
                  </Alert>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

