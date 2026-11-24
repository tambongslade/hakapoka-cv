import type { Metadata } from "next";
import { readDb } from "@/lib/store";
import { AdminNav } from "@/components/admin/nav";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Administration", robots: { index: false } };

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const db = await readDb();
  const unread = db.messages.filter((m) => !m.read).length;
  return (
    <div className="min-h-screen bg-secondary/40 lg:grid lg:grid-cols-[260px_1fr]">
      <AdminNav unread={unread} />
      <main className="min-w-0 px-5 py-8 md:px-10 md:py-12">{children}</main>
    </div>
  );
}
