# 인공지능 동물상 테스트 (Animal Face Test)

이 프로젝트는 Google Teachable Machine을 활용하여 사용자의 사진을 분석하고, 강아지상인지 고양이상인지 알려주는 웹 서비스입니다.

## 주요 기능
*   **AI 사진 분석**: 업로드된 사진을 분석하여 동물상 판별.
*   **제휴 문의**: Formspree를 활용한 이메일 문의 접수 기능.
*   **댓글 서비스**: Disqus를 활용한 사용자 소통 창구.
*   **다크 모드**: 사용자 편의를 위한 테마 전환 기능.

## 기술 스택
*   **Frontend**: HTML5, CSS3, JavaScript (Vanilla JS)
*   **AI Model**: Google Teachable Machine (Image Classification)
    *   Model URL: `https://teachablemachine.withgoogle.com/models/AGonIRDjb/`
*   **External Services**: 
    *   Formspree (Contact Form)
    *   Disqus (Comments)

## 프로젝트 구조
*   `index.html`: 메인 UI 구조 및 라이브러리 로드
*   `style.css`: 디자인 및 레이아웃 (반응형, 다크모드 지원)
*   `main.js`: AI 모델 로딩 및 예측 로직
