"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AppHeader from "@/components/app-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Download, MoreHorizontal, Eye, Trash2, Pause, Play } from "lucide-react"
import { sampleMigrations, sampleUsers } from "@/lib/sample-data"
import { StatusBadge } from "@/components/status-badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AdminPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [userFilter, setUserFilter] = useState<string>("all")

  // Get user display names for filtering
  const getUserDisplayName = (username: string) => {
    const user = sampleUsers.find(u => u.username === username)
    return user ? user.displayName : username
  }

  const users = sampleUsers.filter(user => user.role !== "Admin").map(user => ({
    value: user.username,
    label: user.displayName
  }))
  const statuses = ["Success", "Running", "Error", "Pending", "Draft"]

  const filteredMigrations = sampleMigrations.filter(migration => {
    const matchesSearch = migration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         migration.owner.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || migration.status === statusFilter
    const matchesUser = userFilter === "all" || migration.owner === userFilter
    
    return matchesSearch && matchesStatus && matchesUser
  })

  const getStatusCount = (status: string) => {
    return sampleMigrations.filter(m => m.status === status).length
  }

  const getUserCount = (user: string) => {
    return sampleMigrations.filter(m => m.owner === user).length
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage all migrations and users</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button size="sm">
              <Eye className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Migrations</CardTitle>
              <Badge variant="secondary">{sampleMigrations.length}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sampleMigrations.length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Badge variant="secondary">{users.length}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Running</CardTitle>
              <Badge variant="secondary">{getStatusCount("Running")}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getStatusCount("Running")}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <Badge variant="secondary">85%</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Migration Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search migrations or users..."
                  className="pl-8"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status} ({getStatusCount(status)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={userFilter} onValueChange={setUserFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {users.map(user => (
                    <SelectItem key={user.value} value={user.value}>
                      {user.label} ({getUserCount(user.value)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Migrations Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_th]:text-muted-foreground">
                  <tr className="border-b">
                    <th className="whitespace-nowrap px-3 py-2 text-left font-medium">User</th>
                    <th className="whitespace-nowrap px-3 py-2 text-left font-medium">Date Started</th>
                    <th className="px-3 py-2 text-left font-medium">Migration Name</th>
                    <th className="px-3 py-2 text-left font-medium">Source</th>
                    <th className="px-3 py-2 text-left font-medium">Destination</th>
                    <th className="px-3 py-2 text-left font-medium">Status</th>
                    <th className="whitespace-nowrap px-3 py-2 text-left font-medium">Last Update</th>
                    <th className="px-3 py-2 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMigrations.map((migration) => (
                    <tr key={migration.id} className="border-b last:border-0 hover:bg-muted/40">
                      <td className="whitespace-nowrap px-3 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                            {migration.owner.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium">{getUserDisplayName(migration.owner)}</div>
                            <div className="text-xs text-muted-foreground">@{migration.owner}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">{migration.startedAt}</td>
                      <td className="px-3 py-3">
                        <div className="font-medium">{migration.name}</div>
                        <div className="text-xs text-muted-foreground">ID: {migration.id}</div>
                      </td>
                      <td className="px-3 py-3">
                        <Badge variant="outline">{migration.source}</Badge>
                      </td>
                      <td className="px-3 py-3">
                        <Badge variant="outline">{migration.destination}</Badge>
                      </td>
                      <td className="px-3 py-3">
                        <StatusBadge status={migration.status} />
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">{migration.endedAt ?? "—"}</td>
                      <td className="px-3 py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => router.push(`/migrations/${migration.id}`)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            {migration.status === "Running" && (
                              <DropdownMenuItem>
                                <Pause className="mr-2 h-4 w-4" />
                                Pause Migration
                              </DropdownMenuItem>
                            )}
                            {migration.status === "Pending" && (
                              <DropdownMenuItem>
                                <Play className="mr-2 h-4 w-4" />
                                Start Migration
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Migration
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredMigrations.length === 0 && (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <p className="text-muted-foreground">No migrations found matching your filters.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
