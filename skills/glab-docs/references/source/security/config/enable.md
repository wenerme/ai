---
title: '`glab security config enable`'
stage: AI Coding
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Enable a security scan profile for a project.

## Synopsis

Attach a security scan profile to a project.

You must be a Maintainer or Owner of the project.

```plaintext
glab security config enable <profile> [flags]
```

## Examples

```console
# Enable dependency scanning on the current project
$ glab security config enable dependency_scanning

# Enable SAST on a specific project
$ glab security config enable sast -R gitlab-org/cli

# Enable auto-remediation for vulnerable dependencies
$ glab security config enable dependency_scanning_post_processing

```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
