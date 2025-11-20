"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Target, Calendar, Award } from "lucide-react"
import type { GraduationRequirements, UserProfile } from "@/lib/types"

interface ProgressAnalyticsProps {
  profile: UserProfile
  requirements: GraduationRequirements
}

export function ProgressAnalytics({ profile, requirements }: ProgressAnalyticsProps) {
  const categories = [
    requirements.major,
    requirements.generalEducation,
    requirements.extracurricular,
    ...(requirements.thesis ? [requirements.thesis] : []),
  ]

  const totalRequired = categories.reduce((sum, cat) => sum + cat.required, 0)
  const totalCompleted = categories.reduce((sum, cat) => sum + cat.completed, 0)
  const overallProgress = totalRequired > 0 ? (totalCompleted / totalRequired) * 100 : 0

  // Calculate estimated graduation
  const currentYear = new Date().getFullYear()
  const yearsEnrolled = currentYear - profile.admissionYear
  const expectedGraduationYear = profile.admissionYear + 4
  const semestersRemaining = Math.max(0, (expectedGraduationYear - currentYear) * 2)

  // Calculate average credits per semester needed
  const creditsRemaining = totalRequired - totalCompleted
  const avgCreditsNeeded = semestersRemaining > 0 ? creditsRemaining / semestersRemaining : 0

  // Count completed categories
  const completedCategories = categories.filter((cat) => cat.completed >= cat.required).length

  const stats = [
    {
      icon: TrendingUp,
      label: "전체 진행률",
      value: `${overallProgress.toFixed(1)}%`,
      description: `${totalCompleted} / ${totalRequired} 학점`,
    },
    {
      icon: Target,
      label: "완료된 요건",
      value: `${completedCategories} / ${categories.length}`,
      description: "개 항목 달성",
    },
    {
      icon: Calendar,
      label: "학기당 필요 학점",
      value: avgCreditsNeeded > 0 ? `${avgCreditsNeeded.toFixed(1)}` : "완료",
      description: semestersRemaining > 0 ? `${semestersRemaining}학기 남음` : "졸업 요건 충족",
    },
    {
      icon: Award,
      label: "예상 졸업",
      value: `${expectedGraduationYear}년`,
      description: overallProgress >= 100 ? "졸업 가능" : `${yearsEnrolled}년차 재학`,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-black">{stat.label}</CardTitle>
            <stat.icon className="h-4 w-4 text-black" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">{stat.value}</div>
            <p className="text-xs text-black mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
