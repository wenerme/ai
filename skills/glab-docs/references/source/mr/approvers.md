---
title: '`glab mr approvers`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

List eligible approvers for merge requests in any state.

## Synopsis

Lists users and groups eligible to approve, based on the approval
rules configured for the project.

```plaintext
glab mr approvers [<id> | <branch>] [flags]
```

## Options

```plaintext
  -F, --output string   Format output as: text, json. (default "text")
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
