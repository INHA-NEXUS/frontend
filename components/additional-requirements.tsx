interface AdditionalRequirementsProps {
  curriculumYear: string
}

export default function AdditionalRequirements({ curriculumYear }: AdditionalRequirementsProps) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
      <h2 className="text-xl font-bold text-black mb-4">⚠️ 추가 졸업요건</h2>
      <ul className="space-y-2 text-black">
        <li>
          ✓ <strong>핵심교양 4개 영역</strong> 각 3학점 (12학점)
          {curriculumYear >= "2024" && " - 반드시 GED6009 포함"}
        </li>
        <li>
          ✓ <strong>창의영역</strong> 3학점
        </li>
        <li>
          ✓ <strong>SW·AI</strong> 3학점 {curriculumYear >= "2024" && "(탄소중립 트랙)"}
        </li>
        {curriculumYear >= "2024" && (
          <li>
            ✓ <strong>TOPCIT 응시</strong> 필수 (3,4학년 각 1회)
          </li>
        )}
        <li>
          ✓ <strong>영어졸업인증</strong> 취득
        </li>
        <li>
          ✓ <strong>졸업고사</strong> 또는 대체요건 (전공성적 3.3 이상 or 정보처리기사)
        </li>
      </ul>
    </div>
  )
}
