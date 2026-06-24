---
title: '`glab mr subscribe`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Subscribe to a merge request.

## Synopsis

You receive notifications for updates when subscribed.

```plaintext
glab mr subscribe [<id> | <branch>] [flags]
```

## Aliases

```plaintext
sub
```

## Examples

```console
# Subscribe to a merge request
glab mr subscribe 123
glab mr sub 123
glab mr subscribe branch

# Subscribe to multiple merge requests
glab mr subscribe 123 branch
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
