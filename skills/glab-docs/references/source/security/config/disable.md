---
title: '`glab security config disable`'
stage: AI Coding
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Disable a security scan profile for a project. (EXPERIMENTAL)

## Synopsis

Detach a security scan profile from a project.

Prerequisites:

- At least the Maintainer role or the Security Manager role for the project.

This feature is an experiment and is not ready for production use.
It might be unstable or removed at any time.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

```plaintext
glab security config disable <profile> [flags]
```

## Examples

```console
# Disable dependency scanning on the current project
$ glab security config disable dependency_scanning

# Disable SAST on a specific project
$ glab security config disable sast -R gitlab-org/cli

# Disable auto-remediation for vulnerable dependencies
$ glab security config disable dependency_scanning_post_processing

```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
