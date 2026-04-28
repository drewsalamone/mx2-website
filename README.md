# mx2-website

Custom WordPress assets for [mx2.agency](https://www.mx2.agency).

## `mx2-lineage-slider/`

WordPress plugin that renders the **MEDICI + MAESTRO lineage slider** — the 22-figure "Six Centuries Of Taste" carousel from Cosimo de' Medici (1389) to Drew Salamone (present day) — via the `[mx2_lineage_slider]` shortcode.

### Quick install

1. Zip the `mx2-lineage-slider/` directory:

   ```bash
   cd mx2-website
   zip -r mx2-lineage-slider.zip mx2-lineage-slider
   ```

2. In WordPress admin: **Plugins → Add New → Upload Plugin**, upload the zip, activate.

3. Edit the page where you want the slider, add a Shortcode block (or paste into the Classic editor):

   ```
   [mx2_lineage_slider]
   ```

4. (Recommended) Set the page template to "Full width / no sidebar" so the slider can fill the viewport.

### Shortcode attributes

| attr        | default  | description                                           |
| ----------- | -------- | ----------------------------------------------------- |
| `height`    | `100vh`  | Stage height (any CSS length).                        |
| `autoplay`  | `yes`    | `yes` / `no` — turn the auto-advance timer on/off.    |
| `interval`  | `8000`   | Auto-advance interval in ms.                          |

Example: `[mx2_lineage_slider height="720px" autoplay="no"]`.

### Editing the lineage

The figure data (names, dates, stories, quotes, portrait filenames) lives at the top of:

```
mx2-lineage-slider/assets/js/lineage-slider.js
```

Portraits live in `mx2-lineage-slider/assets/portraits/`. Filenames match the `portrait` field in each figure entry. To replace a portrait, drop a new PNG with the same filename. Slides whose `portrait` is `null` render the gold ornament cipher card ("No portrait survives. The name does.").

### Notes on design fidelity

This plugin is the production port of the design prototype at `ui_kits/lineage_slider/index.html` in the design bundle (Claude Design handoff). All styles are scoped under `.mx2-lineage` so the plugin will not conflict with the active theme.

* Fonts (Cormorant for display, Josefin Sans for body) are loaded from Google Fonts.
* Colors and tokens are inlined into the CSS so the plugin is self-contained — no dependency on the design system's `colors_and_type.css`.
* Behavior (auto-advance, fullscreen, keyboard, swipe, ticks, scrub meta) matches the prototype.
