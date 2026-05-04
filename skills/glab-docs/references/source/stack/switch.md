---
title: '`glab stack switch`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Switch between stacks. (EXPERIMENTAL)

## Synopsis

Switch between stacks to work on another stack created with "glab stack create".
To see the list of all stacks, check the `.git/stacked/` directory.

This feature is an experiment and is not ready for production use.
It might be unstable or removed at any time.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

```plaintext
glab stack switch <stack-name> [flags]
```

## Examples

```console
glab stack switch <stack-name>
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
