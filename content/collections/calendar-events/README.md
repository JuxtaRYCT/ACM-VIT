# Calendar events - conventions

The compiler only reads `*.json` here, so this file is inert documentation.
Entries are reconstructed from chapter records (WhatsApp formal-group transcripts,
event pages, project history). Follow these rules so successive board years stay
coherent and so two overlapping group transcripts cannot produce duplicates.

## Slug / filename

`<YYYY-MM-DD>-<kebab-name>.json`, and `slug` and `id` both equal the filename.

The date prefix is load-bearing:

- files sort chronologically in the repo and in the CMS,
- the same happening described in two different group transcripts collapses onto
  one slug instead of two near-duplicate entries,
- recurring names (`full-core-meet`, `senior-core-meet`) never collide across years.

Before adding an entry from a new transcript, check whether a file already exists
for that date and thing. If it does, enrich the existing entry - do not add a second.

## `order`

`YYYYMMDD * 10000 + HHMM` (e.g. `2024-03-18` at `09:30` -> `202403180930`).
Keeps the compiled array chronological and stays stable when entries are inserted.

## `category`

Category is **what kind of thing it was**, not the domain that ran it. Colour and
cassette art follow from it - see `CATEGORY_COLORS` in `src/data/calendarEventsData.ts`.

| category   | use for                                                              |
| ---------- | -------------------------------------------------------------------- |
| `event`    | hackathons, contests, expos, fest presence, ideathons - things ACM ran |
| `ctf`      | CTFs z0d1ak competed in; one entry per participation, kept separate so the ~80 of them can be filtered off |
| `workshop` | hands-on teaching sessions run by the chapter                         |
| `session`  | speaker sessions, industry / alum talks, Q&As                         |
| `meeting`  | full core, senior core, junior core, board and project meets          |
| `social`   | meetups, get-togethers, send-offs, icebreakers, merch handouts        |
| `launch`   | a project going live                                                  |
| `blog`     | reserved - injected at runtime from `/api/blog-dates`, never authored |

## Never publish: selection of the next batch

**Nothing about board forms or recruitment for the next batch goes on this
calendar - not as an entry, not as a line in someone else's description.**

That covers board and ACM-W application forms, opening announcements and
deadlines, the meets where positions are explained, junior core applications,
interview rounds and slots, task deadlines, results and induction dates.

The schema enforces it: `calendarCategory` has no `recruitment` value, so an
entry of this kind has nowhere to live and the compiler rejects it. When a
transcript is full of this material - and every board year's is - skip it and
carry on with the rest.

Chapter milestones that are *not* selection are still fine: a board being
announced, an outgoing board signing off, a handover meet.

## Titles

- Recurring events: `<Name> <year>` (`Reverse Coding 2024`) or the edition number
  when the chapter uses one (`Code2Create 7.0`, `Cryptic Hunt 3.0`).
- Multi-day: `<Name> <year> - Day N`.
- Meetings: `<Body> Meet - <Agenda>` (`Full Core Meet - Quanta`).
- Fest presence: `<Fest> <year> - ACM-VIT <what>` (`Quanta 2023 - ACM-VIT Stall`).
- Recruitment: `<Track> <year> - <Stage>` (`Board Applications 2024 - Deadline`).
- Launches: `<Project> Launch`.

## Times

Use the real time when the source states one. When it does not, use `00:00`-`23:59`
so the entry reads as all-day rather than inventing a slot.

## `href`

Link the entry to the matching page on this site whenever one exists:
`/events/<slug>`, `/projects/<slug>`, `/merchandise/<year>`, `/z0d1ak`, `/grep`.
Leave it out for happenings with no page rather than pointing at a near-miss.

The CTA label is derived from the href by `eventLink()` in
`src/data/calendarEventsData.ts` - never hardcoded. An off-site `https://` href
opens in a new tab and renders a note under the button naming the host, so the
reader knows they are leaving the site.

## CTF entries

Reconstructed from the team's CTFtime page (team 373452) for placements, joined
against the CTFtime event API for each event's start, finish and format, with
times converted to IST. CTFtime's `participants` count is registrations rather
than teams that scored, so it is deliberately not written as "out of N teams".
