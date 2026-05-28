---
title: '`glab runner-controller scope list`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

List scopes for a runner controller. (EXPERIMENTAL)

## Synopsis

Scopes can be for the instance (applies to all runners) or runner-level
(applies to specific runners).

This feature is an experiment and is not ready for production use.
It might be unstable or removed at any time.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

```plaintext
glab runner-controller scope list <controller-id> [flags]
```

## Examples

```console
# List all scopes for runner controller 42
glab runner-controller scope list 42

# List scopes as JSON
glab runner-controller scope list 42 --output json
```

## Options

```plaintext
      --jq string       Filter JSON output with a jq expression.
  -F, --output string   Format output as: text, json. (default "text")
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
