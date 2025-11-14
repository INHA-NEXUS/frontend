"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import type { UserProfile, MajorType, EnrollmentStatus } from "@/lib/types"

interface ProfileSetupProps {
  onComplete: (profile: UserProfile) => void
}

const DEPARTMENTS = [
  "컴퓨터공학과",
  "전자공학과",
  "기계공학과",
  "경영학과",
  "경제학과",
  "심리학과",
  "영어영문학과",
  "수학과",
  "물리학과",
  "화학과",
]

const MAJOR_TYPES: MajorType[] = ["단일전공", "복수전공", "부전공", "융합전공"]
const ENROLLMENT_STATUSES: EnrollmentStatus[] = ["재학", "휴학", "졸업유예"]

export function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    admissionYear: new Date().getFullYear(),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (profile.department && profile.admissionYear && profile.majorType) {
      onComplete(profile as UserProfile)
    }
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i)

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">프로필 설정</CardTitle>
        <CardDescription>졸업 요건 확인을 위해 기본 정보를 입력해주세요</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">이름 (선택)</Label>
            <Input
              id="name"
              placeholder="이름을 입력하세요"
              value={profile.name || ""}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">학과 *</Label>
            <Select value={profile.department} onValueChange={(value) => setProfile({ ...profile, department: value })}>
              <SelectTrigger id="department">
                <SelectValue placeholder="학과를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="admissionYear">입학년도 *</Label>
            <Select
              value={profile.admissionYear?.toString()}
              onValueChange={(value) => setProfile({ ...profile, admissionYear: Number.parseInt(value) })}
            >
              <SelectTrigger id="admissionYear">
                <SelectValue placeholder="입학년도를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}년
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="majorType">전공 유형 *</Label>
            <Select
              value={profile.majorType}
              onValueChange={(value) => setProfile({ ...profile, majorType: value as MajorType })}
            >
              <SelectTrigger id="majorType">
                <SelectValue placeholder="전공 유형을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {MAJOR_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="enrollmentStatus">학적 상태 (선택)</Label>
            <Select
              value={profile.enrollmentStatus}
              onValueChange={(value) => setProfile({ ...profile, enrollmentStatus: value as EnrollmentStatus })}
            >
              <SelectTrigger id="enrollmentStatus">
                <SelectValue placeholder="학적 상태를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {ENROLLMENT_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" size="lg">
            다음 단계로
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
