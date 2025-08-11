"use client"

import AppHeader from "@/components/app-header"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { sampleMigrations } from "@/lib/sample-data"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/status-badge"

export default function MigrationDetailPage() {
const params = useParams()
const id = Array.isArray(params?.id) ? params?.id[0] : (params?.id as string)
const mig = sampleMigrations.find((m) => m.id === id)
if (!mig) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6">
        <h1 className="text-2xl font-semibold">Migration not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">The requested migration does not exist in this demo.</p>
      </main>
    </div>
  )
}

return (
  <div className="flex min-h-screen flex-col">
    <AppHeader />
    <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">{mig?.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Owner: {mig?.owner} • Source: {mig?.source} → Destination: {mig?.destination}
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="flex flex-wrap items-center gap-3 p-4 sm:p-6">
          <div>
            <div className="text-sm text-muted-foreground">Started</div>
            <div className="text-sm">{mig?.startedAt}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Ended</div>
            <div className="text-sm">{mig?.endedAt ?? "—"}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">Status</div>
            {mig && <StatusBadge status={mig.status} />}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="report">
        <TabsList>
          <TabsTrigger value="report">Report</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="issues">Errors, Warnings</TabsTrigger>
        </TabsList>

        <TabsContent value="report">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <Badge className="mr-2 bg-emerald-500 text-white hover:bg-emerald-500">Tables</Badge>
                14 migrated successfully
              </div>
              <div>
                <Badge className="mr-2 bg-blue-500 text-white hover:bg-blue-500">Rows</Badge>
                2,045,331 transferred
              </div>
              <div>
                <Badge className="mr-2 bg-amber-500 text-white hover:bg-amber-500">Warnings</Badge>
                3 warnings
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-72 overflow-auto rounded border bg-muted/40 p-3 font-mono text-xs">
                {'[10:21:04] Connecting to source...'}
                {"\n"}
                {'[10:21:06] Connection established.'}
                {"\n"}
                {'[10:21:06] Fetching schema (users)...'}
                {"\n"}
                {'[10:21:12] Migrated "users" (45,201 rows).'}
                {"\n"}
                {'[10:27:45] Migrated "orders" (120,555 rows).'}
                {"\n"}
                {'[10:30:10] Warning: invoices already contains 3 rows.'}
                {"\n"}
                {'[11:42:03] Migration completed.'}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Errors, Warnings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="rounded border bg-red-500/10 p-3">Error: Datatype mismatch on orders.amount</div>
              <div className="rounded border bg-red-500/10 p-3">Error: Missing index on order_items.order_id</div>
              <div className="rounded border bg-amber-500/10 p-3">Warning: Pre-existing rows in Invoices</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  </div>
)
}
