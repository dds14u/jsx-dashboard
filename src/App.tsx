import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, LabelList, Legend,
} from "recharts";

const C = {
  paper: "#F4F6F8", card: "#FFFFFF", ink: "#1B2A3A", muted: "#5C6B7A",
  line: "#E4E8ED", indigo: "#2F4B7C", coral: "#DE6F4E",
  teal: "#2E8A86", gold: "#C0922B", rose: "#A8556B",
};
const FONT = '"Inter","Helvetica Neue",-apple-system,"PingFang SC","Microsoft YaHei",sans-serif';

/* ===================== DATA ===================== */
const DATA = {
  s2: {
    label: "调研二 · Survey 2",
    n: 21,
    h1: "21 位职场人，想要的到底是什么样的英语",
    lead: "What 21 working professionals actually need from their English — across roles, regions, and the moments that put them on the spot.",
    stats: [
      { k: "21",    v: "受访者 / respondents" },
      { k: "13",    v: "城市 / 地区 cities" },
      { k: "13/21", v: "线上会议是主战场" },
      { k: "16/21", v: "想更自信、更专业" },
    ],
    want: { max: 17, data: [
      { zh: "说话更自信、更专业", en: "Sound confident & professional", n: 16 },
      { zh: "邮件/消息更地道",    en: "Clearer, more native writing",   n: 11 },
      { zh: "被突然问到不卡壳",   en: "Handle being put on the spot",   n: 11 },
      { zh: "跟上老外快语速",     en: "Keep up with fast speech",       n: 10 },
      { zh: "自然聊天、拉近关系",  en: "Natural small talk & rapport",   n: 10 },
      { zh: "委婉表达不同意见",   en: "Disagree diplomatically",        n: 6  },
      { zh: "其他",              en: "Other",                           n: 2  },
    ]},
    wantSub: "多选题。说话更自信、更专业仍是头号诉求 (16/21, 76%) —— 学员买的是底气，不只是语法。",
    situations: { max: 14, data: [
      { zh: "线上视频会议",    en: "Online video meetings",  n: 13 },
      { zh: "写邮件 / 消息",  en: "Email & messaging",       n: 10 },
      { zh: "会议展示 / 汇报", en: "Presenting & reporting", n: 9  },
      { zh: "1 对 1 会议",    en: "1-on-1 meetings",         n: 3  },
      { zh: "自我 / 公司介绍", en: "Self & company intro",   n: 3  },
      { zh: "展览会",         en: "Trade shows",             n: 1  },
      { zh: "其他",           en: "Other",                   n: 1  },
    ]},
    whoWith: { max: 15, data: [
      { zh: "海外同事",   en: "Overseas colleagues",  use: 14, imp: 9 },
      { zh: "新客户",     en: "New customers",        use: 8,  imp: 8 },
      { zh: "高层管理",   en: "Senior management",    use: 8,  imp: 7 },
      { zh: "老客户",     en: "Existing customers",   use: 7,  imp: 7 },
      { zh: "其他",       en: "Other",                use: 5,  imp: 4 },
      { zh: "直属老板",   en: "Direct manager",       use: 5,  imp: 3 },
    ]},
    whoSub: "海外同事用得最多 (14)，且仍是最重要 (9)。Overseas colleagues dominate both.",
    challenges: [
      { zh: "会议演示与汇报",   en: "Presenting & reporting",   n: 6 },
      { zh: "线上会议",        en: "Online meetings",            n: 3 },
      { zh: "母语级期待 / 其他", en: "Native-level & other",      n: 4 },
      { zh: "一对一 / 技术沟通", en: "1-on-1 & technical talk",   n: 2 },
      { zh: "谈判与委婉",       en: "Negotiation & diplomacy",   n: 2 },
      { zh: "流利精准表达",     en: "Fluent, precise speech",    n: 2 },
      { zh: "临场应答",        en: "Thinking on your feet",      n: 1 },
      { zh: "开发新客户",      en: "Winning new customers",      n: 1 },
    ],
    region: [
      { zh: "华南",  en: "Southern China",   n: 6 },
      { zh: "华东",  en: "East China",       n: 6 },
      { zh: "内陆",  en: "Inland China",     n: 5 },
      { zh: "海外",  en: "International",    n: 3 },
      { zh: "北方",  en: "N / NE China",     n: 1 },
    ],
    regionSub: "归并为五区（华东已从华南拆出）。华东 6 = 上海×4 + 南京 + 常州。East China split out from Southern.",
    companySize: [
      { zh: "1-19", n: 2 }, { zh: "20-199", n: 2 }, { zh: "200-1999", n: 10 }, { zh: "2000+", n: 7 },
    ],
    industry: [
      { zh: "科技 / IT",      en: "Tech & IT",               n: 6 },
      { zh: "消费电子/半导体", en: "Electronics & semis",     n: 3 },
      { zh: "教育",           en: "Education",                n: 2 },
      { zh: "制造 / 建筑",    en: "Manufacturing & constr.", n: 2 },
      { zh: "通信",           en: "Telecom",                  n: 1 },
      { zh: "汽车",           en: "Automotive",               n: 1 },
      { zh: "外贸 / 电商",    en: "Trade & e-comm",           n: 1 },
      { zh: "金融",           en: "Finance",                  n: 1 },
      { zh: "医疗",           en: "Healthcare",               n: 1 },
      { zh: "营销",           en: "Marketing",                n: 1 },
      { zh: "人力资源",       en: "HR & recruiting",          n: 1 },
      { zh: "设计 / 字体",    en: "Design & type",            n: 1 },
    ],
    industrySub: "归并为行业大类。科技/电子/通信/汽车合计 11/21 偏科技。Tech-leaning.",
    role: [
      { zh: "工程 / 质量",   en: "Engineering & quality", n: 5 },
      { zh: "销售 / 客户",   en: "Sales & customer",      n: 3 },
      { zh: "商业分析 (BA)", en: "Business analyst",      n: 2 },
      { zh: "财务",          en: "Finance",               n: 2 },
      { zh: "行政 / 文员",   en: "Admin & clerical",      n: 2 },
      { zh: "产品经理",      en: "Product management",    n: 1 },
      { zh: "创始人",        en: "Founder / owner",       n: 1 },
      { zh: "技术咨询",      en: "Consulting",            n: 1 },
      { zh: "猎头",          en: "Recruiting",            n: 1 },
      { zh: "设计",          en: "Design",                n: 1 },
      { zh: "教学",          en: "Teaching",              n: 1 },
      { zh: "管理",          en: "Management",            n: 1 },
    ],
    roleSub: "归并为职能。工程/质量最多 (5)。Grouped into functions.",
    quotes: [
      { zh: "语音比想象中重要——第一次被其他组领导点名，就是因为英文发音。高层交谈，英文越地道越好。", en: "Pronunciation mattered more than expected — the first time a leader from another team called on me, it was my accent.", tag: "马德里 · 通信 / Madrid · Telecom" },
      { zh: "希望能做一个系统性课程，基础差的工程师学完可以直接进外企工作。", en: "A systematic course where a weak-base engineer can finish and walk into a foreign company.", tag: "东莞 · 消费电子 / Dongguan · Electronics" },
      { zh: "没有过英语工作沟通的初学者，希望可以达到工作水平。", en: "A total beginner at English for work — hoping to reach a real working level.", tag: "上海 · 营销 / Shanghai · Marketing" },
    ],
    footer: "N = 21（6/9 首批 13 + 6/11 新增 8）。多选题计数之和大于 21，百分比基于受访总人数。",
  },

  s1: {
    label: "调研一 · Survey 1",
    n: 13,
    h1: "13 位职场人，想要的到底是什么样的英语",
    lead: "What 13 working professionals actually need from their English — across roles, regions, and the moments that put them on the spot.",
    stats: [
      { k: "13",    v: "受访者 / respondents" },
      { k: "8",     v: "行业 / industries" },
      { k: "10/13", v: "线上会议是主战场" },
      { k: "10/13", v: "想更自信、更专业" },
    ],
    want: { max: 11, data: [
      { zh: "说话更自信、更专业", en: "Sound confident & professional", n: 10 },
      { zh: "自然聊天、拉近关系",  en: "Natural small talk & rapport",   n: 6  },
      { zh: "被突然问到不卡壳",   en: "Handle being put on the spot",   n: 6  },
      { zh: "跟上老外快语速",     en: "Keep up with fast speech",       n: 5  },
      { zh: "邮件/消息更地道",    en: "Clearer, more native writing",   n: 5  },
      { zh: "委婉表达不同意见",   en: "Disagree diplomatically",        n: 4  },
      { zh: "其他",              en: "Other",                           n: 2  },
    ]},
    wantSub: "多选题。说话更自信、更专业几乎是全场共识 (10/13)。The headline want is confidence and polish.",
    situations: { max: 11, data: [
      { zh: "线上视频会议",    en: "Online video meetings",  n: 10 },
      { zh: "写邮件 / 消息",  en: "Email & messaging",       n: 6  },
      { zh: "会议展示 / 汇报", en: "Presenting & reporting", n: 5  },
      { zh: "1 对 1 会议",    en: "1-on-1 meetings",         n: 2  },
      { zh: "自我 / 公司介绍", en: "Self & company intro",   n: 1  },
      { zh: "其他",           en: "Other",                   n: 1  },
    ]},
    whoWith: { max: 10, data: [
      { zh: "海外同事",   en: "Overseas colleagues",  use: 9, imp: 5 },
      { zh: "新客户",     en: "New customers",        use: 7, imp: 6 },
      { zh: "老客户",     en: "Existing customers",   use: 5, imp: 5 },
      { zh: "高层管理",   en: "Senior management",    use: 3, imp: 4 },
      { zh: "其他",       en: "Other",                use: 3, imp: 3 },
      { zh: "直属老板",   en: "Direct manager",       use: 1, imp: 0 },
    ]},
    whoSub: "海外同事用得最多 (9)，但论最重要，新客户反超 (6)。Most frequent is not most important.",
    challenges: [
      { zh: "演示 / 讲解汇报",   en: "Presenting & explaining",   n: 3 },
      { zh: "谈判 / 委婉表达",   en: "Negotiation & diplomacy",   n: 2 },
      { zh: "线上会议",         en: "Online meetings",            n: 2 },
      { zh: "母语级期待 / 其他", en: "Native-level & other",       n: 2 },
      { zh: "临场应答",         en: "Thinking on your feet",      n: 1 },
      { zh: "开发新客户",       en: "Winning new customers",      n: 1 },
      { zh: "精准简洁表达",     en: "Concise, precise speech",    n: 1 },
      { zh: "1对1 技术沟通",    en: "1-on-1 technical talk",      n: 1 },
    ],
    region: [
      { zh: "华南",  en: "Southern China",   n: 6 },
      { zh: "内陆",  en: "Inland China",     n: 3 },
      { zh: "海外",  en: "International",    n: 3 },
      { zh: "北方",  en: "N / NE China",     n: 1 },
    ],
    regionSub: "按秦岭-淮河线归入四区。东北严格意义为 0，青岛(山东)就近归北方。Four buckets; East China not yet split out.",
    companySize: [
      { zh: "1-19", n: 2 }, { zh: "20-199", n: 1 }, { zh: "200-1999", n: 6 }, { zh: "2000+", n: 4 },
    ],
    industry: [
      { zh: "科技 / IT",      en: "Tech & IT",           n: 4 },
      { zh: "消费电子/半导体", en: "Electronics & semis", n: 3 },
      { zh: "通信",           en: "Telecom",              n: 1 },
      { zh: "外贸 / 跨境",    en: "Trade & e-comm",       n: 1 },
      { zh: "制造业",         en: "Manufacturing",        n: 1 },
      { zh: "建筑施工",       en: "Construction",         n: 1 },
      { zh: "教育",           en: "Education",            n: 1 },
      { zh: "人力资源",       en: "HR & recruiting",      n: 1 },
    ],
    industrySub: "归并为行业大类。科技/电子/半导体合计 8/13 偏硬科技。Tech/hardware-heavy.",
    role: [
      { zh: "工程 / 质量",   en: "Engineering & quality", n: 4 },
      { zh: "商业分析 (BA)", en: "Business analyst",      n: 2 },
      { zh: "创始人",        en: "Founder / owner",       n: 1 },
      { zh: "销售 / 外贸",   en: "Sales & trade",         n: 1 },
      { zh: "财务",          en: "Finance",               n: 1 },
      { zh: "技术咨询",      en: "Consulting",            n: 1 },
      { zh: "猎头",          en: "Recruiting",            n: 1 },
      { zh: "设计",          en: "Design",                n: 1 },
      { zh: "教学",          en: "Teaching",              n: 1 },
    ],
    roleSub: "归并为职能。工程/质量最多 (4)。Grouped into functions.",
    quotes: [
      { zh: "语音比想象中重要——第一次被其他组领导点名，就是因为英文发音。高层交谈，英文越地道越好。", en: "Pronunciation mattered more than expected — the first time a leader called on me, it was my accent.", tag: "马德里 · 通信 / Madrid · Telecom" },
      { zh: "希望能做一个系统性课程，基础差的工程师学完可以直接进外企工作。", en: "A systematic course where a weak-base engineer can finish and walk into a foreign company.", tag: "东莞 · 消费电子 / Dongguan · Electronics" },
    ],
    footer: "N = 13（6/9 首批）。多选题计数之和大于 13，百分比基于受访总人数。",
  },
};

