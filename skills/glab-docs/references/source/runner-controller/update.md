---
title: '`glab runner-controller update`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Update a runner controller. (EXPERIMENTAL)

```plaintext
glab runner-controller update <id> [flags]
```

## Examples

```console
# Update a runner controller's description
glab runner-controller update 42 --description "Updated description"

# Update a runner controller's state
glab runner-controller update 42 --state enabled

# Update both description and state
glab runner-controller update 42 --description "Production" --state enabled
```

## Options

```plaintext
  -d, --description string   Description of the runner controller.
  -F, --output string        Format output as: text, json. (default "text")
      --state string         State of the runner controller: disabled, enabled, dry_run.
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
