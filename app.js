/* 판매형 투자 관리 대시보드 스타터 v2
   - 실제 3계좌 입력/계산/시각화 구조
   - 외부 라이브러리 없음
   - 고객 금융 데이터는 브라우저 localStorage에 저장
   - 증권사 API, 서버 저장, 투자 신호 기능 없음
*/

const ACCOUNT_PRESETS = [
  {
    id: "swing",
    name: "스윙 계좌",
    type: "swing",
    description: "단기 매매와 복기를 분리해서 보는 계좌"
  },
  {
    id: "long",
    name: "장기투자 계좌",
    type: "long",
    description: "목표 비중과 현재 비중을 비교하는 계좌"
  },
  {
    id: "dividend",
    name: "배당주 투자 계좌",
    type: "dividend",
    description: "배당과 커버드콜 현금흐름을 관리하는 계좌"
  }
];

const SAMPLE_DATA = {
  accounts: ACCOUNT_PRESETS,
  holdings: [
    {
      accountId: "swing",
      ticker: "AAPL",
      name: "Apple",
      assetClass: "미국 개별주",
      market: "US",
      quantity: 18,
      avgPrice: 182.1,
      currentPrice: 196.4
    },
    {
      accountId: "swing",
      ticker: "TSLA",
      name: "Tesla",
      assetClass: "미국 개별주",
      market: "US",
      quantity: 8,
      avgPrice: 214,
      currentPrice: 226.5
    },
    {
      accountId: "swing",
      ticker: "NVDA",
      name: "NVIDIA",
      assetClass: "미국 개별주",
      market: "US",
      quantity: 6,
      avgPrice: 510.5,
      currentPrice: 548.2
    },
    {
      accountId: "long",
      ticker: "VOO",
      name: "Vanguard S&P 500 ETF",
      assetClass: "미국 ETF",
      market: "US",
      quantity: 12,
      avgPrice: 402.5,
      currentPrice: 468.2
    },
    {
      accountId: "long",
      ticker: "QQQ",
      name: "Invesco QQQ Trust",
      assetClass: "미국 ETF",
      market: "US",
      quantity: 7,
      avgPrice: 432,
      currentPrice: 455.2
    },
    {
      accountId: "long",
      ticker: "005930",
      name: "삼성전자",
      assetClass: "한국 개별주",
      market: "KR",
      quantity: 60,
      avgPrice: 72800,
      currentPrice: 75400
    },
    {
      accountId: "dividend",
      ticker: "JEPI",
      name: "JPMorgan Equity Premium Income ETF",
      assetClass: "커버드콜 ETF",
      market: "US",
      quantity: 52,
      avgPrice: 54.2,
      currentPrice: 56.4
    },
    {
      accountId: "dividend",
      ticker: "SCHD",
      name: "Schwab US Dividend ETF",
      assetClass: "배당 ETF",
      market: "US",
      quantity: 45,
      avgPrice: 71.2,
      currentPrice: 78.9
    },
    {
      accountId: "dividend",
      ticker: "KRW",
      name: "원화 예수금",
      assetClass: "현금",
      market: "KR",
      quantity: 1,
      avgPrice: 1850000,
      currentPrice: 1850000
    }
  ],
  trades: [
    {
      accountId: "swing",
      entryDate: "2026-01-08",
      exitDate: "2026-01-19",
      ticker: "NVDA",
      strategy: "돌파",
      entry: 510.5,
      exit: 548.2,
      quantity: 4,
      entryReason: "실적 이후 신고가 돌파",
      exitReason: "목표 수익률 도달"
    },
    {
      accountId: "swing",
      entryDate: "2026-02-03",
      exitDate: "2026-02-13",
      ticker: "MSFT",
      strategy: "눌림목",
      entry: 402.2,
      exit: 394.8,
      quantity: 5,
      entryReason: "20일선 지지 기대",
      exitReason: "손절 기준 이탈"
    },
    {
      accountId: "swing",
      entryDate: "2026-03-06",
      exitDate: "2026-03-21",
      ticker: "AMD",
      strategy: "섹터 모멘텀",
      entry: 154,
      exit: 168.6,
      quantity: 10,
      entryReason: "반도체 섹터 강세",
      exitReason: "분할 익절"
    },
    {
      accountId: "swing",
      entryDate: "2026-04-02",
      exitDate: "2026-04-11",
      ticker: "SOXL",
      strategy: "단기 스윙",
      entry: 39.4,
      exit: 37.1,
      quantity: 30,
      entryReason: "과매도 반등 기대",
      exitReason: "시장 약세 전환"
    },
    {
      accountId: "swing",
      entryDate: "2026-05-09",
      exitDate: "2026-05-28",
      ticker: "QQQ",
      strategy: "추세 추종",
      entry: 432,
      exit: 455.2,
      quantity: 7,
      entryReason: "상승 추세 재진입",
      exitReason: "월말 리밸런싱"
    }
  ],
  income: [
    {
      accountId: "dividend",
      month: "2026-01",
      ticker: "JEPI",
      type: "배당",
      gross: 88.2,
      tax: 13.2
    },
    {
      accountId: "dividend",
      month: "2026-01",
      ticker: "AAPL 200C",
      type: "옵션 프리미엄",
      gross: 64,
      tax: 0
    },
    {
      accountId: "dividend",
      month: "2026-02",
      ticker: "SCHD",
      type: "배당",
      gross: 41.5,
      tax: 6.2
    },
    {
      accountId: "dividend",
      month: "2026-02",
      ticker: "TSLA 260C",
      type: "옵션 프리미엄",
      gross: 95,
      tax: 0
    },
    {
      accountId: "dividend",
      month: "2026-03",
      ticker: "JEPI",
      type: "배당",
      gross: 92,
      tax: 13.8
    },
    {
      accountId: "dividend",
      month: "2026-04",
      ticker: "SCHD",
      type: "배당",
      gross: 43.2,
      tax: 6.5
    },
    {
      accountId: "dividend",
      month: "2026-05",
      ticker: "AAPL 210C",
      type: "옵션 프리미엄",
      gross: 72,
      tax: 0
    }
  ],
  targets: [
    {
      accountId: "long",
      assetClass: "미국 ETF",
      targetWeight: 48
    },
    {
      accountId: "long",
      assetClass: "한국 개별주",
      targetWeight: 22
    },
    {
      accountId: "long",
      assetClass: "배당 ETF",
      targetWeight: 15
    },
    {
      accountId: "long",
      assetClass: "현금",
      targetWeight: 15
    }
  ]
};

const CONFIG = window.DASHBOARD_CONFIG || {};
const DEFAULT_ASSET_CLASSES = [
  "미국 개별주",
  "미국 ETF",
  "한국 개별주",
  "한국 ETF",
  "미국 채권",
  "한국 채권",
  "현금",
  "금",
  "은",
  "레버리지 상품",
  "배당 ETF",
  "커버드콜 ETF",
  "기타"
];
const ASSET_CLASSES = Array.isArray(CONFIG.assetClasses) && CONFIG.assetClasses.length ? CONFIG.assetClasses : DEFAULT_ASSET_CLASSES;

