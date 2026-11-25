# Chili design setup

Claude plugin **chili-design** for Chili Labs designers working on existing products and new projects: project setup, a new-task intake menu, and workflows for feature updates, flows, UI variations and design QA — with Jira and Figma.

## What's inside

| Skill | Say | What it does |
|---|---|---|
| `project-setup` | «setup project» | Existing product → finds it in Jira/Figma; new project → manual input. Asks for a Confluence link or a description. Creates `CLAUDE.md` + `context/` and saves `context/` to the Claude Project |
| `new-task` | «new task» | Menu: work type, product, platforms, mode → Jira → Figma → runs the right workflow |
| `feature-update` | via menu | Change an existing screen, component or part of a flow; 1 variant by default, more on request |
| `flow-builder` | via menu | New or substantially reworked flow |
| `ui-variations` | via menu | Concepts for a new feature; you choose how many (default 3, up to 5) |
| `design-qa` | via menu | Check finished screens against the task; state matrix per screen: default, empty, loading, error, offline, long text |
| `wireframe` | menu → «Wireframe in chat» | Low-fi wireframes in the chat; «move to Figma» hands off to the design skill |
| `pattern-research` | menu → Mobbin / «Research and directions» | Mobbin research: examples, patterns, directions |
| `design-validate` | auto at the end of build · «validate» | Spacing on the scale, named layers, tokens and text styles bound — report first, fixes after confirmation, only on Playground AI frames |
| `chili-brand` | «presentation in our style», «post for Instagram» | Chili Labs' own decks, slides, posts and covers by the brandbook: light bento / dark photo / poster modes or a mix, layout exploration in the central block, brand rules instead of UI «avoid AI» bans |
| `concise` | «make it shorter» | Rewrites any text short and without filler (Jira, Figma, Slack, client); all skills follow the same writing rules |
| `ui-craft` | menu → «New visual», «DS + improvements», «UI foundation» | Strong visual UI from chosen references; UI foundation for new products |
| `menu` | «/menu», «what can you do» | All commands, connected skills and other skills available to you — one line each |
| `project-skills` | «/project-skills», «connect a skill» | Connect skills from other plugins (UI/UX Pro Max, Mobbin, design…) to the project → `external_skills` |

