export type LessonKind = "video" | "reading" | "quiz" | "practice";

export type Lesson = {
  id: string;
  title: string;
  kind: LessonKind;
  minutes: number;
  xp: number;
};

export type NodeStatus = "completed" | "current" | "locked";

export type ModuleNode = {
  id: string;
  title: string;
  short: string;
  status: NodeStatus;
  progress?: number; // 0..1 (current only)
  lessons: Lesson[];
};

export type Unit = {
  id: string;
  index: number;
  title: string;
  subtitle: string;
  color: "sky" | "indigo" | "emerald" | "rose" | "amber" | "violet";
  nodes: ModuleNode[];
};

const l = (id: string, title: string, kind: LessonKind, minutes: number, xp: number): Lesson => ({
  id, title, kind, minutes, xp,
});

export const units: Unit[] = [
  {
    id: "foundations",
    index: 1,
    title: "Marketing Foundations",
    subtitle: "Mastering Strategy & Positioning",
    color: "sky",
    nodes: [
      { id: "strategy", title: "Marketing Strategy", short: "Strategy", status: "completed",
        lessons: [
          l("v1","What is marketing strategy?","video",8,20),
          l("r1","Reading: Positioning by Al Ries","reading",12,15),
          l("q1","Strategy fundamentals quiz","quiz",5,25),
        ]},
      { id: "positioning", title: "Positioning & Messaging", short: "Positioning", status: "current", progress: 0.4,
        lessons: [
          l("v2","Obviously Awesome: the framework","video",10,25),
          l("v3","Crafting a positioning statement","video",9,25),
          l("p1","Practice: reposition a real brand","practice",15,40),
          l("q2","Positioning mastery quiz","quiz",6,30),
        ]},
      { id: "consumer", title: "Consumer Behavior", short: "Psychology", status: "locked", lessons: [] },
      { id: "research", title: "Market Research", short: "Research", status: "locked", lessons: [] },
      { id: "gtm", title: "Go-to-Market", short: "GTM", status: "locked", lessons: [] },
      { id: "pricing", title: "Pricing Strategy", short: "Pricing", status: "locked", lessons: [] },
    ],
  },
  {
    id: "digital",
    index: 2,
    title: "Digital Marketing",
    subtitle: "SEO, content, email & community",
    color: "indigo",
    nodes: [
      { id: "seo", title: "SEO Fundamentals", short: "SEO", status: "locked", lessons: [] },
      { id: "content", title: "Content Marketing", short: "Content", status: "locked", lessons: [] },
      { id: "email", title: "Email & SMS Marketing", short: "Email", status: "locked", lessons: [] },
      { id: "community", title: "Community & Influencer", short: "Community", status: "locked", lessons: [] },
    ],
  },
  {
    id: "paid",
    index: 3,
    title: "Paid Advertising",
    subtitle: "Meta, Google, TikTok & LinkedIn",
    color: "rose",
    nodes: [
      { id: "meta", title: "Meta Ads", short: "Meta", status: "locked", lessons: [] },
      { id: "google", title: "Google Ads", short: "Google", status: "locked", lessons: [] },
      { id: "tiktok", title: "TikTok & Social Ads", short: "TikTok", status: "locked", lessons: [] },
      { id: "attribution", title: "Attribution & ROAS", short: "ROAS", status: "locked", lessons: [] },
    ],
  },
  {
    id: "growth",
    index: 4,
    title: "Growth Marketing",
    subtitle: "Loops, funnels & experiments",
    color: "emerald",
    nodes: [
      { id: "loops", title: "Growth & Viral Loops", short: "Loops", status: "locked", lessons: [] },
      { id: "aarrr", title: "AARRR Framework", short: "AARRR", status: "locked", lessons: [] },
      { id: "ab", title: "A/B Testing", short: "A/B", status: "locked", lessons: [] },
      { id: "lifecycle", title: "Lifecycle Marketing", short: "Lifecycle", status: "locked", lessons: [] },
    ],
  },
  {
    id: "analytics",
    index: 5,
    title: "Analytics & Data",
    subtitle: "GA4, Looker & measurement",
    color: "violet",
    nodes: [
      { id: "ga4", title: "GA4 & GTM", short: "GA4", status: "locked", lessons: [] },
      { id: "dash", title: "Dashboards & KPIs", short: "Dashboards", status: "locked", lessons: [] },
      { id: "sql", title: "SQL & Sheets basics", short: "SQL", status: "locked", lessons: [] },
    ],
  },
  {
    id: "ai",
    index: 6,
    title: "AI for Marketing",
    subtitle: "Prompting, automation & agents",
    color: "amber",
    nodes: [
      { id: "prompts", title: "Prompt Engineering", short: "Prompts", status: "locked", lessons: [] },
      { id: "automation", title: "Zapier, Make & n8n", short: "Automation", status: "locked", lessons: [] },
      { id: "content-ai", title: "AI Content Creation", short: "AI Content", status: "locked", lessons: [] },
    ],
  },
];

export function findLesson(unitId: string, nodeId: string, lessonId: string) {
  const unit = units.find((u) => u.id === unitId);
  const node = unit?.nodes.find((n) => n.id === nodeId);
  const lesson = node?.lessons.find((ls) => ls.id === lessonId);
  return { unit, node, lesson };
}

export function findNode(unitId: string, nodeId: string) {
  const unit = units.find((u) => u.id === unitId);
  const node = unit?.nodes.find((n) => n.id === nodeId);
  return { unit, node };
}