const CHART_PALETTES = {
  accounts: ["#0ea5e9", "#7c3aed", "#f97316"],
  swing: ["#0ea5e9", "#f97316", "#22c55e", "#ef4444", "#8b5cf6", "#14b8a6", "#eab308", "#ec4899", "#2563eb", "#84cc16"],
  long: ["#4f46e5", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4", "#a855f7", "#84cc16", "#f97316", "#0f766e", "#be123c"],
  dividend: ["#f59e0b", "#0ea5e9", "#22c55e", "#ef4444", "#8b5cf6", "#14b8a6", "#f43f5e", "#84cc16", "#2563eb", "#d97706"],
  asset: ["#0ea5e9", "#7c3aed", "#22c55e", "#f97316", "#ec4899", "#14b8a6", "#ef4444", "#eab308", "#2563eb", "#84cc16", "#be123c", "#0f766e", "#64748b"],
  default: ["#0ea5e9", "#f97316", "#22c55e", "#ef4444", "#8b5cf6", "#14b8a6", "#eab308", "#ec4899"]
};

function chartPalette(name) {
  return CHART_PALETTES[name] || CHART_PALETTES.default;
}


function hexToRgb(hex) {
  const safe = String(hex || "#94a3b8").replace("#", "").trim();
  const normalized = safe.length === 3 ? safe.split("").map((ch) => ch + ch).join("") : safe.padEnd(6, "0").slice(0, 6);
  const num = parseInt(normalized, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function rgbToHex({ r, g, b }) {
  const clamp = (value) => Math.max(0, Math.min(255, Math.round(value)));
  return `#${[clamp(r), clamp(g), clamp(b)].map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

function shadeColor(hex, amount) {
  const rgb = hexToRgb(hex);
  const adjust = (channel) => {
    if (amount >= 0) return channel + (255 - channel) * amount;
    return channel * (1 + amount);
  };
  return rgbToHex({ r: adjust(rgb.r), g: adjust(rgb.g), b: adjust(rgb.b) });
}

function rgba(hex, alpha) {
  const rgb = hexToRgb(hex);
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

function ellipsePoint(cx, cy, rx, ry, angle) {
  return { x: cx + rx * Math.cos(angle), y: cy + ry * Math.sin(angle) };
}

function pathTopSlice(cx, cy, rx, ry, start, end) {
  const startPoint = ellipsePoint(cx, cy, rx, ry, start);
  const endPoint = ellipsePoint(cx, cy, rx, ry, end);
  const largeArc = end - start > Math.PI ? 1 : 0;
  return `M ${cx.toFixed(2)} ${cy.toFixed(2)} L ${startPoint.x.toFixed(2)} ${startPoint.y.toFixed(2)} A ${rx.toFixed(2)} ${ry.toFixed(2)} 0 ${largeArc} 1 ${endPoint.x.toFixed(2)} ${endPoint.y.toFixed(2)} Z`;
}

function visibleFrontIntervals(start, end) {
  const TAU = Math.PI * 2;
  let normalizedStart = start;
  let normalizedEnd = end;
  while (normalizedEnd <= normalizedStart) normalizedEnd += TAU;
  const intervals = [];
  const candidates = [
    [0, Math.PI],
    [TAU, TAU + Math.PI],
    [-TAU, -TAU + Math.PI]
  ];
  for (const [frontStart, frontEnd] of candidates) {
    const from = Math.max(normalizedStart, frontStart);
    const to = Math.min(normalizedEnd, frontEnd);
    if (to > from + 0.0001) intervals.push([from, to]);
  }
  return intervals;
}

function pathOuterSide(cx, cy, rx, ry, depth, start, end) {
  const startPoint = ellipsePoint(cx, cy, rx, ry, start);
  const endPoint = ellipsePoint(cx, cy, rx, ry, end);
  const largeArc = end - start > Math.PI ? 1 : 0;
  return `M ${startPoint.x.toFixed(2)} ${startPoint.y.toFixed(2)} A ${rx.toFixed(2)} ${ry.toFixed(2)} 0 ${largeArc} 1 ${endPoint.x.toFixed(2)} ${endPoint.y.toFixed(2)} L ${endPoint.x.toFixed(2)} ${(endPoint.y + depth).toFixed(2)} A ${rx.toFixed(2)} ${ry.toFixed(2)} 0 ${largeArc} 0 ${startPoint.x.toFixed(2)} ${(startPoint.y + depth).toFixed(2)} Z`;
}

function pathRadialSide(cx, cy, rx, ry, depth, angle) {
  const edge = ellipsePoint(cx, cy, rx, ry, angle);
  return `M ${cx.toFixed(2)} ${cy.toFixed(2)} L ${edge.x.toFixed(2)} ${edge.y.toFixed(2)} L ${edge.x.toFixed(2)} ${(edge.y + depth).toFixed(2)} L ${cx.toFixed(2)} ${(cy + depth).toFixed(2)} Z`;
}


function build3DFullPie(entries, colors, options = {}) {
  const large = Boolean(options.large);
  const width = large ? 320 : 250;
  const height = large ? 250 : 205;
  const cx = width / 2;
  const cy = large ? 92 : 76;
  const rx = large ? 116 : 90;
  const ry = large ? 62 : 48;
  const depth = large ? 54 : 42;
  const shadowY = cy + depth + (large ? 20 : 16);
  const [rawKey, rawValue] = entries[0] || ["전체", 0];
  const value = Number(rawValue || 0);
  const color = colors[0] || "#0ea5e9";
  const top = shadeColor(color, 0.08);
  const side = shadeColor(color, -0.16);
  const sideDark = shadeColor(color, -0.28);
  const edge = shadeColor(color, -0.08);
  const highlight = rgba(shadeColor(color, 0.55), 0.24);
  const tooltip = `${label(rawKey)} · ${pct(100)} · ${money(value)}`;
  const tooltipAttr = escapeHtml(tooltip);
  const frontSide = `M ${(cx - rx).toFixed(2)} ${cy.toFixed(2)} A ${rx.toFixed(2)} ${ry.toFixed(2)} 0 0 0 ${(cx + rx).toFixed(2)} ${cy.toFixed(2)} L ${(cx + rx).toFixed(2)} ${(cy + depth).toFixed(2)} A ${rx.toFixed(2)} ${ry.toFixed(2)} 0 0 1 ${(cx - rx).toFixed(2)} ${(cy + depth).toFixed(2)} Z`;

  return `
    <svg viewBox="0 0 ${width} ${height}" width="100%" height="100%" role="img" aria-label="3D pie chart" style="display:block; overflow:visible; filter: drop-shadow(0 18px 24px rgba(15, 23, 42, 0.12));">
      <ellipse cx="${cx}" cy="${shadowY}" rx="${rx * 0.98}" ry="${ry * 0.46}" fill="rgba(2, 6, 23, 0.16)"></ellipse>
      <path class="pie3d-slice pie3d-side" data-pie-tooltip="${tooltipAttr}" tabindex="0" d="${frontSide}" fill="${side}" opacity="0.98"><title>${tooltipAttr}</title></path>
      <ellipse cx="${cx}" cy="${cy + depth}" rx="${rx}" ry="${ry}" fill="${sideDark}" opacity="0.22"></ellipse>
      <ellipse class="pie3d-slice pie3d-top" data-pie-tooltip="${tooltipAttr}" tabindex="0" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${top}" stroke="${edge}" stroke-width="1.15"><title>${tooltipAttr}</title></ellipse>
      <ellipse cx="${cx}" cy="${cy - (large ? 5 : 4)}" rx="${rx * 0.84}" ry="${ry * 0.55}" fill="${highlight}"></ellipse>
    </svg>
  `;
}

function build3DPie(entries, colors, options = {}) {
  const positiveEntries = entries.filter(([, value]) => Number(value || 0) > 0);
  const total = positiveEntries.reduce((sum, [, value]) => sum + Number(value || 0), 0);
  const large = Boolean(options.large);
  const width = large ? 320 : 250;
  const height = large ? 250 : 205;
  const cxBase = width / 2;
  const cyBase = large ? 92 : 76;
  const rx = large ? 116 : 90;
  const ry = large ? 62 : 48;
  const depth = large ? 54 : 42;
  const explode = large ? 10 : 8;
  const rotation = -Math.PI / 2 - 0.42;
  const shadowY = cyBase + depth + (large ? 20 : 16);

  if (positiveEntries.length === 1) {
    return build3DFullPie(positiveEntries, colors, options);
  }

  let cursor = rotation;
  const slices = positiveEntries.map(([key, rawValue], index) => {
    const value = Number(rawValue || 0);
    const sliceAngle = total ? (value / total) * Math.PI * 2 : 0;
    const start = cursor;
    const end = cursor + sliceAngle;
    cursor = end;
    const mid = (start + end) / 2;
    const offsetX = Math.cos(mid) * explode;
    const offsetY = Math.sin(mid) * explode * 0.78;
    const cx = cxBase + offsetX;
    const cy = cyBase + offsetY;
    const color = colors[index % colors.length];
    const share = total ? (value / total) * 100 : 0;
    const tooltip = `${label(key)} · ${pct(share)} · ${money(value)}`;
    return {
      key,
      value,
      share,
      tooltip,
      tooltipAttr: escapeHtml(tooltip),
      start,
      end,
      mid,
      cx,
      cy,
      color,
      top: shadeColor(color, 0.08),
      bottom: shadeColor(color, -0.20),
      side: shadeColor(color, -0.14),
      sideDark: shadeColor(color, -0.30),
      sideDeep: shadeColor(color, -0.38),
      edge: shadeColor(color, -0.08),
      highlight: rgba(shadeColor(color, 0.55), 0.22)
    };
  });

  const wallParts = [];
  const topParts = [];

  slices.forEach((slice) => {
    const tooltip = slice.tooltipAttr;

    // 모든 파이 조각에 하단 면을 먼저 깔아 벽면/틈이 비어 보이는 현상을 방지한다.
    wallParts.push({
      z: Math.sin(slice.mid) - 2,
      html: `<path class="pie3d-slice pie3d-bottom" data-pie-tooltip="${tooltip}" tabindex="0" d="${pathTopSlice(slice.cx, slice.cy + depth, rx, ry, slice.start, slice.end)}" fill="${slice.bottom}" opacity="0.98"><title>${tooltip}</title></path>`
    });

    // 모든 파이 조각의 외곽 벽면을 항상 색으로 채운다.
    wallParts.push({
      z: Math.sin(slice.mid) - 1,
      html: `<path class="pie3d-slice pie3d-side pie3d-outer-side" data-pie-tooltip="${tooltip}" tabindex="0" d="${pathOuterSide(slice.cx, slice.cy, rx, ry, depth, slice.start, slice.end)}" fill="${slice.side}" stroke="${slice.sideDeep}" stroke-width="0.8" opacity="1"><title>${tooltip}</title></path>`
    });

    // 모든 파이 조각의 시작/끝 방사형 벽면도 항상 채운다.
    wallParts.push({
      z: Math.sin(slice.start) - 0.5,
      html: `<path class="pie3d-slice pie3d-side pie3d-radial-side" data-pie-tooltip="${tooltip}" tabindex="0" d="${pathRadialSide(slice.cx, slice.cy, rx, ry, depth, slice.start)}" fill="${slice.sideDark}" stroke="${slice.sideDeep}" stroke-width="0.65" opacity="1"><title>${tooltip}</title></path>`
    });

    wallParts.push({
      z: Math.sin(slice.end) - 0.5,
      html: `<path class="pie3d-slice pie3d-side pie3d-radial-side" data-pie-tooltip="${tooltip}" tabindex="0" d="${pathRadialSide(slice.cx, slice.cy, rx, ry, depth, slice.end)}" fill="${slice.sideDark}" stroke="${slice.sideDeep}" stroke-width="0.65" opacity="1"><title>${tooltip}</title></path>`
    });
  });

  slices
    .slice()
    .sort((a, b) => Math.sin(a.mid) - Math.sin(b.mid))
    .forEach((slice) => {
      const tooltip = slice.tooltipAttr;
      topParts.push(`<path class="pie3d-slice pie3d-top" data-pie-tooltip="${tooltip}" tabindex="0" d="${pathTopSlice(slice.cx, slice.cy, rx, ry, slice.start, slice.end)}" fill="${slice.top}" stroke="${slice.edge}" stroke-width="1.1"><title>${tooltip}</title></path>`);
      topParts.push(`<path class="pie3d-highlight" d="${pathTopSlice(slice.cx, slice.cy - (large ? 4 : 3), rx * 0.985, ry * 0.78, slice.start, slice.end)}" fill="${slice.highlight}"></path>`);
    });

  const shadow = `<ellipse cx="${cxBase}" cy="${shadowY}" rx="${rx * 0.98}" ry="${ry * 0.46}" fill="rgba(2, 6, 23, 0.16)"></ellipse>`;

  return `
    <svg viewBox="0 0 ${width} ${height}" width="100%" height="100%" role="img" aria-label="3D pie chart" style="display:block; overflow:visible; filter: drop-shadow(0 18px 24px rgba(15, 23, 42, 0.12));">
      ${shadow}
      ${wallParts.sort((a, b) => a.z - b.z).map((part) => part.html).join("")}
      ${topParts.join("")}
    </svg>
  `;
}

const STORAGE_KEY = CONFIG.storageKey || "portfolio-dashboard-local-v2";
const SESSION_KEY = `${STORAGE_KEY}:session`;
let state = loadInitialState();
let activeView = "start";
let selectedOverviewTarget = "total";
let editingHoldingId = null;
let editingTradeId = null;
let editingIncomeId = null;
let editingTargetId = null;
let privacyMode = false;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadInitialState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return normalizeState(parsed);
    } catch (error) {
      console.warn("저장 데이터 파싱 실패:", error);
    }
  }
  if (CONFIG.preloadSample) {
    const initial = clone(SAMPLE_DATA);
    saveState(initial);
    return normalizeState(initial);
  }
  return normalizeState({ accounts: clone(ACCOUNT_PRESETS), holdings: [], transactions: [], trades: [], income: [], targets: clone(SAMPLE_DATA.targets), settings: { usdKrw: 1350 } });
}

function normalizeState(raw) {
  const normalizedAccounts = normalizeAccounts(raw.accounts);
  const accountByName = buildAccountNameMap(normalizedAccounts);
  const fallbackAccountId = normalizedAccounts[0]?.id || "swing";

  return {
    accounts: normalizedAccounts,
    settings: normalizeSettings(raw.settings),
    holdings: normalizeRows(raw.holdings, accountByName, fallbackAccountId).map(normalizeHoldingRow),
    transactions: normalizeRows(raw.transactions, accountByName, fallbackAccountId).map(normalizeTransactionRow),
    trades: normalizeRows(raw.trades, accountByName, "swing").map(normalizeTradeRow),
    income: normalizeRows(raw.income, accountByName, "dividend").map(normalizeIncomeRow),
    targets: normalizeRows(raw.targets, accountByName, "long").map(normalizeTargetRow)
  };
}

function normalizeAccounts(accounts) {
  const source = Array.isArray(accounts) && accounts.length ? accounts : ACCOUNT_PRESETS;
  const seen = new Set();
  const normalized = source.map((account, index) => {
    const preset = ACCOUNT_PRESETS[index] || ACCOUNT_PRESETS[0];
    const rawId = String(account.id || account.accountId || preset.id || `account-${index + 1}`).trim();
    const id = slugify(rawId) || `account-${index + 1}`;
    seen.add(id);
    return {
      id,
      name: String(account.name || account.accountName || preset.name || `계좌 ${index + 1}`).trim(),
      type: String(account.type || preset.type || "custom").trim(),
      description: String(account.description || preset.description || "").trim()
    };
  });

  ACCOUNT_PRESETS.forEach((preset) => {
    if (!seen.has(preset.id)) normalized.push(clone(preset));
  });

  return normalized.slice(0, 3);
}

function buildAccountNameMap(accounts) {
  const map = {};
  accounts.forEach((account) => {
    map[String(account.id).toLowerCase()] = account.id;
    map[String(account.name).toLowerCase()] = account.id;
  });
  map["국내 계좌"] = "long";
  map["배당·커버드콜"] = "dividend";
  map["배당 계좌"] = "dividend";
  map["배당주 계좌"] = "dividend";
  map["배당주 투자 계좌"] = "dividend";
  map["장기투자 계좌"] = "long";
  map["스윙 계좌"] = "swing";
  map["현금"] = "dividend";
  return map;
}

function normalizeRows(rows, accountByName, fallbackAccountId) {
  if (!Array.isArray(rows)) return [];
  return rows.map((row) => {
    const normalized = { ...row };
    const rawAccount = String(row.accountId || row.account || row.accountName || fallbackAccountId || "").trim();
    normalized.accountId = accountByName[rawAccount.toLowerCase()] || rawAccount || fallbackAccountId;
    delete normalized.account;
    delete normalized.accountName;
    return normalized;
  });
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function normalizeCurrency(value, row = {}) {
  const raw = String(value || "").trim().toUpperCase();
  if (raw === "USD" || raw === "$" || raw === "달러") return "USD";
  if (raw === "KRW" || raw === "₩" || raw === "원화" || raw === "원") return "KRW";
  return defaultCurrencyForRow(row);
}

function defaultCurrencyForRow(row = {}) {
  const market = String(row.market || "").trim().toUpperCase();
  const assetClass = String(row.assetClass || "");
  const ticker = String(row.ticker || "").trim().toUpperCase();
  if (ticker === "KRW" || assetClass === "현금") return "KRW";
  if (market === "US" || market === "USA" || assetClass.startsWith("미국") || /^[A-Z.]{1,8}$/.test(ticker)) return "USD";
  return "KRW";
}

function normalizeHoldingRow(row) {
  return {
    ...row,
    _id: String(row._id || row.id || createId("holding")),
    currency: normalizeCurrency(row.currency, row),
    quantity: Number(row.quantity || 0),
    avgPrice: Number(row.avgPrice || 0),
    currentPrice: Number(row.currentPrice || 0)
  };
}

function normalizeSettings(settings = {}) {
  const usdKrw = Number(settings.usdKrw || CONFIG.usdKrw || CONFIG.defaultUsdKrw || 1350);
  return {
    usdKrw: Number.isFinite(usdKrw) && usdKrw > 0 ? usdKrw : 1350
  };
}

function normalizeTransactionRow(row) {
  return {
    ...row,
    _id: String(row._id || row.id || createId("transaction")),
    date: String(row.date || new Date().toISOString().slice(0, 10)),
    type: String(row.type || "buy"),
    currency: normalizeCurrency(row.currency, row),
    quantity: Number(row.quantity || 0),
    price: Number(row.price || 0)
  };
}

function normalizeTradeRow(row) {
  return {
    ...row,
    _id: String(row._id || row.id || createId("trade"))
  };
}

function normalizeIncomeRow(row) {
  return {
    ...row,
    _id: String(row._id || row.id || createId("income"))
  };
}

function normalizeTargetRow(row) {
  return {
    ...row,
    _id: String(row._id || row.id || createId("target")),
    targetWeight: Number(row.targetWeight || 0)
  };
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9가-힣_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function saveState(nextState = state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function money(value) {
  const n = Number(value || 0);
  if (privacyMode) return "••••";
  if (Math.abs(n) >= 1000000) {
    return n.toLocaleString("ko-KR", { maximumFractionDigits: 0 });
  }
  return n.toLocaleString("ko-KR", { maximumFractionDigits: 2 });
}

function pct(value) {
  const n = Number(value || 0);
  if (!Number.isFinite(n)) return "0.0%";
  return `${n.toFixed(1)}%`;
}

function label(value) {
  if (!privacyMode) return escapeHtml(value || "-");
  if (!value) return "-";
  return String(value).length <= 3 ? "•••" : `${escapeHtml(String(value).slice(0, 1))}•••`;
}

function accountById(accountId) {
  return state.accounts.find((account) => account.id === accountId) || state.accounts[0] || ACCOUNT_PRESETS[0];
}

function accountName(accountId) {
  return accountById(accountId).name;
}

function holdingById(holdingId) {
  return state.holdings.find((holding) => String(holding._id) === String(holdingId));
}

function editingHolding() {
  return editingHoldingId ? holdingById(editingHoldingId) : null;
}

function tradeById(tradeId) {
  return state.trades.find((trade) => String(trade._id) === String(tradeId));
}

function editingTrade() {
  return editingTradeId ? tradeById(editingTradeId) : null;
}

function incomeById(incomeId) {
  return state.income.find((income) => String(income._id) === String(incomeId));
}

function editingIncome() {
  return editingIncomeId ? incomeById(editingIncomeId) : null;
}

function targetById(targetId) {
  return state.targets.find((target) => String(target._id) === String(targetId));
}

function editingTarget() {
  return editingTargetId ? targetById(editingTargetId) : null;
}

function accountOptions(selectedAccountId) {
  return state.accounts.map((account) => {
    const selected = account.id === selectedAccountId ? "selected" : "";
    return `<option value="${escapeHtml(account.id)}" ${selected}>${escapeHtml(account.name)}</option>`;
  }).join("");
}

function assetClassOptions(selectedClass) {
  return ASSET_CLASSES.map((assetClass) => {
    const selected = assetClass === selectedClass ? "selected" : "";
    return `<option value="${escapeHtml(assetClass)}" ${selected}>${escapeHtml(assetClass)}</option>`;
  }).join("");
}

function currencyOptions(selectedCurrency) {
  const selected = normalizeCurrency(selectedCurrency);
  return ["KRW", "USD"].map((currency) => `<option value="${currency}" ${currency === selected ? "selected" : ""}>${currency === "USD" ? "USD · 달러" : "KRW · 원화"}</option>`).join("");
}

function usdKrwRate() {
  const rate = Number(state?.settings?.usdKrw || CONFIG.usdKrw || CONFIG.defaultUsdKrw || 1350);
  return Number.isFinite(rate) && rate > 0 ? rate : 1350;
}

function currencyRate(currency) {
  return normalizeCurrency(currency) === "USD" ? usdKrwRate() : 1;
}

function holdingCurrency(row) {
  return normalizeCurrency(row.currency, row);
}

function priceMoney(value, currency) {
  const n = Number(value || 0);
  if (privacyMode) return "••••";
  const normalized = normalizeCurrency(currency);
  const formatted = n.toLocaleString("ko-KR", { maximumFractionDigits: normalized === "USD" ? 2 : 0 });
  return normalized === "USD" ? `$${formatted}` : `₩${formatted}`;
}

function transactionTypeLabel(type) {
  const map = {
    buy: "분할 매수",
    sell: "분할 매도",
    regular_buy: "적립식 매수",
    cash_in: "추가 납입"
  };
  return map[type] || type || "-";
}

function transactionAmount(row) {
  return Number(row.quantity || 0) * Number(row.price || 0) * currencyRate(row.currency);
}


function holdingValue(row) {
  return Number(row.quantity || 0) * Number(row.currentPrice || 0) * currencyRate(holdingCurrency(row));
}

function investedValue(row) {
  return Number(row.quantity || 0) * Number(row.avgPrice || 0) * currencyRate(holdingCurrency(row));
}

function tradePnl(row) {
  const entry = Number(row.entry || 0);
  const exit = Number(row.exit || 0);
  const qty = Number(row.quantity || 0);
  if (!exit || !entry || !qty) return 0;
  return (exit - entry) * qty;
}

function daysBetween(start, end) {
  if (!start || !end) return null;
  const a = new Date(start);
  const b = new Date(end);
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return null;
  return Math.max(0, Math.round((b - a) / 86400000));
}

function sumBy(rows, keyFn, valueFn) {
  const out = {};
  rows.forEach((row) => {
    const key = keyFn(row) || "미분류";
    out[key] = (out[key] || 0) + Number(valueFn(row) || 0);
  });
  return out;
}

function accountTotals() {
  return state.accounts.map((account) => {
    const holdings = state.holdings.filter((row) => row.accountId === account.id);
    const total = holdings.reduce((sum, row) => sum + holdingValue(row), 0);
    const invested = holdings.reduce((sum, row) => sum + investedValue(row), 0);
    const pnl = total - invested;
    const incomeNet = state.income
      .filter((row) => row.accountId === account.id)
      .reduce((sum, row) => sum + Number(row.gross || 0) - Number(row.tax || 0), 0);
    const trades = state.trades.filter((row) => row.accountId === account.id);
    return {
      ...account,
      total,
      invested,
      pnl,
      pnlRate: invested ? (pnl / invested) * 100 : 0,
      incomeNet,
      holdings,
      trades
    };
  });
}

function totals() {
  const total = state.holdings.reduce((sum, row) => sum + holdingValue(row), 0);
  const invested = state.holdings.reduce((sum, row) => sum + investedValue(row), 0);
  const pnl = total - invested;
  const closedTrades = state.trades.filter((row) => Number(row.exit));
  const wins = closedTrades.filter((row) => tradePnl(row) > 0).length;
  const incomeNet = state.income.reduce((sum, row) => sum + Number(row.gross || 0) - Number(row.tax || 0), 0);
  return {
    total,
    invested,
    pnl,
    pnlRate: invested ? (pnl / invested) * 100 : 0,
    closedTrades: closedTrades.length,
    winRate: closedTrades.length ? (wins / closedTrades.length) * 100 : 0,
    incomeNet
  };
}

function render() {
  if (CONFIG.accessPassword && !sessionStorage.getItem(SESSION_KEY)) {
    renderPasswordGate();
    return;
  }
  renderAppShell();
  renderActiveView();
}

function renderPasswordGate() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <main class="auth-shell">
      <section class="auth-card">
        <div class="pill">Client Link</div>
        <h1>${escapeHtml(CONFIG.title || "고객 전용 대시보드")}</h1>
        <p>초기 판매형 템플릿의 가벼운 접근 제한입니다. 정식 보안 인증이 필요한 고객은 별도 배포 또는 로그인 구조로 분리하세요.</p>
        <form id="password-form" class="stack">
          <label>사이트 비밀번호
            <input id="password-input" type="password" placeholder="전달받은 비밀번호" autocomplete="current-password" />
          </label>
          <button class="primary" type="submit">접속</button>
          <p id="password-error" class="error-text"></p>
        </form>
      </section>
    </main>
  `;
  document.getElementById("password-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("password-input").value;
    if (input === CONFIG.accessPassword) {
      sessionStorage.setItem(SESSION_KEY, "ok");
      render();
    } else {
      document.getElementById("password-error").textContent = "비밀번호가 맞지 않습니다.";
    }
  });
}


function heroAccountRows(accounts) {
  const grandTotal = accounts.reduce((sum, account) => sum + Number(account.total || 0), 0);
  return accounts.map((account) => {
    const share = grandTotal ? (Number(account.total || 0) / grandTotal) * 100 : 0;
    const pnlClass = account.pnl >= 0 ? "positive" : "negative";
    return `
      <div class="hero-account-row">
        <div class="hero-account-main">
          <span>${escapeHtml(account.name)}</span>
          <strong>${money(account.total)}</strong>
        </div>
        <div class="hero-account-sub">
          <span>${pct(share)} of total</span>
          <span class="${pnlClass}">${money(account.pnl)}</span>
        </div>
        <div class="hero-progress"><i style="width:${Math.max(2, Math.min(100, share)).toFixed(2)}%"></i></div>
      </div>
    `;
  }).join("");
}

function renderShowroomProof() {
  return `
    <section class="trust-strip">
      <div>
        <strong>증권사 로그인 없음</strong>
        <span>계정·비밀번호·API 키를 요청하지 않습니다.</span>
      </div>
      <div>
        <strong>브라우저 로컬 저장</strong>
        <span>기본형은 고객 브라우저에 데이터를 저장합니다.</span>
      </div>
      <div>
        <strong>기록·관리 도구</strong>
        <span>종목 추천, 매수·매도 신호, 자동매매가 아닙니다.</span>
      </div>
    </section>
  `;
}

function renderSellingPoints() {
  return `
    <section class="showcase-grid">
      <article class="panel feature-panel">
        <span class="feature-number">01</span>
        <h2>3계좌를 처음부터 분리</h2>
        <p>스윙, 장기투자, 배당주 계좌를 입력 단계부터 분리해서 전체 현황과 계좌별 비중을 동시에 보여줍니다.</p>
      </article>
      <article class="panel feature-panel">
        <span class="feature-number">02</span>
        <h2>엑셀보다 보기 쉬운 쇼룸형 UI</h2>
        <p>공개 데모에서는 첫인상과 이해 속도를 우선합니다. 고객은 입력 폼보다 정리된 화면을 먼저 보게 됩니다.</p>
      </article>
      <article class="panel feature-panel">
        <span class="feature-number">03</span>
        <h2>Premium 확장 여지</h2>
        <p>Sunburst 차트는 기본형이 아니라 고급형 옵션으로 분리해 패키지 차별화에 사용합니다.</p>
      </article>
    </section>
  `;
}

function renderDemoFlow() {
  return `
    <section class="panel flow-panel">
      <div class="panel-head">
        <div>
          <h2>데모 사용 흐름</h2>
          <span>고객이 링크를 열었을 때 이해해야 하는 순서</span>
        </div>
      </div>
      <div class="flow-steps">
        <div><strong>1</strong><span>전체 계좌 비중 확인</span></div>
        <div><strong>2</strong><span>스윙·장기·배당 계좌 분리 확인</span></div>
        <div><strong>3</strong><span>복기와 현금흐름 모듈 확인</span></div>
        <div><strong>4</strong><span>데이터 관리·프라이버시 구조 확인</span></div>
      </div>
    </section>
  `;
}

function renderAppShell() {
  const app = document.getElementById("app");
  const t = totals();
  const accountSummary = accountTotals();
  const byAccount = Object.fromEntries(accountSummary.map((account) => [account.name, account.total]));

  app.innerHTML = `
    <header class="site-header">
      <a class="brand-mark" href="#" data-view="start" aria-label="대시보드 홈">
        <span>3A</span>
        <strong>Portfolio Studio</strong>
      </a>
      <div class="top-actions">
        <button id="privacy-toggle" class="ghost">${privacyMode ? "프라이버시 해제" : "프라이버시 모드"}</button>
        <button id="export-backup" class="ghost">백업 내보내기</button>
        <label class="ghost file-button">백업 가져오기<input id="import-backup" type="file" accept=".json,application/json" /></label>
      </div>
    </header>

    <section class="showroom-hero">
      <div class="hero-copy">
        <div class="eyebrow">${escapeHtml(CONFIG.modeLabel || "Sales Showroom")}</div>
        <h1>${escapeHtml(CONFIG.title || "3계좌 통합 투자관리 대시보드")}</h1>
        <p class="subcopy">${escapeHtml(CONFIG.description || "스윙, 장기투자, 배당주 계좌를 한 화면에서 분리해서 보여주는 웹 대시보드입니다.")}</p>
        <div class="hero-actions">
          <button class="primary" data-view="start">시작하기</button>
          <button class="secondary" data-view="overview">데모 화면 보기</button>
          <button class="ghost" data-view="checklist">최종 점검</button>
        </div>
        <div class="hero-badges">
          <span>3계좌 분리</span>
          <span>로컬 저장</span>
          <span>CSV 업로드</span>
          <span>백업/복원</span>
        </div>
      </div>

      <aside class="hero-dashboard-card" aria-label="데모 대시보드 미리보기">
        <div class="hero-card-head hero-total-head">
          <div class="hero-total-block">
            <span>총 평가금액</span>
            <div class="hero-total-row">
              <strong>${money(t.total)}</strong>
              <span class="hero-return-badge ${t.pnlRate >= 0 ? "positive" : "negative"}">
                <span class="hero-return-label">전체 수익률</span>
                <b>${pct(t.pnlRate)}</b>
              </span>
            </div>
          </div>
        </div>
        <div class="hero-donut-shell">
          ${donutChart(byAccount, "3계좌 통합", true, "accounts")}
        </div>
        <div class="hero-account-stack">
          ${heroAccountRows(accountSummary)}
        </div>
      </aside>
    </section>

    ${renderShowroomProof()}

    <nav class="tabs" aria-label="대시보드 메뉴">
      ${tabButton("start", "시작하기")}
      ${tabButton("overview", "전체 현황")}
      ${tabButton("accounts", "계좌·비중")}
      ${tabButton("trades", "스윙 복기")}
      ${tabButton("income", "배당·커버드콜")}
      ${tabButton("data", "데이터 관리")}
      ${tabButton("checklist", "최종 점검")}
      ${tabButton("privacy", "프라이버시·면책")}
    </nav>

    <section class="summary-grid showroom-metrics">
      ${card("총 평가금액", money(t.total), `환율 ${money(usdKrwRate())}원/USD`)}
      ${card("전체 수익률", `<span class="${t.pnlRate >= 0 ? "positive" : "negative"}">${pct(t.pnlRate)}</span>`, t.pnl >= 0 ? "수익 구간" : "손실 구간")}
      ${card("평가손익", `<span class="${t.pnl >= 0 ? "positive" : "negative"}">${money(t.pnl)}</span>`, t.pnl >= 0 ? "수익 구간" : "손실 구간")}
      ${card("스윙 승률", pct(t.winRate), `${t.closedTrades}건 복기`)}
      ${card("누적 현금흐름", money(t.incomeNet), "배당+프리미엄 세후")}
    </section>

    <main id="view"></main>
  `;

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      activeView = button.dataset.view;
      render();
    });
  });
  document.getElementById("privacy-toggle").addEventListener("click", () => {
    privacyMode = !privacyMode;
    render();
  });
  document.getElementById("export-backup").addEventListener("click", exportBackup);
  document.getElementById("import-backup").addEventListener("change", importBackup);
}

