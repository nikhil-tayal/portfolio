# Projects Showcase — Source Content

One markdown file that holds every project I want to feature on the portfolio. Each entry is structured so a later pass (Claude, LLM, or manual) can turn the **Components** + **Connections** blocks into a draw.io architecture diagram without re-reading the repos.

Section layout per project:
- **Slug** — matches `/showcase/[slug]`
- **TL;DR** — one sentence pitch
- **Context** — my role, company, timeframe, impact numbers
- **Tech stack** — from the actual `package.json` / infra I worked on
- **Components** — actors, clients, services, data, third-party (this is what feeds a diagram)
- **Connections** — edges to draw, with real verbs/paths (not "calls"/"uses")
- **Key flows** — sequence of user actions worth showing in screenshots / Loom
- **Links** — live URL, Loom, repo references

Repos referenced (for my own bookkeeping):
- Documents/work/heli-taxii/{helitaxii-backend, helitaxii-web-frontend, helitaxii-admin-dashboard-v2, TEMP_helitaxii-app, winglet, thumbyaviation.com}
- Documents/work/Heli-backup/{helitaxii-chardham-backend, helitaxii-chardham-admin}
- Documents/work/growify/{vton-backend, vton-frontend, vton-shopify, vton-deployment, super-admin}
- Documents/work/personal/easysupply.in/{apps/api, apps/web}
- Elements/credochain/{pemant-web, pemant-website, pay-app, supplier-web-dashboard, anchor-buyer-hub, webapp, payapp-leadmanager, core-ui}
- Elements/work - Drip/{bizportal-fe, container-tracking-backend, ui-library, blog, payments-service}
- Elements/pw-live-gcc, Elements/user-notifictaion-service

---

## THUMBY AVIATION (Jun 2024 — Present · Senior Full-Stack · Contract)

### 1. helitaxii — Booking Platform
- **Slug:** `helitaxii`
- **TL;DR:** Helicopter charter + joy ride + shuttle + Chardham booking platform. One Express backend; 3 client apps; Razorpay payments; Firebase auth.
- **Context:** Designed and shipped the Central Reservation System. 500+ monthly bookings. 200+ monthly Razorpay transactions. 3 admin roles + B2B agent portal + public customer flow, all on one live inventory model.
- **Tech stack:**
  - `helitaxii-web-frontend` — React 16 SPA, Firebase Hosting, PWA, Razorpay Checkout
  - `helitaxii-admin-dashboard-v2` — React 16 + Material-UI + Ant Design + RSuite, Firebase Hosting
  - `TEMP_helitaxii-app` — React Native + Expo (iOS/Android), expo-camera for QR
  - `helitaxii-backend` — Express 4 + Mongoose 6 + MongoDB, firebase-admin, Razorpay SDK, AWS SES, Gmail SMTP (fallback), Bitly, `node-cron` for sweepers, deployed on GCP App Engine (`app-dev.yaml` / `app-prod.yaml`)
- **Components (actors → clients → backend → data → third-party):**
  - Personas: **Customer** · **Internal team** (Super Admin / Admin / Agent via Firebase custom claims) · **Ground Staff**
  - Clients: `helitaxii-web-frontend` · `helitaxii-admin-dashboard-v2` · `TEMP_helitaxii-app`
  - Backend (`helitaxii-backend`) sub-modules:
    - Booking & Schedule — `/v2/booking`, `/v2/schedule`, `/v2/scheduleHaltPrice`
    - Charter & Package — `/v2/charterBooking`, `/v2/charterSchedule`, `/v2/package`, `/v2/packageLead`
    - Admin & Reports — `/v3/admins`, `/v3/bookingReports`
    - Partner / Agent API — `/api/v1/partner/auth`, `/api/v1/partner/charter`, `/api/v1/partner/shuttle`
    - Webhooks — `POST /webhook` (Razorpay HMAC: `payment.authorized`, `invoice.paid`)
    - Email triggers — `/email/*`
  - Cron jobs (render as a sticky note inside the backend box):
    - `sanitizeBookings` — drops blocks > 10 days old
    - `resolveWebhookResults` — reconciles Razorpay
    - `sanitizeRazorpayOrphans`
  - Data: **MongoDB** — `bookings · schedules · passengers · charters · packages · agents · payments · vehicles`
  - Third-party: **Razorpay** (Checkout + Webhook), **Firebase Auth** (phone OTP + email/password + custom claims), **Firebase Storage** (payment proofs), **AWS SES** (primary email), **Gmail SMTP** (fallback), **Bitly** (short URLs)
  - Marketing pixels on web frontend only: Google Ads gtag, Meta Pixel (PageView · InitiateCheckout · Purchase)
