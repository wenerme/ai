---
title: '`glab runner-controller token rotate`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Rotate a token for a runner controller. (EXPERIMENTAL)

```plaintext
glab runner-controller token rotate <controller-id> <token-id> [flags]
```

## Examples

```console
# Rotate token 1 for runner controller 42 (with confirmation prompt)
glab runner-controller token rotate 42 1

# Rotate without confirmation
glab runner-controller token rotate 42 1 --force

# Rotate and output as JSON
glab runner-controller token rotate 42 1 --force --output json
```

## Options

```plaintext
  -f, --force           Skip confirmation prompt.
  -F, --output string   Format output as: text, json. (default "text")
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
