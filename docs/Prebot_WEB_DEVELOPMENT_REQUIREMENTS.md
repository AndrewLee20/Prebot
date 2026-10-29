# Prebot 주문 웹 개발 요구사항

## 1. 개발 목표

Prebot 주문 웹은 사용자가 스마트폰 또는 PC에서 접속하여 카페 메뉴를
주문할 수 있도록 구현한다.

사용자가 주문을 완료하면 주문 정보를 정해진 JSON 형식으로 생성하고, 이후
백엔드 및 Raspberry Pi와 연동할 수 있도록 구조를 설계한다.

초기 개발 단계에서는 Raspberry Pi 및 로봇 시스템과 직접 연결하지 않고
주문 웹 자체를 먼저 완성한다.

## 2. 기본 개발 환경

-   React
-   Vite
-   Tailwind CSS
-   JavaScript 또는 TypeScript
-   반응형 웹 방식으로 구현

Astryx와 같은 완성형 UI 디자인 시스템은 사용하지 않는다.

UI 컴포넌트는 직접 설계하고 구현하되 Tailwind CSS를 활용하여 스타일링과
반응형 구현의 효율성을 높인다.

## 3. 반응형 웹 구현

Prebot은 스마트폰 주문을 주요 사용 환경으로 고려하여 Mobile First
방식으로 개발한다.

동시에 PC에서 접속했을 때에도 화면 크기에 맞게 자연스럽게 레이아웃이
변경되도록 구현한다.

예:

``` text
grid-cols-2
md:grid-cols-3
lg:grid-cols-4
```

화면 크기에 따라 다음과 같이 변경될 수 있도록 한다.

-   모바일 → 메뉴 2열
-   태블릿 → 메뉴 3열
-   PC → 메뉴 4열

필요한 경우 모바일과 PC에서 일부 UI 구조를 다르게 표시할 수 있다.

예:

``` text
md:hidden
hidden md:flex
```

즉, 사용자가 사용하는 기기의 화면 크기에 따라 UI가 자동으로 적응하도록
구현한다.

## 4. 주문 데이터 구조

웹에서 생성하는 주문 데이터에는 다음 정보를 포함한다.

-   For Here / To Go
-   Menu
-   Temperature
-   Size
-   Quantity

기본 주문 데이터 예시:

``` json
{
  "menu": "Americano",
  "size": "Large",
  "temperature": "ICE",
  "takeout": true,
  "quantity": 1
}
```

필드 의미:

-   `menu` → 주문한 메뉴
-   `size` → Small / Medium / Large
-   `temperature` → ICE / HOT
-   `takeout` → true: To Go / false: For Here
-   `quantity` → 주문 수량

실제 구현 시 값의 표현 방식은 프로젝트 전체에서 일관되게 유지한다.

예를 들어 Size를 사용하는 경우 `Small / Medium / Large` 또는 `S / M / L`
중 하나로 통일한다.

## 5. 주문 웹에서 구현할 기능

### 5.1 매장 / 포장 선택

주문 과정에서 사용자가 다음 중 하나를 선택하도록 한다.

-   For Here
-   To Go

선택 결과는 주문 데이터의 `takeout` 값으로 저장한다.

### 5.2 메뉴 목록

실제 카페 주문 화면처럼 메뉴를 카테고리별로 구분한다.

예:

**Coffee** - Americano - Cafe Latte - Vanilla Latte - Cafe Mocha - ...

**Non-Coffee** - Chocolate - Matcha Latte - ...

**Ade / Beverage** - Lemon Ade - Peach Ade - ...

메뉴 정보는 JSX 내부에 반복해서 직접 작성하기보다는 별도의 데이터
파일에서 관리하는 방향을 우선한다.

``` js
const menu = [
  {
    id: 1,
    name: "Americano",
    category: "Coffee",
    price: 4500
  }
];
```

### 5.3 메뉴 선택

사용자가 원하는 메뉴를 선택할 수 있도록 구현한다.

메뉴 선택 후 해당 메뉴에 대한 옵션 선택 화면 또는 UI로 이동한다.

### 5.4 옵션 선택

메뉴 주문 시 기본적으로 다음 옵션을 선택할 수 있도록 한다.

**Temperature** - ICE - HOT

**Size** - S - M - L

단, 추후에 특정 메뉴가 특정 옵션을 지원하지 않는 상황도 고려할 수 있도록
메뉴 데이터와 옵션 UI를 분리해서 설계한다.

-   아이스 전용 메뉴 → HOT 선택 불가능
-   단일 사이즈 메뉴 → Size 선택 불필요

초기 버전에서는 모든 메뉴에 동일한 옵션을 제공해도 된다.

