---
title: '`glab runner-controller list`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

List runner controllers. (EXPERIMENTAL)

```plaintext
glab runner-controller list [flags]
```

## Examples

```console
# List all runner controllers
glab runner-controller list

# List runner controllers as JSON
glab runner-controller list --output json
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
