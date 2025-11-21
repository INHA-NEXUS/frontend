# API 명세서

## 목차
1. [인증 (Authentication)](#1-인증-authentication)
2. [프로필 (Profile)](#2-프로필-profile)
3. [학과 (Department)](#3-학과-department)
4. [졸업 요건 (Graduation Rules)](#4-졸업-요건-graduation-rules)
5. [과목 (Course)](#5-과목-course)
6. [수강 이력 (Taken Courses)](#6-수강-이력-taken-courses)
7. [진행 상황 분석 (Analytics)](#7-진행-상황-분석-analytics)

---

## 공통 사항

### Base URL
```
https://api.inha-graduation.com/v1
```

### 인증
- 인증 방식: JWT (JSON Web Token)
- Header: `Authorization: Bearer {token}`

### 응답 형식
```json
{
  "success": true,
  "data": {},
  "message": "Success"
}
```

### 에러 응답
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

### HTTP 상태 코드
- `200 OK`: 성공
- `201 Created`: 리소스 생성 성공
- `400 Bad Request`: 잘못된 요청
- `401 Unauthorized`: 인증 실패
- `403 Forbidden`: 권한 없음
- `404 Not Found`: 리소스 없음
- `500 Internal Server Error`: 서버 오류

---

## 1. 인증 (Authentication)

### 1.1 회원가입
사용자 계정을 생성합니다.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "email": "student@inha.ac.kr",
  "password": "securePassword123!",
  "passwordConfirm": "securePassword123!"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "user": {
      "userId": 1,
      "email": "student@inha.ac.kr",
      "createdAt": "2025-01-15T10:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Registration successful"
}
```

---

### 1.2 로그인
사용자 인증 후 JWT 토큰을 발급합니다.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "student@inha.ac.kr",
  "password": "securePassword123!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "userId": 1,
      "email": "student@inha.ac.kr"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

---

### 1.3 로그아웃
사용자 세션을 종료합니다.

**Endpoint:** `POST /auth/logout`

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### 1.4 토큰 갱신
만료된 토큰을 갱신합니다.

**Endpoint:** `POST /auth/refresh`

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 2. 프로필 (Profile)

### 2.1 프로필 생성
사용자의 학적 프로필을 생성합니다.

**Endpoint:** `POST /profile`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "departmentId": 1,
  "entryYear": 2023,
  "majorType": "단일전공",
  "status": "재학",
  "doubleMajorDepartmentId": null,
  "minorDepartmentId": null,
  "englishScoreObtained": false
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "profileId": 1,
    "userId": 1,
    "department": {
      "departmentId": 1,
      "name": "컴퓨터공학과"
    },
    "entryYear": 2023,
    "majorType": "단일전공",
    "status": "재학",
    "englishScoreObtained": false,
    "createdAt": "2025-01-15T10:00:00Z"
  }
}
```

---

### 2.2 프로필 조회
현재 사용자의 프로필을 조회합니다.

**Endpoint:** `GET /profile`

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "profileId": 1,
    "userId": 1,
    "department": {
      "departmentId": 1,
      "name": "컴퓨터공학과"
    },
    "entryYear": 2023,
    "majorType": "단일전공",
    "status": "재학",
    "englishScoreObtained": false,
    "doubleMajorDepartment": null,
    "minorDepartment": null,
    "createdAt": "2025-01-15T10:00:00Z",
    "updatedAt": "2025-01-15T10:00:00Z"
  }
}
```

---

### 2.3 프로필 수정
사용자의 프로필 정보를 수정합니다.

**Endpoint:** `PUT /profile`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "status": "휴학",
  "englishScoreObtained": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "profileId": 1,
    "userId": 1,
    "department": {
      "departmentId": 1,
      "name": "컴퓨터공학과"
    },
    "entryYear": 2023,
    "majorType": "단일전공",
    "status": "휴학",
    "englishScoreObtained": true,
    "updatedAt": "2025-01-16T10:00:00Z"
  }
}
```

---

### 2.4 프로필 삭제
사용자의 프로필을 삭제합니다.

**Endpoint:** `DELETE /profile`

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile deleted successfully"
}
```

---

## 3. 학과 (Department)

### 3.1 학과 목록 조회
모든 학과 목록을 조회합니다.

**Endpoint:** `GET /departments`

**Query Parameters:**
- `search` (optional): 학과명 검색어
- `page` (optional): 페이지 번호 (default: 1)
- `limit` (optional): 페이지 크기 (default: 20)

**Example:** `GET /departments?search=컴퓨터&page=1&limit=10`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "departments": [
      {
        "departmentId": 1,
        "name": "컴퓨터공학과",
        "createdAt": "2025-01-01T00:00:00Z"
      },
      {
        "departmentId": 2,
        "name": "소프트웨어융합공학과",
        "createdAt": "2025-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalCount": 50,
      "limit": 10
    }
  }
}
```

---

### 3.2 학과 상세 조회
특정 학과의 상세 정보를 조회합니다.

**Endpoint:** `GET /departments/{departmentId}`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "departmentId": 1,
    "name": "컴퓨터공학과",
    "createdAt": "2025-01-01T00:00:00Z"
  }
}
```

---

## 4. 졸업 요건 (Graduation Rules)

### 4.1 졸업 요건 조회
사용자의 프로필에 맞는 졸업 요건을 조회합니다.

**Endpoint:** `GET /graduation-rules`

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `departmentId` (optional): 학과 ID (미지정 시 프로필 기준)
- `entryYear` (optional): 입학년도 (미지정 시 프로필 기준)
- `majorType` (optional): 전공 유형 (미지정 시 프로필 기준)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "ruleId": 1,
    "department": {
      "departmentId": 1,
      "name": "컴퓨터공학과"
    },
    "entryYear": 2023,
    "majorType": "단일전공",
    "requirements": {
      "totalRequiredCredits": 130,
      "majorRequiredCredits": 65,
      "liberalArtsCredits": 30,
      "creativityAreaCredits": 4
    },
    "notes": "영어 졸업 인증 필수, 전공필수 과목 모두 이수",
    "createdAt": "2025-01-01T00:00:00Z"
  }
}
```

---

### 4.2 전체 졸업 요건 목록
모든 졸업 요건 목록을 조회합니다 (관리자용).

**Endpoint:** `GET /graduation-rules/all`

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `departmentId` (optional): 학과 ID
- `entryYear` (optional): 입학년도
- `majorType` (optional): 전공 유형

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "rules": [
      {
        "ruleId": 1,
        "department": {
          "departmentId": 1,
          "name": "컴퓨터공학과"
        },
        "entryYear": 2023,
        "majorType": "단일전공",
        "requirements": {
          "totalRequiredCredits": 130,
          "majorRequiredCredits": 65,
          "liberalArtsCredits": 30,
          "creativityAreaCredits": 4
        }
      }
    ]
  }
}
```

---

## 5. 과목 (Course)

### 5.1 과목 목록 조회
과목 목록을 조회합니다.

**Endpoint:** `GET /courses`

**Query Parameters:**
- `search` (optional): 과목명/과목코드 검색어
- `category` (optional): 과목 분류 (전공필수, 전공선택, 교양 등)
- `departmentId` (optional): 학과 ID
- `page` (optional): 페이지 번호
- `limit` (optional): 페이지 크기

**Example:** `GET /courses?search=자료구조&category=전공필수`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "courses": [
      {
        "courseId": 1,
        "courseCode": "CSE2010",
        "name": "자료구조",
        "credits": 3,
        "category": "전공필수",
        "prerequisites": [
          {
            "courseId": 2,
            "courseName": "프로그래밍기초",
            "conditionType": "필수"
          }
        ]
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalCount": 100,
      "limit": 10
    }
  }
}
```

