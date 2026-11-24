# Mise en ligne

Le site est un site statique Astro. Il est construit par GitHub Actions et envoyé par FTPS sur l'hébergement mutualisé LWS (décision D5).

## Le circuit

1. Chaque modification se fait sur une branche, puis dans une demande de fusion (pull request).
2. **Contrôles** (`.github/workflows/ci.yml`) : vérification des types, construction, puis `npm run verifier` (langue de chaque page, liens internes, un seul titre h1, balises hreflang).
3. **Aperçu Vercel** : chaque demande de fusion reçoit une adresse de prévisualisation, à ouvrir sur téléphone.
4. **Mise en ligne** (`.github/workflows/deploy.yml`) : à chaque fusion dans `main`, le site est reconstruit, passe les contrôles de production, puis est envoyé sur LWS.

Les contrôles de production refusent l'envoi s'il reste un lien cassé ou un crochet `[À COMPLÉTER]`, `[TO COMPLETE]` ou `[PROPOSITION]` dans une page (pages légales en brouillon).

## Secrets à saisir (une seule fois)

Dans GitHub : dépôt → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.

| Nom | Valeur |
|---|---|
| `FTP_SERVER` | serveur FTP indiqué dans l'espace client LWS |
| `FTP_USERNAME` | identifiant FTP |
| `FTP_PASSWORD` | mot de passe FTP |
| `FTP_SERVER_DIR` | dossier web, par exemple `/htdocs/` (avec la barre finale) |

Ces identifiants ne doivent jamais être écrits dans le code, ni envoyés dans une conversation. Tant qu'ils sont absents, l'envoi vers LWS est simplement sauté.

## Aperçus Vercel

Le projet Vercel `entrepreneuriat-sn` (équipe Digitalab) est relié au dépôt depuis le 24/11/2026 : framework Astro, commande `npm run build`, dossier `dist`, Node 22. Chaque branche poussée reçoit une adresse d'aperçu, affichée dans la demande de fusion. Les aperçus sont protégés : il faut être connecté à Vercel avec un compte de l'équipe pour les ouvrir. Vercel ne sert qu'aux aperçus : la production reste sur LWS.

## Le fichier .htaccess

`public/.htaccess` est copié tel quel sur LWS. Il force `https://entrepreneuriat.sn` sans `www` (D8), sert la page 404 dans la bonne langue et règle le cache.

## En local

```bash
npm install
npm run dev        # http://localhost:4321
npm run build && npm run verifier
```
