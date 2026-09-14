# Cimes — Ski Station

Full-stack management app for a ski resort: pistes, courses, instructors, skiers, subscriptions, and enrollments.

The public site is branded **Cimes**. The backend keeps the original case-study name `skistation`.

## Stack

| Layer | Tech |
| --- | --- |
| Backend | Spring Boot 4.1.1, Java 17, Spring Data JPA, MySQL |
| Frontend | Angular 21, standalone components, lazy feature routes |
| API client | Postman collection in `skistation/Skistation.postman_collection.json` |

## Repository layout

```
skistation/          Spring REST API (port 8080)
cimes-front/         Angular app (port 4200)
skitstationFront/    original static HTML mock
```

- Backend README: [`skistation/README.md`](skistation/README.md)
- Frontend README: [`cimes-front/README.md`](cimes-front/README.md)

## Quick start

1. Create a MySQL database named `skistation` and a user that matches `skistation/src/main/resources/application.properties`.
2. Start the API:

```bash
cd skistation
./mvnw spring-boot:run
```

3. Start the UI:

```bash
cd cimes-front
npm install
npm start
```

4. Open [http://localhost:4200](http://localhost:4200). In development, Angular proxies `/piste`, `/cours`, `/moniteur`, `/skieur`, `/abonnement`, and `/inscription` to `http://localhost:8080`.

## What you can do

| Space | URL | Purpose |
| --- | --- | --- |
| Public site | `/` | Pistes, courses, pricing |
| Skier | `/espace/skieur` | Courses, favorite pistes, subscription |
| Instructor | `/espace/moniteur` | Planning and enrolled skiers |
| Admin | `/espace/admin` | Full CRUD, assignments, reports |

Login is **local to the frontend** (role selection stored in `localStorage`). The API itself has no Spring Security yet. Pick **skieur**, **moniteur**, or **admin** on `/login`.

## Domain

- A **skieur** owns one **abonnement** and can enroll in **cours** and favorite **pistes**.
- A **cours** has a type, support (ski / snowboard), time slot, optional **moniteur**, and **inscriptions**.
- Collective courses (`COLLECTIF_ENFANT`, `COLLECTIF_ADULTE`) are limited to **6** skiers.

Some enum and field names come from the original case study and are kept as-is: `PARTICULEIR`, `MENSUELL`, `SEMESTER`, `Longeur`, `creanau`.
