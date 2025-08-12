"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { 
  ArrowLeftRight, 
  ChevronDown, 
  ChevronRight, 
  Settings, 
  CheckCircle,
  XCircle,
  AlertTriangle,
  Database,
  Table,
  Code,
  Search,
  Filter,
  Eye,
  EyeOff,
  Copy,
  Save,
  RefreshCw,
  Zap,
  Calculator,
  Filter as FilterIcon,
  ArrowUpDown,
  Split,
  Merge,
  FolderOpen,
  Package,
  Truck,
  Users,
  Building2,
  FileText,
  Calendar,
  MapPin,
  X
} from 'lucide-react'
import { cn } from "@/lib/utils"

type TableMapping = {
  sourceTable: string
  destinationTable: string
  configured: boolean
  status: 'pending' | 'mapped' | 'validated' | 'error'
  rowCount?: number
  columns: ColumnMapping[]
  category: string
  description: string
  lastUpdated: string
}

type ColumnMapping = {
  sourceColumn: string
  sourceType: string
  destinationColumn: string
  destinationType: string
  mapped: boolean
  validation?: 'valid' | 'warning' | 'error'
  nullable: boolean
  primaryKey?: boolean
  foreignKey?: string
  sampleData?: string[]
}

// Mock available tables in Oracle database
const availableTables = [
  {
    name: "CUSTOMERS",
    category: "Customer Data",
    description: "Customer master data including contact information and preferences",
    rowCount: 2500000,
    lastUpdated: "2024-01-15",
    icon: Users
  },
  {
    name: "ORDERS",
    category: "Order Management", 
    description: "Customer orders and order line items",
    rowCount: 8900000,
    lastUpdated: "2024-01-15",
    icon: Package
  },
  {
    name: "SHIPMENTS",
    category: "Logistics",
    description: "Shipment tracking and delivery information",
    rowCount: 12000000,
    lastUpdated: "2024-01-15",
    icon: Truck
  },
  {
    name: "INVENTORY",
    category: "Warehouse Management",
    description: "Product inventory across all warehouse locations",
    rowCount: 5000000,
    lastUpdated: "2024-01-15",
    icon: Building2
  },
  {
    name: "SUPPLIERS",
    category: "Vendor Management",
    description: "Supplier information and performance metrics",
    rowCount: 15000,
    lastUpdated: "2024-01-15",
    icon: Users
  },
  {
    name: "WAREHOUSES",
    category: "Facility Management",
    description: "Warehouse locations, capacity, and zone information",
    rowCount: 250,
    lastUpdated: "2024-01-15",
    icon: Building2
  },
  {
    name: "PRODUCTS",
    category: "Product Catalog",
    description: "Product master data, SKUs, and specifications",
    rowCount: 180000,
    lastUpdated: "2024-01-15",
    icon: Package
  },
  {
    name: "RETURNS",
    category: "Returns Processing",
    description: "Customer returns and RMA processing",
    rowCount: 450000,
    lastUpdated: "2024-01-15",
    icon: FileText
  },
  {
    name: "ROUTES",
    category: "Transportation",
    description: "Transportation routes and delivery schedules",
    rowCount: 85000,
    lastUpdated: "2024-01-15",
    icon: MapPin
  },
  {
    name: "DRIVERS",
    category: "Transportation",
    description: "Driver information and performance data",
    rowCount: 1200,
    lastUpdated: "2024-01-15",
    icon: Users
  }
]

