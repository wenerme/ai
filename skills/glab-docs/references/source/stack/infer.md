---
title: '`glab stack infer`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Add layers to a stack based on a range of commits. (EXPERIMENTAL)

## Synopsis

Add layers to a stack based on a range of commits.
This will append layers to an existing stack, or create a new one if needed.

This feature is an experiment and is not ready for production use.
It might be unstable or removed at any time.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

```plaintext
glab stack infer <revision-range> [flags]
```

## Examples

```console
# Commit range syntax is similar to "git rev-list".
# The start of the range must be a branch name (not a relative ref like HEAD~5).

## Infer stack from commits between main and current branch
$ glab stack infer main..HEAD

## Infer stack from commits on a feature branch since it diverged from develop
$ glab stack infer develop..HEAD

## Create a new stack with a specific name
$ glab stack infer --name feature-stack main..HEAD

```

## Options

```plaintext
  -n, --name string   Name for the new stack (used when creating a stack)
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
