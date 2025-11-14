import type { AnalysisResult } from "@/lib/analyze-types"

interface RequiredCoursesSectionProps {
  analysis: AnalysisResult
}

export default function RequiredCoursesSection({ analysis }: RequiredCoursesSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">
        ✅ 전공필수 과목 ({analysis.requiredStatus.reduce((sum, r) => sum + r.credits, 0)}학점)
      </h2>
      <div className="space-y-3">
        {analysis.requiredStatus.map((req, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
              req.completed ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-center gap-3 flex-1">
              <span className="text-2xl">{req.completed ? "✅" : "❌"}</span>
              <div>
                <p className="font-semibold text-slate-900">{req.name}</p>
                <p className="text-sm text-slate-600">
                  {req.code} | {req.credits}학점 | {req.semester}
                </p>
              </div>
            </div>
            {req.completed && (
              <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-semibold whitespace-nowrap ml-4">
                {req.takenGrade}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
