---
title: '`glab runner delete`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Delete a runner.

## Synopsis

Permanently deletes a runner from the GitLab instance.

Prerequisites:

- Maintainer or Owner role for project runners.
- Owner role for group runners.
- Administrator access for instance runners.

```plaintext
glab runner delete <runner-id> [flags]
```

## Examples

```console
# Delete a runner (prompts for confirmation)
glab runner delete 6

# Skip confirmation prompt
glab runner delete 6 --force
```

## Options

```plaintext
  -f, --force   Skip confirmation prompt.
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
