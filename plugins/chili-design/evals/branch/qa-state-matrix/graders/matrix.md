---
type: llm
---

PASS if the reply contains a state matrix: a table with the two screens as rows and state columns that include empty, loading, error, offline and long text, AND it reports the empty state and the error state of the orders list as missing.
FAIL if there is no such table, if missing states are marked as present, or if the reply claims the frames were checked in Figma.
