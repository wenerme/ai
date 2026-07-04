---
title: '`glab opentofu state`'
stage: AI Coding
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Work with the OpenTofu or Terraform states.

## Synopsis

List the states in the current project, lock or unlock a state to
control concurrent access, download a state as JSON, or delete a
state or one of its versions.

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```

## Subcommands

- [`delete`](delete.md)
- [`download`](download.md)
- [`list`](list.md)
- [`lock`](lock.md)
- [`unlock`](unlock.md)
