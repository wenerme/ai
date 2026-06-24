---
title: '`glab runner-controller get`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Get details of a runner controller. (EXPERIMENTAL)

## Synopsis

Retrieves details of a single runner controller, including its
connection status. This is an administrator-only feature.

This feature is an experiment and is not ready for production use.
It might be unstable or removed at any time.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

```plaintext
glab runner-controller get <controller-id> [flags]
```

## Examples

```console
# Get runner controller with ID 42
glab runner-controller get 42

# Get runner controller as JSON
glab runner-controller get 42 --output json
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
