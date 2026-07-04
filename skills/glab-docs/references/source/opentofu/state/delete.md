---
title: '`glab opentofu state delete`'
stage: AI Coding
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Delete a state or a specific version of a state.

## Synopsis

Prompts for confirmation before deletion. Use `--force` to skip
the confirmation prompt.

```plaintext
glab opentofu state delete <state> [<serial>] [flags]
```

## Examples

```console
# Delete a state and all its versions
glab opentofu state delete production

# Delete only a specific version of a state, by serial
glab opentofu state delete production 42

# Delete without the confirmation prompt
glab opentofu state delete production --force
```

## Options

```plaintext
  -f, --force   Force delete the state without prompting.
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
