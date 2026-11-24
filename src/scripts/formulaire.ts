// Vérification et envoi des formulaires. Le serveur (public/api/envoyer.php) refait toutes les vérifications.

type Messages = { requis: string; email: string; fichier: string; echec: string; envoi: string; apercuEnvoi: string };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_FICHIER = 5 * 1024 * 1024;
const EXTENSIONS = /\.(pdf|docx?)$/i;

export function initFormulaire(form: HTMLFormElement) {
  const M: Messages = JSON.parse(form.dataset.messages!);
  const etat = form.dataset.etat;
  const racine = form.closest<HTMLElement>('.formulaire')!;
  const bouton = form.querySelector<HTMLButtonElement>('button[type=submit]')!;
  const echec = form.querySelector<HTMLElement>('.echec')!;
  const debut = form.querySelector<HTMLInputElement>('input[name=debut]')!;
  debut.value = String(Math.floor(Date.now() / 1000));

  // Compteurs de caractères
  form.querySelectorAll<HTMLElement>('.champ__compteur').forEach((c) => {
    const zone = c.parentElement!.querySelector('textarea')!;
    const max = Number(c.dataset.max);
    const maj = () => { c.querySelector('span')!.textContent = String(zone.value.length); c.classList.toggle('plein', zone.value.length >= max); };
    zone.addEventListener('input', maj);
    maj();
  });

  // Contact : renvoi vers le formulaire de partenariat pour les objets « organisation »
  const renvoi = form.querySelector<HTMLElement>('.renvoi');
  if (renvoi) {
    const objets: string[] = JSON.parse(renvoi.dataset.objets!);
    const select = form.querySelector<HTMLSelectElement>('select[name=objet]')!;
    const maj = () => { renvoi.hidden = !objets.includes(select.value); };
    select.addEventListener('change', maj);
    maj();
  }

  const montrer = (el: HTMLElement, cible: HTMLElement, msg: string) => {
    const p = document.getElementById(cible.getAttribute('aria-describedby')!.split(' ').pop()!) as HTMLElement;
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    p.hidden = !msg;
    p.textContent = msg;
  };

  const verifier = (el: HTMLElement): string => {
    if (el instanceof HTMLFieldSetElement) {
      const cochees = el.querySelectorAll('input:checked').length;
      return el.hasAttribute('data-requis') && !cochees ? M.requis : '';
    }
    const c = el as HTMLInputElement;
    if (c.type === 'checkbox') return c.hasAttribute('data-requis') && !c.checked ? M.requis : '';
    if (c.type === 'file') {
      const f = c.files?.[0];
      return f && (f.size > MAX_FICHIER || !EXTENSIONS.test(f.name)) ? M.fichier : '';
    }
    const v = c.value.trim();
    if (c.hasAttribute('data-requis') && !v) return M.requis;
    if (c.type === 'email' && v && !EMAIL.test(v)) return M.email;
    return '';
  };

  const elements = () => [
    ...form.querySelectorAll<HTMLElement>('input[id]:not([type=hidden]), select[id], textarea[id], fieldset.cases[id]'),
  ];
  const valider = (el: HTMLElement) => { const msg = verifier(el); montrer(el, el, msg); return !msg; };

  elements().forEach((el) => {
    const evt = el instanceof HTMLFieldSetElement || (el as HTMLInputElement).type === 'checkbox' || (el as HTMLInputElement).type === 'file' || el instanceof HTMLSelectElement ? 'change' : 'blur';
    el.addEventListener(evt, () => { if (evt === 'change' || el.getAttribute('aria-invalid') === 'true' || (el as HTMLInputElement).value) valider(el); });
    if (evt === 'blur') el.addEventListener('input', () => { if (el.getAttribute('aria-invalid') === 'true') valider(el); });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    echec.hidden = true;
    const invalides = elements().filter((el) => !valider(el));
    if (invalides.length) {
      const premier = invalides[0];
      (premier instanceof HTMLFieldSetElement ? premier.querySelector('input')! : premier).focus();
      return;
    }
    if (etat === 'apercu') { echec.hidden = false; echec.textContent = M.apercuEnvoi; return; }

    bouton.disabled = true;
    const texte = bouton.querySelector('span')!;
    const avant = texte.textContent;
    texte.textContent = M.envoi;
    try {
      const rep = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      const json = await rep.json().catch(() => ({}));
      if (!rep.ok || !json.ok) {
        // Le serveur peut signaler un champ précis (même message que dans le navigateur).
        if (json.champ) {
          const el = form.querySelector<HTMLElement>(`#${form.dataset.type}-${json.champ}`);
          if (el) { montrer(el, el, json.code === 'email' ? M.email : json.code === 'fichier' ? M.fichier : M.requis); el.focus(); return; }
        }
        throw new Error(json.code || String(rep.status));
      }
      form.hidden = true;
      const merci = racine.querySelector<HTMLElement>('.merci')!;
      merci.hidden = false;
      merci.focus();
    } catch {
      echec.hidden = false;
      echec.textContent = M.echec;
    } finally {
      bouton.disabled = false;
      texte.textContent = avant;
    }
  });
}
