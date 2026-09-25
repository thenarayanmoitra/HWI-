# Han Wong International — website

Plain HTML, CSS and JavaScript. No build step, no accounts, no monthly fees. Upload the contents of this folder to any host (GitHub Pages, Netlify, Vercel, cPanel).

## What's in the folder

| File | What it is |
|---|---|
| `assets/content.js` | **Everything you update lives here.** Event, links, results, videos, testimonials, flags, numbers, people. |
| `check.html` | Open it after every change. It tells you if anything is wrong, and on which line. |
| `index.html` | Home page |
| `partnership.html` | Dojang Partnership Programme (send this link to dojang owners) |
| `hall-of-fame.html` | Hall of Fame, Achievers Award and ambassadors |
| `assets/img/` | Photos |
| `assets/downloads/` | Posters and guidelines people can download |
| `assets/site.css`, `assets/site.js` | The design and the animations. You never need to touch these. |
| `about.html`, `charity.html`, `faq.html`… | Old page names. They forward visitors to the right section, so old links keep working. |

## How to update the website

1. Open `assets/content.js`. On GitHub: click the file, then the pencil icon.
2. Change the text between the quote marks. Keep the quotes and the commas.
3. Save. On GitHub: press **Commit changes**. The live site updates within a minute or two.
4. Open `yourwebsite/check.html`. A green tick means you're done. Red lines tell you exactly what to fix.

If you do break something, the site doesn't go blank: the top of the page and every Register button keep working, and `check.html` shows the line with the mistake.

### Everyday jobs

**Promote the next championship.** In section 2 (`event`), change `name`, `shortName`, `status` and the `details`. Update section 5 (`calendar`) too.

**Add the poster and guidelines.** Upload the files into `assets/downloads/`. Use simple names without spaces, like `edinburgh-open-poster.jpg`. Then write the paths:

```js
poster:     "assets/downloads/edinburgh-open-poster.jpg",
guidelines: "assets/downloads/edinburgh-open-guidelines.pdf",
```

A poster saved as JPG or PNG also appears as a picture in the event section. A Google Drive link works too, which is handy for big PDFs. Try to keep uploaded PDFs under 10 MB so they download quickly on phones.

**Show a countdown.** Set `closes: "2026-11-15"` (year-month-day). The badge then reads "Entries close in 12 days" and a live countdown appears. Leave it empty for no countdown.

**Registration isn't open yet, or has closed.** Set `registrationOpen: false`. Every Register button becomes "Get notified" and opens WhatsApp. Set it back to `true` when entries open.

**Publish results after a championship.** In section 6, change `championship` and replace the `teams` list, in finishing order. The top three go on the podium automatically.

**Add a video.** In section 7, copy a line, paste the YouTube link and write a title. The first video in the list is the big one. A video with an empty link shows as "Coming soon".

**Add a testimonial.** In section 8, copy one and change the quote, name, role and country. Put their photo in `assets/img/`.

**Change the WhatsApp group link.** Section 1, `whatsappGroup`. Paste the invite link (`https://chat.whatsapp.com/...`).

**Update the numbers.** Section 3. Numbers have no quote marks: `number: 2500`.

**Add a country flag.** Section 4. Add its two-letter code (full list at flagicons.lipis.dev).

**Charity photos, ambassadors and the Hall of Fame.** Sections 9, 10 and 11.

### Photos

JPG works best. Aim for under 1,400 pixels wide and under 500 KB each so the site stays fast.

## Brand

Orange `#db4a2b` · Cream `#e4e2dd` · Ink `#1a1612`. Headlines in Archivo Black, everything else in Aileron. The colours live at the top of `assets/site.css`.

## Good to know

- The animations switch off for anyone who has turned on "reduce motion" on their phone or computer.
- Adding `?still` to any page address freezes the animations, which helps when taking screenshots.
- `check.html` is hidden from Google.
- Flags load from flag-icons and fonts from Google Fonts and Fontsource, all free and without accounts.
