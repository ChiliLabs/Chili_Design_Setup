---
name: design-qa
description: Review updated Figma screens against a Jira issue and approved design system; report defects and gaps without editing, including a state matrix (default, empty, loading, error, offline, long text) for every screen the task touches. Use before designer approval or development handoff.
argument-hint: "[Jira URL] [Figma frame or draft page URL]"
---

# Design QA

Writing: short, no filler — `../../references/writing.md` (applies to chat, plans, reports, annotations).

Input: $ARGUMENTS

UX quality: check against `../../references/principles.md` (relative to this SKILL.md) — states, accessibility (contrast in every theme, touch targets, colour-only meaning, text scaling), forms, navigation, microcopy. Accessibility against WCAG 2.2 AA (§12 of the same file). Every finding ends with a short source in parentheses — (NN/g), (WCAG 2.5.8), (Fitts's law); use NN/g severity logic for blocker / should fix / optional (§11 of the same file). If the change touches a flow covered by the taste library (`../../references/taste/index.md`), also check against that pattern file's «QA checklist». Always check overlays against `../../references/taste/platform/surfaces.md` §7 (layering limits: no sheet over sheet, no dialog over dialog, no blocking errors in toasts, no input lost on dismiss) and platform behaviour against the stack file in `taste/platform/`. Only for elements touched by the task unless a full audit is requested. Token hygiene: project DS first; Chili DS template (`../../references/chili-ds-template.md`, §9) for hardcoded values, wrong token layer, missing states, off-4px spacing.

1. Read task acceptance criteria and specified frames only. Compare with approved patterns and necessary components.
2. For the technical part (spacing scale, layer names, tokens/styles bound) run skill `design-validate` in report-only mode — QA never fixes.
3. Build the state matrix (`../../references/state-matrix.md`): one row per screen the task touches; columns Default · Empty · Loading · Error · Offline · Long text; cells `✓` frame / `✗` missing / `global` shared pattern / `n/a` + reason / `?` question. Every `✗` becomes a finding with the severity from that file. Screens given as a text description instead of frames → build the matrix from the description and say it was not checked in Figma.
4. Check scope, component reuse, typography/spacing consistency, copy overflow, obvious interaction gaps, and language (UI copy in `language.ui`; names, annotations, labels in English).
5. Classify findings: blocker / should fix / optional improvement. Distinguish observed issues from hypotheses.
6. Report verified checks, things not testable in Figma, and questions for PM/dev.
7. Do not edit design or expand to a full app audit unless explicitly requested. Missing states are reported, not drawn — end with «Add the missing states?»; on yes hand off to the work type's build skill (`feature-update` or `flow-builder`, `mode=build`) with the list of `✗` cells.

Output: the state matrix first, then a concise checklist with frame references and clear evidence. Never claim accessibility, localization or device testing was completed unless it was actually performed.
