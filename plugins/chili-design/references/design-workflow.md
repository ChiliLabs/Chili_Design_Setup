# Design workflow — shared rules

Read once at the start of `feature-update`, `flow-builder`, `ui-variations`, `ui-craft`; `new-task` passes these rules to every workflow. Then read only the referenced files the change touches.

## 1. UX quality
- Apply `principles.md` (same folder) — only the sections the change touches: states, forms, navigation, accessibility, content. Accessibility target: WCAG 2.2 AA (§12).
- Project design system and approved patterns take priority. Missing token/style/state → propose it in Chili DS template naming (`chili-ds-template.md`), labelled `Proposal`.
- Flow covered by the taste library (`taste/index.md` — forms, search/filters, onboarding, auth, permissions, subscriptions/paywall, payment/checkout) → read that pattern file: its flow, must-have states, platform notes (iOS / Android / Flutter). Approved project patterns still win.
- Anything opened over a screen (sheet, modal, dialog, menu, toast) → `taste/platform/surfaces.md`: one bottom sheet at a time, further steps inside the same sheet, otherwise a full-screen modal or push. Navigation changes → `platform/navigation.md`. Platform behaviour → the stack file (`ios-native.md` / `android-native.md` / `flutter.md`).
- Every notable decision ends with a short source in parentheses — (NN/g), (WCAG …), (… law) — see «How to argue decisions» in `principles.md`; in the plan (analyze) and in the report (build).

## 2. UI approach (from new-task)
- `ui=system` (default for existing projects) — only the product's `design_system` libraries.
- `ui=extend` — library first; every new component/token/style labelled `Proposal`.
- `ui=free` (default for greenfield) — new visual allowed.
- `extend` / `free` → invoke skill `ui-craft` (goal `screen`) for the visual direction before drawing, with `refs` (designer's references, Mobbin results, taste guide).
- Wireframe approved in chat → its structure spec is the layout source.
- In every approach: `themes`, UX principles and WCAG 2.2 AA stay mandatory.

## 3. Output in Figma
- New screens only on the page `output.page_name` (default «Playground AI») of the selected product's Figma file; create it if missing and say so. One Section per task, named by `output.section_naming` (English).
- `output.protect_existing: true` → never edit, move or delete existing screens; duplicate into the task Section and edit the copy. Originals only on explicit request in this chat.
- Language: copy inside mockups in the project UI language (`language.ui`); page, section, frame and layer names, annotations and labels (`Variant A`, `Proposal`) always in English. No Russian in Figma unless it is a UI language of the project.
- Report Figma links only after the tool confirms the write.

## 4. Facts and project context
- Never invent anything in `never_invent` or any business rule, in any mode — take it from the task or list it as an open question.
- Designer confirms new project facts (flow, rule, component, link) or asks to update the context → update the relevant `context/*.md` in the folder and in the attached Claude Project (`project_write`); show the change in 1–3 lines first. No per-task logs (`task_defaults.last` is one overwritten entry per work type, saved without asking).

## 5. Finish `build`
Last step: run skill `design-validate` on the frames created in this task (report first, fixes only after the designer confirms) and include its result in the report.
