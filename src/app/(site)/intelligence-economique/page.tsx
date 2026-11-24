import type { Metadata } from "next";
import { THEMES } from "@/lib/content";
import { ThemePage } from "@/components/site/theme-page";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Intelligence économique", alternates: { canonical: "/intelligence-economique" }, description: THEMES.ie.lead };

export default function Page() {
  return <ThemePage theme={THEMES.ie} />;
}
