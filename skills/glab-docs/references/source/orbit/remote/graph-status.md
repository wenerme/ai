---
title: '`glab orbit remote graph-status`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Show indexing progress for a namespace or project. (EXPERIMENTAL)

## Synopsis

Calls `GET /api/v4/orbit/graph_status` and prints the
indexing-progress response as pretty-printed JSON. The response
carries project counts, per-domain entity counts, and the overall
indexing run state for the requested scope.

Exactly one of `--namespace-id`, `--project-id`, or
`--full-path` is required. `--full-path` accepts the
full path of a project or group. For example, `gitlab-org/gitlab`.

Unlike `glab orbit remote query`, this endpoint defaults to
the `raw` response format. Use `--format llm` for
compact output intended for agents.

This feature is an experiment and is not ready for production use.
It might be unstable or removed at any time.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

```plaintext
glab orbit remote graph-status [flags]
```

## Examples

```console
# Look up indexing progress by full path
$ glab orbit remote graph-status --full-path gitlab-org/gitlab

# Or by numeric ID
$ glab orbit remote graph-status --project-id 278964
$ glab orbit remote graph-status --namespace-id 9970

# Compact output for agents
$ glab orbit remote graph-status --full-path gitlab-org/gitlab --format llm

```

## Options

```plaintext
  -f, --format raw                    Response format: raw (structured JSON) or `llm` (compact, intended for agents). (default "raw")
      --full-path gitlab-org/gitlab   Full path of a project or group, such as gitlab-org/gitlab. Cannot be used with the ID flags.
      --hostname gitlab.com           GitLab hostname to query. Defaults to the current repository's host or gitlab.com.
      --namespace-id int              Namespace (group) ID to inspect. Cannot be used with --project-id or --full-path.
      --project-id int                Project ID to inspect. Cannot be used with --namespace-id or --full-path.
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
