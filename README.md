# 개인투자자용 3계좌 통합 웹 포트폴리오 대시보드

개인투자자에게 고객별 웹 링크로 제공하는 투자 기록·관리용 대시보드 스타터입니다.

## 핵심 구조

- 스윙 계좌
- 장기투자 계좌
- 배당주 투자 계좌
- 보유 종목, 매매 복기, 배당·커버드콜 현금흐름을 계좌별로 입력
- 전체 현황에서 통합 계좌 비중 도넛 차트 제공
- 계좌별 3개 파이/도넛 차트 제공
- 고객 브라우저 localStorage 저장
- CSV 업로드
- 백업 내보내기/가져오기
- 프라이버시 모드
- Premium 옵션용 Sunburst 차트 자리 분리

## GitHub Pages 배포

이 ZIP은 GitHub Pages용으로 정돈되어 있습니다. 압축 해제 후 repository 최상단에 아래 파일들이 바로 보이게 업로드하세요.

```text
index.html
styles.css
app.js
config.js
.nojekyll
README.md
CSV_FORMATS.md
PRODUCT_PAGE_DRAFT.md
DELIVERY_CHECKLIST.md
GITHUB_UPLOAD_GUIDE.md
client-template/
```

GitHub Pages 주소는 다음 형태입니다.

```text
https://깃허브아이디.github.io/repository이름/
```

이번 버전에서는 `/public-demo/`를 붙이지 않습니다.

## 고객 납품용

`client-template/` 폴더 안의 파일을 고객별 repository 최상단에 올리면 됩니다.

고객별로 주로 수정할 파일은 `config.js`입니다.

```js
window.DASHBOARD_CONFIG = {
  title: "고객 전용 3계좌 통합 웹 포트폴리오 대시보드",
  storageKey: "portfolio-dashboard-client-three-accounts-v1",
  accessPassword: "change-this-password",
  enableSunburst: false
};
```

Premium 또는 Private Deploy에서 Sunburst 옵션을 켜려면 다음 값을 `true`로 바꿉니다.

```js
enableSunburst: true
```

## 포지셔닝

이 서비스는 투자 조언, 종목 추천, 매수·매도 신호 제공, 자동매매가 아닙니다.
고객이 직접 입력하거나 업로드한 투자 데이터를 정리하고 시각화하는 기록·관리용 웹 대시보드입니다.

## 프라이버시

기본 구조는 고객 브라우저 localStorage 저장입니다. 운영자 서버에 고객 금융 데이터를 별도로 저장하지 않는 방향으로 설계했습니다.
단, 고객이 화면 캡처, CSV, 백업 파일을 운영자에게 직접 전달하면 해당 내용은 운영자가 볼 수 있습니다.
