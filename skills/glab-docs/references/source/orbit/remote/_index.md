---
title: '`glab orbit remote`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Interact with the remote GitLab Knowledge Graph. (EXPERIMENTAL)

## Synopsis

Query the remote GitLab Knowledge Graph (product name: Orbit)
directly from the CLI. All endpoints are user-scoped (not
project-scoped) and gated behind the `knowledge_graph`
feature flag.

Start with these discovery commands. They return the authoritative
ontology and query DSL schema:

```shell
glab orbit remote status                         # Is the service up?
glab orbit remote schema                         # What entities and edges exist?
glab orbit remote schema MergeRequest Project    # Show details for specific nodes
glab orbit remote dsl                            # Full query DSL JSON Schema
glab orbit remote tools                          # MCP tool manifest
```

After you know the shape of the graph, run a query:

```shell
glab orbit remote query path/to/query.json
cat query.json | glab orbit remote query -
```

Inspect indexing progress for a namespace or project:

```shell
glab orbit remote graph-status --full-path gitlab-org/gitlab
```

Exit codes:

- 1: Generic error.
- 2: Orbit endpoint unavailable (HTTP 404, for example, when the feature flag is off).
- 3: Not authenticated (HTTP 401).
- 4: Access denied (HTTP 403, for example, when no Knowledge Graph enabled
  namespaces exist).
- 5: Rate limited (HTTP 429).

This feature is an experiment and is not ready for production use.
It might be unstable or removed at any time.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

## Aliases

```plaintext
r
```

## Examples

```console
# Discovery workflow (always start here)
$ glab orbit remote status
$ glab orbit remote schema
$ glab orbit remote schema User Project MergeRequest
$ glab orbit remote dsl
$ glab orbit remote tools

# Run a query from a file
$ glab orbit remote query ./query.json

# Run a query from stdin (raw output for jq pipelines)
$ echo '{"query":{"query_type":"traversal","node":{"id":"p","entity":"Project"},"limit":5}}' \
    | glab orbit remote query --format raw -

# Inspect indexing progress
$ glab orbit remote graph-status --full-path gitlab-org/gitlab

```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```

## Subcommands

- [`dsl`](dsl.md)
- [`graph-status`](graph-status.md)
- [`query`](query.md)
- [`schema`](schema.md)
- [`status`](status.md)
- [`tools`](tools.md)
