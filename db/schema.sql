-- Base Neon des formulaires de entrepreneuriat.sn (lot 5).
-- À exécuter une fois dans la console Neon (SQL Editor) sur la base choisie.
-- Une ligne par demande ; toutes les réponses sont aussi dans « donnees » (JSON).

create table if not exists demandes (
  id           bigint generated always as identity primary key,
  recu_le      timestamptz not null default now(),
  formulaire   text not null check (formulaire in ('contact', 'partenariat')),
  langue       text not null check (langue in ('fr', 'en')),
  nom          text not null,
  email        text not null,
  organisation text,
  donnees      jsonb not null,
  document     text,                       -- nom du fichier conservé sur LWS (api/_stock/documents/)
  traite       boolean not null default false
);

create index if not exists demandes_recu_le on demandes (recu_le desc);

-- Durée de conservation annoncée dans la politique de confidentialité : à appliquer régulièrement, par exemple
-- delete from demandes where recu_le < now() - interval '3 years';
