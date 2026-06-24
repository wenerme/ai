---
title: '`glab runner-controller token create`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Create a token for a runner controller. (EXPERIMENTAL)

## Synopsis

Store the token value securely before closing the terminal. You cannot
retrieve the token again.

This feature is an experiment and is not ready for production use.
It might be unstable or removed at any time.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

```plaintext
glab runner-controller token create <controller-id> [flags]
```

## Examples

```console
# Create a token for runner controller 42
glab runner-controller token create 42

# Create a token with a description
glab runner-controller token create 42 --description "production"

# Create a token and output as JSON
glab runner-controller token create 42 --output json
```

## Options

```plaintext
  -d, --description string   Description of the token.
      --jq string            Filter JSON output with a jq expression.
  -F, --output string        Format output as: text, json. (default "text")
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
