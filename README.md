# Hermann Hakapoka — Intelligence économique & stratégie

Plateforme éditoriale (Next.js 14 + Tailwind + Framer Motion) avec un espace d'administration privé.

## Lancer

```bash
npm install
npm run dev          # http://localhost:3000
```

Avec Docker :

```bash
docker compose up -d --build   # http://localhost:3457
docker compose down
```

Le dossier `data/` est monté dans le conteneur : les contenus et fichiers téléversés restent sur la machine hôte.

Admin : `/admin`, mot de passe défini dans `.env.local` (`ADMIN_PASSWORD`). **Changer `ADMIN_PASSWORD` et `SESSION_SECRET` avant la mise en ligne.**

## Structure

- `src/app/(site)/` — pages publiques (Accueil, À propos, 3 piliers, Publications, Médias, Événements, Contact)
- `src/app/admin/` — CMS : tableau de bord, publications (brouillon / publié / programmé), médias, événements, messages
- `src/lib/content.ts` — textes éditoriaux des pages piliers
- `data/db.json` — contenus (publications, médias, événements, messages) ; `data/uploads/` — fichiers téléversés
- `scripts/seed.mjs` — réinitialise la base avec les 2 publications réelles de Hermann Hakapoka (Infoguerre, 2019), sans contenu de démonstration (`node scripts/seed.mjs`)

## Hébergement

Le stockage est un fichier JSON : parfait pour un VPS / serveur Node (`npm run build && npm start`).
Pour Vercel ou tout hébergement serverless (disque en lecture seule), remplacer `src/lib/store.ts` et `saveUpload`
par une base (Supabase, Postgres + stockage objet).

## À valider par le client avant lancement

- Biographie (page À propos) : intitulés, fonctions actuelles, dates, formation, affiliations
- Citation « Conviction » de l'accueil
- Les 5 publications marquées « Démo » sont des textes d'exemple → à remplacer ou supprimer
- Photo haute définition (la photo actuelle fait 479 × 521 px)

## SEO & AI SEO

- `robots.txt`, `sitemap.xml` (publications ajoutées automatiquement), flux RSS `feed.xml`, `llms.txt` pour les assistants IA
- URL canoniques, balises Open Graph / Twitter, images de partage générées (site + chaque article), favicon
- Données structurées schema.org : Person, WebSite, ProfilePage, FAQPage, Article, CollectionPage, Event, BreadcrumbList
- Les articles marqués « Démo » sont en `noindex` et exclus du sitemap, du flux RSS et de `llms.txt`

Avant la mise en ligne :
1. Définir `SITE_URL=https://domaine-final` (build Docker + exécution), sinon les liens canoniques pointent vers localhost.
2. Confirmer avec le client les profils `sameAs` (LinkedIn, X, Facebook) dans `src/lib/site.tsx`.
3. Déclarer le site dans Google Search Console et Bing Webmaster Tools, puis soumettre `/sitemap.xml`.
