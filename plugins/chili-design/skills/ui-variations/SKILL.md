---
name: ui-variations
description: Explore client-facing design alternatives (number set by the designer, default 3) for a feature, in an existing product or a new one. Choose when asked for concepts/options, not a direct Jira implementation.
argument-hint: "[feature or Jira URL] [Figma source URL (optional — output goes to «Playground AI»)] [variants=N (default 3, max 5)] [ui=system|extend|free] [refs=...] [creative=safe|bold|wild]"
---

# UI variations

Writing: short, no filler — `../../references/writing.md` (applies to chat, plans, reports, annotations).

Input: $ARGUMENTS

Shared rules — read first: `../../references/design-workflow.md` (UX quality, UI approach, output and language in Figma, facts, final validation).

Build variants with `../../references/taste/creative.md`: each variant changes ≥ 2 axes (layout model, interaction, density, content strategy, tone, signature moment), spread across creativity levels (at least one `safe` and one `bold`; `wild` only if allowed), label `Variant A — safe`. Use `taste/chili/ideas.md` / `craft.md` only if «Chili projects» was chosen as a reference.

1. Define the fixed requirements, allowed variation boundaries and decision criteria.
2. Inspect existing app style and relevant components (if any). Use Mobbin (skill `pattern-research`) only when chosen as a reference source or asked; cite borrowed patterns (Mobbin).
3. Determine `variants` (from the input or the designer; default 3, range 1–5). Before expensive Figma work, propose exactly that many **meaningfully distinct** options in a short table: idea (one line), axes changed, creativity level, benefits, trade-offs, risks, source. If the boundaries allow fewer genuinely different approaches than requested, say so and propose fewer rather than padding with cosmetic differences.
4. If the user has instructed direct creation, produce variations on the output page (`output.page_name`, default «Playground AI») — task Section, labelled `Variant A`, `Variant B`… with existing design tokens/components. Otherwise ask for option selection before full build.
5. Present comparable variants, not different business rules. Mark any concept requiring new components or engineering effort.
6. Final step of `build`: `design-validate` (shared rules §5).

Efficiency: one representative screen per option initially; expand the chosen option into a flow later. Avoid building several complete flows without explicit request.