/* ===================== responsive hook ===================== */
function useIsNarrow(bp) {
  const limit = bp || 720;
  const [narrow, setNarrow] = useState(
    typeof window !== "undefined" ? window.innerWidth < limit : false
  );
  useEffect(() => {
    const onResize = () => setNarrow(window.innerWidth < limit);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [limit]);
  return narrow;
}

/* ===================== chart primitives ===================== */
function BilingualTick({ x, y, payload, data, narrow }) {
  const item = data[payload.index];
  if (!item) return null;
  const zhSize = narrow ? 13 : 15;
  const enSize = narrow ? 10.5 : 12;
  return (
    <g transform={"translate(" + x + "," + y + ")"}>
      <text x={-8} y={-2} textAnchor="end" fill={C.ink} fontSize={zhSize} fontWeight={600}>{item.zh}</text>
      <text x={-8} y={narrow ? 12 : 14} textAnchor="end" fill={C.muted} fontSize={enSize}>{item.en}</text>
    </g>
  );
}

function HBar({ data, color, maxX, narrow }) {
  const yw = narrow ? 124 : 188;
  return (
    <ResponsiveContainer width="100%" height={data.length * (narrow ? 48 : 54) + 24}>
      <BarChart layout="vertical" data={data} margin={{ top: 6, right: narrow ? 34 : 46, bottom: 6, left: 4 }} barCategoryGap="20%">
        <CartesianGrid horizontal={false} stroke={C.line} />
        <XAxis type="number" domain={[0, maxX]} tickCount={Math.min(maxX + 1, narrow ? 6 : 9)} tick={{ fill: C.muted, fontSize: 12 }} axisLine={{ stroke: C.line }} tickLine={false} />
        <YAxis type="category" dataKey="zh" width={yw} tickLine={false} axisLine={false} tick={(p) => <BilingualTick {...p} data={data} narrow={narrow} />} />
        <Tooltip cursor={{ fill: "rgba(0,0,0,0.04)" }} contentStyle={{ background: C.card, border: "1px solid " + C.line, borderRadius: 8, color: C.ink, fontSize: 14 }} formatter={(v) => [v + " \u4eba \u00b7 " + Math.round((Number(v) / data.reduce((a, b) => a, 0 || 1), 0) * 0) + ""]} />
        <Bar dataKey="n" radius={[0, 5, 5, 0]} fill={color} barSize={narrow ? 20 : 24}>
          <LabelList dataKey="n" position="right" fill={C.ink} fontSize={narrow ? 14 : 16} fontWeight={700} offset={9} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function WhoWith({ data, max, narrow }) {
  const yw = narrow ? 110 : 150;
  return (
    <ResponsiveContainer width="100%" height={data.length * 50 + 36}>
      <BarChart layout="vertical" data={data} margin={{ top: 6, right: narrow ? 18 : 30, bottom: 6, left: 4 }} barCategoryGap="18%">
        <CartesianGrid horizontal={false} stroke={C.line} />
        <XAxis type="number" domain={[0, max]} tick={{ fill: C.muted, fontSize: 12 }} axisLine={{ stroke: C.line }} tickLine={false} />
        <YAxis type="category" dataKey="zh" width={yw} tickLine={false} axisLine={false} tick={(p) => <BilingualTick {...p} data={data} narrow={narrow} />} />
        <Tooltip cursor={{ fill: "rgba(0,0,0,0.04)" }} contentStyle={{ background: C.card, border: "1px solid " + C.line, borderRadius: 8, color: C.ink, fontSize: 14 }} />
        <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: 13, color: C.ink, paddingBottom: 6 }} formatter={(val) => val === "use" ? "会用到 / use" : "最重要 / most imp"} />
        <Bar dataKey="use" name="use" fill={C.indigo} radius={[0, 4, 4, 0]} barSize={10}>
          <LabelList dataKey="use" position="right" fill={C.muted} fontSize={11} fontWeight={700} offset={5} />
        </Bar>
        <Bar dataKey="imp" name="imp" fill={C.coral} radius={[0, 4, 4, 0]} barSize={10}>
          <LabelList dataKey="imp" position="right" fill={C.muted} fontSize={11} fontWeight={700} offset={5} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function MiniBar({ data, color, vertical = false, narrow = false }) {
  if (vertical) {
    return (
      <ResponsiveContainer width="100%" height={data.length * 40 + 16}>
        <BarChart layout="vertical" data={data} margin={{ top: 4, right: 40, bottom: 4, left: 4 }} barCategoryGap="22%">
          <CartesianGrid horizontal={false} stroke={C.line} />
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="zh" width={narrow ? 122 : 156} tickLine={false} axisLine={false} tick={(p) => <BilingualTick {...p} data={data} narrow={narrow} />} />
          <Tooltip cursor={{ fill: "rgba(0,0,0,0.04)" }} contentStyle={{ background: C.card, border: "1px solid " + C.line, borderRadius: 8, color: C.ink, fontSize: 14 }} formatter={(v) => [v + " \u4eba", "\u4eba\u6570"]} />
          <Bar dataKey="n" radius={[0, 5, 5, 0]} fill={color} barSize={18}>
            <LabelList dataKey="n" position="right" fill={C.ink} fontSize={15} fontWeight={700} offset={9} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 22, right: 8, bottom: 8, left: -10 }}>
        <CartesianGrid vertical={false} stroke={C.line} />
        <XAxis dataKey="zh" tick={{ fill: C.ink, fontSize: narrow ? 13 : 15, fontWeight: 600 }} axisLine={{ stroke: C.line }} tickLine={false} interval={0} />
        <YAxis hide />
        <Tooltip cursor={{ fill: "rgba(0,0,0,0.04)" }} contentStyle={{ background: C.card, border: "1px solid " + C.line, borderRadius: 8, color: C.ink, fontSize: 14 }} formatter={(v) => [v + " \u4eba", "\u4eba\u6570"]} />
        <Bar dataKey="n" radius={[5, 5, 0, 0]} fill={color} barSize={42}>
          <LabelList dataKey="n" position="top" fill={C.ink} fontSize={16} fontWeight={700} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ===================== layout ===================== */
function Card({ children, narrow }) {
  return (
    <div style={{ background: C.card, border: "1px solid " + C.line, borderRadius: 14, padding: narrow ? "18px 16px 14px" : "22px 24px 18px", boxShadow: "0 1px 2px rgba(27,42,58,0.04)" }}>
      {children}
    </div>
  );
}

function Eyebrow({ q, title, sub }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
        {q && <span style={{ fontSize: 13, fontWeight: 700, color: C.coral, letterSpacing: "0.04em" }}>{q}</span>}
        <h2 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: C.ink }}>{title}</h2>
      </div>
      {sub && <p style={{ margin: "6px 0 0", fontSize: 14, color: C.muted, lineHeight: 1.5 }}>{sub}</p>}
    </div>
  );
}

/* ===================== dashboard ===================== */
function Dashboard({ d, narrow }) {
  const two = narrow ? "1fr" : "1fr 1fr";
  const gap = narrow ? 14 : 18;
  return (
    <div>
      <header style={{ marginBottom: narrow ? 20 : 26 }}>
        <h1 style={{ margin: "0 0 10px", fontSize: narrow ? 25 : 34, fontWeight: 800, lineHeight: 1.16, color: C.ink }}>{d.h1}</h1>
        <p style={{ margin: 0, fontSize: narrow ? 15 : 16.5, color: C.muted, lineHeight: 1.55, maxWidth: 760 }}>{d.lead}</p>
        <div style={{ display: "flex", gap: narrow ? 18 : 26, marginTop: 16, flexWrap: "wrap" }}>
          {d.stats.map((s) => (
            <div key={s.v} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: narrow ? 22 : 26, fontWeight: 800, color: C.indigo }}>{s.k}</span>
              <span style={{ fontSize: 13, color: C.muted }}>{s.v}</span>
            </div>
          ))}
        </div>
      </header>

      <Card narrow={narrow}>
        <Eyebrow q="Q8" title="希望学会什么 · What they want to master" sub={d.wantSub} />
        <HBar data={d.want.data} color={C.coral} maxX={d.want.max} narrow={narrow} />
      </Card>

      <div style={{ height: gap }} />

      <div style={{ display: "grid", gridTemplateColumns: two, gap }}>
        <Card narrow={narrow}>
          <Eyebrow q="Q6" title="最常遇到的场景 · Situations they hit most" sub="多选题 · Multiple choice" />
          <HBar data={d.situations.data} color={C.indigo} maxX={d.situations.max} narrow={narrow} />
        </Card>
        <Card narrow={narrow}>
          <Eyebrow q="Q4 vs Q5" title="和谁说英语 · Who they speak English with" sub={d.whoSub} />
          <WhoWith data={d.whoWith.data} max={d.whoWith.max} narrow={narrow} />
        </Card>
      </div>

      <div style={{ height: gap }} />

      <Card narrow={narrow}>
        <Eyebrow q="Q7" title="最有挑战的时刻 · The hardest moments" sub="开放题，归纳为主题。挑战集中在当众说。Open-ended, grouped into themes." />
        <div style={{ display: "grid", gridTemplateColumns: narrow ? "1fr 1fr" : "repeat(auto-fill, minmax(178px, 1fr))", gap: 12 }}>
          {d.challenges.map((c) => (
            <div key={c.en} style={{ border: "1px solid " + C.line, borderLeft: "3px solid " + C.teal, borderRadius: 10, padding: "11px 13px", background: "#FBFCFD" }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 6 }}>
                <span style={{ fontSize: 14.5, fontWeight: 700, color: C.ink }}>{c.zh}</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: C.teal }}>{c.n}</span>
              </div>
              <div style={{ fontSize: 12.5, color: C.muted, marginTop: 3 }}>{c.en}</div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ height: gap }} />

      <div style={{ display: "grid", gridTemplateColumns: two, gap }}>
        <Card narrow={narrow}>
          <Eyebrow q="Q2" title="地区分布 · Region" sub={d.regionSub} />
          <MiniBar data={d.region} color={C.indigo} narrow={narrow} />
        </Card>
        <Card narrow={narrow}>
          <Eyebrow q="Q3" title="公司规模 · Company size" sub="固定选项，未做归并 · Fixed choice, kept as-is" />
          <MiniBar data={d.companySize} color={C.gold} narrow={narrow} />
        </Card>
      </div>

      <div style={{ height: gap }} />

      <div style={{ display: "grid", gridTemplateColumns: two, gap }}>
        <Card narrow={narrow}>
          <Eyebrow q="Q2" title="行业 · Industry" sub={d.industrySub} />
          <MiniBar data={d.industry} color={C.teal} vertical narrow={narrow} />
        </Card>
        <Card narrow={narrow}>
          <Eyebrow q="Q2" title="岗位 · Role" sub={d.roleSub} />
          <MiniBar data={d.role} color={C.rose} vertical narrow={narrow} />
        </Card>
      </div>

      <div style={{ height: gap }} />

      <Card narrow={narrow}>
        <Eyebrow q="Q10" title="学员的声音 · Voices from the field" sub="备注栏的原话 · In their own words" />
        <div style={{ display: "grid", gridTemplateColumns: narrow ? "1fr" : "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
          {d.quotes.map((q) => (
            <blockquote key={q.tag} style={{ margin: 0, padding: "16px 18px", background: "#FBFAF7", borderRadius: 10, borderLeft: "3px solid " + C.coral }}>
              <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: C.ink, fontWeight: 600 }}>{q.zh}</p>
              <p style={{ margin: "10px 0 0", fontSize: 13.5, lineHeight: 1.5, color: C.muted, fontStyle: "italic" }}>{q.en}</p>
              <div style={{ marginTop: 12, fontSize: 12.5, color: C.indigo, fontWeight: 700, letterSpacing: "0.02em" }}>{q.tag}</div>
            </blockquote>
          ))}
        </div>
      </Card>

      <footer style={{ marginTop: 22, fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
        {d.footer} Region / industry / role / challenge groupings are interpretive; multiple-choice categories are kept exactly as surveyed.
      </footer>
    </div>
  );
}

