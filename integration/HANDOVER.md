# Investo inquiry integration handover

## Current delivery

Implemented the supplied 24 September 2026 contract in the existing landing page. The authoritative request is preserved as CONTRACT-v1.md. The former website-to-n8n adapter is retired. No real CRM data or n8n workflow was modified.

1. Landing page: local http://127.0.0.1:3001/; public hosting remains pending.
2. Form: Investo Strategy Check, four-step React/TypeScript questionnaire, Node/Express backend, persistent SQLite state.
3. Form ID: strategy-check-v1. Schema: investo.inquiry.v1. No Propstack embed or parallel native form.
4. Local staging: http://127.0.0.1:3001/?utm_source=staging&utm_medium=qa&utm_campaign=contract-v1.
5. Browser request example: example-submission.json. Complete website mapping: field-mapping.json. Server adapter: automation/website-mapping.mjs.
6. Exact DE/EN/FR consultation and separate newsletter wording: consent-text.json. Version 2026-09-24-v1 is a draft implementation version. The contract's client-approved-v1 example is not evidence that this wording was approved.
7. Thank-you route: /danke. It requires a verified server receipt and does not promise an appointment or confirm that a callback task already exists.

## What changed

POST /api/inquiries validates schema, form ID, language, required contact fields, exact income band, investment goals and experience. The earlier extra questionnaire fields remain available; optional absent numeric answers are omitted, never converted to zero. Explicit property count is separate from experience and is never inferred.

Phone numbers must include +country-code or 00-country-code. Formatting spaces, dots, parentheses and hyphens are removed; local-only numbers and ambiguous optional trunk-zero notation are rejected. Email is trimmed/lowercased for exact contact lookup and locking. This is format validation, not verification of ownership or phone reachability.

Unrecognized browser fields are ignored, including owner/source/property IDs, scores, flags, timestamps and dry_run. Known fields have explicit limits; body size is capped at 16 KiB. HTML in the inquiry is escaped. Contact permission and optional newsletter preference are independent; neither sets GDPR approval, newsletter subscription or finance readiness.

The API returns accepted:true only after the inquiry exists in Propstack and a matching readback verifies it. Otherwise a durable receipt is pending or review with HTTP 202. Responses expose no CRM contact data, owner IDs, secrets or vendor errors.

## Server launch settings

Set PROPSTACK_API_KEY in private secret storage. API base is fixed to https://api.propstack.de/v1 with X-API-KEY authentication. Never place keys in VITE_* variables, source control, browser logs or URLs.

Configure TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY for the actual domain. The site key is public; the secret stays on the server. Server verification checks success, hostname, action investo-inquiry and cdata matching the submission UUID. Missing/failed verification cannot create a lead. The widget uses the official Cloudflare script; production CSP must allow its documented script/frame endpoints.

Approve the exact consent wording in all enabled languages before setting CONTACT_CONSENT_APPROVED=true. If the wording changes, change CONSENT_VERSION and regenerate consent-text.json with it. Historical evidence remains the stored snapshot.

Choose PROPSTACK_NEW_CONTACT_OWNER_ID only after agreeing the business rule: 443333 = Alpaslan, 443427 = Akay. Blank does not assign arbitrarily: new contacts enter local review with no CRM write. No rotation/distribution rule was assumed. Existing eligible CEO owners are preserved.

Set PUBLIC_SITE_URL to the HTTPS site origin, ALLOWED_ORIGINS to exact approved frontend origins, HOST=0.0.0.0 only when needed by hosting, and LEAD_DB_PATH to persistent protected storage. When behind a reverse proxy, set TRUST_PROXY to the exact trusted proxy IPs/CIDRs so the rate limit identifies the real visitor; do not trust arbitrary X-Forwarded-For. The backend applies a durable per-IP limit of 10 submission attempts and 120 total API requests per minute with Retry-After, including failed bot attempts.

