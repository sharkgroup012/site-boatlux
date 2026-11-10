-- Configurações simples do site (chave/valor). Hoje: tema da página /cotas.
-- Leitura e escrita somente pelo servidor (service role).
-- Rodar uma vez no SQL Editor do Supabase.

create table if not exists public.site_config (
  chave       text primary key,
  valor       text not null,
  updated_at  timestamptz not null default now()
);

alter table public.site_config enable row level security;
revoke all on public.site_config from anon, authenticated;

insert into public.site_config (chave, valor)
values ('cotas_tema', 'padrao')
on conflict (chave) do nothing;
