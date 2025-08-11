"use client"

import AppHeader from "@/components/app-header"
import MigrationTable from "@/components/migration-table"
import DraftsSection from "@/components/drafts-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/status-badge"
import { sampleMigrations, sampleDrafts, currentUser } from "@/lib/sample-data"

export default function DashboardPage() {
  // Filter migrations to show only current user's migrations
  const userMigrations = sampleMigrations.filter(migration => migration.owner === currentUser.username)
  const userDrafts = sampleDrafts.filter(draft => draft.owner === currentUser.username)
  
  const highlighted = userMigrations.find(m => m.status === "Running") || userMigrations[0]

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 p-4 sm:p-6">
        {/* User Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {currentUser.displayName}</h1>
            <p className="text-muted-foreground mt-1">
              {currentUser.role} • {currentUser.department}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Active Migrations</p>
            <p className="text-2xl font-bold">{userMigrations.filter(m => m.status === "Running").length}</p>
          </div>
        </div>

        <MigrationTable data={userMigrations} />

        {userDrafts.length > 0 && (
          <DraftsSection drafts={userDrafts} />
        )}

        {highlighted && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Active record</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{highlighted.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {highlighted.source} → {highlighted.destination}
                  </p>
                </div>
                <StatusBadge status={highlighted.status} />
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
