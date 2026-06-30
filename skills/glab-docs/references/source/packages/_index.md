---
title: '`glab packages`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Manage packages in the GitLab package registry.

## Synopsis

Upload, download, list, and delete packages in a project's package
registry, using your existing `glab` authentication.

`list` and `delete` operate on packages of any type. `upload` and `download`
are limited to generic packages, which let you store and retrieve
arbitrary files identified by a package name, version, and file name.

## Options

```plaintext
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```

## Subcommands

- [`delete`](delete.md)
- [`download`](download.md)
- [`list`](list.md)
- [`upload`](upload.md)
