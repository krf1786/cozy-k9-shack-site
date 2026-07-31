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
| **Cloudflare** | Hosting (Workers) + DNS | krf1786@gmail.com |
| **Network Solutions** | Domain registrar for cozyk9shack.com | (renewals happen here) |
| **Google Workspace** | Email — jaclyn@cozyk9shack.com | admin via Network Solutions purchase |
| **Web3Forms** | Contact form → email delivery | free plan, 250 submissions/month |

The domain is **registered** at Network Solutions, but its **nameservers point
to Cloudflare**, so all DNS changes are made in the Cloudflare dashboard —
changes made in Network Solutions' DNS panel have no effect.

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

## Hosting & deployment (Cloudflare Workers)

The site deploys as a **Cloudflare Worker serving static assets** — config in
[`wrangler.jsonc`](wrangler.jsonc):

- `assets.directory: ./dist` — serves the Vite build output
- `not_found_handling: "single-page-application"` — all unknown paths serve
  `index.html` so React Router handles routing (do **not** add a `_redirects`
  file; that's a Netlify concept and caused an infinite-loop deploy failure)

**Deploys are automatic.** The Cloudflare project is connected to the GitHub
repo: every push to `main` triggers a build (`npm run build`) and deploy
(`npx wrangler deploy`). A deploy takes about a minute. There is no staging
environment — `main` is production.

Manual deploy, if ever needed:

```bash
npm run build && npx wrangler deploy
```

### DNS records (managed in Cloudflare)

| Type | Name | Value | Purpose |
|---|---|---|---|
| Worker | cozyk9shack.com | cozy-k9-shack-site | site (custom domain) |
| Worker | www | cozy-k9-shack-site | site (custom domain) |
| MX | @ | aspmx.l.google.com (pri 1) | Google Workspace mail |
| MX | @ | alt1/alt2.aspmx.l.google.com (pri 5) | Google Workspace mail |
| MX | @ | alt3/alt4.aspmx.l.google.com (pri 10) | Google Workspace mail |
| TXT | @ | `v=spf1 include:_spf.google.com ~all` | SPF for outgoing mail |

If the site ever moves hosts: delete the two Worker custom-domain records and
point A/CNAME records at the new host. Leave the MX/TXT records alone or email
breaks.

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
├── assets/
│   └── showcase/        # Showcase photos — drop new photos here
├── components/
│   ├── Header.jsx       # Nav links defined once here, shared with Footer
│   ├── Footer.jsx
│   └── CtaBanner.jsx
└── pages/
    ├── Home.jsx         # Hero slideshow slides defined at top of file
    ├── Services.jsx
    ├── About.jsx
    ├── Pricing.jsx      # Price tables are plain arrays at top of file
    ├── Showcase.jsx     # Auto-loads every image in assets/showcase/
    └── Contact.jsx      # Web3Forms integration

public/                  # Served as-is at site root
├── logo.jpg / logo.png  # Circular logo (header/footer + favicon)
├── hero-dog.png         # Slide 1 of the hero slideshow
├── photo1..3-before/after.jpg   # Hero slideshow before/after pairs
└── jaclyn-photo.jpeg    # Owner photo (About page)
```

---

## Owner photo uploads (the /upload page)

Jaclyn can add Showcase photos herself — no developer needed:

1. Go to **cozyk9shack.com/upload** (hidden page; also reachable via the faint
   📷 icon at the bottom of the footer).
2. Enter the upload password, tap **Choose Photos**, pick one or more.
3. Each photo is resized/compressed *in the browser* (1500px wide, JPEG 82%,
   orientation fixed), then sent to the site's Worker, which commits it to
   this repo as the next `photoN.jpg`. That push triggers the normal
   Cloudflare build — photos appear on the Showcase page in ~2 minutes.

The server side lives in [`worker/index.js`](worker/index.js) (the
`/api/upload` endpoint). It needs two **secrets**, set in Cloudflare dashboard
→ Workers & Pages → cozy-k9-shack-site → Settings → Variables and Secrets:

- `GITHUB_TOKEN` — fine-grained GitHub personal access token scoped to this
  repo only, with **Contents: Read and write** permission
  (github.com → Settings → Developer settings → Fine-grained tokens). Note
  the expiry date you pick — uploads stop working when it lapses and it must
  be re-issued.
- `UPLOAD_PASSWORD` — any password you choose; give it to Jaclyn.

Until both secrets are set, the upload page returns "Uploads are not
configured yet." For local testing, put the same two values in a `.dev.vars`
file (gitignored) and run `npm run build && npx wrangler dev`.

---

## Common content edits

**Add photos to the Showcase page** — use the /upload page above, or by hand:
drop image files (`.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`) into
`src/assets/showcase/`, commit, push. Every photo in that folder appears
automatically, sorted by filename (`photo4 … photo19` currently). A filename
containing "before" or "after" (e.g. `bella-before.jpg`) gets a Before/After
label. Resize photos to ~1500px on the long edge first — phone originals are
4–6 MB and slow the page.

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
