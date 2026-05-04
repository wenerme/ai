---
title: '`glab mr delete`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Delete a merge request.

```plaintext
glab mr delete [<id> | <branch>] [flags]
```

## Aliases

```plaintext
del
```

## Examples

```console
glab mr delete 123

# Delete multiple merge requests by ID and branch name
glab mr delete 123 branch-name 789

# Delete merge requests !1, !2, !3, !4, !5
glab mr delete 1,2,branch-related-to-mr-3,4,5

glab mr del 123
glab mr delete branch
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
