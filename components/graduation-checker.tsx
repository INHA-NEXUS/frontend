"use client"

import type React from "react"

import { useState, useEffect } from "react"
import * as XLSX from "xlsx"
import type { StudentInfo, Course, AnalysisResult } from "@/lib/analyze-types"
import { analyzeGraduation, extractStudentInfo, extractCourses } from "@/lib/graduation-utils"
import StudentInfoSection from "@/components/student-info-section"
import CreditsOverview from "@/components/credits-overview"
import RequiredCoursesSection from "@/components/required-courses-section"
import EducationSection from "@/components/education-section"
import AdditionalRequirements from "@/components/additional-requirements"
import type { UserProfile } from "@/lib/types"
import { storage } from "@/lib/storage"

interface GraduationCheckerProps {
  profile?: UserProfile | null
}

export default function GraduationChecker({ profile }: GraduationCheckerProps) {
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [majorType, setMajorType] = useState<"single" | "double" | "minor">("single")
  const [curriculumYear, setCurriculumYear] = useState<"2023" | "2024" | "2025">("2023")

  // Auto-set majorType and curriculumYear from profile
  useEffect(() => {
    const profileToUse = profile || storage.getProfile()
    if (profileToUse) {
      // Set curriculum year from admission year
      const admissionYear = profileToUse.admissionYear
      if (admissionYear >= 2023 && admissionYear <= 2025) {
        setCurriculumYear(admissionYear.toString() as "2023" | "2024" | "2025")
      }

      // Set major type
      const majorTypeMap: Record<string, "single" | "double" | "minor"> = {
        단일전공: "single",
        복수전공: "double",
        부전공: "minor",
        융합전공: "single", // Default to single for fusion major
      }
      const mappedMajorType = majorTypeMap[profileToUse.majorType] || "single"
      setMajorType(mappedMajorType)

      // Re-analyze if courses are already loaded
      if (courses.length > 0) {
        const result = analyzeGraduation(
          courses,
          mappedMajorType,
          admissionYear.toString() as "2023" | "2024" | "2025",
        )
        setAnalysis(result)
      }
    }
  }, [profile, courses])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: "array" })
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null }) as any[][]

        const info = extractStudentInfo(jsonData)
        setStudentInfo(info)

        // 입학년도 자동 인식
        if (info.studentId && info.studentId.length >= 2) {
          const yearPrefix = info.studentId.substring(0, 2)
          const admissionYear = 2000 + Number.parseInt(yearPrefix)
          if (admissionYear >= 2023 && admissionYear <= 2025) {
            setCurriculumYear(admissionYear.toString() as "2023" | "2024" | "2025")
          }
        }

        const extractedCourses = extractCourses(jsonData as any[][])
        setCourses(extractedCourses)

        const year =
          info.studentId && info.studentId.length >= 2
            ? ((2000 + Number.parseInt(info.studentId.substring(0, 2))).toString() as "2023" | "2024" | "2025")
            : curriculumYear

        const result = analyzeGraduation(extractedCourses, majorType, year)
        setAnalysis(result)
      } catch (error) {
        console.error("파일 처리 중 오류:", error)
        alert("파일을 처리하는 중 오류가 발생했습니다.")
      }
    }
    reader.readAsArrayBuffer(file)
  }

  const handleMajorTypeChange = (type: "single" | "double" | "minor") => {
    setMajorType(type)
    if (courses.length > 0) {
      const result = analyzeGraduation(courses, type, curriculumYear)
      setAnalysis(result)
    }
  }

  const handleYearChange = (year: "2023" | "2024" | "2025") => {
    setCurriculumYear(year)
    if (courses.length > 0) {
      const result = analyzeGraduation(courses, majorType, year)
      setAnalysis(result)
    }
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="text-center">
          <div className="flex justify-center items-center gap-4 mb-4">
            <img src="/inha-logo.png" alt="인하대학교 로고" className="h-20 w-20" />
            <h1 className="text-4xl font-bold text-foreground">인하대 컴퓨터공학과 졸업요건 체크</h1>
          </div>
          <p className="text-lg text-muted-foreground">2023~2025 입학생 대상 | 자동으로 졸업요건을 분석해보세요</p>
        </div>

        {/* 입력 섹션 */}
        <div className="bg-card rounded-2xl shadow-lg p-8 space-y-6 border">
          {/* 입학년도 선택 */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">입학년도 선택 (교과과정 기준)</label>
            <div className="grid grid-cols-3 gap-3">
              {(["2023", "2024", "2025"] as const).map((year) => (
                <button
                  key={year}
                  onClick={() => handleYearChange(year)}
                  className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                    curriculumYear === year
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {year}학번
                </button>
              ))}
            </div>
          </div>

          {/* 전공 형태 선택 */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">전공 형태 선택</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleMajorTypeChange("single")}
                className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                  majorType === "single"
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                단일전공 (65학점)
              </button>
              <button
                onClick={() => handleMajorTypeChange("double")}
                className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                  majorType === "double"
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                복수전공 (39학점)
              </button>
              <button
                onClick={() => handleMajorTypeChange("minor")}
                className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                  majorType === "minor"
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                부전공 (48학점)
              </button>
            </div>
          </div>

          {/* 파일 업로드 */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">성적표 파일 업로드 (Excel)</label>
            <input
              type="file"
              accept=".xls,.xlsx"
              onChange={handleFileUpload}
              className="w-full p-4 border-2 border-dashed border-primary/30 rounded-lg hover:border-primary transition-colors cursor-pointer bg-primary/5"
            />
            <p className="text-xs text-muted-foreground mt-2">인하대 포털 → 학사정보 → 성적조회 → 성적표 다운로드</p>
          </div>
        </div>

        {/* 분석 결과 */}
        {analysis && studentInfo ? (
          <div className="space-y-6">
            <StudentInfoSection studentInfo={studentInfo} curriculumYear={curriculumYear} />
            <CreditsOverview analysis={analysis} />
            <RequiredCoursesSection analysis={analysis} />
            <EducationSection analysis={analysis} curriculumYear={curriculumYear} />
            <AdditionalRequirements curriculumYear={curriculumYear} />
          </div>
        ) : (
          <div className="bg-card rounded-xl shadow-lg p-12 text-center border">
            <div className="text-6xl mb-4">📁</div>
            <p className="text-lg text-muted-foreground mb-2">성적표 파일을 업로드하면 졸업요건 분석이 시작됩니다</p>
            <p className="text-sm text-muted-foreground">입학년도는 학번을 통해 자동으로 인식됩니다</p>
          </div>
        )}
      </div>
    </div>
  )
}