function tabButton(view, text) {
  return `<button class="${activeView === view ? "active" : ""}" data-view="${view}">${text}</button>`;
}

function card(title, value, meta) {
  return `
    <article class="metric-card">
      <span>${escapeHtml(title)}</span>
      <strong>${value}</strong>
      <small>${escapeHtml(meta)}</small>
    </article>
  `;
}

function completionBadge(done, doneLabel = "완료", pendingLabel = "대기") {
  return `<span class="status-pill ${done ? "done" : "pending"}">${done ? doneLabel : pendingLabel}</span>`;
}

function manualBadge(label = "수동 확인") {
  return `<span class="status-pill manual">${escapeHtml(label)}</span>`;
}

function dataCompletion() {
  return {
    holdings: state.holdings.length > 0,
    targets: state.targets.length > 0,
    trades: state.trades.length > 0,
    income: state.income.length > 0
  };
}

function onboardingStep(number, title, description, done, actionLabel, view) {
  return `
    <article class="onboarding-step ${done ? "done" : ""}">
      <div class="step-index">${number}</div>
      <div class="step-copy">
        <div class="step-title-row">
          <h3>${escapeHtml(title)}</h3>
          ${completionBadge(done)}
        </div>
        <p>${escapeHtml(description)}</p>
        <button type="button" class="secondary" data-view="${escapeHtml(view)}">${escapeHtml(actionLabel)}</button>
      </div>
    </article>
  `;
}

function renderStart() {
  const progress = dataCompletion();
  const completedCount = [progress.holdings, progress.targets, progress.trades, progress.income].filter(Boolean).length;
  const progressRate = Math.round((completedCount / 4) * 100);

  return `
    <section class="panel onboarding-hero-panel">
      <div class="panel-head">
        <div>
          <span class="section-kicker">First user guide</span>
          <h2>시작하기</h2>
          <span>처음 사용하는 고객이 데이터를 넣고 백업까지 완료하는 기본 순서입니다.</span>
        </div>
        <span class="pill">${progressRate}% 준비</span>
      </div>
      <div class="onboarding-layout">
        <div class="onboarding-main">
          <div class="onboarding-steps">
            ${onboardingStep(1, "보유 종목 입력", "스윙, 장기투자, 배당주 계좌의 현재 보유 종목을 먼저 입력합니다.", progress.holdings, "보유 종목 관리", "accounts")}
            ${onboardingStep(2, "장기투자 목표 비중 설정", "장기투자 계좌의 자산군별 목표 비중을 입력해서 현재 비중과 비교합니다.", progress.targets, "목표 비중 관리", "accounts")}
            ${onboardingStep(3, "스윙매매 복기 입력", "진입가, 청산가, 전략, 진입·청산 사유를 기록해서 승률과 복기 품질을 확인합니다.", progress.trades, "스윙 복기 관리", "trades")}
            ${onboardingStep(4, "배당·커버드콜 현금흐름 입력", "배당금, 세금, 옵션 프리미엄을 월별로 입력해서 세후 현금흐름을 확인합니다.", progress.income, "현금흐름 관리", "income")}
            <article class="onboarding-step backup-step">
              <div class="step-index">5</div>
              <div class="step-copy">
                <div class="step-title-row">
                  <h3>백업 파일 저장</h3>
                  ${manualBadge()}
                </div>
                <p>입력 데이터는 브라우저에 저장되므로, 데이터 입력 후 백업 파일을 반드시 내려받아 보관합니다.</p>
                <button type="button" class="secondary" data-export-backup="true">백업 파일 저장</button>
              </div>
            </article>
          </div>
        </div>
        <aside class="quick-start-card">
          <h3>처음 시작 옵션</h3>
          <p>데모 검수와 실제 고객 납품 상황을 분리해서 시작할 수 있습니다.</p>
          <div class="quick-action-stack">
            <button type="button" class="primary" data-load-sample="true">샘플 데이터로 체험하기</button>
            <button type="button" class="secondary" data-start-empty="true">내 데이터로 새로 시작하기</button>
            <label class="ghost file-button full-width">백업 파일 불러오기<input data-import-backup="true" type="file" accept=".json,application/json" /></label>
            <button type="button" class="ghost" data-view="checklist">최종 점검 체크리스트</button>
          </div>
          <div class="quick-note">
            <strong>권장 순서</strong>
            <span>샘플로 먼저 체험한 뒤, 실제 고객 납품 전에는 내 데이터로 새로 시작하기를 실행하세요.</span>
          </div>
        </aside>
      </div>
    </section>
  `;
}

