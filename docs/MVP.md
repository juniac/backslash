# Backslash2 — MVP Document

## Overview

**Backslash2**는 한국 웹사이트 사용성을 개선하는 Chrome Extension (Manifest V3)이다.  
두 가지 핵심 기능을 제공한다:

1. **Coupang `/` 검색 단축키** — 키보드 `/` 키로 쿠팡 검색창 포커스
2. **Soccerline 키워드 메모** — 사커라인 특정 유저에 메모를 붙이고 DOM에 표시

Firebase 인증/Firestore로 데이터를 영속화하며, 기능은 사용자가 Popup에서 On/Off 토글로 제어한다.

---

## Tech Stack

| Layer | Library / Tool |
|---|---|
| Framework | [Plasmo](https://www.plasmo.com/) 0.90.5 |
| UI | React 18 + Tailwind CSS 3 + Radix UI |
| State | Zustand 5 |
| Forms | React Hook Form 7 |
| Backend | Firebase (Auth, Firestore) |
| Language | TypeScript 5.3 |

---

## Feature 1: Coupang Search Focus Helper

### 목적

쿠팡을 키보드로 탐색할 때 마우스 없이 `/` 키 하나로 즉시 검색창에 포커스한다.

### 동작 흐름

```
사용자가 www.coupang.com 접속
        ↓
content script (soccerline.ts) 실행
        ↓
background에 getSetting 메시지 전송
        ↓
Firestore settings/{uid} 조회
        ↓
coupangSearchFocusHelperEnabled === true 이면
        ↓
activateSlashKeyOnCoupang() 호출
        ↓
document keydown 리스너 등록
        ↓
사용자가 '/' 입력
        ↓
querySelector("form#wa-search-form input[name='q']").focus()
e.preventDefault()
```

### 핵심 코드

**`src/content/coupang.ts`**

```typescript
export function activateSlashKeyOnCoupang() {
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "/") {
      const searchInput = document.querySelector(
        "form#wa-search-form input[name='q']"
      ) as HTMLInputElement
      searchInput?.focus()
      e.preventDefault()
    }
  })
}
```

### 조건

- 호스트: `www.coupang.com`
- 설정: `coupangSearchFocusHelperEnabled === true`
- 대상 selector: `form#wa-search-form input[name='q']`

---

## Feature 2: Soccerline Keyword Memo System

### 목적

사커라인(soccerline.kr) 게시판에서 특정 유저에 메모를 기록하고, 이후 해당 유저의 글/댓글 옆에 노란색 뱃지로 자동 표시한다.

### 구성 요소

| 파일 | 역할 |
|---|---|
| `src/contents/soccerline.ts` | Content script 진입점, 기능 라우팅 |
| `src/contents/soccerline-memo-form.tsx` | React Shadow DOM 오버레이 (메모 입력 UI) |
| `src/content/tracker.ts` | DOM 조작 — 메모 뱃지 렌더링 |
| `src/background/messages/saveKeyword.ts` | Firestore 저장 핸들러 |
| `src/background/messages/getKeyword.ts` | Firestore 조회 핸들러 |
| `src/background/messages/deleteKeyword.ts` | Firestore 삭제 핸들러 |

---

### 2-1. 메모 저장 흐름

```
사용자가 페이지에서 텍스트 선택 (예: "john(user123)")
        ↓
soccerline-memo-form.tsx 오버레이에서 "유저 선택" 버튼 클릭
        ↓
window.getSelection()으로 선택 텍스트 캡처
        ↓
extractKeyword() 정규식 파싱
  패턴 1: "nickname(userId, extra)" → { name, id }
  패턴 2: "nickname(userId)"       → { name, id }
  Fallback: 전체 문자열을 nickname으로
        ↓
사용자가 메모 입력 후 "저장" 클릭
        ↓
sendToBackground("saveKeyword", { host, userId, nickname, memo })
        ↓
Firestore: keywords/{uid}/soccerline.kr/{userId} 에 setDoc()
```

---

### 2-2. 메모 표시 흐름

```
사용자가 soccerline.kr/board 로드
        ↓
soccerline.ts content script 실행
        ↓
sendToBackground("getKeyword", { host: "soccerline.kr" })
        ↓
Firestore: collection(db, "keywords/{uid}/soccerline.kr") 조회
        ↓
키워드 배열 반환
        ↓
activateKeywordTrackerOnSoccerline(keywords) 호출
        ↓
pathname 분기:
  /board (목록) → querySelectorAll("#boardListContainer table tr td:nth-child(3)")
  /board/view  → 작성자 span + 댓글 a.btnUser 조회
        ↓
각 nickname 엘리먼트에서 키워드 매칭
        ↓
매칭 시 showKeywordMemo(element, memoText) 호출
        ↓
노란 뱃지 (#fff094) DOM에 append
```

---

### 2-3. 메모 UI 오버레이 (`soccerline-memo-form.tsx`)

- **위치**: 페이지 우측 상단 fixed 위치 (Shadow DOM 격리)
- **기능**:
  - 텍스트 선택으로 유저 지정
  - 메모 텍스트 입력
  - 저장 / 삭제 버튼
  - 저장/삭제 중 loading 상태 표시
- **Shadow DOM CSS**: Tailwind의 `rem` 단위를 `px`로 변환, `:root` → `:host(csui)` 치환

---

### 2-4. DOM Selectors (사커라인 의존)

| 위치 | Selector |
|---|---|
| 게시판 목록 닉네임 | `#boardListContainer table tr td:nth-child(3)` |
| 게시글 작성자 ID | `#container div.writerBox > ul > li:nth-child(1) > div > span` |
| 댓글 작성자 | `#board-view-comment-list h2.userId a.btnUser` |

> 사커라인 HTML 구조 변경 시 selectors 수정 필요.

---

## Firestore 데이터 구조

```
firestore/
  settings/
    {uid}/
      coupangSearchFocusHelperEnabled: boolean
      soccerlineKeywordLoggerEnabled:  boolean

  keywords/
    {uid}/
      soccerline.kr/
        {targetUserId}/
          host:     string   // "soccerline.kr"
          userId:   string   // 사커라인 유저 ID
          nickname: string   // 닉네임
          memo:     string   // 사용자 메모
```

---

## Message Passing

Content script ↔ Background 통신은 `@plasmohq/messaging` 사용.

| 메시지 | 방향 | 설명 |
|---|---|---|
| `getSetting` | content → background | 사용자 설정 조회 |
| `getKeyword` | content → background | 저장된 키워드 목록 조회 |
| `saveKeyword` | content → background | 키워드/메모 저장 |
| `deleteKeyword` | content → background | 키워드 삭제 |
| `getAuth` | popup → background | 현재 로그인 상태 조회 |
| `saveAuth` | popup → background | 이메일/패스워드 로그인 |
| `removeAuth` | popup → background | 로그아웃 |

---

## Popup UI

```
/ (Home)
  └─ 로그인 상태이면 Options 컴포넌트 표시
       ├─ 쿠팡 검색 포커스 Helper ON/OFF Switch
       └─ 사커라인 키워드 로거 ON/OFF Switch

/sign-in   → 이메일/패스워드 로그인
/sign-up   → 회원가입
/settings  → (미구현 placeholder)
```

---

## 미구현 / 개선 필요 사항

| 항목 | 상태 | 비고 |
|---|---|---|
| 회원가입 (`sign-up.tsx`) | 미완성 | `onLogin` 참조 오류, 스타일 불일치 |
| Settings 라우트 | 빈 placeholder | UI 없음 |
| Google OAuth | 설정만 존재 | UI 미구현 |
| `useKeyword.getKeywords()` | 미완성 | 컬렉션 대신 단일 doc 조회 |
| 메모 삭제 확인 다이얼로그 | 없음 | 즉시 삭제됨 |
| 입력 유효성 검사 | 미완성 | Zod 스키마 주석처리됨 |
| 로그인 폼 하드코딩된 이메일 | 남아있음 | `juniac@naver.com` 제거 필요 |
