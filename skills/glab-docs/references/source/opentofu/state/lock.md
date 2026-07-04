---
title: '`glab opentofu state lock`'
stage: AI Coding
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Lock the given state.

## Synopsis

Locking a state prevents others from modifying it until it is
unlocked, which avoids concurrent writes that could corrupt the
state.

```plaintext
glab opentofu state lock <state> [flags]
```

## Examples

```console
glab opentofu state lock production
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
