# Spamcheck anti-spam service

- Tier: Free, Premium, Ultimate
- Offering: GitLab Self-Managed

- Bundled Spamcheck [removed](https://gitlab.com/groups/gitlab-org/-/work_items/24323) from the Linux package and GitLab Helm chart in GitLab 19.0.

[Spamcheck](https://gitlab.com/gitlab-org/gl-security/security-engineering/security-automation/spam/spamcheck) is an anti-spam engine
developed by GitLab originally to combat a rising amount of spam in GitLab.com,
and later made public to be used in GitLab Self-Managed instances.

The Linux package and GitLab Helm chart do not include Spamcheck. To use Spamcheck,
deploy it as a separate service, then configure GitLab to use it.

## Upgrade to GitLab 19.0 or later

If you used the Spamcheck service bundled with the Linux package or the GitLab Helm chart,
before you upgrade to GitLab 19.0 or later:

1. Remove the bundled Spamcheck configuration:
   - For Linux package installations, remove all `spamcheck[...]` settings from
     `/etc/gitlab/gitlab.rb`, for example `spamcheck['enable'] = true`. Otherwise,
     `gitlab-ctl reconfigure` fails with the error
     `Removed configurations found in gitlab.rb. Aborting reconfigure.`
   - For Helm chart installations, remove `global.spamcheck.enabled` and any `gitlab.spamcheck`
     settings from your values. Otherwise, if `global.spamcheck.enabled` is `true`,
     `helm upgrade` fails with the message
     `The Spamcheck subchart has been removed in GitLab 19.0.`
1. Either [deploy Spamcheck as a separate service](#deploy-spamcheck) and update the
   endpoint URL, or clear the **Enable Spam Check via external API endpoint** checkbox.

You do not need to migrate any data.

## Deploy Spamcheck

For deployment and configuration options, see the
[Spamcheck README](https://gitlab.com/gitlab-org/gl-security/security-engineering/security-automation/spam/spamcheck/-/blob/main/README.md).

By default, Spamcheck listens for gRPC connections on port `8001`.

## Configure GitLab to use Spamcheck

Prerequisites:

- Administrator access.
- A Spamcheck service that GitLab can connect to.

> [!warning]
> If the **Enable Spam Check via external API endpoint** checkbox is selected but GitLab cannot connect to
> Spamcheck, GitLab allows the content unless [Akismet](../../integration/akismet.md) flags it as spam.
> GitLab does not show an error in the UI. Instead, GitLab logs the error to
> [`exceptions_json.log`](../logs/_index.md#exceptions_jsonlog).

To configure GitLab to use Spamcheck:

1. In the upper-right corner, select **Admin**.
1. In the left sidebar, select **Settings** > **Reporting**.
1. Expand **Spam and Anti-bot Protection**.
1. Update the Spam Check settings:
   1. Select the **Enable Spam Check via external API endpoint** checkbox.
   1. For **URL of the external Spam Check endpoint**, enter the address of your Spamcheck
      service, for example `grpc://spamcheck.example.com:8001`. If Spamcheck runs on the same
      server as GitLab, use `grpc://localhost:8001`.
   1. Optional. In **Spam Check API key**, enter the API key that your reverse proxy expects.
      Leave it blank if Spamcheck runs without authentication.
1. Select **Save changes**.

> [!note]
> If Spamcheck runs on a different server than GitLab and listens on a public endpoint,
> put a reverse proxy in front of Spamcheck to enforce authentication. GitLab sends the
> **Spam Check API key** in the `authorization` metadata of each request. For example,
> use `JWT` authentication and set a bearer token as the API key.

## Running Spamcheck over TLS

Spamcheck service on its own cannot communicate directly over TLS with GitLab.
However, Spamcheck can be deployed behind a reverse proxy which performs TLS
termination. In such a scenario, GitLab can be made to communicate with
Spamcheck over TLS by specifying `tls://` scheme for the external Spamcheck URL
instead of `grpc://` in the **Admin** area settings.
