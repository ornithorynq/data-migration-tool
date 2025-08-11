"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { sampleMigrations, type Migration } from "@/lib/sample-data"
import { StatusBadge } from "./status-badge"
import { cn } from "@/lib/utils"

type Props = {
  data?: Migration[]
}

export default function MigrationTable({ data = sampleMigrations }: Props) {
  const [query, setQuery] = useState("")
  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return data.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.owner.toLowerCase().includes(q) ||
        m.source.toLowerCase().includes(q) ||
        m.destination.toLowerCase().includes(q)
    )
  }, [data, query])

  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search migrations..."
              className="pl-8"
              aria-label="Search migrations"
            />
          </div>
          <div className="ml-auto">
            <Button asChild>
              <Link href="/migrations/new">New Migration</Link>
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_th]:text-muted-foreground">
              <tr className="border-b">
                <th className="whitespace-nowrap px-3 py-2 text-left font-medium">Started</th>
                <th className="px-3 py-2 text-left font-medium">Migration</th>
                <th className="px-3 py-2 text-left font-medium">Owner</th>
                <th className="px-3 py-2 text-left font-medium">Source</th>
                <th className="px-3 py-2 text-left font-medium">Destination</th>
                <th className="px-3 py-2 text-left font-medium">Status</th>
                <th className="whitespace-nowrap px-3 py-2 text-left font-medium">Ended</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
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
