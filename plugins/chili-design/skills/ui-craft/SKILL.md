---
argument-hint: "[screen or goal] [ui=system|extend|free] [refs=...] [goal=direction|screen|foundation] [creative=safe|bold|wild]"
description: Strong visual UI craft — hierarchy, typography, colour, spacing, detail and states — driven by the chosen UI approach (strict design system, design system + improvements, or new visual) and reference sources (designer's own references, Mobbin, built-in taste, UI/UX Pro Max). Use for the «UI foundation» work type, when new-task passes ui=extend or ui=free, or when the designer asks to make a screen look stronger.
name: ui-craft
---

# UI craft

Writing: short, no filler — `../../references/writing.md` (applies to chat, plans, reports, annotations).

Input: $ARGUMENTS (task context, `ui`, `refs`, platforms, project type).

Always: UX principles (`../../references/ux-principles.md`), WCAG 2.2 AA (`../../references/wcag-2.2.md`), taste library (`../../references/taste/index.md` → `core.md` + only the `patterns/` files the task touches), Chili DS template (`../../references/chili-ds-template.md`) — baseline structure and naming; the project DS always wins. Short sources in parentheses for notable decisions.

Language in Figma: copy inside mockups in the project UI language (`language.ui`); page, section, frame and layer names, annotations and labels (`Variant A`, `Proposal`) always in English. Never write Russian in Figma unless it is a UI language of the project.

## 0. Visual rules (always, every `ui` mode)
Hard rules from the Chili team; they override references, UI/UX Pro Max and the taste library. Only the project DS or an explicit designer request can lift a rule.
- **Our projects first.** Start from the current project's approved Figma screens; where the project has no answer, calibrate with Chili projects (`../../references/taste/chili/craft.md`, numbers and principles only). Generic web or «landing page» styling is not a reference.
- **No dots as separators.** Never join text with `·`, `•` or a centred dot (`Chili Labs · November 2026`, `Buttons · 20 px`, `1 · Colour system`). Use separate text layers, a line break, spacing or a comma instead.
- **No caps in chips and secondary text.** Chips, tags, badges, subtitles, captions, overlines/eyebrows and helper text in sentence case. No all-caps labels above titles.
- **No strokes by default.** No borders/outlines on cards, chips, buttons, inputs, list items or containers. Group and separate with surface colour steps, spacing and soft fills; secondary button = tonal or text button, not outlined. Strokes only if the project already uses them for that element or the designer asks. Exception: focus indicator (WCAG 2.4.7, 2.4.11). If an input fill doesn't reach 3:1 against the background (WCAG 1.4.11), flag it to the designer instead of adding a stroke.

## 1. Collect references (only the chosen sources)
- **My references** — analyse each link/image: what exactly to take (layout, hierarchy, typography, colour, density, components, motion) and what not to take. If a link can't be opened, say so and ask for a screenshot.
- **Mobbin** — use skill `pattern-research` (short mode) if not already done.
- **ui-craft taste** — use the taste library as the reference base: `taste/core.md` for visual craft, matching `taste/patterns/*.md` for flows (paywall, checkout, auth, forms…), `taste/platform/` for surfaces, navigation and platform behaviour, and `taste/creative.md` for exploration. Chili project files are **not** part of this source.
- **Chili projects** (opt-in) — `taste/chili/craft.md` to calibrate radii, spacing, type scale and component sizes; `taste/chili/ideas.md` for solutions to remix; the 1–2 closest `taste/chili/projects/*.md`. Take numbers and principles, never a client's look, palette or assets; cite «(Chili: <project>)».
- **UI/UX Pro Max** — invoke skill `ui-ux-pro-max:ui-ux-pro-max` (separate plugin; not installed → say so, continue with other sources): style, palette, font pairing, UX guidelines for the product type and platform. Its output is a suggestion: project DS wins for `system`/`extend`; for `foundation` keep the Chili DS template structure and fill it with these choices.
- None → design system + UX principles only.

## 1b. Creative exploration
For `ui=extend` / `ui=free`, `goal=direction`, or when the designer asks for bolder options: follow `../../references/taste/creative.md` — set the creativity level (`creative=safe|bold|wild`, default by `ui`), frame the job, diverge on ≥ 2 axes per option, converge with the scorecard. Keep the guardrails.

## 2. Visual direction (before drawing)
3–6 lines: tone, density, type scale, colour roles (60/30/10), spacing scale, radii/elevation, iconography, imagery — and how it maps to the chosen `ui`:
- `system` — polish only within the design system: hierarchy, alignment, spacing rhythm, consistent states. No new components or styles.
- `extend` — design system first; propose new components/variants/tokens where they clearly improve UX; label each `Proposal` with a one-line reason.
- `free` — new visual language allowed; still accessible, consistent and buildable. Present as a direction the designer approves.

## 3. Goals
- `direction` — return the direction (and, if asked, a small style tile in chat or on the output page).
- `screen` — apply the direction to the screen(s) the workflow skill builds.
- `foundation` (work type «UI foundation», greenfield) — follow the Chili DS template structure (3 token layers, naming, type scale, spacing, effects, grid) with the project's brand colours; on the output page, in the task Section: colour palette with roles (light/dark), type scale, spacing/grid, radii/elevation, and 6–10 core components (button set, input, card, list item, tab bar/nav, chip, toast, empty state) with states. Use Figma variables/styles when tooling allows; **do not publish a library** — propose it to the designer.

## 4. Self-check before reporting
Visual rules from step 0 (no dot separators, no caps in chips/secondary text, no strokes unless the project uses them) · Hierarchy readable in 3 seconds · one primary action · aligned to grid · consistent radii/spacing · contrast in every theme (WCAG 1.4.3, 1.4.11) · real content · states covered · nothing that looks «AI-generic» (see `taste/core.md`). For `foundation`/`screen` built in Figma, finish with skill `design-validate` (report → fix on confirmation).
