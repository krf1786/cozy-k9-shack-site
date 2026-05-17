# Cozy K9 Shack — Website

Marketing site for [Cozy K9 Shack](https://www.cozyk9shack.com), an in-home dog
grooming business owned by Jaclyn Rischman in Mount Holly, NC.

Built with React + Vite. Five pages: Home, Services, About, Pricing, Contact.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Build

```bash
npm run build      # → dist/
npm run preview    # preview the production build
```

## Project structure

```
src/
├── App.jsx              # Router & layout
├── main.jsx             # React entry
├── styles.css           # All styling
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── CtaBanner.jsx
└── pages/
    ├── Home.jsx
    ├── Services.jsx
    ├── About.jsx
    ├── Pricing.jsx
    └── Contact.jsx

public/
├── logo.png             # Cozy K9 Shack circular logo
├── hero-dog.png         # Hero photo
└── jaclyn-photo.jpeg    # Owner photo (about page)
```

## Before launch

- [ ] Wire the Contact form (`src/pages/Contact.jsx`) to a real backend
      (Formspree, Netlify Forms, etc.) — currently the form just shows a
      success state without actually sending anything.
- [ ] Replace `public/hero-dog.png` with a styled hero photo if Jaclyn has one
      she prefers over the current crop.
- [ ] Decide whether to keep the QR code in the center of the logo (it's part of
      the original business-card design); if not, swap `public/logo.png` for a
      cleaner version.

## Brand

- **Sage green** `#8aa888` — buttons, accents, footer
- **Blush pink** `#e9b4b8` — Book Appointment button, why-choose icons
- **Cream** `#fbf7f2` — section backgrounds
- **Charcoal** `#3a3a3a` — body text
- **Fonts** — Playfair Display (headlines) + Inter (body)
