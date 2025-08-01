# 🚀 Plan d'Implémentation - Lilou Logistique DSP Platform

## 📊 Vue d'ensemble du projet

**Lilou Logistique** est une plateforme complète de gestion DSP (Delivery Service Partner) pour Amazon, avec des modules spécialisés pour chaque rôle métier.

### 🎯 Objectifs principaux
- Gestion complète des chauffeurs et de leurs performances
- Suivi en temps réel des livraisons et incidents
- Gestion RH avec assiduité et rapports
- Maintenance et suivi du parc de véhicules
- Audit automatisé des POD (Proof of Delivery)

## 🏗️ Architecture Technique

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI**: Tailwind CSS + shadcn/ui
- **État**: Zustand + React Query
- **Graphiques**: Recharts
- **Icônes**: Lucide React
- **Temps réel**: Socket.io Client

### Backend
- **Framework**: Node.js + Express (ou FastAPI Python)
- **ORM**: Prisma
- **Base de données**: PostgreSQL (Supabase)
- **Auth**: JWT + NextAuth.js
- **Stockage fichiers**: Supabase Storage ou S3
- **Temps réel**: Socket.io Server

## 📁 Structure du Projet

```
lilou-logistique/
├── apps/
│   ├── web/                    # Frontend Next.js
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── (dashboard)/
│   │   │   │   ├── chauffeur/
│   │   │   │   ├── dispatcher/
│   │   │   │   ├── rh/
│   │   │   │   └── fleet/
│   │   │   └── api/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── forms/
│   │   │   └── charts/
│   │   └── lib/
│   └── api/                    # Backend Express
│       ├── src/
│       │   ├── controllers/
│       │   ├── services/
│       │   ├── middleware/
│       │   └── routes/
│       └── prisma/
├── packages/
│   ├── database/              # Modèles Prisma partagés
│   ├── types/                 # Types TypeScript partagés
│   └── utils/                 # Utilitaires partagés
└── docker/
```

## 🔐 Modèles de Données (Prisma)

### User (Base pour tous les rôles)
```prisma
model User {
  id                String   @id @default(cuid())
  email             String   @unique
  password          String
  firstName         String
  lastName          String
  phone             String?
  role              Role
  status            UserStatus @default(PENDING)
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  // Relations
  chauffeurProfile  Chauffeur?
  dispatcherProfile Dispatcher?
  rhProfile         RH?
  fleetProfile      FleetManager?
}

enum Role {
  CHAUFFEUR
  DISPATCHER
  RH
  FLEET_MANAGER
  ADMIN
}

enum UserStatus {
  PENDING
  ACTIVE
  SUSPENDED
  INACTIVE
}
```

### Chauffeur
```prisma
model Chauffeur {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])
  amazonId        String?  @unique
  licenseNumber   String
  licenseExpiry   DateTime
  
  // Métriques
  podScore        Float    @default(100)
  dnrRate         Float    @default(0)
  weeklyRanking   Int?
  
  // Relations
  vehicleAssignments VehicleAssignment[]
  departReports      DepartReport[]
  returnReports      ReturnReport[]
  attendanceRecords  AttendanceRecord[]
  podAudits          PodAudit[]
  incidents          Incident[]
}
```

### Vehicle
```prisma
model Vehicle {
  id              String   @id @default(cuid())
  registration    String   @unique
  model           String
  year            Int
  status          VehicleStatus
  lastMaintenance DateTime?
  nextMaintenance DateTime?
  mileage         Int
  
  // Relations
  assignments     VehicleAssignment[]
  maintenances    Maintenance[]
  departReports   DepartReport[]
  returnReports   ReturnReport[]
}

enum VehicleStatus {
  OPERATIONAL
  MAINTENANCE
  OUT_OF_SERVICE
}
```

