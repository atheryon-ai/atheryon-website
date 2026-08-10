// {{PLACEHOLDER}} strings in site.ts are intentional TODO markers awaiting
// facts from Terry or Anna. Components must hide the containing block while a
// marker is present so unresolved copy never reaches the built output
// (enforced by `npm run verify:production-ready`).
export const isPending = (value: string) => value.includes('{{')
