#!/usr/bin/env bash
# Freshness gate: docs/ROUTES.md must match regeneration from the src/app
# route structure. Fails loudly on hand-edits or route drift.
set -e

root=$(cd "$(dirname "$0")/.." && pwd)
fail=0

tmp=$(mktemp)
"$root/scripts/gen-docs.sh" "$tmp"
# Strip the generation date line before diffing (regeneration on a later day is not drift).
if ! diff -q <(grep -v '^> Generated' "$tmp") <(grep -v '^> Generated' "$root/docs/ROUTES.md" 2>/dev/null) >/dev/null 2>&1; then
  echo "STALE: docs/ROUTES.md does not match src/app — run 'scripts/gen-docs.sh'" >&2
  fail=1
fi
rm -f "$tmp"

[ $fail -eq 0 ] && echo "freshness: OK"
exit $fail
