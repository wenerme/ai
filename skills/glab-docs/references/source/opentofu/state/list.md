---
title: '`glab opentofu state list`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

List states.

## Synopsis

Lists the OpenTofu or Terraform states in the current project,
including each state's latest version serial and lock status.

```plaintext
glab opentofu state list [flags]
```

## Examples

```console
glab opentofu state list
glab opentofu state list -F json
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
