# Ski Station API

Spring Boot REST API for the Cimes ski station. Package: `org.example.skistation`.

## Requirements

- JDK 17+
- Maven Wrapper (`./mvnw`)
- MySQL 8 listening on `localhost:3306`

## Database

Create the schema, then align credentials with `src/main/resources/application.properties`:

```sql
CREATE DATABASE skistation CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'skistation_user'@'localhost' IDENTIFIED BY 'your-password';
GRANT ALL PRIVILEGES ON skistation.* TO 'skistation_user'@'localhost';
FLUSH PRIVILEGES;
```

Hibernate is set to `ddl-auto=update`, so tables are created or updated on startup.

CORS allows `http://localhost:4200`.

## Run

```bash
cd skistation
./mvnw spring-boot:run
```

API base URL: [http://localhost:8080](http://localhost:8080)

Postman: `Skistation.postman_collection.json`

## Architecture

Classic N-tier layout:

```
controller/     REST endpoints
service/        interfaces (ICoursService, ISkieurService, …)
service/impl/   business logic
repository/     Spring Data JPA
model/          entities and enums
config/         CORS
```

## Main entities

| Entity | Notes |
| --- | --- |
| `Piste` | Color, slope, length field `Longeur` |
| `Cours` | Type, support, price, slot `creanau`, optional moniteur |
| `Moniteur` | Instructor, assigned courses, optional prime |
| `Skieur` | Owns `Abonnement` (`cascade ALL`), inscriptions, favorite pistes |
| `Abonnement` | Type, dates, price |
| `Inscription` | Week number, skieur + cours |
| `User` / `Role` | Present on the model; not used by login yet |

## REST

### Piste `/piste`

| Method | Path |
| --- | --- |
| GET | `/all` |
| GET | `/{numPiste}` |
| POST | `/add` |
| PUT | `/update` |
| DELETE | `/{numPiste}` |

### Cours `/cours`

| Method | Path |
| --- | --- |
| GET | `/all` |
| GET | `/{numCours}` |
| GET | `/byType/{typeCours}` |
| GET | `/bySupport/{support}` |
| POST | `/add` |
| PUT | `/update` |
| DELETE | `/{numCours}` |

Deleting a course also removes its inscriptions.

### Moniteur `/moniteur`

| Method | Path |
| --- | --- |
| GET | `/all` |
| GET | `/{numMoniteur}` |
| POST | `/add` |
| PUT | `/update` |
| DELETE | `/{numMoniteur}` |
| POST | `/addAndAssignToCours/{numCours}` |
| GET | `/weeks/{numMoniteur}/{support}` |
| PUT | `/best` |

`PUT /best` picks the instructor with the most courses and sets a prime.

### Skieur `/skieur`

| Method | Path |
| --- | --- |
| GET | `/all` |
| GET | `/{numSkieur}` |
| POST | `/add` |
| PUT | `/update` |
| DELETE | `/{numSkieur}` |
| PUT | `/assignToPiste/{numSkieur}/{numPiste}` |
| POST | `/addAndAssignToCours/{numCours}` |
| GET | `/byTypeAbonnement/{typeAbonnement}` |
| GET | `/nombreParCouleurPiste` |

### Abonnement `/abonnement`

| Method | Path |
| --- | --- |
| GET | `/all` |
| GET | `/{id}` |
| PUT | `/update` |
| GET | `/byType/{type}` |
| GET | `/byDates?startDate=&endDate=` |

Dates use `yyyy-MM-dd`.

### Inscription `/inscription`

| Method | Path |
| --- | --- |
| GET | `/all` |
| GET | `/{numInscription}` |
| GET | `/byCours/{numCours}` |
| GET | `/bySkieur/{numSkieur}` |
| POST | `/addAndAssign/{numSkieur}/{numCours}` |
| PUT | `/assignToCours/{numInscription}/{numCours}` |
| DELETE | `/{numInscription}` |

Body for a new inscription: `{ "numSemaine": 12 }`.

Collective courses reject a 7th skier (`Le cours collectif est déjà complet`).

## Enums (keep these spellings)

```
Color            VERT, BLEU, ROUGE, NOIR
Support          SKI, SNOWBOARD
TypeCours        COLLECTIF_ENFANT, COLLECTIF_ADULTE, PARTICULEIR
TypeAbonnement   ANNUEL, SEMESTER, MENSUELL
```

## Business notes

- JSON cycles are reduced with `@JsonIgnore` / `@JsonIgnoreProperties` (course inscriptions, moniteur courses, skieur user).
- Skier update merges name/city/dates and does not wipe inscriptions.
- Instructor delete unassigns that person from their courses first.
