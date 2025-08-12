"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Calendar, Filter } from "lucide-react"
import { sampleMigrations, type Migration, type MigrationStatus } from "@/lib/sample-data"
import { StatusBadge } from "./status-badge"
import { cn } from "@/lib/utils"

type Props = {
  data?: Migration[]
}

type SortField = "startedAt" | "endedAt" | "name" | "status"
type SortDirection = "asc" | "desc"

export default function MigrationTable({ data = sampleMigrations }: Props) {
  const [statusFilter, setStatusFilter] = useState<MigrationStatus | "all">("all")
  const [sortField, setSortField] = useState<SortField>("startedAt")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  const filteredAndSorted = useMemo(() => {
    let filtered = data

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(m => m.status === statusFilter)
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      let aValue: any
      let bValue: any

      switch (sortField) {
        case "startedAt":
        case "endedAt":
          aValue = new Date(a[sortField] || "1970-01-01").getTime()
          bValue = new Date(b[sortField] || "1970-01-01").getTime()
          break
        case "name":
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case "status":
          aValue = a.status
          bValue = b.status
          break
        default:
          return 0
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [data, statusFilter, sortField, sortDirection])

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const getStatusCount = (status: MigrationStatus) => {
    return data.filter(m => m.status === status).length
  }

  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Migration History</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Track your data migration projects and their current status
          </p>
        </div>

        {/* Filters and Sorting Controls */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Status Filter */}
          <div className="flex items-center gap-3">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={(value: MigrationStatus | "all") => setStatusFilter(value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses ({data.length})</SelectItem>
                <SelectItem value="Success">Success ({getStatusCount("Success")})</SelectItem>
                <SelectItem value="Running">Running ({getStatusCount("Running")})</SelectItem>
                <SelectItem value="Pending">Pending ({getStatusCount("Pending")})</SelectItem>
                <SelectItem value="Error">Error ({getStatusCount("Error")})</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredAndSorted.length} of {data.length} migrations
          {statusFilter !== "all" && ` (filtered by ${statusFilter})`}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_th]:text-muted-foreground">
              <tr className="border-b">
                <th className="whitespace-nowrap px-3 py-2 text-left font-medium">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSort("startedAt")}
                    className={cn(
                      "h-auto p-0 font-medium hover:bg-transparent",
                      sortField === "startedAt" && "text-foreground"
                    )}
                  >
                    Started
                    {sortField === "startedAt" ? (
                      sortDirection === "asc" ? (
                        <ArrowUpDown className="ml-1 h-3 w-3 rotate-180" />
                      ) : (
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      )
                    ) : (
                      <ArrowUpDown className="ml-1 h-3 w-3 text-muted-foreground" />
                    )}
                  </Button>
                </th>
                <th className="px-3 py-2 text-left font-medium">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSort("name")}
                    className={cn(
                      "h-auto p-0 font-medium hover:bg-transparent",
                      sortField === "name" && "text-foreground"
                    )}
                  >
                    Migration
                    {sortField === "name" ? (
                      sortDirection === "asc" ? (
                        <ArrowUpDown className="ml-1 h-3 w-3 rotate-180" />
                      ) : (
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      )
                    ) : (
                      <ArrowUpDown className="ml-1 h-3 w-3 text-muted-foreground" />
                    )}
                  </Button>
                </th>
                <th className="px-3 py-2 text-left font-medium">Owner</th>
                <th className="px-3 py-2 text-left font-medium">Source</th>
                <th className="px-3 py-2 text-left font-medium">Destination</th>
                <th className="px-3 py-2 text-left font-medium">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSort("status")}
                    className={cn(
                      "h-auto p-0 font-medium hover:bg-transparent",
                      sortField === "status" && "text-foreground"
                    )}
                  >
                    Status
                    {sortField === "status" ? (
                      sortDirection === "asc" ? (
                        <ArrowUpDown className="ml-1 h-3 w-3 rotate-180" />
                      ) : (
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      )
                    ) : (
                      <ArrowUpDown className="ml-1 h-3 w-3 text-muted-foreground" />
                    )}
                  </Button>
                </th>
                <th className="whitespace-nowrap px-3 py-2 text-left font-medium">Ended</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSorted.map((m) => (
                <tr key={m.id} className={cn("border-b last:border-0 hover:bg-muted/40")}>
                  <td className="whitespace-nowrap px-3 py-3">{m.startedAt}</td>
                  <td className="px-3 py-3">
                    <Link href={`/migrations/${m.id}`} className="underline-offset-4 hover:underline">
                      {m.name}
                    </Link>
                  </td>
                  <td className="px-3 py-3">{m.owner}</td>
                  <td className="px-3 py-3">{m.source}</td>
                  <td className="px-3 py-3">{m.destination}</td>
                  <td className="px-3 py-3">
                    <StatusBadge status={m.status} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{m.endedAt ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