const sampleTables: TableMapping[] = [
  {
    sourceTable: "CUSTOMERS",
    destinationTable: "Customers",
    configured: true,
    status: 'validated',
    rowCount: 2500000,
    category: "Customer Data",
    description: "Customer master data including contact information and preferences",
    lastUpdated: "2024-01-15",
    columns: [
      { sourceColumn: "CUSTOMER_ID", sourceType: "NUMBER(10)", destinationColumn: "CustomerID", destinationType: "INT", mapped: true, validation: 'valid', nullable: false, primaryKey: true, sampleData: ["100001", "100002", "100003"] },
      { sourceColumn: "CUSTOMER_NAME", sourceType: "VARCHAR2(100)", destinationColumn: "CustomerName", destinationType: "NVARCHAR(100)", mapped: true, validation: 'valid', nullable: false, sampleData: ["Acme Corp", "Global Industries", "Tech Solutions"] },
      { sourceColumn: "EMAIL_ADDRESS", sourceType: "VARCHAR2(150)", destinationColumn: "EmailAddress", destinationType: "NVARCHAR(150)", mapped: true, validation: 'valid', nullable: true, sampleData: ["contact@acme.com", "info@global.com", "hello@tech.com"] },
      { sourceColumn: "PHONE_NUMBER", sourceType: "VARCHAR2(20)", destinationColumn: "PhoneNumber", destinationType: "NVARCHAR(20)", mapped: true, validation: 'valid', nullable: true, sampleData: ["+1-555-0101", "+1-555-0102", "+1-555-0103"] },
      { sourceColumn: "ADDRESS_LINE1", sourceType: "VARCHAR2(200)", destinationColumn: "AddressLine1", destinationType: "NVARCHAR(200)", mapped: true, validation: 'valid', nullable: true, sampleData: ["123 Main St", "456 Business Ave", "789 Tech Blvd"] },
      { sourceColumn: "CITY", sourceType: "VARCHAR2(50)", destinationColumn: "City", destinationType: "NVARCHAR(50)", mapped: true, validation: 'valid', nullable: true, sampleData: ["New York", "Los Angeles", "Chicago"] },
      { sourceColumn: "POSTAL_CODE", sourceType: "VARCHAR2(10)", destinationColumn: "PostalCode", destinationType: "NVARCHAR(10)", mapped: true, validation: 'valid', nullable: true, sampleData: ["10001", "90210", "60601"] },
      { sourceColumn: "COUNTRY", sourceType: "VARCHAR2(50)", destinationColumn: "Country", destinationType: "NVARCHAR(50)", mapped: true, validation: 'valid', nullable: true, sampleData: ["USA", "USA", "USA"] },
      { sourceColumn: "CREATED_DATE", sourceType: "DATE", destinationColumn: "CreatedDate", destinationType: "DATETIME2", mapped: true, validation: 'valid', nullable: false, sampleData: ["2020-01-15", "2020-02-20", "2020-03-10"] },
      { sourceColumn: "LAST_UPDATED", sourceType: "TIMESTAMP", destinationColumn: "LastUpdated", destinationType: "DATETIME2", mapped: true, validation: 'valid', nullable: true, sampleData: ["2024-01-15", "2024-01-15", "2024-01-15"] }
    ]
  },
  {
    sourceTable: "ORDERS",
    destinationTable: "Orders",
    configured: false,
    status: 'pending',
    rowCount: 8900000,
    category: "Order Management",
    description: "Customer orders and order line items",
    lastUpdated: "2024-01-15",
    columns: [
      { sourceColumn: "ORDER_ID", sourceType: "NUMBER(12)", destinationColumn: "OrderID", destinationType: "BIGINT", mapped: false, validation: 'warning', nullable: false, primaryKey: true, sampleData: ["1000000001", "1000000002", "1000000003"] },
      { sourceColumn: "CUSTOMER_ID", sourceType: "NUMBER(10)", destinationColumn: "CustomerID", destinationType: "INT", mapped: false, validation: 'warning', nullable: false, foreignKey: "CUSTOMERS.CUSTOMER_ID", sampleData: ["100001", "100002", "100003"] },
      { sourceColumn: "ORDER_DATE", sourceType: "DATE", destinationColumn: "OrderDate", destinationType: "DATETIME2", mapped: false, validation: 'warning', nullable: false, sampleData: ["2024-01-10", "2024-01-11", "2024-01-12"] },
      { sourceColumn: "TOTAL_AMOUNT", sourceType: "NUMBER(12,2)", destinationColumn: "TotalAmount", destinationType: "DECIMAL(12,2)", mapped: false, validation: 'error', nullable: true, sampleData: ["1250.99", "875.50", "2100.00"] },
      { sourceColumn: "ORDER_STATUS", sourceType: "VARCHAR2(20)", destinationColumn: "OrderStatus", destinationType: "NVARCHAR(20)", mapped: false, validation: 'warning', nullable: false, sampleData: ["PENDING", "CONFIRMED", "SHIPPED"] },
      { sourceColumn: "SHIPPING_METHOD", sourceType: "VARCHAR2(50)", destinationColumn: "ShippingMethod", destinationType: "NVARCHAR(50)", mapped: false, validation: 'warning', nullable: true, sampleData: ["STANDARD", "EXPRESS", "OVERNIGHT"] },
      { sourceColumn: "SHIPPING_ADDRESS", sourceType: "VARCHAR2(500)", destinationColumn: "ShippingAddress", destinationType: "NVARCHAR(500)", mapped: false, validation: 'warning', nullable: true, sampleData: ["123 Main St, NY 10001", "456 Business Ave, LA 90210", "789 Tech Blvd, CH 60601"] }
    ]
  },
  {
    sourceTable: "INVENTORY",
    destinationTable: "Inventory",
    configured: false,
    status: 'pending',
    rowCount: 5000000,
    category: "Warehouse Management",
    description: "Product inventory across all warehouse locations",
    lastUpdated: "2024-01-15",
    columns: [
      { sourceColumn: "INVENTORY_ID", sourceType: "NUMBER(12)", destinationColumn: "InventoryID", destinationType: "BIGINT", mapped: false, validation: 'warning', nullable: false, primaryKey: true, sampleData: ["INV001", "INV002", "INV003"] },
      { sourceColumn: "PRODUCT_ID", sourceType: "NUMBER(10)", destinationColumn: "ProductID", destinationType: "INT", mapped: false, validation: 'warning', nullable: false, foreignKey: "PRODUCTS.PRODUCT_ID", sampleData: ["P001", "P002", "P003"] },
      { sourceColumn: "WAREHOUSE_ID", sourceType: "NUMBER(5)", destinationColumn: "WarehouseID", destinationType: "INT", mapped: false, validation: 'warning', nullable: false, foreignKey: "WAREHOUSES.WAREHOUSE_ID", sampleData: ["WH01", "WH02", "WH03"] },
      { sourceColumn: "QUANTITY_ON_HAND", sourceType: "NUMBER(8)", destinationColumn: "QuantityOnHand", destinationType: "INT", mapped: false, validation: 'warning', nullable: false, sampleData: ["150", "75", "200"] },
      { sourceColumn: "REORDER_LEVEL", sourceType: "NUMBER(6)", destinationColumn: "ReorderLevel", destinationType: "INT", mapped: false, validation: 'warning', nullable: false, sampleData: ["25", "10", "50"] },
      { sourceColumn: "UNIT_COST", sourceType: "NUMBER(10,2)", destinationColumn: "UnitCost", destinationType: "DECIMAL(10,2)", mapped: false, validation: 'warning', nullable: true, sampleData: ["45.99", "12.50", "89.99"] },
      { sourceColumn: "LAST_STOCK_UPDATE", sourceType: "TIMESTAMP", destinationColumn: "LastStockUpdate", destinationType: "DATETIME2", mapped: false, validation: 'warning', nullable: true, sampleData: ["2024-01-15 10:30:00", "2024-01-15 11:15:00", "2024-01-15 09:45:00"] }
    ]
  },
  {
    sourceTable: "SHIPMENTS",
    destinationTable: "Shipments",
    configured: false,
    status: 'pending',
    rowCount: 12000000,
    category: "Logistics",
    description: "Shipment tracking and delivery information",
    lastUpdated: "2024-01-15",
    columns: [
      { sourceColumn: "SHIPMENT_ID", sourceType: "NUMBER(15)", destinationColumn: "ShipmentID", destinationType: "BIGINT", mapped: false, validation: 'warning', nullable: false, primaryKey: true, sampleData: ["SHP001", "SHP002", "SHP003"] },
      { sourceColumn: "ORDER_ID", sourceType: "NUMBER(12)", destinationColumn: "OrderID", destinationType: "BIGINT", mapped: false, validation: 'warning', nullable: false, foreignKey: "ORDERS.ORDER_ID", sampleData: ["1000000001", "1000000002", "1000000003"] },
      { sourceColumn: "CARRIER_CODE", sourceType: "VARCHAR2(10)", destinationColumn: "CarrierCode", destinationType: "NVARCHAR(10)", mapped: false, validation: 'warning', nullable: false, sampleData: ["FEDEX", "UPS", "DHL"] },
      { sourceColumn: "TRACKING_NUMBER", sourceType: "VARCHAR2(50)", destinationColumn: "TrackingNumber", destinationType: "NVARCHAR(50)", mapped: false, validation: 'warning', nullable: true, sampleData: ["123456789", "987654321", "456789123"] },
      { sourceColumn: "SHIP_DATE", sourceType: "DATE", destinationColumn: "ShipDate", destinationType: "DATETIME2", mapped: false, validation: 'warning', nullable: false, sampleData: ["2024-01-12", "2024-01-13", "2024-01-14"] },
      { sourceColumn: "ESTIMATED_DELIVERY", sourceType: "DATE", destinationColumn: "EstimatedDelivery", destinationType: "DATETIME2", mapped: false, validation: 'warning', nullable: true, sampleData: ["2024-01-15", "2024-01-16", "2024-01-17"] },
      { sourceColumn: "ACTUAL_DELIVERY", sourceType: "DATE", destinationColumn: "ActualDelivery", destinationType: "DATETIME2", mapped: false, validation: 'warning', nullable: true, sampleData: ["2024-01-15", "2024-01-16", "2024-01-18"] },
      { sourceColumn: "SHIPMENT_STATUS", sourceType: "VARCHAR2(20)", destinationColumn: "ShipmentStatus", destinationType: "NVARCHAR(20)", mapped: false, validation: 'warning', nullable: false, sampleData: ["IN_TRANSIT", "DELIVERED", "OUT_FOR_DELIVERY"] }
    ]
  },
  {
    sourceTable: "WAREHOUSES",
    destinationTable: "Warehouses",
    configured: false,
    status: 'pending',
    rowCount: 250,
    category: "Facility Management",
    description: "Warehouse locations, capacity, and zone information",
    lastUpdated: "2024-01-15",
    columns: [
      { sourceColumn: "WAREHOUSE_ID", sourceType: "NUMBER(5)", destinationColumn: "WarehouseID", destinationType: "INT", mapped: false, validation: 'warning', nullable: false, primaryKey: true, sampleData: ["WH01", "WH02", "WH03"] },
      { sourceColumn: "WAREHOUSE_NAME", sourceType: "VARCHAR2(100)", destinationColumn: "WarehouseName", destinationType: "NVARCHAR(100)", mapped: false, validation: 'warning', nullable: false, sampleData: ["Main Distribution Center", "West Coast Hub", "East Coast Hub"] },
      { sourceColumn: "LOCATION_ADDRESS", sourceType: "VARCHAR2(500)", destinationColumn: "LocationAddress", destinationType: "NVARCHAR(500)", mapped: false, validation: 'warning', nullable: true, sampleData: ["123 Logistics Blvd, NY 10001", "456 Pacific Way, CA 90210", "789 Atlantic Ave, FL 33101"] },
      { sourceColumn: "CAPACITY_SQFT", sourceType: "NUMBER(10)", destinationColumn: "CapacitySqFt", destinationType: "INT", mapped: false, validation: 'warning', nullable: true, sampleData: ["50000", "35000", "45000"] },
      { sourceColumn: "ZONE_COUNT", sourceType: "NUMBER(3)", destinationColumn: "ZoneCount", destinationType: "INT", mapped: false, validation: 'warning', nullable: false, sampleData: ["12", "8", "10"] },
      { sourceColumn: "CREATED_DATE", sourceType: "DATE", destinationColumn: "CreatedDate", destinationType: "DATETIME2", mapped: false, validation: 'warning', nullable: false, sampleData: ["2020-01-15", "2020-02-20", "2020-03-10"] }
    ]
  }
]

