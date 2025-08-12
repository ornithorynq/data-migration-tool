"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import AppHeader from "@/components/app-header"
import Stepper from "@/components/stepper"
import ConnectionForm from "@/components/connection-form"
import MappingPreview from "@/components/mapping-preview"
import PrecheckList from "@/components/precheck-list"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Save, Play, CheckCircle } from "lucide-react"
import { sampleDrafts } from "@/lib/sample-data"
import { useToast } from "@/hooks/use-toast"

export default function ContinueDraftPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const draftId = Array.isArray(params?.id) ? params?.id[0] : (params?.id as string)
  
  const draft = sampleDrafts.find(d => d.id === draftId)
  
  if (!draft) {
    return (
      <div className="flex min-h-screen flex-col">
        <AppHeader />
        <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6">
          <h1 className="text-2xl font-semibold">Draft not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">The requested draft does not exist.</p>
        </main>
      </div>
    )
  }

  // Determine current step based on progress
  const getCurrentStep = (progress: number) => {
    if (progress >= 80) return 4
    if (progress >= 60) return 3
    if (progress >= 30) return 2
    return 1
  }

  const currentStep = getCurrentStep(draft.progress)
  const [step, setStep] = useState(currentStep)

  const next = () => setStep((s) => Math.min(4, s + 1))
  const back = () => setStep((s) => Math.max(1, s - 1))

  const saveDraft = () => {
    toast({ title: "Draft Saved", description: "Your progress has been saved." })
  }

  const startMigration = () => {
    toast({ title: "Migration Started", description: "Your migration has been queued for execution." })
    router.push("/dashboard")
  }

  const getStepStatus = (stepNumber: number) => {
    if (stepNumber < currentStep) return "completed"
    if (stepNumber === currentStep) return "current"
    return "pending"
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6">
        {/* Draft Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => router.back()}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
                <div>
                  <CardTitle className="text-xl">{draft.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Continue configuring your migration
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{draft.owner}</Badge>
                <Badge variant="secondary">Draft</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <div className="text-sm font-medium">Database Connection</div>
                <div className="text-sm text-muted-foreground">
                  {draft.source} → {draft.destination}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">Last Modified</div>
                <div className="text-sm text-muted-foreground">{draft.lastModified}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Configuration Progress</div>
                <div className="flex items-center gap-2">
                  <Progress value={draft.progress} className="flex-1 h-2" />
                  <span className="text-sm font-medium">{draft.progress}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Alert */}
        <Alert className="mb-6">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Resuming from Step {currentStep}</strong> - Your previous configuration has been loaded. 
            {draft.progress >= 80 && " This draft is almost ready to start!"}
          </AlertDescription>
        </Alert>

        {/* Wizard */}
        <Stepper current={currentStep} />

        <Card className="p-4 sm:p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold">Source Database Configuration</h3>
                <p className="text-sm text-muted-foreground">
                  Your source database settings have been pre-filled
                </p>
              </div>
              <ConnectionForm
                title="Source Database (Pre-configured)"
                dbLabel="Source DB"
                dbOptions={["Oracle 11g", "Oracle 12c", "Oracle 18c", "Oracle 19c"]}
                onNext={next}
                showNext={true}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold">Destination Database Configuration</h3>
                <p className="text-sm text-muted-foreground">
                  Configure your target database connection
                </p>
              </div>
              <ConnectionForm
                title="Destination Database"
                dbLabel="Destination DB"
                dbOptions={["SQL Server 2016", "SQL Server 2019", "SQL Server 2022", "Azure SQL"]}
                onNext={next}
                showNext={true}
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold">Table Mapping Configuration</h3>
                <p className="text-sm text-muted-foreground">
                  Your previous mapping selections have been preserved
                </p>
              </div>
              <MappingPreview />
              <div className="flex items-center gap-3">
                <Button variant="secondary" onClick={back}>
                  Back
                </Button>
                <Button variant="outline" onClick={saveDraft}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>
                <Button className="ml-auto" onClick={next}>
                  Continue to Pre-checks
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold">Pre-migration Validation</h3>
                <p className="text-sm text-muted-foreground">
                  Final validation before starting the migration
                </p>
              </div>
              <PrecheckList show={true} />
              <div className="flex items-center gap-3">
                <Button variant="secondary" onClick={back}>
                  Back
                </Button>
                <Button variant="outline" onClick={saveDraft}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>
                <Button className="ml-auto" onClick={startMigration}>
                  <Play className="mr-2 h-4 w-4" />
                  Start Migration
                </Button>
              </div>
            </div>
          )}
        </Card>
      </main>
    </div>
  )
}



