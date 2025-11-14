export interface Department {
  college: string
  name: string
  major: string
  url?: string
}

export const departments: Department[] = [
  // 공과대학
  { college: "공과대학", name: "기계공학과", major: "기계공학", url: "https://mech.inha.ac.kr/mech/1828/subview.do" },
  {
    college: "공과대학",
    name: "항공우주공학과",
    major: "항공우주공학",
    url: "https://aerospace.inha.ac.kr/aerospace/9840/subview.do",
  },
  { college: "공과대학", name: "항공우주공학과", major: "항공드론" },
  {
    college: "공과대학",
    name: "조선해양공학과",
    major: "조선해양공학",
    url: "https://naoe.inha.ac.kr/naoe/1853/subview.do",
  },
  {
    college: "공과대학",
    name: "조선해양공학과",
    major: "산업경영공학",
    url: "https://ie.inha.ac.kr/ie/974/subview.do",
  },
  {
    college: "공과대학",
    name: "화학공학과",
    major: "화학공학",
    url: "https://chemeng.inha.ac.kr/chemeng/2214/subview.do",
  },
  {
    college: "공과대학",
    name: "고분자공학과",
    major: "고분자공학",
    url: "https://inhapoly.inha.ac.kr/inhapoly/2317/subview.do",
  },
  {
    college: "공과대학",
    name: "신소재공학과",
    major: "신소재공학",
    url: "https://dmse.inha.ac.kr/dmse/2093/subview.do",
  },
  {
    college: "공과대학",
    name: "사회인프라공학과",
    major: "사회인프라공학",
    url: "https://civil.inha.ac.kr/civil/2371/subview.do",
  },
  {
    college: "공과대학",
    name: "환경공학과",
    major: "환경공학",
    url: "https://environment.inha.ac.kr/environment/2535/subview.do",
  },
  {
    college: "공과대학",
    name: "공간정보공학과",
    major: "공간정보공학",
    url: "https://geoinfo.inha.ac.kr/geoinfo/2669/subview.do",
  },
  { college: "공과대학", name: "건축학부", major: "건축공학", url: "https://arch.inha.ac.kr/arch/2173/subview.do" },
  { college: "공과대학", name: "건축학부", major: "건축학", url: "https://arch.inha.ac.kr/arch/2177/subview.do" },
  {
    college: "공과대학",
    name: "에너지자원공학과",
    major: "에너지자원공학",
    url: "https://eneres.inha.ac.kr/eneres/3427/subview.do",
  },
  {
    college: "공과대학",
    name: "전기전자공학부",
    major: "전기전자공학",
    url: "https://eee.inha.ac.kr/eee/16355/subview.do",
  },
  {
    college: "공과대학",
    name: "전기전자공학부",
    major: "인공지능반도체공학",
    url: "https://eee.inha.ac.kr/eee/16355/subview.do",
  },
  {
    college: "공과대학",
    name: "이차전지융합학과",
    major: "이차전지융합학",
    url: "https://ibattery.inha.ac.kr/ibattery/16257/subview.do",
  },
  {
    college: "공과대학",
    name: "이차전지융합학과",
    major: "특성화이차전지공학",
    url: "https://ibattery.inha.ac.kr/ibattery/16257/subview.do",
  },
  { college: "공과대학", name: "이차전지융합학과", major: "첨단이차전지공학" },
  { college: "공과대학", name: "공과대학(FVE)", major: "미래자동차공학" },
  {
    college: "공과대학",
    name: "반도체시스템공학과",
    major: "반도체시스템공학",
    url: "https://sse.inha.ac.kr/sse/14925/subview.do",
  },

  // 자연과학대학
  { college: "자연과학대학", name: "수학과", major: "수학", url: "https://math.inha.ac.kr/math/3519/subview.do" },
  {
    college: "자연과학대학",
    name: "통계학과",
    major: "통계학",
    url: "https://statistics.inha.ac.kr/statistics/3401/subview.do",
  },
  {
    college: "자연과학대학",
    name: "물리학과",
    major: "물리학",
    url: "https://physics.inha.ac.kr/physics/3927/subview.do",
  },
  {
    college: "자연과학대학",
    name: "화학과",
    major: "화학",
    url: "https://chemistry.inha.ac.kr/chemistry/3292/subview.do",
  },
  {
    college: "자연과학대학",
    name: "해양과학과",
    major: "해양과학",
    url: "http://www.wdn.co.kr/html/info02.php?ptype=view&idx=6828&page=2&code=info02",
  },
  {
    college: "자연과학대학",
    name: "식품영양학과",
    major: "식품영양학",
    url: "https://foodnutri.inha.ac.kr/foodnutri/3562/subview.do",
  },

  // 경영대학
  {
    college: "경영대학",
    name: "경영학부 경영학과",
    major: "경영학",
    url: "https://biz.inha.ac.kr/biz/4427/subview.do",
  },
  {
    college: "경영대학",
    name: "경영학부 파이낸스경영학과",
    major: "파이낸스경영학",
    url: "https://gfiba.inha.ac.kr/gfiba/4888/subview.do",
  },
  {
    college: "경영대학",
    name: "아태물류학부",
    major: "물류학",
    url: "https://apsl.inha.ac.kr/logistics/4459/subview.do",
  },
  {
    college: "경영대학",
    name: "국제통상학과",
    major: "국제통상학",
    url: "https://star.inha.ac.kr/star/4273/subview.do",
  },

  // 사범대학
  {
    college: "사범대학",
    name: "국어교육과",
    major: "국어교육",
    url: "https://koreanedu.inha.ac.kr/koreanedu/4135/subview.do",
  },
  { college: "사범대학", name: "영어교육과", major: "영어교육", url: "https://dele.inha.ac.kr/dele/4826/subview.do" },
  {
    college: "사범대학",
    name: "사회교육과",
    major: "사회교육",
    url: "https://socialedu.inha.ac.kr/socialedu/4096/subview.do",
  },
  {
    college: "사범대학",
    name: "체육교육과",
    major: "체육교육",
    url: "https://physicaledu.inha.ac.kr/physicaledu/4663/subview.do",
  },
  {
    college: "사범대학",
    name: "교육학과",
    major: "교육학",
    url: "https://education.inha.ac.kr/education/4221/subview.do",
  },
  {
    college: "사범대학",
    name: "수학교육과",
    major: "수학교육",
    url: "https://mathed.inha.ac.kr/mathed/4173/subview.do",
  },

  // 사회과학대학
  {
    college: "사회과학대학",
    name: "행정학과",
    major: "행정학",
    url: "https://publicad.inha.ac.kr/publicad/7680/subview.do",
  },
  {
    college: "사회과학대학",
    name: "정치외교학과",
    major: "정치외교학",
    url: "https://political.inha.ac.kr/political/7739/subview.do",
  },
  { college: "사회과학대학", name: "정치외교학과", major: "기후위기대응" },
  { college: "사회과학대학", name: "경제학과", major: "경제학", url: "https://econ.inha.ac.kr/econ/5069/subview.do" },
  {
    college: "사회과학대학",
    name: "소비자학과",
    major: "소비자학",
    url: "https://consumer.inha.ac.kr/consumer/7224/subview.do",
  },
  {
    college: "사회과학대학",
    name: "아동심리학과",
    major: "아동심리학",
    url: "https://child.inha.ac.kr/child/7482/subview.do",
  },
  {
    college: "사회과학대학",
    name: "사회복지학과",
    major: "사회복지학",
    url: "https://welfare.inha.ac.kr/welfare/7797/subview.do",
  },
  {
    college: "사회과학대학",
    name: "미디어커뮤니케이션학과",
    major: "미디어커뮤니케이션학",
    url: "https://comm.inha.ac.kr/comm/6352/subview.do",
  },

  // 문과대학
  {
    college: "문과대학",
    name: "한국어문학과",
    major: "한국어문학",
    url: "https://korean.inha.ac.kr/korean/6772/subview.do",
  },
  { college: "문과대학", name: "사학과", major: "사학", url: "https://history.inha.ac.kr/history/8201/subview.do" },
  {
    college: "문과대학",
    name: "철학과",
    major: "철학",
    url: "https://philosophy.inha.ac.kr/philosophy/7834/subview.do",
  },
  { college: "문과대학", name: "중국학과", major: "중국학", url: "https://chinese.inha.ac.kr/chinese/6577/subview.do" },
  {
    college: "문과대학",
    name: "일본언어문화학과",
    major: "일본언어문화",
    url: "https://japan.inha.ac.kr/japan/8236/subview.do",
  },
  {
    college: "문과대학",
    name: "영미유럽인문융합학부",
    major: "영어영문학",
    url: "https://ees.inha.ac.kr/ees/16857/subview.do",
  },
  {
    college: "문과대학",
    name: "영미유럽인문융합학부",
    major: "영미유럽인문융합학부",
    url: "https://ees.inha.ac.kr/ees/16857/subview.do",
  },
  {
    college: "문과대학",
    name: "영미유럽인문융합학부",
    major: "프랑스언어문화",
    url: "https://ees.inha.ac.kr/ees/16857/subview.do",
  },
  {
    college: "문과대학",
    name: "문화콘텐츠문화경영학과",
    major: "문화콘텐츠문화경영학",
    url: "https://culturecm.inha.ac.kr/culturecm/7895/subview.do",
  },

  // 의과대학
  {
    college: "의과대학",
    name: "의예과",
    major: "의예",
    url: "https://www.inha.ac.kr/sites/kr/files/2024/05-07%20%EC%9D%98%EA%B3%BC%EB%8C%80%ED%95%99.pdf",
  },
  {
    college: "의과대학",
    name: "의학과",
    major: "의학",
    url: "https://www.inha.ac.kr/sites/kr/files/2024/05-07%20%EC%9D%98%EA%B3%BC%EB%8C%80%ED%95%99.pdf",
  },

  // 미래융합대학
  {
    college: "미래융합대학",
    name: "소프트웨어융합공학과",
    major: "소프트웨어융합공학",
    url: "https://fccollege.inha.ac.kr/fccollege/8127/subview.do",
  },
  {
    college: "미래융합대학",
    name: "산업경영학과",
    major: "산업경영학",
    url: "https://fccollege.inha.ac.kr/fccollege/8127/subview.do",
  },
  {
    college: "미래융합대학",
    name: "메카트로닉스공학과",
    major: "메카트로닉스공학",
    url: "https://fccollege.inha.ac.kr/fccollege/8127/subview.do",
  },
  {
    college: "미래융합대학",
    name: "금융투자학과",
    major: "금융투자학",
    url: "https://fccollege.inha.ac.kr/fccollege/8127/subview.do",
  },
  {
    college: "미래융합대학",
    name: "반도체산업융합학과",
    major: "반도체산업융합",
    url: "https://fccollege.inha.ac.kr/fccollege/8127/subview.do",
  },

  // 예술체육대학
  {
    college: "예술체육대학",
    name: "조형예술학과",
    major: "조형예술학",
    url: "https://finearts.inha.ac.kr/finearts/8017/subview.do",
  },
  {
    college: "예술체육대학",
    name: "디자인융합학과",
    major: "디자인융합학",
    url: "https://www.inha.ac.kr/sites/kr/files/2023/05-08%20%EC%98%88%EC%88%A0%EC%B2%B4%EC%9C%A1%EB%8C%80%ED%95%99.pdf",
  },
  {
    college: "예술체육대학",
    name: "스포츠과학과",
    major: "스포츠과학",
    url: "https://sport.inha.ac.kr/sport/9053/subview.do",
  },
  {
    college: "예술체육대학",
    name: "연극영화학과",
    major: "연극영화학",
    url: "https://theatrefilm.inha.ac.kr/theatrefilm/9577/subview.do",
  },
  {
    college: "예술체육대학",
    name: "의류디자인학과",
    major: "의류디자인학",
    url: "https://fashion.inha.ac.kr/fashion/5036/subview.do",
  },

  // 소프트웨어융합대학
  {
    college: "소프트웨어융합대학",
    name: "컴퓨터공학과",
    major: "컴퓨터공학",
    url: "https://cse.inha.ac.kr/cse/879/subview.do",
  },
  {
    college: "소프트웨어융합대학",
    name: "인공지능공학과",
    major: "인공지능공학",
    url: "https://doai.inha.ac.kr/doai/3022/subview.do",
  },
  {
    college: "소프트웨어융합대학",
    name: "데이터사이언스학과",
    major: "데이터사이언스학",
    url: "https://datascience.inha.ac.kr/datascience/3111/subview.do",
  },
  {
    college: "소프트웨어융합대학",
    name: "스마트모빌리티공학과",
    major: "스마트모빌리티공학",
    url: "https://sme.inha.ac.kr/sme/2875/subview.do",
  },
  {
    college: "소프트웨어융합대학",
    name: "디자인테크놀로지학과",
    major: "디자인테크놀로지학",
    url: "https://designtech.inha.ac.kr/designtech/3083/subview.do",
  },
  {
    college: "소프트웨어융합대학",
    name: "소프트웨어융합대학",
    major: "SCSC",
    url: "https://designtech.inha.ac.kr/designtech/3083/subview.do",
  },

  // 국제학부
  {
    college: "국제학부",
    name: "IBT학과",
    major: "국제경영학",
    url: "https://www.inha.ac.kr/sites/kr/files/2021/05-11%20%EA%B5%AD%EC%A0%9C%ED%95%99%EB%B6%80.pdf",
  },
  {
    college: "국제학부",
    name: "ISE학과",
    major: "융합시스템공학",
    url: "https://www.inha.ac.kr/sites/kr/files/2021/05-11%20%EA%B5%AD%EC%A0%9C%ED%95%99%EB%B6%80.pdf",
  },
  {
    college: "국제학부",
    name: "KLC학과",
    major: "국제한국언어문화학",
    url: "https://www.inha.ac.kr/sites/kr/files/2021/05-11%20%EA%B5%AD%EC%A0%9C%ED%95%99%EB%B6%80.pdf",
  },

  // 간호대학
  {
    college: "간호대학",
    name: "간호학과",
    major: "간호학",
    url: "https://www.inha.ac.kr/sites/kr/files/2024/05-07%20%EC%9D%98%EA%B3%BC%EB%8C%80%ED%95%99.pdf",
  },

  // 바이오시스템융합학부
  {
    college: "바이오시스템융합학부",
    name: "생명공학과",
    major: "생명공학",
    url: "https://bio.inha.ac.kr/bio/2420/subview.do",
  },
  {
    college: "바이오시스템융합학부",
    name: "생명공학과",
    major: "AI 바이오공정융합전공",
    url: "https://bio.inha.ac.kr/bio/2420/subview.do",
  },
  {
    college: "바이오시스템융합학부",
    name: "생명과학과",
    major: "생명과학",
    url: "https://biology.inha.ac.kr/biology/3673/subview.do",
  },
  {
    college: "바이오시스템융합학부",
    name: "바이오제약공학과",
    major: "바이오제약공학",
    url: "https://biopharm.inha.ac.kr/biopharm/10324/subview.do",
  },
  {
    college: "바이오시스템융합학부",
    name: "첨단바이오의약학과",
    major: "첨단바이오의약학",
    url: "https://biomedical.inha.ac.kr/biomedical/16171/subview.do",
  },

  // 프런티어창의대학
  {
    college: "프런티어창의대학",
    name: "자유전공융합학부",
    major: "자유전공융합학부",
    url: "https://las.inha.ac.kr/bbs/las/3105/154631/artclView.do",
  },
  {
    college: "프런티어창의대학",
    name: "공학융합학부",
    major: "공학융합학부",
    url: "https://las.inha.ac.kr/bbs/las/3105/154631/artclView.do",
  },
  {
    college: "프런티어창의대학",
    name: "자연과학융합학부",
    major: "자연과학융합학부",
    url: "https://las.inha.ac.kr/bbs/las/3105/154631/artclView.do",
  },
  {
    college: "프런티어창의대학",
    name: "경영융합학부",
    major: "경영융합학부",
    url: "https://las.inha.ac.kr/bbs/las/3105/154631/artclView.do",
  },
  {
    college: "프런티어창의대학",
    name: "사회과학융합학부",
    major: "사회과학융합학부",
    url: "https://las.inha.ac.kr/bbs/las/3105/154631/artclView.do",
  },
  {
    college: "프런티어창의대학",
    name: "인문융합학부",
    major: "인문융합학부",
    url: "https://las.inha.ac.kr/bbs/las/3105/154631/artclView.do",
  },
]

export function getDepartmentDisplay(dept: Department): string {
  return `${dept.name} (${dept.major})`
}

export function searchDepartments(query: string): Department[] {
  if (!query) return departments
  const lowercaseQuery = query.toLowerCase()
  return departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(lowercaseQuery) ||
      dept.major.toLowerCase().includes(lowercaseQuery) ||
      dept.college.toLowerCase().includes(lowercaseQuery),
  )
}
