---
title: '`glab auth configure-docker`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Register glab as a Docker credential helper.

## Synopsis

Configures Docker to use glab for authentication with GitLab
container registries. This command runs only on Linux and macOS.

After you run this command, Docker uses glab to obtain credentials
when it pulls from or pushes to a GitLab container registry.

```plaintext
glab auth configure-docker [flags]
```

## Examples

```console
# Configure Docker to use glab for GitLab container registry authentication
glab auth configure-docker

```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
