# State matrix

Used by `design-qa` (always) and by the build skills as a self-check. One row per screen the task touches, one column per state. Shows at a glance which states are designed and which are missing.

## Columns
| State | Applies when | Expect |
|---|---|---|
| Default | always | the screen with typical data |
| Empty | the screen shows a list, feed, search results, history or any content that can be zero | why it is empty + the next action; first-time empty ≠ «nothing found» |
| Loading | content comes from the network, or an action takes longer than ~400 ms | skeleton for content; progress on the button for an action; no blank screen |
| Error | any request, form submit, payment, upload | what happened + how to fix + retry; forms — inline validation next to the field; input is kept |
| Offline | the screen needs the network | cached content + banner, or a blocking state with retry; actions that need the network are disabled with a reason |
| Long text | any dynamic or translated text: names, titles, amounts, labels | longest UI language from `language.ui`, wrap or truncation rule, large amounts, text at 200 % |

Extra columns only when the task touches them: Success · Disabled · No permission · Partial data.

## Cells
- `✓` — a frame exists (give its name or link)
- `✗` — applies, no frame → finding
- `global` — covered by a shared pattern or component of the project (name it, e.g. the app-wide offline banner)
- `n/a` — does not apply + reason in 2–4 words («static screen», «no dynamic text»)
- `?` — cannot tell from Figma → question for PM/dev, not a finding

Never mark `✓` without seeing the frame, and never `n/a` just because the task does not mention the state.

## Where to look
The task's section and the frames given, then the project's approved shared patterns (`context/design-system.md`, `figma_pages_of_truth`). Bounded search — never crawl the whole file. More than 12 screens → group screens that share a template into one row.

## Severity of `✗`
- **Blocker** — the state is on the task's main path: error on submit or payment, empty state of a list that is the screen's main content, long text that clips the primary action or a money amount.
- **Should fix** — every other missing state that applies.
- **Optional** — extra columns the task does not require.

Sources: Loading (Doherty threshold; NN/g — visibility of system status) · Empty (NN/g) · Error (NN/g — help users recover from errors) · Offline (NN/g — visibility of system status) · Long text (WCAG 1.4.4, 1.4.10).

## Output
```
| Screen | Default | Empty | Loading | Error | Offline | Long text |
|---|---|---|---|---|---|---|
| Orders list | ✓ «Orders / Default» | ✗ | ✓ «Orders / Skeleton» | ✗ | global: offline banner | ? |
| Order details | ✓ | n/a: single record | ✗ | ✗ | global: offline banner | ✗ |
```
Under the table: one line per `✗` with severity and source, then the `?` questions. Headers and notes in `language.chat`; frame names as they are in Figma.