function checklistRow(title, description, statusHtml, actionLabel, view, extraAction = "") {
  return `
    <article class="checklist-row">
      <div class="checklist-main">
        ${statusHtml}
        <div>
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(description)}</p>
        </div>
      </div>
      <div class="checklist-actions">
        ${view ? `<button type="button" class="secondary" data-view="${escapeHtml(view)}">${escapeHtml(actionLabel)}</button>` : ""}
        ${extraAction}
      </div>
    </article>
  `;
}

function renderChecklist() {
  const progress = dataCompletion();
  const required = [progress.holdings, progress.targets, progress.trades, progress.income];
  const completedCount = required.filter(Boolean).length;

  return `
    <section class="panel checklist-panel">
      <div class="panel-head">
        <div>
          <span class="section-kicker">Delivery checklist</span>
          <h2>최종 점검 체크리스트</h2>
          <span>고객에게 납품하거나 공개 데모를 시연하기 전 확인해야 할 항목입니다.</span>
        </div>
        <span class="pill">필수 데이터 ${completedCount}/4</span>
      </div>
      <div class="checklist-list">
        ${checklistRow("보유 종목 입력 완료", `${state.holdings.length}개 보유 종목이 저장되어 있습니다.`, completionBadge(progress.holdings), "확인", "accounts")}
        ${checklistRow("장기투자 목표 비중 입력 완료", `${state.targets.length}개 목표 비중 항목이 저장되어 있습니다.`, completionBadge(progress.targets), "확인", "accounts")}
        ${checklistRow("스윙매매 기록 입력 완료", `${state.trades.length}개 매매 복기 기록이 저장되어 있습니다.`, completionBadge(progress.trades), "확인", "trades")}
        ${checklistRow("배당·커버드콜 현금흐름 입력 완료", `${state.income.length}개 현금흐름 기록이 저장되어 있습니다.`, completionBadge(progress.income), "확인", "income")}
        ${checklistRow("백업 파일 다운로드 완료", "브라우저 저장 데이터 유실에 대비해서 최신 백업 파일을 내려받습니다.", manualBadge(), "", "", `<button type="button" class="secondary" data-export-backup="true">백업 내보내기</button>`)}
        ${checklistRow("프라이버시 모드 확인 완료", privacyMode ? "현재 프라이버시 모드가 켜져 있습니다." : "금액과 종목명 마스킹이 정상 작동하는지 확인하세요.", privacyMode ? completionBadge(true, "확인됨", "대기") : manualBadge("확인 필요"), "프라이버시 안내", "privacy", `<button type="button" class="ghost" data-toggle-privacy="true">${privacyMode ? "프라이버시 해제" : "프라이버시 모드 켜기"}</button>`)}
      </div>
      <div class="checklist-footer-actions">
        <button type="button" class="primary" data-view="overview">전체 현황 검수</button>
        <button type="button" class="secondary" data-view="data">데이터 관리 화면</button>
        <label class="ghost file-button">백업 파일 복원 테스트<input data-import-backup="true" type="file" accept=".json,application/json" /></label>
      </div>
    </section>
  `;
}

function renderActiveView() {
  const view = document.getElementById("view");
  const renderers = {
    start: renderStart,
    overview: renderOverview,
    accounts: renderAccounts,
    trades: renderTrades,
    income: renderIncome,
    data: renderData,
    checklist: renderChecklist,
    privacy: renderPrivacy
  };
  view.innerHTML = renderers[activeView]();
  attachViewEvents();
}

function renderOverview() {
  const byAccount = Object.fromEntries(accountTotals().map((account) => [account.name, account.total]));
  const latestIncome = Object.entries(sumBy(state.income, (row) => row.month, (row) => Number(row.gross || 0) - Number(row.tax || 0))).sort();
  const byAsset = sumBy(state.holdings, (row) => row.assetClass || "기타", holdingValue);

  return `
    <section class="panel hero-composition showroom-panel">
      <div class="panel-head">
        <div>
          <span class="section-kicker">Portfolio composition</span>
          <h2>전체 계좌 통합 현황</h2>
          <span>스윙·장기투자·배당주 계좌를 합산한 전체 상황과 계좌별 비중</span>
        </div>
        <span class="pill">Public demo</span>
      </div>
      <div class="composition-layout">
        <div class="master-donut-card elevated-card detail-card-trigger ${selectedOverviewTarget === "total" ? "selected" : ""}" data-detail-target="total" tabindex="0" aria-label="전체 계좌 상세 패널 열기">
          <div class="card-label">전체 계좌 비중</div>
          ${donutChart(byAccount, "전체 계좌", true, "accounts")}
          <div class="detail-card-footer">
            <span class="interaction-hint">더블 클릭 시 상세 패널로 들어갑니다.</span>
            <button type="button" class="detail-open-button" data-detail-target="total">상세 보기 →</button>
          </div>
        </div>
        <div class="account-pie-grid">
          ${accountTotals().map((account) => accountPieCard(account)).join("")}
        </div>
      </div>
    </section>

    ${renderOverviewDetailPanel()}

    ${renderSellingPoints()}

    <section class="grid-2">
      <article class="panel chart-panel">
        <div class="panel-head"><h2>자산군 비중</h2><span>선택식 자산군 기준으로 집계</span></div>
        ${donutChart(byAsset, "자산군", false, "asset")}
      </article>
      <article class="panel chart-panel">
        <div class="panel-head"><h2>월별 현금흐름</h2><span>배당과 커버드콜 프리미엄 합산</span></div>
        ${latestIncome.length ? barList(Object.fromEntries(latestIncome)) : empty("등록된 현금흐름이 없습니다.")}
      </article>
    </section>

    ${renderDemoFlow()}

    <section class="panel">
      <div class="panel-head"><h2>보유 종목 요약</h2><span>각 항목은 반드시 계좌에 연결됩니다</span></div>
      ${holdingsTable(state.holdings.slice(0, 9))}
    </section>

    ${renderPremiumSunburstBlock()}
  `;
}

function accountPieCard(account) {
  const byHolding = sumBy(account.holdings, (row) => row.ticker || row.name, holdingValue);
  return `
    <article class="account-pie-card account-${escapeHtml(account.id)} detail-card-trigger ${selectedOverviewTarget === account.id ? "selected" : ""}" data-detail-target="${escapeHtml(account.id)}" tabindex="0" aria-label="${escapeHtml(account.name)} 상세 패널 열기">
      <div class="account-pie-header">
        <div>
          <span class="mini-kicker">${escapeHtml(account.type || "account")}</span>
          <h3>${escapeHtml(account.name)}</h3>
          <p>${escapeHtml(account.description || "계좌별 보유 종목 비중")}</p>
        </div>
        <strong>${money(account.total)}</strong>
      </div>
      ${donutChart(byHolding, account.name, false, account.id)}
      <div class="mini-stats">
        <span>손익 <strong class="${account.pnl >= 0 ? "positive" : "negative"}">${money(account.pnl)}</strong></span>
        <span>수익률 <strong class="${account.pnlRate >= 0 ? "positive" : "negative"}">${pct(account.pnlRate)}</strong></span>
      </div>
      <div class="detail-card-footer">
        <span class="interaction-hint">더블 클릭 시 상세 패널로 들어갑니다.</span>
        <button type="button" class="detail-open-button" data-detail-target="${escapeHtml(account.id)}">상세 보기 →</button>
      </div>
    </article>
  `;
}

function detailTargetMeta(targetId) {
  if (targetId === "total") {
    return {
      title: "전체 계좌",
      description: "3개 계좌의 평가금액, 계좌별 비중, 자산군 비중, 상위 보유 종목을 자세히 확인할 수 있습니다."
    };
  }

  const account = accountTotals().find((item) => item.id === targetId) || accountById(targetId);
  const detailCopy = {
    swing: "보유 종목, 최근 매매 복기, 승률, 평균 보유기간, 손익비를 자세히 확인할 수 있습니다.",
    long: "보유 종목, 목표 비중, 현재 비중, 괴리율, 리밸런싱 점검 항목을 자세히 확인할 수 있습니다.",
    dividend: "보유 종목, 월별 배당금, 커버드콜 프리미엄, 현금흐름 기록을 자세히 확인할 수 있습니다."
  };

  return {
    title: account.name,
    description: detailCopy[account.type] || "보유 종목, 자산군 비중, 손익, 관련 기록을 자세히 확인할 수 있습니다."
  };
}

