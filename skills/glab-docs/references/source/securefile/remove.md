---
title: '`glab securefile remove`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Remove a secure file.

```plaintext
glab securefile remove <fileID> [flags]
```

## Aliases

```plaintext
rm
delete
```

## Examples

```console
# Remove a project's secure file using the file's ID.
glab securefile remove 1

# Skip the confirmation prompt and force delete.
glab securefile remove 1 -y

# Remove a project's secure file with 'rm' alias.
glab securefile rm 1

# Remove a project's secure file with 'delete' alias.
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