- **Connections (edges):**
  - Customer → web frontend: `books · pays`
  - Internal team → admin dashboard: `logs in`
  - Ground staff → mobile app: `scans tickets`
  - Web → Firebase Auth: `signInWithPhoneNumber (OTP)`
  - Web → Razorpay: `checkout.razorpay.com`
  - Web → Backend: `GET /v2/schedules`, `POST /booking/joyride`, `POST /v2/booking/verify-payment`
  - Web → Google Ads / Meta Pixel: dashed
  - Admin → Firebase Auth: `email/password + custom claims`
  - Admin → Firebase Storage: `upload payment-proofs/`
  - Admin → Backend: `/v3/admins`, `/v3/bookingReports`, `/v2/charter*`, `/v2/package*`
  - Ground app → Firebase Auth: `email/password`
  - Ground app → Backend: `GET /booking?travelDate=`, `POST /booking/:id/validate`, `POST /booking/:id/onboard`
  - Backend → MongoDB: `Mongoose`
  - Backend → Firebase Auth: `verifyIdToken (Admin SDK)` — dashed
  - Backend → Firebase Storage: `signed URLs`
  - Backend → AWS SES: `sendEmail (booking, reports)`
  - Backend → Gmail SMTP: `fallback` — dashed
  - Backend → Bitly: `shorten()`
  - Razorpay → Backend: `POST /webhook (HMAC)` — inbound, dashed
  - Auth note (sticky): all client → backend calls carry `Authorization: Bearer <Firebase ID token>` + `x-helitaxii-client: browser|mobile`. Backend verifies via firebase-admin and reads custom claims to gate `/v3/admin*`.
- **Key flows:**
  1. Customer — browse schedule → book joyride → OTP login → Razorpay checkout → booking confirmation email + Bitly SMS
  2. Internal admin — create schedule → approve bookings → upload payment proof → daywise report export
  3. Ground staff — filter by date/halt → scan QR → validate → onboard passenger
  4. Agent — login via Partner API → search availability → book on behalf of customer
- **Links:** Live https://helitaxii.com · Loom https://www.loom.com/share/183a2f36b9d34fe18c4ea3539950959a

### 2. helitaxii-chardham — Chardham booking & inventory module
- **Slug:** `helitaxii-chardham`
- **TL;DR:** Replaces Excel-based Chardham ops with a real-time seat inventory + booking system, embedded as an IFrame inside the existing admin dashboard.
- **Context:** New NestJS backend + Next.js admin built in parallel to the main helitaxii platform. Launched on the v2 admin via IFrame so ops didn't need a second login.
- **Tech stack:**
  - `helitaxii-chardham-backend` — NestJS 11 + Mongoose 9 + MongoDB, `@nestjs/schedule`, `@nestjs/swagger`, firebase-admin 13, `exceljs`, `multer`, class-validator + Zod/Joi for env
  - `helitaxii-chardham-admin` — Next.js + Tailwind + shadcn/ui, IFrame postMessage auth handler, Axios instance with auto-attach token
- **Components:**
  - Personas: **Ops user** (Admin / Super Admin) · **Customer** (indirect, via offline ops)
  - Clients: `helitaxii-chardham-admin` (IFrame) · parent `helitaxii-admin-dashboard-v2` (host)
  - Backend modules: `CircuitsModule`, `TripDatesModule`, `InventoryModule`, `BookingsModule`, `AgentsModule`, `AuthModule`
  - Domain models: `Circuit · TripDate · LegInventory · Booking · SeatBlockLog · Agent`
  - Circuits seeded: `CHARDHAM · DO_DHAM_MULTI · DO_DHAM_SAME · ONE_DHAM_KH · ONE_DHAM_BD`
  - Data: **MongoDB** (separate DB from main helitaxii)
  - Cron: seat-block expiry sweeper (`blockExpiresAt < now` → release inventory), every 5 min
  - Third-party: **Firebase Auth** (token verified server-side via Admin SDK)
- **Connections:**
  - Parent dashboard → IFrame (child admin): `postMessage(firebaseIdToken)`
  - Child admin → `/api/auth/verify` (Next.js API route): verifies token before rendering
  - Child admin → Backend: `/circuits`, `/trips`, `/trips/:id/inventory`, `/bookings/block`, `/bookings/confirm`, `/agents`
  - Backend → MongoDB: atomic `findOneAndUpdate` on `LegInventory` to decrement `availableSeats`
  - Backend → Firebase Admin: `verifyIdToken` — dashed
  - Cron → MongoDB: release expired blocks + write `SeatBlockLog`
