
:root {
  color-scheme: dark;
  --bg: #0f172a;
  --panel: #111827;
  --panel-2: #172036;
  --text: #e5e7eb;
  --muted: #94a3b8;
  --line: rgba(148, 163, 184, 0.22);
  --accent: #38bdf8;
  --good: #34d399;
  --bad: #fb7185;
  --warn: #fbbf24;
  --shadow: 0 24px 80px rgba(0, 0, 0, 0.24);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(56, 189, 248, 0.12), transparent 34rem),
    linear-gradient(180deg, #0b1120 0%, var(--bg) 100%);
  color: var(--text);
  font-family: Inter, Pretendard, "Apple SD Gothic Neo", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

button,
input,
select {
  font: inherit;
}

button,
.file-button {
  border: 1px solid var(--line);
  border-radius: 0.85rem;
  padding: 0.72rem 0.95rem;
  color: var(--text);
  background: rgba(15, 23, 42, 0.74);
  cursor: pointer;
  transition: transform 0.14s ease, border-color 0.14s ease, background 0.14s ease;
}

button:hover,
.file-button:hover {
  transform: translateY(-1px);
  border-color: rgba(56, 189, 248, 0.54);
}

.primary {
  background: linear-gradient(135deg, #0284c7, #0ea5e9);
  border-color: transparent;
  font-weight: 700;
}

.secondary {
  background: rgba(56, 189, 248, 0.1);
}

.ghost {
  background: rgba(255, 255, 255, 0.04);
}

.danger {
  background: rgba(251, 113, 133, 0.14);
  border-color: rgba(251, 113, 133, 0.34);
}

input,
select {
  width: 100%;
  min-width: 0;
  border: 1px solid var(--line);
  border-radius: 0.8rem;
  padding: 0.75rem 0.86rem;
  background: rgba(15, 23, 42, 0.76);
  color: var(--text);
}

input::placeholder {
  color: #64748b;
}

input[type="file"] {
  display: none;
}

#app {
  width: min(1240px, calc(100% - 32px));
  margin: 0 auto;
  padding: 34px 0 52px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: flex-start;
  margin-bottom: 18px;
}

.eyebrow,
.pill {
  display: inline-flex;
  width: fit-content;
  margin-bottom: 8px;
  border: 1px solid rgba(56, 189, 248, 0.28);
  border-radius: 999px;
  padding: 0.28rem 0.66rem;
  color: #7dd3fc;
  background: rgba(56, 189, 248, 0.08);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 8px;
  font-size: clamp(2rem, 3.7vw, 4rem);
  line-height: 1.04;
  letter-spacing: -0.05em;
}

h2 {
  margin-bottom: 0;
  font-size: 1.15rem;
  letter-spacing: -0.02em;
}

h3 {
  font-size: 0.98rem;
  margin-bottom: 8px;
}

.subcopy {
  max-width: 760px;
  color: var(--muted);
  line-height: 1.68;
}

.top-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.notice {
  margin: 18px 0;
  padding: 1rem 1.1rem;
  border: 1px solid rgba(251, 191, 36, 0.28);
  border-radius: 1rem;
  background: rgba(251, 191, 36, 0.08);
  color: #fde68a;
  line-height: 1.7;
}

.tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  padding: 8px;
  border: 1px solid var(--line);
  border-radius: 1.2rem;
  background: rgba(15, 23, 42, 0.62);
  position: sticky;
  top: 10px;
  z-index: 5;
  backdrop-filter: blur(16px);
}

.tabs button.active {
  background: rgba(56, 189, 248, 0.18);
  border-color: rgba(56, 189, 248, 0.48);
  color: #bae6fd;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin: 18px 0;
}

.summary-grid.compact {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.metric-card,
.panel,
.auth-card {
  border: 1px solid var(--line);
  border-radius: 1.3rem;
  background: rgba(17, 24, 39, 0.84);
  box-shadow: var(--shadow);
}

.metric-card {
  padding: 1.1rem;
}

.metric-card span,
.metric-card small,
.panel-head span,
.muted {
  color: var(--muted);
}

.metric-card span,
.metric-card small {
  display: block;
}

.metric-card strong {
  display: block;
  margin: 0.62rem 0 0.32rem;
  font-size: clamp(1.34rem, 2vw, 2rem);
  letter-spacing: -0.04em;
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.panel {
  padding: 1.1rem;
  margin-bottom: 16px;
}

.panel-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-end;
  margin-bottom: 16px;
}

.table-wrap {
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 840px;
}

th,
td {
  padding: 0.82rem 0.9rem;
  border-bottom: 1px solid var(--line);
  text-align: left;
  vertical-align: top;
  white-space: nowrap;
}

th {
  color: #cbd5e1;
  font-size: 0.82rem;
  background: rgba(255, 255, 255, 0.04);
}

td {
  color: #e2e8f0;
}

tr:last-child td {
  border-bottom: 0;
}

.num {
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.positive {
  color: var(--good);
}

.negative {
  color: var(--bad);
}

.bar-list {
  display: grid;
  gap: 14px;
}

.bar-meta {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 7px;
  font-size: 0.94rem;
}

.bar-track {
  height: 10px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.16);
}

.bar-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(14, 165, 233, 0.74), rgba(52, 211, 153, 0.78));
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.form-grid button {
  grid-column: span 2;
}

.csv-block {
  display: grid;
  gap: 10px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--line);
}

.csv-block:last-child {
  border-bottom: 0;
  margin-bottom: 0;
  padding-bottom: 0;
}

code {
  display: block;
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: 0.8rem;
  padding: 0.76rem;
  color: #bfdbfe;
  background: rgba(15, 23, 42, 0.92);
}

.file-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
}

.action-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 14px;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.status-grid div {
  border: 1px solid var(--line);
  border-radius: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.035);
}

.status-grid strong {
  display: block;
  margin-bottom: 4px;
  font-size: 1.7rem;
}

.status-grid span {
  color: var(--muted);
}

.empty {
  border: 1px dashed var(--line);
  border-radius: 1rem;
  padding: 1.4rem;
  color: var(--muted);
  text-align: center;
}

.prose {
  line-height: 1.76;
}

.prose ul {
  padding-left: 1.2rem;
}

.auth-shell {
  display: grid;
  min-height: 88vh;
  place-items: center;
}

.auth-card {
  width: min(560px, 100%);
  padding: 2rem;
}

.stack {
  display: grid;
  gap: 12px;
}

.error-text {
  min-height: 1.4rem;
  color: var(--bad);
}

@media (max-width: 900px) {
  #app {
    width: min(100% - 22px, 1240px);
    padding-top: 18px;
  }

  .topbar,
  .panel-head {
    display: block;
  }

  .top-actions {
    justify-content: flex-start;
  }

  .summary-grid,
  .summary-grid.compact,
  .grid-2,
  .status-grid {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-grid button {
    grid-column: auto;
  }

  .tabs {
    position: static;
  }
}
