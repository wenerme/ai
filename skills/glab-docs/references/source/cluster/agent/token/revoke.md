---
title: '`glab cluster agent token revoke`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Revoke an agent token.

## Synopsis

Revokes the specified token for a GitLab Agent for Kubernetes.
Requires the numeric agent ID and token ID.

```plaintext
glab cluster agent token revoke <agent-id> <token-id> [flags]
```

## Examples

```console
# Revoke token 456 for agent 123
glab cluster agent token revoke 123 456
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
