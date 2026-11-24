#!/usr/bin/env python3
"""Génère src/content/parcours.json à partir des textes validés de 02-CONTENUS.

Usage : python3 scripts/parcours-depuis-md.py "<chemin vers 02-CONTENUS>"

Les textes font foi : relancer ce script après toute modification des fichiers
fr/03 à 06 et en/03 à 06, plutôt que de retoucher le JSON à la main.
"""
import json, re, sys, pathlib

SOURCE = pathlib.Path(sys.argv[1])
SORTIE = pathlib.Path(__file__).resolve().parent.parent / 'src' / 'content' / 'parcours.json'

FICHIERS = {
    'fr': {'entreprendre': '03-parcours-entreprendre.md', 'activite': '04-parcours-developper-activite.md',
           'orientation': '05-parcours-orientation.md', 'competences': '06-parcours-competences.md'},
    'en': {'entreprendre': '03-start-a-business.md', 'activite': '04-grow-my-business.md',
           'orientation': '05-find-my-direction.md', 'competences': '06-build-my-skills.md'},
}

# Liens du bloc « Et maintenant ? » : mot-clé du texte en gras → page du site.
FICHES_MOTS = [('idée', 'trouver-une-idee'), ('idea', 'trouver-une-idee'), ('clients', 'mes-clients'),
               ('customers', 'mes-clients'), ('valeur', 'proposition-de-valeur'), ('value', 'proposition-de-valeur'),
               ('argent', 'separer-argent'), ('money', 'separer-argent'), ('prix', 'fixer-son-prix'),
               ('price', 'fixer-son-prix'), ('parole', 'prise-de-parole'), ('public', 'prise-de-parole'),
               ('entretien', 'entretien'), ('interview', 'entretien')]
PARCOURS_NOMS = {'Je veux entreprendre': 'entreprendre', 'Start a business': 'entreprendre',
                 'Je veux développer mon activité': 'activite', 'Grow my business': 'activite',
                 'Je cherche mon orientation': 'orientation', 'Find my direction': 'orientation',
                 'Je veux développer mes compétences': 'competences', 'Build my skills': 'competences'}


def fiche_ref(nom):
    n = nom.lower()
    for mot, fid in FICHES_MOTS:
        if mot in n:
            return 'fiche:' + fid
    raise SystemExit(f'Fiche inconnue : {nom}')


def sections(texte):
    """Découpe en sections ## (titre, lignes)."""
    out, cur = [], None
    for l in texte.splitlines():
        if l.startswith('## '):
            cur = [l[3:].strip(), []]
            out.append(cur)
        elif cur is not None:
            cur[1].append(l.rstrip())
    return out


def blocs_etiquetes(lignes):
    """Découpe une section en blocs introduits par une ligne **Étiquette** (suivie éventuellement de texte)."""
    blocs, cur = [], None
    for l in lignes:
        m = re.match(r'^\*\*([^*]+)\*\*(.*)$', l)
        if m and (m.group(2) == '' or m.group(2).startswith(' (') or m.group(2).startswith(' :') or m.group(2).startswith(':')):
            cur = {'etiquette': m.group(1).strip(), 'suite': m.group(2).strip(), 'lignes': []}
            blocs.append(cur)
        elif l.strip() == '---':
            cur = None
        elif cur is not None:
            cur['lignes'].append(l)
    return blocs


def paragraphes(lignes):
    """Lignes → blocs {p}, {ul}, {ol}."""
    out = []
    for l in lignes:
        s = l.strip()
        if not s:
            continue
        if s.startswith('- '):
            if not out or 'ul' not in out[-1]:
                out.append({'ul': []})
            out[-1]['ul'].append(s[2:])
        elif re.match(r'^\d+\. ', s):
            if not out or 'ol' not in out[-1]:
                out.append({'ol': []})
            out[-1]['ol'].append(re.sub(r'^\d+\. ', '', s))
        else:
            out.append({'p': s})
    return out


