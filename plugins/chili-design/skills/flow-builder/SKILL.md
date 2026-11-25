---
name: flow-builder
description: Build or revise multi-screen user flows (existing product or new product) from the task and current patterns. Use when navigation, steps, branching or several connected screens change.
argument-hint: "[Jira URL] [Figma source URL (optional — output goes to «Playground AI»)] [mode=analyze|build] [ui=system|extend|free] [refs=...]"
---

# Flow builder

Writing: short, no filler — `../../references/writing.md` (applies to chat, plans, reports, annotations).

Input: $ARGUMENTS

Shared rules — read first: `../../references/design-workflow.md` (UX quality, UI approach, output and language in Figma, facts, final validation).

1. Default to `analyze`. Read task, affected flow context, related approved Figma frames, and directly relevant design-system sections. No global Figma scan.
2. Produce a compact flow map with steps, entry/exit, branches and screen reuse. Mark documented states versus suggestions and missing requirements.
3. Estimate the number of screens to add/change. If the task is ambiguous in high-impact product behavior, present decision points before writing.
4. For `build` mode, implement **one representative screen** first if significant new UI is required; then reuse approved patterns/components (or, for `extend`/`free`, the agreed direction) across remaining agreed steps. Only on the output page (`output.page_name`, default «Playground AI»), in the task Section.
5. Check navigation continuity, labels, touched error/loading/empty states, and task coverage. Report unknowns and Figma links when verified.
6. Final step of `build`: `design-validate` (shared rules §5).

Efficiency: prefer reusing existing screens and copying instances over constructing from primitives. Avoid full project crawling, repeated end-to-end redesign, or unrelated external research. Use checkpoints for large flows.
