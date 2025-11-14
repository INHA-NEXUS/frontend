import type { StudentInfo } from "@/lib/analyze-types"

interface StudentInfoSectionProps {
  studentInfo: StudentInfo
  curriculumYear: string
}

export default function StudentInfoSection({ studentInfo, curriculumYear }: StudentInfoSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">📋 학생 정보</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div>
          <p className="text-sm text-slate-600">학번</p>
          <p className="font-semibold text-slate-900">{studentInfo.studentId}</p>
        </div>
        <div>
          <p className="text-sm text-slate-600">이름</p>
          <p className="font-semibold text-slate-900">{studentInfo.name}</p>
        </div>
        <div>
          <p className="text-sm text-slate-600">학년</p>
          <p className="font-semibold text-slate-900">{studentInfo.grade}학년</p>
        </div>
        <div>
          <p className="text-sm text-slate-600">입학일</p>
          <p className="font-semibold text-slate-900">{studentInfo.admissionDate}</p>
        </div>
        <div>
          <p className="text-sm text-slate-600">교과과정</p>
          <p className="font-semibold text-blue-700">{curriculumYear}학년도</p>
        </div>
      </div>
    </div>
  )
}
