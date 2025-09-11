# Notes de version — Lilou Logistique v5.1.0

Date: 2025-09-11

## Nouveautés
- Page d'accueil Next.js modernisée confirmant le déploiement et les objectifs (PHR 99.5%, IA 95%, <500ms).
- Métadonnées SEO complètes dans `app/layout.tsx` (Open Graph, Twitter, robots, canonical, PWA hints).
- Base de couche domaine (DDD) créée: répertoires `core/base`, `core/value-objects`, `core/events`.
- Esquisse d'optimisation des tournées (`infrastructure/optimization/RouteOptimizationExample.ts`).
- Squelette page `app/login/page.tsx`.

## Améliorations
- Stack: Next.js 14, TypeScript 5, React 18, Tailwind 3, React Query 5, Zustand 4.
- Scripts projet cohérents (`dev`, `build`, `start`, `lint`, `test`, `type-check`).
- Guides de déploiement et checklists enrichis (Hostinger/Vercel, secrets, DNS).

## Correctifs
- Documentation des secrets et procédures de nettoyage déploiement (cf. `README.md`).

## Changements potentiellement cassants
- Branche `main` comme branche par défaut dans pipelines (voir guides).
- SEO consolidé: vérifier images OG/Twitter présentes en prod (`/assets/*`).

## Migration & Mise à niveau
- Node 18+ et npm 9+ requis.
- Installer dépendances: `npm install`.
- Créer `.env.local` avec variables Supabase et NextAuth.
- Vérifier cibles d'hébergement (Vercel/Hostinger) et secrets correspondants.

## Éléments connus
- Fichiers domaine/infrastructure encore placeholders à compléter.
- Schéma Prisma et API routes non encore implémentés.
- Page Login minimale.

## Scripts utiles
- `npm run dev`: lance l'environnement de développement.
- `npm run build`: construit l'application Next.js.
- `npm start`: démarre en mode production après build.
- `npm run lint` / `npm run test` / `npm run type-check`.

## Dépendances clés
- next ^14, react ^18, typescript ^5, tailwindcss ^3
- @tanstack/react-query ^5, zustand ^4
- @supabase/supabase-js ^2, next-auth ^4.24, framer-motion, radix-ui

---
Cette version consolide la base technique et la documentation de déploiement en vue de l'implémentation des modules métiers.