function openOverviewDetail(targetId) {
  const meta = detailTargetMeta(targetId);
  const confirmed = confirm(`${meta.title} 상세 패널로 들어갑니다.\n\n${meta.description}\n\n들어가시겠습니까?`);
  if (!confirmed) return;
  selectedOverviewTarget = targetId || "total";
  render();
  const panel = document.getElementById("overview-detail-panel");
  if (panel) panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderOverviewDetailPanel() {
  const targetId = selectedOverviewTarget || "total";
  const meta = detailTargetMeta(targetId);
  return `
    <section id="overview-detail-panel" class="panel overview-detail-panel">
      <div class="panel-head">
        <div>
          <span class="section-kicker">Selected detail</span>
          <h2>${escapeHtml(meta.title)} 상세 패널</h2>
          <span>${escapeHtml(meta.description)}</span>
        </div>
        <span class="pill">선택됨</span>
      </div>
      ${targetId === "total" ? renderTotalOverviewDetail() : renderAccountOverviewDetail(targetId)}
    </section>
  `;
}

function renderTotalOverviewDetail() {
  const t = totals();
  const accountSummary = accountTotals();
  const byAccount = Object.fromEntries(accountSummary.map((account) => [account.name, account.total]));
  const byAsset = sumBy(state.holdings, (row) => row.assetClass || "기타", holdingValue);
  const topHoldings = state.holdings
    .slice()
    .sort((a, b) => holdingValue(b) - holdingValue(a))
    .slice(0, 6);

  return `
    <section class="summary-grid compact detail-summary">
      ${card("총 평가금액", money(t.total), "3계좌 합산")}
      ${card("총 평가손익", money(t.pnl), pct(t.pnlRate))}
      ${card("누적 현금흐름", money(t.incomeNet), "배당+프리미엄 세후")}
    </section>
    <section class="detail-section-grid">
      <article class="detail-subpanel">
        <div class="panel-head slim"><h3>계좌별 비중</h3><span>전체 계좌 기준</span></div>
        ${donutChart(byAccount, "전체", false, "accounts")}
      </article>
      <article class="detail-subpanel">
        <div class="panel-head slim"><h3>자산군별 비중</h3><span>선택식 자산군 기준</span></div>
        ${Object.keys(byAsset).length ? assetPrincipalTable(state.holdings) : empty("자산군 데이터가 없습니다.")}
      </article>
    </section>
    <section class="detail-subpanel">
      <div class="panel-head slim"><h3>상위 보유 종목</h3><span>평가금액 기준 상위 6개</span></div>
      ${holdingsTable(topHoldings)}
    </section>
  `;
}

function renderAccountOverviewDetail(targetId) {
  const account = accountTotals().find((item) => item.id === targetId);
  if (!account) return empty("선택한 계좌를 찾을 수 없습니다.");

  const byHolding = sumBy(account.holdings, (row) => row.ticker || row.name, holdingValue);
  const byAsset = sumBy(account.holdings, (row) => row.assetClass || "기타", holdingValue);

  return `
    <section class="summary-grid compact detail-summary">
      ${card("평가금액", money(account.total), `${account.holdings.length}개 보유`)}
      ${card("평가손익", money(account.pnl), pct(account.pnlRate))}
      ${card("현금흐름", money(account.incomeNet), "세후 기준")}
    </section>
    <section class="detail-section-grid">
      <article class="detail-subpanel">
        <div class="panel-head slim"><h3>종목별 비중</h3><span>${escapeHtml(account.name)}</span></div>
        ${Object.keys(byHolding).length ? donutChart(byHolding, account.name, false, account.id) : empty("보유 종목이 없습니다.")}
      </article>
      <article class="detail-subpanel">
        <div class="panel-head slim"><h3>자산군별 비중</h3><span>선택식 자산군 기준</span></div>
        ${Object.keys(byAsset).length ? assetPrincipalTable(account.holdings) : empty("자산군 데이터가 없습니다.")}
      </article>
    </section>
    <section class="detail-subpanel">
      <div class="panel-head slim"><h3>보유 종목</h3><span>${escapeHtml(account.name)}에 연결된 항목</span></div>
      ${holdingsTable(account.holdings)}
    </section>
    ${account.type === "swing" ? renderSwingOverviewDetail(account) : ""}
    ${account.type === "long" ? renderLongOverviewDetail(account) : ""}
    ${account.type === "dividend" ? renderDividendOverviewDetail(account) : ""}
  `;
}

function renderSwingOverviewDetail(account) {
  const rows = account.trades.map((row) => ({ ...row, pnl: tradePnl(row), days: daysBetween(row.entryDate, row.exitDate) }));
  const closedRows = rows.filter((row) => Number(row.exit));
  const wins = closedRows.filter((row) => row.pnl > 0).length;
  const avgDays = closedRows.length ? closedRows.reduce((sum, row) => sum + Number(row.days || 0), 0) / closedRows.length : 0;
  const grossProfit = closedRows.filter((row) => row.pnl > 0).reduce((sum, row) => sum + row.pnl, 0);
  const grossLoss = Math.abs(closedRows.filter((row) => row.pnl < 0).reduce((sum, row) => sum + row.pnl, 0));
  const profitFactor = grossLoss ? grossProfit / grossLoss : grossProfit ? Infinity : 0;

  return `
    <section class="summary-grid compact detail-summary">
      ${card("스윙 승률", pct(closedRows.length ? (wins / closedRows.length) * 100 : 0), `${closedRows.length}건 청산`)}
      ${card("평균 보유기간", `${avgDays.toFixed(1)}일`, "청산 거래 기준")}
      ${card("손익비 지표", profitFactor === Infinity ? "∞" : profitFactor.toFixed(2), "Gross Profit / Gross Loss")}
    </section>
    <section class="detail-subpanel">
      <div class="panel-head slim"><h3>최근 매매 복기</h3><span>스윙 계좌 기록</span></div>
      ${tradeRowsTable(rows.slice(-5).reverse())}
    </section>
  `;
}

function renderLongOverviewDetail(account) {
  const currentByAsset = sumBy(account.holdings, (row) => row.assetClass || "기타", holdingValue);
  const accountTotal = account.holdings.reduce((sum, row) => sum + holdingValue(row), 0);
  const targetRows = state.targets.filter((target) => target.accountId === account.id).map((target) => {
    const currentValue = currentByAsset[target.assetClass] || 0;
    const currentWeight = accountTotal ? (currentValue / accountTotal) * 100 : 0;
    const gap = currentWeight - Number(target.targetWeight || 0);
    return { ...target, currentValue, currentWeight, gap };
  });

  return `
    <section class="detail-subpanel">
      <div class="panel-head slim"><h3>목표 비중 점검</h3><span>장기투자 계좌 리밸런싱 확인</span></div>
      ${targetRows.length ? targetTable(targetRows) : empty("장기투자 목표 비중 데이터가 없습니다.")}
    </section>
  `;
}

function renderDividendOverviewDetail(account) {
  const rows = state.income.filter((row) => row.accountId === account.id);
  const byMonth = sumBy(rows, (row) => row.month, (row) => Number(row.gross || 0) - Number(row.tax || 0));
  const byType = sumBy(rows, (row) => row.type || "미분류", (row) => Number(row.gross || 0) - Number(row.tax || 0));

  return `
    <section class="detail-section-grid">
      <article class="detail-subpanel">
        <div class="panel-head slim"><h3>월별 현금흐름</h3><span>세후 기준</span></div>
        ${Object.keys(byMonth).length ? barList(byMonth) : empty("월별 현금흐름 데이터가 없습니다.")}
      </article>
      <article class="detail-subpanel">
        <div class="panel-head slim"><h3>현금흐름 유형</h3><span>배당 / 옵션 프리미엄</span></div>
        ${Object.keys(byType).length ? barList(byType) : empty("유형별 현금흐름 데이터가 없습니다.")}
      </article>
    </section>
    <section class="detail-subpanel">
      <div class="panel-head slim"><h3>최근 현금흐름 기록</h3><span>배당주 투자 계좌</span></div>
      ${incomeRowsTable(rows.slice(-6).reverse())}
    </section>
  `;
}

function tradeRowsTable(rows) {
  if (!rows.length) return empty("매매 복기 데이터가 없습니다.");
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>진입일</th><th>청산일</th><th>종목</th><th>전략</th><th>손익</th><th>보유일</th><th>진입 사유</th><th>청산 사유</th></tr></thead>
        <tbody>
          ${rows.map((row) => `
            <tr>
              <td>${escapeHtml(row.entryDate || "-")}</td>
              <td>${escapeHtml(row.exitDate || "-")}</td>
              <td>${label(row.ticker)}</td>
              <td>${escapeHtml(row.strategy || "-")}</td>
              <td class="num ${row.pnl >= 0 ? "positive" : "negative"}">${money(row.pnl)}</td>
              <td class="num">${row.days ?? "-"}</td>
              <td>${escapeHtml(row.entryReason || "-")}</td>
              <td>${escapeHtml(row.exitReason || "-")}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function incomeRowsTable(rows) {
  if (!rows.length) return empty("현금흐름 데이터가 없습니다.");
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>월</th><th>종목/계약</th><th>유형</th><th>세전</th><th>세금</th><th>세후</th></tr></thead>
        <tbody>
          ${rows.map((row) => {
            const net = Number(row.gross || 0) - Number(row.tax || 0);
            return `
              <tr>
                <td>${escapeHtml(row.month || "-")}</td>
                <td>${label(row.ticker)}</td>
                <td>${escapeHtml(row.type || "-")}</td>
                <td class="num">${money(row.gross)}</td>
                <td class="num">${money(row.tax)}</td>
                <td class="num">${money(net)}</td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}


function renderPremiumSunburstBlock() {
  if (CONFIG.enableSunburst) {
    return `
      <section class="panel premium-block">
        <div class="panel-head">
          <div>
            <h2>Premium Sunburst 차트</h2>
            <span>안쪽 원은 계좌 구분, 바깥쪽 원은 각 계좌 내부 종목 비중입니다.</span>
          </div>
          <span class="pill">Premium</span>
        </div>
        ${sunburstChart()}
      </section>
    `;
  }
  return `
    <section class="panel premium-block locked">
      <div class="panel-head">
        <div>
          <h2>Premium 옵션: Sunburst 차트</h2>
          <span>기본형에는 포함하지 않고, 고급형에서 전체 계좌 → 계좌 내부 종목 비중을 한 번에 보여주는 시각화로 제공합니다.</span>
        </div>
        <span class="pill">Premium add-on</span>
      </div>
      <p class="muted">현재 공개 데모 기본형은 통합 도넛 1개와 계좌별 파이차트 3개로 구성됩니다. Sunburst는 Premium 또는 Private Deploy 차별화 기능으로 분리했습니다.</p>
    </section>
  `;
}

function renderAccounts() {
  const byAccount = Object.fromEntries(accountTotals().map((account) => [account.name, account.total]));
  const total = state.holdings.reduce((sum, row) => sum + holdingValue(row), 0);
  const longAccount = state.accounts.find((account) => account.type === "long") || accountById("long");
  const longHoldings = state.holdings.filter((row) => row.accountId === longAccount.id);
  const currentByAsset = sumBy(longHoldings, (row) => row.assetClass, holdingValue);
  const targetRows = state.targets.filter((target) => target.accountId === longAccount.id).map((target) => {
    const currentValue = currentByAsset[target.assetClass] || 0;
    const currentWeight = longHoldings.length && total ? (currentValue / longHoldings.reduce((sum, row) => sum + holdingValue(row), 0)) * 100 : 0;
    const gap = currentWeight - Number(target.targetWeight || 0);
    return { ...target, currentValue, currentWeight, gap };
  });

  return `
    <section class="panel">
      <div class="panel-head">
        <h2>종합 계좌 평가금액 비중</h2>
        <span>전체 자산에서 각 계좌가 차지하는 비중</span>
      </div>
      ${donutChart(byAccount, "계좌 비중", true, "accounts")}
    </section>

    <section class="account-detail-grid">
      ${accountTotals().map((account) => accountDetailCard(account)).join("")}
    </section>

    <section class="panel">
      <div class="panel-head">
        <h2>${escapeHtml(longAccount.name)} 목표 비중 점검</h2>
        <span>장기투자 계좌 내부 자산군 기준</span>
      </div>
      ${targetRows.length ? targetTable(targetRows, { actions: true }) : empty("장기투자 목표 비중 데이터가 없습니다.")}
    </section>

    <section class="panel" id="target-editor-panel">
      <div class="panel-head"><h2>${editingTarget() ? "장기투자 목표 비중 수정" : "장기투자 목표 비중 추가"}</h2><span>${editingTarget() ? "선택한 목표 비중 항목을 수정합니다" : "자산군별 목표 비중을 추가합니다"}</span></div>
      ${targetForm(longAccount.id)}
    </section>

    <section class="panel">
      <div class="panel-head"><h2>자산군별 원금 / 평가금액</h2><span>환율 적용 후 원화 기준</span></div>
      ${assetPrincipalTable(state.holdings)}
    </section>

    <section class="panel">
      <div class="panel-head"><h2>전체 보유 종목</h2><span>${state.holdings.length}개 항목 · 원금/평가금액 표시</span></div>
      ${holdingsTable(state.holdings, { actions: true })}
    </section>

    <section class="panel" id="transaction-editor-panel">
      <div class="panel-head"><h2>분할 매수·매도·적립식 기록 추가</h2><span>날짜별 거래 기록을 남기고 보유 수량에 반영합니다</span></div>
      ${transactionForm()}
    </section>

    <section class="panel">
      <div class="panel-head"><h2>날짜별 매수·매도·적립식 기록</h2><span>${state.transactions.length}개 기록</span></div>
      ${transactionTable(state.transactions)}
    </section>

    <section class="panel" id="holding-editor-panel">
      <div class="panel-head"><h2>${editingHolding() ? "보유 종목 수정" : "보유 종목 직접 추가"}</h2><span>${editingHolding() ? "선택한 항목의 계좌, 종목, 수량, 가격을 수정합니다" : "계좌 선택 후 입력"}</span></div>
      ${holdingForm()}
    </section>
  `;
}

function accountDetailCard(account) {
  const byAsset = sumBy(account.holdings, (row) => row.assetClass, holdingValue);
  return `
    <article class="panel account-detail-card">
      <div class="panel-head">
        <div>
          <h2>${escapeHtml(account.name)}</h2>
          <span>${escapeHtml(account.description)}</span>
        </div>
      </div>
      <section class="summary-grid compact account-compact">
        ${card("평가금액", money(account.total), `${account.holdings.length}개 보유`)}
        ${card("평가손익", money(account.pnl), pct(account.pnlRate))}
        ${card("현금흐름", money(account.incomeNet), "세후 기준")}
      </section>
      <div class="panel-head slim"><h3>자산군 비중</h3><span>${escapeHtml(account.name)}</span></div>
      ${Object.keys(byAsset).length ? donutChart(byAsset, account.name, false, "asset") : empty("보유 종목이 없습니다.")}
    </article>
  `;
}


function assetPrincipalTable(rows) {
  if (!rows.length) return empty("자산군별 원금 데이터가 없습니다.");
  const grouped = {};
  rows.forEach((row) => {
    const key = row.assetClass || "기타";
    if (!grouped[key]) grouped[key] = { invested: 0, value: 0 };
    grouped[key].invested += investedValue(row);
    grouped[key].value += holdingValue(row);
  });
  const entries = Object.entries(grouped).sort((a, b) => b[1].value - a[1].value);
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>자산군</th>
            <th>원금</th>
            <th>평가금액</th>
            <th>평가손익</th>
            <th>수익률</th>
          </tr>
        </thead>
        <tbody>
          ${entries.map(([assetClass, item]) => {
            const pnl = item.value - item.invested;
            const rate = item.invested ? (pnl / item.invested) * 100 : 0;
            return `
              <tr>
                <td>${escapeHtml(assetClass)}</td>
                <td class="num">${money(item.invested)}</td>
                <td class="num">${money(item.value)}</td>
                <td class="num ${pnl >= 0 ? "positive" : "negative"}">${money(pnl)}</td>
                <td class="num ${rate >= 0 ? "positive" : "negative"}">${pct(rate)}</td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function targetTable(rows, options = {}) {
  const showActions = Boolean(options.actions);
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>계좌</th>
            <th>자산군</th>
            <th>현재 금액</th>
            <th>현재 비중</th>
            <th>목표 비중</th>
            <th>괴리율</th>
            ${showActions ? "<th>관리</th>" : ""}
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => `
            <tr class="${editingTargetId && String(editingTargetId) === String(row._id) ? "editing-row" : ""}">
              <td>${escapeHtml(accountName(row.accountId))}</td>
              <td>${escapeHtml(row.assetClass)}</td>
              <td class="num">${money(row.currentValue)}</td>
              <td class="num">${pct(row.currentWeight)}</td>
              <td class="num">${pct(Number(row.targetWeight || 0))}</td>
              <td class="num ${row.gap > 0 ? "positive" : row.gap < 0 ? "negative" : ""}">${pct(row.gap)}</td>
              ${showActions ? `
                <td>
                  <div class="table-actions">
                    <button type="button" class="mini-button" data-edit-target="${escapeHtml(row._id)}">수정</button>
                    <button type="button" class="mini-button danger-mini" data-delete-target="${escapeHtml(row._id)}">삭제</button>
                  </div>
                </td>
              ` : ""}
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderTrades() {
  const rows = state.trades.map((row) => ({ ...row, pnl: tradePnl(row), days: daysBetween(row.entryDate, row.exitDate) }));
  const avgDays = rows.length ? rows.reduce((sum, row) => sum + Number(row.days || 0), 0) / rows.length : 0;
  const grossProfit = rows.filter((row) => row.pnl > 0).reduce((sum, row) => sum + row.pnl, 0);
  const grossLoss = Math.abs(rows.filter((row) => row.pnl < 0).reduce((sum, row) => sum + row.pnl, 0));
  const profitFactor = grossLoss ? grossProfit / grossLoss : grossProfit ? Infinity : 0;
  return `
    <section class="summary-grid compact">
      ${card("평균 보유기간", `${avgDays.toFixed(1)}일`, "청산 거래 기준")}
      ${card("손익비 지표", profitFactor === Infinity ? "∞" : profitFactor.toFixed(2), "Gross Profit / Gross Loss")}
      ${card("복기 기록", `${rows.length}건`, "진입·청산 사유 포함")}
    </section>
    <section class="panel">
      <div class="panel-head"><h2>스윙매매 복기</h2><span>수정 / 삭제 가능</span></div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>계좌</th>
              <th>진입일</th>
              <th>청산일</th>
              <th>종목</th>
              <th>전략</th>
              <th>손익</th>
              <th>보유일</th>
              <th>진입 사유</th>
              <th>청산 사유</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((row) => `
              <tr class="${editingTradeId && String(editingTradeId) === String(row._id) ? "editing-row" : ""}">
                <td>${escapeHtml(accountName(row.accountId))}</td>
                <td>${escapeHtml(row.entryDate)}</td>
                <td>${escapeHtml(row.exitDate || "-")}</td>
                <td>${label(row.ticker)}</td>
                <td>${escapeHtml(row.strategy || "-")}</td>
                <td class="num ${row.pnl >= 0 ? "positive" : "negative"}">${money(row.pnl)}</td>
                <td class="num">${row.days ?? "-"}</td>
                <td>${escapeHtml(row.entryReason || "-")}</td>
                <td>${escapeHtml(row.exitReason || "-")}</td>
                <td>
                  <div class="table-actions">
                    <button type="button" class="mini-button" data-edit-trade="${escapeHtml(row._id)}">수정</button>
                    <button type="button" class="mini-button danger-mini" data-delete-trade="${escapeHtml(row._id)}">삭제</button>
                  </div>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
    <section class="panel" id="trade-editor-panel">
      <div class="panel-head"><h2>${editingTrade() ? "매매 기록 수정" : "매매 기록 직접 추가"}</h2><span>${editingTrade() ? "선택한 복기 기록을 수정합니다" : "기본값은 스윙 계좌"}</span></div>
      ${tradeForm()}
    </section>
  `;
}

function renderIncome() {
  const byMonth = sumBy(state.income, (row) => row.month, (row) => Number(row.gross || 0) - Number(row.tax || 0));
  const byType = sumBy(state.income, (row) => row.type, (row) => Number(row.gross || 0) - Number(row.tax || 0));
  const byAccount = sumBy(state.income, (row) => accountName(row.accountId), (row) => Number(row.gross || 0) - Number(row.tax || 0));
  return `
    <section class="grid-2">
      <article class="panel">
        <div class="panel-head"><h2>월별 세후 현금흐름</h2><span>배당+옵션 프리미엄</span></div>
        ${Object.keys(byMonth).length ? barList(byMonth) : empty("현금흐름 데이터가 없습니다.")}
      </article>
      <article class="panel">
        <div class="panel-head"><h2>계좌별 현금흐름</h2><span>세후 기준</span></div>
        ${Object.keys(byAccount).length ? barList(byAccount) : empty("계좌별 데이터가 없습니다.")}
      </article>
    </section>
    <section class="panel">
      <div class="panel-head"><h2>현금흐름 유형</h2><span>세후 기준</span></div>
      ${Object.keys(byType).length ? barList(byType) : empty("유형별 데이터가 없습니다.")}
    </section>
    <section class="panel">
      <div class="panel-head"><h2>배당·커버드콜 내역</h2><span>수정 / 삭제 가능</span></div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>월</th>
              <th>계좌</th>
              <th>종목/계약</th>
              <th>유형</th>
              <th>세전</th>
              <th>세금</th>
              <th>세후</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            ${state.income.map((row) => {
              const net = Number(row.gross || 0) - Number(row.tax || 0);
              return `
                <tr class="${editingIncomeId && String(editingIncomeId) === String(row._id) ? "editing-row" : ""}">
                  <td>${escapeHtml(row.month)}</td>
                  <td>${escapeHtml(accountName(row.accountId))}</td>
                  <td>${label(row.ticker)}</td>
                  <td>${escapeHtml(row.type || "-")}</td>
                  <td class="num">${money(row.gross)}</td>
                  <td class="num">${money(row.tax)}</td>
                  <td class="num">${money(net)}</td>
                  <td>
                    <div class="table-actions">
                      <button type="button" class="mini-button" data-edit-income="${escapeHtml(row._id)}">수정</button>
                      <button type="button" class="mini-button danger-mini" data-delete-income="${escapeHtml(row._id)}">삭제</button>
                    </div>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    </section>
    <section class="panel" id="income-editor-panel">
      <div class="panel-head"><h2>${editingIncome() ? "현금흐름 기록 수정" : "현금흐름 직접 추가"}</h2><span>${editingIncome() ? "선택한 배당·커버드콜 기록을 수정합니다" : "기본값은 배당주 투자 계좌"}</span></div>
      ${incomeForm()}
    </section>
  `;
}

function renderData() {
  return `
    <section class="panel prose">
      <h2>입력 데이터 관리 안내</h2>
      <p>입력한 데이터는 각 표의 수정 / 삭제 버튼으로 언제든지 변경할 수 있습니다. 보유 종목과 장기투자 목표 비중은 계좌별 분석 화면에서, 스윙매매 복기와 배당·커버드콜 현금흐름은 각 모듈 화면에서 관리합니다.</p>
    </section>
    <section class="panel">
      <div class="panel-head"><h2>환율 설정</h2><span>USD 자산을 원화 평가금액으로 환산합니다</span></div>
      ${fxSettingsForm()}
      <p class="muted">보유 종목에서 통화를 USD로 선택하면 평단과 현재가는 달러로 표시되고, 전체 평가금액과 계좌 비중은 위 환율을 적용한 원화 기준으로 계산됩니다.</p>
    </section>
    <section class="panel">
      <div class="panel-head"><h2>계좌 설정</h2><span>고객별 계좌명 변경 가능</span></div>
      ${accountSettingsForm()}
    </section>
    <section class="panel">
      <div class="panel-head"><h2>자산군 선택 목록</h2><span>보유 종목 입력 화면의 선택지입니다</span></div>
      <div class="chip-list">
        ${ASSET_CLASSES.map((assetClass) => `<span>${escapeHtml(assetClass)}</span>`).join("")}
      </div>
      <p class="muted">선택지는 config.js의 assetClasses 배열에서 고객별로 조정할 수 있습니다. 자유 입력을 막아 차트 집계 기준이 흔들리지 않게 합니다.</p>
    </section>
    <section class="grid-2">
      <article class="panel">
        <div class="panel-head"><h2>CSV 업로드</h2><span>accountId 컬럼으로 계좌를 구분합니다</span></div>
        ${csvUploadBlock("holdings", "보유 종목 CSV", "accountId,ticker,name,assetClass,market,currency,quantity,avgPrice,currentPrice")}
        ${csvUploadBlock("transactions", "날짜별 매수·매도·적립식 CSV", "date,accountId,type,ticker,name,assetClass,market,currency,quantity,price,memo")}
        ${csvUploadBlock("trades", "매매 복기 CSV", "accountId,entryDate,exitDate,ticker,strategy,entry,exit,quantity,entryReason,exitReason")}
        ${csvUploadBlock("income", "현금흐름 CSV", "accountId,month,ticker,type,gross,tax")}
        ${csvUploadBlock("targets", "장기투자 목표 비중 CSV", "accountId,assetClass,targetWeight")}
      </article>
      <article class="panel">
        <div class="panel-head"><h2>데이터 제어</h2><span>샘플 체험 / 실제 입력 / 백업 복원</span></div>
        <div class="action-list">
          <button id="load-sample" class="secondary" data-load-sample="true">샘플 데이터로 체험하기</button>
          <button id="clear-data" class="danger" data-start-empty="true">내 데이터로 새로 시작하기</button>
          <button type="button" class="ghost" data-export-backup="true">백업 파일 저장</button>
          <label class="ghost file-button">백업 파일 불러오기<input data-import-backup="true" type="file" accept=".json,application/json" /></label>
        </div>
        <p class="muted">브라우저 데이터 삭제, 기기 변경, 시크릿 모드 사용 시 localStorage 데이터가 사라질 수 있습니다. 고객에게 백업 내보내기 루틴을 안내하세요.</p>
        <p class="muted"><strong>계좌 ID:</strong> swing / long / dividend. CSV에서 accountId를 비워두면 기본 계좌로 분류됩니다. assetClass는 자산군 선택 목록과 같은 이름을 쓰는 것을 권장합니다.</p>
      </article>
    </section>
    <section class="panel">
      <div class="panel-head"><h2>현재 저장 상태</h2><span>${escapeHtml(STORAGE_KEY)}</span></div>
      <div class="status-grid">
        <div><strong>${state.accounts.length}</strong><span>계좌</span></div>
        <div><strong>${state.holdings.length}</strong><span>보유 항목</span></div>
        <div><strong>${state.transactions.length}</strong><span>날짜별 거래</span></div>
        <div><strong>${state.trades.length}</strong><span>매매 기록</span></div>
        <div><strong>${state.income.length}</strong><span>현금흐름</span></div>
        <div><strong>${state.targets.length}</strong><span>목표 비중</span></div>
      </div>
    </section>
  `;
}

function renderPrivacy() {
  return `
    <section class="panel prose">
      <h2>프라이버시 구조</h2>
      <p>이 대시보드는 고객이 직접 입력하거나 업로드한 데이터를 브라우저 내부 저장소에 저장하는 기본 구조입니다. 운영자 서버에 고객 금융 데이터를 별도로 저장하지 않는 방향으로 설계했습니다.</p>
      <ul>
        <li>증권사 계정, 비밀번호, API 키를 요청하지 않습니다.</li>
        <li>계산과 시각화는 브라우저에서 수행됩니다.</li>
        <li>고객은 백업 파일을 직접 내보내고 가져올 수 있습니다.</li>
        <li>화면 공유나 문의 상황에서는 프라이버시 모드로 금액과 종목명을 마스킹할 수 있습니다.</li>
      </ul>
      <h2>면책 문구</h2>
      <p>본 서비스는 고객이 직접 입력한 투자 데이터를 정리하고 시각화하기 위한 웹 대시보드 구축 서비스입니다. 특정 종목의 매수·매도 추천, 투자 타이밍 제공, 수익률 보장, 손실 보전, 자동매매 신호 제공은 포함하지 않습니다. 투자 판단과 그 결과에 대한 책임은 고객 본인에게 있습니다.</p>
      <h2>주의</h2>
      <p>운용자에게 사용자의 화면 캡처, 백업 파일, CSV 파일을 직접 전달하는 경우 해당 내용은 운용자가 볼 수 있습니다. 이 부분을 참고하여서 운용자에게 수정 사항 또는 추가적인 요구 사항들을 요청해주시길 바랍니다.</p>
    </section>
  `;
}

function donutChart(data, centerLabel, large, paletteName = "default") {
  const entries = Object.entries(data).filter(([, value]) => Number(value) > 0);
  if (!entries.length) return empty("차트에 표시할 데이터가 없습니다.");
  const total = entries.reduce((sum, [, value]) => sum + Number(value || 0), 0);
  const colors = chartPalette(paletteName);
  const chart = build3DPie(entries, colors, { large });
  return `
    <div class="donut-wrap ${large ? "large" : ""} palette-${escapeHtml(paletteName)} pie3d-tooltip-wrap" style="grid-template-columns:1fr; justify-items:center; align-items:center;">
      <div class="pie3d-column" style="display:flex; flex-direction:column; align-items:center; gap:${large ? 14 : 12}px; min-width:0; width:100%;">
        <div class="pie3d-stage ${large ? "large" : ""}" style="width:${large ? 280 : 220}px; max-width:100%;">
          ${chart}
        </div>
        <div class="pie3d-metric ${large ? "large" : ""}" style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; width:${large ? 240 : 198}px; max-width:100%; padding:${large ? "14px 18px" : "12px 15px"}; border-radius:18px; border:1px solid rgba(148,163,184,0.18); background:linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.38)); box-shadow:0 14px 28px rgba(15,23,42,0.10); backdrop-filter: blur(10px); text-align:center;">
          <span style="font-size:${large ? "0.86rem" : "0.78rem"}; color:#475569; font-weight:700; letter-spacing:0.02em;">${escapeHtml(centerLabel)}</span>
          <strong style="font-size:${large ? "1.25rem" : "1.02rem"}; color:#0f172a; letter-spacing:-0.04em; font-variant-numeric:tabular-nums;">${money(total)}</strong>
        </div>
        <div class="pie3d-hover-note">파이 조각에 마우스를 올리면 이름·비중·금액이 표시됩니다.</div>
      </div>
    </div>
  `;
}

function sunburstChart() {
  const accountEntries = accountTotals().filter((account) => account.total > 0);
  if (!accountEntries.length) return empty("Sunburst 차트에 표시할 데이터가 없습니다.");
  const accountData = Object.fromEntries(accountEntries.map((account) => [account.name, account.total]));
  const inner = donutChart(accountData, "Premium", true, "accounts");
  return `
    <div class="sunburst-placeholder">
      ${inner}
      <p class="muted">정식 Premium 구현에서는 안쪽 계층은 계좌, 바깥쪽 계층은 각 계좌 내부 종목으로 확장됩니다. 현재 스타터는 외부 라이브러리 없이 기본 구조만 제공합니다.</p>
    </div>
  `;
}

function barList(data) {
  const entries = Object.entries(data).filter(([, value]) => Number(value) > 0).sort((a, b) => Number(b[1]) - Number(a[1]));
  const max = Math.max(...entries.map((entry) => Number(entry[1])), 1);
  if (!entries.length) return empty("표시할 데이터가 없습니다.");
  return `<div class="bar-list">
    ${entries.map(([key, value]) => {
      const width = Math.max(4, (Number(value) / max) * 100);
      return `
        <div class="bar-row">
          <div class="bar-meta"><span>${label(key)}</span><strong>${money(value)}</strong></div>
          <div class="bar-track"><div class="bar-fill" style="width:${width}%"></div></div>
        </div>
      `;
    }).join("")}
  </div>`;
}

function holdingsTable(rows, options = {}) {
  if (!rows.length) return empty("보유 종목 데이터가 없습니다.");
  const showActions = Boolean(options.actions);
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>계좌</th>
            <th>종목</th>
            <th>이름</th>
            <th>자산군</th>
            <th>수량</th>
            <th>통화</th>
            <th>평단</th>
            <th>현재가</th>
            <th>원금</th>
            <th>평가금액</th>
            <th>손익률</th>
            ${showActions ? "<th>관리</th>" : ""}
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => {
            const invested = investedValue(row);
            const value = holdingValue(row);
            const pnlRate = invested ? ((value - invested) / invested) * 100 : 0;
            return `
              <tr class="${editingHoldingId && String(editingHoldingId) === String(row._id) ? "editing-row" : ""}">
                <td>${escapeHtml(accountName(row.accountId))}</td>
                <td>${label(row.ticker)}</td>
                <td>${label(row.name)}</td>
                <td>${escapeHtml(row.assetClass || "-")}</td>
                <td class="num">${money(row.quantity)}</td>
                <td>${escapeHtml(holdingCurrency(row))}</td>
                <td class="num">${priceMoney(row.avgPrice, holdingCurrency(row))}</td>
                <td class="num">${priceMoney(row.currentPrice, holdingCurrency(row))}</td>
                <td class="num">${money(invested)}</td>
                <td class="num">${money(value)}</td>
                <td class="num ${pnlRate >= 0 ? "positive" : "negative"}">${pct(pnlRate)}</td>
                ${showActions ? `
                  <td>
                    <div class="table-actions">
                      <button type="button" class="mini-button" data-edit-holding="${escapeHtml(row._id)}">수정</button>
                      <button type="button" class="mini-button danger-mini" data-delete-holding="${escapeHtml(row._id)}">삭제</button>
                    </div>
                  </td>
                ` : ""}
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function empty(text) {
  return `<div class="empty">${escapeHtml(text)}</div>`;
}


function fxSettingsForm() {
  return `
    <form id="fx-settings-form" class="form-grid fx-settings-form">
      <label>USD/KRW 적용 환율
        <input name="usdKrw" type="number" step="any" min="1" value="${escapeHtml(usdKrwRate())}" required />
      </label>
      <button class="primary" type="submit">환율 저장</button>
    </form>
  `;
}

function accountSettingsForm() {
  return `
    <form id="account-settings-form" class="account-settings-grid">
      ${state.accounts.map((account, index) => `
        <fieldset>
          <legend>계좌 ${index + 1}</legend>
          <input type="hidden" name="id-${index}" value="${escapeHtml(account.id)}" />
          <label>계좌명<input name="name-${index}" value="${escapeHtml(account.name)}" required /></label>
          <label>설명<input name="description-${index}" value="${escapeHtml(account.description || "")}" /></label>
        </fieldset>
      `).join("")}
      <button class="primary" type="submit">계좌 설정 저장</button>
    </form>
  `;
}

function holdingForm() {
  const current = editingHolding();
  const mode = current ? "edit" : "create";
  const selectedAccountId = current?.accountId || "swing";
  const selectedAssetClass = current?.assetClass || "미국 개별주";
  const selectedCurrency = current?.currency || defaultCurrencyForRow(current || { assetClass: selectedAssetClass });

  return `
    <form id="holding-form" class="form-grid holding-editor ${mode === "edit" ? "editing" : ""}">
      ${current ? `<input type="hidden" name="_id" value="${escapeHtml(current._id)}" />` : ""}
      ${current ? `
        <div class="form-notice">
          <strong>보유 종목 수정 중</strong>
          <span>${escapeHtml(current.ticker || "-")} 항목을 수정하고 있습니다. 저장하면 기존 항목이 새 값으로 교체됩니다.</span>
        </div>
      ` : ""}
      <select name="accountId" required>${accountOptions(selectedAccountId)}</select>
      <input name="ticker" placeholder="종목코드" value="${escapeHtml(current?.ticker || "")}" required />
      <input name="name" placeholder="종목명" value="${escapeHtml(current?.name || "")}" />
      <select name="assetClass" required>${assetClassOptions(selectedAssetClass)}</select>
      <input name="market" placeholder="시장" value="${escapeHtml(current?.market || "")}" />
      <select name="currency" required>${currencyOptions(selectedCurrency)}</select>
      <input name="quantity" type="number" step="any" placeholder="수량" value="${escapeHtml(current?.quantity ?? "")}" required />
      <input name="avgPrice" type="number" step="any" placeholder="평균단가" value="${escapeHtml(current?.avgPrice ?? "")}" required />
      <input name="currentPrice" type="number" step="any" placeholder="현재가" value="${escapeHtml(current?.currentPrice ?? "")}" required />
      <button class="primary" type="submit">${current ? "수정 저장" : "보유 종목 추가"}</button>
      ${current ? `<button id="cancel-holding-edit" class="secondary" type="button">수정 취소</button>` : ""}
    </form>
  `;
}

function tradeForm() {
  const current = editingTrade();
  const mode = current ? "edit" : "create";
  const selectedAccountId = current?.accountId || "swing";

  return `
    <form id="trade-form" class="form-grid record-editor ${mode === "edit" ? "editing" : ""}">
      ${current ? `<input type="hidden" name="_id" value="${escapeHtml(current._id)}" />` : ""}
      ${current ? `
        <div class="form-notice">
          <strong>매매 기록 수정 중</strong>
          <span>${escapeHtml(current.ticker || "-")} 복기 기록을 수정하고 있습니다. 저장하면 기존 기록이 새 값으로 교체됩니다.</span>
        </div>
      ` : ""}
      <select name="accountId" required>${accountOptions(selectedAccountId)}</select>
      <input name="entryDate" type="date" value="${escapeHtml(current?.entryDate || "")}" required />
      <input name="exitDate" type="date" value="${escapeHtml(current?.exitDate || "")}" />
      <input name="ticker" placeholder="종목코드" value="${escapeHtml(current?.ticker || "")}" required />
      <input name="strategy" placeholder="전략" value="${escapeHtml(current?.strategy || "")}" />
      <input name="entry" type="number" step="any" placeholder="진입가" value="${escapeHtml(current?.entry ?? "")}" required />
      <input name="exit" type="number" step="any" placeholder="청산가" value="${escapeHtml(current?.exit ?? "")}" />
      <input name="quantity" type="number" step="any" placeholder="수량" value="${escapeHtml(current?.quantity ?? "")}" required />
      <input name="entryReason" placeholder="진입 사유" value="${escapeHtml(current?.entryReason || "")}" />
      <input name="exitReason" placeholder="청산 사유" value="${escapeHtml(current?.exitReason || "")}" />
      <button class="primary" type="submit">${current ? "수정 저장" : "매매 기록 추가"}</button>
      ${current ? `<button id="cancel-trade-edit" class="secondary" type="button">수정 취소</button>` : ""}
    </form>
  `;
}

function incomeForm() {
  const current = editingIncome();
  const mode = current ? "edit" : "create";
  const selectedAccountId = current?.accountId || "dividend";
  const selectedType = current?.type || "배당";

  return `
    <form id="income-form" class="form-grid record-editor ${mode === "edit" ? "editing" : ""}">
      ${current ? `<input type="hidden" name="_id" value="${escapeHtml(current._id)}" />` : ""}
      ${current ? `
        <div class="form-notice">
          <strong>현금흐름 기록 수정 중</strong>
          <span>${escapeHtml(current.ticker || "-")} 현금흐름 기록을 수정하고 있습니다. 저장하면 기존 기록이 새 값으로 교체됩니다.</span>
        </div>
      ` : ""}
      <select name="accountId" required>${accountOptions(selectedAccountId)}</select>
      <input name="month" type="month" value="${escapeHtml(current?.month || "")}" required />
      <input name="ticker" placeholder="종목/계약" value="${escapeHtml(current?.ticker || "")}" required />
      <select name="type">
        <option ${selectedType === "배당" ? "selected" : ""}>배당</option>
        <option ${selectedType === "옵션 프리미엄" ? "selected" : ""}>옵션 프리미엄</option>
      </select>
      <input name="gross" type="number" step="any" placeholder="세전 금액" value="${escapeHtml(current?.gross ?? "")}" required />
      <input name="tax" type="number" step="any" placeholder="세금" value="${escapeHtml(current?.tax ?? 0)}" />
      <button class="primary" type="submit">${current ? "수정 저장" : "현금흐름 추가"}</button>
      ${current ? `<button id="cancel-income-edit" class="secondary" type="button">수정 취소</button>` : ""}
    </form>
  `;
}

function targetForm(defaultAccountId = "long") {
  const current = editingTarget();
  const mode = current ? "edit" : "create";
  const selectedAccountId = current?.accountId || defaultAccountId || "long";
  const selectedAssetClass = current?.assetClass || "미국 ETF";

  return `
    <form id="target-form" class="form-grid record-editor target-editor ${mode === "edit" ? "editing" : ""}">
      ${current ? `<input type="hidden" name="_id" value="${escapeHtml(current._id)}" />` : ""}
      ${current ? `
        <div class="form-notice">
          <strong>장기투자 목표 비중 수정 중</strong>
          <span>${escapeHtml(current.assetClass || "-")} 목표 비중을 수정하고 있습니다. 저장하면 기존 목표값이 새 값으로 교체됩니다.</span>
        </div>
      ` : ""}
      <select name="accountId" required>${accountOptions(selectedAccountId)}</select>
      <select name="assetClass" required>${assetClassOptions(selectedAssetClass)}</select>
      <input name="targetWeight" type="number" step="any" min="0" max="100" placeholder="목표 비중(%)" value="${escapeHtml(current?.targetWeight ?? "")}" required />
      <button class="primary" type="submit">${current ? "수정 저장" : "목표 비중 추가"}</button>
      ${current ? `<button id="cancel-target-edit" class="secondary" type="button">수정 취소</button>` : ""}
    </form>
  `;
}


function transactionForm() {
  const today = new Date().toISOString().slice(0, 10);
  return `
    <form id="transaction-form" class="form-grid record-editor transaction-editor">
      <input name="date" type="date" value="${today}" required />
      <select name="accountId" required>${accountOptions("swing")}</select>
      <select name="type" required>
        <option value="buy">분할 매수</option>
        <option value="sell">분할 매도</option>
        <option value="regular_buy">적립식 매수</option>
        <option value="cash_in">추가 납입</option>
      </select>
      <input name="ticker" placeholder="종목코드" required />
      <input name="name" placeholder="종목명" />
      <select name="assetClass" required>${assetClassOptions("미국 개별주")}</select>
      <input name="market" placeholder="시장" />
      <select name="currency" required>${currencyOptions("USD")}</select>
      <input name="quantity" type="number" step="any" placeholder="수량" required />
      <input name="price" type="number" step="any" placeholder="체결가 / 납입금액" required />
      <input name="memo" placeholder="메모" />
      <button class="primary" type="submit">날짜별 기록 추가</button>
    </form>
  `;
}

function transactionTable(rows) {
  if (!rows.length) return empty("날짜별 매수·매도·적립식 기록이 없습니다.");
  const sorted = rows.slice().sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>날짜</th>
            <th>계좌</th>
            <th>유형</th>
            <th>종목</th>
            <th>자산군</th>
            <th>통화</th>
            <th>수량</th>
            <th>체결가</th>
            <th>거래금액(원화)</th>
            <th>메모</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          ${sorted.map((row) => `
            <tr>
              <td>${escapeHtml(row.date || "-")}</td>
              <td>${escapeHtml(accountName(row.accountId))}</td>
              <td>${escapeHtml(transactionTypeLabel(row.type))}</td>
              <td>${label(row.ticker)}</td>
              <td>${escapeHtml(row.assetClass || "-")}</td>
              <td>${escapeHtml(normalizeCurrency(row.currency, row))}</td>
              <td class="num">${money(row.quantity)}</td>
              <td class="num">${priceMoney(row.price, row.currency)}</td>
              <td class="num">${money(transactionAmount(row))}</td>
              <td>${escapeHtml(row.memo || "-")}</td>
              <td>
                <div class="table-actions">
                  <button type="button" class="mini-button danger-mini" data-delete-transaction="${escapeHtml(row._id)}">삭제</button>
                </div>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function csvUploadBlock(type, title, headers) {
  return `
    <div class="csv-block">
      <h3>${escapeHtml(title)}</h3>
      <code>${escapeHtml(headers)}</code>
      <label class="secondary file-button">CSV 선택<input data-csv="${escapeHtml(type)}" type="file" accept=".csv,text/csv" /></label>
    </div>
  `;
}

function resetEditingState() {
  editingHoldingId = null;
  editingTradeId = null;
  editingIncomeId = null;
  editingTargetId = null;
}

function loadSampleData() {
  state = normalizeState(clone(SAMPLE_DATA));
  resetEditingState();
  activeView = "overview";
  saveState();
  render();
}

function startEmptyData() {
  if (!confirm("현재 브라우저에 저장된 데이터를 비우고 내 데이터로 새로 시작할까요? 필요하면 먼저 백업 파일을 저장하세요.")) return;
  state = normalizeState({ accounts: clone(ACCOUNT_PRESETS), holdings: [], transactions: [], trades: [], income: [], targets: [], settings: state.settings });
  resetEditingState();
  activeView = "data";
  saveState();
  render();
}


function attachPie3DTooltips() {
  let tooltip = document.getElementById("pie3d-tooltip");
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.id = "pie3d-tooltip";
    tooltip.className = "pie3d-tooltip";
    tooltip.setAttribute("role", "status");
    tooltip.setAttribute("aria-live", "polite");
    document.body.appendChild(tooltip);
  }

  const show = (target, event) => {
    const text = target.dataset.pieTooltip;
    if (!text) return;
    tooltip.textContent = text;
    tooltip.classList.add("show");
    move(event);
  };

  const move = (event) => {
    if (!event) return;
    const offset = 14;
    const maxX = window.innerWidth - tooltip.offsetWidth - 12;
    const maxY = window.innerHeight - tooltip.offsetHeight - 12;
    const x = Math.min(maxX, Math.max(12, event.clientX + offset));
    const y = Math.min(maxY, Math.max(12, event.clientY + offset));
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
  };

  const hide = () => {
    tooltip.classList.remove("show");
  };

  document.querySelectorAll("[data-pie-tooltip]").forEach((slice) => {
    slice.addEventListener("mouseenter", (event) => show(slice, event));
    slice.addEventListener("mousemove", move);
    slice.addEventListener("mouseleave", hide);
    slice.addEventListener("focus", (event) => {
      const rect = slice.getBoundingClientRect();
      show(slice, { clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 });
    });
    slice.addEventListener("blur", hide);
  });
}

function attachViewEvents() {
  attachPie3DTooltips();
  const fxSettingsFormEl = document.getElementById("fx-settings-form");
  if (fxSettingsFormEl) {
    fxSettingsFormEl.addEventListener("submit", handleFxSettingsSubmit);
  }
  const holdingFormEl = document.getElementById("holding-form");
  if (holdingFormEl) {
    holdingFormEl.addEventListener("submit", handleHoldingSubmit);
  }
  const transactionFormEl = document.getElementById("transaction-form");
  if (transactionFormEl) {
    transactionFormEl.addEventListener("submit", handleTransactionSubmit);
  }
  const tradeFormEl = document.getElementById("trade-form");
  if (tradeFormEl) {
    tradeFormEl.addEventListener("submit", handleTradeSubmit);
  }
  const incomeFormEl = document.getElementById("income-form");
  if (incomeFormEl) {
    incomeFormEl.addEventListener("submit", handleIncomeSubmit);
  }
  const targetFormEl = document.getElementById("target-form");
  if (targetFormEl) {
    targetFormEl.addEventListener("submit", handleTargetSubmit);
  }
  const accountSettingsFormEl = document.getElementById("account-settings-form");
  if (accountSettingsFormEl) {
    accountSettingsFormEl.addEventListener("submit", handleAccountSettingsSubmit);
  }
  document.querySelectorAll("[data-csv]").forEach((input) => {
    input.addEventListener("change", handleCsvImport);
  });
  document.querySelectorAll("[data-load-sample]").forEach((button) => {
    button.addEventListener("click", loadSampleData);
  });
  document.querySelectorAll("[data-start-empty]").forEach((button) => {
    button.addEventListener("click", startEmptyData);
  });
  document.querySelectorAll("[data-export-backup]").forEach((button) => {
    button.addEventListener("click", exportBackup);
  });
  document.querySelectorAll("[data-import-backup]").forEach((input) => {
    input.addEventListener("change", importBackup);
  });
  document.querySelectorAll("[data-toggle-privacy]").forEach((button) => {
    button.addEventListener("click", () => {
      privacyMode = !privacyMode;
      render();
    });
  });
  document.querySelectorAll(".detail-card-trigger").forEach((card) => {
    card.addEventListener("dblclick", () => openOverviewDetail(card.dataset.detailTarget || "total"));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openOverviewDetail(card.dataset.detailTarget || "total");
      }
    });
  });
  document.querySelectorAll("[data-edit-holding]").forEach((button) => {
    button.addEventListener("click", () => {
      editingHoldingId = button.dataset.editHolding;
      activeView = "accounts";
      render();
      requestAnimationFrame(() => {
        document.getElementById("holding-editor-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  });

  document.querySelectorAll("[data-delete-holding]").forEach((button) => {
    button.addEventListener("click", () => {
      const holding = holdingById(button.dataset.deleteHolding);
      if (!holding) return;
      const name = holding.ticker || holding.name || "선택한 항목";
      if (confirm(`${name} 보유 종목을 삭제할까요?`)) {
        state.holdings = state.holdings.filter((row) => String(row._id) !== String(button.dataset.deleteHolding));
        if (String(editingHoldingId) === String(button.dataset.deleteHolding)) editingHoldingId = null;
        editingTradeId = null;
        editingIncomeId = null;
        editingTargetId = null;
        saveState();
        render();
      }
    });
  });

  const cancelHoldingEdit = document.getElementById("cancel-holding-edit");
  if (cancelHoldingEdit) {
    cancelHoldingEdit.addEventListener("click", () => {
      editingHoldingId = null;
      render();
    });
  }

  document.querySelectorAll("[data-delete-transaction]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = state.transactions.find((row) => String(row._id) === String(button.dataset.deleteTransaction));
      if (!item) return;
      if (confirm(`${item.ticker || "선택한"} 날짜별 거래 기록을 삭제할까요? 보유 종목 수량은 자동 되돌림 처리되지 않습니다.`)) {
        state.transactions = state.transactions.filter((row) => String(row._id) !== String(button.dataset.deleteTransaction));
        saveState();
        render();
      }
    });
  });


  document.querySelectorAll("[data-edit-trade]").forEach((button) => {
    button.addEventListener("click", () => {
      editingTradeId = button.dataset.editTrade;
      activeView = "trades";
      render();
      requestAnimationFrame(() => {
        document.getElementById("trade-editor-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  });

  document.querySelectorAll("[data-delete-trade]").forEach((button) => {
    button.addEventListener("click", () => {
      const trade = tradeById(button.dataset.deleteTrade);
      if (!trade) return;
      const name = trade.ticker || "선택한 매매 기록";
      if (confirm(`${name} 매매 복기 기록을 삭제할까요?`)) {
        state.trades = state.trades.filter((row) => String(row._id) !== String(button.dataset.deleteTrade));
        if (String(editingTradeId) === String(button.dataset.deleteTrade)) editingTradeId = null;
        saveState();
        render();
      }
    });
  });

  const cancelTradeEdit = document.getElementById("cancel-trade-edit");
  if (cancelTradeEdit) {
    cancelTradeEdit.addEventListener("click", () => {
      editingTradeId = null;
      render();
    });
  }

  document.querySelectorAll("[data-edit-income]").forEach((button) => {
    button.addEventListener("click", () => {
      editingIncomeId = button.dataset.editIncome;
      activeView = "income";
      render();
      requestAnimationFrame(() => {
        document.getElementById("income-editor-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  });

  document.querySelectorAll("[data-delete-income]").forEach((button) => {
    button.addEventListener("click", () => {
      const income = incomeById(button.dataset.deleteIncome);
      if (!income) return;
      const name = income.ticker || "선택한 현금흐름 기록";
      if (confirm(`${name} 배당·커버드콜 현금흐름 기록을 삭제할까요?`)) {
        state.income = state.income.filter((row) => String(row._id) !== String(button.dataset.deleteIncome));
        if (String(editingIncomeId) === String(button.dataset.deleteIncome)) editingIncomeId = null;
        editingTargetId = null;
        saveState();
        render();
      }
    });
  });

  const cancelIncomeEdit = document.getElementById("cancel-income-edit");
  if (cancelIncomeEdit) {
    cancelIncomeEdit.addEventListener("click", () => {
      editingIncomeId = null;
      render();
    });
  }

  document.querySelectorAll("[data-edit-target]").forEach((button) => {
    button.addEventListener("click", () => {
      editingTargetId = button.dataset.editTarget;
      activeView = "accounts";
      render();
      requestAnimationFrame(() => {
        document.getElementById("target-editor-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  });

  document.querySelectorAll("[data-delete-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = targetById(button.dataset.deleteTarget);
      if (!target) return;
      const name = target.assetClass || "선택한 목표 비중";
      if (confirm(`${name} 장기투자 목표 비중 항목을 삭제할까요?`)) {
        state.targets = state.targets.filter((row) => String(row._id) !== String(button.dataset.deleteTarget));
        if (String(editingTargetId) === String(button.dataset.deleteTarget)) editingTargetId = null;
        saveState();
        render();
      }
    });
  });

  const cancelTargetEdit = document.getElementById("cancel-target-edit");
  if (cancelTargetEdit) {
    cancelTargetEdit.addEventListener("click", () => {
      editingTargetId = null;
      render();
    });
  }

}


function handleFxSettingsSubmit(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  const usdKrw = Number(data.usdKrw || 0);
  if (!Number.isFinite(usdKrw) || usdKrw <= 0) {
    alert("환율은 0보다 큰 숫자로 입력하세요.");
    return;
  }
  state.settings = normalizeSettings({ ...state.settings, usdKrw });
  saveState();
  render();
}

function applyTransactionToHolding(transaction) {
  const type = transaction.type;
  if (!["buy", "sell", "regular_buy", "cash_in"].includes(type)) return;

  if (type === "cash_in") {
    const currency = normalizeCurrency(transaction.currency, transaction);
    const cashTicker = currency === "USD" ? "USD-CASH" : "KRW";
    const existing = state.holdings.find((row) => row.accountId === transaction.accountId && String(row.ticker || "").toUpperCase() === cashTicker);
    const amount = Number(transaction.quantity || 0) * Number(transaction.price || 0);
    if (existing) {
      existing.quantity = 1;
      existing.avgPrice = Number(existing.avgPrice || 0) + amount;
      existing.currentPrice = Number(existing.currentPrice || 0) + amount;
      existing.currency = currency;
      existing.assetClass = "현금";
    } else {
      state.holdings.push(normalizeHoldingRow({
        accountId: transaction.accountId,
        ticker: cashTicker,
        name: currency === "USD" ? "달러 예수금" : "원화 예수금",
        assetClass: "현금",
        market: currency === "USD" ? "US" : "KR",
        currency,
        quantity: 1,
        avgPrice: amount,
        currentPrice: amount
      }));
    }
    return;
  }

  const ticker = String(transaction.ticker || "").trim();
  if (!ticker) return;
  const existing = state.holdings.find((row) => row.accountId === transaction.accountId && String(row.ticker || "").trim().toUpperCase() === ticker.toUpperCase());
  const qty = Number(transaction.quantity || 0);
  const price = Number(transaction.price || 0);
  if (!qty || !price) return;

  if (type === "sell") {
    if (!existing) return;
    const nextQty = Math.max(0, Number(existing.quantity || 0) - qty);
    if (nextQty <= 0) {
      state.holdings = state.holdings.filter((row) => String(row._id) !== String(existing._id));
    } else {
      existing.quantity = nextQty;
      existing.currentPrice = price;
      existing.currency = normalizeCurrency(transaction.currency, transaction);
    }
    return;
  }

  if (existing) {
    const oldQty = Number(existing.quantity || 0);
    const nextQty = oldQty + qty;
    existing.avgPrice = nextQty ? ((oldQty * Number(existing.avgPrice || 0)) + (qty * price)) / nextQty : price;
    existing.quantity = nextQty;
    existing.currentPrice = price;
    existing.name = transaction.name || existing.name;
    existing.assetClass = transaction.assetClass || existing.assetClass;
    existing.market = transaction.market || existing.market;
    existing.currency = normalizeCurrency(transaction.currency, transaction);
  } else {
    state.holdings.push(normalizeHoldingRow({
      accountId: transaction.accountId,
      ticker: transaction.ticker,
      name: transaction.name,
      assetClass: transaction.assetClass,
      market: transaction.market,
      currency: transaction.currency,
      quantity: qty,
      avgPrice: price,
      currentPrice: price
    }));
  }
}

function handleTransactionSubmit(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  ["quantity", "price"].forEach((field) => {
    if (data[field] !== undefined && data[field] !== "") data[field] = Number(data[field]);
  });
  const transaction = normalizeTransactionRow(data);
  state.transactions.push(transaction);
  applyTransactionToHolding(transaction);
  saveState();
  render();
}

function handleHoldingSubmit(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  ["quantity", "avgPrice", "currentPrice"].forEach((field) => {
    if (data[field] !== undefined && data[field] !== "") data[field] = Number(data[field]);
  });

  const existingId = data._id || editingHoldingId;
  delete data._id;

  if (existingId) {
    const index = state.holdings.findIndex((row) => String(row._id) === String(existingId));
    if (index >= 0) {
      state.holdings[index] = normalizeHoldingRow({ ...state.holdings[index], ...data, _id: existingId });
    } else {
      state.holdings.push(normalizeHoldingRow({ ...data, _id: existingId }));
    }
    editingHoldingId = null;
  } else {
    state.holdings.push(normalizeHoldingRow(data));
  }

  saveState();
  render();
}

function handleTradeSubmit(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  ["entry", "exit", "quantity"].forEach((field) => {
    if (data[field] !== undefined && data[field] !== "") data[field] = Number(data[field]);
  });

  const existingId = data._id || editingTradeId;
  delete data._id;

  if (existingId) {
    const index = state.trades.findIndex((row) => String(row._id) === String(existingId));
    if (index >= 0) {
      state.trades[index] = normalizeTradeRow({ ...state.trades[index], ...data, _id: existingId });
    } else {
      state.trades.push(normalizeTradeRow({ ...data, _id: existingId }));
    }
    editingTradeId = null;
  } else {
    state.trades.push(normalizeTradeRow(data));
  }

  saveState();
  render();
}

function handleIncomeSubmit(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  ["gross", "tax"].forEach((field) => {
    if (data[field] !== undefined && data[field] !== "") data[field] = Number(data[field]);
  });

  const existingId = data._id || editingIncomeId;
  delete data._id;

  if (existingId) {
    const index = state.income.findIndex((row) => String(row._id) === String(existingId));
    if (index >= 0) {
      state.income[index] = normalizeIncomeRow({ ...state.income[index], ...data, _id: existingId });
    } else {
      state.income.push(normalizeIncomeRow({ ...data, _id: existingId }));
    }
    editingIncomeId = null;
  } else {
    state.income.push(normalizeIncomeRow(data));
  }

  saveState();
  render();
}


function handleTargetSubmit(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  if (data.targetWeight !== undefined && data.targetWeight !== "") data.targetWeight = Number(data.targetWeight);

  const existingId = data._id || editingTargetId;
  delete data._id;

  if (existingId) {
    const index = state.targets.findIndex((row) => String(row._id) === String(existingId));
    if (index >= 0) {
      state.targets[index] = normalizeTargetRow({ ...state.targets[index], ...data, _id: existingId });
    } else {
      state.targets.push(normalizeTargetRow({ ...data, _id: existingId }));
    }
    editingTargetId = null;
  } else {
    state.targets.push(normalizeTargetRow(data));
  }

  saveState();
  render();
}


function handleAccountSettingsSubmit(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  state.accounts = state.accounts.map((account, index) => ({
    ...account,
    name: String(data[`name-${index}`] || account.name).trim() || account.name,
    description: String(data[`description-${index}`] || "").trim()
  }));
  saveState();
  render();
}

function exportBackup() {
  const payload = {
    exportedAt: new Date().toISOString(),
    version: "portfolio-dashboard-all-pie-walls-v17",
    data: state
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `portfolio-dashboard-backup-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function importBackup(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      const data = parsed.data || parsed;
      state = normalizeState(data);
      editingHoldingId = null;
      editingTradeId = null;
      editingIncomeId = null;
      editingTargetId = null;
      saveState();
      render();
    } catch (error) {
      alert("백업 파일을 읽을 수 없습니다.");
    }
  };
  reader.readAsText(file);
}

function handleCsvImport(event) {
  const file = event.target.files[0];
  const collection = event.target.dataset.csv;
  if (!file || !collection) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const rows = parseCsv(reader.result);
      const numericByCollection = {
        holdings: ["quantity", "avgPrice", "currentPrice"],
        transactions: ["quantity", "price"],
        trades: ["entry", "exit", "quantity"],
        income: ["gross", "tax"],
        targets: ["targetWeight"]
      };
      const parsedRows = rows.map((row) => coerceCsvRow(row, numericByCollection[collection] || []));
      const normalizedRows = normalizeRows(parsedRows, buildAccountNameMap(state.accounts), defaultAccountIdFor(collection));
      const normalizedWithIds = collection === "holdings"
        ? normalizedRows.map(normalizeHoldingRow)
        : collection === "transactions"
          ? normalizedRows.map(normalizeTransactionRow)
          : collection === "trades"
            ? normalizedRows.map(normalizeTradeRow)
            : collection === "income"
              ? normalizedRows.map(normalizeIncomeRow)
              : collection === "targets"
                ? normalizedRows.map(normalizeTargetRow)
                : normalizedRows;
      state[collection] = state[collection].concat(normalizedWithIds);
      if (collection === "holdings") editingHoldingId = null;
      if (collection === "transactions") normalizedWithIds.forEach(applyTransactionToHolding);
      if (collection === "trades") editingTradeId = null;
      if (collection === "income") editingIncomeId = null;
      if (collection === "targets") editingTargetId = null;
      editingTradeId = null;
      editingIncomeId = null;
      editingTargetId = null;
      saveState();
      render();
    } catch (error) {
      alert(`CSV 업로드 실패: ${error.message}`);
    }
  };
  reader.readAsText(file);
}

function defaultAccountIdFor(collection) {
  if (collection === "transactions") return state.accounts[0]?.id || "swing";
  if (collection === "trades") return "swing";
  if (collection === "income") return "dividend";
  if (collection === "targets") return "long";
  return state.accounts[0]?.id || "swing";
}

function coerceCsvRow(row, numericFields) {
  const next = { ...row };
  numericFields.forEach((field) => {
    if (next[field] !== undefined && next[field] !== "") next[field] = Number(next[field]);
  });
  return next;
}

function parseCsv(text) {
  const rows = [];
  let current = "";
  let row = [];
  let insideQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && insideQuotes && next === '"') {
      current += '"';
      i += 1;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      row.push(current.trim());
      current = "";
    } else if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(current.trim());
      if (row.some((cell) => cell !== "")) rows.push(row);
      row = [];
      current = "";
    } else {
      current += char;
    }
  }
  row.push(current.trim());
  if (row.some((cell) => cell !== "")) rows.push(row);

  if (rows.length < 2) return [];
  const headers = rows[0].map((header) => header.trim());
  return rows.slice(1).map((cells) => {
    const item = {};
    headers.forEach((header, index) => {
      item[header] = cells[index] ?? "";
    });
    return item;
  });
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", render);
}

