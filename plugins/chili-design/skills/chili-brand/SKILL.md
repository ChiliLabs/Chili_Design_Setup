---
argument-hint: "[what: deck | slide | post | event cover | blog cover] [topic / content] [optional: mode=light|dark|poster|mix]"
description: Make Chili Labs' own brand materials in the company style — client presentations, sales/pitch decks, design-concept decks, webinar and event slides, social media posts, event and blog covers. Use when the designer asks for a Chili presentation, deck, slides, post, cover or anything «in our style / by the brandbook» (in any language). Not for client app UI.
name: chili-brand
---

# Chili brand

Writing: short, no filler — `../../references/writing.md`. Chat in `language.chat` (Russian by default); everything inside the design in **English** (brand tone is EN only).

Input: $ARGUMENTS — format, topic, content, links (Figma, docs, Jira), mode if the designer named one.

This skill is for **Chili Labs' own brand** (decks, posts, covers). Client app UI stays with `ui-craft` and the project DS.

## Read first (only what the task needs)
| File | When |
|---|---|
| `../../references/brand/rules.md` | **always** — brand rules, incl. our «avoid AI look» rules for brand work |
| `../../references/brand/tokens.md` | always — colours, fonts, radii, grid |
| `../../references/brand/presentations.md` | decks and single slides |
| `../../references/brand/layouts.md` | decks and slides — central-block layouts and how to vary them |
| `../../references/brand/elements.md` | logo, shapes, hand-drawn lines, photos, 3D, icons |
| `../../references/brand/social.md` | posts, event covers, blog covers |
| `../../references/brand/voice.md` | any copy: headlines, captions, CTA, numbers |

Rule priority: designer's request → `rules.md` → the other brand files → `../../references/taste/core.md` (only the parts `rules.md` keeps). For brand work `rules.md` replaces the UI rules in `ui-craft` step 0 and the «AI-generic» list in `core.md` — do not apply UI-only bans (caps, big numbers, 3D, blue backgrounds) to brand materials.

## 0. Deck gate — three things before any slide is built
Applies to decks and single slides (posts and covers: only the content check). Check at the start, ask in **one** message for everything missing, and do not write to Figma until all three are confirmed.

1. **New Figma file.** Every deck lives in its own new file, not in the brandbook, the Slides template or another project's file. The designer sends the link; if they ask Claude to make it, create it with `create_new_file` and send the link back. A link to an existing file with other work in it → ask for a new file (or explicit «build here»).
2. **Design system linked.** The Chili brand library (Slides template / brandbook components, colour and text styles) must be enabled in that file. Check with `get_libraries` / `search_design_system` on the new file. Not linked → ask the designer to enable it (Assets → Libraries); Claude can't enable a library itself. Do not rebuild the components by hand as a workaround unless the designer says so.
3. **Content.** One of two ways:
   - **Designer gives the content** — text, doc, Jira/Confluence page, old deck, notes. Use it as is; only shorten and structure it (`voice.md`); missing facts → ask, don't fill.
   - **«Find the content yourself»** — only when the designer says it explicitly. Collect from chililabs.io, the attached Claude Project, Confluence/Jira and earlier Chili decks the designer points to; for each fact keep its source. Facts, numbers, clients, awards, prices are never invented; unconfirmed ones go in as `(check: <month year>)` in the report. Show the content outline (slide → key message → facts with sources) and wait for «ok» before the plan in step 2.

All three confirmed → steps 1–6. The designer can skip a check only explicitly (e.g. «build in this file», «without the library»); note the skip in the report.

## 1. Brief (one short message, only what is missing)
Format and size · audience (client / event / hiring / internal) · goal of the piece · mode: **light bento** (default for client decks), **dark photo** (covers, case openers), **poster** (webinars, events, social) or a **mix** · photos / 3D the designer provides. Facts about Chili (numbers, awards, clients, prices) come from the designer or chililabs.io — never invented; numbers get `(check: <month year>)` in the chat report.

## 2. Plan (in chat, before Figma)
- Deck: slide list — one line per slide: purpose · template from `presentations.md` · central-block layout from `layouts.md` · hero card colour. Show the **rhythm** (light / dark / poster beats) and check the variety rules in `layouts.md`.
- Post / cover: format, mode, headline, highlighted word, decoration, photo/3D slot.
Wait for «ok» unless the designer said to go straight to Figma.

## 3. Layout exploration (central block)
For every content slide that is not a fixed template (cover, divider, contacts), sketch **2–3 central-block options** from different layout families (`layouts.md`) and pick one with a one-line reason; on request show the options side by side. Keep the frame (logo, link, caption) fixed — experiment only inside the content area.

## 4. Build in Figma
- Output: decks — the new file from step 0 (page «Slides»); posts and covers — the file/page the designer named, otherwise a new page «Brand AI» in the file they point to, one Section per task. Never edit existing slides made by others — duplicate.
- Use components and styles from the linked Chili library (step 0); rebuild with the tokens only for posts/covers or when the designer allowed working without the library. Text styles and colours from `tokens.md`; auto layout for cards; real copy only.
- Images: only what the designer gave or what is already in the source files. Missing photo / 3D → grey placeholder with an English label (`Photo: team`, `3D: fire`), listed in the report.
- Names in English: `Slide 03 — About us`, `Post — ASO playbook 1/5`.

## 5. Self-check (before reporting)
`rules.md` checklist · tokens only (no off-palette colours, no fourth font) · radii 60 / 40 / pill · frame elements in place · no two neighbouring slides with the same central layout · one hero per slide · every number sourced · contrast ≥ 4.5:1 for body text (WCAG 1.4.3). If Figma was written, run `design-validate` in report mode on the new frames.

## 6. Report
Links to the frames · step 0 status (file, library, content source, skipped checks) · what was built · layouts used per slide · placeholders left · open questions · checks actually done.
