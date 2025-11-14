"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle, AlertCircle } from "lucide-react"
import type { GraduationRequirements } from "@/lib/types"

interface ProgressTimelineProps {
  requirements: GraduationRequirements
}

export function ProgressTimeline({ requirements }: ProgressTimelineProps) {
  const categories = [
    requirements.major,
    requirements.generalEducation,
    requirements.extracurricular,
    ...(requirements.thesis ? [requirements.thesis] : []),
  ]

  const milestones = categories.map((cat) => {
    const progress = cat.required > 0 ? (cat.completed / cat.required) * 100 : 0
    return {
      name: cat.name,
      completed: cat.completed,
      required: cat.required,
      progress,
      status: progress >= 100 ? "complete" : progress >= 50 ? "in-progress" : "not-started",
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>진행 상황 타임라인</CardTitle>
        <CardDescription>각 요건별 달성 현황을 한눈에 확인하세요</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex gap-4">
              {/* Icon */}
              <div className="flex flex-col items-center">
                <div
                  className={`rounded-full p-2 ${
                    milestone.status === "complete"
                      ? "bg-primary text-primary-foreground"
                      : milestone.status === "in-progress"
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {milestone.status === "complete" ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : milestone.status === "in-progress" ? (
                    <AlertCircle className="h-5 w-5" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </div>
                {index < milestones.length - 1 && <div className="w-0.5 h-full bg-border mt-2" />}
              </div>

              {/* Content */}
              <div className="flex-1 pb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{milestone.name}</h4>
                  <span className="text-sm text-muted-foreground">
                    {milestone.completed} / {milestone.required}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      milestone.status === "complete"
                        ? "bg-primary"
                        : milestone.status === "in-progress"
                          ? "bg-accent"
                          : "bg-muted-foreground/30"
                    }`}
                    style={{ width: `${Math.min(milestone.progress, 100)}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">{milestone.progress.toFixed(0)}% 완료</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
