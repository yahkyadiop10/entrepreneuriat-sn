// Contrôles du site construit (dist/).
//   node scripts/verifier-site.mjs              → contrôles des aperçus
//   node scripts/verifier-site.mjs --production → liens cassés bloquants, et refus de tout crochet [À COMPLÉTER]
//   (README de passation §3). Hors production, les liens vers des pages pas encore codées sont de simples avertissements.
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
const production = process.argv.includes('--production');
const erreurs = [];
const avertissements = [];

if (!fs.existsSync(DIST)) {
  console.error('dist/ introuvable : lancez d’abord « npm run build ».');
  process.exit(1);
}

const pages = [];
(function parcourir(dossier) {
  for (const e of fs.readdirSync(dossier, { withFileTypes: true })) {
    const p = path.join(dossier, e.name);
    if (e.isDirectory()) parcourir(p);
    else if (e.name.endsWith('.html')) pages.push(p);
  }
})(DIST);

const existe = (href) => {
  const propre = decodeURIComponent(href.split('#')[0].split('?')[0]);
  if (propre === '') return true;
  const cible = path.join(DIST, propre);
  return fs.existsSync(cible) && (fs.statSync(cible).isFile() || fs.existsSync(path.join(cible, 'index.html')));
};

const CROCHETS = /\[(À COMPLÉTER|TO COMPLETE|PROPOSITION)[^\]]*\]/gi;

for (const fichier of pages) {
  const rel = '/' + path.relative(DIST, fichier);
  const html = fs.readFileSync(fichier, 'utf8');

  // 1. Langue déclarée
  if (!/<html lang="(fr|en)"/.test(html)) erreurs.push(`${rel} : attribut lang manquant sur <html>`);
  const lang = html.match(/<html lang="(fr|en)"/)?.[1];
  if (lang === 'en' && !rel.startsWith('/en/')) erreurs.push(`${rel} : page anglaise hors de /en/`);
  if (lang === 'fr' && rel.startsWith('/en/')) erreurs.push(`${rel} : page française sous /en/`);

  // 2. Liens internes
  for (const [, href] of html.matchAll(/\s(?:href|src)="(\/[^"]*)"/g)) {
    if (href.startsWith('//')) continue;
    if (!existe(href)) (production ? erreurs : avertissements).push(`${rel} : lien interne cassé → ${href}`);
  }

  // 3. Pages hors 404 : une seule balise h1, et un lien vers l’autre langue
  if (!/404/.test(rel)) {
    const h1 = (html.match(/<h1[\s>]/g) || []).length;
    if (h1 !== 1) erreurs.push(`${rel} : ${h1} titre(s) h1 au lieu de 1`);
    if (!/hreflang="(fr|en)"/.test(html)) erreurs.push(`${rel} : balises hreflang absentes`);
  }

  // 4. Crochets à compléter : interdits en production
  if (production) {
    const texte = html.replace(/<script[\s\S]*?<\/script>/g, '');
    const trouves = [...texte.matchAll(CROCHETS)].map((m) => m[0]);
    if (trouves.length) erreurs.push(`${rel} : ${trouves.length} crochet(s) à compléter, ex. ${trouves[0].slice(0, 60)}`);
  }
}

if (avertissements.length) {
  const cibles = new Set(avertissements.map((a) => a.split('→ ')[1]));
  console.warn(`! ${cibles.size} page(s) liée(s) pas encore construite(s) : ${[...cibles].sort().join(', ')}`);
}
if (erreurs.length) {
  console.error(`✗ ${erreurs.length} problème(s) sur ${pages.length} pages :\n` + erreurs.map((e) => '  - ' + e).join('\n'));
  process.exit(1);
}
console.log(`✓ ${pages.length} pages vérifiées${production ? ' (mode production)' : ''}.`);
