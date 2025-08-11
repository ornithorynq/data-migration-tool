"use client"

import { useState } from "react"
import AppHeader from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { 
  Search, 
  Filter, 
  Plus, 
  Play, 
  Copy, 
  Edit, 
  Trash2, 
  Eye, 
  Star,
  Clock,
  Users,
  Database,
  Cloud,
  Server,
  Code,
  Settings
} from "lucide-react"
import { useRouter } from "next/navigation"
import { sampleTemplates, sampleDrafts, MigrationTemplate } from "@/lib/sample-data"
import { useToast } from "@/hooks/use-toast"

export default function TemplatesPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [complexityFilter, setComplexityFilter] = useState<string>("all")
  const [selectedTemplate, setSelectedTemplate] = useState<MigrationTemplate | null>(null)

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Database Upgrade", label: "Database Upgrade" },
    { value: "Platform Migration", label: "Platform Migration" },
    { value: "Cloud Migration", label: "Cloud Migration" },
    { value: "Application Migration", label: "Application Migration" },
    { value: "Custom", label: "Custom" }
  ]

  const complexities = [
    { value: "all", label: "All Complexities" },
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" }
  ]

  const filteredTemplates = sampleTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter
    const matchesComplexity = complexityFilter === "all" || template.complexity === complexityFilter
    
    return matchesSearch && matchesCategory && matchesComplexity
  })

  const useTemplate = (template: MigrationTemplate) => {
    toast({
      title: "Template Applied",
      description: `Using template: ${template.name}`
    })
  }

  const duplicateTemplate = (template: MigrationTemplate) => {
    toast({
      title: "Template Duplicated",
      description: `Created copy of: ${template.name}`
    })
  }

  const deleteTemplate = (template: MigrationTemplate) => {
    toast({
      title: "Template Deleted",
      description: `Removed: ${template.name}`
    })
  }

  const continueDraft = (draft: any) => {
    router.push(`/drafts/${draft.id}/continue`)
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Low": return "bg-green-100 text-green-800"
      case "Medium": return "bg-yellow-100 text-yellow-800"
      case "High": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Database Upgrade": return <Database className="h-4 w-4" />
      case "Platform Migration": return <Server className="h-4 w-4" />
      case "Cloud Migration": return <Cloud className="h-4 w-4" />
      case "Application Migration": return <Code className="h-4 w-4" />
      case "Custom": return <Settings className="h-4 w-4" />
      default: return <Database className="h-4 w-4" />
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Templates & Drafts</h1>
          <p className="text-muted-foreground mt-2">
            Reusable migration configurations and work-in-progress drafts
          </p>
        </div>

        <Tabs defaultValue="templates" className="space-y-6">
          <TabsList>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search templates by name, description, or tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={complexityFilter} onValueChange={setComplexityFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {complexities.map(complexity => (
                        <SelectItem key={complexity.value} value={complexity.value}>
                          {complexity.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Template
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Templates Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(template.category)}
                        <Badge variant="outline" className="text-xs">
                          {template.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        {template.isPublic && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{template.name}</DialogTitle>
                              <DialogDescription>{template.description}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium">Source</h4>
                                  <p className="text-sm text-muted-foreground">{template.sourceType}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium">Destination</h4>
                                  <p className="text-sm text-muted-foreground">{template.destinationType}</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium">Tables</h4>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {template.tables.map(table => (
                                    <Badge key={table} variant="secondary" className="text-xs">
                                      {table}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium">Configuration</h4>
                                <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Batch Size:</span>
                                    <p className="font-medium">{template.configuration.batchSize.toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Threads:</span>
                                    <p className="font-medium">{template.configuration.parallelThreads}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Retries:</span>
                                    <p className="font-medium">{template.configuration.retryAttempts}</p>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium">Validation Rules</h4>
                                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                                  {template.configuration.validationRules.map(rule => (
                                    <li key={rule}>• {rule}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-medium">Transformations</h4>
                                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                                  {template.configuration.transformations.map(transformation => (
                                    <li key={transformation}>• {transformation}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {template.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Complexity</span>
                      <Badge className={getComplexityColor(template.complexity)}>
                        {template.complexity}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {template.estimatedDuration}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Usage</span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {template.usageCount} times
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {template.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {template.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{template.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => useTemplate(template)}
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Use Template
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => duplicateTemplate(template)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteTemplate(template)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No templates found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or create a new template
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Template
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

                     <TabsContent value="drafts" className="space-y-6">
             <Card>
               <CardHeader>
                 <CardTitle>Migration Drafts</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="space-y-4">
                   {sampleDrafts.map((draft) => (
                     <div key={draft.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/40 transition-colors">
                       <div className="flex-1 space-y-2">
                         <div className="flex items-center gap-2">
                           <h4 className="font-medium">{draft.name}</h4>
                           <Badge variant="outline" className="text-xs">
                             {draft.owner}
                           </Badge>
                         </div>
                         
                         <div className="flex items-center gap-4 text-sm text-muted-foreground">
                           <span>{draft.source} → {draft.destination}</span>
                           <span>Modified: {draft.lastModified}</span>
                         </div>
                         
                         <div className="space-y-1">
                           <div className="flex justify-between text-xs">
                             <span>Configuration Progress</span>
                             <span className="font-medium">{draft.progress}%</span>
                           </div>
                           <Progress 
                             value={draft.progress} 
                             className="h-1"
                           />
                           <span className="text-xs text-muted-foreground">
                             {draft.progress >= 80 ? "Almost Ready" : 
                              draft.progress >= 50 ? "In Progress" : "Just Started"}
                           </span>
                         </div>
                       </div>
                       
                       <div className="flex items-center gap-2 ml-4">
                         <Button
                           variant="outline"
                           size="sm"
                           onClick={() => continueDraft(draft)}
                         >
                           <Edit className="h-4 w-4 mr-1" />
                           Continue
                         </Button>
                         {draft.progress >= 80 && (
                           <Button
                             size="sm"
                             onClick={() => {
                               toast({ 
                                 title: "Migration Started", 
                                 description: `${draft.name} has been queued for execution` 
                               })
                             }}
                           >
                             <Play className="h-4 w-4 mr-1" />
                             Start
                           </Button>
                         )}
                         <Button
                           variant="ghost"
                           size="sm"
                           onClick={() => {
                             toast({ 
                               title: "Draft Deleted", 
                               description: `${draft.name} has been removed` 
                             })
                           }}
                           className="text-red-600 hover:text-red-700"
                         >
                           <Trash2 className="h-4 w-4" />
                         </Button>
                       </div>
                     </div>
                   ))}
                 </div>
               </CardContent>
             </Card>
           </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
