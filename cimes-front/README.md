# Cimes — Angular frontend

Modular Angular app for the ski station API.

## Requirements

- Node.js 20+
- npm
- API running on [http://localhost:8080](http://localhost:8080) (see [`../skistation/README.md`](../skistation/README.md))

## Run

```bash
cd cimes-front
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200).

`ng serve` uses `proxy.conf.json` so browser calls stay same-origin:

| Prefix | Target |
| --- | --- |
| `/piste` `/cours` `/moniteur` `/skieur` `/abonnement` `/inscription` | `http://localhost:8080` |

`src/environments/environment.ts` keeps `apiUrl` empty in development for that proxy.

## Scripts

```bash
npm start       # ng serve (dev + proxy)
npm run build   # production build
```

## Architecture

```
src/app/
  core/
    models/          API and view types
    mappers/         JSON → view models
    services/        HTTP, catalog, session, modal, toast, UI actions
    guards/          route guard by role
    constants/       labels, navigation
  shared/            sidebar, modal, toast, cards, icons
  features/
    public/          home (nav, hero, pistes, cours, pricing, footer)
    auth/            login
    skieur/          skier space (lazy)
    moniteur/        instructor space (lazy)
    admin/           administration (lazy)
    dashboard/       shell (sidebar + router-outlet)
```

One component per screen. Feature routes are loaded on demand.

## Routes

| Path | Screen |
| --- | --- |
| `/` | Public home |
| `/login` | Role selection (skieur / moniteur / admin) |
| `/espace/skieur/overview` | Skier dashboard |
| `/espace/skieur/cours` | Browse and enroll in courses |
| `/espace/skieur/pistes` | Favorite pistes |
| `/espace/skieur/abonnement` | Change subscription formula |
| `/espace/moniteur/overview` | Instructor dashboard |
| `/espace/moniteur/planning` | Assigned courses |
| `/espace/moniteur/eleves` | Enrolled skiers |
| `/espace/admin/overview` | Station overview |
| `/espace/admin/cours` | Courses |
| `/espace/admin/pistes` | Pistes |
| `/espace/admin/moniteurs` | Instructors |
| `/espace/admin/skieurs` | Skiers |
| `/espace/admin/inscriptions` | Enrollments |
| `/espace/admin/abonnements` | Subscriptions |
| `/espace/admin/affectations` | Assignments and queries |

## Login

There is **no backend authentication**. `/login` stores the chosen role and display name in `localStorage` (`cimes-session`). The skier and instructor dashboards use skieur / moniteur **id `1`** by default (`SessionService`).

The guard only checks that a role is selected; it does not validate a password.

## How data flows

1. `CatalogService.refresh()` loads pistes, courses, instructors, skiers, and inscriptions.
2. Mappers in `catalog.mapper.ts` turn API JSON into view models (including `Longeur` / `longeur` and enum labels).
3. Screens read signals from the catalog; create/update/delete goes through `ApiService` + `UiActionsService` (modals + toasts), then refresh.

## UI notes

- Copy and screens are in French.
- Admin **Affectations** groups assignment actions and filtered queries (skiers by formula, subscriptions, instructor weeks, courses, piste colors).
- Table actions (Modifier, Supprimer, Réaffecter) are compact buttons, not raw links.
