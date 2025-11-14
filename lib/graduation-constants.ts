export const GRADUATION_REQUIREMENTS = {
  2023: {
    totalCredits: 130,
    major: {
      single: 65,
      double: 39,
      minor: 48,
    },
    required: [
      { code: "CSE1101", name: "객체지향프로그래밍1", credits: 3, semester: "1-1" },
      { code: "CSE1103", name: "객체지향프로그래밍2", credits: 3, semester: "1-2" },
      { code: "CSE1112", name: "컴퓨터공학입문", credits: 2, semester: "1-1" },
      { code: "CSE1312", name: "이산구조", credits: 3, semester: "1-2" },
      { code: "CSE2101", name: "논리회로", credits: 3, semester: "1-2" },
      { code: "CSE2112", name: "자료구조", credits: 4, semester: "2-1" },
      { code: "CSE4205", name: "컴퓨터공학 종합설계", credits: 3, semester: "4-1,2" },
    ],
    generalEducation: {
      basic: [
        { code: "GEB1112", name: "크로스오버1: 인간의 탐색", credits: 2, semester: "1-1" },
        { code: "GEB1114", name: "크로스오버3: 사회의 탐색", credits: 2, semester: "1-1,2" },
        { code: "GEB1116", name: "프로네시스 세미나", credits: 2, semester: "1-1" },
        { code: "GEB1126", name: "문제해결을 위한 글쓰기", credits: 3, semester: "1-1" },
        { code: "GEB1143", name: "미래사회와 소프트웨어-IT계열", credits: 3, semester: "1-2" },
        { code: "GEB1151", name: "커리어 디자인 2", credits: 1, semester: "3-1" },
        { name: "의사소통 영어 (택1)", credits: 3, semester: "1-2", options: ["GEB1107", "GEB1108", "GEB1109"] },
      ],
      gyeyeol: [
        { code: "MTH1001", name: "일반수학1", credits: 3, semester: "1-1" },
        { code: "MTH1002", name: "일반수학2", credits: 3, semester: "1-2" },
        { code: "ACE2104", name: "통계학", credits: 3, semester: "2-1" },
      ],
      majorRequired: {
        coreAreas: 4,
        creative: 3,
        swAi: 3,
      },
    },
  },
  2024: {
    totalCredits: 130,
    major: {
      single: 65,
      double: 39,
      minor: 48,
    },
    required: [
      { code: "CSE1101", name: "객체지향프로그래밍1", credits: 3, semester: "1-1" },
      { code: "CSE1103", name: "객체지향프로그래밍2", credits: 3, semester: "1-2" },
      { code: "CSE1312", name: "이산구조", credits: 3, semester: "1-2" },
      { code: "CSE2112", name: "자료구조", credits: 4, semester: "2-1" },
      { code: "CSE4205", name: "컴퓨터공학 종합설계", credits: 3, semester: "4-1,2" },
      { code: "MTH1901", name: "일반수학1", credits: 3, semester: "1-1" },
      { code: "MTH1902", name: "일반수학2", credits: 3, semester: "1-2" },
    ],
    generalEducation: {
      basic: [
        { code: "GEB1117", name: "커리어 디자인 1", credits: 2, semester: "1-1" },
        { code: "GEB1126", name: "문제해결을 위한 글쓰기", credits: 3, semester: "1-1" },
        { code: "GEB1143", name: "미래사회와 소프트웨어-IT계열", credits: 3, semester: "1-2" },
        { code: "GEB1151", name: "커리어 디자인 2", credits: 1, semester: "3-1" },
        { name: "의사소통 영어 (택1)", credits: 3, semester: "1-2", options: ["GEB1107", "GEB1108", "GEB1109"] },
      ],
      core: [
        { code: "GEB1112", name: "크로스오버1: 인간의 탐색", credits: 2, semester: "1-1" },
        { code: "GEB1114", name: "크로스오버3: 사회의 탐색", credits: 2, semester: "1-1,2" },
      ],
      majorRequired: {
        coreAreas: 4,
        creative: 3,
        swAi: 3,
      },
    },
  },
  2025: {
    totalCredits: 130,
    major: {
      single: 65,
      double: 39,
      minor: 48,
    },
    required: [
      { code: "CSE1101", name: "객체지향프로그래밍1", credits: 3, semester: "1-1" },
      { code: "CSE1103", name: "객체지향프로그래밍2", credits: 3, semester: "1-2" },
      { code: "CSE1312", name: "이산구조", credits: 3, semester: "1-2" },
      { code: "CSE2112", name: "자료구조", credits: 4, semester: "2-1" },
      { code: "CSE4205", name: "컴퓨터공학 종합설계", credits: 3, semester: "4-1,2" },
      { code: "MTH1901", name: "일반수학1", credits: 3, semester: "1-1" },
      { code: "MTH1902", name: "일반수학2", credits: 3, semester: "1-2" },
    ],
    generalEducation: {
      basic: [
        { code: "GEB1117", name: "커리어 디자인 1", credits: 2, semester: "1-1" },
        { code: "GEB1126", name: "문제해결을 위한 글쓰기", credits: 3, semester: "1-1" },
        { code: "GEB1143", name: "미래사회와 소프트웨어-IT계열", credits: 3, semester: "1-2" },
        { code: "GEB1151", name: "커리어 디자인 2", credits: 1, semester: "3-1" },
        { name: "의사소통 영어 (택1)", credits: 3, semester: "1-2", options: ["GEB1107", "GEB1108", "GEB1109"] },
      ],
      core: [
        { code: "GEB1112", name: "크로스오버1: 인간의 탐색", credits: 2, semester: "1-1" },
        { code: "GEB1114", name: "크로스오버3: 사회의 탐색", credits: 2, semester: "1-1,2" },
      ],
      majorRequired: {
        coreAreas: 4,
        creative: 3,
        swAi: 3,
      },
    },
  },
}
