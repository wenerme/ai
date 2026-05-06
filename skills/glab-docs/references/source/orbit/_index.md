---
title: '`glab orbit`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

GitLab Knowledge Graph commands. (EXPERIMENTAL)

## Synopsis

Access the GitLab Knowledge Graph (product name: Orbit) from the
CLI. Use `glab orbit remote` to query the remote API, or
`glab orbit local` (coming soon) for local operations.

This feature is an experiment and is not ready for production use.
It might be unstable or removed at any time.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

## Examples

```console
# Discover the remote Knowledge Graph
$ glab orbit remote status
$ glab orbit remote schema
$ glab orbit remote tools

# Run a query against the remote Knowledge Graph
$ glab orbit remote query ./query.json

# Inspect indexing progress for a namespace or project
$ glab orbit remote graph-status --full-path gitlab-org/gitlab

```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```

## Subcommands

- [`remote`](remote/_index.md)
