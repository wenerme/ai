---
title: '`glab release`'
stage: AI Coding
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Manage GitLab releases.

## Synopsis

A release bundles a Git tag with release notes and downloadable
assets, such as binaries or source archives.

Create and update releases, list and view them, upload assets, and
download or delete releases. Use `--repo` to target a project other
than the current one.

## Options

```plaintext
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```

## Subcommands

- [`create`](create.md)
- [`delete`](delete.md)
- [`download`](download.md)
- [`list`](list.md)
- [`upload`](upload.md)
- [`view`](view.md)
