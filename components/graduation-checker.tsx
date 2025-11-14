"use client"

import type React from "react"

import { useState } from "react"
import * as XLSX from "xlsx"
import type { StudentInfo, Course, AnalysisResult } from "@/lib/analyze-types"
import { analyzeGraduation, extractStudentInfo, extractCourses } from "@/lib/graduation-utils"
import StudentInfoSection from "@/components/student-info-section"
import CreditsOverview from "@/components/credits-overview"
import RequiredCoursesSection from "@/components/required-courses-section"
import EducationSection from "@/components/education-section"
import AdditionalRequirements from "@/components/additional-requirements"

export default function GraduationChecker() {
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [majorType, setMajorType] = useState<"single" | "double" | "minor">("single")
  const [curriculumYear, setCurriculumYear] = useState<"2023" | "2024" | "2025">("2023")

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
          <h1 className="text-4xl font-bold text-slate-900 mb-2">인하대 컴퓨터공학과 졸업요건 체크</h1>
          <p className="text-lg text-slate-600">2023~2025 입학생 대상 | 자동으로 졸업요건을 분석해보세요</p>
        </div>

        {/* 입력 섹션 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          {/* 입학년도 선택 */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-3">입학년도 선택 (교과과정 기준)</label>
            <div className="grid grid-cols-3 gap-3">
              {(["2023", "2024", "2025"] as const).map((year) => (
                <button
                  key={year}
                  onClick={() => handleYearChange(year)}
                  className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                    curriculumYear === year
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {year}학번
                </button>
              ))}
            </div>
          </div>

          {/* 전공 형태 선택 */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-3">전공 형태 선택</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleMajorTypeChange("single")}
                className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                  majorType === "single"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                단일전공 (65학점)
              </button>
              <button
                onClick={() => handleMajorTypeChange("double")}
                className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                  majorType === "double"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                복수전공 (39학점)
              </button>
              <button
                onClick={() => handleMajorTypeChange("minor")}
                className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                  majorType === "minor"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                부전공 (48학점)
              </button>
            </div>
          </div>

          {/* 파일 업로드 */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-3">성적표 파일 업로드 (Excel)</label>
            <input
              type="file"
              accept=".xls,.xlsx"
              onChange={handleFileUpload}
              className="w-full p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer bg-blue-50/50"
            />
            <p className="text-xs text-slate-600 mt-2">인하대 포털 → 학사정보 → 성적조회 → 성적표 다운로드</p>
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
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📁</div>
            <p className="text-lg text-slate-600 mb-2">성적표 파일을 업로드하면 졸업요건 분석이 시작됩니다</p>
            <p className="text-sm text-slate-500">입학년도는 학번을 통해 자동으로 인식됩니다</p>
          </div>
        )}
      </div>
    </div>
  )
}
