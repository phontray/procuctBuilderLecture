# 인공지능 동물상 테스트 (Animal Face Test)

이 프로젝트는 Google Teachable Machine을 활용하여 사용자의 사진을 분석하고, 강아지상인지 고양이상인지 알려주는 웹 서비스입니다.

## 주요 기능

*   **AI 사진 분석**: 업로드된 사진을 분석하여 동물상 판별.
*   **드래그 앤 드롭 업로드**: 편리한 이미지 업로드 환경 제공.
*   **실시간 결과 확인**: 분석 결과와 확률을 시각적인 바 형태로 제공.
*   **테마 전환**: 라이트 모드와 다크 모드 지원.
*   **반응형 디자인**: 다양한 기기에서 최적화된 화면 제공.

## 기술 스택

*   **Frontend**: HTML5, CSS3, JavaScript (Vanilla JS)
*   **AI Model**: Google Teachable Machine (Image Classification)
*   **Libraries**: TensorFlow.js

## 디자인 요소

*   **컬러**: 깔끔한 Blue-based 포인트 컬러 (`#4dabf7`) 사용.
*   **UI**: 둥근 모서리와 부드러운 그림자 효과로 현대적인 느낌 강조.
*   **애니메이션**: 분석 중 로딩 스피너 및 결과 바 애니메이션 적용.

## 파일 구조

*   `index.html`: 서비스 구조 및 라이브러리 로드.
*   `style.css`: 테마 및 UI 스타일링.
*   `main.js`: AI 모델 로딩, 이미지 처리 및 예측 로직.
