// The city — every fact that makes this calendar Nebraska's rather than
// another town's, in one place (2026-10-12: the seventeenth site on
// lqa-events, after Everett, Chicago, the 2026-10-11 batch and Las Vegas).
// A STATE-wide site: Omaha and Lincoln are the panel's two groups, the way
// the Strip and the rooms beyond it are Las Vegas's. The browser (filter.js,
// app.js) and the build (scripts/*.mjs) both read it; nothing else names a
// venue or a team. The shared files (app.js, filter.js, styles.css bar its
// --v-* hues, scripts/*.mjs bar fetch-events.mjs and sources.mjs) are
// lqa-events' own, byte for byte — see README "Sister sites".
//
// Loaded before filter.js (a plain script, so the tests can share it): it
// sets globalThis.LQACity (the name is the shared code's, not the city's).
(function (global) {
  'use strict';

  // The home teams, matched on the event title whatever the venue. Order =
  // the Teams strip, left to right; the first match wins (app.js teamFor),
  // so the Stars' anchored pattern steps aside for a Lancers home title and
  // Husker football never claims a basketball or volleyball night.
  // Per team:
  //   re        the title match (Ticketmaster's titles — "Nebraska
  //             Cornhuskers Football vs. …", "Omaha Hockey vs …", "Lincoln
  //             Stars vs. …" — and the injected ones, "<inject.name> vs …")
  //   venue     the home building; schedule = the club's own schedule page
  //   sport     keys the strip icon (app.js SPORT_ICONS), the game clock,
  //             the leader categories. Volleyball has no icon in the shared
  //             table yet (the strip shows the crest alone)
  //   colors    [primary, accent] — the season calendar's home cells and
  //             card frames
  //   espn      ESPN's sport/league/team id — the three Husker programs,
  //             Creighton, Omaha's hockey and Union Omaha (USL League One)
  //             are on ESPN (season, form, news); the Storm Chasers' season
  //             comes from MLB's stats API (Triple-A is on it, sportId 11)
  //             and the Stars' and Lancers' from the USHL's HockeyTech feed
  //   inject    a club whose home dates no ticket feed lists in full: the
  //             league's schedule puts them on the calendar under this
  //             ticket link (name = the injected title's first half)
  //   club      the club's name on Ticketmaster; news the outlets' feeds;
  //             wiki the article (teamPage: college seasons are titled
  //             "2026 Nebraska Cornhuskers football team"); opens when the
  //             season usually starts
  var USHL = { league: 'ushl', key: 'e828f89b243dc43f' }; // HockeyTech's USHL feed (client_code ushl), as Green Bay's Gamblers read it
  var TEAMS = [
    // Nebraska Cornhuskers football, Big Ten, Memorial Stadium in Lincoln.
    // Ticketmaster carries only the marquee Saturdays (two of seven this
    // season), so the rest of the home slate is injected from ESPN
    { slug: 'huskers', label: 'Huskers', name: 'Nebraska Cornhuskers', abbr: 'NEB', re: /nebraska (cornhuskers )?football|husker football/i, sport: 'football', venue: 'Memorial Stadium', colors: ['#e31937', '#ffffff'],
      espn: { sport: 'football', league: 'college-football', id: '158' }, season: { kind: 'espn' }, form: { kind: 'espn' },
      inject: { name: 'Nebraska Football', url: 'https://huskers.com/sports/football/tickets' },
      logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/158.png', schedule: 'https://huskers.com/sports/football/schedule',
      club: 'Nebraska Cornhuskers Football', opens: 'late August', wiki: { title: 'Nebraska Cornhuskers football', teamPage: true },
      news: [['https://huskers.com/rss?path=football', 'Huskers.com']] },
    // Nebraska men's basketball, Big Ten, Pinnacle Bank Arena — Ticketmaster lists the home games
    { slug: 'huskersbasketball', label: 'Huskers Basketball', name: 'Nebraska Cornhuskers', abbr: 'NEB', re: /nebraska (cornhuskers )?men'?s basketball/i, sport: 'basketball', venue: 'Pinnacle Bank Arena', colors: ['#e31937', '#000000'],
      espn: { sport: 'basketball', league: 'mens-college-basketball', id: '158' }, season: { kind: 'espn' }, form: { kind: 'espn' },
      logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/158.png', schedule: 'https://huskers.com/sports/mens-basketball/schedule',
      club: "Nebraska Cornhuskers Men's Basketball", opens: 'early November', wiki: { title: "Nebraska Cornhuskers men's basketball", teamPage: true } },
    // Nebraska volleyball, Big Ten, the Bob Devaney Sports Center — the
    // best-attended women's program in the country; Ticketmaster lists the
    // Big Ten weekends, ESPN's schedule fills the rest
    { slug: 'huskersvolleyball', label: 'Huskers Volleyball', name: 'Nebraska Cornhuskers', abbr: 'NEB', re: /nebraska (cornhuskers )?(women'?s )?volleyball|husker volleyball/i, sport: 'volleyball', venue: 'Bob Devaney Sports Center', colors: ['#e31937', '#ffffff'],
      espn: { sport: 'volleyball', league: 'womens-college-volleyball', id: '158' }, season: { kind: 'espn' }, form: { kind: 'espn' },
      inject: { name: 'Nebraska Volleyball', url: 'https://huskers.com/sports/womens-volleyball/tickets' },
      logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/158.png', schedule: 'https://huskers.com/sports/womens-volleyball/schedule',
      club: "Nebraska Cornhuskers Women's Volleyball", opens: 'late August', wiki: { title: "Nebraska Cornhuskers women's volleyball", teamPage: true } },
    // Creighton Bluejays men's basketball, Big East, CHI Health Center Omaha.
    // The arena's Ticketmaster listing carries none of the home games (the
    // school sells them itself), so the schedule is injected
    { slug: 'bluejays', label: 'Bluejays', name: 'Creighton Bluejays', abbr: 'CREI', re: /creighton(?!.*women)/i, sport: 'basketball', venue: 'CHI Health Center Omaha', colors: ['#005ca9', '#6cadde'],
      espn: { sport: 'basketball', league: 'mens-college-basketball', id: '156' }, season: { kind: 'espn' }, form: { kind: 'espn' },
      inject: { name: 'Creighton Bluejays', url: 'https://gocreighton.com/sports/mens-basketball/tickets' },
      logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/156.png', schedule: 'https://gocreighton.com/sports/mens-basketball/schedule',
      club: 'Creighton Bluejays Basketball', opens: 'early November', wiki: { title: "Creighton Bluejays men's basketball", teamPage: true } },
    // Omaha Mavericks hockey, NCHC, Baxter Arena — Ticketmaster lists the home games ("Omaha Hockey vs …")
    { slug: 'mavericks', label: 'Mavericks', name: 'Omaha Mavericks', abbr: 'OMA', re: /omaha (mavericks )?hockey|mavericks hockey/i, sport: 'hockey', venue: 'Baxter Arena', colors: ['#d71920', '#000000'],
      espn: { sport: 'hockey', league: 'mens-college-hockey', id: '2437' }, season: { kind: 'espn' }, form: { kind: 'espn' },
      logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2437.png', schedule: 'https://omavs.com/sports/mens-ice-hockey/schedule',
      club: 'Omaha Mavericks Hockey', opens: 'early October', wiki: { title: 'Omaha Mavericks men\'s ice hockey', teamPage: true } },
    // Omaha Storm Chasers, Triple-A International League (Royals affiliate),
    // Werner Park in Papillion — no ticket feed lists the home stands, so
    // the league's schedule supplies them (the Aviators pattern)
    { slug: 'stormchasers', label: 'Storm Chasers', name: 'Omaha Storm Chasers', abbr: 'OMA', re: /storm chasers/i, sport: 'baseball', venue: 'Werner Park', colors: ['#1c2b5a', '#8ab7e0'],
      season: { kind: 'mlb', id: 541, sportId: 11 }, form: { kind: 'milb', id: 541, league: 117, leagueName: 'International League' },
      inject: { url: 'https://www.milb.com/omaha/tickets' },
      logo: 'https://www.mlbstatic.com/team-logos/541.svg', schedule: 'https://www.milb.com/omaha/schedule',
      club: 'Omaha Storm Chasers', opens: 'late March', wiki: { title: 'Omaha Storm Chasers', club: true },
      news: [['https://www.milb.com/omaha/feeds/news/rss.xml', 'MiLB.com']] },
    // Lincoln Stars, USHL, the Ice Box — Ticketmaster lists the home games.
    // Anchored at the title's start: "Omaha Lancers vs. Lincoln Stars" is a
    // Lancers night, not a Stars one
    { slug: 'stars', label: 'Stars', name: 'Lincoln Stars', abbr: 'LIN', re: /^lincoln stars/i, sport: 'hockey', venue: 'The Ice Box', colors: ['#0a2240', '#c8102e'],
      season: { kind: 'hockeytech', league: USHL.league, key: USHL.key, id: 16, leagueName: 'USHL' }, form: { kind: 'hockeytech', league: USHL.league, key: USHL.key, id: 16 },
      logo: 'https://assets.leaguestat.com/ushl/logos/16.png', schedule: 'https://lincolnstars.com/schedule',
      club: 'Lincoln Stars', opens: 'late September', wiki: { title: 'Lincoln Stars' } },
    // Omaha Lancers, USHL, Liberty First Credit Union Arena in Ralston — Ticketmaster lists the home games
    { slug: 'lancers', label: 'Lancers', name: 'Omaha Lancers', abbr: 'OMA', re: /^omaha lancers/i, sport: 'hockey', venue: 'Liberty First Credit Union Arena', colors: ['#c8102e', '#041e42'],
      season: { kind: 'hockeytech', league: USHL.league, key: USHL.key, id: 19, leagueName: 'USHL' }, form: { kind: 'hockeytech', league: USHL.league, key: USHL.key, id: 19 },
      logo: 'https://assets.leaguestat.com/ushl/logos/19.png', schedule: 'https://lancers.com/schedule',
      club: 'Omaha Lancers', opens: 'late September', wiki: { title: 'Omaha Lancers' } },
    // Union Omaha, USL League One, Morrison Stadium on Creighton's campus —
    // no ticket feed lists the matches, so the schedule is injected
    { slug: 'unionomaha', label: 'Union Omaha', name: 'Union Omaha', abbr: 'OMA', re: /union omaha/i, sport: 'soccer', venue: 'Morrison Stadium', colors: ['#000000', '#c4d600'],
      espn: { sport: 'soccer', league: 'usa.usl.l1', id: '20684' }, season: { kind: 'espn' }, form: { kind: 'espn' },
      inject: { url: 'https://www.unionomaha.com/tickets' },
      logo: 'https://a.espncdn.com/i/teamlogos/soccer/500/20684.png', schedule: 'https://www.unionomaha.com/schedule',
      club: 'Union Omaha', opens: 'March', wiki: { title: 'Union Omaha' } },
  ];

  // The venues, one record each — Omaha's arena, campus rinks, halls and
  // clubs first by size, then Lincoln's. Per venue:
  //   capacity how many people the place holds
  //   area     'town' for Lincoln (the panel's second group); absent = Omaha
  //            (the metro: Omaha, La Vista, Ralston, Papillion)
  //   type     the event type when the title decides nothing
  //   cssVar   the hue styles.css sets for it (dark block --v-*); color
  //            the same hue as a value, for the series graph
  //   url      the venue's own events listing — not a ticket vendor
  //   icon     a mark for listings without a team crest
  //   tm       its Ticketmaster Discovery listing (fetch-events.mjs reads
  //            the venue by id — every page). No city sweep: the two metros
  //            would mix with every Iowa and Kansas room the API files under
  //            the same market. exclude drops the season bundles and the
  //            all-session passes the arenas list beside their events,
  //            parking, suites, tours and the pre-show happy hours
  //   alias    the other spellings the feeds use for it, folded to this name
  // Werner Park and Morrison Stadium have nothing on Ticketmaster; they are
  // here as the Storm Chasers' and Union Omaha's injected grounds.
  // No festivals yet, so the panel's Festivals group folds away (app.js).
  var VENUES = {
    // --- Omaha: the downtown arena, the campus rinks and halls, the clubs ---
    'CHI Health Center Omaha': {
      capacity: 18000,
      type: 'sports',
      cssVar: '--v-chi',
      color: '#ea8686',
      url: 'https://www.chihealthcenteromaha.com/events',
      icon: 'https://www.google.com/s2/favicons?domain=www.chihealthcenteromaha.com&sz=128',
      tm: { id: 'KovZpakWUe', match: 'chi health', fallbackUrl: 'https://www.chihealthcenteromaha.com/events', exclude: /full season|all[- ]session|season tickets?|parking|suite|\btours?\b/i },
      alias: /chi health center|centurylink center omaha|qwest center/i,
    },
    'Baxter Arena': {
      capacity: 7898,
      type: 'sports',
      cssVar: '--v-baxter',
      color: '#86eaa3',
      url: 'https://www.baxterarena.com/events',
      icon: 'https://www.google.com/s2/favicons?domain=www.baxterarena.com&sz=128',
      tm: { id: 'KovZpZAE7edA', match: 'baxter', fallbackUrl: 'https://www.baxterarena.com/events', exclude: /season tickets?|parking|suite/i },
      alias: /baxter arena/i,
    },
    'Orpheum Theater': {
      capacity: 2600,
      type: 'arts',
      cssVar: '--v-orpheum',
      color: '#c086ea',
      url: 'https://o-pa.org/events',
      icon: 'https://www.google.com/s2/favicons?domain=o-pa.org&sz=128',
      tm: { id: 'KovZpZAdlAkA', match: 'orpheum', fallbackUrl: 'https://o-pa.org/events', exclude: /parking|\btours?\b|season (tickets?|package)/i },
      alias: /orpheum theat(er|re)/i,
    },
    'Holland Performing Arts Center': {
      capacity: 2000,
      type: 'arts',
      cssVar: '--v-holland',
      color: '#eadd86',
      url: 'https://o-pa.org/events',
      icon: 'https://www.google.com/s2/favicons?domain=o-pa.org&sz=128',
      tm: { id: 'KovZpZAaatEA', match: 'holland', fallbackUrl: 'https://o-pa.org/events', exclude: /parking|\btours?\b|season (tickets?|package)/i },
      alias: /holland (performing arts )?center|kiewit concert hall/i,
    },
    'Steelhouse Omaha': {
      capacity: 3000,
      type: 'concert',
      cssVar: '--v-steelhouse',
      color: '#86d9ea',
      url: 'https://www.steelhouseomaha.com/events',
      icon: 'https://www.google.com/s2/favicons?domain=www.steelhouseomaha.com&sz=128',
      tm: { id: 'KovZ917At_0', match: 'steelhouse', fallbackUrl: 'https://www.steelhouseomaha.com/events', exclude: /pre-show happy hour|not a (concert )?ticket|parking/i },
      alias: /steelhouse/i,
    },
    'The Astro Theater': {
      capacity: 2500,
      type: 'concert',
      cssVar: '--v-astro',
      color: '#ea86bc',
      url: 'https://www.astrotheater.com/events',
      icon: 'https://www.google.com/s2/favicons?domain=www.astrotheater.com&sz=128',
      tm: { id: 'KovZ917AiUn', match: 'astro', fallbackUrl: 'https://www.astrotheater.com/events', exclude: /parking|vip (upgrade|package)/i },
      alias: /astro theat(er|re)|^the astro\b/i,
    },
    'Liberty First Credit Union Arena': {
      capacity: 3500,
      type: 'sports',
      cssVar: '--v-libertyfirst',
      color: '#9fea86',
      url: 'https://www.libertyfirstcuarena.com/events',
      icon: 'https://www.google.com/s2/favicons?domain=www.libertyfirstcuarena.com&sz=128',
      tm: { id: 'KovZ917Am5n', match: 'liberty first', fallbackUrl: 'https://www.libertyfirstcuarena.com/events', exclude: /season tickets?|flex pack|parking|suite/i },
      alias: /liberty first (credit union )?arena|ralston arena/i,
    },
    'Slowdown': {
      capacity: 800,
      type: 'concert',
      cssVar: '--v-slowdown',
      color: '#8a86ea',
      url: 'https://theslowdown.com/events',
      icon: 'https://www.google.com/s2/favicons?domain=theslowdown.com&sz=128',
      tm: { id: 'KovZpZAJEvlA', match: 'slowdown', fallbackUrl: 'https://theslowdown.com/events', exclude: /parking/i },
      alias: /^(the )?slowdown\b/i,
    },
    'The Waiting Room': {
      capacity: 400,
      type: 'concert',
      cssVar: '--v-waitingroom',
      color: '#eaa786',
      url: 'https://waitingroomlounge.com/events',
      icon: 'https://www.google.com/s2/favicons?domain=waitingroomlounge.com&sz=128',
      tm: { id: 'KovZpZA1Ie1A', match: 'waiting room', fallbackUrl: 'https://waitingroomlounge.com/events', exclude: /parking/i },
      alias: /waiting room( lounge)?/i,
    },
    'Werner Park': { // the Storm Chasers' ballpark in Papillion; nothing on Ticketmaster, the league schedule is injected
      capacity: 9023,
      type: 'sports',
      cssVar: '--v-werner',
      color: '#86eac4',
      url: 'https://www.milb.com/omaha/schedule',
      icon: 'https://www.google.com/s2/favicons?domain=www.milb.com&sz=128',
      alias: /werner park/i,
    },
    'Morrison Stadium': { // Union Omaha's ground on Creighton's campus; nothing on Ticketmaster, the league schedule is injected
      capacity: 6000,
      type: 'sports',
      cssVar: '--v-morrison',
      color: '#e186ea',
      url: 'https://www.unionomaha.com/schedule',
      icon: 'https://www.google.com/s2/favicons?domain=www.unionomaha.com&sz=128',
      alias: /morrison stadium/i,
    },
    // --- Lincoln: the Huskers' stadium, arena and volleyball hall, the Lied Center, the Haymarket clubs, the Stars' rink ---
    'Memorial Stadium': {
      area: 'town',
      capacity: 85458,
      type: 'sports',
      cssVar: '--v-memorial',
      color: '#d5ea86',
      url: 'https://huskers.com/sports/football/schedule',
      icon: 'https://www.google.com/s2/favicons?domain=huskers.com&sz=128',
      tm: { id: 'KovZpZA1FnJA', match: 'memorial stadium', fallbackUrl: 'https://huskers.com/sports/football/schedule', exclude: /parking|tailgate|suite|\btours?\b|season tickets?/i },
      alias: /memorial stadium/i,
    },
    'Pinnacle Bank Arena': {
      area: 'town',
      capacity: 15500,
      type: 'sports',
      cssVar: '--v-pinnacle',
      color: '#86b7ea',
      url: 'https://www.pinnaclebankarena.com/events',
      icon: 'https://www.google.com/s2/favicons?domain=www.pinnaclebankarena.com&sz=128',
      tm: { id: 'KovZpZAJdEIA', match: 'pinnacle', fallbackUrl: 'https://www.pinnaclebankarena.com/events', exclude: /season tickets?|parking|suite|\btours?\b/i },
      alias: /pinnacle bank arena/i,
    },
    'Bob Devaney Sports Center': {
      area: 'town',
      capacity: 7907,
      type: 'sports',
      cssVar: '--v-devaney',
      color: '#ea869a',
      url: 'https://huskers.com/sports/womens-volleyball/schedule',
      icon: 'https://www.google.com/s2/favicons?domain=huskers.com&sz=128',
      tm: { id: 'KovZpapy7e', match: 'devaney', fallbackUrl: 'https://huskers.com/sports/womens-volleyball/schedule', exclude: /season tickets?|parking|suite/i },
      alias: /devaney/i,
    },
    'Lied Center for Performing Arts': {
      area: 'town',
      capacity: 2200,
      type: 'arts',
      cssVar: '--v-lied',
      color: '#86ea8e',
      url: 'https://www.liedcenter.org/events',
      icon: 'https://www.google.com/s2/favicons?domain=www.liedcenter.org&sz=128',
      tm: { id: 'KovZpZA1FtnA', match: 'lied', fallbackUrl: 'https://www.liedcenter.org/events', exclude: /parking|season (tickets?|package)/i },
      alias: /lied center/i,
    },
    'Bourbon Theatre': {
      area: 'town',
      capacity: 1300,
      type: 'concert',
      cssVar: '--v-bourbon',
      color: '#ab86ea',
      url: 'https://www.bourbontheatre.com/events',
      icon: 'https://www.google.com/s2/favicons?domain=www.bourbontheatre.com&sz=128',
      tm: { id: 'KovZpZAEdaJA', match: 'bourbon', fallbackUrl: 'https://www.bourbontheatre.com/events', exclude: /parking/i },
      alias: /bourbon theat(er|re)/i,
    },
    'Royal Grove': {
      area: 'town',
      capacity: 1000,
      type: 'concert',
      cssVar: '--v-royalgrove',
      color: '#eac886',
      url: 'https://www.royalgrovelincoln.com/events',
      icon: 'https://www.google.com/s2/favicons?domain=www.royalgrovelincoln.com&sz=128',
      tm: { id: 'KovZpZA1Iv7A', match: 'royal grove', fallbackUrl: 'https://www.royalgrovelincoln.com/events', exclude: /parking/i },
      alias: /royal grove/i,
    },
    'The Ice Box': {
      area: 'town',
      capacity: 4500,
      type: 'sports',
      cssVar: '--v-icebox',
      color: '#86eae6',
      url: 'https://lincolnstars.com/schedule',
      icon: 'https://www.google.com/s2/favicons?domain=lincolnstars.com&sz=128',
      tm: { id: 'Z7r9jZa7ZX', match: 'ice box', fallbackUrl: 'https://lincolnstars.com/schedule', exclude: /season tickets?|flex pack|parking|suite/i },
      alias: /ice box/i,
    },
  };

  // The usual view: every room on — nothing here lists nightly bar programs
  var DEFAULT_ON = ['CHI Health Center Omaha', 'Baxter Arena', 'Orpheum Theater', 'Holland Performing Arts Center', 'Steelhouse Omaha', 'The Astro Theater', 'Liberty First Credit Union Arena', 'Slowdown', 'The Waiting Room', 'Werner Park', 'Morrison Stadium', 'Memorial Stadium', 'Pinnacle Bank Arena', 'Bob Devaney Sports Center', 'Lied Center for Performing Arts', 'Bourbon Theatre', 'Royal Grove', 'The Ice Box'];
  var DEFAULT_OFF = [];
  var PREFS_KNOWN_FROM = null; // no default-off venue yet, so nothing for saved prefs to be told about

  // Event types: every event lands in exactly one, from its flags, title,
  // then venue. The rows the panel shows, in order.
  var TYPES = [
    { key: 'concert', label: 'Concerts', title: 'Live music — the arena tours, Steelhouse and the Astro, the Haymarket and Benson clubs' },
    { key: 'sports', label: 'Sports', title: 'Husker football, basketball and volleyball, Creighton, Omaha hockey, the Storm Chasers, the Stars and Lancers, Union Omaha, rodeo and monster trucks' },
    { key: 'arts', label: 'Arts & Theater', title: 'Omaha Performing Arts and the Lied Center — Broadway tours, comedy, dance, the symphony' },
    { key: 'community', label: 'Community', title: 'Festivals, expos, family days' },
  ];
  var MOVIE_VENUE = null; // no cinema here

  // Share codes (?f=CODE): REGISTRY is every filterable key in a fixed
  // order and a code is a bitmask over it, so the list is APPEND-ONLY —
  // adding an entry adds a bit and every existing code keeps meaning what
  // it meant; removing or reordering one changes every link out there.
  // 35 slots from the first build: 7 base-36 digits.
  var CODE_LENGTH = 7;
  var REGISTRY = [
    ['venue', 'CHI Health Center Omaha'], ['venue', 'Baxter Arena'], ['venue', 'Orpheum Theater'], ['venue', 'Holland Performing Arts Center'], ['venue', 'Steelhouse Omaha'], ['venue', 'The Astro Theater'], ['venue', 'Liberty First Credit Union Arena'], ['venue', 'Slowdown'], ['venue', 'The Waiting Room'], ['venue', 'Werner Park'], ['venue', 'Morrison Stadium'], ['venue', 'Memorial Stadium'], ['venue', 'Pinnacle Bank Arena'], ['venue', 'Bob Devaney Sports Center'], ['venue', 'Lied Center for Performing Arts'], ['venue', 'Bourbon Theatre'], ['venue', 'Royal Grove'], ['venue', 'The Ice Box'],
    ['badge', 'concert'], ['badge', 'sports'], ['badge', 'arts'], ['badge', 'community'],
    ['team', 'huskers'], ['team', 'huskersbasketball'], ['team', 'huskersvolleyball'], ['team', 'bluejays'], ['team', 'mavericks'], ['team', 'stormchasers'], ['team', 'stars'], ['team', 'lancers'], ['team', 'unionomaha'],
    ['cap', 'stadium'], ['cap', 'arena'], ['cap', 'hall'], ['cap', 'room'],
  ];

  // The words the page uses for the place
  var WORDS = {
    teamCity: 'Nebraska', // the board drops it from the clubs' names ("Nebraska Cornhuskers" → Cornhuskers; the Omaha and Lincoln clubs keep theirs)
    presetDefault: 'Every room — the Omaha arena and rinks, Memorial Stadium, Pinnacle Bank Arena and the Devaney Center, the halls and the clubs in both cities — every team and type',
    presetNeighborhood: 'Omaha only',
    presetBig: 'Only the places that hold 2,000 or more — Memorial Stadium, the arenas, the ballpark, the Devaney Center and the big halls',
    phrases: { all: 'Showing everything.', none: 'Showing nothing yet — open Filter and pick some venues.', neighborhood: 'Showing Omaha only.', big: 'Showing the big rooms only — Memorial Stadium, the arenas, the ballpark, the Devaney Center and the big halls.' },
  };

  global.LQACity = {
    key: 'nebraska',
    name: 'Nebraska',
    site: 'https://nebraska.here.events/',
    userAgent: 'Mozilla/5.0 (compatible; nebraska-events/1.0; +https://nebraska.here.events/)',
    tz: 'America/Chicago', tzName: 'Central', // the state's time zone (Omaha and Lincoln; the Panhandle's Mountain time is nowhere on this calendar): the ICS feed's TZID, the game clocks, the poster's footer
    state: "Nebraska", stateOutline: 'M6.6 16.6L6.6 16.2L6.6 15.8L6.6 15.4L6.6 15.1L6.6 14.7L6.6 14.3L6.6 13.9L6.6 13.5L6.0 13.5L5.5 13.5L4.9 13.5L4.3 13.5L3.7 13.5L3.2 13.5L2.6 13.5L2.0 13.5L2.0 12.8L2.0 12.0L2.0 11.2L2.0 10.5L2.0 9.7L2.0 8.9L2.0 8.2L2.0 7.4L2.8 7.4L3.6 7.4L4.4 7.4L5.2 7.4L6.0 7.4L6.8 7.4L7.6 7.4L8.4 7.4L9.2 7.4L10.0 7.4L10.8 7.4L11.6 7.4L12.4 7.4L13.2 7.4L14.0 7.4L14.9 7.4L15.6 7.9L16.0 8.0L16.2 7.9L16.6 7.8L17.2 7.8L17.6 7.8L17.8 8.0L18.1 8.1L18.6 8.3L18.9 8.5L19.0 8.7L19.2 8.9L19.4 8.9L19.5 8.9L19.6 9.2L19.7 9.7L19.8 10.1L20.0 10.4L20.1 10.6L20.1 10.7L20.2 10.9L20.3 11.0L20.3 11.3L20.3 11.7L20.4 11.9L20.5 11.9L20.5 11.9L20.5 12.0L20.5 12.1L20.6 12.1L20.6 12.2L20.6 12.4L20.6 12.5L20.7 12.6L20.8 12.7L20.7 12.8L20.7 12.9L20.8 13.0L20.8 13.3L20.9 13.9L20.9 14.2L20.8 14.3L20.9 14.5L21.0 14.8L21.1 14.9L21.2 15.2L21.3 15.5L21.4 15.7L21.6 15.8L21.7 16.0L21.8 16.3L22.0 16.6L22.0 16.6L21.6 16.6L21.1 16.6L20.6 16.6L20.1 16.6L19.7 16.6L19.2 16.6L18.7 16.6L18.2 16.6L17.7 16.6L17.2 16.6L16.8 16.6L16.3 16.6L15.8 16.6L15.3 16.6L14.8 16.6L14.3 16.6L13.9 16.6L13.4 16.6L12.9 16.6L12.4 16.6L11.9 16.6L11.4 16.6L11.0 16.6L10.5 16.6L10.0 16.6L9.5 16.6L9.0 16.6L8.5 16.6L8.1 16.6L7.6 16.6L7.1 16.6L6.6 16.6Z', // the masthead's small state, linking to here.events (scripts/state-outline.mjs, Natural Earth 1:50m)
    // the calendar feed's header; the UID domain never changes (changing it
    // re-creates every event in subscribers' calendars)
    ics: { name: 'Nebraska Events', short: 'Nebraska Events', teams: 'Nebraska home teams — every season', prodid: '-//here.events//nebraska-events//EN', uidDomain: 'fosdal.net', // the UID domain the whole family issues (the shared ics test pins it)
      desc: 'Upcoming events in Omaha and Lincoln\\, NE — CHI Health Center\\, Baxter Arena\\, Memorial Stadium\\, Pinnacle Bank Arena\\, the Devaney Center\\, the halls and the clubs' },
    teams: TEAMS,
    venues: VENUES,
    defaultOn: DEFAULT_ON,
    defaultOff: DEFAULT_OFF,
    prefsKnownFrom: PREFS_KNOWN_FROM,
    types: TYPES,
    movieVenue: MOVIE_VENUE,
    groundsVenue: null, // every listing is read by room, so nothing arrives under a name city.js lacks
    codeLength: CODE_LENGTH,
    registry: REGISTRY,
    words: WORDS,
  };
})(typeof globalThis !== 'undefined' ? globalThis : window);
