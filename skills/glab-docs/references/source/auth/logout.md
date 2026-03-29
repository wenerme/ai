---
title: '`glab auth logout`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Log out from a GitLab instance.

## Synopsis

Log out from a GitLab instance.
Configuration and credentials are stored in the global configuration file (default `~/.config/glab-cli/config.yml`)

```plaintext
glab auth logout [flags]
```

## Examples

```console
# Log out of a specific instance
glab auth logout --hostname gitlab.example.com
```

## Options

```plaintext
      --hostname string   The hostname of the GitLab instance.
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
