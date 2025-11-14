"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, FileText, Info } from "lucide-react"
import type { GraduationRequirements, RequirementCategory, UserProfile } from "@/lib/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface RequirementsDashboardProps {
  profile: UserProfile
  requirements: GraduationRequirements
  onEditCredits: (categoryId: string) => void
}

export function RequirementsDashboard({ profile, requirements, onEditCredits }: RequirementsDashboardProps) {
  const categories = [
    requirements.major,
    requirements.generalEducation,
    requirements.extracurricular,
    ...(requirements.thesis ? [requirements.thesis] : []),
  ]

  const totalRequired = categories.reduce((sum, cat) => sum + cat.required, 0)
  const totalCompleted = categories.reduce((sum, cat) => sum + cat.completed, 0)
  const overallProgress = totalRequired > 0 ? (totalCompleted / totalRequired) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Overall Progress Card */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">전체 졸업 요건 진행률</CardTitle>
              <CardDescription className="mt-2">
                {profile.department} · {profile.majorType} · {profile.admissionYear}학번
              </CardDescription>
            </div>
            <Badge variant={overallProgress >= 100 ? "default" : "secondary"} className="text-lg px-4 py-2">
              {overallProgress.toFixed(1)}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Progress value={overallProgress} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                {totalCompleted} / {totalRequired} 학점 이수
              </span>
              <span>{totalRequired - totalCompleted > 0 ? `${totalRequired - totalCompleted}학점 남음` : "완료!"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Requirement Categories */}
      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <RequirementCard key={category.id} category={category} onEdit={() => onEditCredits(category.id)} />
        ))}
      </div>
    </div>
  )
}

function RequirementCard({ category, onEdit }: { category: RequirementCategory; onEdit: () => void }) {
  const progress = category.required > 0 ? (category.completed / category.required) * 100 : 0
  const isComplete = category.completed >= category.required

  return (
    <Card className={isComplete ? "border-primary/50" : ""}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              {isComplete ? (
                <CheckCircle2 className="h-5 w-5 text-primary" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}
              <CardTitle className="text-lg">{category.name}</CardTitle>
            </div>
            <CardDescription className="mt-1">{category.description}</CardDescription>
          </div>
          {category.details && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Info className="h-4 w-4" />
                  <span className="sr-only">상세 정보</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{category.name}</DialogTitle>
                  <DialogDescription>{category.description}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="text-sm leading-relaxed">{category.details}</div>
                  {category.documentUrl && (
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <a href={category.documentUrl} target="_blank" rel="noopener noreferrer">
                        <FileText className="h-4 w-4 mr-2" />
                        관련 문서 보기
                      </a>
                    </Button>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">이수 학점</span>
            <span className="font-medium">
              {category.completed} / {category.required}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <Button variant="outline" className="w-full bg-transparent" onClick={onEdit}>
          학점 입력/수정
        </Button>
      </CardContent>
    </Card>
  )
}