def sans_italique(s):
    s = s.strip()
    return s[1:-1] if s.startswith('*') and s.endswith('*') and not s.startswith('**') else s


def exercice(n, lignes):
    items, k = [], 0
    for l in lignes:
        s = l.strip()
        if not s:
            continue
        m = re.match(r'^- `\[(champ|field|cases|checkboxes) ?: (.+?)\]`(.*)$', s)
        if m:
            k += 1
            item = {'id': f's{n}_{k}'}
            if m.group(1) in ('cases', 'checkboxes'):
                label, opts = m.group(2).split(' — ', 1)
                item.update(type='cases', label=label.strip(), options=[o.strip() for o in opts.split(' · ')],
                            max=int(re.findall(r'\d', re.search(r'\(([^)]*)\)\s*$', label).group(1))[-1]))
            else:
                item.update(type='texte', label=m.group(2).strip())
                hint = m.group(3).strip()
                if hint:
                    item['hint'] = sans_italique(hint)
            items.append(item)
        elif re.match(r'^- \*(Calcul automatique|Automatic calculation)', s):
            items.append({'type': 'calcul', 'label': sans_italique(s[2:])})
        elif re.match(r'^\*(Calcul automatique|Automatic calculation)', s):
            items.append({'type': 'calcul', 'label': sans_italique(s), 'apres': True})
        else:
            items.append({'type': 'consigne', 't': s})
    return items


def texte_bloc(b):
    return '\n'.join(l for l in b['lignes'] if l.strip()).strip()


