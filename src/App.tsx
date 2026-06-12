import { useState, type CSSProperties } from "react";

const raw = [
  { name: "Anthropic",        interview: 4.5, culture: 4.5, comp: 4.5, growth: 4.5 },
  { name: "Google",           interview: 4.5, culture: 4.0, comp: 4.0, growth: 4.5 },
  { name: "Netflix",          interview: 4.0, culture: 4.0, comp: 4.0, growth: 4.0 },
  { name: "NVIDIA",           interview: 4.0, culture: 4.0, comp: 4.0, growth: 4.5 },
  { name: "OpenAI",           interview: 4.0, culture: 3.0, comp: 5.0, growth: 4.5 },
  { name: "Waymo",            interview: 4.0, culture: 3.5, comp: 3.5, growth: 4.5 },
  { name: "Meta",             interview: 4.0, culture: 3.0, comp: 4.5, growth: 4.0 },
  { name: "Stripe",           interview: 4.0, culture: 3.5, comp: 4.0, growth: 4.0 },
  { name: "Amazon",           interview: 4.0, culture: 2.0, comp: 3.0, growth: 3.5 },
  { name: "Airbnb",           interview: 3.5, culture: 4.5, comp: 3.5, growth: 3.5 },
  { name: "Microsoft",        interview: 3.5, culture: 3.5, comp: 3.5, growth: 4.0 },
  { name: "Apple",            interview: 3.5, culture: 3.5, comp: 4.0, growth: 3.5 },
  { name: "Databricks",       interview: 3.5, culture: 3.5, comp: 3.5, growth: 3.5 },
  { name: "ByteDance/TikTok", interview: 3.5, culture: 2.5, comp: 4.0, growth: 3.0 },
  { name: "ServiceNow",       interview: 3.0, culture: 4.0, comp: 3.5, growth: 3.0 },
  { name: "Tesla",            interview: 3.0, culture: 2.5, comp: 2.5, growth: 3.0 },
];

const companies = raw.map(c => ({
  ...c,
  avg: Math.round(((c.culture + c.comp + c.growth) / 3) * 100) / 100,
}));

function scoreColor(v: number): string {
  if (v >= 4.8) return "#14532d";
  if (v >= 4.3) return "#166534";
  if (v >= 3.8) return "#15803d";
  if (v >= 3.3) return "#854d0e";
  if (v >= 2.8) return "#c2410c";
  return "#b91c1c";
}

function SortIcon({ active, dir }: { active: boolean; dir: string }) {
  return (
    <span style={{ marginLeft: 3, fontSize: 9, opacity: active ? 1 : 0.35 }}>
      {active ? (dir === "desc" ? "↓" : "↑") : "↕"}
    </span>
  );
}

const HDR_INTERVIEW: CSSProperties = { background: "#fef3c7", color: "#92400e" };
const HDR_CCG: CSSProperties       = { background: "#e8edf5", color: "#1e3a6b" };
const HDR_AVG: CSSProperties       = { background: "#1e293b", color: "#f1f5f9" };
const HDR_NAME: CSSProperties      = { background: "#1e293b", color: "#f1f5f9" };

const DIVIDER     = "3px solid #94a3b8";
const CELL_BORDER = "1px solid #f1f5f9";

type SortKey = "name" | "interview" | "culture" | "comp" | "growth" | "avg";

