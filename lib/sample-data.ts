export type MigrationStatus = "Success" | "Running" | "Error" | "Pending"

export type Migration = {
  id: string
  name: string
  owner: string
  source: string
  destination: string
  startedAt: string
  endedAt?: string | null
  status: MigrationStatus
}

export type MigrationDraft = {
  id: string
  name: string
  owner: string
  source: string
  destination: string
  lastModified: string
  progress: number // 0-100, how much is configured
}

export type MigrationTemplate = {
  id: string
  name: string
  description: string
  category: "Database Upgrade" | "Platform Migration" | "Cloud Migration" | "Application Migration" | "Custom"
  sourceType: string
  destinationType: string
  tables: string[]
  estimatedDuration: string
  complexity: "Low" | "Medium" | "High"
  createdBy: string
  lastUsed: string
  usageCount: number
  isPublic: boolean
  tags: string[]
  configuration: {
    batchSize: number
    parallelThreads: number
    retryAttempts: number
    validationRules: string[]
    transformations: string[]
  }
}

export const sampleMigrations: Migration[] = [
  {
    id: "mig-1001",
    name: "Q3 Finance ETL",
    owner: "a.thompson",
    source: "Oracle 12c",
    destination: "SQL Server 2019",
    status: "Success",
    startedAt: "06/25/2025 10:21",
    endedAt: "06/25/2025 11:42"
  },
  {
    id: "mig-1002",
    name: "CRM Lift-and-Shift",
    owner: "s.owens",
    source: "Oracle 19c",
    destination: "Azure SQL",
    status: "Running",
    startedAt: "07/01/2025 08:10",
    endedAt: null
  },
  {
    id: "mig-1003",
    name: "Legacy HR System",
    owner: "m.khan",
    source: "Oracle 11g",
    destination: "SQL Server 2016",
    status: "Error",
    startedAt: "07/03/2025 14:05",
    endedAt: "07/03/2025 14:18"
  },
  {
    id: "mig-1004",
    name: "Partner Analytics",
    owner: "e.lee",
    source: "Oracle 12c",
    destination: "SQL Server 2022",
    status: "Pending",
    startedAt: "07/08/2025 09:45",
    endedAt: null
  },
  {
    id: "mig-1005",
    name: "Sales Snapshot",
    owner: "n.roberts",
    source: "Oracle 18c",
    destination: "Azure SQL",
    status: "Pending",
    startedAt: "07/10/2025 16:02",
    endedAt: null
  },
  // Adding more migrations for Alex Thompson to make dashboard more realistic
  {
    id: "mig-1006",
    name: "Customer Data Warehouse",
    owner: "a.thompson",
    source: "Oracle 19c",
    destination: "SQL Server 2022",
    status: "Running",
    startedAt: "07/12/2025 09:30",
    endedAt: null
  },
  {
    id: "mig-1007",
    name: "Inventory Management",
    owner: "a.thompson",
    source: "Oracle 12c",
    destination: "Azure SQL",
    status: "Success",
    startedAt: "07/05/2025 14:20",
    endedAt: "07/05/2025 16:45"
  },
  {
    id: "mig-1008",
    name: "Marketing Campaign Data",
    owner: "a.thompson",
    source: "Oracle 18c",
    destination: "SQL Server 2019",
    status: "Success",
    startedAt: "06/28/2025 11:15",
    endedAt: "06/28/2025 12:30"
  },
  {
    id: "mig-1009",
    name: "Product Catalog Sync",
    owner: "a.thompson",
    source: "Oracle 11g",
    destination: "SQL Server 2022",
    status: "Error",
    startedAt: "07/11/2025 13:45",
    endedAt: "07/11/2025 14:02"
  },
  {
    id: "mig-1010",
    name: "Employee Benefits",
    owner: "a.thompson",
    source: "Oracle 19c",
    destination: "Azure SQL",
    status: "Pending",
    startedAt: "07/13/2025 08:00",
    endedAt: null
  },
  // Adding more migrations for other users to make admin view realistic
  {
    id: "mig-1011",
    name: "Supply Chain Analytics",
    owner: "s.owens",
    source: "Oracle 12c",
    destination: "SQL Server 2022",
    status: "Success",
    startedAt: "07/02/2025 10:30",
    endedAt: "07/02/2025 12:15"
  },
  {
    id: "mig-1012",
    name: "Financial Reporting",
    owner: "s.owens",
    source: "Oracle 18c",
    destination: "Azure SQL",
    status: "Success",
    startedAt: "06/30/2025 15:20",
    endedAt: "06/30/2025 17:45"
  },
  {
    id: "mig-1013",
    name: "Customer Support Data",
    owner: "m.khan",
    source: "Oracle 19c",
    destination: "SQL Server 2019",
    status: "Success",
    startedAt: "07/04/2025 09:15",
    endedAt: "07/04/2025 11:30"
  },
  {
    id: "mig-1014",
    name: "Sales Pipeline",
    owner: "m.khan",
    source: "Oracle 12c",
    destination: "SQL Server 2022",
    status: "Running",
    startedAt: "07/12/2025 16:45",
    endedAt: null
  },
  {
    id: "mig-1015",
    name: "Vendor Management",
    owner: "e.lee",
    source: "Oracle 11g",
    destination: "Azure SQL",
    status: "Success",
    startedAt: "07/06/2025 13:30",
    endedAt: "07/06/2025 15:20"
  },
  {
    id: "mig-1016",
    name: "Project Tracking",
    owner: "e.lee",
    source: "Oracle 18c",
    destination: "SQL Server 2016",
    status: "Pending",
    startedAt: "07/14/2025 10:00",
    endedAt: null
  },
  {
    id: "mig-1017",
    name: "Quality Assurance",
    owner: "n.roberts",
    source: "Oracle 19c",
    destination: "SQL Server 2019",
    status: "Success",
    startedAt: "07/09/2025 14:30",
    endedAt: "07/09/2025 16:15"
  },
  {
    id: "mig-1018",
    name: "Compliance Reporting",
    owner: "n.roberts",
    source: "Oracle 12c",
    destination: "SQL Server 2022",
    status: "Error",
    startedAt: "07/13/2025 11:20",
    endedAt: "07/13/2025 11:35"
  }
]

