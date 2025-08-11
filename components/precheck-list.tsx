"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertTriangle, Info, ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type PrecheckIssue = {
  id: string
  type: "error" | "warning" | "info"
  category: string
  title: string
  description: string
  affectedTable?: string
  affectedColumn?: string
  resolution?: string
  severity: "high" | "medium" | "low"
}

const sampleIssues: PrecheckIssue[] = [
  {
    id: "1",
    type: "error",
    category: "Data Type Mismatch",
    title: "Incompatible data type for orders.amount",
    description: "Source column 'amount' is NUMBER(10,2) but destination expects DECIMAL(12,2)",
    affectedTable: "orders",
    affectedColumn: "amount",
    resolution: "Update destination column type to DECIMAL(10,2) or modify source data",
    severity: "high"
  },
  {
    id: "2",
    type: "error",
    category: "Missing Index",
    title: "Missing foreign key index on order_items.order_id",
    description: "Foreign key constraint requires an index for optimal performance",
    affectedTable: "order_items",
    affectedColumn: "order_id",
    resolution: "Create index on order_items.order_id column",
    severity: "medium"
  },
  {
    id: "3",
    type: "warning",
    category: "Data Validation",
    title: "Pre-existing data in destination table 'invoices'",
    description: "Destination table contains 3 existing rows that may conflict",
    affectedTable: "invoices",
    resolution: "Review existing data and decide on merge strategy",
    severity: "medium"
  },
  {
    id: "4",
    type: "warning",
    category: "Performance",
    title: "Large table 'users' without partitioning",
    description: "Table 'users' contains 2.1M rows and may benefit from partitioning",
    affectedTable: "users",
    resolution: "Consider implementing table partitioning for better performance",
    severity: "low"
  },
  {
    id: "5",
    type: "info",
    category: "Schema Validation",
    title: "Unmapped columns detected",
    description: "5 columns across 2 tables are not mapped to destination",
    resolution: "Review and complete column mapping or exclude unmapped columns",
    severity: "low"
  }
]

export default function PrecheckList({ show = false }: { show?: boolean }) {
  const [expandedIssues, setExpandedIssues] = useState<Set<string>>(new Set())
  const [filter, setFilter] = useState<"all" | "error" | "warning" | "info">("all")

  const toggleIssue = (issueId: string) => {
    const newExpanded = new Set(expandedIssues)
    if (newExpanded.has(issueId)) {
      newExpanded.delete(issueId)
    } else {
      newExpanded.add(issueId)
    }
    setExpandedIssues(newExpanded)
  }

  const filteredIssues = sampleIssues.filter(issue => 
    filter === "all" || issue.type === filter
  )

  const getIcon = (type: string) => {
    switch (type) {
      case "error": return <XCircle className="h-4 w-4 text-red-500" />
      case "warning": return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "info": return <Info className="h-4 w-4 text-blue-500" />
      default: return <Info className="h-4 w-4" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-800 border-red-200"
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low": return "bg-blue-100 text-blue-800 border-blue-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (!show) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <h3 className="mt-2 text-sm font-medium">All checks passed</h3>
          <p className="mt-1 text-xs text-muted-foreground">No issues found during pre-check</p>
        </div>
      </div>
    )
  }

  const errorCount = sampleIssues.filter(i => i.type === "error").length
  const warningCount = sampleIssues.filter(i => i.type === "warning").length
  const infoCount = sampleIssues.filter(i => i.type === "info").length

  return (
    <div className="space-y-4">
      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Pre-check Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{errorCount}</div>
              <div className="text-sm text-muted-foreground">Errors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{warningCount}</div>
              <div className="text-sm text-muted-foreground">Warnings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{infoCount}</div>
              <div className="text-sm text-muted-foreground">Info</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          All ({sampleIssues.length})
        </Button>
        <Button
          variant={filter === "error" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("error")}
          className="text-red-600"
        >
          Errors ({errorCount})
        </Button>
        <Button
          variant={filter === "warning" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("warning")}
          className="text-yellow-600"
        >
          Warnings ({warningCount})
        </Button>
        <Button
          variant={filter === "info" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("info")}
          className="text-blue-600"
        >
          Info ({infoCount})
        </Button>
      </div>

      {/* Issues List */}
      <div className="space-y-3">
        {filteredIssues.map((issue) => (
          <Card key={issue.id} className="overflow-hidden">
            <div
              className={cn(
                "cursor-pointer p-4 transition-colors hover:bg-muted/40",
                expandedIssues.has(issue.id) && "bg-muted/40"
              )}
              onClick={() => toggleIssue(issue.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getIcon(issue.type)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{issue.title}</h4>
                      <Badge className={getSeverityColor(issue.severity)}>
                        {issue.severity}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {issue.description}
                    </p>
                    {(issue.affectedTable || issue.affectedColumn) && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        {issue.affectedTable && `Table: ${issue.affectedTable}`}
                        {issue.affectedColumn && ` • Column: ${issue.affectedColumn}`}
                      </div>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  {expandedIssues.has(issue.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {expandedIssues.has(issue.id) && (
              <div className="border-t bg-muted/20 p-4">
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-medium">Category</h5>
                    <p className="text-sm text-muted-foreground">{issue.category}</p>
                  </div>
                  {issue.resolution && (
                    <div>
                      <h5 className="text-sm font-medium">Recommended Resolution</h5>
                      <p className="text-sm text-muted-foreground">{issue.resolution}</p>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Mark as Resolved
                    </Button>
                    <Button size="sm" variant="outline">
                      Get Help
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Action Alert */}
      {errorCount > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <XCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {errorCount} critical error{errorCount > 1 ? 's' : ''} must be resolved before migration can proceed.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
