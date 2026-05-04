---
title: '`glab mr close`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Close a merge request.

```plaintext
glab mr close [<id> | <branch>] [flags]
```

## Examples

```console
glab mr close 1

# Close multiple merge requests at once
glab mr close 1 2 3 4

# Use the checked-out branch
glab mr close

glab mr close branch
glab mr close username:branch
glab mr close branch -R another/repo
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
