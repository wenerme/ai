---
title: '`glab deploy-key delete`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Deletes a single deploy key specified by the ID.

## Synopsis

Pass the ID of the key to delete as an argument. Find key IDs by
running `glab deploy-key list --show-id`. Use `--repo` to target a
project other than the current one.

This action is permanent and cannot be undone.

```plaintext
glab deploy-key delete <key-id> [flags]
```

## Examples

```console
# Delete deploy key with ID as argument
glab deploy-key delete 1234
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
