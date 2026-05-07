---
title: '`glab mr note`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Manage comments and discussions on a merge request.

## Synopsis

Creates a comment by default. Use `--resolve` or
`--unresolve` to manage existing discussion threads.

```plaintext
glab mr note [<id> | <branch>] [flags]
```

## Aliases

```plaintext
comment
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```

## Subcommands

- [`create`](create.md)
- [`list`](list.md)
- [`reopen`](reopen.md)
- [`resolve`](resolve.md)