export default function MappingPreview() {
  const [tables, setTables] = useState<TableMapping[]>(sampleTables)
  const [selectedTable, setSelectedTable] = useState<string>("CUSTOMERS")
  const [expandedTable, setExpandedTable] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showSampleData, setShowSampleData] = useState(false)
  const [showTablePicker, setShowTablePicker] = useState(false)
  const [tableSearchTerm, setTableSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  
  // Store mapping configurations to remember them when tables are removed/re-added
  const [mappingMemory, setMappingMemory] = useState<Record<string, TableMapping>>({})

  // Pre-check state
  const [precheckState, setPrecheckState] = useState<'idle' | 'error' | 'warning' | 'success'>('idle')
  const [isPrechecking, setIsPrechecking] = useState(false)

  // Field-level validation state
  const [fieldValidationErrors, setFieldValidationErrors] = useState<Record<string, string[]>>({})
  const [fieldValidationWarnings, setFieldValidationWarnings] = useState<Record<string, string[]>>({})

  const toggleTableExpansion = (tableName: string) => {
    setExpandedTable(expandedTable === tableName ? null : tableName)
  }

  const toggleColumnMapping = (tableIndex: number, columnIndex: number) => {
    const newTables = [...tables]
    newTables[tableIndex].columns[columnIndex].mapped = !newTables[tableIndex].columns[columnIndex].mapped
    setTables(newTables)
    
    // Also update the mapping memory to persist changes
    const tableName = newTables[tableIndex].sourceTable
    setMappingMemory(prev => ({
      ...prev,
      [tableName]: newTables[tableIndex]
    }))
  }

  const updateColumnMapping = (tableIndex: number, columnIndex: number, field: keyof ColumnMapping, value: string) => {
    console.log(`Updating column mapping: tableIndex=${tableIndex}, columnIndex=${columnIndex}, field=${field}, value=${value}`)
    
    const newTables = [...tables]
    ;(newTables[tableIndex].columns[columnIndex] as any)[field] = value
    setTables(newTables)
    
    // Also update the mapping memory to persist changes
    const tableName = newTables[tableIndex].sourceTable
    setMappingMemory(prev => ({
      ...prev,
      [tableName]: newTables[tableIndex]
    }))
  }

  const performPrecheck = async () => {
    setIsPrechecking(true)
    
    // Simulate pre-check process
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Cycle through states: error → warning → success
    if (precheckState === 'idle' || precheckState === 'success') {
      setPrecheckState('error')
      // Generate field-level errors for error state
      generateFieldValidationErrors('error')
    } else if (precheckState === 'error') {
      setPrecheckState('warning')
      // Generate field-level warnings for warning state
      generateFieldValidationErrors('warning')
    } else if (precheckState === 'warning') {
      setPrecheckState('success')
      // Clear all field-level issues for success state
      setFieldValidationErrors({})
      setFieldValidationWarnings({})
    }
    
    setIsPrechecking(false)
  }

  const generateFieldValidationErrors = (type: 'error' | 'warning') => {
    if (type === 'error') {
      // Generate critical field-level errors
      const errors: Record<string, string[]> = {}
      
      // Add realistic validation errors
      tables.forEach(table => {
        const tableErrors: string[] = []
        
        table.columns.forEach(column => {
          // NOT NULL constraint violation for CREATED_DATE
          if (column.sourceColumn === 'CREATED_DATE' && column.nullable === false) {
            tableErrors.push(`Column ${column.sourceColumn} has NOT NULL constraint but source data contains NULL values`)
          }
          
          // Data type mismatch for specific columns
          if (column.sourceColumn === 'AMOUNT' && column.sourceType.includes('NUMBER') && column.destinationType.includes('DECIMAL')) {
            tableErrors.push(`Data type mismatch: ${column.sourceType} → ${column.destinationType} may cause precision loss`)
          }
          
          // Missing destination mapping
          if (!column.mapped) {
            tableErrors.push(`Column ${column.sourceColumn} is not mapped to destination`)
          }
          
          // Foreign key constraint issues
          if (column.foreignKey && !column.mapped) {
            tableErrors.push(`Foreign key column ${column.sourceColumn} must be mapped to maintain referential integrity`)
          }
          
          // Primary key issues
          if (column.primaryKey && !column.mapped) {
            tableErrors.push(`Primary key column ${column.sourceColumn} must be mapped to destination`)
          }
          
          // Data length issues
          if (column.sourceType.includes('VARCHAR(50)') && column.destinationType.includes('VARCHAR(30)')) {
            tableErrors.push(`Column ${column.sourceColumn} may truncate: ${column.sourceType} → ${column.destinationType}`)
          }
        })
        
        if (tableErrors.length > 0) {
          errors[table.sourceTable] = tableErrors
        }
      })
      
      setFieldValidationErrors(errors)
      setFieldValidationWarnings({})
    } else if (type === 'warning') {
      // Generate field-level warnings
      const warnings: Record<string, string[]> = {}
      
      tables.forEach(table => {
        const tableWarnings: string[] = []
        
        table.columns.forEach(column => {
          // Performance warnings
          if (column.sourceColumn === 'EMAIL' && !column.primaryKey) {
            tableWarnings.push(`Column ${column.sourceColumn} should have an index for optimal performance`)
          }
          
          // Data quality warnings
          if (column.sourceColumn === 'PHONE' && column.sourceType.includes('VARCHAR')) {
            tableWarnings.push(`Column ${column.sourceColumn} may benefit from data format validation`)
          }
          
          // Schema warnings
          if (column.sourceColumn === 'STATUS' && !column.mapped) {
            tableWarnings.push(`Column ${column.sourceColumn} is unmapped - consider if this data is needed`)
          }
          
          // Data type conversion warnings
          if (column.sourceType.includes('DATE') && column.destinationType.includes('DATETIME2')) {
            tableWarnings.push(`Date conversion: ${column.sourceType} → ${column.destinationType} may affect timezone handling`)
          }
          
          // Unmapped columns warnings
          if (!column.mapped && !column.primaryKey && !column.foreignKey) {
            tableWarnings.push(`Column ${column.sourceColumn} is unmapped - review if this data is required`)
          }
        })
        
        if (tableWarnings.length > 0) {
          warnings[table.sourceTable] = tableWarnings
        }
      })
      
      setFieldValidationWarnings(warnings)
      setFieldValidationErrors({})
    }
  }

  const getPrecheckStatus = () => {
    switch (precheckState) {
      case 'error':
        return {
          icon: '❌',
          text: 'Pre-check Failed',
          description: 'Critical issues detected. Please resolve before proceeding.',
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        }
      case 'warning':
        return {
          icon: '⚠️',
          text: 'Pre-check Completed with Warnings',
          description: 'Issues found but migration can proceed. Review recommended.',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200'
        }
      case 'success':
        return {
          icon: '✅',
          text: 'Pre-check Passed',
          description: 'All validation checks passed successfully!',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        }
      default:
        return null
    }
  }

  const getColumnValidationState = (tableName: string, columnName: string) => {
    const tableErrors = fieldValidationErrors[tableName] || []
    const tableWarnings = fieldValidationWarnings[tableName] || []
    
    const hasError = tableErrors.some(error => error.includes(columnName))
    const hasWarning = tableWarnings.some(warning => warning.includes(columnName))
    
    if (hasError) return 'error'
    if (hasWarning) return 'warning'
    return 'valid'
  }

  const getColumnValidationMessage = (tableName: string, columnName: string) => {
    const tableErrors = fieldValidationErrors[tableName] || []
    const tableWarnings = fieldValidationWarnings[tableName] || []
    
    const error = tableErrors.find(error => error.includes(columnName))
    const warning = tableWarnings.find(warning => warning.includes(columnName))
    
    return error || warning || null
  }

  const loadTable = (tableName: string) => {
    // Mock loading a new table
    const tableToLoad = availableTables.find(t => t.name === tableName)
    if (tableToLoad && !tables.find(t => t.sourceTable === tableName)) {
      
      // Check if we have saved mapping configuration for this table
      const savedMapping = mappingMemory[tableName]
      
      let newTable: TableMapping
      
      if (savedMapping) {
        // Restore the saved mapping configuration
        newTable = {
          ...savedMapping,
          rowCount: tableToLoad.rowCount,
          category: tableToLoad.category,
          description: tableToLoad.description,
          lastUpdated: tableToLoad.lastUpdated
        }
        console.log(`Restored mapping configuration for ${tableName}`)
      } else {
        // Generate table-specific columns based on the actual table structure
        let tableColumns: ColumnMapping[] = []
        
        switch (tableName) {
          case "CUSTOMERS":
            tableColumns = [
              { sourceColumn: "CUSTOMER_ID", sourceType: "NUMBER(10)", destinationColumn: "CustomerID", destinationType: "INT", mapped: false, validation: 'warning', nullable: false, primaryKey: true, sampleData: ["100001", "100002", "100003"] },
              { sourceColumn: "CUSTOMER_NAME", sourceType: "VARCHAR2(100)", destinationColumn: "CustomerName", destinationType: "NVARCHAR(100)", mapped: false, validation: 'warning', nullable: false, sampleData: ["Acme Corp", "Global Industries", "Tech Solutions"] },
              { sourceColumn: "EMAIL_ADDRESS", sourceType: "VARCHAR2(150)", destinationColumn: "EmailAddress", destinationType: "NVARCHAR(150)", mapped: false, validation: 'warning', nullable: true, sampleData: ["contact@acme.com", "info@global.com", "hello@tech.com"] },
              { sourceColumn: "PHONE_NUMBER", sourceType: "VARCHAR2(20)", destinationColumn: "PhoneNumber", destinationType: "NVARCHAR(20)", mapped: false, validation: 'warning', nullable: true, sampleData: ["+1-555-0101", "+1-555-0102", "+1-555-0103"] },
              { sourceColumn: "ADDRESS_LINE1", sourceType: "VARCHAR2(200)", destinationColumn: "AddressLine1", destinationType: "NVARCHAR(200)", mapped: false, validation: 'warning', nullable: true, sampleData: ["123 Main St", "456 Business Ave", "789 Tech Blvd"] },
              { sourceColumn: "CITY", sourceType: "VARCHAR2(50)", destinationColumn: "City", destinationType: "NVARCHAR(50)", mapped: false, validation: 'warning', nullable: true, sampleData: ["New York", "Los Angeles", "Chicago"] },
              { sourceColumn: "POSTAL_CODE", sourceType: "VARCHAR2(10)", destinationColumn: "PostalCode", destinationType: "NVARCHAR(10)", mapped: false, validation: 'warning', nullable: true, sampleData: ["10001", "90210", "60601"] },
              { sourceColumn: "COUNTRY", sourceType: "VARCHAR2(50)", destinationColumn: "Country", destinationType: "NVARCHAR(50)", mapped: false, validation: 'warning', nullable: true, sampleData: ["USA", "USA", "USA"] },
              { sourceColumn: "CREATED_DATE", sourceType: "DATE", destinationColumn: "CreatedDate", destinationType: "DATETIME2", mapped: false, validation: 'warning', nullable: false, sampleData: ["2020-01-15", "2020-02-20", "2020-03-10"] },
              { sourceColumn: "LAST_UPDATED", sourceType: "TIMESTAMP", destinationColumn: "LastUpdated", destinationType: "DATETIME2", mapped: false, validation: 'warning', nullable: true, sampleData: ["2024-01-15", "2024-01-15", "2024-01-15"] }
            ]
            break
          case "ORDERS":
            tableColumns = [
              { sourceColumn: "ORDER_ID", sourceType: "NUMBER(12)", destinationColumn: "OrderID", destinationType: "BIGINT", mapped: false, validation: 'warning', nullable: false, primaryKey: true, sampleData: ["1000000001", "1000000002", "1000000003"] },
              { sourceColumn: "CUSTOMER_ID", sourceType: "NUMBER(10)", destinationColumn: "CustomerID", destinationType: "INT", mapped: false, validation: 'warning', nullable: false, foreignKey: "CUSTOMERS.CUSTOMER_ID", sampleData: ["100001", "100002", "100003"] },
              { sourceColumn: "ORDER_DATE", sourceType: "DATE", destinationColumn: "OrderDate", destinationType: "DATETIME2", mapped: false, validation: 'warning', nullable: false, sampleData: ["2024-01-10", "2024-01-11", "2024-01-12"] },
              { sourceColumn: "TOTAL_AMOUNT", sourceType: "NUMBER(12,2)", destinationColumn: "TotalAmount", destinationType: "DECIMAL(12,2)", mapped: false, validation: 'error', nullable: true, sampleData: ["1250.99", "875.50", "2100.00"] },
              { sourceColumn: "ORDER_STATUS", sourceType: "VARCHAR2(20)", destinationColumn: "OrderStatus", destinationType: "NVARCHAR(20)", mapped: false, validation: 'warning', nullable: false, sampleData: ["PENDING", "CONFIRMED", "SHIPPED"] },
              { sourceColumn: "SHIPPING_METHOD", sourceType: "VARCHAR2(50)", destinationColumn: "ShippingMethod", destinationType: "NVARCHAR(50)", mapped: false, validation: 'warning', nullable: true, sampleData: ["STANDARD", "EXPRESS", "OVERNIGHT"] },
              { sourceColumn: "SHIPPING_ADDRESS", sourceType: "VARCHAR2(500)", destinationColumn: "ShippingAddress", destinationType: "NVARCHAR(500)", mapped: false, validation: 'warning', nullable: true, sampleData: ["123 Main St, NY 10001", "456 Business Ave, LA 90210", "789 Tech Blvd, CH 60601"] }
            ]
            break
          case "WAREHOUSES":
            tableColumns = [
              { sourceColumn: "WAREHOUSE_ID", sourceType: "NUMBER(5)", destinationColumn: "WarehouseID", destinationType: "INT", mapped: false, validation: 'warning', nullable: false, primaryKey: true, sampleData: ["WH01", "WH02", "WH03"] },
              { sourceColumn: "WAREHOUSE_NAME", sourceType: "VARCHAR2(100)", destinationColumn: "WarehouseName", destinationType: "NVARCHAR(100)", mapped: false, validation: 'warning', nullable: false, sampleData: ["Main Distribution Center", "West Coast Hub", "East Coast Hub"] },
              { sourceColumn: "LOCATION_ADDRESS", sourceType: "VARCHAR2(500)", destinationColumn: "LocationAddress", destinationType: "NVARCHAR(500)", mapped: false, validation: 'warning', nullable: true, sampleData: ["123 Logistics Blvd, NY 10001", "456 Pacific Way, CA 90210", "789 Atlantic Ave, FL 33101"] },
              { sourceColumn: "CAPACITY_SQFT", sourceType: "NUMBER(10)", destinationColumn: "CapacitySqFt", destinationType: "INT", mapped: false, validation: 'warning', nullable: true, sampleData: ["50000", "35000", "45000"] },
              { sourceColumn: "ZONE_COUNT", sourceType: "NUMBER(3)", destinationColumn: "ZoneCount", destinationType: "INT", mapped: false, validation: 'warning', nullable: false, sampleData: ["12", "8", "10"] },
              { sourceColumn: "CREATED_DATE", sourceType: "DATE", destinationColumn: "CreatedDate", destinationType: "DATETIME2", mapped: false, validation: 'warning', nullable: false, sampleData: ["2020-01-15", "2020-02-20", "2020-03-10"] }
            ]
            break
          case "INVENTORY":
            tableColumns = [
              { sourceColumn: "INVENTORY_ID", sourceType: "NUMBER(12)", destinationColumn: "InventoryID", destinationType: "BIGINT", mapped: false, validation: 'warning', nullable: false, primaryKey: true, sampleData: ["INV001", "INV002", "INV003"] },
              { sourceColumn: "PRODUCT_ID", sourceType: "NUMBER(10)", destinationColumn: "ProductID", destinationType: "INT", mapped: false, validation: 'warning', nullable: false, foreignKey: "PRODUCTS.PRODUCT_ID", sampleData: ["P001", "P002", "P003"] },
              { sourceColumn: "WAREHOUSE_ID", sourceType: "NUMBER(5)", destinationColumn: "WarehouseID", destinationType: "INT", mapped: false, validation: 'warning', nullable: false, foreignKey: "WAREHOUSES.WAREHOUSE_ID", sampleData: ["WH01", "WH02", "WH03"] },
              { sourceColumn: "QUANTITY_ON_HAND", sourceType: "NUMBER(8)", destinationColumn: "QuantityOnHand", destinationType: "INT", mapped: false, validation: 'warning', nullable: false, sampleData: ["150", "75", "200"] },
              { sourceColumn: "REORDER_LEVEL", sourceType: "NUMBER(6)", destinationColumn: "ReorderLevel", destinationType: "INT", mapped: false, validation: 'warning', nullable: false, sampleData: ["25", "10", "50"] },
              { sourceColumn: "UNIT_COST", sourceType: "NUMBER(10,2)", destinationColumn: "UnitCost", destinationType: "DECIMAL(10,2)", mapped: false, validation: 'warning', nullable: true, sampleData: ["45.99", "12.50", "89.99"] },
              { sourceColumn: "LAST_STOCK_UPDATE", sourceType: "TIMESTAMP", destinationColumn: "LastStockUpdate", destinationType: "DATETIME2", mapped: false, validation: 'warning', nullable: true, sampleData: ["2024-01-15 10:30:00", "2024-01-15 11:15:00", "2024-01-15 09:45:00"] }
            ]
            break
          case "SHIPMENTS":
            tableColumns = [
              { sourceColumn: "SHIPMENT_ID", sourceType: "NUMBER(15)", destinationColumn: "ShipmentID", destinationType: "BIGINT", mapped: false, validation: 'warning', nullable: false, primaryKey: true, sampleData: ["SHP001", "SHP002", "SHP003"] },
              { sourceColumn: "ORDER_ID", sourceType: "NUMBER(12)", destinationColumn: "OrderID", destinationType: "BIGINT", mapped: false, validation: 'warning', nullable: false, foreignKey: "ORDERS.ORDER_ID", sampleData: ["1000000001", "1000000002", "1000000003"] },
              { sourceColumn: "CARRIER_CODE", sourceType: "VARCHAR2(10)", destinationColumn: "CarrierCode", destinationType: "NVARCHAR(10)", mapped: false, validation: 'warning', nullable: false, sampleData: ["FEDEX", "UPS", "DHL"] },
              { sourceColumn: "TRACKING_NUMBER", sourceType: "VARCHAR2(50)", destinationColumn: "TrackingNumber", destinationType: "NVARCHAR(50)", mapped: false, validation: 'warning', nullable: true, sampleData: ["123456789", "987654321", "456789123"] },
              { sourceColumn: "SHIP_DATE", sourceType: "DATE", destinationColumn: "ShipDate", destinationType: "DATETIME2", mapped: false, validation: 'warning', nullable: false, sampleData: ["2024-01-12", "2024-01-13", "2024-01-14"] },
              { sourceColumn: "ESTIMATED_DELIVERY", sourceType: "DATE", destinationColumn: "EstimatedDelivery", destinationType: "DATETIME2", mapped: false, validation: 'warning', nullable: true, sampleData: ["2024-01-15", "2024-01-16", "2024-01-17"] },
              { sourceColumn: "ACTUAL_DELIVERY", sourceType: "DATE", destinationColumn: "ActualDelivery", destinationType: "DATETIME2", mapped: false, validation: 'warning', nullable: true, sampleData: ["2024-01-15", "2024-01-16", "2024-01-18"] },
              { sourceColumn: "SHIPMENT_STATUS", sourceType: "VARCHAR2(20)", destinationColumn: "ShipmentStatus", destinationType: "NVARCHAR(20)", mapped: false, validation: 'warning', nullable: false, sampleData: ["IN_TRANSIT", "DELIVERED", "OUT_FOR_DELIVERY"] }
            ]
            break
          default:
            // Fallback to generic columns for any other table
            tableColumns = [
              { sourceColumn: "ID", sourceType: "NUMBER(10)", destinationColumn: "ID", destinationType: "INT", mapped: false, validation: 'warning', nullable: false, primaryKey: true, sampleData: ["1", "2", "3"] },
              { sourceColumn: "NAME", sourceType: "VARCHAR2(100)", destinationColumn: "Name", destinationType: "NVARCHAR(100)", mapped: false, validation: 'warning', nullable: false, sampleData: ["Sample 1", "Sample 2", "Sample 3"] },
              { sourceColumn: "DESCRIPTION", sourceType: "VARCHAR2(500)", destinationColumn: "Description", destinationType: "NVARCHAR(500)", mapped: false, validation: 'warning', nullable: true, sampleData: ["Description 1", "Description 2", "Description 3"] },
              { sourceColumn: "CREATED_DATE", sourceType: "DATE", destinationColumn: "CreatedDate", destinationType: "DATETIME2", mapped: false, validation: 'warning', nullable: false, sampleData: ["2024-01-01", "2024-01-02", "2024-01-03"] }
            ]
        }

        newTable = {
          sourceTable: tableToLoad.name,
          destinationTable: tableToLoad.name.charAt(0) + tableToLoad.name.slice(1).toLowerCase(),
          configured: false,
          status: 'pending',
          rowCount: tableToLoad.rowCount,
          category: tableToLoad.category,
          description: tableToLoad.description,
          lastUpdated: tableToLoad.lastUpdated,
          columns: tableColumns
        }
        console.log(`Created new mapping configuration for ${tableName} with ${tableColumns.length} columns`)
      }

      setTables([...tables, newTable])
      setSelectedTable(tableToLoad.name)
      setShowTablePicker(false)
    }
  }

  const removeTable = (tableName: string) => {
    // Save the current mapping configuration before removing
    const tableToRemove = tables.find(t => t.sourceTable === tableName)
    if (tableToRemove) {
      setMappingMemory(prev => ({
        ...prev,
        [tableName]: tableToRemove
      }))
    }
    
    const newTables = tables.filter(t => t.sourceTable !== tableName)
    setTables(newTables)
    
    // If we removed the currently selected table, select the first available one
    if (selectedTable === tableName && newTables.length > 0) {
      setSelectedTable(newTables[0].sourceTable)
    } else if (newTables.length === 0) {
      setSelectedTable("")
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'validated': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'mapped': return <CheckCircle className="h-4 w-4 text-blue-500" />
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />
      default: return <XCircle className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'validated': return 'bg-green-100 text-green-800 border-green-200'
      case 'mapped': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'error': return 'bg-red-100 text-red-800 border-red-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getValidationIcon = (validation?: string) => {
    switch (validation) {
      case 'valid': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'warning': return <XCircle className="h-4 w-4 text-yellow-500" />
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />
      default: return <XCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Customer Data': return <Users className="h-4 w-4" />
      case 'Order Management': return <Package className="h-4 w-4" />
      case 'Logistics': return <Truck className="h-4 w-4" />
      case 'Warehouse Management': return <Building2 className="h-4 w-4" />
      case 'Vendor Management': return <Users className="h-4 w-4" />
      case 'Facility Management': return <Building2 className="h-4 w-4" />
      case 'Product Catalog': return <Package className="h-4 w-4" />
      case 'Returns Processing': return <FileText className="h-4 w-4" />
      case 'Transportation': return <Truck className="h-4 w-4" />
      default: return <Table className="h-4 w-4" />
    }
  }

  const filteredTables = tables.filter(table => {
    const matchesSearch = table.sourceTable.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         table.destinationTable.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || table.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const filteredAvailableTables = availableTables.filter(table => {
    const matchesSearch = table.name.toLowerCase().includes(tableSearchTerm.toLowerCase()) ||
                         table.description.toLowerCase().includes(tableSearchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || table.category === selectedCategory
    const notAlreadyLoaded = !tables.find(t => t.sourceTable === table.name)
    return matchesSearch && matchesCategory && notAlreadyLoaded
  })

  const selectedTableData = tables.find(t => t.sourceTable === selectedTable)
  const mappedColumnsCount = selectedTableData?.columns.filter(col => col.mapped).length || 0
  const totalColumnsCount = selectedTableData?.columns.length || 0

  const categories = [...new Set(availableTables.map(t => t.category))]

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Database Migration Mapping</h2>
        <p className="text-muted-foreground text-lg">
          Step 3: Configure table and column mappings from Oracle to SQL Server
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tables..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
        <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
          <SelectTrigger className="w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tables</SelectItem>
            <SelectItem value="pending">Need Setup</SelectItem>
            <SelectItem value="mapped">Ready</SelectItem>
            <SelectItem value="validated">Complete</SelectItem>
            <SelectItem value="error">Issues</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Mapping Interface - Wireframe Layout */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Mapping Configuration</CardTitle>
              <p className="text-muted-foreground">Configure table and column mappings between source and destination</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => setShowSampleData(!showSampleData)}
              className="flex items-center gap-2"
            >
              {showSampleData ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showSampleData ? "Hide Sample Data" : "Show Sample Data"}
            </Button>
          </div>
        </CardHeader>
          <CardContent>
            {/* Wireframe Layout: Left (Source) | Middle (Mapping) | Right (Destination) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Side - Source DB (Oracle) */}
              <div className="space-y-3">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 shadow-sm">
                  <div className="text-center mb-3">
                    <Database className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="font-bold text-blue-900">Source Database</div>
                    <div className="text-sm text-blue-600">Oracle</div>
                  </div>
                  
                  {/* Source Tables */}
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-blue-700 mb-2">Tables:</div>
                    {filteredTables.map((table) => (
                      <div 
                        key={table.sourceTable}
                        className={cn(
                          "flex items-center gap-2 cursor-pointer rounded p-2 text-xs transition-colors min-h-[3rem]",
                          selectedTable === table.sourceTable ? "bg-blue-100 shadow-sm border border-blue-300" : "bg-blue-50/80 hover:bg-blue-100",
                          table.configured && "ring-2 ring-blue-400 ring-opacity-50"
                        )}
                        onClick={() => setSelectedTable(table.sourceTable)}
                      >
                        <Checkbox 
                          checked={table.configured}
                          onCheckedChange={(checked) => {
                            const newTables = [...tables]
                            const tableIndex = newTables.findIndex(t => t.sourceTable === table.sourceTable)
                            if (tableIndex !== -1) {
                              newTables[tableIndex].configured = checked as boolean
                              setTables(newTables)
                            }
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="h-4 w-4 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:text-white data-[state=unchecked]:bg-white data-[state=unchecked]:border-blue-300 data-[state=unchecked]:hover:border-blue-400 data-[state=unchecked]:hover:bg-blue-50 transition-all duration-200 shadow-sm"
                        />
                        <div className="flex-1 flex flex-col justify-center">
                          <div className="font-medium text-blue-900">{table.sourceTable}</div>
                          <div className="text-blue-600">
                            {table.configured ? 'Configured' : 'Not Configured'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Middle - Mapping Arrows */}
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="text-center">
                  <ArrowLeftRight className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-sm font-medium text-blue-700">Data Flow</div>
                </div>
                
                {/* Column Mapping Status */}
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{mappedColumnsCount}</div>
                  <div className="text-sm text-muted-foreground">Columns Mapped</div>
                </div>

                {/* Load Table Button - Moved here from Loaded Tables section */}
                <div className="pt-4">
                  <Button 
                    onClick={() => setShowTablePicker(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                  >
                    <FolderOpen className="h-4 w-4" />
                    Load Table
                  </Button>
                </div>
              </div>

              {/* Right Side - Destination DB (SQL Server) */}
              <div className="space-y-3">
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 shadow-sm">
                  <div className="text-center mb-3">
                    <Database className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <div className="font-bold text-green-900">Destination Database</div>
                    <div className="text-sm text-green-600">SQL Server</div>
                  </div>
                  
                  {/* Destination Tables */}
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-green-700 mb-2">Tables:</div>
                    {filteredTables.map((table) => (
                      <div 
                        key={table.destinationTable}
                        className={cn(
                          "cursor-pointer rounded p-2 text-xs transition-colors min-h-[3rem] flex flex-col justify-center",
                          selectedTable === table.sourceTable ? "bg-green-100 shadow-sm border border-green-300" : "bg-green-50/80 hover:bg-green-100"
                        )}
                        onClick={() => setSelectedTable(table.sourceTable)}
                      >
                        <div className="font-medium text-green-900">
                          {table.configured ? table.destinationTable : ''}
                        </div>
                        <div className="text-green-600">
                          {table.configured ? 'Configured' : 'Not Configured'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
      </div>

            {/* Column Mapping Details */}
            {selectedTableData && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Column Mapping: {selectedTableData.sourceTable}</h3>
                <div className="space-y-3">
                  {selectedTableData.columns.map((column, colIndex) => {
                    const tableIndex = tables.findIndex(t => t.sourceTable === selectedTable)
                    const validationState = getColumnValidationState(selectedTableData.sourceTable, column.sourceColumn)
                    const validationMessage = getColumnValidationMessage(selectedTableData.sourceTable, column.sourceColumn)
                    
                    return (
                      <div key={column.sourceColumn} className={`grid grid-cols-1 lg:grid-cols-3 gap-4 items-center p-3 rounded-lg border transition-all duration-200 ${
                        validationState === 'error' 
                          ? 'bg-red-50 border-red-200 hover:bg-red-100' 
                          : validationState === 'warning'
                          ? 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
                          : 'hover:bg-muted/20'
                      }`}>
                        
                        {/* Source Column */}
                        <div className="flex items-center gap-3">
                          <Checkbox 
                            checked={column.mapped}
                            onCheckedChange={() => toggleColumnMapping(tableIndex, colIndex)}
                          />
                          <div className="flex-1">
                            <div className="font-medium">{column.sourceColumn}</div>
                            <div className="text-sm text-muted-foreground">({column.sourceType})</div>
                            <div className="flex items-center gap-2 mt-1">
                              {column.primaryKey && <Badge variant="secondary" className="text-xs">PK</Badge>}
                              {column.foreignKey && <Badge variant="outline" className="text-xs">FK</Badge>}
                              {!column.nullable && <Badge variant="destructive" className="text-xs">NOT NULL</Badge>}
                            </div>
                            {showSampleData && column.sampleData && (
                              <div className="text-xs text-blue-600 mt-1">
                                Sample: {column.sampleData.slice(0, 3).join(', ')}
                              </div>
                            )}
                            
                            {/* Field-level validation message */}
                            {validationMessage && (
                              <div className={`mt-2 text-xs px-2 py-1 rounded ${
                                validationState === 'error'
                                  ? 'text-red-700 bg-red-100 border border-red-200'
                                  : 'text-yellow-700 bg-yellow-100 border border-yellow-200'
                              }`}>
                                {validationMessage}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Mapping Arrow */}
                        <div className="flex justify-center">
                          <ArrowLeftRight className="h-5 w-5 text-blue-500" />
                        </div>
                      
                        {/* Destination Column */}
                        <div>
                          <Select 
                            value={column.destinationColumn}
                            onValueChange={(value) => updateColumnMapping(tableIndex, colIndex, 'destinationColumn', value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={column.sourceColumn}>{column.sourceColumn}</SelectItem>
                              <SelectItem value={`${column.sourceColumn}_New`}>{column.sourceColumn}_New</SelectItem>
                              <SelectItem value={`${column.sourceColumn}_Mapped`}>{column.sourceColumn}_Mapped</SelectItem>
                              <SelectItem value={`${column.sourceColumn}_ID`}>{column.sourceColumn}_ID</SelectItem>
                              <SelectItem value={`${column.sourceColumn}_Name`}>{column.sourceColumn}_Name</SelectItem>
                              <SelectItem value={`${column.sourceColumn}_Description`}>{column.sourceColumn}_Description</SelectItem>
                              <SelectItem value={`${column.sourceColumn}_Date`}>{column.sourceColumn}_Date</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="mt-1 text-sm text-muted-foreground">
                            Type: {column.destinationType}
                          </div>
                          <div className="mt-1">
                            {validationState === 'error' ? (
                              <XCircle className="h-4 w-4 text-red-600" />
                            ) : validationState === 'warning' ? (
                              <AlertTriangle className="h-4 w-4 text-yellow-600" />
                            ) : (
                              getValidationIcon(column.validation)
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Pre-check Status Display */}
            {precheckState !== 'idle' && (
              <div className={`mt-6 p-4 rounded-lg border-2 ${getPrecheckStatus()?.borderColor} ${getPrecheckStatus()?.bgColor}`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getPrecheckStatus()?.icon}</span>
                  <div>
                    <h4 className={`font-semibold ${getPrecheckStatus()?.color}`}>
                      {getPrecheckStatus()?.text}
                    </h4>
                    <p className="text-sm text-gray-700">
                      {getPrecheckStatus()?.description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons - Pre-check Only */}
            <div className="flex items-center justify-center mt-8 pt-6 border-t">
              <Button 
                size="lg" 
                onClick={performPrecheck}
                disabled={isPrechecking}
                variant="outline"
              >
                {isPrechecking ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Running Pre-check...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Perform Pre-check
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

      {/* Table Picker Modal */}
      {showTablePicker && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Load Table from Oracle Database</h2>
              <Button variant="outline" onClick={() => setShowTablePicker(false)}>✕</Button>
            </div>
            
            {/* Search and Filter */}
            <div className="flex gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tables..."
                  value={tableSearchTerm}
                  onChange={(e) => setTableSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={(value: any) => setSelectedCategory(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Table List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAvailableTables.map((table) => {
                const IconComponent = table.icon
                return (
                  <div 
                    key={table.name}
                    className="border rounded-lg p-4 hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer bg-white hover:bg-blue-50/30"
                    onClick={() => loadTable(table.name)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-lg">{table.name}</div>
                        <div className="text-sm text-muted-foreground mb-2">{table.description}</div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>📊 {table.rowCount?.toLocaleString()} rows</span>
                          <span>🏷️ {table.category}</span>
                          <span>🕒 {table.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {filteredAvailableTables.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No tables found matching your criteria
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
