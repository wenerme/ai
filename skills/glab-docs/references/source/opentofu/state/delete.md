---
title: '`glab opentofu state delete`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Delete the given state or if the serial is provided only that version of the given state.

```plaintext
glab opentofu state delete <state> [<serial>] [flags]
```

## Options

```plaintext
  -f, --force   Force delete the state without prompting.
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
