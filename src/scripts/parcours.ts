// Comportement des parcours guidés, côté navigateur. Tout reste dans localStorage (D2) :
// aucune réponse n'est envoyée au serveur.

type Reponses = Record<string, string | string[]>;
type Notes = { depart?: Record<string, number>; fin?: Record<string, number> };
type Calcul = { cible: string; plus: string[]; moins: string[] };

export const lire = <T = Reponses>(cle: string): T => {
  try { return JSON.parse(localStorage.getItem(cle) || '{}'); } catch { return {} as T; }
};
export const ecrire = (cle: string, v: unknown) => {
  try { localStorage.setItem(cle, JSON.stringify(v)); } catch { /* stockage indisponible (navigation privée) */ }
};

const nombre = (s: unknown) => {
  const n = parseFloat(String(s ?? '').replace(/[^\d,.-]/g, '').replace(',', '.'));
  return Number.isFinite(n) ? n : null;
};
// Groupes de milliers écrits à la main : « 1 500 FCFA » (comme dans les textes), « 1,500 CFA francs ».
export const formater = (n: number, fr: boolean) => {
  const s = Math.abs(Math.round(n)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, fr ? ' ' : ',');
  return (n < 0 ? '−' : '') + s + (fr ? ' FCFA' : ' CFA francs');
};

/** Calcule les résultats automatiques à partir des réponses ; les enregistre pour la fiche finale. */
export function calculer(r: Reponses, calculs: Calcul[], fr: boolean) {
  const res: Record<string, number | null> = {};
  for (const c of calculs) {
    const plus = c.plus.map((id) => nombre(r[id]));
    const moins = c.moins.map((id) => nombre(r[id]));
    res[c.cible] = plus.some((x) => x == null) || moins.every((x) => x == null)
      ? null
      : plus.reduce<number>((a, x) => a + (x ?? 0), 0) - moins.reduce<number>((a, x) => a + (x ?? 0), 0);
    if (res[c.cible] == null) delete r[c.cible];
    else r[c.cible] = formater(res[c.cible]!, fr);
  }
  return res;
}

/** Étape d'un parcours : champs enregistrés à chaque frappe, calculs, cases à cocher, effacement. */
export function initEtape(racine: HTMLElement) {
  const cle = racine.dataset.cle!;
  const fr = racine.dataset.lang === 'fr';
  const calculs: Calcul[] = JSON.parse(racine.dataset.calculs || '[]');
  const champs = [...racine.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('textarea[name], input[name]')];

  const majCases = () => {
    racine.querySelectorAll<HTMLFieldSetElement>('fieldset[data-max]').forEach((f) => {
      const max = Number(f.dataset.max);
      const cases = [...f.querySelectorAll<HTMLInputElement>('input[type=checkbox]')];
      const n = cases.filter((c) => c.checked).length;
      cases.forEach((c) => { c.disabled = !c.checked && n >= max; });
    });
  };
  const majCalculs = (r: Reponses) => {
    const res = calculer(r, calculs, fr);
    racine.querySelectorAll<HTMLOutputElement>('[data-calcul]').forEach((o) => {
      const n = res[o.dataset.calcul!];
      o.textContent = n == null ? '—' : formater(n, fr);
      o.classList.toggle('negatif', n != null && n < 0);
    });
  };
  const sauver = () => {
    const r = lire(cle);
    for (const c of champs) {
      if (c instanceof HTMLInputElement && c.type === 'checkbox') {
        r[c.name] = champs.filter((x) => x.name === c.name && (x as HTMLInputElement).checked).map((x) => x.value);
        if (!(r[c.name] as string[]).length) delete r[c.name];
      } else if (c.value.trim()) r[c.name] = c.value;
      else delete r[c.name];
    }
    majCalculs(r);
    ecrire(cle, r);
    majCases();
  };
  const remplir = () => {
    const r = lire(cle);
    for (const c of champs) {
      const v = r[c.name];
      if (c instanceof HTMLInputElement && c.type === 'checkbox') c.checked = Array.isArray(v) && v.includes(c.value);
      else c.value = typeof v === 'string' ? v : '';
    }
    majCalculs(r);
    majCases();
  };

  remplir();
  champs.forEach((c) => c.addEventListener(c instanceof HTMLInputElement && c.type === 'checkbox' ? 'change' : 'input', sauver));
  brancherEffacer(racine, remplir);
}

/** « Effacer mes réponses » : supprime les clés du parcours après confirmation. */
export function brancherEffacer(racine: HTMLElement, apres: () => void) {
  racine.querySelectorAll<HTMLButtonElement>('.effacer').forEach((b) => b.addEventListener('click', () => {
    if (!window.confirm(racine.dataset.confirm)) return;
    for (const cle of (racine.dataset.cles || racine.dataset.cle || '').split(' ').filter(Boolean)) {
      try { localStorage.removeItem(cle); } catch { /* rien */ }
    }
    apres();
  }));
}

/** Les 2 compétences les moins bien notées ; à égalité, celles qui viennent en premier. */
export const priorites = (depart: Record<string, number>, total: number) =>
  Array.from({ length: total }, (_, i) => i)
    .filter((i) => depart[i] != null)
    .sort((a, b) => depart[a] - depart[b] || a - b)
    .slice(0, 2);

