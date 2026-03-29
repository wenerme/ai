---
title: '`glab runner assign`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Assign a runner to a project.

## Synopsis

Assigns a runner to a project.

Requires the Maintainer or Owner role for the project.

```plaintext
glab runner assign <runner-id> [flags]
```

## Examples

```console
# Assign runner 9 to the current repository
glab runner assign 9

# Assign runner 9 to a specific repository
glab runner assign 9 -R owner/repo
```

## Options

```plaintext
  -R, --repo OWNER/REPO   Select another repository. Can use either OWNER/REPO or `GROUP/NAMESPACE/REPO` format. Also accepts full URL or Git URL.
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
