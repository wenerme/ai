---
title: '`glab runner-controller token revoke`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Revoke a token from a runner controller. (EXPERIMENTAL)

```plaintext
glab runner-controller token revoke <controller-id> <token-id> [flags]
```

## Examples

```console
# Revoke token 1 from runner controller 42 (with confirmation prompt)
glab runner-controller token revoke 42 1

# Revoke without confirmation
glab runner-controller token revoke 42 1 --force
```

## Options

```plaintext
  -f, --force   Skip confirmation prompt.
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
