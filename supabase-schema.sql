-- ============================================================
-- مخطط قاعدة البيانات للصدارة التاريخية (Culture Quiz)
-- نفّذ هذا الملف في Supabase: SQL Editor > New query > Run
-- ============================================================

-- جدول الصدارة: نقاط تراكمية لكل متسابق في كل قناة
create table if not exists public.leaderboard (
  channel       text        not null,
  username      text        not null,            -- مفتاح بأحرف صغيرة
  display_name  text        not null,            -- الاسم كما يظهر
  total_points  integer     not null default 0,
  last_seen     timestamptz not null default now(),
  primary key (channel, username)
);

-- فهرس لترتيب أسرع حسب النقاط
create index if not exists leaderboard_channel_points_idx
  on public.leaderboard (channel, total_points desc);

-- تفعيل RLS بلا policies: يمنع المفتاح العام تمامًا،
-- والمفتاح السرّي (الخادم) يتجاوز RLS فيشتغل عادي.
alter table public.leaderboard enable row level security;

-- دالة إضافة نقاط بشكل ذرّي (atomic increment + upsert)
create or replace function public.add_points(
  p_channel  text,
  p_username text,
  p_display  text,
  p_points   integer
) returns void
language plpgsql
security definer
as $$
begin
  insert into public.leaderboard (channel, username, display_name, total_points, last_seen)
  values (lower(p_channel), lower(p_username), p_display, p_points, now())
  on conflict (channel, username) do update
    set total_points = public.leaderboard.total_points + excluded.total_points,
        display_name = excluded.display_name,
        last_seen    = now();
end;
$$;

-- ملاحظة أمنية: نستعمل service_role key من الخادم فقط، فلا حاجة لسياسات RLS عامة.
-- (الـ service key يتجاوز RLS؛ لا تكشفه أبدًا في الواجهة.)
