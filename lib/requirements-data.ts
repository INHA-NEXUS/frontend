import type { GraduationRequirements, UserProfile } from "./types"

// This function generates default requirements based on user profile
// In a real app, this would fetch from a database or API
export function getDefaultRequirements(profile: UserProfile): GraduationRequirements {
  const baseRequirements: GraduationRequirements = {
    major: {
      id: "major",
      name: "전공 학점",
      required: profile.majorType === "단일전공" ? 66 : profile.majorType === "복수전공" ? 84 : 42,
      completed: 0,
      description: `${profile.majorType} 필수 이수 학점`,
      details: `전공필수와 전공선택 과목을 포함한 총 학점입니다. ${profile.department}의 전공 교과과정을 확인하세요.`,
    },
    generalEducation: {
      id: "generalEducation",
      name: "교양 학점",
      required: 30,
      completed: 0,
      description: "기초교양 및 일반교양 학점",
      details: "기초교양(글쓰기, 영어, 수학 등)과 일반교양(인문, 사회, 자연 등) 영역별 필수 이수 학점을 포함합니다.",
    },
    extracurricular: {
      id: "extracurricular",
      name: "비교과 활동",
      required: 10,
      completed: 0,
      description: "봉사, 특강, 동아리 등",
      details:
        "졸업을 위해 필요한 비교과 활동 점수입니다. 봉사활동, 특강 참여, 동아리 활동, 학술대회 참가 등이 포함됩니다.",
    },
  }

  // Add thesis requirement for certain major types
  if (profile.majorType === "단일전공" || profile.majorType === "복수전공") {
    baseRequirements.thesis = {
      id: "thesis",
      name: "졸업논문/작품",
      required: 1,
      completed: 0,
      description: "졸업 요건 충족",
      details: "졸업논문 제출 또는 졸업작품 발표가 필요합니다. 지도교수와 상담하여 진행하세요.",
    }
  }

  return baseRequirements
}
