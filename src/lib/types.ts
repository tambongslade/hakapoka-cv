export const PUBLICATION_TYPES = [
  { value: "analyse", label: "Analyse" },
  { value: "perspective", label: "Perspective" },
  { value: "note", label: "Note stratégique" },
  { value: "rapport", label: "Rapport" },
  { value: "tribune", label: "Tribune" },
  { value: "entretien", label: "Entretien" },
] as const;

export const typeLabel = (t: string) => PUBLICATION_TYPES.find((x) => x.value === t)?.label ?? t;

export const CATEGORIES = [
  "Intelligence économique",
  "Économie stratégique",
  "Géopolitique & Prospective",
  "Afrique centrale & CEMAC",
] as const;

export const MEDIA_KINDS = [
  { value: "interview", label: "Interview" },
  { value: "podcast", label: "Podcast" },
  { value: "tv", label: "Télévision" },
  { value: "conference", label: "Conférence" },
  { value: "video", label: "Analyse vidéo" },
] as const;

export type PublicationType = (typeof PUBLICATION_TYPES)[number]["value"];
export type MediaKind = (typeof MEDIA_KINDS)[number]["value"];
export type Status = "draft" | "published" | "scheduled";

export type Publication = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string; // Markdown
  cover?: string;
  type: PublicationType;
  category: string;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  pdf?: string;
  sourceUrl?: string; // original article when first published elsewhere (e.g. Infoguerre)
  sourceName?: string;
  status: Status;
  publishAt?: string; // ISO, used when scheduled
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  demo?: boolean; // placeholder content seeded for the prototype
};

export type MediaItem = {
  id: string;
  title: string;
  kind: MediaKind;
  outlet?: string;
  date: string;
  url: string; // YouTube / podcast / article link
  summary?: string;
  demo?: boolean;
};

export type EventItem = {
  id: string;
  name: string;
  date: string;
  location: string;
  topic: string;
  summary?: string;
  video?: string;
  pdf?: string;
  photos: string[];
  demo?: boolean;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  organisation?: string;
  subject: string;
  body: string;
  createdAt: string;
  read: boolean;
};

export type Db = {
  publications: Publication[];
  media: MediaItem[];
  events: EventItem[];
  messages: Message[];
};
