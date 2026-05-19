---
title: '`glab alias delete`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Delete an alias.

## Synopsis

Delete an alias by name. The deletion is permanent. To restore the
alias, run `glab alias set` with the original expansion.

```plaintext
glab alias delete <alias name> [flags]
```

## Examples

```console
# Delete the alias named "mrv"
glab alias delete mrv

```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
