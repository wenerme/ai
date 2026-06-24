---
title: '`glab auth login`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Authenticate with a GitLab instance.

## Synopsis

Authenticates with a GitLab instance.

Stores your credentials in the global configuration file
(default `~/.config/glab-cli/config.yml`).
To store your token in your operating system's keyring instead, use `--use-keyring`.
After authentication, all glab commands use the stored credentials.

If `GITLAB_TOKEN`, `GITLAB_ACCESS_TOKEN`, or `OAUTH_TOKEN` are set,
they take precedence over the stored credentials. When CI auto-login is
enabled, these variables also override `CI_JOB_TOKEN`.

To pass a token on standard input, use `--stdin`.

In interactive mode, glab detects GitLab instances from your Git remotes
and lists them as options, so you do not have to type the hostname manually.

```plaintext
glab auth login [flags]
```

## Examples

```console
# Start interactive setup
# If in a Git repository, glab detects and suggests GitLab instances from remotes
glab auth login

# Authenticate against `gitlab.com` by reading the token from a file
glab auth login --stdin < myaccesstoken.txt

# Authenticate with GitLab Self-Managed or GitLab Dedicated
glab auth login --hostname salsa.debian.org

# Non-interactive setup
glab auth login --hostname gitlab.example.org --token glpat-xxx --api-host gitlab.example.org:3443 --api-protocol https --git-protocol ssh

# Non-interactive setup reading the token from a file
glab auth login --hostname gitlab.example.org --api-host gitlab.example.org:3443 --api-protocol https --git-protocol ssh --stdin < myaccesstoken.txt

# Semi-interactive OAuth login, skipping all prompts except browser auth
glab auth login --hostname gitlab.com --web --git-protocol ssh --container-registry-domains "gitlab.com,gitlab.com:443,registry.gitlab.com" --use-keyring

# OAuth device authorization flow for headless environments without a local browser.
# glab displays a one-time code and verification URL; you authorize on any
# other device with a browser. Requires GitLab 17.9 or later.
glab auth login --hostname gitlab.com --device

# CI/CD setup: for most cases, prefer auto-login over manual login
GLAB_ENABLE_CI_AUTOLOGIN=true glab release list -R $CI_PROJECT_PATH

# CI/CD setup with manual login: use when the command does not support CI job tokens, or you need a personal access token
glab auth login --hostname $CI_SERVER_FQDN --job-token $CI_JOB_TOKEN --api-protocol $CI_SERVER_PROTOCOL

```

## Options

```plaintext
  -a, --api-host string                     Hostname for the API endpoint, if different from --hostname. Accepts a hostname or hostname:port. Use only when the API is served from a different host than the Git remote.
  -p, --api-protocol string                 API protocol. Options: https, http.
      --container-registry-domains string   Container registry and image dependency proxy domains, comma-separated.
      --device                              Use the OAuth 2.0 device authorization flow. Useful for headless environments where a local browser is not available. Requires GitLab 17.9 or later.
  -g, --git-protocol string                 Git protocol. Options: ssh, https, http.
      --hostname string                     The hostname of the GitLab instance to authenticate with.
  -j, --job-token string                    CI job token.
      --ssh-hostname string                 SSH hostname for instances with a different SSH endpoint. A port is not required; Git uses the port from the remote URL.
      --stdin                               Read the token from standard input.
  -t, --token string                        Your GitLab access token.
      --use-keyring                         Store the token in your operating system's keyring.
      --web                                 Skip the login type prompt and use web/OAuth login.
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