---

### 5.2 과목 상세 조회
특정 과목의 상세 정보를 조회합니다.

**Endpoint:** `GET /courses/{courseId}`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "courseId": 1,
    "courseCode": "CSE2010",
    "name": "자료구조",
    "credits": 3,
    "category": "전공필수",
    "prerequisites": [
      {
        "courseId": 2,
        "courseName": "프로그래밍기초",
        "conditionType": "필수"
      }
    ],
    "requiredBy": [
      {
        "courseId": 3,
        "courseName": "알고리즘",
        "conditionType": "필수"
      }
    ],
    "createdAt": "2025-01-01T00:00:00Z"
  }
}
```

---

## 6. 수강 이력 (Taken Courses)

### 6.1 수강 과목 추가
사용자의 수강 과목을 추가합니다.

**Endpoint:** `POST /taken-courses`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "courseId": 1,
  "semester": "2023-1",
  "grade": "A+",
  "status": "이수완료"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "takenCourseId": 1,
    "userId": 1,
    "course": {
      "courseId": 1,
      "courseCode": "CSE2010",
      "name": "자료구조",
      "credits": 3,
      "category": "전공필수"
    },
    "semester": "2023-1",
    "grade": "A+",
    "status": "이수완료",
    "createdAt": "2025-01-15T10:00:00Z"
  }
}
```

