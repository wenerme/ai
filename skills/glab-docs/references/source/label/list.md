---
title: '`glab label list`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

List labels in the repository.

```plaintext
glab label list [flags]
```

## Aliases

```plaintext
ls
```

## Examples

```console
glab label list
glab label ls
glab label list -R owner/repository
glab label list -g mygroup
```

## Options

```plaintext
  -g, --group string    List labels for a group.
  -F, --output string   Format output as: text, json. (default "text")
  -p, --page int        Page number. (default 1)
  -P, --per-page int    Number of items to list per page. (default 30)
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
