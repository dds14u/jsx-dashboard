import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  Legend,
} from 'recharts';

const C = {
  paper: '#F4F6F8',
  card: '#FFFFFF',
  ink: '#1B2A3A',
  muted: '#5C6B7A',
  line: '#E4E8ED',
  indigo: '#2F4B7C',
  coral: '#DE6F4E',
  teal: '#2E8A86',
  gold: '#C0922B',
  rose: '#A8556B',
};
const FONT =
  '"Inter","Helvetica Neue",-apple-system,"PingFang SC","Microsoft YaHei",sans-serif';
const TOTAL = 13;

const wantToMaster = [
  { zh: '说话更自信、更专业', en: 'Sound confident & professional', n: 10 },
  { zh: '自然聊天、拉近关系', en: 'Natural small talk & rapport', n: 6 },
  { zh: '被突然问到不卡壳', en: 'Handle being put on the spot', n: 6 },
  { zh: '跟上老外快语速', en: 'Keep up with fast speech', n: 5 },
  { zh: '邮件/消息更地道', en: 'Clearer, more native writing', n: 5 },
  { zh: '委婉表达不同意见', en: 'Disagree diplomatically', n: 4 },
  { zh: '其他', en: 'Other', n: 2 },
];
const situations = [
  { zh: '线上视频会议', en: 'Online video meetings', n: 10 },
  { zh: '写邮件 / 消息', en: 'Email & messaging', n: 6 },
  { zh: '会议展示 / 汇报', en: 'Presenting & reporting', n: 5 },
  { zh: '1 对 1 会议', en: '1-on-1 meetings', n: 2 },
  { zh: '自我 / 公司介绍', en: 'Self & company intro', n: 1 },
  { zh: '其他', en: 'Other', n: 1 },
];
const whoWith = [
  { zh: '海外同事', en: 'Overseas colleagues', use: 9, imp: 5 },
  { zh: '新客户', en: 'New customers', use: 7, imp: 6 },
  { zh: '老客户', en: 'Existing customers', use: 5, imp: 5 },
  { zh: '高层管理', en: 'Senior management', use: 3, imp: 4 },
  { zh: '其他', en: 'Other', use: 3, imp: 3 },
  { zh: '直属老板', en: 'Direct manager', use: 1, imp: 0 },
];
const region = [
  { zh: '华南', en: 'Southern China', n: 6 },
  { zh: '内陆', en: 'Inland China', n: 3 },
  { zh: '海外', en: 'International', n: 3 },
  { zh: '北方', en: 'NE / North China', n: 1 },
];
const industry = [
  { zh: '科技 / IT', en: 'Tech & IT', n: 4 },
  { zh: '消费电子/半导体', en: 'Electronics & semis', n: 3 },
  { zh: '通信', en: 'Telecom', n: 1 },
  { zh: '外贸/跨境', en: 'Trade & e-comm', n: 1 },
  { zh: '制造业', en: 'Manufacturing', n: 1 },
  { zh: '建筑施工', en: 'Construction', n: 1 },
  { zh: '教育', en: 'Education', n: 1 },
  { zh: '人力资源', en: 'HR & recruiting', n: 1 },
];
const companySize = [
  { zh: '1-19', n: 2 },
  { zh: '20-199', n: 1 },
  { zh: '200-1999', n: 6 },
  { zh: '2000+', n: 4 },
];
const role = [
  { zh: '工程/质量', en: 'Engineering & quality', n: 4 },
  { zh: '商业分析(BA)', en: 'Business analyst', n: 2 },
  { zh: '创始人', en: 'Founder / owner', n: 1 },
  { zh: '销售/外贸', en: 'Sales & trade', n: 1 },
  { zh: '财务', en: 'Finance', n: 1 },
  { zh: '技术咨询', en: 'Consulting', n: 1 },
  { zh: '猎头', en: 'Recruiting', n: 1 },
  { zh: '设计', en: 'Design', n: 1 },
  { zh: '教学', en: 'Teaching', n: 1 },
];
const challenges = [
  { zh: '演示/讲解汇报', en: 'Presenting & explaining', n: 3 },
  { zh: '谈判/委婉表达', en: 'Negotiation & diplomacy', n: 2 },
  { zh: '线上会议', en: 'Online meetings', n: 2 },
  { zh: '母语级期待/其他', en: 'Native-level & other', n: 2 },
  { zh: '临场应答', en: 'Thinking on your feet', n: 1 },
  { zh: '开发新客户', en: 'Winning new customers', n: 1 },
  { zh: '精准简洁表达', en: 'Concise, precise speech', n: 1 },
  { zh: '1对1技术沟通', en: '1-on-1 technical talk', n: 1 },
];
const quotes = [
  {
    zh: '语音比想象中重要——第一次被其他组领导点名，就是因为英文发音。高层交谈，英文越地道越好。',
    en: 'Pronunciation mattered more than expected — the first time a leader from another team called on me, it was because of my accent.',
    tag: '马德里 · 通信 · 技术咨询 / Madrid · Telecom',
  },
  {
    zh: '希望能做一个系统性课程，基础差的工程师学完可以直接进外企工作。',
    en: 'A systematic course where an engineer with a weak base can finish it and walk straight into a foreign company.',
    tag: '东莞 · 消费电子 · 结构工程师 / Dongguan · Electronics',
  },
];