---

### 6.2 수강 과목 목록 조회
사용자의 수강 과목 목록을 조회합니다.

**Endpoint:** `GET /taken-courses`

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `category` (optional): 과목 분류
- `semester` (optional): 학기 (예: "2023-1")
- `status` (optional): 이수 상태

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "takenCourses": [
      {
        "takenCourseId": 1,
        "course": {
          "courseId": 1,
          "courseCode": "CSE2010",
          "name": "자료구조",
          "credits": 3,
          "category": "전공필수"
        },
        "semester": "2023-1",
        "grade": "A+",
        "status": "이수완료",
        "createdAt": "2025-01-15T10:00:00Z"
      }
    ],
    "summary": {
      "totalCredits": 65,
      "majorCredits": 45,
      "liberalArtsCredits": 20,
      "averageGrade": 4.2
    }
  }
}
```

---

### 6.3 수강 과목 수정
수강 과목 정보를 수정합니다.

**Endpoint:** `PUT /taken-courses/{takenCourseId}`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "grade": "A+",
  "status": "이수완료"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "takenCourseId": 1,
    "course": {
      "courseId": 1,
      "name": "자료구조",
      "credits": 3
    },
    "grade": "A+",
    "status": "이수완료",
    "updatedAt": "2025-01-16T10:00:00Z"
  }
}
```

---

### 6.4 수강 과목 삭제
수강 과목을 삭제합니다.

**Endpoint:** `DELETE /taken-courses/{takenCourseId}`

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Taken course deleted successfully"
}
```

---

### 6.5 수강 과목 일괄 등록 (엑셀 업로드)
엑셀 파일을 업로드하여 수강 과목을 일괄 등록합니다.

**Endpoint:** `POST /taken-courses/upload`

**Headers:**
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
- `file`: Excel 파일 (.xlsx, .xls)

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "imported": 45,
    "failed": 2,
    "errors": [
      {
        "row": 12,
        "courseName": "과목A",
        "reason": "과목을 찾을 수 없습니다"
      }
    ]
  },
  "message": "45개 과목이 등록되었습니다"
}
```

---

## 7. 진행 상황 분석 (Analytics)

### 7.1 졸업 요건 달성 현황
사용자의 졸업 요건 달성 현황을 분석합니다.

**Endpoint:** `GET /analytics/graduation-progress`

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "overallProgress": 68.5,
    "categories": {
      "major": {
        "id": "major",
        "name": "전공",
        "required": 65,
        "completed": 48,
        "remaining": 17,
        "progress": 73.8,
        "status": "in_progress",
        "details": {
          "필수": {
            "required": 30,
            "completed": 25,
            "remaining": 5
          },
          "선택": {
            "required": 35,
            "completed": 23,
            "remaining": 12
          }
        }
      },
      "generalEducation": {
        "id": "generalEducation",
        "name": "교양",
        "required": 30,
        "completed": 22,
        "remaining": 8,
        "progress": 73.3,
        "status": "in_progress"
      },
      "extracurricular": {
        "id": "extracurricular",
        "name": "창의영역",
        "required": 4,
        "completed": 4,
        "remaining": 0,
        "progress": 100,
        "status": "completed"
      }
    },
    "summary": {
      "totalRequired": 130,
      "totalCompleted": 89,
      "totalRemaining": 41,
      "completedCategories": 1,
      "totalCategories": 3
    },
    "timeline": {
      "currentSemester": "2025-1",
      "semestersRemaining": 4,
      "averageCreditsPerSemester": 10.25,
      "expectedGraduationDate": "2027-02"
    },
    "additionalRequirements": {
      "englishScore": {
        "required": true,
        "obtained": false,
        "description": "TOEIC 700점 이상"
      },
      "majorRequired": {
        "completed": 25,
        "required": 30,
        "remaining": [
          {
            "courseId": 5,
            "courseName": "운영체제",
            "credits": 3
          }
        ]
      }
    }
  }
}
```

---

### 7.2 학기별 이수 현황
학기별 이수 학점 및 성적을 분석합니다.

**Endpoint:** `GET /analytics/semester-progress`

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "semesters": [
      {
        "semester": "2023-1",
        "totalCredits": 18,
        "majorCredits": 12,
        "liberalArtsCredits": 6,
        "averageGrade": 4.1,
        "courses": [
          {
            "courseName": "자료구조",
            "credits": 3,
            "grade": "A+"
          }
        ]
      }
    ],
    "summary": {
      "totalSemesters": 4,
      "totalCredits": 89,
      "overallAverage": 4.0
    }
  }
}
```

