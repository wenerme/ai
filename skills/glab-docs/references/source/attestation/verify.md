---
title: '`glab attestation verify`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Verify the provenance of a specific artifact or file. (EXPERIMENTAL)

## Synopsis

This command is experimental.

For more information about attestations, see:

- [Attestations API](https://docs.gitlab.com/api/attestations/)
- [SLSA provenance specification](https://docs.gitlab.com/ci/pipeline_security/slsa/provenance_v1/)
- [SLSA Software attestations](https://slsa.dev/attestation-model)

This command requires the cosign binary. To install it, see, [Cosign installation](https://docs.sigstore.dev/cosign/system_config/installation/).

This command works with GitLab.com only.

```plaintext
glab attestation verify <project_id> <artifact_path> [flags]
```

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
