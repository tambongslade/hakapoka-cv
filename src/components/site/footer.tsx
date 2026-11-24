import Link from "next/link";
import { NAV } from "@/lib/nav";

// Theme pages kept in the header menu but left out of the footer.
const THEME_LINKS = new Set(["/intelligence-economique", "/economie-strategique", "/geopolitique-prospective"]);

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-24">
        <div>
          <p className="font-display text-2xl">Hermann Hakapoka</p>
          <p className="mt-4 max-w-sm text-sm text-ink-muted">
            Intelligence économique, économie stratégique et prospective. Une plateforme d&apos;analyse consacrée aux dynamiques qui
            transforment l&apos;Afrique et le monde.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Explorer</p>
          <ul className="mt-4 space-y-2 text-sm">
            {[...NAV.filter((n) => !THEME_LINKS.has(n.href)), { href: "/lexique", label: "Lexique" }].map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="focus-ring rounded-sm text-ink-muted transition-colors hover:text-ink-foreground">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Échanger</p>
          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            <li>Consultations stratégiques</li>
            <li>Conférences & interventions</li>
            <li>Interviews & médias</li>
            <li>Partenariats institutionnels</li>
          </ul>
          <Link href="/contact" className="focus-ring mt-6 inline-block rounded-sm border-b border-gold pb-1 text-sm text-gold">
            Prendre contact
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-2 py-6 text-xs text-ink-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Hermann Hakapoka. Tous droits réservés.</p>
          <p>Les analyses publiées n&apos;engagent que leur auteur.</p>
        </div>
      </div>
    </footer>
  );
}
