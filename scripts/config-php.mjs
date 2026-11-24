// Écrit dist/api/_config.php au moment de la mise en ligne (GitHub Actions), à partir des secrets.
// Rien de secret n'est jamais écrit dans le dépôt.
import { writeFileSync, mkdirSync } from 'node:fs';

const lit = (s) => `'${String(s ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
const ouvert = String(process.env.PUBLIC_FORMULAIRES ?? '').trim().toLowerCase() === 'ouvert';
const config = {
  ouvert: ouvert ? 'true' : 'false',
  neon: lit(process.env.NEON_DATABASE_URL),
  email: lit(process.env.FORMULAIRES_EMAIL || 'contact@entrepreneuriat.sn'),
  expediteur: lit(process.env.FORMULAIRES_EXPEDITEUR || 'site@entrepreneuriat.sn'),
  sel: lit(process.env.FORMULAIRES_SEL || process.env.GITHUB_REPOSITORY || 'es'),
};
mkdirSync('dist/api', { recursive: true });
writeFileSync(
  'dist/api/_config.php',
  `<?php\n// Généré à la mise en ligne. Ne pas modifier sur le serveur.\nreturn [\n${Object.entries(config).map(([k, v]) => `  '${k}' => ${v},`).join('\n')}\n];\n`,
  { mode: 0o640 },
);
console.log(`_config.php écrit : formulaires ${ouvert ? 'OUVERTS' : 'fermés'}, base Neon ${process.env.NEON_DATABASE_URL ? 'renseignée' : 'absente'}.`);
