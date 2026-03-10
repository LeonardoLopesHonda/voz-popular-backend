# Voz Popular — Project Plan & API Contract

**Voz Popular** (Portuguese for _Popular Voice_) is a digital civic engagement platform designed to improve communication between citizens and the municipal government of **Ladário, Mato Grosso do Sul, Brazil**.

Citizens use a mobile app to report urban issues — potholes, broken streetlights, waste disposal problems, infrastructure failures — attaching photos, descriptions, and GPS location data. Municipal administrators manage and respond to those reports through a web dashboard, tracking each report through a structured status workflow and keeping citizens informed on progress.

The platform acts as a portable, structured reporting channel between the population and the public administration — promoting transparency, civic participation, and faster resolution of urban problems.

> Originally developed as a final undergraduate project (TCC) at IFMS – Campus Corumbá for the Technology in Systems Analysis and Development program. This repository represents a full backend migration and architectural redesign of the original Laravel prototype.

---

## Stack

| Layer            | Technology                                               |
| ---------------- | -------------------------------------------------------- |
| Mobile (Citizen) | Flutter · Dart                                           |
| Backend API      | NestJS · TypeScript · Prisma                             |
| Database         | PostgreSQL via Supabase                                  |
| File Storage     | Supabase Storage                                         |
| Admin Dashboard  | Next.js · React Leaflet                                  |
| Deployment       | Railway (API) · Vercel (Admin) · Supabase (DB + Storage) |
| Moderation       | Google Perspective API (text) · Sightengine (images)     |

---

> **Deadline:** End of March 2026
> **Solo developer**

---

## Table of Contents

1. [Milestones](#milestones)
2. [Module Structure](#module-structure)
3. [Tasks](#tasks)

---

## Milestones

| #   | Milestone                                                           | Target         | Status |
| --- | ------------------------------------------------------------------- | -------------- | ------ |
| M1  | Schema finalized & Prisma migrations running on Supabase            | Week 1 Day 1–2 | ⬜     |
| M2  | Auth endpoints working (register, login, logout, me)                | Week 1 Day 3–4 | ⬜     |
| M3  | Core occurrence endpoints working (Flutter can submit & list)       | Week 1 Day 5–7 | ⬜     |
| M4  | Comments & Updates endpoints working                                | Week 2 Day 1–2 | ⬜     |
| M5  | Admin endpoints working (status update, sector mgmt)                | Week 2 Day 3–4 | ⬜     |
| M6  | Moderation integrated (Perspective API + Sightengine)               | Week 2 Day 5–6 | ⬜     |
| M7  | Flutter fully wired to new API (base URL swapped, all flows tested) | Week 2 Day 7   | ⬜     |
| M8  | Admin Next.js panel live (map view + occurrence management)         | Week 3 Day 1–4 | ⬜     |
| M9  | Deployment live (Railway + Supabase + Vercel)                       | Week 3 Day 5–6 | ⬜     |
| M10 | Final QA & handoff                                                  | Week 3 Day 7   | ⬜     |

---

## Module Structure

```
src/
├── auth/           # JWT strategy, login, register, logout
├── users/          # Profile, me endpoint
├── sectors/        # Sector CRUD (admin only)
├── categories/     # Category reference data
├── themes/         # Theme reference data
├── occurrences/    # Core domain — submission, listing, status
├── comments/       # Comments per occurrence
├── updates/        # Admin workflow history per occurrence
└── moderation/     # Perspective API + Sightengine integration
```

## Tasks

### M1 — Schema & Database

- [ ] Create Supabase project and grab `DATABASE_URL`
- [ ] Bootstrap NestJS project with Prisma
- [ ] Paste and validate `schema.prisma`
- [ ] Run first migration (`prisma migrate dev`)
- [ ] Seed categories and themes

### M2 — Auth

- [ ] Install `@nestjs/jwt`, `bcrypt`, `passport-jwt`
- [ ] Implement `AuthModule` with register, login, logout
- [ ] Implement `JwtStrategy` and `JwtAuthGuard`
- [ ] Implement `IsAdmin` guard for admin-only routes
- [ ] Test auth flow end to end with Postman/Insomnia

### M3 — Occurrences Core

- [ ] Implement `OccurrencesModule`
- [ ] POST `/occurrences` with multipart upload to Supabase Storage
- [ ] Auto-generate title from theme + date
- [ ] GET `/occurrences` with pagination and filters
- [ ] GET `/occurrences/:id`
- [ ] GET `/me/occurrences`
- [ ] Wire `isOverdue` computed property on all occurrence responses

### M4 — Comments & Updates

- [ ] Implement `CommentsModule`
- [ ] GET + POST `/occurrences/:id/comments`
- [ ] Implement `UpdatesModule`
- [ ] GET `/occurrences/:id/updates`
- [ ] POST `/admin/occurrences/:id/updates`
- [ ] Ensure status change via PATCH also auto-creates an Update record

### M5 — Admin Endpoints

- [ ] PATCH `/admin/occurrences/:id/status`
- [ ] Full `SectorsModule` CRUD
- [ ] Category and Theme admin endpoints
- [ ] Validate: admin cannot hard delete occurrences

### M6 — Moderation

- [ ] Implement `ModerationModule`
- [ ] Integrate Perspective API for comment and occurrence description text
- [ ] Integrate Sightengine for occurrence image
- [ ] Return 202 (flagged/under review) or 422 (rejected) correctly
- [ ] Make moderation non-blocking on failure (external API down should not block submission)

### M7 — Flutter Integration

- [ ] Swap base URL from `localhost:8000` to Railway deployment URL
- [ ] Update Flutter field keys from Portuguese to English
- [ ] Fix font registration (`SpoofTrial` → `Poppins` in pubspec.yaml)
- [ ] Implement 401 interceptor in `ApiClient` (auto logout on token expiry)
- [ ] Test all Flutter flows against new API: register, login, submit, list, detail, comment
- [ ] Test on physical device (not emulator) for geolocation and camera

### M8 — Admin Next.js Panel

- [ ] Scaffold Next.js project
- [ ] Implement login page (admin only)
- [ ] Implement occurrence map view with `react-leaflet`
- [ ] Implement occurrence list with status filter
- [ ] Implement occurrence detail + status update form
- [ ] Implement sector management page
- [ ] Implement polling for map updates (30s interval)

### M9 — Deployment

- [ ] Deploy NestJS API to Railway
- [ ] Configure environment variables on Railway
- [ ] Configure Supabase Storage bucket and public access rules
- [ ] Deploy Next.js admin panel to Vercel
- [ ] Update Flutter base URL to production Railway URL
- [ ] Smoke test all three clients against production

### M10 — Final QA

- [ ] Full citizen flow: register → submit occurrence → track status → comment
- [ ] Full admin flow: login → view map → update status → add update message
- [ ] Verify moderation rejects toxic content
- [ ] Verify `isOverdue` displays correctly on overdue occurrences
- [ ] Confirm no hard delete paths exist in any client
