# Darren Ryusa portfolio

An English creative portfolio for recruiters and people browsing Darren’s work. Energy 2 / Rhythm 3 / Motion 2. Warm editorial scrapbook direction with restrained studio details, personal portrait, mascot, star cursor, Instrument Serif headings, DM Sans body and Space Mono supporting type.

## Palette

Blue #4B86B0; light blue #C6D8E6; mist #F4F5F9; pale yellow #F8F5B0; brown #4D2A0A. The About surface mixes the two light palette colors and shares its token with the marquee transition. Original artwork and vendor application logos retain their native colors. No pink UI.

## About

Only Darren is blue in the greeting. The final-year student bio appears once, in a pale-yellow speech bubble beside the laptop mascot on the right. What I do uses unframed icons, larger type and ruled columns, becoming readable rows on mobile. Original application logos replace rating rings and letter placeholders.

The greeting no longer has a forced line break. Its desktop font follows the available column width, using one continuous line to occupy the previous central gap. The note uses a bounded 450 px column rather than half the entire page. The compact top row brings What I do closer; smaller screens stack the note below, and the short name phrase stays together when the greeting wraps naturally. No filler copy or decoration is added.

Tools use two desktop rows: four design/photo applications followed by three motion/video applications. Larger names sit beside the original logos; subtle rules organize the list without adding boxes. On phones, two columns place each logo above its name and the final item spans the row. Content determines the blue section’s height, with no added spacer. Visible meters show the original personal scores, using a common bar length at each breakpoint for comparison. Text labels remain Advanced (client score 9) and Proficient (7.5 or 8), with exact values in the native accessible meters. These are personal assessments, not certifications.

## Page width

The shared page width grows to 2240 px with gutters from 20 to 72 px, reducing the previous large desktop margins. Header, sections and footer share this alignment. Body paragraphs and portrait media retain their readable limits; expanding the page does not stretch a phone or a paragraph to the full desktop width.

## Hero welcome

The hero has its own centered 1600 px composition with balanced art and copy columns. The headline, byline and project button align centrally within the copy column, correcting the previous visual weight towards the left of wide screens. The rest of the page keeps its wider shared alignment.

On desktop, the mascot and welcome bubble share a small rightward offset, capped at 56 px, bringing the character towards the visual center and reducing the gap before the headline. The photo keeps its position. The adjustment does not apply to the stacked phone/tablet composition.

The existing tagline appears once, in a pale-yellow speech bubble pointing towards the mascot. A single 650 ms opacity/transform entrance follows a 300 ms delay on each fresh page load. It settles to the normal visible state without timers, text replacement, hover replay or dismissal. Reduced-motion renders the final state immediately. On phones, a reserved space above the photo and character keeps the bubble away from their faces. No new image asset or animation library is introduced.

The project heading stands alone; the former Branding, content, illustrations & moments caption is removed at the client’s request.

## Project display

The client selected a studio display rail instead of the video’s coverflow: a fine line, small clothespins, lightly tilted 3:2 landscape artwork, manual previous/next navigation and native horizontal swipe. All eleven cards share one format. Existing project logos are preferred; four newly supplied logos cover PPI Malaysia, HUMAS, Tutorising and Sportlight. Projects without logos use artwork or a representative photo. Titles stay upright and every card has a visible View project action.

Category filters retain their data, pressed states and live result counts. The rail resets to its beginning after filtering. Buttons disable at the ends. Keyboard users can tab through links or use arrows/Home/End while the rail is focused. Motion respects reduced-motion settings. No autoplay is added to the gallery.

A native full-width range replaces the thin scrollbar after JavaScript loads. Its 64 px handle and 44 px input area make it easier to grab; its full range maps directly to the entire project collection, so the right end reveals the final card. Scroll snapping is disabled in this enhanced mode to prevent the thumb fighting card boundaries. Arrow, swipe and keyboard navigation synchronize the range; single-card collections disable it. Without JavaScript the original native scrollbar and snap behavior remain available.

Scrolling gives the hanging artwork a small directional sway, making the client’s studio-display metaphor respond to input. Per-card springs vary slightly and decay when scrolling stops. Pegs, titles and actions remain still for readability. Only transforms change during the animation; frames stop at rest or when the page is hidden. Filtering resets the sway and reduced-motion disables it. No animation dependency is required.

## Details and contact

Project facts, original images, galleries and native videos remain available. Digital Print Production keeps its paired images above the story. Mantra Talks has three locally playable reels and links to the supplied originals. Sportlight’s engagement values are client-supplied static numbers.

Multiple portrait videos share a single desktop row; smaller screens use an explicitly scrollable row rather than tiny videos. The shared phone frame has rounded corners, a top-attached notch and an earpiece, referencing iPhones before Dynamic Island. The notch sits over the screen rather than introducing a blank status strip. Frame colors use the portfolio palette. The existing Mantra image mockup already has the earlier iPhone notch and is preserved.

Every video frame follows its media rather than enforcing 9:16 or 16:9. Prepared poster dimensions reserve the initial ratio; once metadata loads, the native video’s intrinsic ratio takes precedence. The screen wraps the auto-height player without padding or a separate fixed aspect ratio, so a tall Story recording and a shorter portrait clip both fit their frames. No white letterboxing, crop-to-fill behavior or video re-encoding is added.

Email and phone remain plain text. LinkedIn matches the contact-row layout: its icon, a LinkedIn label and the name Darren Ryusa as a plain profile link, with no boxed button.

## Asset integrity

Seven application logos come from vendor-owned sources; see docs/SOFTWARE_LOGO_SOURCES.json. SVG originals are used directly; the CapCut favicon’s original image is converted losslessly to PNG. No application logo is AI-generated or redrawn. Project and software images are served locally.
