import type { StudentInfo, Course, AnalysisResult } from "./analyze-types"
import { GRADUATION_REQUIREMENTS } from "./graduation-constants"

export function extractStudentInfo(data: any[][]): StudentInfo {
  // Excel 데이터에서 학생 정보 추출
  // 일반적인 성적표 형식을 가정
  const info: StudentInfo = {
    studentId: "",
    name: "",
    grade: "",
    department: "",
    admissionDate: "",
  }

  // 데이터에서 학생 정보 찾기
  for (let i = 0; i < Math.min(10, data.length); i++) {
    const row = data[i]
    if (!row) continue

    // 학번 찾기
    if (String(row[0]).includes("학번") || String(row[0]).includes("학생번호")) {
      info.studentId = String(row[1] || "")
    }
    // 이름 찾기
    if (String(row[0]).includes("성명") || String(row[0]).includes("이름")) {
      info.name = String(row[1] || "")
    }
    // 학년 찾기
    if (String(row[0]).includes("학년")) {
      info.grade = String(row[1] || "")
    }
    // 학과 찾기
    if (String(row[0]).includes("학과") || String(row[0]).includes("전공")) {
      info.department = String(row[1] || "")
    }
    // 입학일자 찾기
    if (String(row[0]).includes("입학")) {
      info.admissionDate = String(row[1] || "")
    }
  }

  return info
}

export function extractCourses(data: any[][]): Course[] {
  const courses: Course[] = []

  // 헤더 행 찾기
  let headerRowIndex = -1
  for (let i = 0; i < data.length; i++) {
    const row = data[i]
    if (row && (row.includes("과목코드") || row.includes("과목명") || row.includes("학점"))) {
      headerRowIndex = i
      break
    }
  }

  if (headerRowIndex === -1) return courses

  const headers = data[headerRowIndex]
  const codeIdx = headers.findIndex((h: string) => String(h).includes("과목코드") || String(h).includes("코드"))
  const nameIdx = headers.findIndex((h: string) => String(h).includes("과목명") || String(h).includes("교과목명"))
  const creditsIdx = headers.findIndex((h: string) => String(h).includes("학점"))
  const gradeIdx = headers.findIndex((h: string) => String(h).includes("성적") || String(h).includes("등급"))
  const typeIdx = headers.findIndex((h: string) => String(h).includes("구분") || String(h).includes("이수구분"))

  // 데이터 행 처리
  for (let i = headerRowIndex + 1; i < data.length; i++) {
    const row = data[i]
    if (!row || !row[nameIdx]) continue

    const course: Course = {
      code: codeIdx >= 0 ? String(row[codeIdx] || "") : "",
      name: String(row[nameIdx] || ""),
      credits: creditsIdx >= 0 ? Number(row[creditsIdx]) || 0 : 0,
      grade: gradeIdx >= 0 ? String(row[gradeIdx] || "") : "",
      type: typeIdx >= 0 ? String(row[typeIdx] || "") : "",
      isRetake: false,
    }

    // 재수강 여부 체크
    if (course.name.includes("재") || course.grade.includes("재")) {
      course.isRetake = true
    }

    courses.push(course)
  }

  return courses
}

export function analyzeGraduation(
  courses: Course[],
  majorType: "single" | "double" | "minor",
  curriculumYear: "2023" | "2024" | "2025"
): AnalysisResult {
  const requirements = GRADUATION_REQUIREMENTS[curriculumYear]

  // 총 학점 계산
  const totalCredits = courses.reduce((sum, course) => {
    // F, 재수강 등 제외
    if (course.grade === "F" || course.isRetake) return sum
    return sum + course.credits
  }, 0)

  // 전공 학점 계산
  const majorCredits = courses
    .filter((c) => c.type.includes("전공") && c.grade !== "F")
    .reduce((sum, c) => sum + c.credits, 0)

  // 교양 학점 계산
  const generalCredits = courses
    .filter((c) => c.type.includes("교양") && c.grade !== "F")
    .reduce((sum, c) => sum + c.credits, 0)

  // 필수과목 이수 현황
  const requiredStatus = requirements.required.map((req) => {
    const taken = courses.find((c) => c.code === req.code || c.name === req.name)
    return {
      ...req,
      completed: !!taken && taken.grade !== "F",
      takenGrade: taken?.grade,
    }
  })

  // 기초교양 이수 현황
  const basicEducation = requirements.generalEducation.basic.map((req) => {
    let taken: Course | undefined
    if (req.options) {
      taken = courses.find((c) => req.options!.includes(c.code))
    } else if (req.code) {
      taken = courses.find((c) => c.code === req.code)
    }
    return {
      ...req,
      completed: !!taken && taken.grade !== "F",
      takenGrade: taken?.grade,
    }
  })

  // 핵심교양 이수 현황
  const coreEducation =
    "core" in requirements.generalEducation
      ? requirements.generalEducation.core.map((req) => {
          const taken = courses.find((c) => c.code === req.code)
          return {
            ...req,
            completed: !!taken && taken.grade !== "F",
            takenGrade: taken?.grade,
          }
        })
      : []

  // 계열교양 이수 현황
  const gyeyeolEducation =
    "gyeyeol" in requirements.generalEducation
      ? requirements.generalEducation.gyeyeol.map((req) => {
          const taken = courses.find((c) => c.code === req.code)
          return {
            ...req,
            completed: !!taken && taken.grade !== "F",
            takenGrade: taken?.grade,
          }
        })
      : []

  const requiredTotalCredits = requirements.totalCredits
  const requiredMajorCredits = requirements.major[majorType]
  const remainingCredits = Math.max(0, requiredTotalCredits - totalCredits)
  const remainingMajorCredits = Math.max(0, requiredMajorCredits - majorCredits)

  return {
    totalCredits,
    majorCredits,
    generalCredits,
    requiredStatus,
    basicEducation,
    coreEducation,
    gyeyeolEducation,
    remainingCredits,
    remainingMajorCredits,
    requiredMajorCredits,
    requiredTotalCredits,
    curriculumYear,
  }
}
