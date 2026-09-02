MRU Soccer

MRU Boys Varsity Soccer — Offline Stats Tracker

A self-contained, mobile-friendly Progressive Web App (PWA) for tracking Mill River Union High School Boys Varsity Soccer matches, player statistics, opponents, and season history. The app is designed to run directly from a browser or an iPhone home screen and stores its data locally for offline use.

Features

Live match clock

Two 40-minute halves, matching the app's VPA-style configuration.

Countdown clock with Start, Pause, Resume, half transition, full-time state, and reset controls.

Wall-clock-based timekeeping that catches up after the phone is locked or the app is backgrounded.

Best-effort Screen Wake Lock support while a half is running on supported browsers.

Event timestamps tied to the current match clock and half.

Match logging

Record:

Opponent

Date

Location: Home, Away, or Neutral

Season

Notes

Automatically calculated score and result

The score updates automatically as goals and scored penalty kicks are logged.

MRU player statistics

Each MRU event is associated with a player. Supported events include:

Goals and assists

Penalty kicks scored and missed

Shots and shots on target

Goalkeeper saves

Corners

Offsides

Fouls

Yellow cards

Red cards

Opponent tracking

Add opponent players by jersey number and name, then track:

Goals and assists

Penalty kicks

Shots and shots on target

Corners

Offsides

Fouls

Yellow and red cards

Opponent player statistics and match events are saved with each game.

Roster management

Add, edit, and remove players

Store jersey number, name, and position

Supported positions: GK, DEF, MID, FWD, and FLOAT

Match history and season views

Players — roster and season-to-date player information

History — saved games with scores, results, and match details

All-time — cumulative team totals, record, and season leaders

Export and backup

The Export tab provides:

Last game (.xlsx) — score, team statistics, events, and player statistics

All games (.xlsx) — complete game log

Player season totals (.xlsx) — cumulative player statistics

All-time team summary (.xlsx) — season-level team aggregates

Full JSON backup — complete roster and game history

Restore from JSON — restore a previously exported backup

Excel export uses a bundled copy of SheetJS, allowing .xlsx exports to work offline.

Technology

Single HTML file

No backend or database server

No build step

No external network dependency during normal use

HTML, CSS, and JavaScript contained in one document

Browser localStorage persistence

Bundled SheetJS library for offline Excel export

Responsive, mobile-first interface

Light and dark mode support through prefers-color-scheme

Safe-area-aware layout for modern iPhones

Apple Liquid Glass-inspired visual design

Running the app

The application is self-contained and can be opened directly in a modern browser. For the best mobile experience, host the HTML file on a static web host and open it in Safari or another modern browser.

Installing on iPhone

Open the app in Safari.

Tap the Share button.

Select Add to Home Screen.

Launch MRU Soccer from the new home screen icon.

The app is designed for offline use after it has been loaded and installed.

Data and privacy

All roster and match data is stored locally in the browser's localStorage. The application does not require an account or backend server.

Because browser storage can be cleared, regularly exporting a JSON backup is recommended. Backups can also be used to transfer data between devices.

Customization

This project can be adapted for another team or competition. Common changes include:

Team name

Match length and half duration

Season defaults

Available statistics

Player positions

Colors and visual styling

The match clock currently uses a 40-minute half constant near the application's clock logic.

Project structure

MRU-Soccer/
├── mru_soccer_reworked.html   # Complete application
└── README.md                  # Project documentation

Notes

This project is intended as a practical local match-tracking tool for the MRU Boys Varsity Soccer program. It is not a cloud-based statistics service, so data synchronization between devices is not automatic. Use the JSON backup and restore tools when moving data between devices or maintaining an off-device copy.