def parse(lang, pid, chemin):
    S = sections(chemin.read_text(encoding='utf-8'))
    P = {'id': pid, 'etapes': []}
    for titre, lignes in S:
        B = blocs_etiquetes(lignes)
        get = lambda *noms: next((b for b in B if b['etiquette'] in noms), None)
        if titre in ('Référencement', 'SEO'):
            for l in lignes:
                m = re.match(r'^- \*\*(.+?)\*\* ?: (.+)$', l)
                if m:
                    P['seoTitre' if m.group(1) in ("Titre de l'onglet", 'Page title') else 'seoDescription'] = m.group(2).strip()
        elif titre.startswith('Introduction') or titre.startswith('Pathway introduction'):
            P['titre'] = texte_bloc(get('Titre', 'Heading'))
            P['sousTitre'] = texte_bloc(get('Sous-titre', 'Subheading'))
            P['texte'] = [x['p'] for x in paragraphes(get('Texte', 'Text')['lignes'])]
            P['reperes'] = paragraphes(get('Repères', 'Key facts')['lignes'])[0]['ul']
            perso = next(b for b in B if b['suite'] in ('(encadré)', '(box)'))
            P['persoTitre'] = perso['etiquette']
            paras = [sans_italique(x['p']) for x in paragraphes(perso['lignes'])]
            P['perso'], P['persoNote'] = paras[0], (paras[1] if len(paras) > 1 else None)
            bouton = get('Bouton', 'Button')
            P['commencer'] = bouton['suite'].lstrip(': ').strip() if bouton else None
        elif re.match(r'^(Étape|Step) \d', titre):
            m = re.match(r'^(?:Étape|Step) (\d+) ?: (.+)$', titre)
            n = int(m.group(1))
            e = {'n': n, 'titre': m.group(2).strip()}
            for b in B:
                et = b['etiquette']
                if et in ("L'essentiel", 'The essentials'):
                    e['essentiel'] = paragraphes(b['lignes'])
                elif et.startswith("L'exemple") or "'s example" in et:
                    e['exempleTitre'] = et + ((' ' + b['suite']) if b['suite'] else '')
                    e['exemple'] = paragraphes(b['lignes'])
                elif et.startswith('Exercice') or et.startswith('Exercise'):
                    e['exercice'] = re.sub(r'^(Exercice ?|Exercise): ?', '', et).strip()
                    if b['suite']:
                        e['exerciceNote'] = b['suite'].strip('() ')
                    e['champs'] = exercice(n, b['lignes'])
                elif et in ('Ma prochaine action', 'My next action'):
                    e['action'] = texte_bloc(b)
            P['etapes'].append(e)
        elif titre in ('Auto-évaluation de départ', 'Starting self-assessment'):
            ae = {'titre': texte_bloc(get('Titre', 'Heading'))}
            t = get('Texte', 'Text')['lignes']
            ae['texte'] = next(l for l in t if l.strip() and not l.startswith('*') and not l.startswith('-')).strip()
            ae['echelle'] = sans_italique(next(l for l in t if l.startswith('*')))
            ae['competences'] = []
            for l in t:
                m = re.match(r'^- `\[(?:note 1 à 5|rating 1 to 5) ?: (.+?) — (.+)\]`', l.strip())
                if m:
                    ae['competences'].append({'nom': m.group(1), 'desc': m.group(2)})
            msg = texte_bloc(get('Message affiché après la saisie', 'Message shown after the ratings'))
            ae['message'] = msg
            ae['boutons'] = [x.strip() for x in get('Boutons', 'Buttons')['suite'].lstrip(': ').split(' · ')]
            P['autoDepart'] = ae
        elif titre in ('Auto-évaluation de fin', 'Final self-assessment'):
            t = get('Texte', 'Text')['lignes']
            P['autoFin'] = {'titre': texte_bloc(get('Titre', 'Heading')),
                            'texte': next(l for l in t if l.strip()).strip()}
        elif titre.startswith('Fin du parcours') or titre.startswith('End of the pathway'):
            F = {'titre': texte_bloc(get('Titre', 'Heading')), 'texte': texte_bloc(get('Texte', 'Text'))}
            pied = next(l for l in lignes if l.startswith('En pied de fiche') or l.startswith('Sheet footer'))
            F['pied'] = re.search(r'[«"]\s*(.+?)\s*[»"]\.?$', pied).group(1)
            F['boutons'] = paragraphes(get('Boutons', 'Buttons')['lignes'])[0]['ul']
            suite = []
            for li in paragraphes(next(b for b in B if 'maintenant' in b['etiquette'] or 'What next' in b['etiquette'])['lignes'])[0]['ul']:
                if '→' in li:
                    avant, noms = li.split('→')
                    suite.append({'texte': avant.strip(), 'liens': [{'label': x.strip(), 'ref': fiche_ref(x)} for x in noms.split(' · ')]})
                    continue
                m = re.search(r'\*\*(.+?)\*\*', li)
                nom = m.group(1).rstrip('.')
                if nom in PARCOURS_NOMS:
                    ref = 'route:' + PARCOURS_NOMS[nom]
                elif 'WhatsApp' in nom:
                    ref = 'whatsapp'
                elif 'organisations' in nom:
                    ref = 'route:organisations'
                else:
                    raise SystemExit(f'Lien inconnu : {nom}')
                suite.append({'texte': li, 'ref': ref})
            F['suite'] = suite
            F['rappel'] = texte_bloc(get('Rappel', 'Reminder'))
            P['fin'] = F
    return P


data = {lang: {pid: parse(lang, pid, SOURCE / lang / f) for pid, f in fichiers.items()} for lang, fichiers in FICHIERS.items()}

# Contrôle : mêmes étapes et mêmes champs dans les deux langues.
for pid in FICHIERS['fr']:
    fr, en = data['fr'][pid], data['en'][pid]
    assert len(fr['etapes']) == len(en['etapes']), pid
    for a, b in zip(fr['etapes'], en['etapes']):
        ia = [(c.get('id'), c['type']) for c in a['champs']]
        ib = [(c.get('id'), c['type']) for c in b['champs']]
        assert ia == ib, (pid, a['n'], ia, ib)
        for k in ('essentiel', 'exemple', 'action', 'exercice'):
            assert a.get(k) and b.get(k), (pid, a['n'], k)

SORTIE.write_text(json.dumps(data, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print('OK', SORTIE, {pid: len(data['fr'][pid]['etapes']) for pid in data['fr']})
