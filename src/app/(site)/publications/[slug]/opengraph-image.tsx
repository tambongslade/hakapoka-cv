import { getPublication } from "@/lib/store";
import { typeLabel } from "@/lib/types";
import { OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Publication de Hermann Hakapoka";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const p = await getPublication(params.slug);
  return ogCard({ eyebrow: p ? `${typeLabel(p.type)} · ${p.category}` : "Publications", title: p?.title ?? "Analyses & Perspectives" });
}
