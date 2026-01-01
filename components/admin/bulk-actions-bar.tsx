"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { 
  ChevronDown, 
  Trash2, 
  UserX, 
  UserCheck,
  Mail,
  Tag,
  MoreHorizontal,
  AlertTriangle
} from "lucide-react"

interface BulkActionsBarProps {
  selectedCount: number
  totalCount: number
  onSelectAll: () => void
  onClearSelection: () => void
  onBulkAction: (action: string, ids: string[]) => Promise<void>
  selectedIds: string[]
  actions?: {
    id: string
    label: string
    icon: React.ReactNode
    variant?: "default" | "destructive" | "warning"
    confirm?: boolean
  }[]
  entityName?: string
}

const defaultActions = [
  { id: "activate", label: "Activer", icon: <UserCheck className="w-4 h-4" />, variant: "default" as const },
  { id: "deactivate", label: "Désactiver", icon: <UserX className="w-4 h-4" />, variant: "warning" as const },
  { id: "sendEmail", label: "Envoyer email", icon: <Mail className="w-4 h-4" />, variant: "default" as const },
  { id: "delete", label: "Supprimer", icon: <Trash2 className="w-4 h-4" />, variant: "destructive" as const, confirm: true },
]

export function BulkActionsBar({
  selectedCount,
  totalCount,
  onSelectAll,
  onClearSelection,
  onBulkAction,
  selectedIds,
  actions = defaultActions,
  entityName = "éléments"
}: BulkActionsBarProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [confirmAction, setConfirmAction] = useState<typeof actions[0] | null>(null)

  if (selectedCount === 0) return null

  const handleAction = async (action: typeof actions[0]) => {
    if (action.confirm) {
      setConfirmAction(action)
      return
    }

    await executeAction(action.id)
  }

  const executeAction = async (actionId: string) => {
    setIsLoading(true)
    try {
      await onBulkAction(actionId, selectedIds)
      onClearSelection()
    } finally {
      setIsLoading(false)
      setConfirmAction(null)
    }
  }

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-3 px-4 py-3 bg-vyxo-navy border border-slate-700 rounded-xl shadow-xl">
          {/* Selection info */}
          <div className="flex items-center gap-2">
            <Badge className="bg-vyxo-gold/20 text-vyxo-gold">
              {selectedCount} sélectionné{selectedCount > 1 ? "s" : ""}
            </Badge>
            <button
              onClick={selectedCount === totalCount ? onClearSelection : onSelectAll}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {selectedCount === totalCount ? "Désélectionner tout" : "Tout sélectionner"}
            </button>
          </div>

          <div className="w-px h-6 bg-slate-700" />

          {/* Quick actions */}
          {actions.slice(0, 3).map(action => (
            <Button
              key={action.id}
              variant={action.variant === "destructive" ? "destructive" : "ghost"}
              size="sm"
              onClick={() => handleAction(action)}
              disabled={isLoading}
              className={
                action.variant === "warning" 
                  ? "text-yellow-500 hover:text-yellow-400" 
                  : action.variant === "destructive"
                  ? ""
                  : "text-slate-300 hover:text-white"
              }
            >
              {action.icon}
              <span className="ml-2 hidden md:inline">{action.label}</span>
            </Button>
          ))}

          {/* More actions */}
          {actions.length > 3 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {actions.slice(3).map(action => (
                  <DropdownMenuItem
                    key={action.id}
                    onClick={() => handleAction(action)}
                    className={action.variant === "destructive" ? "text-red-500" : ""}
                  >
                    {action.icon}
                    <span className="ml-2">{action.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Close button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            className="text-slate-400 hover:text-white"
          >
            ✕
          </Button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={!!confirmAction} onOpenChange={() => setConfirmAction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Confirmer l&apos;action
            </AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir {confirmAction?.label.toLowerCase()} {selectedCount} {entityName} ?
              {confirmAction?.variant === "destructive" && (
                <span className="block mt-2 text-red-400">
                  Cette action est irréversible.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => confirmAction && executeAction(confirmAction.id)}
              className={
                confirmAction?.variant === "destructive"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy"
              }
            >
              {confirmAction?.label}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default BulkActionsBar
