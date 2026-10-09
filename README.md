# Arsham Azam — Portfolio

Personal site for **Arsham Azam**, Software Engineer & AI Researcher (Explainable AI · Federated Learning · Multimodal AI for Healthcare).

Built with Next.js (App Router), TypeScript, Tailwind CSS v4 and Framer Motion. Exported as a fully static site and hosted on Hostinger at https://arshammywork.com.

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:3000
```

Other commands:

```bash
npm run build      # static export → ./out
npm run lint
npx serve out      # preview the exported site
```

## Editing content

**All text lives in [`data/content.ts`](data/content.ts).** You shouldn't need to touch components to change wording, links, publications, jobs, projects or skills. Each section of that file matches a section of the page.

Things to do before launch:

| What | Where |
| --- | --- |
| Profile photo | `public/profile.jpg` (square crop, shown in a circle) |
| CV | Generated from `content.ts`: run `npm run cv` after edits (see below) |
| Project images | Replace the SVGs in `public/projects/` (or point `image` in `content.ts` at a `.jpg`/`.png`, ~4:3) |
| Domain | Set `site.url` in `content.ts`; used for SEO tags, sitemap and OG image |
| Contact form | Create a free form at [formspree.io](https://formspree.io), put its ID in `contact.formspreeId`. While empty, the form opens the visitor's email app instead |
| Second paper's DOI | `research.publications[1].doi` currently holds only the prefix `10.56979`; add the full DOI |

## Profile dashboard (`/dashboard`)

A public "at a glance" page: stat tiles, a career timeline (Gantt, coloured by each job's `sector`), roles held at the same time, projects by category, skills by area and research-topic frequency. Every number is computed in `lib/profileStats.ts` from `content.ts`, as of `site.lastUpdated`, so it updates with your content. Each chart has hover tooltips and a Table view. Tip: give job periods as "Mon YYYY" (not just "YYYY") for an exact timeline.

## CV (designed PDF)

The **Download CV** buttons serve `public/cv.pdf`, which is generated from the same `data/content.ts` as the website: a two-page "research brief" layout with a header band, impact metrics, a sidebar (contact, QR code to the site, skills, education, awards) and an experience timeline. You can also view it at `/cv`.

```bash
npm run cv    # builds the site, then prints /cv to public/cv.pdf (A4)
```

Run it whenever you change your content, then commit the new `public/cv.pdf`. It uses your installed Google Chrome; set `CHROME_PATH` if Chrome is somewhere unusual. CV-only fields (impact highlights, phone, nationality, languages with CEFR levels, awards) are in the `cv` object at the bottom of `content.ts`, and empty ones are hidden.

## Deploy to Hostinger

The site is a static export. `npm run build` (Next.js with webpack) writes plain HTML, CSS and JS to `out/`.

Hostinger settings (**hPanel → Websites → arshammywork.com → Deployments → Build and output settings**):

| Setting | Value |
| --- | --- |
| Framework | Next.js |
| Node version | 22.x |
| Build command | `npm run build` |
| Output directory | `out` |
| Root directory | the folder containing `package.json` |

Ways to deploy:
- **GitHub (automatic):** connect the repo `Arshamazam/Arsham-Azam-portfolio-` in the Deployments page. Every push to `main` then rebuilds and publishes the site.
- **Zip upload:** run `npm run zip` and upload `hostinger-upload.zip` under **Deployments → New deployment**.

Run `npm run cv` before pushing content changes so `public/cv.pdf` stays current. It needs Google Chrome on your machine, so it isn't run on Hostinger.

`public/.htaccess` sets the 404 page and browser caching. Hostinger ignores it if it serves the app through Node instead of Apache/LiteSpeed.

## Structure

```
app/
  layout.tsx           fonts, SEO metadata, JSON-LD, theme script
  (site)/              website pages with navbar + footer
    page.tsx           home: all sections in order
    research/page.tsx  extended research page
    dashboard/page.tsx profile analytics dashboard
  cv/page.tsx          designed CV (printed to public/cv.pdf)
  og.png/route.tsx     Open Graph image, generated at build time from content.ts
  sitemap.ts, robots.ts, icon.svg, not-found.tsx
  globals.css          colour tokens (light/dark) and fonts
components/
  layout/              Navbar, Footer, ThemeToggle, Providers
  sections/            Hero, About, Research, Experience, Projects, Skills, Education, Contact
  ui/                  Section, Reveal, Button, Tag, PublicationCard, OngoingCard, ProfilePhoto, ContactForm
data/content.ts        all site content
lib/utils.ts           helpers (class names, base-path aware asset URLs, DOI/arXiv links)
public/                profile.jpg, cv.pdf, projects/*
```

## Design notes

- **Look:** clean light-blue style with white cards, soft shadows and one blue accent; a round portrait in the hero surrounded by floating skill cards.
- **Type:** Plus Jakarta Sans (headings), Inter (body). Both are self-hosted via `next/font`.
- **Colour:** tokens for light and dark mode live in `app/globals.css`.
- **Skill icons:** brand logos come from `simple-icons`, others from `lucide-react`. The name → icon map is in `components/ui/SkillIcon.tsx`; add an entry there if you add a new skill.
- **Hero badges:** the four floating cards around the photo come from `hero.floatingBadges` in `content.ts`.
- **Theme:** always opens in light mode (white background); visitors can switch to dark with the toggle, which saves the choice in `localStorage`.
- **Signature effects** (all in `components/effects/`):
  - `NeuralBackground`: animated neural-network canvas behind the hero (links to the cursor, pauses off-screen)
  - `RotatingText`: typewriter for the roles in `hero.tagline`
  - `CountUp`: impact numbers (`highlights` in `content.ts`) count up on scroll
  - `ExpertiseVisuals`: small animations on the "What I Do" cards (`expertise` in `content.ts`)
  - `SpotlightCard`: cursor glow on cards; `ScrollLine`: experience timeline fills as you scroll
  - `ScrollProgress`: gradient reading-progress bar; `CommandPalette`: ⌘K / Ctrl+K menu
  - CSS (in `globals.css`): skills marquee, floating hero blobs, animated gradient border on the contact banner
- **Motion:** everything respects the "reduce motion" setting. Content stays visible with JavaScript off.
- **Accessibility:** semantic landmarks, skip link, labelled controls, visible focus rings, and text contrast that meets WCAG AA in both themes.
