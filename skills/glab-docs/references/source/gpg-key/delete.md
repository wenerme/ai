---
title: '`glab gpg-key delete`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Deletes a single GPG key specified by the ID.

## Synopsis

Pass the ID of the key to delete as an argument. Find key IDs by
running `glab gpg-key list --show-id`.

This action is permanent and cannot be undone.

```plaintext
glab gpg-key delete <key-id> [flags]
```

## Examples

```console
# Delete GPG key with ID as argument
glab gpg-key delete 7750633
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