### DepartReport (Rapport de départ)
```prisma
model DepartReport {
  id            String   @id @default(cuid())
  chauffeurId   String
  chauffeur     Chauffeur @relation(fields: [chauffeurId], references: [id])
  vehicleId     String
  vehicle       Vehicle  @relation(fields: [vehicleId], references: [id])
  date          DateTime @default(now())
  mileageStart  Int
  
  // Checklist
  brakes        Boolean
  lights        Boolean
  tires         Boolean
  fluids        Boolean
  cleanliness   Boolean
  
  // Photos
  frontPhoto    String?
  sidePhoto     String?
  backPhoto     String?
  interiorPhoto String?
  
  comments      String?
  signature     String
}
```

### ReturnReport (Rapport de retour)
```prisma
model ReturnReport {
  id            String   @id @default(cuid())
  chauffeurId   String
  chauffeur     Chauffeur @relation(fields: [chauffeurId], references: [id])
  vehicleId     String
  vehicle       Vehicle  @relation(fields: [vehicleId], references: [id])
  date          DateTime @default(now())
  mileageEnd    Int
  
  // Métriques
  packagesDelivered Int
  packagesReturned  Int
  
  // Retours
  returnedPackages ReturnedPackage[]
  
  fuelLevel     FuelLevel
  incidents     String?
  signature     String
}

enum FuelLevel {
  EMPTY
  QUARTER
  HALF
  THREE_QUARTERS
  FULL
}
```

### AttendanceRecord (Assiduité)
```prisma
model AttendanceRecord {
  id          String   @id @default(cuid())
  chauffeurId String
  chauffeur   Chauffeur @relation(fields: [chauffeurId], references: [id])
  date        DateTime
  status      AttendanceStatus
  checkInTime DateTime?
  checkOutTime DateTime?
  lateMinutes Int      @default(0)
  justification String?
  validatedBy String?
  
  @@unique([chauffeurId, date])
}

enum AttendanceStatus {
  PRESENT
  ABSENT
  LATE
  JUSTIFIED_ABSENCE
  SICK_LEAVE
  VACATION
}
```

### PodAudit (Audit POD)
```prisma
model PodAudit {
  id          String   @id @default(cuid())
  chauffeurId String
  chauffeur   Chauffeur @relation(fields: [chauffeurId], references: [id])
  trackingId  String
  photoUrl    String
  timestamp   DateTime
  
  // Validation
  validity    PodValidity
  distance    Float?    // Distance en mètres
  otpProvided Boolean
  
  score       Int
  auditedBy   String?
  auditDate   DateTime?
  comments    String?
}

enum PodValidity {
  VALID
  BLURRY
  NO_PACKAGE_VISIBLE
  TOO_FAR
  INVALID_LOCATION
  MISSING_OTP
}
```

## 🎨 Interfaces Utilisateur par Rôle

### 1. 👤 Interface Chauffeur
- **Dashboard**: Métriques du jour, objectifs, classement
- **Départ**: Checklist véhicule + photos obligatoires
- **Retour**: Saisie retours + incidents + résumé journée
- **Historique**: POD, absences, incidents
- **Profil**: Infos perso, documents, performances

### 2. 🧑‍💼 Interface Dispatcher
- **Vue temps réel**: Carte avec positions chauffeurs
- **Tableau de bord**: Métriques globales (POD, DNR, retards)
- **Gestion chauffeurs**: Validation inscriptions, affectations
- **Planification**: Création tournées, messages
- **Rapports**: Performance par période

### 3. 🧾 Interface RH
- **Assiduité**: Tableau mensuel présences/absences
- **Alertes**: Retards et absences récurrents
- **Rapports**: Export CSV/PDF, synthèses mensuelles
- **Gestion**: Validation justificatifs, commentaires
- **Analytics**: Taux présence, tendances

### 4. 🚛 Interface Chef de Parc
- **Flotte**: Liste véhicules avec statuts couleur
- **Maintenance**: Planning, historique, alertes
- **Affectations**: Qui conduit quoi et quand
- **Incidents**: Rapports dégâts, réparations
- **Documents**: Assurances, CT, cartes grises

