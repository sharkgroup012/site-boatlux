-- Placar de cotas "Dono do Verão".
-- Sem dados pessoais. Leitura e escrita somente pelo servidor (service role).
-- Rodar uma vez no SQL Editor do Supabase.

create table if not exists public.placar_grupos (
  id            uuid primary key default gen_random_uuid(),
  regiao        text not null
                check (regiao in ('São Sebastião', 'Ubatuba', 'Barra do Una', 'Boiçucanga', 'Ilhabela')),
  moto_modelo   text not null check (char_length(btrim(moto_modelo)) between 2 and 60),
  moto_ano      integer not null check (moto_ano between 2020 and 2035),
  tamanho       integer not null check (tamanho in (8, 6)),
  cotas_vendidas integer not null default 0,
  situacao      text not null default 'aberto'
                check (situacao in ('aberto', 'em_destaque', 'fechado')),
  display_order integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  constraint placar_grupos_vendidas_check
    check (cotas_vendidas >= 0 and cotas_vendidas <= tamanho)
);

create or replace function public.placar_set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists placar_grupos_set_updated_at on public.placar_grupos;
create trigger placar_grupos_set_updated_at
  before insert or update on public.placar_grupos
  for each row execute function public.placar_set_updated_at();

-- RLS fechada: sem nenhuma policy, anon e authenticated não leem nem escrevem.
alter table public.placar_grupos enable row level security;
revoke all on public.placar_grupos from anon, authenticated;
