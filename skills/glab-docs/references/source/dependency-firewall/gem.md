---
title: '`glab dependency-firewall gem`'
stage: AI Coding
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Run gem through the GitLab Dependency Firewall. (EXPERIMENTAL)

## Synopsis

Run the gem binary through the GitLab Dependency Firewall. The command checks each package download and upload against the policy for the current project, refuses blocked packages, and summarizes the results after the run.

The command uses your configured sources, and does not modify `~/.gemrc` or your sources.

All arguments are forwarded to `gem` verbatim.

This feature is an experiment and is not ready for production use.
It might be unstable or removed at any time.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

```plaintext
glab dependency-firewall gem <gem args> [flags]
```

## Examples

```console
# Install a package through the Dependency Firewall
glab dependency-firewall gem install rake

```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