## 🔄 Flux de Travail Principaux

### Flux Journalier Chauffeur
1. Connexion → Dashboard
2. Départ: Sélection véhicule → Checklist → Photos → Validation
3. Livraisons avec app Amazon Flex
4. Retour: Saisie retours → Incidents → Km → Carburant
5. Signature électronique

### Flux Validation POD
1. Photo POD uploadée via API Amazon
2. Analyse automatique (distance, clarté, OTP)
3. Scoring automatique
4. Cas douteux → File d'audit manuel
5. Validation/Rejet par dispatcher

### Flux Assiduité
1. Pointage auto via géolocalisation ou manuel
2. Détection retards (>15min)
3. Alerte RH si pattern détecté
4. Saisie justificatif par chauffeur
5. Validation RH

## 📡 APIs et Intégrations

### APIs Internes
- `/api/auth/*` - Authentification
- `/api/chauffeur/*` - Opérations chauffeur
- `/api/dispatcher/*` - Gestion dispatching
- `/api/rh/*` - Gestion RH
- `/api/fleet/*` - Gestion flotte
- `/api/reports/*` - Génération rapports

### Intégrations Externes
- Amazon Flex API (si disponible)
- Mobilic (temps de travail)
- Géolocalisation (Google Maps)
- SMS/Email (Twilio/SendGrid)
- Stockage S3 (photos)

## 🚀 Phases de Développement

### Phase 1 - Fondations (2-3 semaines)
- [ ] Setup projet monorepo
- [ ] Configuration Prisma + DB
- [ ] Authentification multi-rôles
- [ ] UI de base (layout, navigation)

### Phase 2 - Module Chauffeur (3-4 semaines)
- [ ] Dashboard chauffeur
- [ ] Rapports départ/retour
- [ ] Historique et profil
- [ ] Upload photos

### Phase 3 - Module Dispatcher (2-3 semaines)
- [ ] Dashboard dispatcher
- [ ] Gestion chauffeurs
- [ ] Audit POD
- [ ] Notifications temps réel

### Phase 4 - Module RH (2 semaines)
- [ ] Gestion assiduité
- [ ] Rapports et exports
- [ ] Alertes automatiques

### Phase 5 - Module Fleet (2 semaines)
- [ ] Gestion véhicules
- [ ] Planning maintenance
- [ ] Historique affectations

### Phase 6 - Finalisation (2 semaines)
- [ ] Tests complets
- [ ] Optimisations
- [ ] Documentation
- [ ] Déploiement

## 🛡️ Sécurité et Performance

### Sécurité
- JWT avec refresh tokens
- Rate limiting par IP/user
- Validation données (Zod)
- Sanitization inputs
- HTTPS obligatoire
- Logs d'audit

### Performance
- Cache Redis pour données fréquentes
- Pagination côté serveur
- Lazy loading images
- Compression photos
- CDN pour assets
- Queue jobs (BullMQ)

## 📱 Considérations Mobile

- Design mobile-first
- PWA avec mode offline
- Géolocalisation native
- Camera API pour photos
- Push notifications
- App React Native future

## 📈 KPIs et Métriques

- Taux POD par chauffeur/global
- DNR rate et raisons
- Temps moyen par livraison
- Taux de présence
- Incidents véhicules/mois
- Coûts maintenance
- Score satisfaction chauffeurs

## 🎯 Prochaines Étapes

1. **Validation du plan** avec toutes les parties prenantes
2. **Setup environnement** de développement
3. **Création des maquettes** UI/UX détaillées
4. **Développement Phase 1** avec tests
5. **Démo et feedback** après chaque phase

---

Ce plan constitue une base solide pour démarrer le développement de Lilou Logistique. Chaque module peut être développé de manière indépendante tout en s'intégrant dans l'architecture globale.