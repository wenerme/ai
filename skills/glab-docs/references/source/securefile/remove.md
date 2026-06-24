---
title: '`glab securefile remove`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Remove a secure file from a project.

## Synopsis

Remove a secure file from a project, identified by its numeric ID.
The command asks for confirmation before deleting; use `-y` to skip
the prompt in scripts.

By default, the file is removed from the current project. Use `--repo`
to target another project.

```plaintext
glab securefile remove <id> [flags]
```

## Aliases

```plaintext
rm
delete
```

## Examples

```console
# Remove a secure file by ID
glab securefile remove 1

# Skip the confirmation prompt
glab securefile remove 1 -y

# Use the 'rm' alias
glab securefile rm 1

# Use the 'delete' alias
glab securefile delete 1

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
