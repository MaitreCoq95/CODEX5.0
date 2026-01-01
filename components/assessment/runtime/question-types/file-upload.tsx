"use client"

import { useState, useRef } from "react"
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FileUploadProps {
  value: string | null  // URL or filename
  onChange: (value: string | null) => void
  acceptedTypes?: string[]
  maxSize?: number  // MB
  disabled?: boolean
}

export function FileUpload({ 
  value, 
  onChange, 
  acceptedTypes = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".jpg", ".png"],
  maxSize = 10,
  disabled 
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleFile = async (file: File) => {
    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setErrorMessage(`Le fichier dépasse la taille maximale de ${maxSize}MB`)
      setUploadStatus("error")
      return
    }

    // Validate file type
    const extension = `.${file.name.split('.').pop()?.toLowerCase()}`
    if (!acceptedTypes.includes(extension)) {
      setErrorMessage(`Type de fichier non accepté. Formats acceptés: ${acceptedTypes.join(", ")}`)
      setUploadStatus("error")
      return
    }

    setUploadStatus("uploading")
    setErrorMessage("")

    // Simulate upload (in real app, upload to S3/Supabase Storage)
    setTimeout(() => {
      setUploadStatus("success")
      onChange(file.name)
    }, 1500)
  }

  const handleRemove = () => {
    onChange(null)
    setUploadStatus("idle")
    setErrorMessage("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      {!value && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center
            transition-all cursor-pointer
            ${isDragging 
              ? "border-vyxo-gold bg-vyxo-gold/10" 
              : "border-slate-700 hover:border-slate-500 bg-slate-800/50"
            }
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
          onClick={() => !disabled && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedTypes.join(",")}
            onChange={handleFileSelect}
            className="hidden"
            disabled={disabled}
          />

          {uploadStatus === "uploading" ? (
            <div className="space-y-2">
              <div className="animate-spin w-8 h-8 border-2 border-vyxo-gold border-t-transparent rounded-full mx-auto" />
              <p className="text-slate-400">Téléchargement en cours...</p>
            </div>
          ) : (
            <>
              <Upload className="w-10 h-10 mx-auto text-slate-500 mb-3" />
              <p className="text-slate-300 font-medium mb-1">
                Glissez-déposez votre fichier ici
              </p>
              <p className="text-slate-500 text-sm">
                ou cliquez pour parcourir
              </p>
              <p className="text-slate-600 text-xs mt-3">
                Formats acceptés: {acceptedTypes.join(", ")} • Max {maxSize}MB
              </p>
            </>
          )}
        </div>
      )}

      {/* Uploaded file */}
      {value && (
        <div className="flex items-center gap-3 bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="p-2 bg-vyxo-gold/20 rounded">
            <File className="w-5 h-5 text-vyxo-gold" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{value}</p>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-500" />
              Téléchargé avec succès
            </p>
          </div>
          {!disabled && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              className="text-slate-400 hover:text-red-400"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}

      {/* Error message */}
      {errorMessage && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4" />
          {errorMessage}
        </div>
      )}
    </div>
  )
}

export default FileUpload
