# Viena darba nedēļa — Datorikas studenta dzīve

A personal week-in-the-life website built from a Figma design by **Rainers Cīrulis (rc23018)**, Datorikas fakultāte.

Multi-page Latvian website showcasing one work-week in a Computer Science student's life — Monday through Friday. Built with vanilla HTML, CSS, and JavaScript. Fully responsive (desktop + mobile) with light/dark theme support.

---

## Project Structure

```
student-week/
├── index.html              # Home page (hero + day picker + about)
├── pirmdiena.html          # Monday detail page
├── otrdiena.html           # Tuesday detail page
├── tresdiena.html          # Wednesday detail page
├── ceturtdiena.html        # Thursday detail page
├── piektdiena.html         # Friday detail page
├── css/
│   └── styles.css          # All styles, organized in 13 commented sections
├── js/
│   └── main.js             # Theme toggle, mobile menu, day carousel
├── assets/
│   └── images/
│       ├── hero-placeholder.svg
│       └── placeholder.svg
└── README.md
```

The CSS uses a clean, BEM-like naming convention (`.day-card`, `.day-card__face`, `.day-card--1`) and a single design-tokens block at the top with CSS custom properties. The 13 sections in `styles.css`:

1. Design tokens (colors, fonts, spacing)
2. Base / reset
3. Layout helpers
4. Site header (navy bar)
5. Site footer
6. Home page — hero
7. Buttons
8. Home page — day picker
9. Day card component
10. Home page — about
11. Day detail page
12. Mobile styles (`@media (max-width: 767px)`)
13. Reduced-motion + display helpers

---

## Running Locally

No build step — just open `index.html` in a browser. For best results (live reload + correct fetch behavior), serve via a local server:

```bash
# Option 1: Python (no install needed)
python3 -m http.server 8000

# Option 2: Node
npx serve

# Option 3: VS Code "Live Server" extension (recommended — see below)
```

Then open <http://localhost:8000>.

---

## Browser Support

Tested in:
- Chrome (Desktop + Android)
- Safari (macOS + iOS)
- Firefox (latest)
- Edge (latest)

Uses CSS custom properties, CSS Grid, Flexbox, `aspect-ratio`, and `clamp()` — all supported in all modern browsers.

---

## VS Code Setup

**Recommended extensions** (install from the Extensions panel):

| Extension | Purpose |
|---|---|
| **Live Server** (Ritwick Dey) | Right-click `index.html` → "Open with Live Server" — auto-reloads on save |
| **Prettier** | Auto-format HTML/CSS/JS on save |
| **HTML CSS Support** | IntelliSense for class names |
| **Auto Rename Tag** | Renames closing tag when you edit opening tag |
| **Better Comments** | Highlights TODO / FIXME / important comments |
| **GitLens** | Inline git blame and history |

**Recommended workspace settings** (create `.vscode/settings.json`):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "files.eol": "\n",
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "[html]": { "editor.tabSize": 2 },
  "[css]":  { "editor.tabSize": 2 },
  "[javascript]": { "editor.tabSize": 2 }
}
```

---

## Git Workflow

### Initial setup

```bash
cd student-week
git init
git add .
git commit -m "chore: initial commit — Figma design implemented"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/student-week.git
git push -u origin main
```

### Branching strategy (simple, suitable for solo project)

- **`main`** — always deployable, this is what's live
- **`feature/<name>`** — one branch per feature or page
- **`fix/<name>`** — bug fixes

Example workflow when adding real images:

```bash
git checkout -b feature/add-real-photos
# ... make changes ...
git add assets/images/
git commit -m "feat: add real photos for Pirmdiena"
git push -u origin feature/add-real-photos
# Open a Pull Request on GitHub, merge into main
git checkout main
git pull
```

### Conventional commit messages

Use a short prefix so history is scannable:

| Prefix | When to use | Example |
|---|---|---|
| `feat:` | New feature | `feat: add carousel arrows` |
| `fix:` | Bug fix | `fix: mobile menu z-index` |
| `style:` | CSS / visual changes | `style: tweak day-card hover` |
| `refactor:` | Code cleanup, no behavior change | `refactor: extract header partial` |
| `docs:` | README / comments | `docs: add deployment guide` |
| `chore:` | Tooling, config | `chore: add prettier config` |

### `.gitignore`

```gitignore
# OS
.DS_Store
Thumbs.db

