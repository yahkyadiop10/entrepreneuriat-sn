<?php
/**
 * Réception des formulaires de entrepreneuriat.sn (contact et demande de partenariat).
 *
 * 1. Refuse tout si les formulaires ne sont pas ouverts (déclaration CDP).
 * 2. Filtre les robots (champ piège, délai minimum, limite par adresse IP).
 * 3. Vérifie chaque champ avec les mêmes règles que le navigateur.
 * 4. Enregistre la demande dans Neon (API HTTP SQL) et envoie l'e-mail interne, en français.
 *
 * Réglages : _config.php, écrit par GitHub Actions au moment de la mise en ligne à partir des secrets
 * (jamais dans le dépôt). Voir docs/formulaires.md.
 */

declare(strict_types=1);

header('X-Robots-Tag: noindex');
header('Cache-Control: no-store');

$CONFIG = is_file(__DIR__ . '/_config.php') ? require __DIR__ . '/_config.php' : [];
$JSON = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');
$LANGUE = (($_POST['langue'] ?? 'fr') === 'en') ? 'en' : 'fr';

function repondre(int $statut, array $corps): never
{
    global $JSON, $LANGUE;
    http_response_code($statut);
    if ($JSON) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($corps, JSON_UNESCAPED_UNICODE);
    } else {
        // Navigateur sans JavaScript : courte page de réponse.
        header('Content-Type: text/html; charset=utf-8');
        $ok = $corps['ok'] ?? false;
        $fr = $LANGUE === 'fr';
        $titre = $ok ? ($fr ? 'Merci, votre message a bien été envoyé.' : 'Thank you, your message has been sent.')
            : ($fr ? "Votre message n'a pas pu être envoyé." : 'Your message could not be sent.');
        $texte = $ok ? '' : ($fr ? 'Revenez en arrière pour vérifier le formulaire, ou écrivez-nous sur WhatsApp au +221 77 788 01 82.'
            : 'Go back to check the form, or message us on WhatsApp at +221 77 788 01 82.');
        $retour = $fr ? '/' : '/en/';
        echo '<!doctype html><html lang="' . $LANGUE . '"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
            . '<title>Entrepreneuriat Sénégal</title><body style="font-family:sans-serif;max-width:40rem;margin:3rem auto;padding:0 1rem">'
            . '<h1>' . htmlspecialchars($titre) . '</h1><p>' . htmlspecialchars($texte) . '</p>'
            . '<p><a href="' . $retour . '">' . ($fr ? "Retour à l'accueil" : 'Back to home') . '</a></p></body></html>';
    }
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    repondre(405, ['ok' => false, 'code' => 'methode']);
}
if (empty($CONFIG['ouvert'])) {
    repondre(503, ['ok' => false, 'code' => 'ferme']);
}

/* ---------- Listes autorisées (libellés français, identiques à src/content/formulaires.ts) ---------- */

const OBJETS = ['Question sur un parcours ou une ressource', "Besoin d'orientation", 'Formation ou accompagnement pour une organisation', 'Proposition de partenariat', 'Autre'];
const TYPES_ORG = ['ONG ou association', 'Organisation internationale', 'Institution publique', 'École, université ou centre de formation', 'Programme ou projet de développement', 'Entreprise', 'Autre'];
const SERVICES = ['Conseil et diagnostic', 'Ingénierie pédagogique', 'Mise en œuvre de formations', 'Formation de formateurs', 'Suivi et évaluation', 'Je ne sais pas encore'];
const THEMATIQUES = ['Entrepreneuriat', 'Soft skills et développement personnel', 'Employabilité', 'Ingénierie pédagogique et formation', 'Conseil, suivi et évaluation', 'Autre'];
const PUBLICS = ['Femmes', 'Jeunes', 'Étudiants et apprenants', 'Porteurs de projets', 'Entrepreneurs', 'Communautés', 'Professionnels et collaborateurs'];
const BENEFICIAIRES = ['moins de 30', '30 à 100', '100 à 500', 'plus de 500', 'je ne sais pas encore'];