Every design decision and QA finding ends with a short source: (NN/g), (WCAG 2.5.8), (Fitts's law).

Menu: task type → product → platforms → **how we work** (analysis / wireframe in chat / Figma) → **UI approach** (strict design system / + improvements / new visual) → **references** (mine / Mobbin / ui-craft taste / UI/UX Pro Max, several allowed) → number of variants. From the second task of the same type the last four collapse into one question: **«Same as last time»** or «Change». Project type (existing or from scratch) is set once in project setup and changes the menu defaults.

Rules for every workflow: new screens only on the **«Playground AI»** page (one section per task), existing screens are never edited unless you ask. Copy inside mockups is in the project UI language; page, section, frame names, annotations and labels in Figma are always English. The chat stays in Russian.

Project context (`context/*.md`) is saved in the project folder and in the attached Claude Project, so new chats have it. Ask to update the context when project facts change. No per-task logs.

## Install (once per designer)

You need access to this private repository (ask Viktorija) and to be signed in to GitHub on your computer (GitHub Desktop is enough).

**Claude Code**
```
/plugin marketplace add Kvikix/Chili_Design_Setup
/plugin install chili-design@chili-design-setup
```
Then `/plugin` → **Marketplaces** → `chili-design-setup` → **Enable auto-update**.

**Claude desktop app (Cowork)** — install the `.plugin` file shared by Viktorija, or from the Chili Labs plugin catalog once it's published there.

Also connect the **Figma** and **Atlassian (Jira)** connectors.

## Start a new project
1. Create an empty folder for the project (e.g. `Desktop/acme-app`) and open/connect it in Claude.
2. Ask to **set up the project** («setup project»). Answer the questions, review the generated files.
3. For every task ask for a **new task** («new task»).

Project files (`CLAUDE.md`, `context/`) live only in the project folder — never put client data in this repository.

## For the maintainer: updating skills
1. Edit files in `plugins/chili-design/skills/…`.
2. Bump `version` in `plugins/chili-design/.claude-plugin/plugin.json` (e.g. 0.2.0 → 0.2.1) — Claude only detects an update when the version changes — and add a changelog entry.
3. Run the tests (below), then build: `bash scripts/build-plugin.sh` → `chili-design.plugin` in the repo root.
4. GitHub Desktop → Summary → **Commit to main** → **Push origin**.

## Tests
**Static checks** — free, a few seconds, no model calls. Needs Node.js; or ask Claude with this folder connected: «run the plugin checks».
```
node scripts/check-plugin.mjs
```
Fails on: version not bumped after a change, skill name ≠ folder or equal to a built-in command, broken links between files, a skill that is referenced but missing, missing config keys, README out of date, malformed eval cases, a skill with no eval case.

**Behaviour evals** — `plugins/chili-design/evals/`, 21 cases in the `claude plugin eval` format (Claude Code 2.1.269+). Every run is a real model call on your account.
```
cd plugins/chili-design
claude plugin eval . --runs 1 --ablation none --scaffold     # quick regression: 21 runs
claude plugin eval . --tag trigger --runs 1 --ablation none   # only «the phrase starts the right skill»
claude plugin eval . --scaffold                               # full: 3 runs per case + no-plugin baseline
```
- `evals/trigger/` — 14 designer phrases, each must start the right skill («new task» → `new-task`, «make it shorter» → `concise`…).
- `evals/negative/` — 2 unrelated requests that must start no skill.
- `evals/branch/` — 5 routing cases: project not configured → points to setup; «check the frame» → `design-validate` without the menu; configured project → summary routes to `feature-update`; «same as last time» reuses `task_defaults`; `design-qa` builds the state matrix. Two of them create a demo project with `scaffold.sh`, hence `--scaffold`.
- New skill or new branch → add a case: copy a folder, change `prompt.md` and `graders/`.
- Figma, Jira and Mobbin are not connected inside an eval run — the cases test routing and text output, not drawing.
- An eval run does not load a project's `CLAUDE.md`. The two scaffold cases pass its «start every task with new-task» rule through `append_system_prompt`; without that rule a fully described task goes straight to `feature-update` and skips the menu and the summary.
- Last full run: 0.18.0, 2026-11-15 — 21 of 21 passed (`--runs 1 --ablation none --scaffold`, about $1.4 at list price).

## Structure
```
.claude-plugin/marketplace.json        catalog (one plugin)
plugins/chili-design/
  .claude-plugin/plugin.json           name + version
  skills/<skill>/SKILL.md              14 skills
  skills/project-setup/templates/      CLAUDE.md, SETUP_CHECKLIST.md, context/*.md for new projects
  references/principles.md            UX/UI principles: Laws of UX, NN/g guidance, WCAG 2.2 AA checklist
  references/design-workflow.md       shared rules for the design workflows: UX quality, UI approach, output, language, validation
  references/taste/index.md            Taste library index: which file to read when
  references/taste/core.md             UI craft taste guide (visual craft, anti «AI-generic»)
  references/taste/patterns/*.md       UX flow patterns: forms, search-filter, onboarding, auth, permissions, subscription-iap, payment-checkout (iOS / Android / Flutter notes)
  references/taste/platform/*.md       surfaces (sheet/modal/dialog rules), navigation, ios-native, android-native, flutter
  references/taste/creative.md         creative exploration: levels, axes, techniques, guardrails
  references/taste/chili/craft.md      opt-in: calibration ranges from Chili projects
  references/taste/chili/ideas.md      opt-in: idea bank from Chili projects
  references/writing.md                Writing rules: short, no filler, length limits
  references/state-matrix.md           State matrix: screen × default / empty / loading / error / offline / long text, cell values, severity
  references/chili-ds-template.md      Chili mobile DS template: tokens, type scale, spacing, effects, grids, component naming
  evals/                               behaviour tests for `claude plugin eval` (not packaged into the .plugin)
scripts/check-plugin.mjs               static checks
scripts/build-plugin.sh                checks + builds chili-design.plugin
```

## Changelog
**0.21.0**
- New `references/design-workflow.md`: UX quality, UI approach, output and language in Figma, facts and context, final `design-validate` — one place instead of copies in `feature-update`, `flow-builder`, `ui-variations`, `ui-craft` and `new-task` «Output rules».
- «Designer-facing text in English → say it in `language.chat`» moved to `writing.md`.
- `new-task`: removed the legacy UI/UX Pro Max option and the disabled `motion` / `store-assets` work types (also from the config template).
- Shorter descriptions for `new-task`, `project-setup`, `ui-craft`, `project-skills`, `menu`, `design-validate`.
- `chili/craft.md`: per-client tables replaced with anonymised calibration ranges (1194 → ~500 words).

**0.20.0**
- `references/ux-principles.md`, `nngroup.md` and `wcag-2.2.md` merged into one `references/principles.md` (Laws of UX, NN/g, WCAG 2.2 AA checklist), duplicates removed; all skills and `check-plugin.mjs` point to it.
- Client project cards (`taste/chili/projects/*`) removed from the plugin: a project card is now a section of that project's `context/design-system.md` (template + `project-setup`). `chili/craft.md` and `chili/ideas.md` stay as opt-in cross-project references.

**0.19.2**
- No Russian in the plugin: removed Russian example phrases from the `chili-brand`, `menu` and `project-skills` descriptions and from the README. `check-plugin.mjs` now fails on any Cyrillic in packaged files (eval prompts excluded — they test Russian triggers and are not packaged).

**0.19.1**
- `chili-brand`: new step **0. Deck gate** — before a deck is built: a new Figma file for the deck, the Chili brand library linked to it (checked, Claude asks the designer to enable it) and the content. Content comes from the designer, or Claude collects it only on an explicit «find the content yourself» — with sources, nothing invented, outline approved before the slide plan. Eval case `branch/brand-deck-gate`.

**0.19.0**
- New skill **`chili-brand`** for Chili Labs' own brand materials (client decks, webinar/event slides, social posts, event and blog covers). References in `references/brand/`: `rules.md` (brand edition of «avoid the AI look» — caps headlines, big numbers, 3D and blue backgrounds allowed in brand work; replaces UI step 0 for this work), `tokens.md` (palette, GT Walsheim Pro + Condensed Black + Barlow % + Montserrat tagline, radii 60/40/pill, slide grid), `presentations.md` (frame, modes, Slides-template catalogue, deck structure), `layouts.md` (central-block layout families, variation axes, variety rules, exploration step), `elements.md`, `social.md`, `voice.md` (EN only, facts to verify).
- `taste/core.md`: pointer — brand materials follow `references/brand/rules.md`.

**0.18.1**
- `ui-craft`: new step **0. Visual rules** (always on, override references): our projects' UI first (project screens, then `chili/craft.md`); no `·` dots as text separators; no all-caps in chips, captions, subtitles and eyebrows; no strokes on cards and elements unless the project already uses them or the designer asks (focus indicator excepted). Added to the self-check and to `taste/core.md` «Avoid the AI-generic look».
- `taste/core.md` «Avoid the AI-generic look» extended from designer write-ups on AI tells: gradient text and glows, border + big shadow, pill badge above the headline, icon squares over headings, cards as the default container, hero-metric cliché, neon dark mode, second-wave palettes (cream + terracotta, near-black + acid green), vague copy and placeholders, the «AI made this?» test.

**0.18.0**
- `new-task`: **«Same as last time»**. The answers to UI approach, references, creativity and variants are saved per work type in `task_defaults.last` of the project config; the next task of that type asks one question instead of up to four. «Change» opens the full menu; «reset task settings» clears the saved answers; `task_defaults.remember: false` switches it off. Reference links and images are never saved.
- `design-qa`: **state matrix** — every screen the task touches × default / empty / loading / error / offline / long text (`references/state-matrix.md`). Missing cells become findings with severity; QA offers to add the missing states and hands off to the build skill.
- **Tests**: `scripts/check-plugin.mjs` (static checks, no model calls) and `evals/` — 21 cases for `claude plugin eval` (14 trigger phrases, 2 negative, 5 routing branches). `scripts/build-plugin.sh` runs the checks and builds the `.plugin`.

**0.17.1**
- Skill `skills` renamed to `project-skills`: `/skills` is a built-in Claude command (lists all skills), so the bare name collided. Commands are documented in short form (`/menu`, `/project-skills`) with the always-working full form `/chili-design:<skill>`.

**0.17.0**
- Chili projects are now an **opt-in reference** («Chili projects» in new-task), not a default style; `house-style.md` removed.
- New `chili/craft.md` (measured from Figma tokens/layers: spacing, radii, typography, colour roles, component specs + calibration ranges) and `chili/ideas.md` (idea bank: principle + remix). Project cards updated with real tokens.
- New `taste/creative.md`: creativity levels safe / bold / wild, axes to vary, techniques, scorecard, guardrails, anti-generic check. ui-craft step 1b, ui-variations builds variants by axes and levels, new-task asks «How creative?».

**0.16.0**
- Taste library `chili/`: project cards (Balcia, ToTheRescue, Rover, Ganbei, Twino — from approved Figma screens) and `house-style.md` (recurring Chili solutions: visual DNA, navigation, filters, forms, commerce, overlays, states, copy, known inconsistencies).
- `ui-craft` reads house style + the closest project cards; citations «(Chili: <project>)».

**0.15.0**
- Taste library `platform/`: `surfaces.md` (which surface to use; bottom sheet rules — one sheet at a time, next step continues inside it, otherwise full-screen modal/push; dialog, toast, menu rules; layering limits), `navigation.md`, `ios-native.md`, `android-native.md`, `flutter.md` (platform strategy, cheap vs expensive, adaptive widgets, handoff).
- `feature-update`, `flow-builder`, `ui-variations` follow `surfaces.md` for every overlay; `design-qa` checks layering limits and platform behaviour.

**0.14.0**
- `ui-taste.md` → taste library `references/taste/`: `index.md`, `core.md` (former ui-taste), 7 pattern files (forms, search-filter, onboarding, auth, permissions, subscription-iap, payment-checkout) with flow, states, iOS/Android/Flutter notes, anti-patterns and QA checklist.
- `ui-craft` reads the index and only the relevant files; `feature-update`, `flow-builder`, `ui-variations` use pattern files for covered flows; `design-qa` uses their QA checklists.
- Placeholders for `platform/` and `chili/` (house style from Chili projects).

**0.13.0**
- New `menu`: list of chili-design commands, skills connected to the project and other skills available in the session.
- New `skills`: connect skills from other plugins/libraries to the project; saved as `external_skills` (id, label, use_for, stage: references | build | review | manual).
- `project-setup`: Step 3b runs `skills`. `new-task`: checks connected skills are installed for the designer (missing → skipped with a note), builds the references question from them, passes build/review skills to the workflows.

**0.12.1**
- Version bump so installed copies pick up the English-only files (0.12.0 installs could keep the older Russian text).

**0.12.0**
- `new-task`: question «Which connectors does this task need?» (Figma · Jira / Confluence · Mobbin). Unselected connectors are not used in the task; the summary reminds to switch them off in the chat to save context.
- Config: `connectors.ask` / `connectors.default`; `project-setup` asks for the usual set.
- All plugin files are English only; designer-facing questions and messages are said in `language.chat` (default Russian). Triggers work in any language.

**0.8.0**
- Figma language: UI copy in the project language; page/section/frame names, annotations and labels (`Variant A`, `Proposal`) always English (`language.design`).
- Default output page renamed to «Playground AI».
- `project-setup`: first question «existing product or new project»; new project = manual input (name, platform, domain, Figma links, design system), no Jira/Figma searches.
- `project-setup`: asks for a Confluence link or a free description of the project.
- Context files are saved to the attached Claude Project; `new-task` reads them from there if the folder has none; asking to update the context updates them.
- Shorter `CLAUDE.md` template (project specifics only) with a «Role» block: Senior UX/UI Product Designer, UX first, domain filled in by `project-setup`.
