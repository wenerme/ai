---
title: '`glab runner-controller delete`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Delete a runner controller. (EXPERIMENTAL)

```plaintext
glab runner-controller delete <id> [flags]
```

## Examples

```console
# Delete a runner controller (with confirmation prompt)
glab runner-controller delete 42

# Delete a runner controller without confirmation
glab runner-controller delete 42 --force
```

## Options

```plaintext
  -f, --force   Skip confirmation prompt.
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
