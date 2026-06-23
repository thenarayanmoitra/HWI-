# Han Wong International — Website (v2)

Static HTML/CSS site for HWI. No build step. Host anywhere.

This is the updated version with: charity focus, GM Han Wong story, team-centric rankings, 9 brand ambassadors, country flag strip, FAQ page, charity gallery page, partnership program with tiers, downloadable materials section, YouTube video embeds, and Google Form registration redirects.

---

## Files

```
hwi-site/
├── index.html                  Homepage — charity-led
├── about.html                  Grand Master Han Wong's story
├── tournaments.html            3 flagship tournaments + registration
├── rankings.html               Team-centric rankings + winning teams
├── charity.html                Charity gallery + Karimul Haque feature
├── brand-ambassadors.html      9 GMs from around the world
├── partnership.html            Dojang Partnership Program (tiers, no prices)
├── past-results.html           Tournament archive + livestream embeds + downloads
├── faq.html                    Frequently asked questions
├── contact.html                Contact form, channels, newsletter
├── assets/
│   ├── styles.css              All site styles
│   ├── script.js               Mobile nav, countdown, FAQ accordion, rank tabs
│   └── logo.png                HW. logo
└── downloads/
    ├── scotland-open-2026-poster.pdf       (placeholder — replace)
    ├── scotland-open-2026-outline.pdf      (placeholder — replace)
    ├── han-wong-open-2026-poster.pdf       (placeholder — replace)
    ├── partnership-program-deck.pdf        (placeholder — replace with your real deck)
    ├── hwi-introduction-deck.pdf           (placeholder — replace with your real deck)
    └── charity-impact-2024.pdf             (placeholder — replace)
```

---

## Hosting — fastest path live

### Netlify (recommended)
1. Go to https://app.netlify.com/drop
2. Drag the entire `hwi-site` folder onto the page
3. Done. Connect your custom domain (hanwonginternational.org) under Site settings → Domain management.

### Vercel
1. Push folder to GitHub repo → https://vercel.com → Import → Deploy
2. Framework preset: Other. Root directory: `./`.

### GitHub Pages
1. Push the `hwi-site` folder contents to `main` branch of a repo
2. Settings → Pages → Source: `main`, `/ (root)` → Save

---

## CRITICAL — Things to replace before going live

### 1. Google Form IDs
Search and replace these placeholders. Each Form ID is unique to one form.

```
YOUR_GOOGLE_FORM_ID         → Main athlete registration form
YOUR_PARTNERSHIP_FORM_ID    → Dojang partnership interest form
YOUR_CONTACT_FORM_ID        → Contact form (currently uses Formspree-style action, you may swap to Google Form link)
YOUR_NEWSLETTER_FORM_ID     → Newsletter signup form
```

Find every occurrence:
```bash
grep -rn "YOUR_" *.html
```

Each placeholder becomes the full form URL, e.g. `https://forms.gle/abc123xyz`.

You already have one existing form from your old deck: `https://forms.gle/namdBYBWhuYqj7hTA` — use that for the Partnership form if appropriate.

### 2. YouTube video IDs
Find these on `index.html` and `past-results.html`:
```
YOUR_VIDEO_ID_1, YOUR_VIDEO_ID_2, YOUR_VIDEO_ID_3, YOUR_VIDEO_ID_4
```
Replace with the 11-character YouTube video ID from each video URL. Example: in `youtube.com/watch?v=dQw4w9WgXcQ`, the ID is `dQw4w9WgXcQ`.

The iframe URL format: `https://www.youtube.com/embed/dQw4w9WgXcQ`

### 3. Real PDF downloads
The `downloads/` folder has 6 placeholder PDFs. Replace each with the real document, keeping the same filename so links don't break:
- `scotland-open-2026-poster.pdf`
- `scotland-open-2026-outline.pdf`
- `han-wong-open-2026-poster.pdf`
- `partnership-program-deck.pdf` ← you have this one (the deck I read during the build)
- `hwi-introduction-deck.pdf` ← you have this one (the introduction deck)
- `charity-impact-2024.pdf`

### 4. Real photography
Wherever you see inline SVG figures (placeholders for athletes, GM Han, ambassadors, charity photos), swap with real `<img>` tags. Look for `<svg viewBox=` inside `.gm-photo`, `.amb-img`, `.charity-tile`, `.video-placeholder`, `.hero-figure`, etc.

The most important photos:
- GM Han Wong's portrait on `about.html` (highest priority — the real photo from your About deck)
- Real charity gallery photos on `charity.html` (the food distribution, Disha, etc.)
- Ambassador photos on `brand-ambassadors.html` (you have these in your About deck)
- Real competitor photos on the rankings winners section

### 5. Contact details
On `contact.html`, replace the placeholder WhatsApp number `+44 0000 000000` with the real one. The email `director@hanwonginternational.org` is correct per your deck.

### 6. Countdown timer
On `index.html`, find `data-countdown="2026-03-14T23:59:00Z"` and update to the real next-tournament closing date in ISO UTC format.

---

## Optional customisation

**Brand colors** — edit `:root` in `assets/styles.css`:
```css
--orange: #db4a2b;
--cream: #e4e2dd;
```

**Adding country flags** — flag emojis render natively on all modern browsers. Add more in the `FLAGS` variable inside `assets/script.js` (currently shown on Home + Rankings pages).

**Rankings data** — currently hardcoded. For real data, edit `rankings.html` directly after each tournament, OR wire up a simple CMS later (Decap CMS, Sanity, or Airtable→Zapier→GitHub).

---

## Pages overview

| Page | What it does |
|---|---|
| Home | Charity-led hero, mission, top dojangs, 3 ambassadors teaser, video embeds, testimonials, press |
| About | GM Han Wong's full story, 9th Dan credentials from 5 organisations, the vision quote, origin story |
| Tournaments | 3 flagship events with Google Form registration link, all 6 categories, how-it-works |
| Rankings | Team-first rankings (dojangs not individuals), winning teams from last cycle, stats |
| Charity | The mission front and centre — gallery, Karimul Haque feature, where the money goes |
| Brand Ambassadors | All 9 GMs with bios, plus Karimul Haque honorary section |
| Partnership | 5-tier structure (Bronze → Diamond), benefits, no prices shown (sent in outline) |
| Past Results | Tournament archive, embedded livestream videos, downloadable posters/decks |
| FAQ | 11 essential Q&As — registration, charity, judging, partnership, video submission |
| Contact | Direct channels, contact form, newsletter signup |

---

## Tech notes

- Pure HTML, CSS, one small JS file. No build step. Open `index.html` in browser to preview.
- Fonts from Google Fonts: Archivo Black (display), Inter (body), JetBrains Mono (labels).
- Mobile responsive down to 360px width.
- Sticky nav with blur backdrop. Mobile menu toggles under 960px.
- Countdown timer updates every second client-side.
- FAQ accordion uses pure CSS transitions.
- YouTube embeds use `youtube.com/embed/` format (privacy-enhanced).
- Country flag strip uses native emoji rendering (no image dependency).

---

Built for Han Wong International, 2026 · One World · One Taekwondo.
