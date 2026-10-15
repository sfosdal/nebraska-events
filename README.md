# nebraska.here.events → Omaha Events and Lincoln Events

Nebraska Events was one state-wide calendar (Omaha and Lincoln together) from
2026-10-12 to 2026-10-15. It split into two city sites:

- **Omaha Events** — https://omaha.here.events/ (repo `sfosdal/omaha-events`)
- **Lincoln Events** — https://lincoln.here.events/ (repo `sfosdal/lincoln-events`)

This repo now only keeps the old host alive: `index.html` (and `404.html`, the
same page) is a chooser that sends a Teams link (`?team=…`) straight to the
city that club plays in and offers everyone else the two sites. Share codes
and calendar subscriptions made against the old host are not carried — they
were bitmasks over a registry the new sites don't share — so readers make them
again on the city site. The `archive` branch holds the record of every event
the state-wide site published, for the history.

`.github/workflows/events.yml` now publishes the two files to GitHub Pages on
push; nothing is built and nothing runs on a schedule. The retired build
(`scripts/`, `site/`, the venue and team tables in `site/city.js`) is kept in
the tree as the record of how the state-wide site worked; it is not published.