/**
 * Description des champs : [libellé français pour l'e-mail, type, obligatoire, longueur max ou liste].
 * Types : texte, email, tel, liste, cases, zone.
 */
const CHAMPS = [
    'contact' => [
        'nom' => ['Nom et prénom', 'texte', true, 120],
        'organisation' => ['Organisation', 'texte', false, 160],
        'email' => ['Adresse e-mail', 'email', true, 160],
        'tel' => ['Téléphone', 'tel', false, 40],
        'objet' => ['Objet', 'liste', true, OBJETS],
        'message' => ['Message', 'zone', true, 1000],
    ],
    'partenariat' => [
        'organisation' => ["Nom de l'organisation", 'texte', true, 160],
        'type_organisation' => ["Type d'organisation", 'liste', true, TYPES_ORG],
        'region' => ['Région ou pays', 'texte', false, 120],
        'nom' => ['Nom et prénom', 'texte', true, 120],
        'fonction' => ['Fonction', 'texte', false, 120],
        'email' => ['Adresse e-mail', 'email', true, 160],
        'tel' => ['Téléphone', 'tel', true, 40],
        'services' => ['Services recherchés', 'cases', true, SERVICES],
        'thematiques' => ['Thématiques', 'cases', false, THEMATIQUES],
        'publics' => ['Public visé', 'cases', false, PUBLICS],
        'beneficiaires' => ['Nombre approximatif de bénéficiaires', 'liste', false, BENEFICIAIRES],
        'periode' => ['Période souhaitée', 'texte', false, 120],
        'projet' => ['Description du projet', 'zone', true, 1500],
    ],
];

$type = $_POST['formulaire'] ?? '';
if (!isset(CHAMPS[$type])) {
    repondre(400, ['ok' => false, 'code' => 'formulaire']);
}

/* ---------- Robots ---------- */

// Champ piège invisible : un humain le laisse vide. On répond « ok » sans rien faire.
if (trim((string)($_POST['site_web'] ?? '')) !== '') {
    repondre(200, ['ok' => true]);
}
// Moins de 3 secondes entre l'affichage et l'envoi : robot.
$debut = (int)($_POST['debut'] ?? 0);
if ($debut > 0 && time() - $debut < 3) {
    repondre(200, ['ok' => true]);
}

$stock = __DIR__ . '/_stock';
if (!is_dir($stock)) {
    @mkdir($stock, 0750, true);
}
if (!is_file($stock . '/.htaccess')) {
    @file_put_contents($stock . '/.htaccess', "Require all denied\n");
}

// Au plus 5 envois par heure et par adresse IP (adresse conservée sous forme d'empreinte, jamais en clair).
$ip = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . ($CONFIG['sel'] ?? 'es'));
$fichierLimite = $stock . '/limites.json';
$limites = is_file($fichierLimite) ? (json_decode((string)file_get_contents($fichierLimite), true) ?: []) : [];
$maintenant = time();
foreach ($limites as $cle => $dates) {
    $limites[$cle] = array_values(array_filter($dates, fn($t) => $t > $maintenant - 3600));
    if (!$limites[$cle]) unset($limites[$cle]);
}
if (count($limites[$ip] ?? []) >= 5) {
    repondre(429, ['ok' => false, 'code' => 'limite']);
}

/* ---------- Vérification des champs ---------- */

function texte(string $v): string
{
    $v = str_replace(["\r\n", "\r"], "\n", $v);
    $v = preg_replace('/[^\P{C}\n\t]/u', '', $v) ?? '';   // caractères de contrôle
    return trim($v);
}

