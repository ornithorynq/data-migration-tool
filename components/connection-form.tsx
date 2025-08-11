"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface ConnectionFormProps {
  title?: string
  dbLabel?: string
  dbOptions?: string[]
  showNext?: boolean
  onNext?: () => void
  onBack?: () => void
  showBack?: boolean
}

export default function ConnectionForm({
  title = "Select Source",
  dbLabel = "Source DB",
  dbOptions = ["Oracle 11g", "Oracle 12c", "Oracle 19c"],
  showNext = true,
  onNext,
  onBack,
  showBack = true,
}: ConnectionFormProps) {
  const { toast } = useToast()
  const [checking, setChecking] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'checking' | 'success' | 'error'>('idle')
  const [db, setDb] = useState<string | undefined>(undefined)

  const check = async () => {
    setConnectionStatus('checking')
    setChecking(true)
    
    // Simulate connection check with realistic timing
    await new Promise((r) => setTimeout(r, 800))
    
    // Simulate 95% success rate (realistic for enterprise)
    const isSuccess = Math.random() > 0.05
    
    if (isSuccess) {
      setConnectionStatus('success')
      toast({ 
        title: "✅ Connection Established", 
        description: "Secure connection to Oracle database verified successfully. SSL/TLS encryption enabled." 
      })
    } else {
      setConnectionStatus('error')
      toast({ 
        title: "❌ Connection Failed", 
        description: "Unable to establish connection. Please verify credentials and network connectivity." 
      })
    }
    
    setChecking(false)
    
    // Reset status after 5 seconds
    setTimeout(() => setConnectionStatus('idle'), 5000)
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="hostname">Hostname</Label>
          <Input id="hostname" placeholder="e.g. db.company.local" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="port">Port</Label>
          <Input id="port" placeholder="1521" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="admin" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>
        <div className="grid gap-2">
          <Label>{dbLabel}</Label>
          <Select value={db} onValueChange={setDb}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${dbLabel}`} />
            </SelectTrigger>
            <SelectContent>
              {dbOptions.map((op) => (
                <SelectItem key={op} value={op}>
                  {op}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-3 pt-2">
          {showBack && onBack && (
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
          )}
          <Button type="button" onClick={check} disabled={checking}>
            {checking ? "Checking..." : "Check connection"}
          </Button>
          {showNext && (
            <Button type="button" className="ml-auto" onClick={onNext}>
              Next
            </Button>
          )}
        </div>
        
        {/* Connection Status Indicator */}
        {connectionStatus !== 'idle' && (
          <div className="mt-4 p-3 rounded-lg border transition-all duration-300">
            {connectionStatus === 'checking' && (
              <div className="flex items-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-sm font-medium">Establishing secure connection...</span>
              </div>
            )}
            {connectionStatus === 'success' && (
              <div className="flex items-center gap-2 text-green-600">
                <div className="h-4 w-4 rounded-full bg-green-600 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-sm font-medium">Connection established successfully</span>
              </div>
            )}
            {connectionStatus === 'error' && (
              <div className="flex items-center gap-2 text-red-600">
                <div className="h-4 w-4 rounded-full bg-red-600 flex items-center justify-center">
                  <span className="text-white text-xs">✗</span>
                </div>
                <span className="text-sm font-medium">Connection failed</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
