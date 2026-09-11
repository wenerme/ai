---
title: '`glab dependency-firewall gradle`'
stage: AI Coding
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Run Gradle through the GitLab Dependency Firewall. (EXPERIMENTAL)

## Synopsis

Run the Gradle binary through the GitLab Dependency Firewall. The command checks each package download and upload against the policy for the current project, refuses blocked packages, and summarizes the results after the run.

The command uses your package manager's registry or index configuration, and does not modify it.

All arguments are forwarded to `gradle` verbatim.

This feature is an experiment and is not ready for production use.
It might be unstable or removed at any time.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

```plaintext
glab dependency-firewall gradle <gradle args> [flags]
```

## Examples

```console
# Build a project through the Dependency Firewall
glab dependency-firewall gradle build

```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
