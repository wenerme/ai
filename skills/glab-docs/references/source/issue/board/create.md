---
title: '`glab issue board create`'
stage: AI Coding
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Create a project issue board.

## Synopsis

Creates a new issue board in the project. If you don't provide a
name, you're prompted for one.

```plaintext
glab issue board create [flags]
```

## Aliases

```plaintext
new
```

## Examples

```console
glab issue board create
glab issue board create "Sprint Board"
```

## Options

```plaintext
  -n, --name string   The name of the new board.
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository using the OWNER/REPO format or the project ID. Supports group namespaces.
```