- **Key flows:**
  1. Ops creates `TripDate` → system auto-creates one `LegInventory` per leg (e.g. CHARDHAM = 5 legs)
  2. Ops blocks seats → `blockExpiresAt = now + 30 min` → cron auto-releases if unconfirmed
  3. Ops confirms booking → atomic seat decrement across every leg of the circuit, audit log written
  4. Ops freezes VIP seats (no expiry) → separate code path, manual unfreeze
- **Links:** Internal only; embedded in admin dashboard

### 3. CAMO Winglet — Aircraft Maintenance
- **Slug:** `camo-winglet`
- **TL;DR:** DGCA-compliant digital technical logbook for 12+ aircraft, replacing paper-based maintenance records.
- **Context:** Built end-to-end after the HeliTaxii launch. Template-driven inspection forms + CSV bulk import cut data entry time by 70%.
- **Tech stack:**
  - `winglet` — React Router v7 (SSR) + TypeScript + MongoDB + shadcn/ui, Vite, Biome, PM2 on EC2 (`ap-south-1`)
  - Build published locally and `rsync`'d to EC2 (building on EC2 hangs)
  - HMR WebSocket on `PORT + 10000` for dev; prod runs under PM2 via `ecosystem.config.js`
- **Components:**
  - Personas: **Pilot / Engineer** (fills logbook entries) · **CAMO manager** (reviews, signs) · **Admin** (aircraft + template setup)
  - Client + SSR server: single React Router v7 app (monolith — client and server code share `shared/`)
  - Data: **MongoDB** — `aircraft · inspections · logbookEntries · templates · users`
  - Infra: **EC2 (ap-south-1)** + **PM2** + Nginx (reverse proxy)
- **Connections:**
  - Pilot → Winglet SSR: `POST /logbook/:aircraftId/entry` (form submit — React Router action)
  - CAMO manager → Winglet SSR: `review & sign` entries, export CSV
  - Admin → Winglet SSR: create `template` (inspection form schema), bulk-import fleet via CSV
  - SSR server → MongoDB: Mongoose/native driver
  - CI/CD: local `pnpm build` → `rsync ./build/` → `pm2 restart winglet` over SSH
- **Key flows:**
  1. Admin defines inspection template (field types, checklists)
  2. Engineer logs flight hours + inspection result against template
  3. Manager cross-signs; system locks the entry (immutable for DGCA audit)
  4. CSV export of full logbook per aircraft for compliance review
- **Links:** Internal; deployed at `ec2-65-2-105-124.ap-south-1.compute.amazonaws.com`

### 4. thumbyaviation.com — Marketing site
- **Slug:** `thumbyaviation`
- **TL;DR:** Astro + React marketing site for Thumby Aviation; scrapes legacy WordPress content into MDX via a one-off `tsx` script.
- **Tech stack:** Astro 5 · React 19 · Tailwind 3 · `@tailwindcss/typography` · Firebase Hosting (staging + prod), content sourced via `scripts/scrape-wordpress.ts` (cheerio + axios)
- **Components:**
  - Client: static Astro site served from Firebase Hosting (two channels: `staging`, `prod`)
  - Scraper: offline `npm run scrape` pulls WP posts, writes to `scraped-content/`
- **Connections:**
  - Visitor → Firebase Hosting: static HTML/CSS/JS
  - `npm run deploy:staging/prod` → Firebase Hosting (Astro build → deploy)

---

## GROWIFY / LOOKIFY (2024 — Present · personal SaaS)

### 5. Growify / Lookify — AI Virtual Try-On
- **Slug:** `growify` (also called "Lookify" internally)
- **TL;DR:** AI-powered virtual try-on + home-decor visualization platform. 4 repos: standalone web app + Shopify embed + NestJS backend + RunPod GPU runner. 20+ merchants, 1,000+ monthly sessions, 500+ images/month.
- **Tech stack:**
  - `vton-backend` — NestJS 11 + TypeScript 5.7 + Mongoose 8 + MongoDB, DigitalOcean Spaces (S3), Razorpay, Passport (Google OAuth), JWT, bcrypt, `sharp` for watermarking
  - `vton-frontend` — Next.js 15, standalone web app outside Shopify
  - `vton-shopify` — Next.js 15 (Pages Router) + Preact theme extension + Polaris v13 + Tailwind; Shopify App Bridge via CDN script; session tokens monkey-patched into `window.fetch`
  - `vton-deployment` — Dockerized ComfyUI on RunPod serverless GPUs, FLUX + CatVTON LoRA, custom Python handler for queuing + watermarking
  - `super-admin` — Next.js 15 + Tailwind admin console
