import type { AnalysisResult } from "@/lib/analyze-types"

interface CreditsOverviewProps {
  analysis: AnalysisResult
}

export default function CreditsOverview({ analysis }: CreditsOverviewProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">📊 학점 현황</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 총 학점 */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl">
          <p className="text-sm text-black mb-2">총 이수학점</p>
          <p className="text-3xl font-bold text-black">
            {analysis.totalCredits} / {analysis.requiredTotalCredits}
          </p>
          <div className="mt-4 bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gray-600 h-full transition-all"
              style={{ width: `${Math.min((analysis.totalCredits / analysis.requiredTotalCredits) * 100, 100)}%` }}
            />
          </div>
          <p className="text-sm text-black mt-3">
            남은 학점:{" "}
            <span className={`font-semibold text-black`}>
              {Math.max(analysis.remainingCredits, 0)}
            </span>
          </p>
        </div>

        {/* 전공 학점 */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl">
          <p className="text-sm text-black mb-2">전공 이수학점</p>
          <p className="text-3xl font-bold text-black">
            {analysis.majorCredits} / {analysis.requiredMajorCredits}
          </p>
          <div className="mt-4 bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gray-600 h-full transition-all"
              style={{ width: `${Math.min((analysis.majorCredits / analysis.requiredMajorCredits) * 100, 100)}%` }}
            />
          </div>
          <p className="text-sm text-black mt-3">
            남은 학점:{" "}
            <span className={`font-semibold text-black`}>
              {Math.max(analysis.remainingMajorCredits, 0)}
            </span>
          </p>
        </div>

        {/* 교양 학점 */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl">
          <p className="text-sm text-black mb-2">교양 이수학점</p>
          <p className="text-3xl font-bold text-black">{analysis.generalCredits}</p>
          <div className="mt-4 space-y-1 text-sm text-black">
            <p>기초교양: 12~16학점</p>
            <p>핵심교양: 4영역×3학점</p>
          </div>
        </div>
      </div>
    </div>
  )
}