# Editor
.vscode/*
!.vscode/settings.json
!.vscode/extensions.json
.idea/

# Logs
*.log
npm-debug.log*

# Dependencies (if you later add a build step)
node_modules/
dist/
```

---

## Deployment

### Option A — Vercel (easiest, recommended)

1. Push the project to GitHub (steps above)
2. Go to <https://vercel.com> and sign in with GitHub
3. Click **Add New → Project** → select your repo → **Deploy**
4. Done. You get a URL like `student-week.vercel.app`. Future `git push` to `main` auto-deploys.

No config file needed — Vercel detects this is a static site automatically.

### Option B — GitHub Pages

1. Push to GitHub
2. Repo → **Settings → Pages**
3. Source: **Deploy from a branch** → **main** / **/ (root)**
4. Save. Site goes live at `https://YOUR_USERNAME.github.io/student-week/` (takes ~1 min)

**Note:** If using GitHub Pages, ensure all paths are relative (they already are in this project — `css/styles.css` not `/css/styles.css`), so it works whether deployed at root or under a sub-path.

### Option C — Netlify

1. <https://netlify.com> → drag-and-drop the `student-week` folder onto the dashboard
2. Site is live instantly
3. To link to GitHub for auto-deploy: **Site settings → Build & deploy → Link to git**

---

## Customization

### Replacing placeholder images

The hero and section images are gray `<div>` placeholders. To swap in real images:

**Hero (home page, `index.html`):**

```html
<!-- before -->
<div class="hero__image" role="img" aria-label="Hero attēls">Hero attēls</div>

<!-- after -->
<img class="hero__image" src="assets/images/hero.jpg"
     alt="Apraksts par attēlu" loading="lazy" />
```

**Day sections (`pirmdiena.html`, etc.):**

```html
<!-- before -->
<div class="day-section__image" role="img" aria-label="Attēls">Attēls</div>

<!-- after -->
<img class="day-section__image" src="assets/images/pirmdiena-1.jpg"
     alt="Lekciju zāle no rīta" loading="lazy" />
```

The `.day-section__image` class already sets `aspect-ratio: 4/3`, so any image will be displayed at that ratio. If you want it to crop instead of stretch, add `object-fit: cover` to that selector in CSS.

### Changing day-accent colors

In `css/styles.css`, edit the design tokens at the top:

```css
--day-1-bg: #E8D5C9;   /* Pirmdiena — peach */
--day-2-bg: #CFD9D5;   /* Otrdiena — sage */
--day-3-bg: #D5CFD9;   /* Trešdiena — lavender */
--day-4-bg: #A48E80;   /* Ceturtdiena — tan */
--day-5-bg: #B7D3E5;   /* Piektdiena — sky */
```

Changes apply automatically to both day cards on the home page and the hero strip on each day's detail page.

### Adding more content per day

Each day page has 3 `<article class="day-section">` blocks. Add a 4th by copying any existing block. The alternating image-left/image-right pattern uses `.day-section--reverse` on every other section.

---

## Accessibility Notes

Implemented:
- Skip-to-content link (visible only on focus)
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<footer>`)
- Proper heading hierarchy (one `<h1>` per page)
- `aria-label`, `aria-current`, `aria-expanded`, `aria-pressed` where needed
- Keyboard support for the carousel (← / → keys)
- Focus-visible outlines
- `prefers-reduced-motion` media query disables animations
- High contrast in both light and dark themes (text ≥ 4.5:1 on background)

---

## Credits

- **Design & content:** Rainers Cīrulis (rc23018)
- **Fonts:** [Source Serif Pro](https://fonts.google.com/specimen/Source+Serif+Pro), [Roboto Serif](https://fonts.google.com/specimen/Roboto+Serif), [Homenaje](https://fonts.google.com/specimen/Homenaje) (all via Google Fonts)
- **Icons:** Custom inline SVG (Feather-icon style)
