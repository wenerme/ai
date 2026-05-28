---
title: '`glab deploy-key get`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Returns a single deploy key specified by the ID.

```plaintext
glab deploy-key get <key-id> [flags]
```

## Examples

```console
# Get deploy key with ID as argument
glab deploy-key get 1234
```

## Options

```plaintext
      --jq string       Filter JSON output with a jq expression.
  -F, --output string   Format output as: text, json. (default "text")
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
