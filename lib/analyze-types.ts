export interface StudentInfo {
  studentId: string
  name: string
  grade: string
  department: string
  admissionDate: string
}

export interface Course {
  code: string
  name: string
  credits: number
  grade: string
  type: string
  isRetake: boolean
}

export interface RequirementCourse {
  code?: string
  name: string
  credits: number
  semester: string
  options?: string[]
  completed?: boolean
  takenGrade?: string
}

export interface AnalysisResult {
  totalCredits: number
  majorCredits: number
  generalCredits: number
  requiredStatus: RequirementCourse[]
  basicEducation: RequirementCourse[]
  coreEducation: RequirementCourse[]
  gyeyeolEducation: RequirementCourse[]
  remainingCredits: number
  remainingMajorCredits: number
  requiredMajorCredits: number
  requiredTotalCredits: number
  curriculumYear: string
}
