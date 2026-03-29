---
title: '`glab runner update`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Update a runner.

## Synopsis

Updates settings for a GitLab CI/CD runner.

Use flags to update the runner configuration, such as the pause state.

Prerequisites:

- Maintainer or Owner role for project runners.
- Owner role for group runners.
- Administrator access for instance runners.

```plaintext
glab runner update <runner-id> [flags]
```

## Examples

```console
# Pause a runner
glab runner update <runner-id> --pause

# Unpause a runner
glab runner update <runner-id> --unpause

# Pause a runner in a specific project
glab runner update <runner-id> --pause -R owner/repo
```

## Options

```plaintext
      --pause     Pause the runner
      --unpause   Resume a paused runner
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
