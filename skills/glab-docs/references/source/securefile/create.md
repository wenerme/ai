---
title: '`glab securefile create`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Create a new project secure file.

```plaintext
glab securefile create <fileName> <inputFilePath> [flags]
```

## Aliases

```plaintext
upload
```

## Examples

```console
# Create a project secure file with the given name using the contents of the given path.
glab securefile create "newfile.txt" "securefiles/localfile.txt"

# Create a project secure file using the 'upload' alias.
glab securefile upload "newfile.txt" "securefiles/localfile.txt"
```

## Options inherited from parent commands

```plaintext
  -h, --help              Show help for this command.
  -R, --repo OWNER/REPO   Select another repository. Can use either OWNER/REPO or `GROUP/NAMESPACE/REPO` format. Also accepts full URL or Git URL.
```
