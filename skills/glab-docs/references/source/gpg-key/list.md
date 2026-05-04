---
title: '`glab gpg-key list`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Get a list of GPG keys for the currently authenticated user.

```plaintext
glab gpg-key list [flags]
```

## Examples

```console
glab gpg-key list
```

## Options

```plaintext
  -F, --output string   Format output as: text, json. (default "text")
      --show-id         Shows IDs of GPG keys.
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
