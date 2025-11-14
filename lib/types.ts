export type MajorType = "단일전공" | "복수전공" | "부전공" | "융합전공"
export type EnrollmentStatus = "재학" | "휴학" | "졸업유예"

export interface UserProfile {
  department: string
  admissionYear: number
  majorType: MajorType
  enrollmentStatus?: EnrollmentStatus
  name?: string
  doubleMajorDepartment?: string
  minorDepartment?: string
}

export interface RequirementCategory {
  id: string
  name: string
  required: number
  completed: number
  description: string
  details?: string
  documentUrl?: string
  notes?: string
}

export interface GraduationRequirements {
  major: RequirementCategory
  generalEducation: RequirementCategory
  extracurricular: RequirementCategory
  thesis?: RequirementCategory
}
