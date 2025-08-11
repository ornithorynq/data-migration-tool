"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Edit, Trash2, Play } from "lucide-react"
import { MigrationDraft } from "@/lib/sample-data"
import { useToast } from "@/hooks/use-toast"

type Props = {
  drafts: MigrationDraft[]
}

export default function DraftsSection({ drafts }: Props) {
  const router = useRouter()
  const { toast } = useToast()

  const continueDraft = (draft: MigrationDraft) => {
    router.push(`/drafts/${draft.id}/continue`)
  }

  const deleteDraft = (draft: MigrationDraft) => {
    toast({ 
      title: "Draft Deleted", 
      description: `${draft.name} has been removed` 
    })
  }

  const startMigration = (draft: MigrationDraft) => {
    toast({ 
      title: "Migration Started", 
      description: `${draft.name} has been queued for execution` 
    })
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500"
    if (progress >= 50) return "bg-yellow-500"
    return "bg-blue-500"
  }

  const getProgressText = (progress: number) => {
    if (progress >= 80) return "Almost Ready"
    if (progress >= 50) return "In Progress"
    return "Just Started"
  }

  if (drafts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Drafts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">No drafts found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Start creating a new migration to see drafts here
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Drafts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {drafts.map((draft) => (
            <div key={draft.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/40 transition-colors">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{draft.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {draft.owner}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{draft.source} → {draft.destination}</span>
                  <span>Modified: {draft.lastModified}</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Configuration Progress</span>
                    <span className="font-medium">{draft.progress}%</span>
                  </div>
                  <Progress 
                    value={draft.progress} 
                    className="h-1"
                  />
                  <span className="text-xs text-muted-foreground">
                    {getProgressText(draft.progress)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => continueDraft(draft)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Continue
                </Button>
                {draft.progress >= 80 && (
                  <Button
                    size="sm"
                    onClick={() => startMigration(draft)}
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Start
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteDraft(draft)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
