import type { Metadata } from "next";
import { THEMES } from "@/lib/content";
import { ThemePage } from "@/components/site/theme-page";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Économie stratégique", alternates: { canonical: "/economie-strategique" }, description: THEMES.eco.lead };

export default function Page() {
  return <ThemePage theme={THEMES.eco} />;
}
