---
title: "\"Items left\" counter shows the wrong number"
labels: bug
---

## Steps to reproduce

1. `npm run dev` and open http://localhost:3000
2. Observe the seeded list: 3 todos, 1 of which is checked.
3. Look at the footer.

## Expected

Footer should read **2 items left** (two unchecked todos).

## Actual

Footer reads **1 items left**. Checking more items makes the number go *up*.

## Notes

Likely an inverted predicate in `components/TodoList.tsx` where `remaining` is computed.
