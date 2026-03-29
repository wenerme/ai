---
title: '`glab runner unassign`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Unassign a runner from a project.

## Synopsis

Unassign a runner from a project.
You cannot unassign a runner from the owner project.
Use `glab runner delete` instead.

Requires the Maintainer or Owner role for the project.

```plaintext
glab runner unassign <runner-id> [flags]
```

## Examples

```console
# Unassign runner 9 from the current repository
glab runner unassign 9

# Unassign runner 9 from a specific repository
glab runner unassign 9 -R owner/repo
```

## Options

```plaintext
  -R, --repo OWNER/REPO   Select another repository. Can use either OWNER/REPO or `GROUP/NAMESPACE/REPO` format. Also accepts full URL or Git URL.
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