export const sampleDrafts: MigrationDraft[] = [
  {
    id: "draft-1001",
    name: "Finance ETL - Draft",
    owner: "a.thompson",
    source: "Oracle 11g",
    destination: "SQL Server 2022",
    lastModified: "07/12/2025 14:30",
    progress: 75,
  },
  {
    id: "draft-1002",
    name: "Inventory System - Draft",
    owner: "s.owens",
    source: "Oracle 18c",
    destination: "SQL Server 2019",
    lastModified: "07/11/2025 09:15",
    progress: 45,
  },
  {
    id: "draft-1003",
    name: "Customer Analytics - Draft",
    owner: "m.khan",
    source: "Oracle 19c",
    destination: "Azure SQL",
    lastModified: "07/10/2025 16:45",
    progress: 90,
  },
]

export const sampleTemplates: MigrationTemplate[] = [
  {
    id: "template-1001",
    name: "Oracle 11g to 19c Upgrade",
    description: "Standard template for upgrading Oracle databases from version 11g to 19c with optimized settings for large enterprise databases.",
    category: "Database Upgrade",
    sourceType: "Oracle 11g",
    destinationType: "Oracle 19c",
    tables: ["users", "orders", "products", "customers", "inventory"],
    estimatedDuration: "4-6 hours",
    complexity: "Medium",
    createdBy: "m.johnson",
    lastUsed: "2024-01-15",
    usageCount: 12,
    isPublic: true,
    tags: ["oracle", "upgrade", "enterprise", "validated"],
    configuration: {
      batchSize: 5000,
      parallelThreads: 4,
      retryAttempts: 3,
      validationRules: ["Data integrity check", "Constraint validation", "Index verification"],
      transformations: ["Date format standardization", "Character set conversion"]
    }
  },
  {
    id: "template-1002",
    name: "Oracle to SQL Server Migration",
    description: "Comprehensive template for migrating from Oracle to SQL Server with data type mappings and transformation rules.",
    category: "Platform Migration",
    sourceType: "Oracle 19c",
    destinationType: "SQL Server 2022",
    tables: ["customer_data", "order_history", "product_catalog", "user_profiles"],
    estimatedDuration: "8-12 hours",
    complexity: "High",
    createdBy: "a.thompson",
    lastUsed: "2024-01-10",
    usageCount: 8,
    isPublic: true,
    tags: ["oracle", "sql-server", "cross-platform", "enterprise"],
    configuration: {
      batchSize: 3000,
      parallelThreads: 2,
      retryAttempts: 5,
      validationRules: ["Cross-platform data validation", "Referential integrity", "Business rule compliance"],
      transformations: ["Oracle DATE to SQL Server DATETIME", "NUMBER to DECIMAL mapping", "VARCHAR2 to NVARCHAR"]
    }
  },
  {
    id: "template-1003",
    name: "On-Premise to Azure SQL",
    description: "Template for migrating on-premise SQL Server databases to Azure SQL Database with cloud-optimized settings.",
    category: "Cloud Migration",
    sourceType: "SQL Server 2019",
    destinationType: "Azure SQL Database",
    tables: ["sales_data", "customer_info", "product_inventory", "transaction_logs"],
    estimatedDuration: "6-10 hours",
    complexity: "Medium",
    createdBy: "s.chen",
    lastUsed: "2024-01-08",
    usageCount: 15,
    isPublic: true,
    tags: ["azure", "cloud", "sql-server", "migration"],
    configuration: {
      batchSize: 4000,
      parallelThreads: 3,
      retryAttempts: 4,
      validationRules: ["Cloud connectivity test", "Performance baseline", "Security compliance"],
      transformations: ["Connection string updates", "Authentication method changes"]
    }
  },
  {
    id: "template-1004",
    name: "Legacy System to Modern Platform",
    description: "Template for migrating legacy application databases to modern platforms with data cleansing and transformation.",
    category: "Application Migration",
    sourceType: "Legacy System",
    destinationType: "Modern Platform",
    tables: ["legacy_users", "old_orders", "historical_data", "system_config"],
    estimatedDuration: "12-24 hours",
    complexity: "High",
    createdBy: "r.garcia",
    lastUsed: "2024-01-05",
    usageCount: 3,
    isPublic: false,
    tags: ["legacy", "modernization", "data-cleansing", "transformation"],
    configuration: {
      batchSize: 2000,
      parallelThreads: 1,
      retryAttempts: 6,
      validationRules: ["Data quality assessment", "Business logic validation", "Completeness check"],
      transformations: ["Data cleansing", "Format standardization", "Duplicate removal", "Business rule application"]
    }
  },
  {
    id: "template-1005",
    name: "MySQL to PostgreSQL Migration",
    description: "Open source database migration template with optimized settings for web applications.",
    category: "Platform Migration",
    sourceType: "MySQL 8.0",
    destinationType: "PostgreSQL 15",
    tables: ["web_users", "blog_posts", "comments", "media_files"],
    estimatedDuration: "3-5 hours",
    complexity: "Low",
    createdBy: "d.wilson",
    lastUsed: "2024-01-12",
    usageCount: 22,
    isPublic: true,
    tags: ["mysql", "postgresql", "open-source", "web-app"],
    configuration: {
      batchSize: 6000,
      parallelThreads: 5,
      retryAttempts: 2,
      validationRules: ["Open source compatibility", "Web app functionality", "Performance testing"],
      transformations: ["MySQL syntax to PostgreSQL", "Data type conversion", "Index optimization"]
    }
  },
  {
    id: "template-1006",
    name: "High-Volume E-commerce Migration",
    description: "Specialized template for migrating large e-commerce databases with high transaction volumes.",
    category: "Custom",
    sourceType: "Oracle 19c",
    destinationType: "SQL Server 2022",
    tables: ["orders", "customers", "products", "inventory", "payments", "shipping"],
    estimatedDuration: "16-24 hours",
    complexity: "High",
    createdBy: "l.rodriguez",
    lastUsed: "2024-01-03",
    usageCount: 5,
    isPublic: false,
    tags: ["e-commerce", "high-volume", "transactional", "custom"],
    configuration: {
      batchSize: 1000,
      parallelThreads: 6,
      retryAttempts: 8,
      validationRules: ["Transaction integrity", "Zero downtime validation", "Performance under load"],
      transformations: ["Real-time sync setup", "Rollback procedures", "Monitoring integration"]
    }
  }
]

