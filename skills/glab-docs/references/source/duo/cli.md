---
title: '`glab duo cli`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Run the GitLab Duo CLI (EXPERIMENTAL)

## Synopsis

Run the GitLab Duo CLI.

Use the GitLab Duo CLI to bring the GitLab Duo Agent Platform to your terminal.
Ask GitLab Duo questions about your codebase and use it to autonomously perform actions
on your behalf.

When you use the GitLab Duo CLI in the GitLab CLI, `glab` handles
authentication for you automatically.
You only need to authenticate once.

Prerequisites:

- Authenticate by running `glab auth login`.
- Meet the [prerequisites for GitLab Duo Agent Platform](https://docs.gitlab.com/user/duo_agent_platform/#prerequisites).

Configuration options:

- `duo_cli_auto_run`: Skip the run confirmation prompt.
- `duo_cli_auto_download`: Skip the download confirmation prompt.

All arguments and flags are passed through to the GitLab Duo CLI binary.
Use `--update` to check for and install updates to the binary.

This feature is an experiment and is not ready for production use.
It might be unstable or removed at any time.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

```plaintext
glab duo cli [command] [flags]
```

## Examples

```console
# Run the GitLab Duo CLI
glab duo cli

# Show Duo CLI help
glab duo cli --help

# Check for and install updates
glab duo cli --update
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
