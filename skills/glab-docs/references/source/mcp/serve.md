---
title: '`glab mcp serve`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Start a MCP server with stdio transport. (EXPERIMENTAL)

## Synopsis

Start a Model Context Protocol server to expose GitLab features
as tools for AI assistants like Claude Code.

The server uses stdio (standard input and output) transport for
communication, and provides tools to:

- Manage issues (list, create, update, close, add notes)
- Manage merge requests (list, create, update, merge, add notes)
- Manage projects (list, get details)
- Manage CI/CD pipelines and jobs

To configure this server in Claude Code, add this code to your
MCP settings:

```json
{
  "mcpServers": {
    "glab": {
      "type": "stdio",
      "command": "glab",
      "args": ["mcp", "serve"]
    }
  }
}
```

This feature is an experiment and is not ready for production use.
It might be unstable or removed at any time.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

```plaintext
glab mcp serve [flags]
```

## Examples

```console
glab mcp serve
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
