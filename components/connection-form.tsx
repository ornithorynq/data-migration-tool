"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

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
          <div className="flex items-end gap-3">
            <div className="flex-1">
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
            
            {/* Check Connection Button - positioned to the right of the dropdown */}
            <Button 
              type="button" 
              onClick={check} 
              disabled={checking}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {checking ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Checking...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Check connection</span>
                </div>
              )}
            </Button>
          </div>
          
          {/* Connection Status Message - positioned right below the connection controls */}
          {connectionStatus !== 'idle' && (
            <div className={cn(
              "mt-3 p-3 rounded-lg border text-sm flex items-center gap-2",
              connectionStatus === 'success'
                ? "bg-green-50 border-green-200 text-green-800" 
                : connectionStatus === 'error'
                ? "bg-red-50 border-red-200 text-red-800"
                : "bg-blue-50 border-blue-200 text-blue-800"
            )}>
              {connectionStatus === 'checking' && (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                  <span>Establishing secure connection...</span>
                </>
              )}
              {connectionStatus === 'success' && (
                <>
                  <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Connection established successfully</span>
                </>
              )}
              {connectionStatus === 'error' && (
                <>
                  <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Connection failed. Please verify credentials and network connectivity.</span>
                </>
              )}
            </div>
          )}
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex items-center gap-3 pt-2">
          {showBack && onBack && (
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
          )}
          {showNext && (
            <Button type="button" className="ml-auto" onClick={onNext}>
              Next
            </Button>
          )}
        </div>
        
        {/* Remove the old connection status message that was below navigation */}
      </div>
    </div>
  )
}
