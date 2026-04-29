=== MX2 Lineage Slider ===
Contributors: mx2global
Tags: slider, shortcode, mx2, medici, maestro, lineage
Requires at least: 5.6
Tested up to: 6.6
Requires PHP: 7.2
Stable tag: 1.0.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

The MEDICI + MAESTRO lineage slider for the Mx2 website. Drop [mx2_lineage_slider] into any page or post.

== Description ==

Renders the 22-figure "Six Centuries Of Taste" lineage slider — Cosimo de' Medici (1389) through Drew Salamone (present day) — as a full-bleed dark editorial slider with portrait, identity card, and biographical narrative on each slide.

* Self-contained shortcode — no theme edits required.
* Bundles 15 duotone portraits (transparent oval cameos); placeholder cards render where no portrait survives.
* Auto-advance, keyboard nav, touch swipe, fullscreen.
* Fonts (Cormorant + Josefin Sans) loaded from Google Fonts.

== Installation ==

1. Upload the `mx2-lineage-slider` folder to `/wp-content/plugins/`, **or** install the zipped plugin via Plugins > Add New > Upload Plugin.
2. Activate the plugin through the Plugins screen.
3. Edit the page where you want the slider to appear and add the shortcode block (or paste into a Classic editor):

       [mx2_lineage_slider]

4. (Recommended) Set that page's template to "Full width / no sidebar" so the slider takes the full viewport.

== Shortcode attributes ==

* `height`   — Stage height. Default `100vh`. Example: `[mx2_lineage_slider height="80vh"]`.
* `autoplay` — `yes` (default) or `no`.
* `interval` — Auto-advance interval in milliseconds. Default `8000`.

== Frequently Asked Questions ==

= How do I change the figures or the copy? =
The lineage data lives in `assets/js/lineage-slider.js` (the `FIGURES` array near the top). Edit names, dates, quotes, etc., there.

= How do I swap a portrait? =
Replace the matching file in `assets/portraits/` (filenames match the `portrait` field in `FIGURES`). Image dimensions used in the design were ~1200x1480 PNG with transparent background; any aspect that fits a 440x540 frame with `object-fit: contain` will work.

= The slider is too tall on my page. =
Use `height` attribute, e.g. `[mx2_lineage_slider height="720px"]`.

== Changelog ==

= 1.0.4 =
Pulled the second design handoff. Three new portraits — Camilla Orsini (IX),
Marcantonio Borghese (XII), Flaminia Borghese (XIII) — replace placeholder
cards. Updated portrait for Drew Salamone (XXII). New shared "Arms of the
House of Orsini" image now stands in for the four Orsini-line generations
(XIV, XVI, XVII, XVIII) where no likeness survives, replacing generic
placeholder cards. Attribution lines updated to match.

= 1.0.3 =
Mobile controls reflowed into two rows (progress meta on top, prev/next
arrows centered below) so neither arrow can be clipped by host-theme
sticky widgets. Fullscreen now works on phones via a CSS pseudo-fullscreen
fallback (position: fixed, viewport-pinned) for browsers that don't
support the real Fullscreen API on non-video elements (iOS Safari/Chrome).

= 1.0.2 =
Restore the original slide stacking model on mobile (one-at-a-time with
opacity transitions); 1.0.1 had reflowed slides into normal document flow,
which broke the slider behavior. Keep the targeted mobile fixes from 1.0.1
(hide redundant topbar, right safe area for sticky launcher widgets, hide
giant century numeral) and tighten portrait + identity-card sizing so the
content fits inside the small viewport without colliding with the bottom
controls bar.

= 1.0.1 =
Mobile fixes: hide redundant slider topbar (host theme already has a header);
let the slider grow to its content height so the dates row no longer collides
with the bottom controls bar; reserve right-side safe area so sticky launcher
widgets (e.g. "Get In Touch") don't clip identity-card and story text;
suppress the giant century numeral on phones; tighten name typography.

= 1.0.0 =
Initial release.
