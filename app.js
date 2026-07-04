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
  accounts: ["#38bdf8", "#8b5cf6", "#f59e0b"],
  swing: ["#38bdf8", "#0ea5e9", "#22d3ee", "#60a5fa", "#0284c7", "#7dd3fc", "#2563eb", "#67e8f9"],
  long: ["#8b5cf6", "#a78bfa", "#6366f1", "#c084fc", "#7c3aed", "#818cf8", "#d8b4fe", "#4f46e5"],
  dividend: ["#f59e0b", "#fbbf24", "#fb7185", "#f97316", "#fde68a", "#ef4444", "#fdba74", "#facc15"],
  asset: ["#38bdf8", "#a78bfa", "#34d399", "#f59e0b", "#f472b6", "#60a5fa", "#f97316", "#22c55e", "#eab308", "#fb7185", "#14b8a6", "#c084fc", "#94a3b8"],
  default: ["#38bdf8", "#34d399", "#fbbf24", "#a78bfa", "#fb7185", "#22c55e", "#60a5fa", "#f97316"]
};

function chartPalette(name) {
  return CHART_PALETTES[name] || CHART_PALETTES.default;
}

const STORAGE_KEY = CONFIG.storageKey || "portfolio-dashboard-local-v2";
const SESSION_KEY = `${STORAGE_KEY}:session`;
let state = loadInitialState();
let activeView = "overview";
let selectedOverviewTarget = "total";
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
  return normalizeState({ accounts: clone(ACCOUNT_PRESETS), holdings: [], trades: [], income: [], targets: clone(SAMPLE_DATA.targets) });
}

