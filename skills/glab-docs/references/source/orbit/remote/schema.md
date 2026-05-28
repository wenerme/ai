---
title: '`glab orbit remote schema`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Show the GitLab Knowledge Graph ontology. (EXPERIMENTAL)

## Synopsis

Calls `GET /api/v4/orbit/schema` and prints the response as
pretty-printed JSON. The response carries the authoritative graph
ontology, including domains, nodes, and edges. It is the source
of truth when writing queries.

Positional arguments are passed through as the `expand` query
parameter (comma-joined). Listed nodes are returned with their full
properties, style, and incoming and outgoing edge lists. Unlisted nodes
remain summary-only in the same response.

This feature is an experiment and is not ready for production use.
It might be unstable or removed at any time.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

```plaintext
glab orbit remote schema [node...] [flags]
```

## Examples

```console
# Show the full schema (compact, no node detail)
$ glab orbit remote schema

# Show details for specific nodes
$ glab orbit remote schema User Project MergeRequest

```

## Options

```plaintext
      --hostname gitlab.com   GitLab hostname to query. Defaults to the current repository's host or gitlab.com.
      --jq string             Filter JSON output with a jq expression.
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
