"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, ExternalLink, FilePlus2, FileText, LayoutDashboard, LogOut, Mail, PlayCircle } from "lucide-react";
import { logout } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { href: "/admin/publications/new", label: "Nouvelle publication", icon: FilePlus2, exact: true },
  { href: "/admin/publications", label: "Mes publications", icon: FileText },
  { href: "/admin/medias", label: "Médias", icon: PlayCircle },
  { href: "/admin/evenements", label: "Événements", icon: CalendarDays },
  { href: "/admin/messages", label: "Messages", icon: Mail },
];

export function AdminNav({ unread }: { unread: number }) {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href) && pathname !== "/admin/publications/new";

  return (
    <aside className="bg-ink text-ink-foreground lg:sticky lg:top-0 lg:h-screen">
      <div className="flex h-full flex-col px-4 py-5 lg:py-8">
        <div className="px-3">
          <p className="font-display text-lg">Hermann Hakapoka</p>
          <p className="text-xs uppercase tracking-[0.18em] text-gold">Administration</p>
        </div>
        <nav aria-label="Administration" className="mt-6 flex gap-1 overflow-x-auto lg:mt-10 lg:flex-col">
          {items.map(({ href, label, icon: Icon, exact }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "focus-ring flex min-h-11 shrink-0 items-center gap-3 rounded-sm px-3 text-sm transition-colors",
                isActive(href, exact) ? "bg-white/10 text-ink-foreground" : "text-ink-muted hover:bg-white/5 hover:text-ink-foreground",
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {label}
              {href === "/admin/messages" && unread > 0 && (
                <span className="ml-auto rounded-full bg-gold px-2 text-xs font-semibold text-ink">{unread}</span>
              )}
            </Link>
          ))}
        </nav>
        <div className="mt-4 flex gap-1 border-t border-white/10 pt-4 lg:mt-auto lg:flex-col">
          <Link href="/" target="_blank" className="focus-ring flex min-h-11 items-center gap-3 rounded-sm px-3 text-sm text-ink-muted hover:text-ink-foreground">
            <ExternalLink className="h-4 w-4" aria-hidden /> Voir le site
          </Link>
          <form action={logout}>
            <button className="focus-ring flex min-h-11 w-full items-center gap-3 rounded-sm px-3 text-sm text-ink-muted hover:text-ink-foreground">
              <LogOut className="h-4 w-4" aria-hidden /> Déconnexion
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
