# Nebraska Events

Event feed and calendar for Omaha and Lincoln: the CHI Health Center, Baxter
Arena, the Orpheum and the Holland Center, Steelhouse Omaha, the Astro, Liberty
First Credit Union Arena, Slowdown and the Waiting Room; Memorial Stadium,
Pinnacle Bank Arena, the Bob Devaney Sports Center, the Lied Center, the
Bourbon Theatre, the Royal Grove and the Ice Box — with the home teams' seasons
(Husker football, basketball and volleyball, Creighton, Omaha hockey, the Storm
Chasers, the Lincoln Stars, the Omaha Lancers, Union Omaha) in a Teams view.

Live at **https://nebraska.here.events/** once the domain is wired (GitHub
Pages, built by the Actions workflow once a day at noon Central).

A state-wide site on the lqa-events codebase, after Everett, Chicago, the
2026-10-11 batch and Las Vegas: the two cities are the filter panel's two
groups, the way a neighbourhood and the rest of town are elsewhere. Everything
that makes this Nebraska's is `site/city.js` (every team, venue, type, default,
share-code registry and string), `site/index.html`, `scripts/fetch-events.mjs`
(the sources), `site/embed.js`, `outlook.json`, `scripts/data/postseason.json`,
`channels.json`, the manifest and icons (a scarlet N over a cornfield, rendered
from `favicon.svg`). Everything else is lqa-events' own, byte for byte — copy
from there, never edit here.

## Embed

```html
<div id="nebraska-events"></div>
<script src="https://nebraska.here.events/embed.js" data-max="8" defer></script>
```

## Sources

- **Ticketmaster Discovery API** — every room by its venue id (every page,
  one call a second): 16 rooms, from Memorial Stadium to the 400-seat Waiting
  Room. There is no city sweep — the API files the two metros with every Iowa
  and Kansas room in the same market. Season bundles, all-session passes,
  parking, suites and the pre-show happy hours are dropped per room
  (`tm.exclude`). Church events are left out (`isChurch`).
- **Seasons** — ESPN for Husker football, men's basketball and volleyball,
  Creighton, Omaha hockey (NCHC) and Union Omaha (USL League One); MLB's stats
  API for the Storm Chasers (Triple-A, sportId 11); the USHL's HockeyTech feed
  for the Stars and the Lancers (`scripts/schedules.mjs`, shared with lqa).
  Husker football and volleyball, Creighton, the Storm Chasers and Union Omaha
  have no complete ticket feed here, so their home dates are injected from the
  league schedules (city.js `inject`); Werner Park and Morrison Stadium exist
  only as those injected grounds.

Next to add: the rooms whose shows Ticketmaster never lists (the Admiral,
Reverb Lounge, the Zoo Bar, the Rococo, the Omaha Symphony's own dates), the
College World Series at Charles Schwab Field, Husker baseball at Haymarket
Park, and the Omaha Supernovas (Pro Volleyball Federation, no public schedule
feed yet).

## Local run

```sh
cp .env.example .env   # TICKETMASTER_API_KEY=…
ALLOW_NO_ARCHIVE=1 node scripts/fetch-events.mjs   # ALLOW_NO_ARCHIVE only until the site has published once
node --test scripts/*.test.mjs
```