/** Auto-évaluation (parcours Compétences) : notes de départ ou de fin. */
export function initAutoEvaluation(racine: HTMLElement) {
  const cle = racine.dataset.cleNotes!;
  const moment = racine.dataset.moment as 'depart' | 'fin';
  const total = Number(racine.dataset.total);
  const noms: string[] = JSON.parse(racine.dataset.noms || '[]');
  const urls: string[] = JSON.parse(racine.dataset.urls || '[]');
  const radios = [...racine.querySelectorAll<HTMLInputElement>('input[type=radio]')];

  const maj = () => {
    const notes = lire<Notes>(cle);
    const ici = notes[moment] || {};
    radios.forEach((r) => { r.checked = ici[r.dataset.i!] === Number(r.value); });
    if (moment === 'depart') {
      const complet = Object.keys(ici).length === total;
      const sugg = racine.querySelector<HTMLElement>('.suggestion');
      if (sugg) {
        sugg.hidden = !complet;
        if (complet) {
          const [a, b] = priorites(ici, total);
          sugg.querySelector('.prio-1')!.textContent = noms[a];
          sugg.querySelector('.prio-2')!.textContent = noms[b];
          sugg.querySelector<HTMLAnchorElement>('.prio-lien')!.href = urls[a];
        }
      }
    } else {
      const depart = notes.depart || {};
      racine.querySelectorAll<HTMLElement>('[data-ecart]').forEach((el) => {
        const i = el.dataset.ecart!;
        const d = depart[i];
        const f = ici[i];
        const dep = el.querySelector<HTMLElement>('.note-depart')!;
        dep.textContent = d == null ? '—' : String(d);
        const e = el.querySelector<HTMLElement>('.note-ecart')!;
        if (d == null || f == null) { e.textContent = ''; e.className = 'note-ecart'; return; }
        const x = f - d;
        e.textContent = x > 0 ? `+${x}` : x === 0 ? '=' : `−${-x}`;
        e.className = 'note-ecart' + (x > 0 ? ' note-ecart--plus' : '');
      });
    }
    document.dispatchEvent(new CustomEvent('es-notes'));
  };

  radios.forEach((r) => r.addEventListener('change', () => {
    const notes = lire<Notes>(cle);
    notes[moment] = { ...(notes[moment] || {}), [r.dataset.i!]: Number(r.value) };
    ecrire(cle, notes);
    maj();
  }));
  document.addEventListener('es-efface', maj);
  maj();
}

/** Fiche finale : pré-remplit chaque rubrique avec les réponses, champs libres enregistrés. */
export function initFiche(racine: HTMLElement) {
  const cle = racine.dataset.cle!;
  const cleNotes = racine.dataset.cleNotes;
  const fr = racine.dataset.lang === 'fr';
  const vide = racine.dataset.vide!;
  const calculs: Calcul[] = JSON.parse(racine.dataset.calculs || '[]');
  const noms: string[] = JSON.parse(racine.dataset.noms || '[]');
  const libres = [...racine.querySelectorAll<HTMLTextAreaElement>('textarea[name]')];

  const remplir = () => {
    const r = lire(cle);
    calculer(r, calculs, fr);
    racine.querySelectorAll<HTMLElement>('[data-champ]').forEach((el) => {
      const v = r[el.dataset.champ!];
      const t = Array.isArray(v) ? v.join(', ') : (v || '').trim();
      el.textContent = t || vide;
      el.classList.toggle('vide', !t);
    });
    // « Ma prochaine action » des étapes : toutes (Activité) ou seulement celles des étapes suivies (Compétences).
    let visibles = 0;
    racine.querySelectorAll<HTMLElement>('[data-action-etape]').forEach((el) => {
      const n = el.dataset.actionEtape!;
      const suivie = el.dataset.seulementSuivies == null || Object.keys(r).some((k) => k.startsWith(`s${n}_`));
      el.hidden = !suivie;
      if (suivie) visibles++;
    });
    racine.querySelectorAll<HTMLElement>('.actions-vide').forEach((el) => { el.hidden = visibles > 0; });
    libres.forEach((t) => {
      t.value = typeof r[t.name] === 'string' ? (r[t.name] as string) : '';
      const miroir = t.nextElementSibling as HTMLElement | null;
      if (miroir?.classList.contains('pour-impression')) miroir.textContent = t.value || vide;
    });
    if (cleNotes) {
      const notes = lire<Notes>(cleNotes);
      const d = notes.depart || {};
      const p = priorites(d, noms.length);
      racine.querySelectorAll<HTMLElement>('[data-priorites]').forEach((el) => {
        el.textContent = p.length === 2 ? p.map((i) => noms[i]).join(' · ') : vide;
        el.classList.toggle('vide', p.length < 2);
      });
      racine.querySelectorAll<HTMLElement>('[data-note]').forEach((el) => {
        const [m, i] = el.dataset.note!.split(':');
        const v = (notes as any)[m]?.[i];
        el.textContent = v == null ? '—' : `${v}/5`;
      });
    }
  };

  libres.forEach((t) => t.addEventListener('input', () => {
    const r = lire(cle);
    if (t.value.trim()) r[t.name] = t.value; else delete r[t.name];
    ecrire(cle, r);
    const miroir = t.nextElementSibling as HTMLElement | null;
    if (miroir?.classList.contains('pour-impression')) miroir.textContent = t.value || vide;
  }));
  document.addEventListener('es-notes', remplir);
  brancherEffacer(racine, () => { remplir(); document.dispatchEvent(new CustomEvent('es-efface')); });
  racine.querySelectorAll('.imprimer').forEach((b) => b.addEventListener('click', () => window.print()));
  const date = racine.querySelector<HTMLElement>('[data-date]');
  if (date) date.textContent = new Date().toLocaleDateString(fr ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  remplir();
}
