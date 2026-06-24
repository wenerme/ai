---
title: '`glab mcp`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Work with a Model Context Protocol (MCP) server. (EXPERIMENTAL)

## Synopsis

Manage Model Context Protocol server features for GitLab integration.

The MCP server exposes GitLab features as tools for use by
AI assistants (like Claude Code) to interact with GitLab projects, issues,
merge requests, pipelines, and other resources.

This feature is an experiment and is not ready for production use.
It might be unstable or removed at any time.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

## Examples

```console
glab mcp serve
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```

## Subcommands

- [`serve`](serve.md)
