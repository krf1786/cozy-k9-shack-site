# Cozy K9 Shack — Website

Marketing site for [Cozy K9 Shack](https://www.cozyk9shack.com), an in-home dog
grooming business owned by Jaclyn Rischman in Mount Holly, NC.

Built with React + Vite (plain JavaScript, no TypeScript). Six pages: Home,
Services, About, Pricing, Showcase, Contact. All styling lives in one CSS file
(`src/styles.css`) — no CSS framework.

This file is the handoff document: everything needed to develop, deploy, and
administer the site is written down here.

---

## Accounts & services (who holds the keys)

| Service | What it does | Account |
|---|---|---|
| **GitHub** | Source code, deploy trigger | `krf1786/cozy-k9-shack-site` |
| **Hostinger VPS** | Hosting — runs the Node server (see below) | krf1786's Hostinger account |
| **Cloudflare** | DNS only (proxied in front of the VPS) | krf1786@gmail.com |
| **Network Solutions** | Domain registrar for cozyk9shack.com | (renewals happen here) |
| **Google Workspace** | Email — jaclyn@cozyk9shack.com | admin via Network Solutions purchase |
| **Web3Forms** | Contact form → email delivery | free plan, 250 submissions/month |

The domain is **registered** at Network Solutions, but its **nameservers point
to Cloudflare**, so all DNS changes are made in the Cloudflare dashboard —
changes made in Network Solutions' DNS panel have no effect. Cloudflare no
longer hosts the site itself (that moved to the Hostinger VPS below); it's
kept purely as the DNS/CDN layer in front of it, proxying (orange-cloud)
`cozyk9shack.com` and `www` to the VPS's IP.

---

## Run locally

```bash
npm install
npm run dev        # → http://localhost:5173
```

## Build

```bash
npm run build      # → dist/
npm run preview    # preview the production build
```

---

## Hosting & deployment (Hostinger VPS)

The site used to deploy as a Cloudflare Worker (`wrangler.jsonc` and
`worker/index.js` are kept in the repo for reference / rollback, but are no
longer used). It now runs as a plain **Node/Express server on a Hostinger
VPS**, with Cloudflare in front purely for DNS + proxying:

- [`server/index.js`](server/index.js) serves the Vite build (`dist/`) as a
  single-page app (unknown paths fall back to `index.html`, same behavior as
  the old Worker's `single-page-application` setting) and handles the
  `/api/upload` endpoint (see below).
- [`deploy/nginx.conf`](deploy/nginx.conf) — Nginx reverse-proxies HTTPS
  traffic to the Node server on `127.0.0.1:3000`.
- [`deploy/ecosystem.config.cjs`](deploy/ecosystem.config.cjs) — pm2 keeps
  the Node process alive and restarts it on crash/reboot.
- [`deploy/deploy.sh`](deploy/deploy.sh) — pulls, installs, builds, and
  reloads on the VPS. Run it by hand over SSH, or let
  [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) run it
  automatically on every push to `main` (needs SSH secrets added to the repo
  first — see comments in that file).

Manual deploy, from the VPS:

```bash
cd ~/cozy-k9-shack-site
./deploy/deploy.sh
```

### DNS records (managed in Cloudflare)

| Type | Name | Value | Purpose |
|---|---|---|---|
| A | cozyk9shack.com | *VPS IP address* (proxied, orange cloud) | site |
| CNAME | www | cozyk9shack.com (proxied, orange cloud) | site |
| MX | @ | aspmx.l.google.com (pri 1) | Google Workspace mail |
| MX | @ | alt1/alt2.aspmx.l.google.com (pri 5) | Google Workspace mail |
| MX | @ | alt3/alt4.aspmx.l.google.com (pri 10) | Google Workspace mail |
| TXT | @ | `v=spf1 include:_spf.google.com ~all` | SPF for outgoing mail |

SSL/TLS mode in Cloudflare is set to **Full (strict)** — the VPS presents a
free Cloudflare Origin Certificate (15-year validity, no renewal cron
needed; see comments in `deploy/nginx.conf` for where it goes).

If the site ever moves hosts again: update the A/CNAME records above to point
at the new host. Leave the MX/TXT records alone or email breaks.

---

## Email

`jaclyn@cozyk9shack.com` is a Google Workspace mailbox. On any device, sign
into the **Gmail app** with that address — no IMAP/SMTP setup needed. The MX
records above route the domain's mail to Google; they're already verified and
working.

---

## Contact form (Web3Forms)

The form in [`src/pages/Contact.jsx`](src/pages/Contact.jsx) POSTs to
`https://api.web3forms.com/submit` with an access key (the `WEB3FORMS_KEY`
constant at the top of the file). Submissions are emailed to the address the
key was created for. Notes:

- The access key is public by design (it ships in the client bundle); it can
  only be used to *send* submissions, not read anything.
- Free plan allows 250 submissions/month.
- A hidden `botcheck` checkbox acts as the spam honeypot.
- To change where submissions go: log into web3forms.com, or generate a new
  key for a different email and swap the constant.

---

## Project structure

```
src/
├── App.jsx              # Router & layout (add new routes here)
├── main.jsx             # React entry
├── styles.css           # ALL styling, incl. responsive breakpoints
├── components/
│   ├── Header.jsx       # Nav links defined once here, shared with Footer
│   ├── Footer.jsx
│   └── CtaBanner.jsx
└── pages/
    ├── Home.jsx         # Hero slideshow slides defined at top of file
    ├── Services.jsx
    ├── About.jsx
    ├── Pricing.jsx      # Price tables are plain arrays at top of file
    ├── Showcase.jsx     # Fetches public/gallery/manifest.json at runtime
    ├── Upload.jsx       # The hidden /upload page
    └── Contact.jsx      # Web3Forms integration

public/                  # Served as-is at site root
├── logo.jpg / logo.png  # Circular logo (header/footer + favicon)
├── hero-dog.png         # Slide 1 of the hero slideshow
├── photo1..3-before/after.jpg   # Hero slideshow before/after pairs
├── jaclyn-photo.jpeg    # Owner photo (About page)
└── gallery/             # Showcase photos + manifest.json — drop new
                          # photos here (URL path /gallery/, kept distinct
                          # from the /showcase page route)

server/
└── index.js             # Node/Express server (see Hosting section above)

scripts/
├── showcase-manifest.mjs         # Shared manifest read/write logic
└── build-showcase-manifest.mjs   # Regenerates the manifest (predev/prebuild)

deploy/                   # Nginx config, pm2 config, redeploy script — see
                          # Hosting section above

worker/                   # OLD Cloudflare Worker — unused, kept for
                          # reference only
```

---

## Owner photo uploads (the /upload page)

Jaclyn can add Showcase photos herself — no developer needed:

1. Go to **cozyk9shack.com/upload** (hidden page; also reachable via the faint
   📷 icon at the bottom of the footer).
2. Enter the upload password, tap **Choose Photos**, pick one or more.
3. Each photo is resized/compressed *in the browser* (1500px wide, JPEG 82%,
   orientation fixed), then sent to the site's Node server, which writes it
   straight to disk as the next `photoN.jpg` and updates the photo manifest.
   The VPS has a real, persistent filesystem, so this is immediate — no
   rebuild, no waiting. It's written to both the live `dist/gallery/` folder
   (so it shows up right away) and the source `public/gallery/` folder (so
   it isn't lost on the next deploy).

The server side lives in [`server/index.js`](server/index.js) (the
`/api/upload` endpoint) and [`scripts/showcase-manifest.mjs`](scripts/showcase-manifest.mjs)
(the manifest logic it shares with the build step). It needs one setting, in
a `.env` file on the VPS (gitignored — see `.env.example`):

- `UPLOAD_PASSWORD` — any password you choose; give it to Jaclyn.

Until it's set, the upload page returns "Uploads are not configured yet."
For local testing, copy `.env.example` to `.env`, fill it in, and run
`npm run build && npm start`.

---

## Common content edits

**Add photos to the Showcase page** — use the /upload page above (instant,
no rebuild), or by hand: drop image files (`.jpg`, `.jpeg`, `.png`, `.webp`,
`.gif`) into `public/gallery/`, then run `npm run dev` or `npm run build`
locally to regenerate `manifest.json`, and commit/push both. Every photo in
that folder appears automatically, sorted by filename. A filename containing
"before" or "after" (e.g. `bella-before.jpg`) gets a Before/After label.
Resize photos to ~1500px on the long edge first — phone originals are 4–6 MB
and slow the page.

**Change the hero slideshow** — edit the `slides` array at the top of
`src/pages/Home.jsx`. Slides with a `label` get the Before/After pill and are
shifted up slightly (`object-position`) to keep dogs' faces in frame.

**Prices / services / testimonials** — each lives in a plain array at the top
of its page component. Edit the array, push.

**Nav links** — one array (`navLinks`) at the top of
`src/components/Header.jsx`, reused by the footer.

**Phone / address / email** — appear in `CtaBanner.jsx`, `Footer.jsx`,
`About.jsx`, `Contact.jsx`, `Home.jsx`, and `Pricing.jsx`. Search the repo for
`2019626176` or `104 Bell` to find every instance before changing them.

---

## Brand

- **Sage green** `#8aa888` — buttons, accents, footer
- **Blush pink** `#e9b4b8` — Book Appointment button, why-choose icons
- **Cream** `#fbf7f2` — section backgrounds
- **Charcoal** `#3a3a3a` — body text
- **Fonts** — Playfair Display (headlines) + Inter (body), loaded from Google
  Fonts in `index.html`

All colors are CSS custom properties at the top of `src/styles.css`.
