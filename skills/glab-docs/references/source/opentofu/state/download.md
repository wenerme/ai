---
title: '`glab opentofu state download`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Download the given state and output as JSON to stdout.

## Synopsis

Downloads the latest serial version if no serial is specified.

```plaintext
glab opentofu state download <state> [<serial>] [flags]
```

## Examples

```console
# Download the latest serial of the state production
glab opentofu state download production

# Download the serial 42 of the state production
glab opentofu state download production 42
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
