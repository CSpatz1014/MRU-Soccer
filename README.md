# MRU Boys Varsity Soccer Stat Tracker

An offline-first match stat tracker for Mill River Union Boys Varsity Soccer, built as a single-page web app and installable on an iPhone home screen.

**Live app:** https://cspatz1014.github.io/MRU-Soccer/

## Features

### Live match logging
- Match clock that counts down from 40:00 per half, with Start, 2nd Half and Reset controls
- The clock is anchored to wall-clock time, so it stays accurate when the phone locks
- Screen Wake Lock keeps the display on during a match
- Every stat is tied to a player and stamped with the clock time
- Match timeline showing every logged event, with notes per game

### Stats tracked (MRU and opponent)
- Goals, assists, penalty kicks scored and missed
- Own goals (credited to the other team on the scoreboard)
- Shots, shots on target, corners, offsides
- Saves (MRU goalkeepers)
- Direct and indirect kicks
- Fouls, with a required type: foul, dangerous play or handball
- Yellow and red cards, each with a required typed reason (up to 140 characters)
- The score updates automatically when a goal, scored PK or own goal is logged

### Rosters and seasons
- Season roster with jersey number, name and position (GK, DEF, MID, FWD, FLOAT)
- Opponent player tracking per game
- Opponent roster import from a camera photo:
  - **Scan Text:** use the iOS Scan Text button on the keyboard
  - **Shortcut:** run a Shortcuts automation that uses Apple Intelligence (requires iOS 26 or later), then paste from the clipboard
- Tabs for Log game, Players, History, All-time and Export

### Export and backup
| Export | File name |
| --- | --- |
| Last game (score, team stats, events, player stats) | `MRU_vs_<opponent>_<date>.xlsx` |
| All games, one row per game | `MRU_all_games.xlsx` |
| Player season totals | `MRU_player_season_totals.xlsx` |
| All-time team summary | `MRU_season_summary.xlsx` |
| Full backup of all data including roster | `MRU_soccer_backup_<date>.json` |

Use **Restore from backup** in the Export tab to load a saved `.json` file.

### Appearance
- Apple Liquid Glass look
- Follows the system light or dark setting automatically

## Install on iPhone

1. Open the live app URL in Safari.
2. Load the page once while online, then reload it once so the offline files are saved.
3. Tap Share, then **Add to Home Screen**.
4. Open the app from the home screen.

## Offline support

A service worker (`sw.js`) caches the app page after the first visit, so the app opens with no signal. When you are online, it refreshes its saved copy in the background. A new version appears the next time you launch the app after an online visit, never in the middle of a match.

Match data is stored on the device in `localStorage`. It does not need a connection and is never sent anywhere.

## Data safety

- iOS can clear stored data if the phone runs very low on storage. Export a full backup (`.json`) after every game or at least every week.
- The installed home screen app and Safari keep **separate** storage. Data entered in a Safari tab will not appear in the home screen app.
- Deleting the home screen app deletes its data. Back up first.
- Clear all data in the Export tab cannot be undone.

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | The whole app: HTML, CSS, JavaScript and the embedded SheetJS library |
| `sw.js` | Service worker for offline use |
| `manifest.webmanifest` | Web app manifest (name, display mode, icons) |
| `apple-touch-icon-v2.png` | 180 px home screen icon source |
| `icon-192-v2.png`, `icon-512-v2.png` | Manifest icons |
| `README.md` | This file |

The older unversioned icon files (`apple-touch-icon.png`, `icon-192.png`, `icon-512.png`) are no longer used and can be deleted.

## Tech stack

- Plain HTML, CSS and JavaScript in one file, with no build step
- SheetJS, embedded inline, for Excel export (no CDN dependency, so it works offline)
- `localStorage` for data
- Service Worker, Web App Manifest and Screen Wake Lock APIs
- Hosted on GitHub Pages

## Deploying updates

1. Edit `index.html` and commit it to the repository.
2. If you add or rename files that must work offline, update the cache list in `sw.js`.
3. To force every device to refresh its saved copy, change the cache name in `sw.js` (currently `mru-soccer-v4`) to the next number.
4. Open the app online once to pick up the new version, then relaunch it.

### Changing the home screen icon

iOS caches home screen icons by file name and can keep showing an old one. The 180 px icon is embedded directly in the `<head>` of `index.html` as a data URI to avoid this. To change it, replace that data URI, and give any icon files a new name (for example `-v3`).

## Troubleshooting

- **Shows a letter instead of the logo:** delete the home screen app, open the URL in a Private Safari tab, add it again, then restart the phone if needed.
- **App does not open offline:** open it online once, reload, then test again in airplane mode. Check that `sw.js` and `index.html` are in the same folder.
- **Old version still showing:** open the app online, close it fully, and relaunch.