Run npm ci, npm run build and npm start. Host the frontend and API together, or route /api/* and /danke to the Node service. A static-only preview cannot deliver inquiries.

## Durable state and uncertainty

The inquiries table stores canonical payload, consent-text snapshot, authoritative received_at, token/payload/email hashes, status, operation phase, contact/owner/inquiry IDs and a process lease. A primary key reserves each submission UUID atomically. Same ID/same payload returns the existing receipt; same ID/different payload returns 409.

A separate unique email lock serializes this backend's contact lookup/create operations across processes sharing the same SQLite file. There is no automatic lease expiry for an uncertain contact-create lock: unresolved contact creation must not allow a later inquiry to create another contact. Other independent CRM writers can still race with Propstack's upsert-by-email endpoint; coordinate intake writers at launch.

Persisted intent precedes each mutating CRM call. Contact-create uncertainty uses exact-email lookup; inquiry-create uncertainty searches paginated contact activities and checks the leading exact INV-SUBMISSION marker, dedicated category/source, owner and single linked contact. Neither uncertain POST is automatically repeated. A confirmed inquiry ID is read back directly. Three unresolved reconciliation attempts enter review; vendor outages remain pending and retry only safe reads/unfinished pre-write work.

The process resumes pending work every 15 seconds (retry backoff 30 seconds after failures). Process leases expire after 90 seconds following a crash, and are renewed during work. Run at least one Node process continuously; do not deploy the queue as an ephemeral request-only function. Multiple processes must share the same database. Multi-host deployments need a shared transactional database instead of independent SQLite files.

Status endpoint: GET /api/inquiries/status/:id with Authorization: Bearer <receipt-token>. It is read-only, does not reveal contact/CRM data and does not retry a POST.

Operator inspection: review the protected inquiries table's status, phase and review_reason. Do not expose it through a public endpoint. For a previously uncertain inquiry write, after investigating the incident, run node server/reconcile.mjs <submission-id> with the server key configured. This performs fresh CRM reads and marker reconciliation, never manually marks a receipt accepted and never repeats inquiry creation. Restricted contacts, unknown owners and unresolved contact creation need an operator decision; there is no public reset/force-send endpoint.

The earlier submissions table, if present, is left untouched. Legacy pending n8n records are not migrated or replayed automatically. Review them separately before replacing a live deployment.

## Data handling

Unlike the earlier hash-only store, the durable queue stores personal/financial answers and consent evidence. Protect the disk and backups with host access controls and encryption, apply the owner's retention policy, and exclude .data/ from version control, archives and static hosting. Do not erase deduplication records without a reviewed retention/tombstone policy; deleting IDs can permit replays.

The browser retains the draft in sessionStorage to support refresh/resume. It is cleared after confirmed acceptance or an explicit new later inquiry; the receipt stays for status checks. Closing the tab ends normal session storage. If browser storage is blocked, drafts survive only while the page remains open. No automatic resend occurs on reload.

A deliberate Start another enquiry action after confirmation creates a new UUID. Pending/uncertain requests have no new-ID shortcut. The success event investo:lead-submitted contains only form_id, submission_id and received_at once per session receipt.

## Propstack mapping and downstream boundary

Uses the account IDs provided by the contract: source 364441, new-contact status 348539, phase option 355771, inquiry category 734823. Numeric income dropdowns and comma-separated goal IDs are defined in automation/website-mapping.mjs. The wrapper helper fieldValue reads custom field value wrappers.

Only genuinely new contacts receive initial selected custom fields, original attribution and captured accept_contact:true. Existing exact matches are not updated. Archived, locked, deleted, withdrawn/unknown-permission, ambiguous-email and unassigned/non-CEO contacts require review; later submission never reverses withdrawal.

Each accepted submission creates its own /tasks inquiry linked to exactly one contact, with no is_event, is_reminder, appointment timestamp, property or callback-task creation. The inquiry contains original answers, experience, source attribution and separate consent evidence.

Propstack must send its authenticated task-created event to the already specified n8n flow. That flow's durable inbox/Data Tables, signed webhook verification, fresh contact reads, callback category 710193 and incident handling are outside this website repository. No workflow export, credentials or deployment access was supplied here, so their configuration and live behavior remain unverified. The website does not POST to that webhook and does not claim callback completion.

## Acceptance evidence and launch checks

Automated tests use a simulated Propstack API and bot verifier. They cover new contacts, existing contacts and later inquiries, concurrent identical IDs, changed-payload conflicts, email serialization, restart persistence, accepted-then-timeout reconciliation, missing inquiry reconciliation, contact-create timeout, restricted contacts, enum/length/phone limits, HTML escaping, ignored privilege flags, bot failure, throttling and vendor outage.

Before launch with account access, verify the actual contact, dedicated inquiry and one callback task in a staging workflow for each contract scenario. Confirm exact IDs/response shapes, private key permissions, Turnstile production hostname, reverse-proxy IP handling, owner rule and approved consent wording. Mock tests and a green UI are not evidence that the external callback worker ran.

## Official implementation references

- https://docs.propstack.de/reference/kontakte
- https://docs.propstack.de/reference/aktivitaeten
- https://docs.propstack.de/reference/aktivitaeten-1
- https://docs.propstack.de/reference/webhooks
- https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
- https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/
