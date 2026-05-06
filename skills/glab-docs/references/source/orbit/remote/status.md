---
title: '`glab orbit remote status`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Show GitLab Knowledge Graph cluster health. (EXPERIMENTAL)

## Synopsis

Calls `GET /api/v4/orbit/status` and prints the cluster health
response as pretty-printed JSON. Use this command to confirm Orbit
is enabled and reachable for your user. It is the first step in
the Orbit discovery workflow.

This feature is an experiment and is not ready for production use.
It might be unstable or removed at any time.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

```plaintext
glab orbit remote status [flags]
```

## Examples

```console
$ glab orbit remote status

```

## Options

```plaintext
      --hostname gitlab.com   GitLab hostname to query. Defaults to the current repository's host or gitlab.com.
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