- **Components:**
  - Personas: **Shopify merchant** · **Storefront shopper** · **Standalone web user** · **Growify super admin**
  - Clients:
    - `vton-shopify` **Admin App** (embedded in Shopify admin iframe, Polaris)
    - `vton-shopify` **Theme Extension** (Preact IIFE bundled via esbuild; renders try-on button on storefront product pages)
    - `vton-frontend` (standalone VTON + home-decor web app)
    - `super-admin` (internal ops console)
  - Backend (`vton-backend`) modules: `vton`, `user`, `store`, `payment`, `workflow`, `pages`
  - Generic repository pattern: `BaseRepository<T>` with `list / fetchOne / create / findOneAndUpdate / count / aggregate`
  - VTON pipeline (async job):
    1. `POST /vton/run` → credit check ≥ 10 → builds ComfyUI workflow JSON (replacing `{{K_SAMPLER_SEED}}`, `{{FLUX_GUIDANCE}}`, etc.) → submit to RunPod async endpoint
    2. Client polls `GET /vton/status/:transactionId`
    3. On `COMPLETED` → `sharp` watermark (`watermark.png` at project root) → upload to DO Spaces → deduct 10 credits
  - Data: **MongoDB (`vton`)** — `users · stores · transaction_history · workflows · razorpay_orders · razorpay_payments`
  - Object storage: **DigitalOcean Spaces** — folders `MODEL_IMG/ · GARMENT_IMG/ · OUTPUT_IMG/ · USER_IMG/ · MISC/` (all `public-read`)
  - Third-party: **RunPod** (serverless GPU), **Razorpay** (Checkout + HMAC webhook verification for billing), **Google OAuth** (Passport), **Shopify** (Admin GraphQL, App Proxy, theme extension)
  - Sessions: encrypted JSON files in `tmp/sessions/` via `cryptr` (Shopify tokens) — no Shopify DB
- **Connections:**
  - Shopify storefront → Theme extension: embedded `<script>` on product page
  - Theme extension → `vton-shopify` proxy: `/api/proxy?endpoint=vton/run`
  - Shopify admin → `vton-shopify` (iframe, App Bridge): merchant onboarding, credit purchase, analytics
  - `vton-shopify` → `vton-backend`: all traffic via `/api/proxy`, `/api/upload` (50MB via formidable), `/api/graphql` (Shopify Admin GraphQL proxy)
  - Standalone users → `vton-frontend`: signup (email/pw OR Google OAuth popup)
  - `vton-frontend` → `vton-backend`: `/user/*`, `/vton/run`, `/vton/status/:id`, `/payment/*`
  - `vton-backend` → MongoDB: Mongoose
  - `vton-backend` → RunPod: async submit + poll via `src/services/runpod.service.ts`
  - `vton-backend` → DigitalOcean Spaces: S3-compatible PUT/GET (`src/services/digitalocean.service.ts`)
  - `vton-backend` → Razorpay: create order + verify payment signature
  - Razorpay → `vton-backend`: `POST /payment/webhook` (HMAC) — inbound dashed
  - `super-admin` → `vton-backend`: store + user management, credit top-ups
  - `vton-deployment` (RunPod Docker image) ← `vton-backend` submits job payload with placeholders filled
- **Key flows:**
  1. Shopper on storefront — pick garment → upload model photo → try-on result → watermarked image
  2. Merchant — install Shopify app → OAuth onboarding → buy credits (Razorpay) → configure default model → view transaction history
  3. Standalone user — signup → free credits → upload garment + model → run VTON job → download watermarked result
  4. Super admin — impersonate store → refund credits → curate workflows
- **Links:** Live https://lookify.in · (Shopify app listing pending)

---

## EASYSUPPLY.in (2024 — Present · personal SaaS)

### 6. EasySupply — Shipping Label Automation
- **Slug:** `easysupply`
- **TL;DR:** Automates shipping label parsing across 5 courier PDFs for Indian D2C sellers. 50MB uploads → split by courier + store, GridFS-stored, analytics dashboard over 1,000+ daily orders.
- **Tech stack:**
  - `apps/api` — Fastify + MongoDB (GridFS bucket `pdfs`) + `@fastify/jwt`, tsx watch in dev, Railway deploy
  - `apps/web` — React + Vite + Tailwind, React Router, custom design tokens (accent `#D4622B`, Outfit + IBM Plex Mono)
  - pnpm workspaces monorepo
