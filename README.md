# MRU Boys Varsity Soccer Tracker

A mobile-first soccer stats tracker for MRU Boys Varsity Soccer. It runs as a single self-contained HTML file, stores everything on the device, and is designed to be added to an iPhone Home Screen and used on the sideline with a Liquid Glass style interface.

## Contents

- [Features](#features)
- [Quick start](#quick-start)
- [Logging a match](#logging-a-match)
- [Importing the opponent roster](#importing-the-opponent-roster)
- [Data and storage](#data-and-storage)
- [Exports](#exports)
- [Tech stack](#tech-stack)
- [Deploying with GitHub Pages](#deploying-with-github-pages)
- [Known limitations](#known-limitations)
- [Changelog](#changelog)

## Features

**Live match tracking**
- Match clock with 40 minute halves, 1st half, 2nd half and Full Time controls.
- The clock is anchored to wall-clock time, so it stays correct if the phone locks or the app is backgrounded.
- Screen Wake Lock keeps the display on during a match where the browser supports it.
- Every event is timestamped with the match minute and half, and shown in a live event timeline.

**Event logging for both teams**
- Goals, assists, penalty kicks scored and missed.
- Own goals, credited to the other team on the scoreboard.
- Direct kicks and indirect kicks.
- Shots, shots on target, saves (MRU), corners, offsides.
- Fouls, with a required type: Foul, Dangerous play or Handball.
- Yellow and red cards, each with a required typed reason.
- Any event can be removed from the timeline, and the score and stats reverse automatically.

**Scoring rules**
- The scoreboard is calculated from the event log, never entered by hand.
- MRU score = MRU goals + MRU penalties scored + opponent own goals.
- Opponent score = opponent goals + opponent penalties scored + MRU own goals.
- An own goal is tracked as an OG stat on the player who scored it and does not count toward that player's goals.

**Rosters and players**
- Editable season roster with number, name and position (GK, DEF, MID, FWD, FLOAT).
- Opponent players are added per match, either by hand, while logging an event, or by importing a roster (see below).
- Per-player stat lines for the current match, game history and the season.

**History and reporting**
- Saved games with date, opponent, location (Home, Away, Neutral), season and notes.
- Game detail view with team stat comparison, player stats and the full event timeline including foul types and card reasons.
- All-time view with season leaders and team totals.
- Excel and JSON exports, and a full backup and restore.

## Quick start

1. Open the hosted page in Safari on iPhone (see [Deploying with GitHub Pages](#deploying-with-github-pages)).
2. Tap Share, then Add to Home Screen. It launches full screen as "MRU Soccer".
3. Open the Players tab and build the season roster.
4. Use the Log game tab to run a match.

The app has five tabs: **Log game**, **Players**, **History**, **All-time** and **Export**. Inside Log game, the **MRU** and **Opponent** sub-tabs hold the event buttons for each team.

## Logging a match

1. Enter the opponent, date, location and season.
2. Start the clock. Use the half button to move to the 2nd half and then Full Time.
3. Tap an event button. Pick the player (MRU roster player or opponent player) and confirm.
4. Some events ask for one extra required detail before they will log:

| Event | Required detail |
| --- | --- |
| Foul | Type: Foul, Dangerous play or Handball |
| Yellow card | Typed reason, up to 140 characters |
| Red card | Typed reason, up to 140 characters |

5. At the end of the match, save the game. It moves to History and rolls into the season totals.

For opponent events you can pick an existing opponent player or type a number and name to create one on the spot.

## Importing the opponent roster

On the Opponent sub-tab, tap **Import roster (scan text)**. Both methods feed the same review list, where you can edit any number or name and uncheck rows you do not want. Rows with no jersey number start unchecked, since they are often titles or coaches. Players already listed with the same number and name are skipped.

### Method 1: Scan Text (any iPhone on iOS 15 or later)

1. Tap the text box in the import sheet.
2. Tap the Scan Text button on the keyboard, or touch and hold in the box and choose Scan Text.
3. Point the camera at the roster and tap Insert. You can scan more than once.
4. Tap Find players, review the list, then add.

The parser understands formats such as `7 John Smith`, `#10 - Mike OBrien`, `3. Carlos Ruiz`, `Smith, John 14` and `Jake Miller 5`. It strips positions, class years and heights, ignores header lines, and pairs a column of numbers with a column of names when a table scans that way.

### Method 2: Shortcut with Apple Intelligence (iOS 26 or later)

This route uses the Use Model action in the Shortcuts app to turn the scanned text into clean JSON.

One-time setup:

1. In Shortcuts, create a new shortcut named **Scan Opponent Roster**.
2. Add **Take Photo** (or **Select Photos**).
3. Add **Extract Text from Image**, with the photo as input.
4. Add **Use Model**. Choose the On-Device Model, or Private Cloud Compute if results look off. Paste the prompt below, then add the Extracted Text variable at the end. Set the output to Text.
5. Add **Copy to Clipboard** with the model response.

Prompt (also available from the Copy prompt button inside the app):

```
The text below was scanned from a soccer team roster. Return only a JSON array with one object per player in this form: [{"num":"7","name":"John Smith"}]. Use the jersey number as a string, write each name as First Last, ignore coaches, titles, positions, grades and heights, and add no other text or code fences. Roster text:
```

Each use:

1. Run the shortcut and photograph the roster.
2. In the app, open Import roster, switch to the Shortcut tab and tap Paste from clipboard.
3. Review the list and add.

The importer accepts a JSON array, an object with a `players` list, or a number-to-name dictionary, with or without code fences. If the model returns plain text instead, the Scan Text parser handles it. If Safari blocks the clipboard read, long press the text box, choose Paste, then tap Find players.

## Data and storage

- All data lives in the browser's `localStorage` under the key `mru_soccer_v3`. Nothing is sent to a server.
- Saved games keep team totals, player stats and the full event list.
- Games saved before a feature existed still load. Missing stats (such as own goals or kicks) count as zero.
- Opponent players belong to the match in progress and clear when the game is saved.
- Home Screen installs and Safari tabs have separate storage on iOS, so pick one and stay with it. Use backup and restore to move data between them.

Each event stored with a game has these fields:

| Field | Meaning |
| --- | --- |
| `type` | Event key such as `mru_goal`, `opp_own_goal`, `mru_direct` |
| `label`, `icon` | Display name and icon |
| `minute`, `half` | When it happened |
| `playerId`, `playerNum`, `playerName` | Who it was logged against |
| `detail` | Foul type or card reason, when applicable |

## Exports

All spreadsheet exports are `.xlsx` files built in the browser.

| Button | Contents |
| --- | --- |
| Last game | Score, team stats, events and player stats for the most recent game |
| All games, full log | One row per game, including own goals and direct and indirect kicks for both teams |
| Player season totals | Cumulative stats per player, including OG, direct and indirect kicks |
| All-time team summary | Season-level aggregates |
| Export full backup (.json) | Everything, including the roster |
| Restore from backup | Load a previously saved `.json` file |
| Clear all data | Wipes local data. Cannot be undone |

The events sheet includes a Detail column with the foul type or card reason. Spreadsheets that read exports by column position may need adjusting after the latest update, since new columns were added to the right.

## Tech stack

- One HTML file with inline CSS and JavaScript. No build step and no framework.
- SheetJS embedded inline for Excel export, so there is no CDN dependency.
- `localStorage` for persistence.
- Screen Wake Lock API for the match screen.
- Apple web app meta tags for full screen Home Screen launch.
- Clipboard API for the Shortcut roster import, with a manual paste fallback.

## Deploying with GitHub Pages

iOS restricts opening local HTML files in a useful way, so the app is served from GitHub Pages.

1. Put the file in the repository root as `index.html`.
2. In the repository settings, open Pages and publish from the main branch, root folder.
3. Open the Pages URL in Safari on the iPhone and use Add to Home Screen.
4. To update, commit the new `index.html`. Reopen the app after Pages finishes deploying. If an old copy persists, close it fully and relaunch.

## Known limitations

- There is no service worker or web manifest in the file. The page is fully self-contained, but offline launch relies on the browser cache rather than a guaranteed offline install. A service worker is the natural next step if guaranteed offline launch is needed.
- Fouls keep a single fouls total per player. The foul type is stored on the event and shown in the timeline and exports, but there is no per-type count.
- Scan Text can scramble multi-column roster tables, so check numbers in the review list before adding.
- The Shortcut route needs iOS 26 or later with Apple Intelligence. The on-device model cannot read images, which is why the shortcut extracts text first.
- Data is per device. Use JSON backup to move it.

## Changelog

**Latest update**
- Added own goals for both teams, credited to the other side on the scoreboard.
- The foul button now requires a type: Foul, Dangerous play or Handball.
- Added direct kick and indirect kick logging for both teams.
- Yellow and red cards now require a typed reason.
- Added opponent roster import with two methods: iOS Scan Text and a Shortcut using Apple Intelligence.
- Extended game detail, all-time totals and all exports with the new stats and event details.

**Earlier**
- Live match clock with timestamped events and opponent player tracking.
- Wall-clock anchored timer and Screen Wake Lock.
- Inline SheetJS for offline-friendly exports.
- Liquid Glass interface and team branding.
- Player roster editing, game history and season stats.