export default function App() {
  const [sort, setSort] = useState<{ key: SortKey; dir: string }>({ key: "avg", dir: "desc" });
  const [hovered, setHovered] = useState<string | null>(null);

  function handleSort(key: SortKey) {
    setSort(prev =>
      prev.key === key
        ? { key, dir: prev.dir === "desc" ? "asc" : "desc" }
        : { key, dir: key === "name" ? "asc" : "desc" }
    );
  }

  const sorted = [...companies].sort((a, b) => {
    const av = a[sort.key], bv = b[sort.key];
    if (typeof av === "string" && typeof bv === "string")
      return sort.dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    if (typeof av === "number" && typeof bv === "number")
      return sort.dir === "desc" ? bv - av : av - bv;
    return 0;
  });

  const thStyle = (extra: CSSProperties = {}): CSSProperties => ({
    padding: "8px 9px",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    cursor: "pointer",
    whiteSpace: "normal",
    lineHeight: 1.35,
    userSelect: "none",
    borderBottom: "2px solid #cbd5e1",
    position: "sticky",
    top: 0,
    zIndex: 2,
    verticalAlign: "bottom",
    ...extra,
  });

  return (
    <div style={{
      background: "#f8fafc",
      minHeight: "100vh",
      fontFamily: "'Inter', system-ui, sans-serif",
      padding: "24px 12px 48px",
    }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        {/* Title */}
        <div style={{ marginBottom: 16 }}>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "#64748b", marginBottom: 4,
          }}>
            PM & Dev · June 2026 · {companies.length} Companies
          </div>
          <h1 style={{
            fontSize: 22, fontWeight: 800, color: "#0f172a",
            margin: "0 0 6px", lineHeight: 1.2,
          }}>
            最值得工作的顶级公司
          </h1>
          <p style={{ fontSize: 12.5, color: "#64748b", margin: 0, lineHeight: 1.55 }}>
            Click any header to sort.{" "}
            <span style={{
              background: "#fef3c7", color: "#92400e",
              padding: "1px 5px", borderRadius: 3,
              fontWeight: 600, fontSize: 11,
            }}>
              Interview Difficulty
            </span>{" "}
            is a cost to get in — excluded from the C/C/G Avg.
          </p>
        </div>

        {/* Score legend */}
        <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
          {[
            { label: "4.5–5.0", color: "#166534", bg: "#dcfce7" },
            { label: "3.8–4.4", color: "#15803d", bg: "#d1fae5" },
            { label: "3.3–3.7", color: "#854d0e", bg: "#fef9c3" },
            { label: "2.8–3.2", color: "#c2410c", bg: "#ffedd5" },
            { label: "≤ 2.7",   color: "#b91c1c", bg: "#fee2e2" },
          ].map(s => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{
                width: 22, height: 13, borderRadius: 2,
                background: s.bg, border: `1px solid ${s.color}40`,
              }} />
              <span style={{ fontSize: 10.5, color: "#64748b" }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{
          borderRadius: 10,
          border: "1px solid #e2e8f0",
          boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
        } as CSSProperties}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: 520,
          }}>
            <thead>
              <tr>
                <th style={thStyle({
                  ...HDR_NAME,
                  width: 28, minWidth: 28,
                  textAlign: "center",
                  borderRight: "1px solid #334155",
                  position: "sticky", left: 0, zIndex: 4,
                })}>
                  #
                </th>

                <th
                  onClick={() => handleSort("name")}
                  style={thStyle({
                    ...HDR_NAME,
                    textAlign: "left",
                    minWidth: 110,
                    borderRight: DIVIDER,
                    position: "sticky", left: 28, zIndex: 4,
                  })}
                >
                  Company <SortIcon active={sort.key === "name"} dir={sort.dir} />
                </th>

                <th
                  onClick={() => handleSort("interview")}
                  style={thStyle({
                    ...HDR_INTERVIEW,
                    textAlign: "center",
                    minWidth: 72,
                    borderRight: DIVIDER,
                  })}
                >
                  Interview<br />Difficulty <SortIcon active={sort.key === "interview"} dir={sort.dir} />
                </th>

                <th
                  onClick={() => handleSort("culture")}
                  style={thStyle({ ...HDR_CCG, textAlign: "center", minWidth: 68, borderRight: CELL_BORDER })}
                >
                  Work<br />Culture <SortIcon active={sort.key === "culture"} dir={sort.dir} />
                </th>

                <th
                  onClick={() => handleSort("comp")}
                  style={thStyle({ ...HDR_CCG, textAlign: "center", minWidth: 72, borderRight: CELL_BORDER })}
                >
                  Compen-<br />sation <SortIcon active={sort.key === "comp"} dir={sort.dir} />
                </th>

                <th
                  onClick={() => handleSort("growth")}
                  style={thStyle({ ...HDR_CCG, textAlign: "center", minWidth: 78, borderRight: DIVIDER })}
                >
                  Personal /<br />Career Growth <SortIcon active={sort.key === "growth"} dir={sort.dir} />
                </th>

                <th
                  onClick={() => handleSort("avg")}
                  style={thStyle({ ...HDR_AVG, textAlign: "center", minWidth: 60, fontWeight: 800 })}
                >
                  C/C/G<br />Avg <SortIcon active={sort.key === "avg"} dir={sort.dir} />
                </th>
              </tr>
            </thead>

            <tbody>
              {sorted.map((co, i) => {
                const isHov    = hovered === co.name;
                const rowBg    = isHov ? "#f0f6ff" : "#ffffff";
                const stickyBg = isHov ? "#e8edf8" : "#f8fafc";

                const scoreCell = (val: number, rightBorder: string = CELL_BORDER) => (
                  <td style={{
                    padding: "9px 10px",
                    borderBottom: CELL_BORDER,
                    borderRight: rightBorder,
                    background: rowBg,
                    textAlign: "center",
                  }}>
                    <span style={{
                      fontSize: 15, fontWeight: 700,
                      color: scoreColor(val),
                      fontVariantNumeric: "tabular-nums",
                    }}>
                      {val.toFixed(1)}
                    </span>
                  </td>
                );

                return (
                  <tr
                    key={co.name}
                    onMouseEnter={() => setHovered(co.name)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Rank */}
                    <td style={{
                      padding: "9px 6px",
                      borderBottom: CELL_BORDER,
                      borderRight: "1px solid #e2e8f0",
                      background: stickyBg,
                      textAlign: "center",
                      fontSize: 11, fontWeight: 600, color: "#94a3b8",
                      position: "sticky" as const, left: 0, zIndex: 1,
                    }}>
                      {i + 1}
                    </td>

                    {/* Company */}
                    <td style={{
                      padding: "9px 10px",
                      borderBottom: CELL_BORDER,
                      borderRight: DIVIDER,
                      background: stickyBg,
                      position: "sticky" as const, left: 28, zIndex: 1,
                    }}>
                      <span style={{
                        fontSize: 13.5, fontWeight: 600,
                        color: "#1a2332", whiteSpace: "nowrap",
                      }}>
                        {co.name}
                      </span>
                    </td>

                    {scoreCell(co.interview, DIVIDER)}
                    {scoreCell(co.culture)}
                    {scoreCell(co.comp)}
                    {scoreCell(co.growth, DIVIDER)}

                    {/* Avg */}
                    <td style={{
                      padding: "9px 10px",
                      borderBottom: CELL_BORDER,
                      background: isHov ? "#e8f0fa" : "#f1f5f9",
                      textAlign: "center",
                    }}>
                      <span style={{
                        fontSize: 15, fontWeight: 800,
                        color: scoreColor(co.avg),
                        fontVariantNumeric: "tabular-nums",
                      }}>
                        {co.avg.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 10, fontSize: 10, color: "#94a3b8", lineHeight: 1.6 }}>
          Jane Street, Bain, Zoom, LinkedIn &amp; Figma removed (outside PM/Dev scope or list focus).
          Growth = composite of career advancement and self-growth (learning density, problem quality).
          Culture includes WLB. Interview Difficulty excluded from C/C/G Avg.
          Sources: Blind 2026, Glassdoor 2026, Fortune/GPTW 2026, LinkedIn 2026, Levels.fyi May 2026, SignalFire 2025.
        </div>
      </div>
    </div>
  );
}