# entrepreneuriat.sn

Site bilingue (français, anglais) d'Entrepreneuriat Sénégal, construit avec [Astro](https://astro.build) en pages statiques et hébergé chez LWS.

- Français à la racine, anglais sous `/en/`. Table des adresses : `src/i18n/routes.ts`.
- Design : kit de passation Claude Design (direction 1b « Atelier »), valeurs dans `src/styles/tokens.css`.
- Textes : la référence éditoriale reste `02-CONTENUS/` dans le dossier du projet ; ils sont recopiés dans `src/content/`.
- Mise en ligne : voir [docs/mise-en-ligne.md](docs/mise-en-ligne.md).

## Organisation

```
src/styles/      tokens.css, base.css
src/layouts/     Base.astro (en-tête, pied de page, WhatsApp, hreflang)
src/components/  composants partagés (Bouton, Photo, Icone, FilAriane…)
src/templates/   gabarits de page
src/islands/     petits scripts (parcours, formulaires, filtres)
src/content/     textes FR et EN
src/i18n/        correspondance des adresses FR ↔ EN, libellés communs
src/pages/       adresses FR à la racine, EN sous en/
public/          logos, polices, photos, .htaccess
api/             scripts PHP des formulaires (désactivés avant la déclaration CDP)
scripts/         contrôles du site construit
```

## Règles

- Pas de compte, rien n'est envoyé au serveur depuis les parcours : les réponses restent dans le navigateur (D2).
- Les formulaires ne sont pas activés avant la déclaration à la CDP.
- Aucune page ne part en ligne avec un crochet `[À COMPLÉTER]`.
- Les exemples et personnages varient les régions du Sénégal ; l'adresse de la structure reste Thiès.