### 5.5 장바구니

사용자가 선택한 메뉴와 옵션을 장바구니에 추가할 수 있도록 한다.

장바구니에서는 다음 기능을 제공한다.

-   메뉴 확인
-   수량 증가
-   수량 감소
-   메뉴 삭제
-   주문 금액 확인

수량은 최소 1개 이상으로 유지하거나, 1에서 감소할 경우 장바구니에서
삭제되는 방식 중 하나로 구현한다.

### 5.6 주문 / 결제

장바구니의 주문 내용을 확인한 후 주문할 수 있도록 한다.

현재 프로젝트에서는 실제 카드 결제가 핵심 기능이 아니므로 초기
버전에서는 실제 PG 결제 시스템을 구현하지 않는다.

`주문하기` 버튼을 누르면 확인창을 표시하고, 사용자가 주문을 다시
확인하면 바로 주문이 접수되는 방식으로 구현한다.

추후 필요할 경우 결제 기능을 별도로 확장할 수 있도록 주문 로직과 결제
로직은 가능하면 분리한다.

### 5.7 주문 완료

주문이 정상적으로 완료되면 주문 완료 화면을 표시한다.

주문 완료 화면에는 최소한 다음 정보를 표시한다.

``` text
주문 접수 완료

대기번호
#012
```

향후 로봇 시스템과 연결한 뒤에는 다음과 같은 상태 정보도 추가할 수 있다.

``` text
주문 접수
↓
준비 중
↓
준비 완료
```

초기 웹 구현에서는 주문 완료 및 대기번호 출력까지 구현한다.

## 6. 웹의 역할과 로봇의 역할을 명확하게 분리

### 매우 중요한 개발 원칙

웹에서 받는 주문 정보와 로봇에게 필요한 작업 정보를 분리한다.

웹은 사용자의 주문 정보를 수집하는 역할까지만 담당한다.

웹에서 주문 메뉴를 바탕으로 로봇이 어떤 물건을 준비해야 하는지 직접
판단하지 않는다.

### 웹에서 담당할 기능

1.  메뉴 선택
2.  옵션 선택
3.  장바구니 관리
4.  주문
5.  JSON 생성
6.  서버로 주문 데이터 전송

예:

``` json
{
  "menu": "Americano",
  "size": "Large",
  "temperature": "ICE",
  "takeout": true,
  "quantity": 1
}
```

웹에서는 여기까지만 처리한다.

### Backend / Raspberry Pi 측에서 담당할 기능

1.  주문 데이터 수신
2.  주문 정보 해석
3.  필요한 준비물 결정
4.  VLA 작업 수행
5.  MoveIt 2를 통한 로봇 제어
6.  로봇팔 실행

예를 들어 웹으로부터 다음 주문을 받았다고 가정한다.

``` json
{
  "menu": "Americano",
  "size": "Large",
  "temperature": "ICE",
  "takeout": true,
  "quantity": 1
}
```

웹에서는 필요한 준비물을 판단하지 않는다.

Backend 또는 Raspberry Pi에서 이 주문을 다음과 같은 작업 정보로
변환한다.

``` text
Large Cup × 1
Large Lid × 1
Wet Tissue × 1
Americano에 필요한 Straw × 1
```

그 후 이 정보를 로봇 시스템으로 전달한다.

## 7. Prebot이 준비해야 하는 기본 물품

현재 기준으로 주문 1개당 Prebot이 준비할 물품은 다음과 같다.

1.  주문 사이즈에 맞는 컵
2.  주문 사이즈에 맞는 뚜껑
3.  물티슈 1장
4.  메뉴에 맞는 빨대

수량이 여러 개인 경우 주문 수량에 맞게 필요한 물품 수도 증가하도록
Backend 또는 Raspberry Pi에서 처리한다.

예:

``` text
Americano / Large / ICE / Quantity 2

→ Large Cup × 2
→ Large Lid × 2
→ Wet Tissue × 2
→ Straw × 2
```

이 물품 변환 로직은 웹에 포함하지 않는다.

## 8. 프론트엔드 코드 구조

UI와 데이터 처리 로직이 뒤섞이지 않도록 컴포넌트를 분리해서 개발한다.

예시:

``` text
src/
├── components/
│   ├── layout/
│   │   ├── Header
│   │   └── MobileNavigation
│   ├── menu/
│   │   ├── MenuCard
│   │   ├── MenuGrid
│   │   ├── Category
│   │   └── OptionSelector
│   ├── cart/
│   │   ├── CartItem
│   │   └── QuantityControl
│   └── common/
│       └── Button
├── pages/
│   ├── MenuPage
│   ├── MenuDetailPage
│   ├── CartPage
│   └── OrderCompletePage
├── data/
│   └── menu
└── services/
    └── order
```

