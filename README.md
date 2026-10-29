# Prebot

가천대학교 P-학기 프로젝트의 React + TypeScript + Vite 기반 카페 주문 웹입니다.

## 실행

Node.js 20.19 이상 또는 22.12 이상의 호환 버전에서 실행하세요.

```bash
npm ci
npm run dev
```

## 검증 및 빌드

```bash
npm test
npm run build
npm run preview
```

- `npm test`: 주문 JSON, 메뉴 옵션 검증, 물품 수량 계산 테스트
- `npm run build`: TypeScript 검사 후 `dist/`에 배포 파일 생성
- `npm run preview`: 생성한 배포 파일을 로컬에서 확인

배포할 때는 `npm ci`와 `npm run build`를 실행한 뒤 `dist/`를 배포하세요.
클라이언트 라우팅(`/menu`, `/cart`, `/orders`)을 위해 호스팅 서비스에서
존재하지 않는 경로를 `index.html`로 연결하는 설정이 필요합니다.

## 현재 기능

- 홈, 메뉴 카테고리 및 옵션 선택
- 장바구니 수량 변경·삭제와 주문 확인
- 주문내역 표시와 픽업 완료 주문 삭제
- 브라우저 로컬 저장, 날짜 변경 시 주문내역·주문번호 초기화
- 주문 JSON 및 필요한 물품 수량 계산과 콘솔 출력

현재 주문은 브라우저에 저장됩니다. 실제 서버로 주문을 전송하거나
서버에서 주문 진행 상태를 받아오는 기능은 아직 연결하지 않았습니다.

## 파일 구조

```text
src/
  components/
    common/     # 공통 버튼, 확인·알림 모달
    layout/     # 앱 프레임, 로고 헤더, 페이지 본문, 하단 내비게이션
    menu/       # 메뉴 카드, 카테고리, 옵션
    cart/       # 장바구니 항목
    order/      # 주문 진행 상태
  pages/        # 화면별 구성
  store/        # 장바구니·주문 상태 및 로컬 저장
  services/     # 주문 검증, JSON 생성, 물품 계산
  data/         # 메뉴 데이터
  types/        # 공통 타입
  styles/       # 전역 스타일
  router/       # 화면 경로
public/images/  # 로고, 홈 배경, 메뉴 이미지
tests/          # 주문 관련 테스트
docs/           # 개발 요구사항 및 이전 단계 변경 기록
```

`AppShell`이 하단 내비게이션을 관리합니다. 메뉴·장바구니·주문내역은
`PageContent`로 헤더와 스크롤 영역을 공유하며, 홈은 이미지 배치를 유지합니다.
색상과 디자인 설정은 `tailwind.config.ts`, 내비게이션 높이는
`src/styles/globals.css`의 `--bottom-nav-height`에서 관리합니다.

## Git 관리

`node_modules/`, `dist/`, TypeScript 빌드 캐시와 자동 생성 설정 파일은
Git에 포함하지 않습니다. 원본 이미지와 `package-lock.json`은 유지합니다.

이전 개발 문서는 [docs](./docs)에 보관했습니다.
