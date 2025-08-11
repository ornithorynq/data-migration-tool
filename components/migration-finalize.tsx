"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  CheckCircle, 
  AlertTriangle, 
  Database, 
  Table, 
  Clock, 
  Users, 
  FileText,
  Play,
  Pause,
  Settings,
  Download,
  Eye
} from "lucide-react"
import { cn } from "@/lib/utils"

type MigrationSummary = {
  sourceDatabase: string
  destinationDatabase: string
  totalTables: number
  totalColumns: number
  estimatedDuration: string
  estimatedSize: string
  validationStatus: 'success' | 'warning' | 'error'
  criticalIssues: number
  warnings: number
  infoItems: number
}

type MigrationSettings = {
  batchSize: number
  commitInterval: number
  errorThreshold: number
  parallelThreads: number
  enableRollback: boolean
  enableLogging: boolean
  enableNotifications: boolean
}

interface MigrationFinalizeProps {
  onStartMigration: () => void
  onBack: () => void
  onSaveDraft: () => void
}

export default function MigrationFinalize({ 
  onStartMigration, 
  onBack, 
  onSaveDraft 
}: MigrationFinalizeProps) {
  const [isStarting, setIsStarting] = useState(false)
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false)
  const [migrationSettings, setMigrationSettings] = useState<MigrationSettings>({
    batchSize: 10000,
    commitInterval: 1000,
    errorThreshold: 100,
    parallelThreads: 4,
    enableRollback: true,
    enableLogging: true,
    enableNotifications: true
  })

  // Mock data - in real app this would come from the previous steps
  const migrationSummary: MigrationSummary = {
    sourceDatabase: "Oracle 19c (Production)",
    destinationDatabase: "SQL Server 2022 (Target)",
    totalTables: 5,
    totalColumns: 47,
    estimatedDuration: "4-6 hours",
    estimatedSize: "2.8 GB",
    validationStatus: 'success',
    criticalIssues: 0,
    warnings: 2,
    infoItems: 3
  }

  const handleStartMigration = async () => {
    setIsStarting(true)
    
    // Simulate migration start process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsStarting(false)
    onStartMigration()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200'
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'error': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case 'error': return <AlertTriangle className="h-5 w-5 text-red-600" />
      default: return <CheckCircle className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Migration Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Migration Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Source & Destination */}
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm text-gray-600 mb-2">Source Database</h4>
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">{migrationSummary.sourceDatabase}</span>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm text-gray-600 mb-2">Destination Database</h4>
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-green-600" />
                  <span className="font-medium">{migrationSummary.destinationDatabase}</span>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{migrationSummary.totalTables}</div>
                  <div className="text-sm text-blue-700">Tables</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{migrationSummary.totalColumns}</div>
                  <div className="text-sm text-green-700">Columns</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">{migrationSummary.estimatedDuration}</div>
                  <div className="text-sm text-purple-700">Duration</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-lg font-bold text-orange-600">{migrationSummary.estimatedSize}</div>
                  <div className="text-sm text-orange-700">Size</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validation Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Validation Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Badge className={cn("text-sm", getStatusColor(migrationSummary.validationStatus))}>
              {getStatusIcon(migrationSummary.validationStatus)}
              <span className="ml-1">
                {migrationSummary.validationStatus === 'success' ? 'Ready to Migrate' :
                 migrationSummary.validationStatus === 'warning' ? 'Proceed with Caution' :
                 'Issues Must Be Resolved'}
              </span>
            </Badge>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{migrationSummary.criticalIssues}</div>
              <div className="text-sm text-gray-600">Critical Issues</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{migrationSummary.warnings}</div>
              <div className="text-sm text-gray-600">Warnings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{migrationSummary.infoItems}</div>
              <div className="text-sm text-gray-600">Info Items</div>
            </div>
          </div>

          {migrationSummary.validationStatus === 'success' && (
            <Alert className="mt-4 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                All validation checks have passed. Your migration configuration is ready to proceed.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Migration Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Migration Settings
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
              className="ml-auto"
            >
              {showAdvancedSettings ? 'Hide' : 'Show'} Advanced
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Batch Size</label>
              <div className="text-sm text-gray-600">Records per batch: {migrationSettings.batchSize.toLocaleString()}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Commit Interval</label>
              <div className="text-sm text-gray-600">Every {migrationSettings.commitInterval.toLocaleString()} records</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Error Threshold</label>
              <div className="text-sm text-gray-600">Stop after {migrationSettings.errorThreshold} errors</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Parallel Threads</label>
              <div className="text-sm text-gray-600">{migrationSettings.parallelThreads} concurrent processes</div>
            </div>
          </div>

          {showAdvancedSettings && (
            <div className="mt-4 pt-4 border-t space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Enable Rollback</span>
                <Badge variant={migrationSettings.enableRollback ? "default" : "secondary"}>
                  {migrationSettings.enableRollback ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Detailed Logging</span>
                <Badge variant={migrationSettings.enableLogging ? "default" : "secondary"}>
                  {migrationSettings.enableLogging ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Email Notifications</span>
                <Badge variant={migrationSettings.enableNotifications ? "default" : "secondary"}>
                  {migrationSettings.enableNotifications ? "Enabled" : "Disabled"}
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t">
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button variant="outline" onClick={onSaveDraft}>
            <FileText className="h-4 w-4 mr-2" />
            Save as Draft
          </Button>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Configuration
          </Button>
          <Button 
            onClick={handleStartMigration}
            disabled={isStarting || migrationSummary.validationStatus === 'error'}
            className="min-w-[160px]"
          >
            {isStarting ? (
              <>
                <Pause className="h-4 w-4 mr-2 animate-pulse" />
                Starting...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Start Migration
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Migration Start Confirmation */}
      {isStarting && (
        <Alert className="border-blue-200 bg-blue-50">
          <Clock className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            Preparing migration environment and queuing your migration job. This may take a few moments...
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
