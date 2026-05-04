---
title: '`glab mr issues`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Get issues related to a particular merge request.

```plaintext
glab mr issues [<id> | <branch>] [flags]
```

## Aliases

```plaintext
issue
```

## Examples

```console
# List issues for merge request 46
glab mr issues 46
glab mr issues branch

# Use the checked-out branch
glab mr issues
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
