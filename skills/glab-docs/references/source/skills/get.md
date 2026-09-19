---
title: '`glab skills get`'
stage: AI Coding
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Print a bundled agent skill file. (EXPERIMENTAL)

## Synopsis

Print a file from an agent skill bundled with this glab binary without installing it.

The path is relative to the skill root and defaults to `SKILL.md`.

This feature is an experiment and is not ready for production use.
It might be unstable or removed at any time.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

```plaintext
glab skills get <name> [<path>] [flags]
```

## Examples

```console
# Print the manifest for the bundled glab skill
glab skills get glab

# Print the other bundled skill
glab skills get glab-stack

# For skills that ship supporting files, use the path form
# glab skills get <name> references/<file>.md

```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
