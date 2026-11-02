# Portfolio revision, 2 November 2026

Design read: an English creative portfolio for recruiters and visitors exploring Darren's work, using the owner's warm scrapbook references. Energy 2, rhythm 3, motion 2. The existing palette and three requested font families remain the identity. The mascot and star motif come from the supplied references; shadows belong to the overlapping paper, mascot and physical button. The moving discipline strip is retained at the owner's request, with pause/resume and reduced-motion support.

## Changes

- Removed the large hero outline and striped top/bottom frame. The composition now sits directly on the page.
- Rebuilt the hero as an overlapping desktop composition and a separate mobile stack. Navigation, body text, section spacing and tap targets use mobile sizes. Filters scroll inside their own strip.
- Added the supplied LinkedIn profile: https://www.linkedin.com/in/darren-ryusa-31659b30b/.
- Rotated the Mantra Talks phone upright, trimmed its transparent canvas and gave it a portrait frame that grows with the image.
- Trimmed transparent margins from every displayed project asset. Removed the outer white JPEG canvas from the Carnival board, including the gaps between panels, while preserving white enclosed inside the artwork.
- On phones the Carnival board can be scrolled horizontally, rather than shrinking all five panels into unreadable thumbnails. It is keyboard focusable and uses native scrolling.
- Re-exported the original star cursor as a transparent sRGB PNG at 32×32 with a 16,16 hotspot. CSS detects any available fine pointer/hover device and retains native fallback and text cursors.

## Verification

- Build PASS: `npm run build` completed in the actual Portfolio_Darren checkout and generated all six static pages.
- Types PASS: `npx tsc --noEmit` returned success.
- Source PASS: `git diff --check` found no whitespace errors. Only revision files were copied after matching their original hashes; original Asset files were only read.
- Responsive PASS: home checked at 320, 390, 540, 760, 820, 1024 and 1440 CSS pixels. All four project pages checked at 320, 390, 820 and 1440. Document width stayed within the viewport throughout; every cover stayed within the vertical bounds of its frame. Mantra's frame remained portrait at every width.
- Navigation PASS: hero work link, About, introduction work link, Contact, back-to-projects, back-to-top and the complete four-project next-link cycle opened their intended destinations. Contact hrefs match the supplied email, phone and LinkedIn; email/phone applications were not launched.
- Filtering PASS: All projects shows 4, Graphic Design 3, Social media content 1. Illustration and Photography show the existing empty state. The production-build Social media filter also showed exactly one project.
- Motion PASS: pause button produced `animation-play-state: paused`, resume produced `running`. Native video controls played both Carnival videos, with readyState 4 and durations 15.8 and 7.03 seconds. Neither autoplays. Reduced-motion CSS stops nonessential animation and removes the unneeded pause button.
- Keyboard PASS: Tab reached the visible skip link with a solid focus outline; Enter moved to main content. ArrowRight scrolled the focused project-board region. Space operated the video controls.
- Contrast PASS: computed ratios for brown/paper 11.64:1, brown/About-blue 10.67:1, large blue/paper 3.60:1, large blue/About-blue 3.30:1, blue-dark/yellow 4.94:1, footer paper/brown 11.64:1 and yellow/brown 11.31:1. Footer keyboard focus uses yellow.
- Production preview PASS: final build served successfully in the browser; no browser console errors were returned. Desktop and mobile screenshots were inspected.

## Delivery gate

- Hard gate PASS for the changed UI: working native controls, verified routes and empty states, dimensions on images/videos, keyboard focus and no page overflow in the tested range. Static project content has no asynchronous data-fetch loading state; the existing 404 page covers missing routes.
- Purpose gate PASS: existing user-selected fonts, colors, mascot and star motif provide the identity; paper overlap explains the limited shadows, and the retained moving strip has an explicit pause control.
- Liveliness PASS: desktop artwork/type overlap and mobile ordering provide distinct compositions, with project presentation driven by each asset's shape.
- Craftsmanship PASS within the recorded checks: factual project copy retained, no invented credentials or testimonials, no added dependencies, and no changes to original source assets.

## Limits

The cursor format and CSS were verified in Chromium on Windows. Safari/macOS and physical iPhone/Android devices were not available, so actual device testing remains necessary. This report is not a full accessibility conformance audit. The changes are local; they will reach Vercel after being committed and pushed through the existing Git deployment flow.
