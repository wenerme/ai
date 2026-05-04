---
title: '`glab ci cancel pipeline`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Cancel CI/CD pipelines.

```plaintext
glab ci cancel pipeline <id> [flags]
```

## Examples

```console
glab ci cancel pipeline 1504182795
glab ci cancel pipeline 1504182795,1504182796
glab ci cancel pipeline "1504182795 1504182796"
glab ci cancel pipeline 1504182795,1504182796 --dry-run
```

## Options

```plaintext
      --dry-run   Simulates process, but does not cancel anything.
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
