---
title: '`glab packages delete`'
stage: AI Coding
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Delete a package from a project's package registry.

## Synopsis

Packages are identified by their numeric ID. Use `glab packages list`
to find the ID.

The command asks for confirmation before deleting; use `-y` to skip
the prompt in scripts.

By default, the package is removed from the current project. Use `--repo`
to target another project.

```plaintext
glab packages delete <id> [flags]
```

## Aliases

```plaintext
rm
```

## Examples

```console
# Delete a package by ID
glab packages delete 1

# Skip the confirmation prompt
glab packages delete 1 -y

# Use the 'rm' alias
glab packages rm 1

```

## Options

```plaintext
  -y, --yes   Skip the confirmation prompt.
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
