# Backslash2

Backslash2는 웹 브라우징 경험을 향상시키기 위한 Chrome 확장 프로그램입니다. 이 확장 프로그램은 특정 웹사이트에서 유용한 기능을 제공하며, Firebase를 통한 사용자 인증 및 데이터 저장 기능을 포함하고 있습니다.

## 주요 기능

### 쿠팡 검색 단축키
- 쿠팡 웹사이트에서 '/' 키를 누르면 검색창으로 즉시 포커스가 이동합니다.
- 빠르게 상품을 검색할 수 있어 쇼핑 경험이 향상됩니다.

### 사커라인 키워드 트래커
- 사커라인 웹사이트의 게시판에서 특정 키워드(닉네임)가 있는 게시물에 메모를 표시합니다.
- 중요한 사용자나 관심 있는 키워드를 쉽게 식별할 수 있습니다.

### 사용자 인증
- Firebase 인증을 통해 사용자 로그인 및 회원가입 기능을 제공합니다.
- 사용자별 설정 및 데이터 저장이 가능합니다.

### 키워드 관리
- 사용자가 관심 있는 키워드를 저장하고 관리할 수 있습니다.
- Firebase Firestore를 통해 키워드 데이터를 클라우드에 저장합니다.

## 기술 스택

- **프레임워크**: [Plasmo](https://docs.plasmo.com/)
- **언어**: TypeScript, React
- **스타일링**: TailwindCSS
- **백엔드**: Firebase (Authentication, Firestore)
- **상태 관리**: Zustand
- **폼 관리**: React Hook Form, Zod

## 시작하기

### 개발 환경 설정

1. 저장소 클론
```bash
git clone [repository-url]
cd backslash2
```

2. 의존성 설치
```bash
pnpm install
# 또는
npm install
```

3. 개발 서버 실행
```bash
pnpm dev
# 또는
npm run dev
```

4. 브라우저에서 개발 빌드 로드
Chrome 브라우저를 열고 `chrome://extensions/`로 이동한 후 '개발자 모드'를 활성화합니다. '압축해제된 확장 프로그램 로드'를 클릭하고 `build/chrome-mv3-dev` 디렉토리를 선택합니다.

### 프로덕션 빌드 생성

```bash
pnpm build
# 또는
npm run build
```

이 명령은 확장 프로그램의 프로덕션 번들을 생성하며, 스토어에 게시할 준비가 됩니다.

## 프로젝트 구조

```
backslash2/
├── assets/                # 아이콘 및 이미지 파일
├── src/
│   ├── background.ts      # 백그라운드 스크립트
│   ├── content.ts         # 콘텐츠 스크립트
│   ├── options.tsx        # 옵션 페이지
│   ├── background/        # 백그라운드 관련 기능
│   ├── components/        # 재사용 가능한 UI 컴포넌트
│   ├── content/           # 콘텐츠 스크립트 관련 기능
│   ├── features/          # 주요 기능 구현
│   ├── firebase/          # Firebase 통합
│   ├── hooks/             # 커스텀 React 훅
│   ├── lib/               # 유틸리티 함수
│   ├── popup/             # 팝업 UI 관련 파일
│   └── styles/            # 글로벌 스타일
└── ...
```

## 웹스토어 배포

Plasmo 확장 프로그램을 웹스토어에 배포하는 가장 쉬운 방법은 내장된 [bpp](https://bpp.browser.market) GitHub 액션을 사용하는 것입니다. 이 액션을 사용하기 전에 확장 프로그램을 빌드하고 첫 번째 버전을 스토어에 업로드하여 기본 자격 증명을 설정해야 합니다. 그런 다음 [설정 지침](https://docs.plasmo.com/framework/workflows/submit)을 따라 자동화된 제출을 위한 준비를 할 수 있습니다.

## 라이선스

이 프로젝트는 [라이선스 이름] 라이선스 하에 배포됩니다. 자세한 내용은 LICENSE 파일을 참조하세요.

## 제작자

- oeoe.io



## Firebase firestore rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /channels/{document=**} {
      allow write: if request.auth.uid != null;
      allow read: if true;
    }
    match /keywords/{document=**} {
      allow write, read: if request.auth.uid != null;
    }
    match /settings/{document=**} {
      allow write, read: if request.auth.uid != null;
    }
  }
}

```