"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { UserProfile, EnrollmentStatus } from "@/lib/types"
import { storage } from "@/lib/storage"
import { DepartmentSearchSelect } from "./department-search-select"

interface ProfileFormProps {
  onComplete: (profile: UserProfile) => void
}

export function ProfileForm({ onComplete }: ProfileFormProps) {
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    department: "",
    enrollmentStatus: "재학",
  })

  useEffect(() => {
    const savedProfile = storage.getProfile()
    if (savedProfile) {
      setProfile(savedProfile)
    }
  }, [])

  const handleSubmit = () => {
    if (profile.department && profile.admissionYear && profile.majorType) {
      if (profile.majorType === "복수전공" && !profile.doubleMajorDepartment) {
        alert("복수전공 학과를 선택해주세요")
        return
      }
      if (profile.majorType === "부전공" && !profile.minorDepartment) {
        alert("부전공 학과를 선택해주세요")
        return
      }

      storage.saveProfile(profile as UserProfile)
      onComplete(profile as UserProfile)
    }
  }

  const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - i).toString())
  const majorTypes = ["단일전공", "복수전공", "부전공", "융합전공"]
  const academicStatuses = ["재학", "휴학", "졸업유예"]

  const isValid =
    profile.department &&
    profile.admissionYear &&
    profile.majorType &&
    (profile.majorType !== "복수전공" || profile.doubleMajorDepartment) &&
    (profile.majorType !== "부전공" || profile.minorDepartment)

  const handleMajorTypeChange = (value: string) => {
    setProfile({
      ...profile,
      majorType: value as UserProfile["majorType"],
      doubleMajorDepartment: undefined,
      minorDepartment: undefined,
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white text-black">
      <CardHeader>
        <CardTitle className="text-2xl">개인 프로필 입력</CardTitle>
        <CardDescription>졸업요건 확인을 위해 정보를 입력해주세요</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="department">주전공 학과 선택</Label>
          <DepartmentSearchSelect
            value={profile.department || ""}
            onValueChange={(value) => setProfile({ ...profile, department: value })}
            placeholder="학과를 검색하세요"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="admissionYear">입학년도</Label>
          <Select
            value={profile.admissionYear?.toString()}
            onValueChange={(value) => setProfile({ ...profile, admissionYear: Number.parseInt(value) })}
          >
            <SelectTrigger id="admissionYear">
              <SelectValue placeholder="입학년도를 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}년
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="majorType">전공 유형</Label>
          <Select value={profile.majorType} onValueChange={handleMajorTypeChange}>
            <SelectTrigger id="majorType">
              <SelectValue placeholder="전공 유형을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {majorTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {profile.majorType === "복수전공" && (
          <div className="space-y-2">
            <Label htmlFor="doubleMajor">복수전공 학과 선택</Label>
            <DepartmentSearchSelect
              value={profile.doubleMajorDepartment || ""}
              onValueChange={(value) => setProfile({ ...profile, doubleMajorDepartment: value || undefined })}
              placeholder="복수전공 학과를 검색하세요"
            />
          </div>
        )}

        {profile.majorType === "부전공" && (
          <div className="space-y-2">
            <Label htmlFor="minor">부전공 학과 선택</Label>
            <DepartmentSearchSelect
              value={profile.minorDepartment || ""}
              onValueChange={(value) => setProfile({ ...profile, minorDepartment: value || undefined })}
              placeholder="부전공 학과를 검색하세요"
            />
          </div>
        )}

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
              {academicStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleSubmit} disabled={!isValid} className="w-full" size="lg">
          다음 단계로
        </Button>
      </CardContent>
    </Card>
  )
}
