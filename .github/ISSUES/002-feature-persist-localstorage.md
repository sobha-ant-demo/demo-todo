---
title: "Persist todos across page refresh"
labels: enhancement
---

## Problem

Todos live only in React state. Refreshing the page loses everything.

## Proposal

Persist the `todos` array to `localStorage` and hydrate from it on mount.

## Acceptance criteria

- Adding / toggling / deleting a todo survives a full page refresh.
- First visit (no stored data) still seeds the three demo items.
- No hydration mismatch warnings in the console.
