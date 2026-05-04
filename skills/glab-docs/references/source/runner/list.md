---
title: '`glab runner list`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

List runners.

## Synopsis

List runners for a project (default), group, or instance.

Instance scope requires administrator access.

```plaintext
glab runner list [flags]
```

## Aliases

```plaintext
ls
```

## Examples

```console
# List runners for the current project
glab runner list

# List runners for a specific project
glab runner list -R owner/repo

# List runners for a group
glab runner list --group mygroup

# List runners as JSON
glab runner list --output json
```

## Options

```plaintext
  -g, --group string    List runners for a group. Ignored if -R/--repo is set.
  -i, --instance        List all runners available to the user (instance scope).
  -F, --output string   Format output as: text, json. (default "text")
  -p, --page int        Page number. (default 1)
  -P, --per-page int    Number of items to list per page. (default 30)
  -R, --repo string     Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
