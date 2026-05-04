---
title: '`glab ssh-key get`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Returns a single SSH key specified by the ID.

```plaintext
glab ssh-key get <key-id> [flags]
```

## Examples

```console
# Get ssh key with ID as argument
glab ssh-key get 7750633

# Interactive
glab ssh-key get

# Interactive, with pagination
glab ssh-key get -P 50 -p 2
```

## Options

```plaintext
  -F, --output string   Format output as: text, json. (default "text")
  -p, --page int        Page number. (default 1)
  -P, --per-page int    Number of items to list per page. (default 20)
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
