---
title: '`glab orbit remote status`'
stage: AI Coding
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Show GitLab Knowledge Graph cluster health. (EXPERIMENTAL)

## Synopsis

Prints the Orbit cluster health as pretty-printed JSON. Use this
command to confirm Orbit is enabled and reachable for your user.
It is the first step in the Orbit discovery workflow.

The output is always the system health object (fields such as
status, version, components, error) regardless of the GitLab
instance version. On newer instances (19.1+), when the backend
cannot reach the gRPC cluster, the output includes an error
field (and status is "unknown"). Use --jq to filter health
fields directly, for example --jq '.status' or
--jq '.components'. The user/system wrapper returned by newer
instances is not exposed in the output.

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
      --jq string             Filter JSON output with a jq expression.
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
