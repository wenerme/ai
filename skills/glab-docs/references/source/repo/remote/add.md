---
title: '`glab repo remote add`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Add a Git remote for a GitLab project.

## Synopsis

Add a Git remote for a GitLab project using a project reference.

The remote name defaults to the first path component (the namespace),
so the remote identifies where the repository lives.

```plaintext
glab repo remote add <namespace/project> [flags]
```

## Examples

```console
# Add a remote repository (remote named "alice")
glab repo remote add alice/my-project

# Add a remote repository with a custom name
glab repo remote add alice/my-project --name upstream

# Add a remote repository in a subgroup (remote named "group")
glab repo remote add group/subgroup/my-project
```

## Options

```plaintext
  -n, --name string       Name for the remote (default: first path component)
  -p, --protocol string   Git protocol: ssh, https (default: git_protocol config)
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