function normalizeState(raw) {
  const normalizedAccounts = normalizeAccounts(raw.accounts);
  const accountByName = buildAccountNameMap(normalizedAccounts);
  const fallbackAccountId = normalizedAccounts[0]?.id || "swing";

  return {
    accounts: normalizedAccounts,
    holdings: normalizeRows(raw.holdings, accountByName, fallbackAccountId),
    trades: normalizeRows(raw.trades, accountByName, "swing"),
    income: normalizeRows(raw.income, accountByName, "dividend"),
    targets: normalizeRows(raw.targets, accountByName, "long")
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

function holdingValue(row) {
  return Number(row.quantity || 0) * Number(row.currentPrice || 0);
}

function investedValue(row) {
  return Number(row.quantity || 0) * Number(row.avgPrice || 0);
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
      <a class="brand-mark" href="#" data-view="overview" aria-label="대시보드 홈">
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
          <button class="primary" data-view="overview">데모 화면 보기</button>
          <button class="secondary" data-view="data">입력 구조 확인</button>
          <button class="ghost" data-view="privacy">프라이버시 안내</button>
        </div>
        <div class="hero-badges">
          <span>3계좌 분리</span>
          <span>로컬 저장</span>
          <span>CSV 업로드</span>
          <span>백업/복원</span>
        </div>
      </div>

      <aside class="hero-dashboard-card" aria-label="데모 대시보드 미리보기">
        <div class="hero-card-head">
          <div>
            <span>총 평가금액</span>
            <strong>${money(t.total)}</strong>
          </div>
          <span class="pill">${pct(t.pnlRate)}</span>
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
      ${tabButton("overview", "전체 현황")}
      ${tabButton("accounts", "계좌·비중")}
      ${tabButton("trades", "스윙 복기")}
      ${tabButton("income", "배당·커버드콜")}
      ${tabButton("data", "데이터 관리")}
      ${tabButton("privacy", "프라이버시·면책")}
    </nav>

    <section class="summary-grid showroom-metrics">
      ${card("총 평가금액", money(t.total), pct(t.pnlRate))}
      ${card("평가손익", money(t.pnl), t.pnl >= 0 ? "수익 구간" : "손실 구간")}
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

function renderActiveView() {
  const view = document.getElementById("view");
  const renderers = {
    overview: renderOverview,
    accounts: renderAccounts,
    trades: renderTrades,
    income: renderIncome,
    data: renderData,
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
        ${Object.keys(byAsset).length ? barList(byAsset) : empty("자산군 데이터가 없습니다.")}
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
        ${Object.keys(byAsset).length ? barList(byAsset) : empty("자산군 데이터가 없습니다.")}
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
        <h2>3계좌 평가금액 비중</h2>
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
      ${targetRows.length ? targetTable(targetRows) : empty("장기투자 목표 비중 데이터가 없습니다.")}
    </section>

    <section class="panel">
      <div class="panel-head"><h2>전체 보유 종목</h2><span>${state.holdings.length}개 항목</span></div>
      ${holdingsTable(state.holdings)}
    </section>

    <section class="panel">
      <div class="panel-head"><h2>보유 종목 직접 추가</h2><span>계좌 선택 후 입력</span></div>
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

function targetTable(rows) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>자산군</th><th>현재 금액</th><th>현재 비중</th><th>목표 비중</th><th>괴리율</th></tr></thead>
        <tbody>
          ${rows.map((row) => `
            <tr>
              <td>${escapeHtml(row.assetClass)}</td>
              <td class="num">${money(row.currentValue)}</td>
              <td class="num">${pct(row.currentWeight)}</td>
              <td class="num">${pct(Number(row.targetWeight || 0))}</td>
              <td class="num ${row.gap > 0 ? "positive" : row.gap < 0 ? "negative" : ""}">${pct(row.gap)}</td>
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
      <div class="panel-head"><h2>스윙매매 복기</h2><span>계좌 선택값이 함께 저장됩니다</span></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>계좌</th><th>진입일</th><th>청산일</th><th>종목</th><th>전략</th><th>손익</th><th>보유일</th><th>진입 사유</th><th>청산 사유</th></tr></thead>
          <tbody>
            ${rows.map((row) => `
              <tr>
                <td>${escapeHtml(accountName(row.accountId))}</td>
                <td>${escapeHtml(row.entryDate)}</td>
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
    </section>
    <section class="panel">
      <div class="panel-head"><h2>매매 기록 직접 추가</h2><span>기본값은 스윙 계좌</span></div>
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
      <div class="panel-head"><h2>배당·커버드콜 내역</h2><span>세전/세후 구분</span></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>월</th><th>계좌</th><th>종목/계약</th><th>유형</th><th>세전</th><th>세금</th><th>세후</th></tr></thead>
          <tbody>
            ${state.income.map((row) => {
              const net = Number(row.gross || 0) - Number(row.tax || 0);
              return `
                <tr>
                  <td>${escapeHtml(row.month)}</td>
                  <td>${escapeHtml(accountName(row.accountId))}</td>
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
    </section>
    <section class="panel">
      <div class="panel-head"><h2>현금흐름 직접 추가</h2><span>기본값은 배당주 투자 계좌</span></div>
      ${incomeForm()}
    </section>
  `;
}

function renderData() {
  return `
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
        ${csvUploadBlock("holdings", "보유 종목 CSV", "accountId,ticker,name,assetClass,market,quantity,avgPrice,currentPrice")}
        ${csvUploadBlock("trades", "매매 복기 CSV", "accountId,entryDate,exitDate,ticker,strategy,entry,exit,quantity,entryReason,exitReason")}
        ${csvUploadBlock("income", "현금흐름 CSV", "accountId,month,ticker,type,gross,tax")}
      </article>
      <article class="panel">
        <div class="panel-head"><h2>데이터 제어</h2><span>고객 통제권 제공</span></div>
        <div class="action-list">
          <button id="load-sample" class="secondary">샘플 데이터 불러오기</button>
          <button id="clear-data" class="danger">전체 데이터 삭제</button>
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
        <div><strong>${state.trades.length}</strong><span>매매 기록</span></div>
        <div><strong>${state.income.length}</strong><span>현금흐름</span></div>
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
  let cursor = 0;
  const colors = chartPalette(paletteName);
  const segments = entries.map(([key, value], index) => {
    const start = cursor;
    const end = cursor + (Number(value) / total) * 100;
    cursor = end;
    return `${colors[index % colors.length]} ${start}% ${end}%`;
  });
  return `
    <div class="donut-wrap ${large ? "large" : ""} palette-${escapeHtml(paletteName)}">
      <div class="donut" style="background: conic-gradient(${segments.join(", ")});">
        <div class="donut-center"><span>${escapeHtml(centerLabel)}</span><strong>${money(total)}</strong></div>
      </div>
      <div class="legend-list">
        ${entries.map(([key, value], index) => {
          const share = total ? (Number(value) / total) * 100 : 0;
          return `
            <div class="legend-row">
              <span><i style="background:${colors[index % colors.length]}"></i>${label(key)}</span>
              <strong>${pct(share)}</strong>
            </div>
          `;
        }).join("")}
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

function holdingsTable(rows) {
  if (!rows.length) return empty("보유 종목 데이터가 없습니다.");
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>계좌</th><th>종목</th><th>이름</th><th>자산군</th><th>수량</th><th>평단</th><th>현재가</th><th>평가금액</th><th>손익률</th></tr></thead>
        <tbody>
          ${rows.map((row) => {
            const invested = investedValue(row);
            const value = holdingValue(row);
            const pnlRate = invested ? ((value - invested) / invested) * 100 : 0;
            return `
              <tr>
                <td>${escapeHtml(accountName(row.accountId))}</td>
                <td>${label(row.ticker)}</td>
                <td>${label(row.name)}</td>
                <td>${escapeHtml(row.assetClass || "-")}</td>
                <td class="num">${money(row.quantity)}</td>
                <td class="num">${money(row.avgPrice)}</td>
                <td class="num">${money(row.currentPrice)}</td>
                <td class="num">${money(value)}</td>
                <td class="num ${pnlRate >= 0 ? "positive" : "negative"}">${pct(pnlRate)}</td>
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
  return `
    <form id="holding-form" class="form-grid">
      <select name="accountId" required>${accountOptions("swing")}</select>
      <input name="ticker" placeholder="종목코드" required />
      <input name="name" placeholder="종목명" />
      <select name="assetClass" required>${assetClassOptions("미국 개별주")}</select>
      <input name="market" placeholder="시장" />
      <input name="quantity" type="number" step="any" placeholder="수량" required />
      <input name="avgPrice" type="number" step="any" placeholder="평균단가" required />
      <input name="currentPrice" type="number" step="any" placeholder="현재가" required />
      <button class="primary" type="submit">보유 종목 추가</button>
    </form>
  `;
}

function tradeForm() {
  return `
    <form id="trade-form" class="form-grid">
      <select name="accountId" required>${accountOptions("swing")}</select>
      <input name="entryDate" type="date" required />
      <input name="exitDate" type="date" />
      <input name="ticker" placeholder="종목코드" required />
      <input name="strategy" placeholder="전략" />
      <input name="entry" type="number" step="any" placeholder="진입가" required />
      <input name="exit" type="number" step="any" placeholder="청산가" />
      <input name="quantity" type="number" step="any" placeholder="수량" required />
      <input name="entryReason" placeholder="진입 사유" />
      <input name="exitReason" placeholder="청산 사유" />
      <button class="primary" type="submit">매매 기록 추가</button>
    </form>
  `;
}

function incomeForm() {
  return `
    <form id="income-form" class="form-grid">
      <select name="accountId" required>${accountOptions("dividend")}</select>
      <input name="month" type="month" required />
      <input name="ticker" placeholder="종목/계약" required />
      <select name="type"><option>배당</option><option>옵션 프리미엄</option></select>
      <input name="gross" type="number" step="any" placeholder="세전 금액" required />
      <input name="tax" type="number" step="any" placeholder="세금" value="0" />
      <button class="primary" type="submit">현금흐름 추가</button>
    </form>
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

function attachViewEvents() {
  const holdingFormEl = document.getElementById("holding-form");
  if (holdingFormEl) {
    holdingFormEl.addEventListener("submit", (event) => handleFormSubmit(event, "holdings", ["quantity", "avgPrice", "currentPrice"]));
  }
  const tradeFormEl = document.getElementById("trade-form");
  if (tradeFormEl) {
    tradeFormEl.addEventListener("submit", (event) => handleFormSubmit(event, "trades", ["entry", "exit", "quantity"]));
  }
  const incomeFormEl = document.getElementById("income-form");
  if (incomeFormEl) {
    incomeFormEl.addEventListener("submit", (event) => handleFormSubmit(event, "income", ["gross", "tax"]));
  }
  const accountSettingsFormEl = document.getElementById("account-settings-form");
  if (accountSettingsFormEl) {
    accountSettingsFormEl.addEventListener("submit", handleAccountSettingsSubmit);
  }
  document.querySelectorAll("[data-csv]").forEach((input) => {
    input.addEventListener("change", handleCsvImport);
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
  document.querySelectorAll(".detail-open-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openOverviewDetail(button.dataset.detailTarget || "total");
    });
  });

  const loadSample = document.getElementById("load-sample");
  if (loadSample) {
    loadSample.addEventListener("click", () => {
      state = clone(SAMPLE_DATA);
      saveState();
      render();
    });
  }
  const clearData = document.getElementById("clear-data");
  if (clearData) {
    clearData.addEventListener("click", () => {
      if (confirm("브라우저에 저장된 대시보드 데이터를 모두 삭제할까요?")) {
        state = normalizeState({ accounts: clone(ACCOUNT_PRESETS), holdings: [], trades: [], income: [], targets: clone(SAMPLE_DATA.targets) });
        saveState();
        render();
      }
    });
  }
}

function handleFormSubmit(event, collection, numericFields) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  numericFields.forEach((field) => {
    if (data[field] !== undefined && data[field] !== "") data[field] = Number(data[field]);
  });
  state[collection].push(data);
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
    version: "sales-starter-v2-three-accounts",
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
        trades: ["entry", "exit", "quantity"],
        income: ["gross", "tax"]
      };
      const parsedRows = rows.map((row) => coerceCsvRow(row, numericByCollection[collection] || []));
      state[collection] = state[collection].concat(normalizeRows(parsedRows, buildAccountNameMap(state.accounts), defaultAccountIdFor(collection)));
      saveState();
      render();
    } catch (error) {
      alert(`CSV 업로드 실패: ${error.message}`);
    }
  };
  reader.readAsText(file);
}

function defaultAccountIdFor(collection) {
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

