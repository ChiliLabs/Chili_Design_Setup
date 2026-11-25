# Chili craft specs — calibration ranges

Distilled from Figma tokens and layers of 5 approved Chili projects (Figma file 5L8UBFxoXx1nFHvZsgDPyL). Per-project specs live in each project's `context/design-system.md`; here only the ranges and lessons.
**Opt-in reference**, not a default style: read only when the designer picks «Chili projects» as a reference source or asks to compare with our projects. Use it to calibrate numbers for a new visual (`ui=free`, UI foundation) or to propose improvements (`ui=extend`). The current project's DS always wins; never reuse a client's palette or look. Cite as «(Chili: <project>)».

## 1. Spacing and layout (375 pt frames)
- Side margin 16 (20 for airy/premium). 4-pt base; 8 · 12 · 16 · 20 · 24 · 32 used most.
- Between sections 12–24 (up to 40 between home rows); inside cards padding 12–20, gap 8–16.
- Gap inside a group ≤ half the gap between groups.

## 2. Radii
- One family per product: small 12, medium 20, large 24–32, pill for buttons and chips.
- Cards 20–24 (32 for big blocks); inputs/search 12–32; sheet / surface top 24–32.
- Nested radius ≈ outer − padding (20 outer at 8 padding → 12 inside).

## 3. Typography
- One family, 8–10 sizes; body 15–16; captions ≥ 12 for meaning (10–11 only for tab labels and badges).
- Two calm weights (Regular / Medium) read «premium» (Chili: ToTheRescue, Twino); Bold headings read «consumer / energetic» (Chili: Balcia, Ganbei, Rover).
- Big numbers: large size + lighter weight + negative tracking (42 Medium, −1) looks more refined than Bold (Chili: Twino).

## 4. Colour roles
- Disabled = desaturated primary, not grey (Chili: Balcia, Rover, Twino).
- Dark themes: warm or neutral near-black, never pure #000.
- Status colours always paired with a soft background fill; danger can be a soft neutral fill + red text (Chili: ToTheRescue).
- 3–4 text levels on light themes; a sub-brand colour per product line works (Chili: Twino).

## 5. Components (range across projects)
| Component | Range |
|---|---|
| Primary CTA | h 48–56, full width, pill; sticky block with divider + blur, a white gradient fade, or a dark bar with r 24 top |
| Small / icon button | h 32 pill (price + «+»); icon button 40×40 r 12 or 44×44 circle |
| Chip | h 32–40, px 12, pill or r 12; count badge 20×20 inside |
| Segmented | h 40, r 12, inner option r 9–11; stories-style progress 4 h r 2, gap 8 |
| List row / cell | h 48–72; r 20–32 when cells are separate cards |
| Bottom sheet | top r 24–32, grabber 40×3, title 24 Semibold, content gap 20 |
| Tab bar | h 86–102 incl. home indicator, top r 32, blur on dark; central action 56 circle |
| Shadows | rare and tinted (warm 10 %, or primary 20 % glow) — never neutral grey heavy shadows |
