# Formulaires (contact et demande de partenariat)

Deux formulaires : **Contact** (`/contact/#ecrire`) et **Demande de partenariat** (`/organisations/demande-de-partenariat/`), en français et en anglais.

## Tant que la déclaration CDP n'est pas faite

Les formulaires sont **fermés**. Les pages affichent l'encadré « Le formulaire en ligne arrive bientôt… » avec WhatsApp et l'e-mail, et le serveur refuse tout envoi. Rien à faire.

## Comment ça marche une fois ouverts

1. Le navigateur vérifie les champs (champs obligatoires, e-mail, document PDF ou Word de 5 Mo maximum).
2. Il envoie la demande à `/api/envoyer.php`, sur LWS. Ce fichier PHP vérifie tout à nouveau et filtre les robots : champ piège invisible, délai minimum de 3 secondes, 5 envois par heure au plus depuis une même adresse.
3. La demande est **enregistrée dans Neon** (table `demandes`) et **envoyée par e-mail** à contact@entrepreneuriat.sn, toujours en français, avec la ligne « Langue du formulaire ». Le document joint est attaché à l'e-mail et gardé sur LWS dans `api/_stock/documents/`, qui n'est pas accessible depuis le web.
4. Si l'une des deux voies échoue, l'autre suffit. Si les deux échouent, le visiteur voit le message d'échec avec WhatsApp.

## Ouvrir les formulaires (une seule fois)

1. **Neon** : créez une base (ou utilisez celle du projet), ouvrez **SQL Editor** et exécutez le contenu de `db/schema.sql`.
2. **GitHub** : dépôt → **Settings** → **Secrets and variables** → **Actions**.
   - Onglet **Secrets**, **New repository secret** :
     - `NEON_DATABASE_URL` : la chaîne de connexion Neon (bouton **Connect** du tableau de bord Neon, elle commence par `postgresql://`).
     - `FORMULAIRES_SEL` (facultatif) : une phrase au hasard, pour l'empreinte des adresses IP.
   - Onglet **Variables**, **New repository variable** : `FORMULAIRES` = `ouvert`.
3. Relancez la mise en ligne (onglet **Actions** → « Mise en ligne (LWS) » → **Run workflow**), ou fusionnez une modification.

Pour refermer : changez la variable `FORMULAIRES` en `ferme` et relancez la mise en ligne.

Ces valeurs ne doivent jamais être écrites dans le code ni envoyées dans une conversation. GitHub Actions les écrit dans `api/_config.php` au moment de l'envoi vers LWS ; ce fichier est bloqué par `api/.htaccess`.

## Aperçus Vercel

Sur les aperçus, la variable Vercel `PUBLIC_FORMULAIRES` vaut `apercu` : les formulaires sont visibles et vérifiés, un bandeau noir indique qu'ils ne s'envoient pas encore, et rien n'est transmis (Vercel n'exécute pas le PHP).

## À vérifier après l'ouverture

- LWS doit utiliser **PHP 8.1 ou plus** (espace client LWS → réglages PHP).
- Envoyez un message de test depuis chaque formulaire, en français puis en anglais, avec un document joint.
- L'adresse d'expédition est `site@entrepreneuriat.sn` : si les e-mails arrivent en indésirables, créez cette adresse dans LWS ou vérifiez les enregistrements SPF du domaine.
- La politique de confidentialité doit indiquer la durée de conservation des demandes ; `db/schema.sql` contient la requête de suppression correspondante.

## Fichiers

| Fichier | Rôle |
|---|---|
| `src/content/formulaires.ts` | Champs, listes et messages (02-CONTENUS 08 et 12) |
| `src/components/Formulaire.astro`, `src/scripts/formulaire.ts` | Affichage et vérification dans le navigateur |
| `src/config.ts` | État des formulaires (`ferme`, `apercu`, `ouvert`) |
| `public/api/envoyer.php` | Réception sur LWS : vérifications, Neon, e-mail |
| `scripts/config-php.mjs` | Écrit `api/_config.php` à partir des secrets, au moment de la mise en ligne |
| `db/schema.sql` | Table `demandes` à créer dans Neon |
