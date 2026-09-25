# Investo Immobilien

React/TypeScript landing page with German, English and French. The latest integration follows `integration/CONTRACT-v1.md`.

## Run
Requires Node.js 22.13+ and npm.

```sh
npm ci
npm run build
npm start
```

Open http://127.0.0.1:3001/. For development, run `npm run dev:api` and `npm run dev` in separate terminals. Vite on port 3000 proxies the API to 3001. If esbuild cannot access ancestor directories in a restricted environment, use `npm run build -- --configLoader runner`.

Copy `.env.example` to `.env` and configure private server settings. Without Propstack/Turnstile credentials and approved consent, the form remains a review preview and cannot submit. The new-contact CEO assignment is an explicit business setting, not a browser choice.

## Inquiry flow
Browser -> POST /api/inquiries -> exact Propstack contact resolution -> distinct inquiry activity -> Propstack signed event -> existing n8n callback worker.

There is no browser or website-server POST to the n8n webhook. The previous /api/leads intake returns 410. Existing contacts are never edited by this implementation. The website neither books appointments nor creates callback tasks itself.

The API uses a durable SQLite reservation, payload hashes, process leases, contact locks by normalized email, server timestamps, and readback/reconciliation. The Node process resumes pending work every 15 seconds. Review incidents need operator attention. Static hosting alone cannot process inquiries.

## Validate
```sh
npm run lint
npm test
npm run build
```

Tests use simulated CRM and bot-verification responses; they do not prove that the live n8n callback workflow is configured. See `integration/HANDOVER.md` for deployment, data handling, open launch settings, field mapping and acceptance checks.

Photos, smooth navigation, existing copy and the language selector are preserved. See `ASSET_SOURCES.md` and `CHANGES.md` for earlier changes.

## Performance

The production build includes a prerendered homepage, responsive local photographs, local fonts, deferred video loading, and compressed/cacheable static assets. Use `npm run build` so prerendering runs; calling Vite directly skips it. See `PERFORMANCE.md` for measurements, verification and hosting requirements.
