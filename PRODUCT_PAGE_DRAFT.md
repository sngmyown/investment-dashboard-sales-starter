# CSV 업로드 형식

## 보유 종목 CSV

```csv
account,ticker,name,assetClass,market,quantity,avgPrice,currentPrice
장기투자 계좌,VOO,Vanguard S&P 500 ETF,미국 ETF,US,12,402.5,468.2
```

필수에 가까운 컬럼:

- `account`
- `ticker`
- `name`
- `assetClass`
- `market`
- `quantity`
- `avgPrice`
- `currentPrice`

## 매매 복기 CSV

```csv
entryDate,exitDate,ticker,strategy,entry,exit,quantity,entryReason,exitReason
2026-01-08,2026-01-19,NVDA,돌파,510.5,548.2,4,실적 이후 신고가 돌파,목표 수익률 도달
```

컬럼:

- `entryDate`
- `exitDate`
- `ticker`
- `strategy`
- `entry`
- `exit`
- `quantity`
- `entryReason`
- `exitReason`

## 현금흐름 CSV

```csv
month,account,ticker,type,gross,tax
2026-01,배당·커버드콜,JEPI,배당,88.2,13.2
```

컬럼:

- `month`
- `account`
- `ticker`
- `type`
- `gross`
- `tax`
