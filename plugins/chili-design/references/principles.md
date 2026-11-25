# UX/UI principles — Laws of UX, NN/g, WCAG 2.2 AA

One reference for designing (`feature-update`, `flow-builder`, `ui-variations`, `ui-craft`, `wireframe`) and reviewing (`design-qa`). Read only the sections the change touches.
**Priority:** task requirements → project design system and approved patterns → these principles. If a principle conflicts with an approved project pattern, keep the pattern and mention the trade-off; don't silently diverge.

## How to argue decisions (required)
- Every notable design decision, variant trade-off and QA finding ends with a short source in parentheses — nothing more: **(NN/g)**, **(WCAG 1.4.3)**, **(Fitts's law)**, **(HIG)**, **(Material)**, **(Chili: Ganbei)** — a solution from `taste/chili/ideas.md` or `taste/chili/craft.md`.
- Examples: «Full-width "Save" button at the bottom (Fitts's law)» · «List has no empty state (NN/g)» · «Caption contrast 2.8:1 in dark theme (WCAG 1.4.3)». Write them in `language.chat`.
- No article titles, no explanations of the source, max two sources per line.
- Never invent a source; cite only what is covered here and in the taste library (`taste/`).
- NN/g items below are own-words summaries of nngroup.com guidance — cite simply as (NN/g).

## 1. Clarity and hierarchy
- One primary action per screen; secondary actions visually weaker; destructive actions never styled as primary.
- One focal point: size, colour, contrast, spacing and position signal importance (NN/g). Most important information first; scannable headings, short labels.
- Group related content (proximity, cards, sections); consistent spacing from the DS scale.
- Progressive disclosure: essential first, advanced behind expand/«More»; keep levels few (NN/g).
- Interactive elements must look interactive — weak signifiers lower clickability (NN/g).
- Cards for heterogeneous browsable content, not dense comparison (lists/tables); accordions for long content on mobile, not when users need most of it at once (NN/g).

## 2. States — design every state the change touches
Default · loading · empty · error · success/confirmation · disabled (and why) · offline/no permission · partial / very long data · first-time vs returning · subscriber vs non-subscriber if relevant.
- Loading: 0.1 s feels instant · 1 s keeps the flow (show activity) · 10 s is the attention limit (progress + cancel) (NN/g). Skeleton for content loads of ~2–10 s, spinner for short actions, progress bar for long ones.
- Empty: why it's empty, what will appear, the next action — a teaching moment (NN/g).
- Error: what happened, how to fix, retry; keep the user's input.
- Toasts/snackbars only for low-priority, non-blocking feedback; never hide critical info in an auto-dismissing toast (NN/g).
- Self-check before hand-off: `state-matrix.md` (same folder) — screen × default / empty / loading / error / offline / long text; `design-qa` reports every missing cell.

## 3. Feedback and control — the 10 heuristics (NN/g)
Visibility of system status · match with the real world · user control and freedom (undo, exit) · consistency and standards · error prevention · recognition rather than recall · flexibility and efficiency · aesthetic and minimalist design · help users recognise, diagnose, recover from errors · help and documentation.
- Immediate response to every tap (pressed state, progress); show where the user is and what's happening (saved, syncing).
- Prevent errors first: constraints, sensible defaults, inline validation on blur, not on every keystroke.
- Confirmation only for consequential, irreversible actions; the button names the action («Delete test?» → «Delete»), not «OK». Overused confirmations get clicked through — prefer undo.
- Recognition over recall: show options, recent items, current filters/period.
- Same element = same behaviour across the app and between mobile and web.

## 4. Forms and input
- Single column; visible labels above fields — a placeholder is not a label (it disappears and looks like a value) (NN/g); helper text for format rules.
- Group related fields; mark optional (or required) consistently; don't split one value across fields without need.
- Right keyboard type (numeric, email, date picker); autofill where possible.
- Error next to the field, in plain language, says how to fix it; input is preserved.
- Primary button reachable (bottom on mobile); working state clear while submitting.

## 5. Navigation and flows
- User always knows where they are and how to go back; back never loses entered data without warning.
- Minimise steps; one purpose per step; show progress in multi-step flows. Wizards for infrequent linear tasks with dependent steps (NN/g).
- Modals interrupt: only for short, critical, focused tasks, always with an obvious close (NN/g). Overlay rules: `taste/platform/surfaces.md`.
- Hidden navigation (hamburger) gets used less — keep top destinations visible (tab bar) (NN/g). Tabs switch related views of one level, clear selected state, short labels.
- Breadcrumbs/wayfinding in hierarchical web structures.
- Entry and exit points defined; deep links and notifications land on a meaningful screen.

## 6. Mobile ergonomics and platforms
- Touch targets ≥ 44×44 pt (iOS) / 48×48 dp (Android), ≥ 8 pt between targets.
- Key actions in the thumb zone; no critical actions in top corners on large phones.
- Respect safe areas, system bars, keyboard overlap.
- Platform conventions where the app follows them (iOS HIG / Material): back navigation, sheets, pickers, switches.
- Bottom sheets for contextual actions/details — dismissible, never stacked (NN/g).
- Onboarding: teach in context at the moment of need rather than a deck of intro cards (NN/g).
- Notifications: relevant, timely, actionable, user-controlled (NN/g).
- Web: hover and focus states, keyboard navigation, sensible max content width.

## 7. Content and microcopy
- Users scan, not read: front-load headings and first words, subheads, bullets, bold key terms (NN/g).
- Plain, specific, action-oriented: buttons say what happens («Save changes», not «OK»); user's vocabulary, no jargon.
- Same term for the same thing everywhere; follow the project's terminology and UI language.
- Leave ~30–40 % extra space for translations and long names; truncate with ellipsis + full text available.
- Numbers, dates, currency in the project's locale format.

## 8. Responsive and localisation readiness
- Check smallest and largest supported widths (e.g. 320 / 375 / 430 pt mobile; 1280 / 1440 px web) when layout changes.
- Long strings, long names, 0 / 1 / many items, maximum counts.

## 9. When proposing alternatives (ui-variations)
- Variants differ in approach (structure, interaction, information density), not just styling.
- For each: user benefit, trade-off, risk, effort (new components? dev complexity?).
- Patterns from real apps (Mobbin) only when asked or clearly useful; cite the source; never treat them as business truth.

## 10. Laws of UX (cite as «Fitts's law», «Hick's law» … in `language.chat`)
- **Fitts** — big, close targets for frequent/primary actions.
- **Hick** — more choices = slower decisions: reduce and group options, highlight the recommended one.
- **Jakob** — users expect your app to work like the apps they already use: prefer familiar patterns.
- **Miller / chunking** — chunk information (cards, groups, ~5–9 items), don't rely on recall.
- **Tesler** — complexity can't vanish; move it from the user to the system (defaults, prefill).
- **Doherty threshold** — feedback within ~400 ms keeps users engaged: optimistic UI, skeletons.
- **Peak-end** — people judge by the peak and the end: design success states and endings carefully.
- **Goal-gradient** — motivation grows near the goal: show progress.
- **Von Restorff** — the item that differs is remembered: emphasise one thing only.
- **Serial position** — first and last items are remembered best: key items at the ends of lists/nav.
- **Aesthetic-usability** — polished UI feels easier to use but can hide usability problems in tests.
- **Postel** — liberal in what you accept (input formats), strict in what you send.
- **Gestalt: proximity, similarity, common region** — spacing, look and containers communicate relationships.

## 11. Research and QA severity (NN/g)
- 5 users per round find most issues; test early and often.
- Severity = frequency × impact × persistence → **blocker / should fix / optional** in QA findings.
- Critique against goals and principles, not taste.

## 12. Accessibility — WCAG 2.2 AA checklist
Standard: **WCAG 2.2** (W3C Recommendation, Oct 2023; ISO/IEC 40500:2025). WCAG 3.0 is a draft, not a standard. Target **AA** (includes A). Cite as «(WCAG 1.4.3)». Only criteria a designer controls. ★ = new in 2.2.

**Perceivable**
- **1.1.1 Non-text content (A)** — icon-only buttons, images, charts have a text alternative; annotate for dev.
- **1.3.1 Info and relationships (A)** — visible structure (headings, lists, groups, table headers, form labels) is real structure.
- **1.3.3 Sensory characteristics (A)** — instructions don't rely only on shape, position or colour.
- **1.3.4 Orientation (AA)** — works in portrait and landscape unless essential.
- **1.3.5 Identify input purpose (AA)** — personal-data fields have a defined purpose for autofill.
- **1.4.1 Use of colour (A)** — colour is never the only signal for status, errors, selection, links (add icon, text or pattern).
- **1.4.3 Contrast minimum (AA)** — text ≥ 4.5:1; large text (≥ 24 px regular / ≥ 18.66 px bold) ≥ 3:1. Check **every theme**.
- **1.4.4 Resize text (AA)** — scales to 200 % (Dynamic Type / font scaling) without clipping; no fixed heights for text.
- **1.4.10 Reflow (AA)** — works at 320 CSS px width without horizontal scrolling (except maps, tables).
- **1.4.11 Non-text contrast (AA)** — component boundaries, focus indicators, icons, chart parts ≥ 3:1.
- **1.4.12 Text spacing (AA)** — layout survives increased line/letter/word/paragraph spacing.
- **1.4.13 Content on hover or focus (AA)** — tooltips/popovers dismissible, hoverable, persistent.

**Operable**
- **2.1.1 Keyboard (A)** — (web) every action by keyboard; design focus order.
- **2.2.1 Timing adjustable (A)** — timeouts can be extended; warn before session expiry.
- **2.3.1 Three flashes (A)** — no flashing more than 3 times per second (animations, Lottie).
- **2.4.2 Page titled (A)** / **2.4.6 Headings and labels (AA)** — descriptive titles, headings, labels.
- **2.4.3 Focus order (A)** — logical, matches the visual order; screen-reader order meaningful.
- **2.4.4 Link purpose (A)** — link/button text makes sense on its own.
- **2.4.7 Focus visible (AA)** — clear focus indicator on every interactive element.
- ★ **2.4.11 Focus not obscured (AA)** — focused element not hidden by sticky headers, bottom bars, banners.
- **2.5.1 Pointer gestures (A)** — pinch/swipe have a single-tap alternative.
- **2.5.2 Pointer cancellation (A)** — actions fire on release; cancel by moving away.
- **2.5.3 Label in name (A)** — accessible name contains the visible label; icon-only buttons have a name.
- ★ **2.5.7 Dragging movements (AA)** — reorder, sliders, swipe-to-delete also work with single taps.
- ★ **2.5.8 Target size minimum (AA)** — ≥ 24×24 CSS px or enough spacing; project default stays **44×44 pt iOS / 48×48 dp Android**.

**Understandable**
- **3.1.1 / 3.1.2 Language (A/AA)** — screen language and language switches defined.
- **3.2.1 / 3.2.2 On focus / On input (A)** — focusing or changing a field doesn't navigate or submit unexpectedly.
- **3.2.3 Consistent navigation / 3.2.4 Consistent identification (AA)** — same navigation and names across screens.
- ★ **3.2.6 Consistent help (A)** — help/contact/chat entry in the same place on every screen that has it.
- **3.3.1 Error identification (A)** / **3.3.2 Labels or instructions (A)** / **3.3.3 Error suggestion (AA)** — errors in text at the field, visible labels and format hints, how to fix.
- **3.3.4 Error prevention (AA)** — legal/financial/data-changing submissions reversible, checked or confirmed.
- ★ **3.3.7 Redundant entry (A)** — don't ask for the same data twice in a flow; prefill or let the user select it.
- ★ **3.3.8 Accessible authentication (AA)** — no cognitive tests at login: allow paste and password managers, offer biometrics / magic link / passkeys.

**Robust**
- **4.1.2 Name, role, value (A)** — custom components declare role and state (selected, expanded, disabled); annotate for dev.
- **4.1.3 Status messages (AA)** — toasts, «saved», counters announced without moving focus.

AAA, apply when cheap: 2.4.12 Focus not obscured (enhanced), ★ 2.4.13 Focus appearance, 2.5.5 Target size enhanced (44×44), 3.3.9 Accessible authentication (enhanced).

## Output habit
One line per decision or finding, ending with the short source in parentheses. Don't lecture.
