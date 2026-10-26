# Omar Al Sayed — Portfolio

A handmade, single-page portfolio with four project case pages.
Theme: **"Ink & Amber"** — warm paper, deep ink, burnt-amber accent, serif display type.

## Open it
Just double-click **`index.html`** — it works straight from the file system, no server needed.
(To preview with a server: `python -m http.server 8777` then open http://localhost:8777)

## Folder layout
```
Portfolio/
├─ index.html              ← main page (hero, about, work, path, contact)
├─ projects/
│  ├─ whatsapp-booking.html
│  ├─ openmarketlb.html
│  ├─ cadre.html
│  └─ crafty.html
└─ assets/
   ├─ css/style.css        ← all styling + animations
   ├─ js/main.js           ← reveal, tilt, theme toggle, counters
   └─ img/
      ├─ profile.jpg        ← your photo (already added)
      └─ projects/          ← drop project photos here (see below)
```

## Adding your project photos (later)
Drop images into `assets/img/projects/` using these **exact names**.
Any that are missing simply show a clean "Add photo" placeholder — no broken images.

**Card cover (shown on the home page card):**
- `whatsapp-cover.jpg`
- `openmarketlb-cover.jpg`
- `cadre-cover.jpg`
- `crafty-cover.jpg`

**Gallery photos (shown on each project page), 5 per project:**
- `whatsapp-1.jpg` … `whatsapp-5.jpg`
- `openmarketlb-1.jpg` … `openmarketlb-5.jpg`
- `cadre-1.jpg` … `cadre-5.jpg`
- `crafty-1.jpg` … `crafty-5.jpg`

`.jpg`, `.png`, or `.webp` all work — if you use a different extension, update the
`src="..."` in the matching HTML file.

## Editing text
- Career summary, skills, timeline, contact → `index.html`
- Each project's description, stack, and highlights → its file in `projects/`

## Nice touches built in
- Light / dark toggle (top-right), remembered between visits
- Scroll-reveal, animated hero, 3D card tilt, count-up stats, scroll progress bar
- Fully responsive (desktop / tablet / phone) and respects "reduce motion"