실제 구현 과정에서 필요에 따라 구조는 변경할 수 있지만, 메뉴 / 장바구니
/ 주문 통신 로직은 최대한 분리한다.

## 9. 공통 컴포넌트 재사용

버튼이나 메뉴 카드 등을 페이지마다 새로 만들지 않는다.

예:

-   Button
-   MenuCard
-   OptionButton
-   QuantityButton
-   CategoryTab
-   CartItem

등을 공통 컴포넌트로 구현하여 반복해서 사용한다.

이를 통해 디자인의 일관성을 유지하면서 코드 중복을 줄인다.

## 10. 주문 서버 통신을 고려한 구조

초기에는 Raspberry Pi를 연결하지 않지만, 추후 서버 연결을 고려하여 주문
기능을 구현한다.

초기 단계:

``` text
사용자 주문
↓
JavaScript Object 생성
↓
console.log()
```

예:

``` js
console.log(order);
```

이 단계에서 주문 데이터가 정확하게 생성되는지 먼저 검증한다.

이후 Backend 구현 후:

``` text
Prebot Web
↓ HTTP POST
Backend
↓
Raspberry Pi
↓
Robot
```

형태로 확장한다.

프론트엔드에서는 향후 다음과 같은 형태로 요청을 보내는 구조를 고려한다.

``` text
POST /api/orders
```

API 요청 코드는 UI 컴포넌트 내부에 여기저기 작성하지 않고 별도의 service
파일로 분리하는 것을 권장한다.

## 11. 주문 여러 개 처리 고려

한 번의 주문에서 여러 메뉴를 주문할 수 있도록 설계한다.

따라서 최종 주문 데이터는 메뉴 하나가 아니라 주문 목록 형태로 확장할 수
있도록 한다.

예:

``` json
{
  "orderType": "takeout",
  "items": [
    {
      "menu": "Americano",
      "size": "Large",
      "temperature": "ICE",
      "quantity": 2
    },
    {
      "menu": "Cafe Latte",
      "size": "Medium",
      "temperature": "HOT",
      "quantity": 1
    }
  ]
}
```

최종 API 구조는 백엔드 구현 시 확정한다.

## 12. 비회원 데이터 유지 및 localStorage

Prebot은 로그인 / 회원가입 없이 사용할 수 있도록 구현한다.

로그인 기능이 없더라도 사용자가 장바구니에 메뉴를 담은 뒤 페이지를
새로고침하거나 다른 화면으로 이동했을 때 장바구니가 초기화되지 않아야
한다.

이를 위해 브라우저의 `localStorage`를 사용한다.

### 12.1 장바구니 유지

장바구니 데이터는 다음 Key로 저장한다.

``` text
prebot_cart
```

장바구니 상태가 변경될 때마다 최신 데이터를 JSON 문자열로 변환하여
`localStorage`에 저장한다.

``` js
localStorage.setItem("prebot_cart", JSON.stringify(cartItems));
```

페이지가 처음 실행될 때 저장된 장바구니가 존재하면 이를 읽어 React
장바구니 상태를 복원한다.

따라서 다음 흐름을 지원해야 한다.

``` text
장바구니에 메뉴 추가
↓
localStorage 저장
↓
페이지 새로고침
↓
저장된 데이터 불러오기
↓
기존 장바구니 복원
```

장바구니는 단순 새로고침으로 초기화하지 않는다.

장바구니에서 사용자가 직접 항목을 삭제하거나 최종 주문이 정상적으로
확정된 경우에만 해당 데이터를 갱신 또는 초기화한다.

주문 확정 후에는 다음과 같이 장바구니 저장 데이터를 삭제할 수 있다.

``` js
localStorage.removeItem("prebot_cart");
```

### 12.2 비회원 브라우저 식별

로그인 없이 동일 브라우저에서 생성한 주문을 구분할 수 있도록 임시 비회원
식별자를 사용할 수 있다.

저장 Key:

``` text
prebot_session_id
```

최초 접속 시 식별자가 존재하지 않는 경우 UUID 등을 생성하여
`localStorage`에 저장한다.

``` js
let sessionId = localStorage.getItem("prebot_session_id");

if (!sessionId) {
  sessionId = crypto.randomUUID();
  localStorage.setItem("prebot_session_id", sessionId);
}
```

추후 Backend 연결 시 이 값을 비회원 주문 식별 용도로 활용할 수 있다.

### 12.3 현재 주문 정보 유지

주문 확정 후 주문 완료 화면 또는 주문내역 화면에서도 새로고침으로 주문
정보가 사라지지 않도록 현재 주문 정보를 `localStorage`에 저장할 수
있도록 설계한다.

