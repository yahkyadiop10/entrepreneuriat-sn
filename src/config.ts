// État des formulaires, réglé au moment de la construction par la variable PUBLIC_FORMULAIRES :
//   (absente) ou « ferme » : encadré WhatsApp + e-mail à la place du formulaire (tant que la déclaration CDP n'est pas faite) ;
//   « apercu »  : formulaire visible et vérifié dans le navigateur, mais rien n'est envoyé (aperçus Vercel) ;
//   « ouvert »  : formulaire actif, envoyé à /api/envoyer.php sur LWS.
// En production, la variable vient de la variable GitHub FORMULAIRES (Settings → Secrets and variables → Actions → Variables).
export type EtatFormulaires = 'ferme' | 'apercu' | 'ouvert';
const brut = String(import.meta.env.PUBLIC_FORMULAIRES ?? '').trim().toLowerCase();
export const FORMULAIRES: EtatFormulaires = brut === 'ouvert' || brut === 'apercu' ? brut : 'ferme';
export const ADRESSE_ENVOI = '/api/envoyer.php';
