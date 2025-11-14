"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { RequirementCategory } from "@/lib/types"

interface CreditInputModalProps {
  category: RequirementCategory | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (categoryId: string, completed: number, notes?: string) => void
}

export function CreditInputModal({ category, open, onOpenChange, onSave }: CreditInputModalProps) {
  const [completed, setCompleted] = useState<string>("")
  const [notes, setNotes] = useState<string>("")

  // Update local state when category changes
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen && category) {
      setCompleted(category.completed.toString())
      setNotes("")
    }
    onOpenChange(newOpen)
  }

  const handleSave = () => {
    if (!category) return

    const completedValue = Number.parseFloat(completed)
    if (isNaN(completedValue) || completedValue < 0) {
      alert("올바른 학점을 입력해주세요")
      return
    }

    onSave(category.id, completedValue, notes || undefined)
    onOpenChange(false)
  }

  if (!category) return null

  const progress = category.required > 0 ? (Number.parseFloat(completed || "0") / category.required) * 100 : 0
  const remaining = category.required - Number.parseFloat(completed || "0")

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{category.name} 입력</DialogTitle>
          <DialogDescription>{category.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Credit Input */}
          <div className="space-y-2">
            <Label htmlFor="completed">이수 학점</Label>
            <div className="flex items-center gap-4">
              <Input
                id="completed"
                type="number"
                min="0"
                step="0.5"
                value={completed}
                onChange={(e) => setCompleted(e.target.value)}
                placeholder="0"
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground whitespace-nowrap">/ {category.required}</span>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="rounded-lg bg-muted p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">진행률</span>
              <span className="font-medium">{progress.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-background rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            {remaining > 0 ? (
              <p className="text-sm text-muted-foreground">남은 학점: {remaining.toFixed(1)}</p>
            ) : (
              <p className="text-sm text-primary font-medium">요건 충족 완료!</p>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">메모 (선택)</Label>
            <Textarea
              id="notes"
              placeholder="이수한 과목이나 참고사항을 입력하세요"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Requirement Details */}
          {category.details && (
            <div className="rounded-lg border border-border p-4">
              <h4 className="text-sm font-medium mb-2">요건 상세</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{category.details}</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button onClick={handleSave}>저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