$donnees = [];
foreach (CHAMPS[$type] as $nom => [$libelle, $genre, $requis, $regle]) {
    if ($genre === 'cases') {
        $valeurs = array_values(array_unique(array_map('strval', (array)($_POST[$nom] ?? []))));
        $valeurs = array_values(array_filter($valeurs, fn($x) => in_array($x, $regle, true)));
        if ($requis && !$valeurs) repondre(422, ['ok' => false, 'code' => 'requis', 'champ' => $nom]);
        $donnees[$nom] = $valeurs;
        continue;
    }
    $v = texte((string)($_POST[$nom] ?? ''));
    if ($requis && $v === '') repondre(422, ['ok' => false, 'code' => 'requis', 'champ' => $nom]);
    if ($genre === 'liste') {
        if ($v !== '' && !in_array($v, $regle, true)) repondre(422, ['ok' => false, 'code' => 'requis', 'champ' => $nom]);
    } elseif (mb_strlen($v) > $regle) {
        repondre(422, ['ok' => false, 'code' => 'longueur', 'champ' => $nom]);
    }
    if ($genre === 'email' && $v !== '' && !filter_var($v, FILTER_VALIDATE_EMAIL)) {
        repondre(422, ['ok' => false, 'code' => 'email', 'champ' => $nom]);
    }
    if ($genre === 'tel' && $v !== '' && !preg_match('/^[0-9+().\s-]{6,40}$/', $v)) {
        repondre(422, ['ok' => false, 'code' => 'requis', 'champ' => $nom]);
    }
    $donnees[$nom] = $v;
}
if (($_POST['consentement'] ?? '') !== 'oui') {
    repondre(422, ['ok' => false, 'code' => 'requis', 'champ' => 'consentement']);
}

/* ---------- Document joint (partenariat) ---------- */

