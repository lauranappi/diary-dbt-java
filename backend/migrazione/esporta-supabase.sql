-- Esportazione dei dati di Marea da Supabase.
-- 1. Apri Supabase -> SQL Editor, incolla ed esegui questa query.
-- 2. Nel risultato (una sola cella "esportazione") scegli "Copy" / "Download as JSON"
--    e salva il contenuto della cella in un file, es. esportazione.json.
--    (Se scarichi un file con una riga {"esportazione": {...}} va bene: viene letto anche cosi'.)
-- Il file contiene gli hash delle password: tienilo privato e cancellalo a fine migrazione.

select json_build_object(
  'utenti', (select coalesce(json_agg(json_build_object(
      'id', u.id, 'email', u.email, 'hash', u.encrypted_password)), '[]'::json) from auth.users u),
  'diario', (select coalesce(json_agg(json_build_object(
      'code', d.code, 'user_id', d.user_id, 'data', d.data)), '[]'::json) from public.diary_data d),
  'guida',  (select coalesce(json_agg(json_build_object(
      'user_id', g.user_id, 'data', g.data)), '[]'::json) from public.guida_personale g)
) as esportazione;
