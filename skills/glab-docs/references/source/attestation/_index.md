---
title: '`glab attestation`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Manage software attestations. (EXPERIMENTAL)

## Examples

```console
# Verify attestation for the filename.txt file in the gitlab-org/gitlab project.
glab attestation verify gitlab-org/gitlab filename.txt

# Verify attestation for the filename.txt file in the project with ID 123.
glab attestation verify 123 filename.txt
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```

## Subcommands

- [`verify`](verify.md)