$document = null;
if ($type === 'partenariat' && isset($_FILES['document']) && ($_FILES['document']['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE) {
    $f = $_FILES['document'];
    $ext = strtolower(pathinfo((string)$f['name'], PATHINFO_EXTENSION));
    $types = ['pdf' => ['application/pdf'], 'doc' => ['application/msword', 'application/octet-stream', 'application/x-ole-storage', 'application/CDFV2'],
        'docx' => ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip', 'application/octet-stream']];
    $mime = $f['error'] === UPLOAD_ERR_OK && function_exists('finfo_open')
        ? (string)finfo_file(finfo_open(FILEINFO_MIME_TYPE), $f['tmp_name']) : '';
    if ($f['error'] !== UPLOAD_ERR_OK || $f['size'] > 5 * 1024 * 1024 || !isset($types[$ext]) || ($mime !== '' && !in_array($mime, $types[$ext], true))) {
        repondre(422, ['ok' => false, 'code' => 'fichier', 'champ' => 'document']);
    }
    $dossier = $stock . '/documents';
    if (!is_dir($dossier)) @mkdir($dossier, 0750, true);
    $nomStocke = date('Ymd-His') . '-' . bin2hex(random_bytes(6)) . '.' . $ext;
    if (!move_uploaded_file($f['tmp_name'], $dossier . '/' . $nomStocke)) {
        repondre(500, ['ok' => false, 'code' => 'fichier-stockage']);
    }
    $document = ['nom' => mb_substr(basename((string)$f['name']), 0, 120), 'fichier' => $nomStocke, 'chemin' => $dossier . '/' . $nomStocke, 'mime' => $mime ?: 'application/octet-stream'];
}

/* ---------- Enregistrement dans Neon (API HTTP SQL) ---------- */

/** Envoie une requête paramétrée à Neon. Renvoie true si elle a réussi. */
function neon(string $url, string $requete, array $params): bool
{
    $p = parse_url($url);
    if (!$p || empty($p['host'])) return false;
    // Même adresse que le pilote officiel @neondatabase/serverless : https://api.<reste de l'hôte>/sql
    $ch = curl_init('https://' . preg_replace('/^[^.]+\./', 'api.', $p['host']) . '/sql');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json', 'Neon-Connection-String: ' . $url],
        CURLOPT_POSTFIELDS => json_encode(['query' => $requete, 'params' => $params], JSON_UNESCAPED_UNICODE),
    ]);
    $corps = curl_exec($ch);
    $code = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($code !== 200) error_log('[formulaires] Neon ' . $code . ' ' . substr((string)$corps, 0, 300));
    return $code === 200;
}

$enregistre = false;
if (!empty($CONFIG['neon'])) {
    $enregistre = neon(
        (string)$CONFIG['neon'],
        'insert into demandes (formulaire, langue, nom, email, organisation, donnees, document) values ($1, $2, $3, $4, $5, $6::jsonb, $7)',
        [$type, $LANGUE, $donnees['nom'], $donnees['email'], $donnees['organisation'] ?: null,
            json_encode($donnees, JSON_UNESCAPED_UNICODE), $document['fichier'] ?? null]
    );
}

/* ---------- E-mail interne (toujours en français) ---------- */

$sujet = $type === 'contact'
    ? 'Nouveau message du site : ' . $donnees['objet'] . ' — ' . $donnees['nom']
    : 'Nouvelle demande de partenariat : ' . $donnees['organisation'];
$lignes = [];
foreach (CHAMPS[$type] as $nom => [$libelle, $genre]) {
    $v = $donnees[$nom];
    $lignes[] = $libelle . ' : ' . (is_array($v) ? ($v ? implode(', ', $v) : '—') : ($v !== '' ? ($genre === 'zone' ? "\n" . $v . "\n" : $v) : '—'));
}
$lignes[] = 'Document joint : ' . ($document ? $document['nom'] . ' (copie sur le serveur : api/_stock/documents/' . $document['fichier'] . ')' : '—');
$lignes[] = '';
$lignes[] = 'Langue du formulaire : ' . strtoupper($LANGUE);
$lignes[] = 'Reçu le : ' . (new DateTime('now', new DateTimeZone('Africa/Dakar')))->format('d/m/Y à H:i');
$lignes[] = 'Enregistré dans la base : ' . ($enregistre ? 'oui' : 'non');
$corpsTexte = implode("\n", $lignes) . "\n";

$destinataire = (string)($CONFIG['email'] ?? 'contact@entrepreneuriat.sn');
$expediteur = (string)($CONFIG['expediteur'] ?? 'site@entrepreneuriat.sn');
$entetes = [
    'From' => 'Site entrepreneuriat.sn <' . $expediteur . '>',
    'Reply-To' => preg_replace('/[\r\n]/', '', $donnees['email']),
    'MIME-Version' => '1.0',
];
$encoder = fn(string $s) => '=?UTF-8?B?' . base64_encode($s) . '?=';
if ($document) {
    $limite = 'es-' . bin2hex(random_bytes(8));
    $entetes['Content-Type'] = 'multipart/mixed; boundary="' . $limite . '"';
    $message = "--$limite\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($corpsTexte))
        . "--$limite\r\nContent-Type: " . $document['mime'] . '; name="' . $encoder($document['nom']) . "\"\r\n"
        . "Content-Transfer-Encoding: base64\r\nContent-Disposition: attachment; filename=\"" . $encoder($document['nom']) . "\"\r\n\r\n"
        . chunk_split(base64_encode((string)file_get_contents($document['chemin'])))
        . "--$limite--\r\n";
} else {
    $entetes['Content-Type'] = 'text/plain; charset=UTF-8';
    $entetes['Content-Transfer-Encoding'] = 'base64';
    $message = chunk_split(base64_encode($corpsTexte));
}
$envoye = @mail($destinataire, $encoder($sujet), $message, $entetes, '-f' . $expediteur);
if (!$envoye) error_log('[formulaires] e-mail non envoyé');

if (!$enregistre && !$envoye) {
    repondre(500, ['ok' => false, 'code' => 'envoi']);
}

$limites[$ip][] = $maintenant;
@file_put_contents($fichierLimite, json_encode($limites), LOCK_EX);
repondre(200, ['ok' => true]);
