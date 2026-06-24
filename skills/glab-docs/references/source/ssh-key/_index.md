---
title: '`glab ssh-key`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Manage SSH keys registered with your GitLab account.

## Synopsis

Add, list, get, and delete the SSH keys associated with your account.

GitLab uses SSH keys to authenticate Git operations over SSH, and,
depending on each key's usage type, to verify signed commits.

## Options

```plaintext
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```

## Subcommands

- [`add`](add.md)
- [`delete`](delete.md)
- [`get`](get.md)
- [`list`](list.md)
