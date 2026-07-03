# CSV 입력 형식

이 대시보드는 CSV의 `accountId` 컬럼으로 3개 계좌를 구분합니다.

## 계좌 ID

| accountId | 의미 |
|---|---|
| `swing` | 스윙 계좌 |
| `long` | 장기투자 계좌 |
| `dividend` | 배당주 투자 계좌 |

고객별 계좌명은 데이터 관리 화면에서 바꿀 수 있지만, CSV의 `accountId`는 위 값을 유지하는 것을 권장합니다.

## 보유 종목 CSV

```csv
accountId,ticker,name,assetClass,market,quantity,avgPrice,currentPrice
swing,AAPL,Apple,미국 개별주,US,10,180,200
long,VOO,Vanguard S&P 500 ETF,미국 ETF,US,5,420,470
dividend,JEPI,JPMorgan Equity Premium Income ETF,커버드콜 ETF,US,20,54,56
```

## 매매 복기 CSV

```csv
accountId,entryDate,exitDate,ticker,strategy,entry,exit,quantity,entryReason,exitReason
swing,2026-01-08,2026-01-19,NVDA,돌파,510.5,548.2,4,실적 이후 신고가 돌파,목표 수익률 도달
```

## 배당·커버드콜 현금흐름 CSV

```csv
accountId,month,ticker,type,gross,tax
dividend,2026-01,JEPI,배당,88.2,13.2
dividend,2026-01,AAPL 200C,옵션 프리미엄,64,0
```

## 주의

- CSV 업로드는 증권사 자동 연동이 아닙니다.
- 고객이 직접 준비한 표 파일을 브라우저에서 불러오는 방식입니다.
- 증권사 계정, 비밀번호, API 키를 요구하지 않습니다.
- 숫자 필드는 쉼표 없이 입력하는 것을 권장합니다. 예: `1850000`
