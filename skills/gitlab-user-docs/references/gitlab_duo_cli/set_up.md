# Set up the GitLab Duo CLI

Install and authenticate the GitLab Duo CLI.

- Tier: Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

You can use the GitLab Duo CLI through the [GitLab CLI](https://docs.gitlab.com/cli/) (`glab`). With the GitLab CLI, you get access to other GitLab features and you only need to authenticate once, using OAuth or a personal access token.

Alternatively, you can install and use the GitLab Duo CLI (`duo`) as a standalone AI tool, authenticating
separately with a personal access token.

Both setups support interactive and headless modes, along with all GitLab Duo CLI options, commands,
and functionality.

## Prerequisites

- GitLab 19.2 or later.
- The [prerequisites for the GitLab Duo Agent Platform](../duo_agent_platform/_index.md#prerequisites).
- For GitLab Self-Managed and GitLab Dedicated,
  [access to the GitLab Duo CLI](_index.md#manage-gitlab-duo-cli-access).
- A [default GitLab Duo namespace](../profile/preferences.md#namespace-resolution-in-your-local-environment)
  set, or an open project that has access to GitLab Duo.

> [!note]
> If you are on GitLab 18.11 to 19.1, you can use the latest version of the GitLab Duo CLI by turning on [beta and experimental features](../duo_agent_platform/turn_on_off.md#turn-on-beta-and-experimental-features).

## With the GitLab CLI

Prerequisites:

- [GitLab CLI](https://docs.gitlab.com/cli/) 1.107.0 or later.
- GitLab CLI is [authenticated](https://docs.gitlab.com/cli/#authenticate-with-gitlab).

To set up the GitLab Duo CLI for use through the GitLab CLI:

1. Run the `glab` command for the GitLab Duo CLI:

   ```shell
   glab duo cli
   ```

1. Follow the prompts to install the GitLab Duo CLI binary.

The GitLab CLI automatically handles authentication, so you can start using the GitLab Duo CLI
immediately.

## Without the GitLab CLI

To use the GitLab Duo CLI as a standalone tool, install it and then authenticate.

### Install

To install the GitLab Duo CLI as a compiled binary, download and run the install script.

On macOS and Linux:

```shell
bash <(curl --fail --silent --show-error --location "https://gitlab.com/gitlab-org/editor-extensions/gitlab-lsp/-/raw/main/packages/cli/app/scripts/install_duo_cli.sh")
```

On Windows:

```shell
irm "https://gitlab.com/gitlab-org/editor-extensions/gitlab-lsp/-/raw/main/packages/cli/app/scripts/install_duo_cli.ps1" | iex
```

### Authenticate

> [!note]
> If `glab` is already installed and authenticated on your system when you first run `duo`, `duo`
> automatically uses `glab` as a credential helper. You do not need to authenticate separately. This
> requires `glab` 1.85.2 or later and `duo` 8.68.0 or later.
>
> If you authenticated `duo` before this feature was available and want to use `glab` as a
> credential helper instead, delete your authentication settings from `~/.gitlab/storage.json`.

Prerequisites:

- A [personal access token](../profile/personal_access_tokens.md) with `api` permissions.

To authenticate:

1. Run `duo` in your terminal. The first time you run the GitLab Duo CLI, a configuration screen
   appears.
1. For **Instance URL**, press <kbd>Enter</kbd> to accept `https://gitlab.com`, or enter the URL of
   your GitLab Self-Managed or GitLab Dedicated instance.
1. For **Personal Access Token**, enter your personal access token and press <kbd>Enter</kbd>.
   To create a token, select **Create a token**. The link opens the personal access token page for
   your instance with the required scope preselected.

   The GitLab Duo CLI validates the token. If validation fails, press <kbd>Enter</kbd> to enter the
   token again. After the token is verified, the GitLab Duo CLI saves the configuration and exits.
1. To start using the GitLab Duo CLI, run `duo` again.

To modify the configuration after initial setup, use `duo config edit`.

### Configure with environment variables

- Support for `GITLAB_HOST` [introduced](https://gitlab.com/gitlab-org/editor-extensions/gitlab-lsp/-/releases/v10.1.0) in GitLab Duo CLI 10.1.0, during the GitLab 19.6 release.

Use environment variables to configure the GitLab Duo CLI when you:

- Run the GitLab Duo CLI in headless mode, CI/CD pipelines, or scripts, where you can't
  authenticate interactively.
- Configure developer machines centrally and want to use the same variables as the
  [GitLab CLI](https://docs.gitlab.com/cli/).

Prerequisites:

- A [personal access token](../profile/personal_access_tokens.md) with `api` permissions.

The GitLab Duo CLI, the GitLab CLI, the
[GitLab for VS Code extension](../../editor_extensions/visual_studio_code/setup.md#configure-with-environment-variables),
and the GitLab Duo plugin for JetBrains IDEs all read `GITLAB_HOST` and `GITLAB_TOKEN`.
Use these shared variables when possible, so one configuration covers all of these tools.
Before you start the GitLab Duo CLI, set `GITLAB_HOST` and `GITLAB_TOKEN`:

| Variable       | Description |
| -------------- | ----------- |
| `GITLAB_HOST`  | Your GitLab instance URL or hostname. For example, `https://gitlab.example.com`. If you omit `http://` or `https://`, the GitLab Duo CLI uses `https://`. |
| `GITLAB_TOKEN` | Your personal access token for `GITLAB_HOST`. |

For example:

```shell
export GITLAB_HOST="https://gitlab.example.com"
export GITLAB_TOKEN="<your-personal-access-token>"
```

The GitLab Duo CLI also reads these variables:

| Variable                          | Description |
| --------------------------------- | ----------- |
| `GITLAB_URL` or `GITLAB_BASE_URL` | Your GitLab instance URL, including the `http://` or `https://`. For example, `https://gitlab.example.com`. Takes priority over `GITLAB_HOST`. |
| `GITLAB_OAUTH_TOKEN`              | Your authentication token. Used only when `GITLAB_TOKEN` is not set. |

The GitLab Duo CLI reads these variables as follows:

- `GITLAB_TOKEN` takes priority over a token you saved with `duo config edit` and over the
  GitLab CLI credentials.
- If you set `GITLAB_TOKEN` without `GITLAB_HOST`, `GITLAB_URL`, or `GITLAB_BASE_URL`, the
  GitLab Duo CLI sends the token to the instance you saved with `duo config edit`, or to
  `https://gitlab.com`. Always set `GITLAB_HOST` with `GITLAB_TOKEN`.
- The GitLab Duo CLI does not read `GITLAB_CLIENT_ID`.

The GitLab Duo CLI also respects standard proxy environment variables:

- `HTTP_PROXY` or `http_proxy`: Proxy URL for HTTP requests.
- `HTTPS_PROXY` or `https_proxy`: Proxy URL for HTTPS requests.
- `NO_PROXY` or `no_proxy`: Comma-separated list of hosts to exclude from proxying.

To avoid storing a personal access token in environment variables, authenticate with OAuth instead.
Use the GitLab Duo CLI [with the GitLab CLI](#with-the-gitlab-cli), and do not set `GITLAB_TOKEN` or `GITLAB_OAUTH_TOKEN`.
The GitLab CLI reads `GITLAB_HOST` and `GITLAB_CLIENT_ID` itself.

## Related topics

- [GitLab Duo CLI complete reference](https://gitlab.com/gitlab-org/editor-extensions/gitlab-lsp/-/blob/main/packages/cli/app/docs/cli-reference.md)
- [Security considerations for editor extensions](../../editor_extensions/security_considerations.md)
- [GitLab CLI](https://docs.gitlab.com/cli/)
