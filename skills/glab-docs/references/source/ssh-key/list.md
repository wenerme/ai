---
title: '`glab ssh-key list`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Get a list of SSH keys for the currently authenticated user.

## Synopsis

Each row shows the key's title, key, usage type, and creation date.
Pass `--show-id` to also display the key ID, which the `get` and `delete`
commands accept as an argument.

```plaintext
glab ssh-key list [flags]
```

## Examples

```console
# List your SSH keys
glab ssh-key list

# Include the key ID in the output
glab ssh-key list --show-id
```

## Options

```plaintext
      --jq string       Filter JSON output with a jq expression.
  -F, --output string   Format output as: text, json. (default "text")
  -p, --page int        Page number. (default 1)
  -P, --per-page int    Number of items to list per page. (default 30)
      --show-id         Shows IDs of SSH keys.
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
