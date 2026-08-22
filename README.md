# MRU-Soccer
MRU Boys Varsity Soccer — Stats Tracker

A self-contained, installable Progressive Web App (PWA) for tracking Mill River Union High School Boys Varsity Soccer games, players, and season stats — built to work fully offline, right from an iPhone home screen.

This is a Soccer (Football) tracker for the Mill River Union High School Boys Varsity Soccer team. The app is set up to run following the rules set by the Vermont Principals Association (VPA) for halves and timing (two 40-minute halves). This is set up to be a Progressive Web App (PWA) for iPhones.

Feel free to make a copy of this project to change it to fit your needs (change the name of your team, change the timing, change the season, etc).

What it does

The app is a single HTML file with no backend, no build step, and no external dependencies beyond one bundled library. Everything runs and persists locally on the device it's installed on.

Live match tracking
1. 80-minute match clock with start/pause/resume, automatic 1st/2nd half tracking, a 40:00 half warning, and full-time auto-stop at 80:00.
2. Clock is self-correcting: if the phone locks or the app is backgrounded (which suspends JavaScript timers on iOS), the display catches up to the correct elapsed time the moment the app is reopened, instead of losing time silently.
3. Optional screen wake lock keeps the display from auto-locking while a half is actively running, on browsers that support it.
4. Timestamped event log for goals, cards, substitutions, and other match events, tagged to the correct minute and half.

Game logging
1. Game info (date, season, opponent, location) and final score/result.
2. Full MRU team stats: shots, shots on target, saves, corners, fouls, cards, offsides, possession.
3. Mirrored stats tracking for the opposing team.
4. Per-player game stats for the MRU roster (goals, assists, shots, saves, cards, minutes played).
5. Ad-hoc opponent player tracking (add opposing players by number/name and log their goals, assists, and cards for that game).

Roster management
1. Add, edit, and remove players (number, name, position).
2. Editing an existing player updates their profile in place, preserving all of their historical stats.

Season views
1. Players tab — season-to-date totals per player, aggregated automatically from logged games.
2. History tab — a reverse-chronological log of every game played, with score, result, and match meta.
3. All-time tab — cumulative team and player stats across the full season.

Export & backup
1. Excel (.xlsx) export via SheetJS (bundled inline for offline use), including:
      Last game or all games (team stats)
      Player season totals
      Per-game player stats, opponent player stats, and full match event logs
      Season summary sheet (record, goals for/against, shot accuracy, discipline, etc.)
2. JSON backup/restore — export the entire app state (roster + games) to a file and restore it later, e.g. when moving to a new device.

Tech details
1. Single HTML file — all markup, CSS, and JavaScript in one document; no build tools required.
2. Offline-first PWA — installable to an iOS home screen via Safari, works with no network connection.
3. localStorage persistence — all data (roster, games, stats) is saved to the browser's local storage on the device.
4. SheetJS bundled inline so .xlsx export works fully offline once installed.
5. "Liquid Glass"-inspired UI — light/dark mode support via prefers-color-scheme, safe-area-aware layout for notch/home-indicator devices, and native-feeling sheets and controls.

Installing on iPhone
1. Open the app's URL in Safari.
2. Tap the Share button, then Add to Home Screen.
3. Launch it from the home screen icon — it runs full-screen with no browser chrome and works offline.

Data & privacy
1. All data is stored locally on the device via localStorage. Nothing is sent to a server. Use the JSON backup/restore feature to move data between devices or keep an off-device copy.