function BilingualTick({ x, y, payload, data }) {
  const item = data[payload.index];
  if (!item) return null;
  return (
    <g transform={'translate(' + x + ',' + y + ')'}>
      <text
        x={-10}
        y={-2}
        textAnchor="end"
        fill={C.ink}
        fontSize={15}
        fontWeight={600}
      >
        {item.zh}
      </text>
      <text x={-10} y={14} textAnchor="end" fill={C.muted} fontSize={12}>
        {item.en}
      </text>
    </g>
  );
}

function HBar({ data, color, maxX }) {
  return (
    <ResponsiveContainer width="100%" height={data.length * 56 + 24}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 6, right: 44, bottom: 6, left: 8 }}
        barCategoryGap="22%"
      >
        <CartesianGrid horizontal={false} stroke={C.line} />
        <XAxis
          type="number"
          domain={[0, maxX]}
          tickCount={maxX + 1}
          tick={{ fill: C.muted, fontSize: 13 }}
          axisLine={{ stroke: C.line }}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="zh"
          width={188}
          tickLine={false}
          axisLine={false}
          tick={(p) => <BilingualTick {...p} data={data} />}
        />
        <Tooltip
          cursor={{ fill: 'rgba(0,0,0,0.04)' }}
          contentStyle={{
            background: C.card,
            border: '1px solid ' + C.line,
            borderRadius: 8,
            color: C.ink,
            fontSize: 14,
          }}
          formatter={(v) => [
            v + ' \u4eba \u00b7 ' + Math.round((Number(v) / TOTAL) * 100) + '%',
            '\u9009\u62e9',
          ]}
        />
        <Bar dataKey="n" radius={[0, 5, 5, 0]} fill={color} barSize={26}>
          <LabelList
            dataKey="n"
            position="right"
            fill={C.ink}
            fontSize={16}
            fontWeight={700}
            offset={10}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function MiniBar({ data, color, vertical = false, height = 230 }) {
  const h = height;
  if (vertical) {
    return (
      <ResponsiveContainer width="100%" height={data.length * 44 + 16}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 4, right: 38, bottom: 4, left: 6 }}
          barCategoryGap="24%"
        >
          <CartesianGrid horizontal={false} stroke={C.line} />
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="zh"
            width={150}
            tickLine={false}
            axisLine={false}
            tick={(p) => <BilingualTick {...p} data={data} />}
          />
          <Tooltip
            cursor={{ fill: 'rgba(0,0,0,0.04)' }}
            contentStyle={{
              background: C.card,
              border: '1px solid ' + C.line,
              borderRadius: 8,
              color: C.ink,
              fontSize: 14,
            }}
            formatter={(v) => [v + ' \u4eba', '\u4eba\u6570']}
          />
          <Bar dataKey="n" radius={[0, 5, 5, 0]} fill={color} barSize={20}>
            <LabelList
              dataKey="n"
              position="right"
              fill={C.ink}
              fontSize={15}
              fontWeight={700}
              offset={9}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={h}>
      <BarChart
        data={data}
        margin={{ top: 22, right: 12, bottom: 8, left: -6 }}
      >
        <CartesianGrid vertical={false} stroke={C.line} />
        <XAxis
          dataKey="zh"
          tick={{ fill: C.ink, fontSize: 15, fontWeight: 600 }}
          axisLine={{ stroke: C.line }}
          tickLine={false}
          interval={0}
        />
        <YAxis hide />
        <Tooltip
          cursor={{ fill: 'rgba(0,0,0,0.04)' }}
          contentStyle={{
            background: C.card,
            border: '1px solid ' + C.line,
            borderRadius: 8,
            color: C.ink,
            fontSize: 14,
          }}
          formatter={(v) => [v + ' \u4eba', '\u4eba\u6570']}
        />
        <Bar dataKey="n" radius={[5, 5, 0, 0]} fill={color} barSize={46}>
          <LabelList
            dataKey="n"
            position="top"
            fill={C.ink}
            fontSize={16}
            fontWeight={700}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function Card({ children }) {
  return (
    <div
      style={{
        background: C.card,
        border: '1px solid ' + C.line,
        borderRadius: 14,
        padding: '22px 24px 18px',
        boxShadow: '0 1px 2px rgba(27,42,58,0.04)',
      }}
    >
      {children}
    </div>
  );
}

function Eyebrow({ q, title, sub }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        {q && (
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: C.coral,
              letterSpacing: '0.04em',
            }}
          >
            {q}
          </span>
        )}
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: C.ink }}>
          {title}
        </h2>
      </div>
      {sub && (
        <p
          style={{
            margin: '6px 0 0',
            fontSize: 14.5,
            color: C.muted,
            lineHeight: 1.5,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div
      style={{
        background: C.paper,
        minHeight: '100vh',
        fontFamily: FONT,
        color: C.ink,
        padding: '32px 20px 56px',
      }}
    >
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <header style={{ marginBottom: 26 }}>
          <div
            style={{
              fontSize: 13.5,
              fontWeight: 700,
              color: C.indigo,
              letterSpacing: '0.08em',
            }}
          >
            外企英语需求调研 · BUSINESS ENGLISH NEEDS SURVEY
          </div>
          <h1
            style={{
              margin: '8px 0 10px',
              fontSize: 34,
              fontWeight: 800,
              lineHeight: 1.15,
              color: C.ink,
            }}
          >
            13 位职场人，想要的到底是什么样的英语
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 16.5,
              color: C.muted,
              lineHeight: 1.55,
              maxWidth: 760,
            }}
          >
            What 13 working professionals actually need from their English —
            across roles, regions, and the moments that put them on the spot.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 26,
              marginTop: 18,
              flexWrap: 'wrap',
            }}
          >
            {[
              { k: '13', v: '受访者 / respondents' },
              { k: '8', v: '行业 / industries' },
              { k: '10/13', v: '线上会议是主战场' },
              { k: '10/13', v: '想更自信、更专业' },
            ].map((s) => (
              <div
                key={s.v}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <span
                  style={{ fontSize: 26, fontWeight: 800, color: C.indigo }}
                >
                  {s.k}
                </span>
                <span style={{ fontSize: 13.5, color: C.muted }}>{s.v}</span>
              </div>
            ))}
          </div>
        </header>

        <Card>
          <Eyebrow
            q="Q8"
            title="希望学会什么 · What they want to master"
            sub="多选题。说话更自信、更专业几乎是全场共识 (10/13) —— 学员买的是底气，不只是语法。The headline want is confidence and polish, not grammar."
          />
          <HBar data={wantToMaster} color={C.coral} maxX={11} />
        </Card>

        <div style={{ height: 18 }} />

        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}
        >
          <Card>
            <Eyebrow
              q="Q6"
              title="最常遇到的场景 · Situations they hit most"
              sub="多选题 · Multiple choice"
            />
            <HBar data={situations} color={C.indigo} maxX={11} />
          </Card>
          <Card>
            <Eyebrow
              q="Q4 vs Q5"
              title="和谁说英语 · Who they speak English with"
              sub="用到英语最多的是海外同事 (9)，但论最重要，新客户反超 (6)。频率不等于重要性。Most frequent is not most important."
            />
            <ResponsiveContainer width="100%" height={whoWith.length * 50 + 30}>
              <BarChart
                layout="vertical"
                data={whoWith}
                margin={{ top: 6, right: 30, bottom: 6, left: 6 }}
                barCategoryGap="20%"
              >
                <CartesianGrid horizontal={false} stroke={C.line} />
                <XAxis
                  type="number"
                  domain={[0, 10]}
                  tick={{ fill: C.muted, fontSize: 13 }}
                  axisLine={{ stroke: C.line }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="zh"
                  width={150}
                  tickLine={false}
                  axisLine={false}
                  tick={(p) => <BilingualTick {...p} data={whoWith} />}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(0,0,0,0.04)' }}
                  contentStyle={{
                    background: C.card,
                    border: '1px solid ' + C.line,
                    borderRadius: 8,
                    color: C.ink,
                    fontSize: 14,
                  }}
                />
                <Legend
                  verticalAlign="top"
                  align="right"
                  wrapperStyle={{
                    fontSize: 13.5,
                    color: C.ink,
                    paddingBottom: 6,
                  }}
                  formatter={(val) =>
                    val === 'use' ? '会用到 / use' : '最重要 / most important'
                  }
                />
                <Bar
                  dataKey="use"
                  name="use"
                  fill={C.indigo}
                  radius={[0, 4, 4, 0]}
                  barSize={11}
                />
                <Bar
                  dataKey="imp"
                  name="imp"
                  fill={C.coral}
                  radius={[0, 4, 4, 0]}
                  barSize={11}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div style={{ height: 18 }} />

        <Card>
          <Eyebrow
            q="Q7"
            title="最有挑战的时刻 · The moments that challenge them most"
            sub="开放题，归纳为主题。挑战集中在当众说——演示、临场应答、谈判。Pain clusters around speaking under pressure."
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(178px, 1fr))',
              gap: 12,
            }}
          >
            {challenges.map((c) => (
              <div
                key={c.en}
                style={{
                  border: '1px solid ' + C.line,
                  borderLeft: '3px solid ' + C.teal,
                  borderRadius: 10,
                  padding: '12px 14px',
                  background: '#FBFCFD',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: 8,
                  }}
                >
                  <span
                    style={{ fontSize: 15.5, fontWeight: 700, color: C.ink }}
                  >
                    {c.zh}
                  </span>
                  <span
                    style={{ fontSize: 18, fontWeight: 800, color: C.teal }}
                  >
                    {c.n}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: C.muted, marginTop: 3 }}>
                  {c.en}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div style={{ height: 18 }} />

        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}
        >
          <Card>
            <Eyebrow
              q="Q2"
              title="地区分布 · Region"
              sub="按秦岭-淮河南北分界归入四区。Bucketed N/S of the Qinling-Huai line."
            />
            <MiniBar data={region} color={C.indigo} />
          </Card>
          <Card>
            <Eyebrow
              q="Q3"
              title="公司规模 · Company size (employees)"
              sub="固定选项，未做归并 · Fixed choice, kept as-is"
            />
            <MiniBar data={companySize} color={C.gold} />
          </Card>
        </div>

        <div style={{ height: 18 }} />

        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}
        >
          <Card>
            <Eyebrow
              q="Q2"
              title="行业 · Industry"
              sub="自由填写，归并为行业大类。科技/电子/半导体合计 8/13。Free text grouped into sectors."
            />
            <MiniBar data={industry} color={C.teal} vertical />
          </Card>
          <Card>
            <Eyebrow
              q="Q2"
              title="岗位 · Role"
              sub="自由填写，归并为职能。工程/质量最多 (4)。Free text grouped into functions."
            />
            <MiniBar data={role} color={C.rose} vertical />
          </Card>
        </div>

        <div style={{ height: 18 }} />

        <Card>
          <Eyebrow
            q="Q10"
            title="学员的声音 · Voices from the field"
            sub="备注栏的原话 · In their own words"
          />
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
          >
            {quotes.map((q) => (
              <blockquote
                key={q.tag}
                style={{
                  margin: 0,
                  padding: '16px 18px',
                  background: '#FBFAF7',
                  borderRadius: 10,
                  borderLeft: '3px solid ' + C.coral,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: C.ink,
                    fontWeight: 600,
                  }}
                >
                  {q.zh}
                </p>
                <p
                  style={{
                    margin: '10px 0 0',
                    fontSize: 14,
                    lineHeight: 1.55,
                    color: C.muted,
                    fontStyle: 'italic',
                  }}
                >
                  {q.en}
                </p>
                <div
                  style={{
                    marginTop: 12,
                    fontSize: 12.5,
                    color: C.indigo,
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                  }}
                >
                  {q.tag}
                </div>
              </blockquote>
            ))}
          </div>
        </Card>

        <footer
          style={{
            marginTop: 22,
            fontSize: 13,
            color: C.muted,
            lineHeight: 1.6,
          }}
        >
          N = 13. 多选题计数之和大于 13，百分比基于受访总人数。Industry / role /
          challenge groupings are interpretive; multiple-choice categories are
          left exactly as surveyed.
        </footer>
      </div>
    </div>
  );
}