---

### 7.3 추천 수강 과목
다음 학기 추천 수강 과목을 제공합니다.

**Endpoint:** `GET /analytics/recommended-courses`

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `semester` (optional): 대상 학기 (default: 다음 학기)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "semester": "2025-2",
    "recommendations": {
      "required": [
        {
          "courseId": 5,
          "courseCode": "CSE3010",
          "name": "운영체제",
          "credits": 3,
          "category": "전공필수",
          "priority": "high",
          "reason": "전공필수 미이수 과목"
        }
      ],
      "elective": [
        {
          "courseId": 10,
          "courseCode": "CSE4020",
          "name": "인공지능",
          "credits": 3,
          "category": "전공선택",
          "priority": "medium",
          "reason": "인기 전공선택 과목"
        }
      ],
      "liberalArts": [
        {
          "courseId": 50,
          "courseCode": "GEN2020",
          "name": "창의적사고",
          "credits": 3,
          "category": "교양",
          "priority": "medium",
          "reason": "창의영역 학점 부족"
        }
      ]
    },
    "targetCredits": 18,
    "remainingCredits": 41
  }
}
```

---

### 7.4 졸업 가능 여부 확인
현재 상태에서 졸업 가능 여부를 확인합니다.

**Endpoint:** `GET /analytics/graduation-eligibility`

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "eligible": false,
    "overallProgress": 68.5,
    "missingRequirements": [
      {
        "category": "전공",
        "type": "학점",
        "required": 65,
        "completed": 48,
        "remaining": 17
      },
      {
        "category": "교양",
        "type": "학점",
        "required": 30,
        "completed": 22,
        "remaining": 8
      },
      {
        "category": "영어인증",
        "type": "자격",
        "status": "미달성",
        "description": "TOEIC 700점 이상 필요"
      },
      {
        "category": "전공필수",
        "type": "과목",
        "remaining": [
          {
            "courseName": "운영체제",
            "credits": 3
          }
        ]
      }
    ],
    "estimatedGraduationDate": "2027-02",
    "semestersRemaining": 4
  }
}
```

---

## 에러 코드

| 코드 | 설명 |
|------|------|
| `AUTH_001` | 인증 토큰 없음 |
| `AUTH_002` | 유효하지 않은 토큰 |
| `AUTH_003` | 토큰 만료 |
| `AUTH_004` | 이메일 또는 비밀번호 오류 |
| `AUTH_005` | 이미 존재하는 이메일 |
| `PROFILE_001` | 프로필이 존재하지 않음 |
| `PROFILE_002` | 프로필이 이미 존재함 |
| `DEPT_001` | 학과를 찾을 수 없음 |
| `COURSE_001` | 과목을 찾을 수 없음 |
| `COURSE_002` | 선수과목 미이수 |
| `RULE_001` | 졸업 요건을 찾을 수 없음 |
| `TAKEN_001` | 수강 이력을 찾을 수 없음 |
| `TAKEN_002` | 중복 수강 |
| `FILE_001` | 파일 업로드 오류 |
| `FILE_002` | 지원하지 않는 파일 형식 |
| `VALIDATION_001` | 입력 데이터 유효성 검사 실패 |

---

## 버전 관리

### v1.0.0 (2025-01-15)
- 초기 API 설계
- 인증, 프로필, 학과, 졸업 요건, 과목, 수강 이력, 분석 기능

### 향후 계획
- v1.1.0: 알림 기능 추가
- v1.2.0: 학점 계산기 API 추가
- v1.3.0: 소셜 로그인 지원 (Google, Kakao)
- v2.0.0: GraphQL API 지원
