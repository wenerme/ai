---
title: '`glab runner-controller token list`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

List tokens for a runner controller. (EXPERIMENTAL)

```plaintext
glab runner-controller token list <controller-id> [flags]
```

## Examples

```console
# List all tokens for runner controller 42
glab runner-controller token list 42

# List tokens as JSON
glab runner-controller token list 42 --output json
```

## Options

```plaintext
  -F, --output string   Format output as: text, json. (default "text")
  -p, --page int        Page number. (default 1)
  -P, --per-page int    Number of items per page. (default 30)
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
