# Lilou Logistique — Dossier Fonctionnel & Technique (v5.1.0)

## 1) Résumé exécutif
Lilou Logistique est une plateforme DSP (Delivery Service Partner) conçue pour optimiser la gestion des opérations Amazon DSP: chauffeurs, dispatching, RH et flotte. La version 5.1.0 fournit une base Next.js 14 moderne, un design Tailwind réactif, une couche domaine (DDD) et une trajectoire claire d'intégrations (Supabase, auth, optimisation de routes, scoring AMIR).

## 2) Périmètre fonctionnel — Modules cibles
- Chauffeur: départ/retour véhicule, métriques du jour, historique POD, incidents, profil.
- Dispatcher: suivi temps réel, tableau de bord global, gestion chauffeurs, planification, audit POD.
- RH: assiduité, alertes, rapports et exports, validation justificatifs.
- Chef de Parc (Fleet): parc véhicules, maintenance, affectations, incidents, documents.

L'interface d'accueil confirme ces axes avec des objectifs business (PHR 99.5%, précision IA 95%, <500ms) et les piliers IA/Optimisation.

## 3) Architecture technique
- Frontend: Next.js 14 (App Router), React 18, TypeScript 5, Tailwind CSS, Radix UI, Framer Motion.
- État & Data: Zustand pour état local, @tanstack/react-query pour données serveur.
- Authentification: NextAuth (prévu) + helpers Supabase.
- Backend/DB: PostgreSQL (Supabase), Prisma (prévu), API Next.js route handlers (prévu), Socket.io (prévu).
- Stockage: Supabase Storage ou S3 (prévu). CDN recommandé pour assets.
- Observabilité & performance: cache Redis (prévu), pagination serveur, compression, lazy loading.

Références de stack dans `package.json` et métadonnées SEO dans `app/layout.tsx`.

## 4) Modèle de domaine (DDD)
Début de couche domaine dans `core/`:
- `core/base/Entity.ts`: base des entités (espace réservé actuellement).
- `core/value-objects/`: `DeliveryAttempt.ts`, `DeliveryStatus.ts`, `PackageInfo.ts`, `RiskScore.ts`, `TimeWindow.ts` (espaces réservés pour VO). 
- `core/events/DeliveryCompleted.ts` (prévu).

Objectif: isoler logique métier (entités, VO, événements) de l'UI et de l'infrastructure.

## 5) UI/UX & SEO
- Pages Next.js: `app/page.tsx` (landing déploiement réussi), `app/login/page.tsx` (placeholder login), layout global et styles `app/globals.css`.
- Design system: Tailwind (+ Radix UI prévu, shadcn/ui compatible).
- SEO avancé: Open Graph, Twitter Card, robots, canonical dans `app/layout.tsx`.

## 6) Optimisation des tournées (exemple)
`infrastructure/optimization/RouteOptimizationExample.ts` est prévu pour démontrer l'algorithme génétique (placeholder). Cible: amélioration 15% des routes.

## 7) Structure du dépôt (extrait)
```
app/
  globals.css
  layout.tsx
  page.tsx
  login/page.tsx
core/
  base/Entity.ts
  events/DeliveryCompleted.ts
  value-objects/
    DeliveryAttempt.ts, DeliveryStatus.ts, PackageInfo.ts, RiskScore.ts, TimeWindow.ts
infrastructure/
  optimization/RouteOptimizationExample.ts
mobile-app/
  eas.json
```
Autres racines utiles: `README.md`, `LILOU-LOGISTIQUE-IMPLEMENTATION-PLAN.md`, guides de déploiement Hostinger/Vercel et checklists d'environnement.

## 8) Dépendances clés (`package.json`)
- next 14, react 18, typescript 5, tailwindcss 3
- @tanstack/react-query 5, zustand 4
- @supabase/supabase-js 2, next-auth 4.24
- Radix UI, framer-motion

Scripts:
- `dev`: next dev
- `build`: next build
- `start`: next start
- `lint`: next lint
- `test`: jest
- `type-check`: tsc --noEmit

## 9) Environnements & variables (exemples)
À configurer via `.env.local` en dev et secrets CI/CD en prod:
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_KEY`
- `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
- Clés d'intégration (Twilio/SendGrid, Google Maps) selon besoins modules.
Voir `README.md` et guides `NOUVELLES-CREDENTIALS-SUPABASE.md`, `vercel-env-checklist.md`.

## 10) Exécution locale
1. Node 18+ et npm 9+.
2. Installer: `npm install`.
3. Variables: créer `.env.local` (voir section 9).
4. Lancer: `npm run dev` puis ouvrir http://localhost:3000.

## 11) Déploiement
- Cibles: Vercel ou Hostinger.
- Guides fournis: `HOSTINGER-DEPLOYMENT-GUIDE.md`, `FINAL-DEPLOYMENT-GUIDE.md`, `fix-vercel-domain.md`, `VERCEL_DNS_UPDATE_GUIDE.md`.
- Conseil: activer build sur Node 18, renseigner secrets, définir branche `main`.

## 12) Sécurité & conformité (cibles)
- Auth multi-rôles (NextAuth + JWT), rate limiting, validation Zod, sanitization, HTTPS, logs d'audit.

## 13) Roadmap (extrait du plan)
- Phase 1: fondations monorepo, Prisma + DB, Auth multi-rôles, UI de base.
- Phases suivantes: Chauffeur, Dispatcher, RH, Fleet, finalisation (tests, doc, déploiement).
Voir `LILOU-LOGISTIQUE-IMPLEMENTATION-PLAN.md` pour détails (modèles Prisma fournis en exemple).

## 14) Points ouverts / prochains incréments
- Implémenter services d'auth, API routes, schéma Prisma et migrations.
- Remplir les fichiers domaine/infrastructure placeholders.
- Intégrer Supabase (DB + Storage) et Socket temps réel.
- Déployer pipelines CI/CD unifiés.

---
Ce dossier synthétise l'état v5.1.0 et les intentions d'architecture/produit pour Lilou Logistique.

