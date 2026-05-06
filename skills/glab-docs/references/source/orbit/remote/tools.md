---
title: '`glab orbit remote tools`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Show the GitLab Knowledge Graph MCP tool manifest. (EXPERIMENTAL)

## Synopsis

Calls `GET /api/v4/orbit/tools` and prints the MCP tool manifest
as pretty-printed JSON. The manifest carries the authoritative JSON
Schema for the query DSL inside the `parameters` field of the
`query_graph` tool. It is the source of truth for the query
body shape.

This feature is an experiment and is not ready for production use.
It might be unstable or removed at any time.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

```plaintext
glab orbit remote tools [flags]
```

## Examples

```console
$ glab orbit remote tools

```

## Options

```plaintext
      --hostname gitlab.com   GitLab hostname to query. Defaults to the current repository's host or gitlab.com.
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
