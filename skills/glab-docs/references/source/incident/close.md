---
title: '`glab incident close`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Close an incident.

```plaintext
glab incident close [<id> | <url>] [flags]
```

## Aliases

```plaintext
resolve
```

## Examples

```console
glab incident close 123
glab incident close https://gitlab.com/NAMESPACE/REPO/-/issues/incident/123
```

## Options inherited from parent commands

```plaintext
  -h, --help              Show help for this command.
  -R, --repo OWNER/REPO   Select another repository. Can use either OWNER/REPO or `GROUP/NAMESPACE/REPO` format. Also accepts full URL or Git URL.
```
