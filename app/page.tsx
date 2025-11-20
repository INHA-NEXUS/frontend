"use client"

import Image from "next/image"
import { useState } from "react"
import { ProfileForm } from "@/components/profile-form"
import { RequirementsDashboard } from "@/components/requirements-dashboard"
import { CreditInputModal } from "@/components/credit-input-modal"
import { ProgressTimeline } from "@/components/progress-timeline"
import { ProgressAnalytics } from "@/components/progress-analytics"
import GraduationChecker from "@/components/graduation-checker"
import { getDefaultRequirements } from "@/lib/requirements-data"
import type { UserProfile, GraduationRequirements } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [requirements, setRequirements] = useState<GraduationRequirements | null>(null)
  const [editingCategory, setEditingCategory] = useState<string | null>(null)

  const handleProfileComplete = (newProfile: UserProfile) => {
    setProfile(newProfile)
    const defaultRequirements = getDefaultRequirements(newProfile)
    setRequirements(defaultRequirements)
  }

  const handleEditCredits = (categoryId: string) => {
    setEditingCategory(categoryId)
  }

  const handleSaveCredits = (categoryId: string, completed: number, notes?: string) => {
    if (!requirements) return

    setRequirements((prev) => {
      if (!prev) return prev

      const updateCategory = (cat: typeof prev.major) => {
        if (cat.id === categoryId) {
          return { ...cat, completed, notes }
        }
        return cat
      }

      return {
        major: updateCategory(prev.major),
        generalEducation: updateCategory(prev.generalEducation),
        extracurricular: updateCategory(prev.extracurricular),
        ...(prev.thesis && { thesis: updateCategory(prev.thesis) }),
      }
    })
  }

  const handleResetProfile = () => {
    setProfile(null)
    setRequirements(null)
  }

  const currentCategory = editingCategory
    ? requirements
      ? [requirements.major, requirements.generalEducation, requirements.extracurricular, requirements.thesis].find(
          (cat) => cat?.id === editingCategory,
        ) || null
      : null
    : null

  return (
    <main className="relative min-h-screen">
      <Image
        src="/inha_logo.jpg"
        alt="Inha University Logo"
        width={160}
        height={40}
        className="absolute top-8 left-8"
        priority
      />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 text-balance">졸업 요건 관리 시스템</h1>
          <p className="text-muted-foreground text-lg">체계적으로 졸업 요건을 확인하고 관리하세요</p>
        </div>

        {!profile ? (
          <ProfileForm onComplete={handleProfileComplete} />
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-end mb-4">
              <Button variant="outline" size="sm" onClick={handleResetProfile}>
                <Settings className="h-4 w-4 mr-2" />
                프로필 재설정
              </Button>
            </div>

            {requirements && (
              <Tabs defaultValue="dashboard" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="dashboard">대시보드</TabsTrigger>
                  <TabsTrigger value="timeline">타임라인</TabsTrigger>
                  <TabsTrigger value="analytics">분석</TabsTrigger>
                </TabsList>

                <TabsContent value="dashboard" className="space-y-6">
                  <ProgressAnalytics profile={profile} requirements={requirements} />
                  <RequirementsDashboard
                    profile={profile}
                    requirements={requirements}
                    onEditCredits={handleEditCredits}
                  />
                </TabsContent>

                <TabsContent value="timeline">
                  <ProgressTimeline requirements={requirements} />
                </TabsContent>

                <TabsContent value="analytics">
                  <GraduationChecker />
                </TabsContent>
              </Tabs>
            )}
          </div>
        )}
      </div>

      <CreditInputModal
        category={currentCategory}
        open={editingCategory !== null}
        onOpenChange={(open) => !open && setEditingCategory(null)}
        onSave={handleSaveCredits}
      />
    </main>
  )
}
