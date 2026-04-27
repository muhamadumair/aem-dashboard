# AEM Dashboard

A small Angular 14 dashboard application built as a technical assessment.
It features a login flow, a protected dashboard with bar and doughnut charts,
a users table, and an optional Electron desktop build.

## Tech stack

- **Framework:** Angular 14 (Angular CLI 14.2.13)
- **UI:** Bootstrap 4
- **Charts:** Chart.js + ng2-charts
- **Local storage / auth seed:** PouchDB (IndexedDB in the browser)
- **Notifications:** ngx-toastr
- **Desktop shell:** Electron (optional)

## Requirements

- Node.js 16.x or 18.x (tested on 18)
- npm 8 or newer
- Git

No global install of the Angular CLI is required — the project uses its local copy.

## Getting started

```bash
git clone https://github.com/<your-username>/aem-dashboard.git
cd aem-dashboard
npm install
```

## Run

### Development server

```bash
npm start
```

Then open `http://localhost:4200/`. The app reloads on file changes.

### Production build

```bash
npm run build
```

Output is written to `dist/aem-dashboard`.

### Desktop app (Electron)

```bash
npm run electron
```

This builds the Angular app and launches it inside Electron.

## Test credentials

The login page validates against a local PouchDB instance that is seeded on
first run. Use:

```
Email:    user@aemenersol.com
Password: Test@123
```

## Project structure

```
src/
  app/
    dashboard/        dashboard page (charts + users table)
    login/            login page
    guards/           route guards
    interceptors/     http interceptors
    services/         auth, dashboard data, local pouchdb
  assets/
  environments/
main.js               Electron entry point
```

## Scripts

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `npm start`        | Run the dev server on port 4200      |
| `npm run build`    | Production build                     |
| `npm run watch`    | Dev build with file watching         |
| `npm test`         | Run unit tests via Karma             |
| `npm run electron` | Build and launch the Electron app    |

## Notes

- The local user database is stored in the browser's IndexedDB under
  `_pouch_aem_local_db`. You can inspect it via DevTools → Application →
  IndexedDB.
- `skipLibCheck` is enabled in `tsconfig.json` to stay compatible with the
  TypeScript 4.7 toolchain used by Angular 14.
