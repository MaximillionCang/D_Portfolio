# Darren Ryusa Creative Portfolio

An English-language portfolio for Darren’s graphic design, social media, illustration and photography work. Built to present projects to recruiters and keep his creative work in one place.

Built with **Astro 5, TypeScript and CSS**. The site generates static pages for Vercel, with local images and videos. No database, CMS or environment variables are required.

## Run locally

Use Node.js 22+ and npm. From the project directory:

```sh
npm ci
npm run dev
```

Open the local URL printed in the terminal. Add `/#work` to jump to the project gallery.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npx tsc --noEmit` | Check TypeScript without generating files |
| `npm run build` | Generate the static website in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run portfolio:prepare` | Prepare project media from the original `Asset/` directory |

Run `npm run build` before `npm run preview`. Media preparation is only needed when original media changes; it is not required for a normal build or deployment.

## Website features

- A centered hero with Darren’s portrait, mascot and a speech bubble. The welcome animation plays once per page load, then the bubble stays visible. Reduced-motion settings show it immediately.
- An About section with a student introduction, three creative disciplines, original application logos and visual proficiency meters.
- Eleven projects displayed as landscape cards on a studio-style hanging rail. Browse with arrow buttons, the large slider, keyboard controls or horizontal swiping. Cards sway briefly in response to scrolling.
- Filters for Graphic Design, Social media content, Illustration and Photography.
- Individual project pages with descriptions, contributions, software, images and native video players.
- An image viewer with previous/next navigation, a close control and keyboard support.
- Portrait videos in iPhone-style frames with a notch; landscape videos use tablet frames. Related portrait reels share one desktop row and scroll horizontally on smaller screens.
- Plain-text email and phone details, plus a LinkedIn profile link. There is no contact form or email delivery service.

## Project structure

| Location | Contents |
| --- | --- |
| `src/pages/index.astro` | Hero, welcome bubble and homepage section order |
| `src/pages/work/[slug].astro` | Shared project detail template |
| `src/layouts/BaseLayout.astro` | Metadata, navigation, contact details and footer |
| `src/components/AboutSection.astro` | Introduction, disciplines and software proficiency |
| `src/components/ProjectRail.astro` | Project filters, arrows and slider |
| `src/components/VideoPlayer.astro` | Shared video player markup |
| `src/components/MediaViewer.astro` | Image viewer and keyboard behavior |
| `src/styles/` | Shared and component styles |
| `src/scripts/rail-wind.ts` | Directional card sway and motion cleanup |
| `src/data/projects.ts` | Project content and display order |
| `src/data/skills.ts` | Application names, logos and personal proficiency values |
| `src/data/media.ts`, `src/data/videos.ts` | Generated media references |
| `src/assets/portfolio/` | Prepared project images, thumbnails and video posters |
| `public/videos/`, `public/software/` | Local video files and original application logos |
| `scripts/` | Media preparation utilities |
| `docs/` | QC reports and asset provenance |

## Update content

### Projects

Edit `src/data/projects.ts`. Each project defines its title, unique slug, category, summary, description, role, software, card cover, detail cover, gallery and optional videos or metrics.

The array order controls both the homepage order and the **Next project** links. Keep existing slugs stable to preserve published URLs. The `real-food` slug intentionally remains in use for the project titled **Keep It Real**.

To add a project:

1. Add and prepare its original media as described below.
2. Add an entry following an existing project with the same category and media type.
3. Use prepared media keys, accurate image descriptions and a unique slug.
4. Check its category filter, detail page, images, videos and next-project navigation.

Project logos are preferred for rail covers. Where no logo exists, use a representative artwork or photograph. Do not invent project results, software, client quotes or missing descriptions.

### Software proficiency

Edit the values in `src/data/skills.ts`. Ratings are the client’s personal assessments on a 0–10 scale. The visible meters use those values directly; accompanying labels currently map scores of 9 or higher to **Advanced**, and lower scores to **Proficient**. These labels are not certifications.

If changing the scale or adding different levels, update the display logic in `AboutSection.astro` as well. Original application logos and source records are kept in `public/software/` and `docs/SOFTWARE_LOGO_SOURCES.json`.

### Contact details and copy

Update contact information, navigation and shared metadata in `src/layouts/BaseLayout.astro`. Hero and welcome text live in `src/pages/index.astro`; the student introduction is in `AboutSection.astro`.

The phone is displayed in its local Malaysian format. Email and phone details are intentionally plain text. LinkedIn opens the confirmed profile in a new tab.

