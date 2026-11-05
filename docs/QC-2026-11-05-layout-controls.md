# Layout and controls QC, 5 November 2026

Scope: restore visual proficiency, use more desktop width, replace the difficult thin gallery scrollbar, place portrait reels in one row and use a pre-Dynamic-Island iPhone frame. Antislop and ui-ux-pro-max were applied; current design reasons are recorded in DESIGN.md. The Python search launcher was unavailable, so the local UI/UX guideline data was read directly for gesture and keyboard alternatives.

## Checks

| Check | Result | Evidence |
| --- | --- | --- |
| Production build | PASS | 13 static routes generated after the final CSS revision |
| TypeScript | PASS | npx tsc --noEmit exits successfully |
| Responsive bounds | PASS | Home checked at 320, 390, 820, 1440 and 2560 px; no document overflow or overflowing tool cells |
| Wider desktop layout | PASS | At 2560 px the shared wrapper is 2240 px rather than 1360 px. Header, sections and footer use shared width/gutter tokens |
| Visual proficiency | PASS | Seven visible native meters retain values 9, 9, 9, 9, 7.5, 7.5 and 8; app labels remain readable. Final measurements: all bars 173 px at 1440 and 156 px at 390, so differing cell spans do not distort comparison |
| Meter contrast | PASS | Blue fill on mist track is 3.61:1. Brown outline and text preserve existing high-contrast palette pairs |
| Complete gallery range | PASS | Keyboard End reaches scrollLeft 2714.67 of maximum 2715 (subpixel rounding), revealing the final card. Home and arrow controls retain their behavior |
| Mouse drag | PASS | Dragging the handle from right to left returns to scrollLeft 0; one continuous drag back across the track reaches the final card. The range moves without mandatory card snapping |
| Filter reset | PASS | Illustration yields one card, resets scrollLeft to 0, disables both arrows and the range |
| Accessible slider | PASS | Native range has an accessible name, keyboard operation, visible focus and dynamically updated text such as Projects 7 to 11 of 11. Hit area is 44 px high; thumb is 64 px wide |
| Mantra desktop row | PASS | All three phone frames have identical vertical position and fit one row at 1920 px |
| Mantra mobile row | PASS | At 390 px the row scrolls internally while the document remains in bounds; native horizontal input moved it by 373 px |
| Phone frame | PASS | Shared video frame has a top-attached notch with lower rounded corners and an earpiece. Reserved top strip avoids overlaying the video; native controls remain below. Existing still-image phone mockup already uses the earlier notch |
| Video behavior | PASS by DOM/source inspection | All three Mantra videos retain controls, playsinline, preload none and no autoplay. No media files were re-encoded or replaced by this revision |
| Browser logs | PASS | No warning or error entries recorded during the checked interactions |

## Delivery gate for the changed scope

- Hard gate PASS: source edits are in Astro/CSS, no new dependency or generated logo is introduced, numeric values remain client-provided, responsive bounds and contrast are verified, native range/meter semantics and keyboard alternatives remain. Build and TypeScript pass. No new navigation destination, FAQ, form, testimonial or unsupported claim was added.
- Purpose gate PASS: meters restore the requested visual comparison; wider gutters reduce unused side margins; the large range handle addresses the reported mouse difficulty; notch frames identify portrait media as phone content; the single video row groups the three related reels.
- Liveliness PASS: Energy 2 / Rhythm 3 / Motion 2 retained. The personal portrait, mascot, blue serif name and hanging studio motif remain; extra width serves real content rather than adding filler sections.
- Craftsmanship and quality locks PASS for checked scope: exact rating data is preserved, frame/width changes reuse shared styles, slider endpoints and filter states work, and no new generic copy or decorative card system is introduced.

Limits: Chromium on Windows and responsive viewports were checked. Actual iPhone/Safari/macOS hardware was not tested. Video playback was previously verified; this revision checks preserved player behavior and frame layout, not every video from beginning to end. No Lighthouse or Web Vitals numbers are claimed. No push or deployment was performed.

## Follow-up: compact About greeting

The client identified the central gap between the two-line greeting and the right-hand mascot. The forced break was removed, the note column bounded, and the greeting font made relative to its available column. The top row’s minimum height was reduced from 190 to 155 px. Smaller screens stack the note beneath the greeting rather than forcing everything into one row.

- Responsive bounds PASS: at 320, 390, 760, 820, 1000, 1024, 1440, 1920 and 2560 px there is no document or heading overflow; the bubble and mascot stay within the viewport and do not overlap the heading.
- Heading composition PASS: the greeting occupies one line from the checked tablet width of 760 px through 2560 px; at 320 and 390 it wraps to two readable lines. Desktop and phone screenshots were reviewed.
- Build/type checks PASS: 13 static routes generated and npx tsc --noEmit completed. Browser warning/error log is empty.
- Delivery gate PASS for this CSS/markup scope: shared palette, fonts, original assets, accessible heading text and existing controls are preserved; no new claim, navigation, motion or dependency is added. The change directly addresses unused space, with its purpose recorded in DESIGN.md. Existing Energy 2 / Rhythm 3 / Motion 2 direction remains.
