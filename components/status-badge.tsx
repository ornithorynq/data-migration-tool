import { Badge } from "@/components/ui/badge"
import type { MigrationStatus } from "@/lib/sample-data"

export function StatusBadge({ status }: { status: MigrationStatus }) {
  const map: Record<MigrationStatus, { label: string; className: string }> = {
    Success: { label: "Success", className: "bg-emerald-500 text-white hover:bg-emerald-500" },
    Running: { label: "Running", className: "bg-blue-500 text-white hover:bg-blue-500" },
    Error: { label: "Error", className: "bg-red-500 text-white hover:bg-red-500" },
    Pending: { label: "Pending", className: "bg-amber-500 text-white hover:bg-amber-500" },
    Draft: { label: "Draft", className: "bg-muted text-foreground hover:bg-muted" },
  }

  const { label, className } = map[status]
  return <Badge className={className}>{label}</Badge>
}