export type User = {
  id: string
  username: string
  displayName: string
  email: string
  role: "Admin" | "Migration Engineer" | "Viewer"
  department: string
  avatar?: string
}

export const currentUser: User = {
  id: "user-1001",
  username: "a.thompson",
  displayName: "Alex Thompson",
  email: "alex.thompson@company.com",
  role: "Migration Engineer",
  department: "Data Engineering",
  avatar: "/placeholder-user.jpg"
}

export const sampleUsers: User[] = [
  currentUser,
  {
    id: "user-1002",
    username: "s.owens",
    displayName: "Sarah Owens",
    email: "sarah.owens@company.com",
    role: "Migration Engineer",
    department: "Data Engineering"
  },
  {
    id: "user-1003",
    username: "m.khan",
    displayName: "Maya Khan",
    email: "maya.khan@company.com",
    role: "Migration Engineer",
    department: "IT"
  },
  {
    id: "user-1004",
    username: "e.lee",
    displayName: "Eric Lee",
    email: "eric.lee@company.com",
    role: "Migration Engineer",
    department: "Data Engineering"
  },
  {
    id: "user-1005",
    username: "n.roberts",
    displayName: "Nina Roberts",
    email: "nina.roberts@company.com",
    role: "Migration Engineer",
    department: "IT"
  },
  {
    id: "user-1006",
    username: "admin",
    displayName: "System Administrator",
    email: "admin@company.com",
    role: "Admin",
    department: "IT"
  }
]
