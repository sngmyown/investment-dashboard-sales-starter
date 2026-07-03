# GitHub 업로드 가이드

## 1. 압축 해제

ZIP 파일을 먼저 압축 해제합니다.

## 2. repository 최상단에 올릴 것

압축 해제 후 안에 있는 파일과 폴더를 모두 선택해서 GitHub repository에 업로드합니다.

최종 구조는 이렇게 보여야 합니다.

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

아래처럼 한 단계 더 들어가 있으면 안 됩니다.

```text
repository-root/
└─ investment-dashboard-github-ready/
   └─ index.html
```

## 3. GitHub Pages 설정

Repository에서 다음으로 이동합니다.

```text
Settings → Pages
```

설정값:

```text
Source: Deploy from a branch
Branch: main
Folder: /root
```

## 4. 접속 주소

```text
https://깃허브아이디.github.io/repository이름/
```

이번 버전은 `index.html`이 최상단에 있으므로 `/public-demo/`를 붙이지 않습니다.

## 5. 업로드 후 404가 뜨면

- `index.html`이 repository 최상단에 있는지 확인
- 파일명이 `index (1).html`이 아닌 `index.html`인지 확인
- GitHub Pages가 `main` / `/root`로 설정되어 있는지 확인
- 배포 직후라면 잠시 후 새로고침
