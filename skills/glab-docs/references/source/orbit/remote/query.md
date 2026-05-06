---
title: '`glab orbit remote query`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Execute a GitLab Knowledge Graph query. (EXPERIMENTAL)

## Synopsis

Calls `POST /api/v4/orbit/query` with a JSON request body and
prints the response as pretty-printed JSON. The body is read from
a file path or from standard input when the argument is `-`
or omitted.

The request body must be a full Orbit query envelope:

```json
{
  "query": { "query_type": "...", ... },
  "response_format": "llm" | "raw"
}
```

`--format` overrides the body's `response_format` value,
or sets it if absent. If neither the body nor `--format`
specifies a format, `llm` is used by default. The `llm`
format is compact and intended for agents. Use `--format raw`
when piping into `jq`.

The graph DSL JSON Schema is served by `glab orbit remote tools`
and is the source of truth for the body shape. See also
`glab orbit remote schema` for the graph ontology.

For the full query language reference with examples, fetch the docs
from the Knowledge Graph repository:

```console
glab api "projects/gitlab-org%2Forbit%2Fknowledge-graph/repository/files/docs%2Fsource%2Fqueries%2Fquery_language.md?ref=main" | jq -r .content | base64 -d
```

This feature is an experiment and is not ready for production use.
It might be unstable or removed at any time.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

```plaintext
glab orbit remote query [file|-] [flags]
```

## Examples

```console
# Run a query from a file
$ glab orbit remote query ./query.json

# Run a query from stdin
$ cat ./query.json | glab orbit remote query -

# Force raw output (pipeable into jq)
$ glab orbit remote query --format raw ./query.json

```

## Options

```plaintext
  -f, --format llm            Response format: llm (compact, intended for agents) or `raw` (structured JSON). (default "llm")
      --hostname gitlab.com   GitLab hostname to query. Defaults to the current repository's host or gitlab.com.
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