## Prepare images and videos

The original **`Asset/` directory is ignored by Git**. Keep the prepared web files and generated data references committed so the website builds without the originals on Vercel.

Expected original-media folders:

```text
Asset/
  Graphic_Design/
  Social_Media_Content/
  Illustration/
  Photography/
```

Image preparation uses Sharp. Video preparation also requires FFmpeg. After placing originals in the appropriate folders, run:

```sh
npm run portfolio:prepare
```

If FFmpeg is not on your PATH, pass its executable path explicitly:

```powershell
node scripts/prepare-portfolio.mjs Asset "C:\path\to\ffmpeg.exe"
```

The preparation script:

- Preserves originals and uses cached hashes to skip unchanged media.
- Corrects image orientation and creates WebP images up to 2000 px with smaller thumbnails.
- Applies existing project-specific cropping and the upright Mantra phone-mockup rotation.
- Produces MP4 files using H.264/AAC with faststart and local poster images.
- Updates generated image/video references and `src/data/media-manifest.json`.

New videos must also be registered in the `videos` list in `scripts/prepare-portfolio.mjs` before preparation. Keep the existing referenced originals available when rerunning the complete pipeline.

The three Mantra reels are stored under `Asset/Graphic_Design/mantra talks/reels/`, named `mantra-talks-reel-01.mp4` through `mantra-talks-reel-03.mp4`. Web copies play locally without an Instagram login; the original post links remain available beside them.

`assets:prepare` and `videos:prepare` are older utilities for hero/cursor assets and Carnival media. Use `portfolio:prepare` for the full project-media collection.

## Design and interaction

The design direction is recorded in `DESIGN.md`. Project revision instructions are in `AGENTS.md`.

| Role | Value |
| --- | --- |
| Heading font | Instrument Serif |
| Body font | DM Sans |
| Supporting font | Space Mono |
| Blue | `#4B86B0` |
| Light blue | `#C6D8E6` |
| Mist | `#F4F5F9` |
| Pale yellow | `#F8F5B0` |
| Brown | `#4D2A0A` |

UI colors follow this palette; supplied artwork, photographs and vendor logos retain their original colors. Fonts load from Google Fonts with local fallback families.

The general page width is capped at 2240 px. The hero uses a centered 1600 px composition, while text and portrait media retain their own readable limits. Phone layouts reflow rather than shrinking the desktop page.

The welcome bubble uses a short, single CSS animation with no timer, typing loop or automatic dismissal. Card sway stops at rest and when the page is hidden. Reduced-motion settings disable decorative motion. Videos do not autoplay and retain native controls.

Mouse and trackpad devices use the supplied 32×32 transparent PNG cursor with a system fallback. Text inputs retain the normal text cursor.

## Deploy to Vercel

First verify the production build:

```sh
npx tsc --noEmit
npm run build
npm run preview
```

Import the GitHub repository into Vercel using these project settings:

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Root directory | The directory containing `package.json` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Environment variables | None required |

Use the production build command rather than the development or preview server. A build log that remains on **watching for file changes** indicates that a long-running development command is being used.

After reviewing and committing changes, push the connected production branch:

```sh
git push origin main
```

The connected Vercel project builds from the pushed source. Do not commit `node_modules/`, `dist/`, `.astro/`, `.vercel/` or the original `Asset/` directory. Prepared media in `src/assets/portfolio/` and `public/videos/` must remain tracked.

## Quality checks and troubleshooting

Before pushing, check the homepage and project pages on desktop and phone widths. Exercise the welcome bubble, filters, slider endpoints, keyboard navigation, image viewer, video players and LinkedIn link.

| Issue | Check |
| --- | --- |
| A project image is missing | Confirm the prepared file exists and the key in `projects.ts` matches the generated media data |
| Media preparation fails | Confirm the originals exist and FFmpeg is installed or explicitly supplied |
| Deployment does not finish | Confirm Vercel runs `npm run build`, not `npm run dev` or `npm run preview` |
| Changes are not visible online | Confirm the commit was pushed to the connected production branch and its deployment completed |
| A video does not load | Check that its MP4 and poster files are committed and referenced correctly |

Recorded checks and limitations are in [the main QC report](docs/QC-2026-11-05.md) and [the layout and controls follow-up](docs/QC-2026-11-05-layout-controls.md). These cover Chromium on Windows and responsive viewports. Actual Safari/macOS and iPhone hardware still require device testing; no Lighthouse or Web Vitals score is claimed.
