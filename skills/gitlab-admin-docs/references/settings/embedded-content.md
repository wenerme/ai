# Embedded content

Choose the embed providers that users can embed content from in Markdown.

- Tier: Free, Premium, Ultimate
- Offering: GitLab Self-Managed, GitLab Dedicated
- Status: Experiment

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/200864) in GitLab 18.7 [with a feature flag](../feature_flags/_index.md) named `allow_iframes_in_markdown`. Disabled by default.
- Embed providers [introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/254945) in GitLab 19.5. Embed providers replace the allowlist of domains. The upgrade to GitLab 19.5 clears the existing allowlist.
- Custom embed providers [introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/271233) in GitLab 19.7.

> [!flag]
> The availability of this feature is controlled by a feature flag.
> For more information, see the history.
> This feature is available for testing, but not ready for production use.

Users can embed content from external providers, like YouTube videos and Figma designs, in Markdown.
You choose which embed providers to allow on your instance.
For the available providers and their IDs, see [embedded content](../../user/markdown.md#embedded-content).

Each embed provider defines the URLs it accepts, the URL the content loads from, and the
browser sandbox restrictions on its content.
GitLab defines a set of embed providers.
On GitLab Self-Managed, you can [add your own embed providers](#add-or-replace-embed-providers),
or replace the ones GitLab defines.

Content from an allowed provider loads inside pages in GitLab and can run scripts in the browsers
of users who view it.
Allow only providers you trust.

If you stop allowing a provider or turn off embedded content, existing content from those providers
displays as a link to the content.
If you allow a provider or turn on embedded content, existing content is not embedded until
GitLab next renders it, like when someone edits it.

## Choose embed providers

Prerequisites:

- Administrator access.

To choose which embed providers users can embed content from:

1. In the upper-right corner, select .
1. In the left sidebar, select  > .
1. Expand .
1. Select the  checkbox.
1. Under , select the checkbox for each provider to allow.
1. Select .

You can also choose embed providers with the
[application settings API](../../api/settings.md#available-settings), by using the
`iframe_rendering_enabled` and `iframe_rendering_allowlist` attributes.

## Add or replace embed providers

- Offering: GitLab Self-Managed

Add an embed provider to embed content from a service that GitLab has no provider for.
For example, add a provider for a dashboard tool hosted on your network.

To replace an embed provider that GitLab defines, add a provider with the same ID.
You do not get changes GitLab makes to that provider in later versions, including security fixes.

Before you add an embed provider, check who controls its content.
If the provider serves user-controlled content, including scripts, that content runs inside
the GitLab UI for every user who views it.
For example, it can show fake sign-in forms or messages that look like part of GitLab.
For these providers, keep `require_activation` set to `true`, so users see a warning before the
content loads.

Prerequisites:

- Administrator access.

To add or replace embed providers:

### Linux package (Omnibus)

1. Edit `/etc/gitlab/gitlab.rb` and add the providers to `gitlab_rails['iframe_providers']`:

   ```ruby
   gitlab_rails['iframe_providers'] = {
     'dashboards' => {
       'name' => 'Dashboards',
       'matches' => [
         { 'host' => 'dashboards.example.com', 'path' => '/d/{uid}' }
       ],
       'src' => 'https://dashboards.example.com/d/{uid}',
       'view' => 'https://dashboards.example.com/d/{uid}',
       'sandbox' => ['allow-scripts', 'allow-same-origin']
     }
   }
   ```

1. Save the file and reconfigure GitLab:

   ```shell
   sudo gitlab-ctl reconfigure
   ```

### Helm chart (Kubernetes)

1. Export the Helm values:

   ```shell
   helm get values gitlab > gitlab_values.yaml
   ```

1. Edit `gitlab_values.yaml` and add the providers to `iframeProviders`:

   ```yaml
   global:
     appConfig:
       iframeProviders:
         dashboards:
           name: Dashboards
           matches:
             - host: dashboards.example.com
               path: /d/{uid}
           src: https://dashboards.example.com/d/{uid}
           view: https://dashboards.example.com/d/{uid}
           sandbox: [allow-scripts, allow-same-origin]
   ```

1. Save the file and apply the new values:

   ```shell
   helm upgrade -f gitlab_values.yaml gitlab gitlab/gitlab
   ```

### Docker

1. Edit `docker-compose.yml` and add the providers to `gitlab_rails['iframe_providers']`:

   ```yaml
   version: "3.6"
   services:
     gitlab:
       environment:
         GITLAB_OMNIBUS_CONFIG: |
           gitlab_rails['iframe_providers'] = {
             'dashboards' => {
               'name' => 'Dashboards',
               'matches' => [
                 { 'host' => 'dashboards.example.com', 'path' => '/d/{uid}' }
               ],
               'src' => 'https://dashboards.example.com/d/{uid}',
               'view' => 'https://dashboards.example.com/d/{uid}',
               'sandbox' => ['allow-scripts', 'allow-same-origin']
             }
           }
   ```

1. Save the file and restart GitLab:

   ```shell
   docker compose up -d
   ```

### Self-compiled (source)

1. Edit `/home/git/gitlab/config/gitlab.yml` and add the providers to `iframe_providers`:

   ```yaml
   production: &base
     gitlab:
       iframe_providers:
         dashboards:
           name: Dashboards
           matches:
             - host: dashboards.example.com
               path: /d/{uid}
           src: https://dashboards.example.com/d/{uid}
           view: https://dashboards.example.com/d/{uid}
           sandbox: [allow-scripts, allow-same-origin]
   ```

1. Save the file and restart GitLab:

   ```shell
   # For systems running systemd
   sudo systemctl restart gitlab.target

   # For systems running SysV init
   sudo service gitlab restart
   ```

If an embed provider is not valid, GitLab does not embed content from any provider.
GitLab logs an error that names the provider and the problem to
[`application_json.log`](../logs/_index.md#application_jsonlog).

After GitLab restarts, [choose the embed providers](#choose-embed-providers) to allow.

### Embed provider configuration

Each embed provider has an ID, which is the key in the configuration.
IDs start with a lowercase letter, and contain only lowercase letters, digits, and underscores.

GitLab checks embed providers in order, and uses the first provider that accepts a URL.
Providers you add are checked after the providers GitLab defines.
Providers that replace one GitLab defines keep its place in the order.

Each embed provider supports the following keys:

| Key                    | Required | Description |
|------------------------|----------|-------------|
| `name`                 | Yes      | Name of the provider, shown to users and administrators. |
| `matches`              | Yes      | List of URL patterns the provider accepts. A URL is accepted if any pattern matches. |
| `matches[].host`       | Yes      | Exact hostname of the URL. |
| `matches[].path`       | Yes      | Path prefix of the URL. A `{<name>}` segment matches any single non-empty path segment and captures its value. Path segments after the prefix are ignored. |
| `matches[].params`     | No       | List of query parameters the URL must have. Their values are captured. |
| `requires`             | No       | Map of capture names to lists of permitted values. A URL is accepted only if each named capture has one of its permitted values. Every pattern in `matches` must capture each name. |
| `src`                  | Yes      | HTTPS URL the content loads from. GitLab replaces each `{<name>}` placeholder with the captured value. Every pattern in `matches` must capture every placeholder. Between each pair of placeholders, use a character that GitLab always percent-encodes in captured values, like `/`. |
| `view`                 | Yes      | HTTPS URL of the content on the provider's site, used for links to the content. Can use only placeholders that `src` uses. |
| `sandbox`              | Yes      | List of browser sandbox flags for the content. Can be empty. Supported flags are `allow-scripts`, `allow-same-origin`, `allow-popups`, `allow-popups-to-escape-sandbox`, and `allow-presentation`. |
| `additional_csp_hosts` | No       | List of other hostnames the content loads from, added to the content security policy. |
| `require_activation`   | No       | If `true`, users must select  to load the content. Default is `true`. |

If `sandbox` includes `allow-same-origin`, `src` and `additional_csp_hosts` cannot use the hostname
of your GitLab instance, your GitLab Pages domain, or its subdomains.
