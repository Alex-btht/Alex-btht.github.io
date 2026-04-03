# Alex-btht.github.io

# FAIRINO France - Site Web

## Structure des fichiers

```text
fairino-site/
|- index.html                   <- Fichier principal du site
|- partenaires.html             <- Page dediee partenaires
`- images/
   |- logo.png                  <- Logo FAIRINO (blanc)
   |- logo-orange.png           <- Logo FAIRINO FRANCE
   |- gamme-complete.png        <- Photo de la gamme complete FR3->FR30
   |- hero.jpg                  <- Ancien hero (non utilise actuellement)
   |- about-bg.jpg              <- Image fond section "A propos"
   |- cobot-action.jpg
   |- cobots/
   |- applications/
   `- equipments/
```

## Comment remplacer les images

- Respecter les noms de fichiers existants.
- Garder les images dans les memes dossiers.
- Formats recommandes: JPG/PNG selon les fichiers existants.

## Gerer les comptes partenaires

La connexion et les tarifs partenaires sont maintenant geres dans `partenaires.html`.

Dans le script en bas de `partenaires.html`, modifier:

- `PARTNER_ACCOUNTS` pour les identifiants
- `PARTNER_PRICES` pour les prix Silver/Gold/Platinum

## Publication

### GitHub Pages

1. Pousser le projet sur le depot GitHub.
2. Dans GitHub: `Settings > Pages`.
3. Source: `Deploy from a branch` puis `main` / `/ (root)`.

## Coordonnees principales a personnaliser

Dans `index.html`:

- Telephone
- Email
- Adresse
- Horaires

Dans `partenaires.html`:

- Email account manager
- Identifiants demo

