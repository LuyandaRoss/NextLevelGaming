alter table public.bookings
    add column if not exists preferred_date date,
    add column if not exists preferred_time time,
    add column if not exists special_request text not null default '',
    add column if not exists booking_ref text;

create unique index if not exists bookings_booking_ref_unique_idx
    on public.bookings (booking_ref)
    where booking_ref is not null;
