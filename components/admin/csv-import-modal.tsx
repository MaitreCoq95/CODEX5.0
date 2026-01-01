"use client"

import { useState, useRef, useCallback } from "react"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Upload, 
  FileSpreadsheet, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Download,
  X
} from "lucide-react"

interface CSVRow {
  email: string
  name: string
  role?: string
  department?: string
  [key: string]: string | undefined
}

interface ImportResult {
  success: number
  failed: number
  errors: { row: number; email: string; error: string }[]
}

interface CSVImportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onImport: (data: CSVRow[]) => Promise<ImportResult>
  templateColumns?: string[]
  entityName?: string
}

export function CSVImportModal({
  open,
  onOpenChange,
  onImport,
  templateColumns = ["email", "name", "role", "department"],
  entityName = "utilisateurs"
}: CSVImportModalProps) {
  const [step, setStep] = useState<"upload" | "preview" | "importing" | "complete">("upload")
  const [file, setFile] = useState<File | null>(null)
  const [parsedData, setParsedData] = useState<CSVRow[]>([])
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [importProgress, setImportProgress] = useState(0)
  const [importResult, setImportResult] = useState<ImportResult | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const resetState = () => {
    setStep("upload")
    setFile(null)
    setParsedData([])
    setValidationErrors([])
    setImportProgress(0)
    setImportResult(null)
  }

  const parseCSV = (text: string): CSVRow[] => {
    const lines = text.split("\n").filter(line => line.trim())
    if (lines.length < 2) return []

    const headers = lines[0].split(",").map(h => h.trim().toLowerCase())
    const rows: CSVRow[] = []

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map(v => v.trim())
      const row: CSVRow = { email: "", name: "" }
      
      headers.forEach((header, index) => {
        row[header] = values[index] || ""
      })

      if (row.email && row.name) {
        rows.push(row)
      }
    }

    return rows
  }

  const validateData = (data: CSVRow[]): string[] => {
    const errors: string[] = []
    const emails = new Set<string>()

    data.forEach((row, index) => {
      // Check required fields
      if (!row.email) {
        errors.push(`Ligne ${index + 2}: Email manquant`)
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
        errors.push(`Ligne ${index + 2}: Email invalide (${row.email})`)
      } else if (emails.has(row.email)) {
        errors.push(`Ligne ${index + 2}: Email dupliqué (${row.email})`)
      } else {
        emails.add(row.email)
      }

      if (!row.name) {
        errors.push(`Ligne ${index + 2}: Nom manquant`)
      }

      // Check role if present
      if (row.role && !["user", "manager", "admin"].includes(row.role.toLowerCase())) {
        errors.push(`Ligne ${index + 2}: Rôle invalide (${row.role})`)
      }
    })

    return errors
  }

  const handleFileSelect = useCallback((selectedFile: File) => {
    if (!selectedFile.name.endsWith(".csv")) {
      setValidationErrors(["Le fichier doit être au format CSV"])
      return
    }

    setFile(selectedFile)
    const reader = new FileReader()
    
    reader.onload = (e) => {
      const text = e.target?.result as string
      const data = parseCSV(text)
      
      if (data.length === 0) {
        setValidationErrors(["Aucune donnée valide trouvée dans le fichier"])
        return
      }

      const errors = validateData(data)
      setParsedData(data)
      setValidationErrors(errors)
      setStep("preview")
    }

    reader.readAsText(selectedFile)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      handleFileSelect(droppedFile)
    }
  }, [handleFileSelect])

  const handleImport = async () => {
    setStep("importing")
    setImportProgress(0)

    // Simulate progress
    const interval = setInterval(() => {
      setImportProgress(prev => Math.min(prev + 10, 90))
    }, 200)

    try {
      const result = await onImport(parsedData)
      clearInterval(interval)
      setImportProgress(100)
      setImportResult(result)
      setStep("complete")
    } catch (error) {
      clearInterval(interval)
      setImportResult({
        success: 0,
        failed: parsedData.length,
        errors: [{ row: 0, email: "", error: "Erreur d'importation" }]
      })
      setStep("complete")
    }
  }

  const downloadTemplate = () => {
    const headers = templateColumns.join(",")
    const example = templateColumns.map(col => {
      switch (col) {
        case "email": return "jean.dupont@company.fr"
        case "name": return "Jean Dupont"
        case "role": return "user"
        case "department": return "Logistique"
        default: return ""
      }
    }).join(",")
    
    const csv = `${headers}\n${example}`
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `template_${entityName}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) resetState()
      onOpenChange(open)
    }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-vyxo-gold" />
            Import CSV - {entityName}
          </DialogTitle>
          <DialogDescription>
            {step === "upload" && "Importez plusieurs utilisateurs depuis un fichier CSV"}
            {step === "preview" && `${parsedData.length} utilisateurs prêts à importer`}
            {step === "importing" && "Importation en cours..."}
            {step === "complete" && "Importation terminée"}
          </DialogDescription>
        </DialogHeader>

        {/* Upload Step */}
        {step === "upload" && (
          <div className="space-y-4">
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`
                border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
                ${isDragging 
                  ? "border-vyxo-gold bg-vyxo-gold/10" 
                  : "border-slate-700 hover:border-slate-500"
                }
              `}
            >
              <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
              <p className="font-medium">Glissez votre fichier CSV ici</p>
              <p className="text-sm text-muted-foreground mt-1">
                ou cliquez pour sélectionner
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
              <span className="text-sm text-muted-foreground">
                Pas de fichier ? Téléchargez le modèle
              </span>
              <Button variant="outline" size="sm" onClick={downloadTemplate}>
                <Download className="w-4 h-4 mr-2" />
                Modèle CSV
              </Button>
            </div>
          </div>
        )}

        {/* Preview Step */}
        {step === "preview" && (
          <div className="space-y-4">
            {/* File info */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-vyxo-gold" />
                <span className="font-medium">{file?.name}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={resetState}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Validation errors */}
            {validationErrors.length > 0 && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <div className="flex items-center gap-2 text-red-400 mb-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-medium">{validationErrors.length} erreur(s)</span>
                </div>
                <ul className="text-sm space-y-1 max-h-32 overflow-auto">
                  {validationErrors.slice(0, 5).map((error, i) => (
                    <li key={i} className="text-red-300">{error}</li>
                  ))}
                  {validationErrors.length > 5 && (
                    <li className="text-red-400">...et {validationErrors.length - 5} autres</li>
                  )}
                </ul>
              </div>
            )}

            {/* Preview table */}
            <div className="border rounded-lg overflow-hidden max-h-48 overflow-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="text-left p-2 font-medium">Email</th>
                    <th className="text-left p-2 font-medium">Nom</th>
                    <th className="text-left p-2 font-medium">Rôle</th>
                    <th className="text-left p-2 font-medium">Département</th>
                  </tr>
                </thead>
                <tbody>
                  {parsedData.slice(0, 5).map((row, i) => (
                    <tr key={i} className="border-t border-slate-800">
                      <td className="p-2">{row.email}</td>
                      <td className="p-2">{row.name}</td>
                      <td className="p-2">
                        <Badge variant="outline" className="text-xs">
                          {row.role || "user"}
                        </Badge>
                      </td>
                      <td className="p-2 text-muted-foreground">{row.department || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {parsedData.length > 5 && (
              <p className="text-sm text-center text-muted-foreground">
                ...et {parsedData.length - 5} autres
              </p>
            )}
          </div>
        )}

        {/* Importing Step */}
        {step === "importing" && (
          <div className="py-8 text-center">
            <Progress value={importProgress} className="h-2 mb-4" />
            <p className="text-muted-foreground">
              Importation de {parsedData.length} {entityName}...
            </p>
          </div>
        )}

        {/* Complete Step */}
        {step === "complete" && importResult && (
          <div className="space-y-4 py-4">
            {importResult.success > 0 && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                <div>
                  <p className="font-medium text-emerald-400">
                    {importResult.success} {entityName} importés avec succès
                  </p>
                </div>
              </div>
            )}
            
            {importResult.failed > 0 && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <div className="flex items-center gap-2 text-red-400 mb-2">
                  <XCircle className="w-5 h-5" />
                  <span className="font-medium">{importResult.failed} échecs</span>
                </div>
                <ul className="text-sm space-y-1">
                  {importResult.errors.slice(0, 3).map((err, i) => (
                    <li key={i} className="text-red-300">
                      {err.email ? `${err.email}: ` : ""}{err.error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          {step === "preview" && (
            <>
              <Button variant="outline" onClick={resetState}>
                Annuler
              </Button>
              <Button
                onClick={handleImport}
                disabled={validationErrors.length > 0}
                className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy"
              >
                Importer {parsedData.length} {entityName}
              </Button>
            </>
          )}
          
          {step === "complete" && (
            <Button onClick={() => onOpenChange(false)}>
              Fermer
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CSVImportModal
