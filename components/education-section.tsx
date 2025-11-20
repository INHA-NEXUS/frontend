import type { AnalysisResult } from "@/lib/analyze-types"

interface EducationSectionProps {
  analysis: AnalysisResult
  curriculumYear: string
}

export default function EducationSection({ analysis, curriculumYear }: EducationSectionProps) {
  return (
    <div className="space-y-6">
      {/* 기초교양 */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-black mb-4">📚 기초교양</h2>
        <div className="space-y-3">
          {analysis.basicEducation.map((req, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all bg-white border-gray-200`}
            >
              <div className="flex items-center gap-3 flex-1">
                <span className="text-2xl">{req.completed ? "✅" : "❌"}</span>
                <div>
                  <p className="font-semibold text-black">{req.name}</p>
                  <p className="text-sm text-black">
                    {req.code || "여러 과목 중 택1"} | {req.credits}학점 | {req.semester}
                  </p>
                </div>
              </div>
              {req.completed && (
                <span className="px-3 py-1 bg-gray-200 text-black rounded-full text-sm font-semibold whitespace-nowrap ml-4">
                  이수완료
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 중점교양 (2024/2025) */}
      {analysis.coreEducation && analysis.coreEducation.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-black mb-4">🎯 중점교양</h2>
          <div className="space-y-3">
            {analysis.coreEducation.map((req, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all bg-white border-gray-200`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{req.completed ? "✅" : "❌"}</span>
                  <div>
                    <p className="font-semibold text-black">{req.name}</p>
                    <p className="text-sm text-black">
                      {req.code} | {req.credits}학점 | {req.semester}
                    </p>
                  </div>
                </div>
                {req.completed && (
                  <span className="px-3 py-1 bg-gray-200 text-black rounded-full text-sm font-semibold whitespace-nowrap ml-4">
                    {req.takenGrade}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 계열교양 (2023) */}
      {analysis.gyeyeolEducation && analysis.gyeyeolEducation.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-black mb-4">🔢 계열교양 (수학)</h2>
          <div className="space-y-3">
            {analysis.gyeyeolEducation.map((req, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all bg-white border-gray-200`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{req.completed ? "✅" : "❌"}</span>
                  <div>
                    <p className="font-semibold text-black">{req.name}</p>
                    <p className="text-sm text-black">
                      {req.code} | {req.credits}학점 | {req.semester}
                    </p>
                  </div>
                </div>
                {req.completed && (
                  <span className="px-3 py-1 bg-gray-200 text-black rounded-full text-sm font-semibold whitespace-nowrap ml-4">
                    {req.takenGrade}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
