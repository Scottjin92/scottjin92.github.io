# Roger Yue — Drone & Cinematography Website

A fast, static one-page marketing site to attract drone & cinematography clients.
No build step, no dependencies — just HTML, CSS, and vanilla JS. Deploys anywhere.

```
.
├── index.html          # all page content + JSON-LD structured data (schema.org)
├── styles.css          # cinematic dark theme + responsive layout
├── script.js           # work grid, filters, video lightbox, nav, form
├── robots.txt          # welcomes search + AI answer-engine crawlers
├── sitemap.xml         # single-page sitemap
├── server.py           # tiny local preview server (python3 server.py)
└── assets/
    ├── favicon.svg
    ├── img/
    │   ├── hero.jpg     # hero background/poster (ForestCure aerial still)
    │   ├── featured.jpg # Featured card image (133 Esplanade aerial)
    │   └── roger.jpg    # About portrait (from Vimeo avatar)
    └── thumbs/          # 14 video thumbnails, named <vimeo-id>.jpg
```

## Run it locally

No Node required — use Python (already on your Mac):

```bash
cd "/Users/jin/Documents/Claude/Projects/Personal Website"
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Deploy (free options)

- **Netlify / Vercel / Cloudflare Pages** — drag-and-drop the folder, or connect a Git repo. Done.
- **GitHub Pages** — push to a repo, enable Pages on the `main` branch root.

All three serve static files and give you HTTPS + a custom domain (e.g. `rogeryue.com`).

---

## Getting found by AI ("best drone operator in Vancouver")

The site is built to be read and cited by AI answer engines (ChatGPT, Perplexity, Google AI Overviews, Gemini, Claude). Baked in already:

- **JSON-LD structured data** in `index.html` — a `ProfessionalService` + `Person` + `FAQPage` graph stating, machine-readably, who you are, that you're Transport Canada RPAS Advanced certified & insured, where you work, and what you offer.
- **A visible FAQ section** with entity-defining Q&A (each answer is a citation candidate — the highest-impact format for AI).
- **`robots.txt`** that explicitly *welcomes* AI crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended…) and blocks only the abusive Bytespider.
- **`sitemap.xml`** + canonical + Open Graph tags.

### ⚠️ Replace the placeholder domain
The JSON-LD, `robots.txt`, `sitemap.xml`, canonical link, and `og:url` all use `https://www.rogeryue.com`. After you register a domain and deploy, find-and-replace that string with your real domain everywhere.

### The bigger lever is OFF your own site
AI engines recommend names they see corroborated across the web. In rough priority order:
1. **Deploy on a real domain** — AI can't cite a site that isn't online.
2. **Google Business Profile** — register as a Vancouver service-area business; this feeds local AI answers and Google AI Overviews.
3. **Reviews** — collect Google reviews from clients (Evolve Media / Peter Joudaki, etc.). Volume + recency get quoted back.
4. **Get into third-party "best drone operators in Vancouver" lists & directories** — listicles, vendor directories, real-estate/wedding supplier lists. This corroboration is what AI trusts most.
5. **Submit to Bing Webmaster Tools + Google Search Console** — ChatGPT's web search runs on Bing, so Bing indexing is a prerequisite there.
6. **Be where AI retrieves** — a YouTube channel, a few Reddit mentions (r/vancouver, r/drones), LinkedIn, and a consistent name/email everywhere.

Expect ~4–8 weeks after the above before AI citations shift. It's probabilistic — no switch guarantees your name; corroboration + consistency is the game.

---

## ⚠️ Before you go live — things to replace

Status of the personal details on the site:

| What | Status |
|------|--------|
| **Email** | ✅ Set to `scottjin92@gmail.com` (contact details + form mailto fallback). |
| **Drone certification** | ✅ Stated as **Transport Canada RPAS — Advanced Operations certified** in the About section and the Aerial service card. |
| **Insurance** | ✅ Stated as **fully insured** (trust strip + About). |
| **Business entity** | ✅ **Creative Research Ltd.** added to the footer as the operating company. The personal "Roger Yue" brand stays front-and-center (you book a person, not an agency); invoices/contracts/insurance run under the Ltd. |
| **Instagram / LinkedIn** | Removed for now (you don't use IG). Send any social URLs later and I'll add them back to the contact section. |
| **Contact form delivery** | ⚠️ Still falls back to opening the visitor's email app. Add a Formspree ID to collect submissions in your inbox — see below. |
| **Phone number** | Optional — add a `tel:` line to the contact list if you want one. |
| **Monte Bre Place video** | ⚠️ The Dropbox file is ~525 MB — too large to host on a static site. Upload it to Vimeo and send the link; I'll embed it as a Real Estate piece. |

### Make the contact form actually deliver email

Right now the form falls back to opening the visitor's email app (a `mailto:`). To collect submissions properly with no backend:

1. Create a free account at [formspree.io](https://formspree.io) and make a new form.
2. Copy your form ID and replace `your-form-id` in `index.html`:
   ```html
   <form ... action="https://formspree.io/f/your-form-id" ...>
   ```
3. The JS auto-detects the real ID and switches from `mailto:` to AJAX submission with a success message.

---

## Notes on content

- The **hero** plays your *ForestCure "Tree of Life"* documentary as a muted background loop on desktop; on mobile/reduced-motion it shows a still instead (saves data).
- The **Work** grid (14 videos) loads instantly using local thumbnails; the Vimeo player only loads when a visitor clicks a video (fast page, no embedded players up front).
- Categories shown: Aerial · Real Estate · Commercial · Music Video · Documentary.
- **Positioning — gun for hire (capture only):** all copy frames you as a drone + camera **operator** booked for the shoot day — you get the shots, the client keeps the footage. No pre-production, no editing. Per-video "Producer" credits were removed from the work grid so it reads as an operator reel, not a producer pitch.
- **Drone work up front:** your two new aerial pieces lead everything — *Château des Rêves* (Aerial) and *133 Esplanade E* (Real Estate) head the grid, and the Esplanade aerial is the Featured piece. The hero still plays the *ForestCure* footage as a background loop (clean, sweeping, no burned-in text). Send more aerial clips anytime and I'll slot them in.

## Editing the work list

Open `script.js` and edit the `WORK` array (id, title, cat, dur) and the `CATEGORIES` list. To add a video, drop its thumbnail in `assets/thumbs/<id>.jpg` and add an entry.
