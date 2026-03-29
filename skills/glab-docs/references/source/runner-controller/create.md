---
title: '`glab runner-controller create`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Create a runner controller. (EXPERIMENTAL)

```plaintext
glab runner-controller create [flags]
```

## Examples

```console
# Create a runner controller with default settings
glab runner-controller create

# Create a runner controller with a description
glab runner-controller create --description "My controller"

# Create an enabled runner controller
glab runner-controller create --description "Production" --state enabled
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
