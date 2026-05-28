---
title: '`glab repo contributors`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Get repository contributors list.

```plaintext
glab repo contributors [flags]
```

## Aliases

```plaintext
users
```

## Examples

```console
# List contributors for the current repository
glab repo contributors

# List contributors for a specific repository
glab repo contributors -R gitlab-com/www-gitlab-com
```

## Options

```plaintext
      --jq string       Filter JSON output with a jq expression.
  -o, --order string    Return contributors ordered by name, email, or commits (orders by commit date) fields. (default "commits")
  -F, --output string   Format output as: text, json. (default "text")
  -p, --page int        Page number. (default 1)
  -P, --per-page int    Number of items to list per page. (default 30)
  -R, --repo string     Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
  -s, --sort string     Sort direction for --order field: asc or desc.
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
