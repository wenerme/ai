---
title: '`glab iteration list`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

List project iterations.

```plaintext
glab iteration list [flags]
```

## Aliases

```plaintext
ls
```

## Examples

```console
glab iteration list
glab iteration ls
glab iteration list -R owner/repository
glab iteration list -g mygroup
```

## Options

```plaintext
  -g, --group string    List iterations for a group.
      --jq string       Filter JSON output with a jq expression.
  -F, --output string   Format output as: text, json. (default "text")
  -p, --page int        Page number. (default 1)
  -P, --per-page int    Number of items to list per page. (default 30)
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
