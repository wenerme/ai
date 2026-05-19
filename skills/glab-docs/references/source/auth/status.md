---
title: '`glab auth status`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

View authentication status.

## Synopsis

Verifies and displays information about your authentication state.

By default, this command checks the authentication state of the GitLab instance
determined by your current context (`git remote`, `GITLAB_HOST` environment variable,
or configuration). To check all configured instances, use `--all`.
To check a specific instance, use `--hostname`.

```plaintext
glab auth status [flags]
```

## Examples

```console
# Check authentication status for the instance in your current context
glab auth status

# Check authentication status for all configured instances
glab auth status --all

# Check authentication status for a specific instance
glab auth status --hostname gitlab.example.com

# Display the authentication token alongside the status
glab auth status --show-token

```

## Options

```plaintext
  -a, --all               Check the authentication status of all configured instances.
      --hostname string   Check the authentication status of a specific instance.
  -t, --show-token        Display the authentication token.
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
