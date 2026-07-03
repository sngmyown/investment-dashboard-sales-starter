# GitHub 업로드 방법

이 ZIP은 GitHub Pages에서 바로 열리도록 정돈한 버전입니다.

## 업로드할 때

압축을 푼 뒤, 폴더 안의 파일과 폴더를 전부 선택해서 GitHub repository 최상단에 업로드하세요.

최종 repository 첫 화면은 이렇게 보여야 합니다.

```text
index.html
styles.css
app.js
config.js
.nojekyll
README.md
PRODUCT_PAGE_DRAFT.md
DELIVERY_CHECKLIST.md
CSV_FORMATS.md
client-template/
```

주의: `investment-dashboard-github-ready` 폴더 자체를 올리지 말고, 그 안의 내용물을 올리세요.

## GitHub Pages 설정

Repository → Settings → Pages

- Source: Deploy from a branch
- Branch: main
- Folder: /root

배포 주소는 보통 다음 형태입니다.

```text
https://깃허브아이디.github.io/repository이름/
```

이번 버전은 `index.html`이 최상단에 있으므로 `/public-demo/`를 붙이지 않습니다.

## 삭제해도 되는 파일

공개 데모만 필요하면 아래 문서 파일들은 삭제해도 됩니다.

```text
PRODUCT_PAGE_DRAFT.md
DELIVERY_CHECKLIST.md
CSV_FORMATS.md
client-template/
```

단, 아래 4개는 반드시 있어야 합니다.

```text
index.html
styles.css
app.js
config.js
```
