# Cimes — frontend Angular

Application Angular modulaire branchée sur l’API Spring `skistation`.

## Démarrer

```bash
cd skistation && ./mvnw spring-boot:run
cd cimes-front && npm start
```

Ouvrir http://localhost:4200. L’API est proxifiée vers http://localhost:8080.

## Architecture

```
src/app/
  core/                 modèles, mappers, services HTTP, session, garde
  shared/               modal, toast, sidebar, cartes, icônes
  features/
    public/             accueil (nav, hero, pistes, cours, tarifs, footer)
    auth/               connexion
    skieur/             espace skieur + routes lazy
    moniteur/           espace moniteur + routes lazy
    admin/              administration + routes lazy
    dashboard/          shell (sidebar + outlet)
```

Chaque écran est un composant dédié. Les espaces sont chargés à la demande.
