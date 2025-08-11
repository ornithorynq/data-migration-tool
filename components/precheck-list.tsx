"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertTriangle, Info, ChevronDown, ChevronRight, Database, Table, Column } from "lucide-react"
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
  estimatedImpact?: string
  technicalDetails?: string
}

// Generate realistic enterprise validation issues
const generateEnterpriseIssues = (): PrecheckIssue[] => {
  const issues: PrecheckIssue[] = []
  
  // Data Type Compatibility Issues (Common in real migrations)
  if (Math.random() > 0.4) {
    issues.push({
      id: "1",
      type: "error",
      category: "Data Type Mismatch",
      title: "Incompatible data type for CUSTOMERS.CREATED_DATE",
      description: "Source column 'CREATED_DATE' is Oracle DATE but destination expects SQL Server DATETIME2",
      affectedTable: "CUSTOMERS",
      affectedColumn: "CREATED_DATE",
      resolution: "Update destination column type to DATETIME2 or implement date conversion logic",
      severity: "high",
      estimatedImpact: "Data truncation risk",
      technicalDetails: "Oracle DATE (7 bytes) → SQL Server DATETIME2 (8 bytes)"
    })
  }

  // Constraint Validation Issues
  if (Math.random() > 0.3) {
    issues.push({
      id: "2",
      type: "error",
      category: "Constraint Violation",
      title: "NOT NULL constraint violation risk on ORDERS.CUSTOMER_ID",
      description: "Source data contains NULL values in CUSTOMER_ID column but destination requires NOT NULL",
      affectedTable: "ORDERS",
      affectedColumn: "CUSTOMER_ID",
      resolution: "Filter out NULL values or implement default value logic",
      severity: "high",
      estimatedImpact: "Migration failure",
      technicalDetails: "Found 47 rows with NULL CUSTOMER_ID values"
    })
  }

  // Performance Issues
  if (Math.random() > 0.5) {
    issues.push({
      id: "3",
      type: "warning",
      category: "Performance",
      title: "Large table 'ORDERS' without proper indexing strategy",
      description: "Table 'ORDERS' contains 2.1M rows and may cause performance issues during migration",
      affectedTable: "ORDERS",
      resolution: "Consider implementing table partitioning or batch processing strategy",
      severity: "medium",
      estimatedImpact: "Extended migration time",
      technicalDetails: "Estimated migration time: 4-6 hours without optimization"
    })
  }

  // Schema Validation Issues
  if (Math.random() > 0.6) {
    issues.push({
      id: "4",
      type: "warning",
      category: "Schema Validation",
      title: "Unmapped columns detected in multiple tables",
      description: "12 columns across 3 tables are not mapped to destination",
      resolution: "Review and complete column mapping or exclude unmapped columns",
      severity: "medium",
      estimatedImpact: "Data loss risk",
      technicalDetails: "Affected tables: CUSTOMERS (3), ORDERS (5), INVENTORY (4)"
    })
  }

  // Data Quality Issues
  if (Math.random() > 0.4) {
    issues.push({
      id: "5",
      type: "warning",
      category: "Data Quality",
      title: "Duplicate records detected in CUSTOMERS table",
      description: "Found 156 potential duplicate customer records based on email addresses",
      affectedTable: "CUSTOMERS",
      affectedColumn: "EMAIL",
      resolution: "Implement deduplication logic or review data quality",
      severity: "medium",
      estimatedImpact: "Data integrity issues",
      technicalDetails: "Duplicates based on: EMAIL, PHONE, COMPANY_NAME combinations"
    })
  }

  // Security Issues
  if (Math.random() > 0.7) {
    issues.push({
      id: "6",
      type: "info",
      category: "Security",
      title: "Sensitive data columns identified",
      description: "Columns containing PII data detected: CUSTOMERS.SSN, CUSTOMERS.CREDIT_CARD",
      affectedTable: "CUSTOMERS",
      affectedColumn: "SSN, CREDIT_CARD",
      resolution: "Ensure proper encryption and access controls in destination",
      severity: "low",
      estimatedImpact: "Compliance requirements",
      technicalDetails: "GDPR/CCPA compliance considerations required"
    })
  }

  // Migration Strategy Issues
  if (Math.random() > 0.5) {
    issues.push({
      id: "7",
      type: "info",
      category: "Migration Strategy",
      title: "Cross-database foreign key relationships detected",
      description: "ORDERS.CUSTOMER_ID references CUSTOMERS.ID across different source databases",
      affectedTable: "ORDERS",
      affectedColumn: "CUSTOMER_ID",
      resolution: "Verify referential integrity after migration",
      severity: "low",
      estimatedImpact: "Data consistency verification needed",
      technicalDetails: "Cross-database FK: ORDERS_DB → CUSTOMERS_DB"
    })
  }

  // If no issues generated, add success message
  if (issues.length === 0) {
    issues.push({
      id: "success",
      type: "info",
      category: "Validation Complete",
      title: "All validation checks passed successfully",
      description: "Your migration configuration meets all enterprise requirements and is ready to proceed",
      severity: "low",
      estimatedImpact: "Ready for migration",
      technicalDetails: "Configuration validated: 100% compliance"
    })
  }

  return issues
}

