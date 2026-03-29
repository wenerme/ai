---
title: '`glab duo ask`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Generate Git commands from natural language.

## Synopsis

Generate Git commands from natural language using AI assistance.

Describe what you want to do in plain language, and GitLab Duo suggests
the appropriate Git commands. You receive both the commands and an explanation.

After you receive the suggested commands, you can run them directly from
the CLI. You must confirm each command before it runs.

Use this command to:

- Retrieve forgotten Git commands.
- Learn how to accomplish specific Git operations.
- Get guidance on complex Git workflows.
- Reduce context switching during development.

```plaintext
glab duo ask <prompt> [flags]
```

## Examples

```console
# Explain how to display the titles of the last 10 commits
glab duo ask how to list last 10 commit titles

# Explain how to undo the last commit
glab duo ask how do I undo my last commit

# Explain how to display files changed in the last commit
glab duo ask show me files changed in the last commit
```

## Options

```plaintext
      --git   Ask a question about Git. (default true)
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
