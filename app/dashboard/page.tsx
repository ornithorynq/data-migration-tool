"use client"

import AppHeader from "@/components/app-header"
import MigrationTable from "@/components/migration-table"
import DraftsSection from "@/components/drafts-section"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { sampleMigrations, sampleDrafts, currentUser } from "@/lib/sample-data"

export default function DashboardPage() {
  // Filter migrations to show only current user's migrations
  const userMigrations = sampleMigrations.filter(migration => migration.owner === currentUser.username)
  const userDrafts = sampleDrafts.filter(draft => draft.owner === currentUser.username)
  
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 p-4 sm:p-6">
        {/* User Welcome Section - First */}
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

        {/* New Migration Section - Second */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Start New Migration</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Create a new data migration project
                </p>
              </div>
              <Button asChild size="lg">
                <Link href="/migrations/new">New Migration</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Drafts Section - Third */}
        {userDrafts.length > 0 && (
          <DraftsSection drafts={userDrafts} />
        )}

        {/* Migration History - Fourth */}
        <MigrationTable data={userMigrations} />
      </main>
    </div>
  )
}
