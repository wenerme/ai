---
title: '`glab schedule run`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Run the specified scheduled pipeline.

```plaintext
glab schedule run <id> [flags]
```

## Examples

```console
# Run a scheduled pipeline with ID 1
$ glab schedule run 1
Started schedule with ID 1
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
