---
title: '`glab duo cli`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Run the GitLab Duo CLI (Beta)

## Synopsis

Run the GitLab Duo CLI.

Use the GitLab Duo CLI to bring the GitLab Duo Agent Platform to your terminal.
Ask GitLab Duo questions about your codebase and use it to autonomously perform actions
on your behalf.

When you use the GitLab Duo CLI in the GitLab CLI, `glab` handles
authentication for you automatically.
You only need to authenticate once.

Prerequisites:

- Use GitLab 18.11 or later.
- Run `glab auth login` to authenticate.
- Meet the [prerequisites for GitLab Duo Agent Platform](https://docs.gitlab.com/user/duo_agent_platform/#prerequisites).
- Turn on [beta and experimental features](https://docs.gitlab.com/user/duo_agent_platform/turn_on_off/#turn-on-beta-and-experimental-features).

Configuration options:

- `duo_cli_auto_run`: Skip the run confirmation prompt.
- `duo_cli_auto_download`: Skip the download confirmation prompt.

All arguments and flags are passed through to the GitLab Duo CLI binary.

Use `--update` to check for and install updates to the binary.

For more information, see the [GitLab Duo CLI documentation](https://docs.gitlab.com/user/gitlab_duo_cli/).

This feature is in beta and might not be ready for production use.
It might be unstable and breaking changes can occur outside of major releases.
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
