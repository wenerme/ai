# GitLab Duo CLI reference

Options, commands, and environment variables for the GitLab Duo CLI.

- Tier: Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

Use these options, commands, and environment variables when you start or run the GitLab Duo CLI.

This is not a complete list. For a full reference, see the
[GitLab Duo CLI complete reference](https://gitlab.com/gitlab-org/editor-extensions/gitlab-lsp/-/blob/main/packages/cli/docs/cli-reference.md).

## Options

The GitLab Duo CLI supports these options:

- `-C, --cwd <path>`: Change the working directory.
- `-h, --help`: Display help for the GitLab Duo CLI or a specific command. For example, `duo --help` or
  `duo run --help`.
- `-v`, `--version`: Display version information.
- `--model <model>`: Select the AI model to use for the session.

For a complete list of options, see the GitLab Duo CLI complete reference.

## Commands

The following commands are available for each setup:

### glab

- `glab duo cli`: Start interactive mode.
- `glab duo cli log`: View and manage logs.
- `glab duo cli run`: Start headless mode.

### duo

- `duo`: Start interactive mode.
- `duo config`: Manage the configuration and authentication settings.
- `duo log`: View and manage logs.
- `duo run`: Start headless mode.

For a complete list of commands, see the GitLab Duo CLI complete reference.

## Environment variables

- `AI_AGENT` environment variable [introduced](https://gitlab.com/gitlab-org/editor-extensions/gitlab-lsp/-/releases/v8.95.0) in GitLab Duo CLI 8.95.0, during the GitLab 19.0 release.

You can configure the GitLab Duo CLI using environment variables:

- `DUO_WORKFLOW_GIT_HTTP_PASSWORD`: Git HTTP authentication password.
- `DUO_WORKFLOW_GIT_HTTP_USER`: Git HTTP authentication username.
- `GITLAB_BASE_URL` or `GITLAB_URL`: GitLab instance URL.
- `GITLAB_DUO_MODEL`: AI model to use for the session.
- `GITLAB_OAUTH_TOKEN` or `GITLAB_TOKEN`: Authentication token.

When the GitLab Duo CLI runs a command on your behalf, it sets the `AI_AGENT` environment variable
in that process. Scripts and tools can read `AI_AGENT` to detect that they are running in an
AI-driven execution.

For a complete list of environment variables, see the GitLab Duo CLI complete reference.