export default function PrecheckList({ show = false }: { show?: boolean }) {
  const [expandedIssues, setExpandedIssues] = useState<Set<string>>(new Set())
  const [filter, setFilter] = useState<"all" | "error" | "warning" | "info">("all")
  const [issues, setIssues] = useState<PrecheckIssue[]>([])

  useEffect(() => {
    if (show) {
      setIssues(generateEnterpriseIssues())
    }
  }, [show])

  const toggleIssue = (issueId: string) => {
    const newExpanded = new Set(expandedIssues)
    if (newExpanded.has(issueId)) {
      newExpanded.delete(issueId)
    } else {
      newExpanded.add(issueId)
    }
    setExpandedIssues(newExpanded)
  }

  const filteredIssues = issues.filter(issue => 
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Data Type Mismatch":
      case "Constraint Violation":
        return <Column className="h-4 w-4" />
      case "Performance":
      case "Schema Validation":
        return <Table className="h-4 w-4" />
      case "Data Quality":
      case "Security":
      case "Migration Strategy":
        return <Database className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
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

  const errorCount = issues.filter(i => i.type === "error").length
  const warningCount = issues.filter(i => i.type === "warning").length
  const infoCount = issues.filter(i => i.type === "info").length

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
              <div className="text-sm text-muted-foreground">Critical Errors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{warningCount}</div>
              <div className="text-sm text-muted-foreground">Warnings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{infoCount}</div>
              <div className="text-sm text-muted-foreground">Info Items</div>
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
          All ({issues.length})
        </Button>
        <Button
          variant={filter === "error" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("error")}
          className="text-red-600"
        >
          Critical Errors ({errorCount})
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
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(issue.category)}
                    <h5 className="text-sm font-medium">Category</h5>
                  </div>
                  <p className="text-sm text-muted-foreground">{issue.category}</p>
                  
                  {issue.estimatedImpact && (
                    <div>
                      <h5 className="text-sm font-medium">Estimated Impact</h5>
                      <p className="text-sm text-muted-foreground">{issue.estimatedImpact}</p>
                    </div>
                  )}
                  
                  {issue.technicalDetails && (
                    <div>
                      <h5 className="text-sm font-medium">Technical Details</h5>
                      <p className="text-sm text-muted-foreground font-mono bg-muted p-2 rounded">
                        {issue.technicalDetails}
                      </p>
                    </div>
                  )}
                  
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
                    <Button size="sm" variant="outline">
                      View Documentation
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
            Please review and fix these issues to ensure a successful migration.
          </AlertDescription>
        </Alert>
      )}

      {/* Success Message */}
      {errorCount === 0 && warningCount === 0 && infoCount > 0 && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Excellent! All validation checks have passed. Your migration configuration is ready to proceed.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
