"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const darkPage = pathname === "/"; // the homepage is fully dark
  const onDark = darkPage || (!scrolled && !open); // every public page opens on a dark hero

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        darkPage
          ? cn("text-white", scrolled || open ? "border-b border-white/10 bg-[#141518]/95 backdrop-blur" : "bg-transparent")
          : onDark
            ? "bg-transparent text-ink-foreground"
            : "border-b border-border bg-background/95 text-foreground backdrop-blur",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between gap-6 px-5 md:h-20 md:px-8">
        <Link href="/" className="focus-ring flex items-baseline gap-2 rounded-sm">
          <span className="whitespace-nowrap font-display text-xl tracking-tight">Hermann Hakapoka</span>
          <span className={cn("hidden whitespace-nowrap text-xs uppercase tracking-[0.18em] sm:inline xl:hidden 2xl:inline", onDark ? "text-gold" : "text-accent")}>Cabinet C.2.H</span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-5 xl:flex">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "focus-ring relative whitespace-nowrap rounded-sm py-1 text-sm transition-opacity duration-200 hover:opacity-100",
                  active ? "opacity-100" : "opacity-75",
                )}
              >
                {item.label}
                {active && <span className={cn("absolute -bottom-1 left-0 h-px w-full", onDark ? "bg-gold" : "bg-accent")} />}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className={cn(
              "focus-ring inline-flex h-10 items-center whitespace-nowrap rounded-sm border px-4 text-sm font-medium transition-colors duration-200",
              onDark ? "border-gold/60 text-gold hover:bg-gold hover:text-ink" : "border-primary bg-primary text-primary-foreground hover:bg-primary/90",
            )}
          >
            Échange confidentiel
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          className="focus-ring -mr-2 inline-flex h-11 w-11 items-center justify-center rounded-sm xl:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Navigation mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25 }}
            className={cn("xl:hidden", darkPage ? "border-b border-white/10 bg-[#141518] text-white [&_a]:border-white/10" : "border-b border-border bg-background text-foreground")}
          >
            <ul className="container flex flex-col py-4">
              {[...NAV, { href: "/contact", label: "Échange confidentiel" }].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="focus-ring flex min-h-12 items-center border-b border-border/60 font-display text-lg">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