권장 Key:

``` text
prebot_current_order
```

예:

``` json
{
  "id": "order-001",
  "orderNumber": 12,
  "status": "RECEIVED",
  "items": [],
  "totalPrice": 8500,
  "createdAt": "..."
}
```

따라서 주문 확정 시 기본 흐름은 다음과 같다.

``` text
주문 확정
↓
주문 데이터 생성
↓
prebot_current_order 저장
↓
prebot_cart 초기화
↓
주문 완료 / 주문내역 화면 이동
```

### 12.4 React State와 localStorage 역할 분리

`localStorage`를 UI 상태 자체로 직접 사용하는 것이 아니라 React State와
역할을 분리한다.

``` text
React State
→ 현재 화면에서 사용하는 실시간 상태

localStorage
→ 새로고침 이후에도 유지하기 위한 브라우저 저장소
```

페이지 최초 실행 시 `localStorage`에서 데이터를 읽어 React State를
초기화하고, 상태가 변경되면 다시 `localStorage`와 동기화하는 방식으로
구현한다.

### 12.5 localStorage Key 규칙

Prebot 관련 저장 데이터는 `prebot_` prefix를 사용한다.

``` text
prebot_session_id
prebot_cart
prebot_current_order
```

추후 주문내역 전체를 브라우저에 보관할 필요가 있다면 다음과 같이 확장할
수 있다.

``` text
prebot_order_history
```

현재 프론트엔드 단계에서는 `localStorage`를 사용하지만, Backend 연결
이후 주문 상태 및 주문내역의 최종 기준 데이터는 서버에서 관리하도록
확장한다.

## 13. 현재 개발 우선순위

### 1단계 --- 주문 웹 UI

``` text
매장 / 포장
↓
메뉴 목록
↓
메뉴 선택
↓
옵션 선택
↓
장바구니
↓
주문
↓
주문 완료
```

### 2단계 --- 주문 데이터 처리

``` text
사용자의 선택값 저장
↓
장바구니 데이터 생성
↓
최종 주문 JSON 생성
```

### 3단계 --- Backend 연결

``` text
React
↓
FastAPI
```

웹에서 생성한 주문 JSON이 정상적으로 서버에 전달되는지 확인한다.

### 4단계 --- Raspberry Pi 연결

``` text
React Web
↓
Backend
↓
Raspberry Pi
```

### 5단계 --- 로봇 시스템 연결

``` text
주문 데이터
↓
필요 물품 판단
↓
VLA
↓
MoveIt 2
↓
Robot Arm
```

## 14. 개발하면서 반드시 유지해야 할 핵심 원칙

### ① Mobile First + Responsive Web

스마트폰을 주 사용 환경으로 개발하되 PC에서도 자연스럽게 사용할 수
있도록 한다.

### ② UI 직접 구현

완성형 디자인 시스템에 의존하지 않고 React 컴포넌트를 직접 설계한다.

### ③ Tailwind는 스타일링 도구로 활용

Tailwind는 디자인을 대신하는 것이 아니라 직접 만든 UI를 빠르고 일관되게
구현하기 위한 도구로 사용한다.

### ④ 데이터와 UI 분리

메뉴 정보를 JSX에 반복해서 작성하지 않고 별도의 데이터 형태로 관리한다.

### ⑤ 컴포넌트 재사용

반복되는 UI는 공통 React 컴포넌트로 만든다.

### ⑥ 웹과 로봇의 책임 분리

웹에서는 주문 정보만 생성한다.

필요 준비물 판단은 Backend / Raspberry Pi에서 담당한다.

### ⑦ Raspberry Pi 연결은 웹 구현 후 진행

처음부터 전체 시스템을 한 번에 구현하지 않는다.

``` text
웹 완성
→ 주문 JSON 생성
→ Backend
→ Raspberry Pi
→ Robot
```

순서로 단계적으로 연결한다.

### ⑧ 이후 시스템 확장을 고려한 코드 작성

현재는 프로젝트 시연용이라도 주문 Queue, 주문 상태, 실제 Raspberry Pi
연결 등을 나중에 추가할 수 있도록 UI, 데이터, API 로직을 분리해서
구현한다.

### ⑨ 비회원 사용자 데이터 유지

로그인 기능이 없더라도 새로고침으로 장바구니 및 현재 주문이 불필요하게
초기화되지 않도록 한다.

장바구니와 현재 주문은 `localStorage`를 이용해 유지하며, 추후 Backend
연결 후에는 비회원 식별 ID를 이용해 서버 기반 주문 조회 구조로 확장할 수
있도록 설계한다.