- **Components:**
  - Personas: **D2C seller** (Meesho, Shopify, Flipkart) · **EasySupply admin** (me)
  - Client: Vite React SPA — routes `/` (public landing), `/dashboard` (upload), `/jobs`, `/analytics`, `/settings`
  - Backend (Fastify) — `/api/auth/*` (public), `/api/jobs` (protected upload), `/api/labels/*`, `/api/analytics/*`
  - Processing pipeline (async):
    1. `POST /api/jobs` merges multi-PDFs → save original to GridFS → insert Job doc → return
    2. `processJobInBackground()` — extracts text per page → `detectCourier()` (string match: Delhivery · Shadowfax · Valmo · XpressBees · Ecom Express) → regex-parse label fields → group by courier+store → create sorted split PDFs → save to GridFS → insert Label docs
  - Data: **MongoDB** — `users · jobs · labels (indexes: userId, jobId, courier, state, city, storeName)`; **GridFS bucket `pdfs`** (keyed as `{userId}/{filename}`)
  - Third-party: **Fashn.ai ML API** (label classification assist; env `FASHN_API_KEY`)
  - Infra: **Railway** (ephemeral fs — that's why everything is in GridFS, not local disk)
- **Connections:**
  - Seller → Web SPA: login / upload PDFs / view analytics
  - Web → Fastify: `POST /api/auth/login` → JWT, `POST /api/jobs` (multipart), `GET /api/labels?courier=&state=`, `GET /api/analytics/summary`
  - Fastify → MongoDB: data writes
  - Fastify → GridFS: streaming PDF upload/download
  - Background processor → Fashn.ai: (optional) label classification
  - All DB queries filter by `userId` (data isolation enforced in middleware)
- **Key flows:**
  1. Seller uploads 500 Meesho labels → backend merges → detects couriers → splits into "Delhivery-StoreA.pdf" etc → seller downloads per-courier file for warehouse
  2. Analytics: MongoDB aggregation over `labels` — by courier / by state / by payment type / by store
  3. Settings: seller configures `storeNames` → future uploads prefer substring match over regex fallback
- **Links:** https://easysupply.in

---

## PHYSICSWALLAH (May 2023 — Jun 2024 · SDE-2)

### 7. PW Gulf — Regional Edtech App
- **Slug:** `pw-gulf`
- **TL;DR:** Regional spin-off of PW Live for the Gulf market. Next.js + Apollo client. 25% DAU growth in 3 months across 8 modules.
- **Tech stack:** Next.js 12 · React 18 · Apollo Client 3 + GraphQL · TanStack Query · Tailwind CSS · Sentry · Firebase (auth / analytics) · i18next (multilingual) · video.js + videojs-contrib-eme (DRM) · socket.io-client · Lottie · Razorpay via SDK
- **Components:**
  - Persona: **Student** (Gulf) · **Teacher / Content ops** (admin via separate repo)
  - Client: `pw-live-gcc/site` (Next.js 12, Pages Router)
  - API layer: GraphQL (Apollo) + REST (axios) → PW's monolith + microservices
  - Data feeding: PW's LMS (courses, tests, content), DRM-protected video streams
  - Third-party: **Firebase** (auth), **Sentry**, **Razorpay** (subscription payments), **Video CDN** (DRM keys via EME)
- **Connections:**
  - Student → `site`: browse courses → buy subscription → watch lectures → take tests
  - `site` → Firebase Auth: login / OTP
  - `site` → Apollo GraphQL gateway: course queries, progress mutations
  - `site` → REST endpoints: payments, content metadata
  - `site` → Razorpay: Checkout modal
  - Razorpay → backend: webhook (not in this repo)
  - `site` → Video CDN (DRM): `videojs-contrib-eme` for Widevine / FairPlay
- **Key flows:**
  1. Student signs up (OTP) → browses GCC-localized content (Arabic + English via i18next) → subscribes via Razorpay
  2. Watches DRM-protected lecture → progress synced over socket.io
  3. Takes test → auto-graded → progress dashboard
- **Links:** (internal)

### 8. Notification Microservice
- **Slug:** `notification-microservice`
- **TL;DR:** Centralized notification microservice for PW's ecosystem. NestJS + MongoDB + Redis + Kafka consumers + AWS SES. Cut delivery time by 30% and server load by 40%.
- **Tech stack:** NestJS 10 · Mongoose 8 · MongoDB · ioredis · kafkajs · `@aws-sdk/client-ses` · EJS templates · pino logger · async-retry
- **Components:**
  - Producers: upstream services publishing notification events to Kafka
  - Service (`user-notifictaion-service`) modules: `notification · template · consumers · guards · client`
  - Channels: **Email** (AWS SES), **In-app / Push** (via client module)
  - Data: **MongoDB** — `templates · notifications · deliveryLogs`
  - Cache/queue: **Redis** (rate limiting, dedupe), **Kafka** (event ingestion)
  - Third-party: **AWS SES**, templating via **EJS**
- **Connections:**
  - Upstream services → Kafka (topic: `notification.*`)
  - Service Kafka consumer → MongoDB (persist + dedupe) → Redis (rate-limit check) → SES / Push provider
  - Admin HTTP API → `POST /notification/send`, `POST /template` (guarded)
  - Service → external services (EJS-rendered templates sent via SES)
- **Key flows:**
  1. Upstream emits `user.payment.success` event → consumer picks up → loads template → renders EJS → sends via SES → logs delivery
  2. Retry with exponential backoff via `async-retry` on transient SES failures
- **Links:** (internal)

---

## DRIP CAPITAL (Apr 2021 — May 2023 · Software Engineer)

### 9. Trade360 — Cross-border Trade Collaboration
- **Slug:** `trade360`
- **TL;DR:** Collaboration portal for 200+ exporters + importers. Document sharing, 15+ API integrations, Auth0 SSO.
- **Tech stack:** Next.js 12 · React 18 · Redux Toolkit · TypeScript · Auth0 (`@auth0/nextjs-auth0`) · Sentry · Mixpanel · Formik + Yup · `@dripcapital/dripui` (internal component library) · Netlify / Docker deploy
- **Components:**
  - Personas: **Exporter** · **Importer** · **Drip ops**
  - Client: `bizportal-fe` (Next.js 12)
  - Component lib: `@dripcapital/dripui` (MUI 5-based, MDX docs on Netlify, rollup bundled, published to internal npm / yalc for local dev)
  - Backend: Drip's internal services (not in this repo)
  - Third-party: **Auth0** (SSO), **Mixpanel** (analytics), **Sentry** (error monitoring), **reCAPTCHA**
- **Connections:**
  - User → `bizportal-fe`: Auth0 login → dashboard
  - `bizportal-fe` → Auth0: OIDC flow
  - `bizportal-fe` → Drip backend: REST (axios with async-mutex for token refresh), 15+ integration endpoints (container tracking, invoices, KYC, trade docs, etc.)
  - `bizportal-fe` → Mixpanel: event tracking
  - `bizportal-fe` → Sentry: browser + server errors
  - CI/CD: Docker image per env (`dev · qe · staging · production`), env-encrypted `.env` via custom scripts
- **Key flows:**
  1. Exporter onboards with KYC → uploads shipment docs → Drip assigns financing
  2. Importer confirms receipt → payment released
  3. Both parties track in real-time (container tracking integration)
- **Links:** (internal; https://bizportal.dripcapital.com)

### 10. Drip Switch — USD Transaction Portal
- **Slug:** `drip-switch`
- **TL;DR:** Fintech portal for cross-border USD transactions. Processed $2M+ in 2 months, 40% improvement in payment efficiency.
- **Tech stack:** React.js + TypeScript + Redux (same Next.js / DripUI stack as Trade360; shared UI library)
- **Components:**
  - Personas: **US-based buyer / payer** · **Drip finance ops**
  - Client: payments module within bizportal (Next.js)
  - Backend: Drip's USD payments microservice (ACH + Wire)
  - Third-party: **Bank partners** (USD rails), **Auth0**
- **Connections:**
  - Payer → Portal: login → create USD payment → confirm
  - Portal → Payments backend: `POST /payments/initiate`, `GET /payments/:id`
  - Backend → Bank partner APIs
- **Key flows:**
  1. Payer authorizes payout → backend initiates wire/ACH → webhook on settlement
  2. Finance ops reviews failed payments and retries

### 11. Container Tracker
- **Slug:** `container-tracker`
- **TL;DR:** Real-time container tracking app. 10,000+ monthly API requests across 3 shipping corridors. Scrapes 10+ carrier portals via Puppeteer with stealth plugin.
- **Tech stack:** `container-tracking-backend` — NestJS 8 · Mongoose 6 · MongoDB · `puppeteer` + `puppeteer-extra` + `puppeteer-extra-plugin-stealth` · `jsdom` · `user-agents` · `xvfb` (headful browser in Docker), Newrelic APM
- **Components:**
  - Personas: **Exporter / Importer** (consuming via Trade360) · **Ops** (monitoring scraper health)
  - Consumer: Trade360 frontend
  - Service: `container-tracking-backend` NestJS API + Puppeteer pool
  - Scraper helpers: one adapter per carrier (Maersk, MSC, Hapag-Lloyd, CMA CGM, etc.)
  - Data: **MongoDB** — `containers · events · carrierCache`
  - Third-party: **Searates API** (fallback / enrichment — see `searates.json`), **Newrelic** (APM)
- **Connections:**
  - Trade360 → `container-tracking-backend`: `GET /tracking/:containerNumber?carrier=maersk`
  - Backend → Puppeteer pool → carrier website (headless Chrome with stealth + rotating UAs) → parse via jsdom
  - Backend → Searates: `GET /tracking` fallback when scraper is rate-limited
  - Backend → MongoDB: cache last-known state + event timeline
  - Swagger UI at `/docs` for internal testing
- **Key flows:**
  1. User enters container number → backend checks cache → if stale, dispatches Puppeteer job → parses HTML → normalizes events → caches + returns
  2. Ops dashboard shows scraper success rate per carrier (Newrelic custom events)
- **Links:** (internal)

### 12. Drip UI Library
- **Slug:** `drip-ui`
- **TL;DR:** Internal React component library published to npm (`@dripcapital/dripui`) and adopted across 4 teams. Storybook + MDX docs on Netlify.
- **Tech stack:** MUI 5 · Emotion · `@mui/x-date-pickers` · Rollup (CJS + ESM + dts) · Storybook 6 · TypeScript · yalc for local dev
- **Components:**
  - Consumer apps: `bizportal-fe`, other Drip frontends
  - Library: `dripui` — built via Rollup → `dist/cjs`, `dist/esm`, `dist/index.d.ts`
  - Docs: Storybook → Netlify (`drip-ui.netlify.app`)
- **Connections:**
  - Developers → Storybook on Netlify: browse components
  - Consumer apps → npm: `yarn add @dripcapital/dripui`
  - Local dev → `yalc publish` / `yalc add` from consumer
- **Key flows:**
  1. Design hands off token → PR against `dripui` → Storybook preview on Netlify → merge → semver release → consumer app bumps
  2. Pre-commit: ESLint + Prettier + branch-name check

---

## CREDOCHAIN (Jul 2019 — Apr 2021 · React.js Developer)

### 13. PEMANT — Digital Credit Line
- **Slug:** `pemant`
- **TL;DR:** Digital credit line web app for MSMEs. 7,000+ users, 3 distinct role flows (borrower, anchor, underwriter). React web + React Native mobile.
- **Tech stack:**
  - `pemant-web` — React 18 + TypeScript · MUI 5 · react-router-dom 6
  - `pay-app` (RN) — React Native 0.73 · Redux · `react-native-razorpay` · `react-native-pdf` · Bugsnag · native-base 3 · OTP via `@twotalltotems/react-native-otp-input` · SMS autofill
  - `pemant-website` — Netlify-hosted marketing site
  - `core-ui` — internal shared component library
- **Components:**
  - Personas: **Borrower (MSME owner)** · **Anchor (supplier corporate)** · **Underwriter**
  - Clients: `pemant-web` (React Web), `pay-app` (React Native Android), `pemant-website` (marketing)
  - Backend: Credochain's API at `https://appd.credochain.com`
  - Third-party: **Razorpay** (repayments via RN SDK), **Bugsnag** (crash reporting), **KYC / credit bureau** APIs, **OTP gateway**
  - Data: shared with other credochain products
- **Connections:**
  - Borrower (mobile) → `pay-app`: onboarding → KYC upload → credit offer → accept → repayment
  - `pay-app` → Credochain API: auth/OTP → apply loan → fetch offer → repay
  - `pay-app` → Razorpay: `react-native-razorpay` checkout for EMI
  - Web borrower → `pemant-web`: dashboard view (read-only)
  - Anchor → `pemant-web` / anchor-buyer-hub: view invoices tied to their suppliers
- **Key flows:**
  1. MSME applies via mobile → OTP + KYC + bank statement → credit decision (2,500+ underwriter ops) → loan disbursed
  2. Repayment via Razorpay RN SDK → backend reconciles

### 14. Underwriter Dashboard
- **Slug:** `underwriter-dashboard`
- **TL;DR:** Real-time credit-decisioning dashboard for 2,500+ underwriter sessions. Highcharts-powered visualizations.
- **Tech stack:** React.js · Redux · Highcharts · internal REST API
- **Components:**
  - Persona: **Underwriter** · **Credit manager**
  - Client: dashboard in `webapp` / `pemant-web`
  - Backend: credit engine + rules service
- **Connections:**
  - Underwriter → Dashboard: list pending applications → drill in → view visualized bureau data + bank-statement analysis
  - Dashboard → Backend: fetch applicant bundle, submit decision with reason codes
- **Key flows:**
  1. Application hits queue → underwriter opens → reviews bureau + bank analysis → approves/rejects → decision recorded

### 15. Anchor Buyer Hub (bonus)
- **Slug:** `anchor-buyer-hub`
- **TL;DR:** Next.js 14 portal for anchor corporates (buyers) to manage their supplier-financing pipeline — invoice uploads, supplier-wise exposure, CSV exports.
- **Tech stack:** Next.js 14 · Redux Toolkit · Ant Design 5 · TanStack Table 8 · crypto-js (request signing) · env-cmd for prod/dev split
- **Connections:** Anchor logs in → uploads buyer invoices (CSV / manual) → system maps to suppliers → ops triggers discounting → anchor views settled invoices

---

## CYBER GROUP (Jan 2019 — Jul 2019 · Trainee)

### 16. HRMS Mobile App
- **Slug:** `hrms-mobile-app`
- **TL;DR:** First professional RN app. HR mobile app for a 50-person company. Biometric auth, push notifications, leave + attendance flows. 8-person cross-functional team.
- **Tech stack:** React Native · Redux · FCM push · biometric auth (`react-native-touch-id`)
- **Connections:**
  - Employee → App: biometric login → punch in/out → apply leave → view payslip
  - App → HR backend: REST JSON
  - HR admin → Web HRMS portal (built by other team member)
- **Key flows:**
  1. Employee opens app → Touch ID → attendance punch via geofence
  2. Leave request → manager gets FCM push → approves → employee notified

---

## CROSS-CUTTING NOTES (for diagram consistency)

### Suggested palette (reusable across diagrams)
- **Cool blue-grey** — client apps / web / mobile
- **Warm yellow** — backend services
- **Green** — databases / storage
- **Muted coral** — third-party services
- **Dark slate** — personas / actors
- Avoid bright default primaries (the #1 AI-tell). Prefer hand-picked muted tones.

### Shape conventions
- Personas → actor figure
- Web / mobile clients → rounded rectangles
- Backend → large container (with sub-modules listed inline)
- Database → `cylinder3`
- Third-party services → `cloud`
- Cron jobs, auth callouts → `note` (sticky)
- Dashed boundary around third-party group

### Edge labeling conventions
- Real HTTP verbs + paths (`POST /v2/booking/verify-payment`), not "calls" / "uses"
- Webhooks are drawn inbound (different colour) and dashed
- SDK-only calls (Firebase Admin, AWS SDK) are dashed with the SDK name in the label

### Auth models (call these out as sticky notes where relevant)
- **Helitaxii:** `Authorization: Bearer <Firebase ID token>` + `x-helitaxii-client: browser|mobile`
- **Chardham admin:** IFrame parent passes Firebase token via `postMessage`, Next.js child verifies via `/api/auth/verify`
- **Lookify Shopify:** App Bridge monkey-patches `window.fetch` to inject session tokens on `/api/*`
- **Lookify backend:** JWT (no expiry) + Passport Google OAuth; bcrypt passwords (10 salt rounds)
- **EasySupply:** `@fastify/jwt`, all routes except `/api/auth/*` protected; `userId` scopes every query
- **Drip bizportal:** Auth0 OIDC; refresh tokens guarded by async-mutex

### Showcase slug map (sync with `lib/data.ts`)
| Slug | Currently in data.ts | Needs adding |
|---|---|---|
| `helitaxii` | ✅ | — |
| `camo-winglet` | ✅ (stub only) | flesh out |
| `ground-staff-app` | ✅ (stub) | keep (bundled in helitaxii) |
| `helitaxii-chardham` | ❌ | add under Thumby |
| `thumbyaviation` | ❌ | optional |
| `growify` | projects list only | promote to showcase under personal / standalone entry |
| `easysupply` | projects list only | same |
| `pw-gulf` | ✅ (stub) | flesh out |
| `notification-microservice` | ✅ (stub) | flesh out |
| `trade360` | ✅ (stub) | flesh out |
| `drip-switch` | ✅ (stub) | flesh out |
| `container-tracker` | ✅ (stub) | flesh out |
| `drip-ui` | ❌ | add |
| `pemant` | ✅ (stub) | flesh out |
| `underwriter-dashboard` | ✅ (stub) | flesh out |
| `anchor-buyer-hub` | ❌ | optional |
| `hrms-mobile-app` | ✅ (stub) | flesh out |

### Next step — workflow SVG generation
Each project's **Components + Connections** block is rendered as an SVG at `public/showcases/<slug>/workflow.svg` by `scripts/generate-workflow-svgs.js`. Run `node scripts/generate-workflow-svgs.js` to regenerate after editing the script.
