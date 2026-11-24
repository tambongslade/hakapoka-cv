import type { Metadata } from "next";
import { THEMES } from "@/lib/content";
import { ThemePage } from "@/components/site/theme-page";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Géopolitique & Prospective", alternates: { canonical: "/geopolitique-prospective" }, description: THEMES.geo.lead };

export default function Page() {
  return <ThemePage theme={THEMES.geo} />;
}