/* ===================== app + tabs ===================== */
export default function App() {
  const narrow = useIsNarrow(720);
  const [active, setActive] = useState("s2");
  const tabs = [
    { key: "s2", label: "调研二 · Survey 2", n: 21 },
    { key: "s1", label: "调研一 · Survey 1", n: 13 },
  ];

  return (
    <div style={{ background: C.paper, minHeight: "100vh", fontFamily: FONT, color: C.ink, padding: narrow ? "20px 14px 48px" : "32px 20px 56px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>

        <div style={{ fontSize: 13, fontWeight: 700, color: C.indigo, letterSpacing: "0.08em", marginBottom: 12 }}>
          外企英语需求调研 · BUSINESS ENGLISH NEEDS SURVEY
        </div>

        {/* Tab selector */}
        <div style={{ display: "inline-flex", background: "#EAEEF3", border: "1px solid " + C.line, borderRadius: 12, padding: 4, marginBottom: narrow ? 18 : 24, gap: 4, width: narrow ? "100%" : "auto" }}>
          {tabs.map((t) => {
            const on = active === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                style={{
                  flex: narrow ? 1 : "initial",
                  cursor: "pointer",
                  border: "none",
                  borderRadius: 9,
                  padding: "10px 18px",
                  minHeight: 42,
                  fontFamily: FONT,
                  fontSize: 14.5,
                  fontWeight: 700,
                  color: on ? "#FFFFFF" : C.muted,
                  background: on ? C.indigo : "transparent",
                  boxShadow: on ? "0 1px 3px rgba(47,75,124,0.35)" : "none",
                  transition: "all 0.15s ease",
                }}
              >
                {t.label}
                <span style={{ fontSize: 12, fontWeight: 600, opacity: 0.85, marginLeft: 7 }}>N={t.n}</span>
              </button>
            );
          })}
        </div>

        <Dashboard d={DATA[active]} narrow={narrow} />
      </div>
    </div>
  );
}