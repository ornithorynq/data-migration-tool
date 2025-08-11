"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import AppHeader from "@/components/app-header"
import Stepper from "@/components/stepper"
import ConnectionForm from "@/components/connection-form"
import MappingPreview from "@/components/mapping-preview"
import PrecheckList from "@/components/precheck-list"
import MigrationFinalize from "@/components/migration-finalize"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"


export default function NewMigrationPage() {
  const [step, setStep] = useState(1)
  const [showIssues, setShowIssues] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const next = () => setStep((s) => Math.min(5, s + 1))
  const back = () => setStep((s) => Math.max(1, s - 1))



  const startMigration = async () => {
    toast({ 
      title: "Migration Started!", 
      description: "Your migration has been queued and will begin processing shortly. You can monitor progress from the dashboard."
    })
    router.push("/dashboard")
  }

  const saveDraft = () => {
    toast({ 
      title: "Draft Saved", 
      description: "Your migration configuration has been saved as a draft. You can continue working on it later."
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6">
        <Stepper current={step} />

        <Card className="p-4 sm:p-6">
          {step === 1 && (
            <ConnectionForm
              title="Select Source (Oracle DB)"
              dbLabel="Source DB"
              dbOptions={["Oracle 11g", "Oracle 12c", "Oracle 18c", "Oracle 19c"]}
              onNext={next}
              onBack={() => {}} // No back on first step
              showBack={false}
            />
          )}

          {step === 2 && (
            <ConnectionForm
              title="Select Destination (SQL Server)"
              dbLabel="Destination DB"
              dbOptions={["SQL Server 2016", "SQL Server 2019", "SQL Server 2022", "Azure SQL"]}
              onNext={next}
              onBack={back}
              showBack={true}
            />
          )}

          {step === 3 && (
            <div className="space-y-6">
              <MappingPreview />

              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={back}>
                  Back
                </Button>
                <Button variant="outline" onClick={saveDraft}>
                  Save as draft
                </Button>
                <Button 
                  className="ml-auto" 
                  onClick={next}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Pre-checks</h2>
              <PrecheckList show={true} />
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={back}>
                  Back
                </Button>
                <Button className="ml-auto" onClick={next}>
                  Continue to Finalize
                </Button>
              </div>
            </div>
          )}

          {step === 5 && (
            <MigrationFinalize
              onStartMigration={startMigration}
              onBack={back}
              onSaveDraft={saveDraft}
            />
          )}
        </Card>
      </main>
    </div>
  )
}
