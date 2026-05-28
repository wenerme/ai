---
title: '`glab label get`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Returns a single label specified by the ID.

```plaintext
glab label get <label-id> [flags]
```

## Examples

```console
# Get label info using label 1234 as argument
glab label get 1234

# Get info about a label in another project
glab label get 1234 -R owner/repo
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
