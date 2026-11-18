# Import and export rate limits

Configure rate limit settings for your GitLab instance when importing or exporting projects or groups.

- Tier: Free, Premium, Ultimate
- Offering: GitLab Self-Managed

- Rate limit for GitHub gists imports introduced in GitLab 19.6.
- Project import rate limit applied to GitHub, Bitbucket Cloud, and Bitbucket Server imports with the API in GitLab 19.6.
- Rate limit for project export requests per top-level group or personal namespace [introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/269619) in GitLab 19.7 [with a feature flag](../feature_flags/_index.md) named `project_export_by_root_namespace_rate_limit`. Disabled by default.

You can configure the rate limits for file imports and exports of projects and groups, for imports from other sources,
and for relations exports used by [direct transfer](../../user/group/import/_index.md). For information on the default
rate limits, see [import and export rate limits](../instance_limits.md#import-and-export) and
[direct transfer limits](../instance_limits.md#direct-transfer-migration).

When a user exceeds a rate limit, it is logged in `auth.log`.

## Change an import or export rate limit

Prerequisites:

- Administrator access.

To change a rate limit:

1. In the upper-right corner, select **Admin**.
1. In the left sidebar, select **Settings** > **Network**.
1. Expand **Import and export rate limits**.
1. Change the value of any rate limit. The rate limits are per minute per user, not per IP address.
   The relations export rate limits are also per project or group.
   The project export rate limit per top-level group or personal namespace is per 10 minutes, not per user.
   Set to `0` to disable a rate limit.

| Setting | Applies to | Default |
|:--------|:-----------|:--------|
| **Maximum project import requests per minute** | File-based project imports, starting an import from any source in the UI, and starting a GitHub, Bitbucket Cloud, or Bitbucket Server import with the [API](../../api/import.md). | 6 |
| **Maximum project export requests per 10 minutes per top-level group or personal namespace** | Project export requests across all projects in a top-level group and its subgroups, or in a personal namespace, from the UI and the [API](../../api/project_import_export.md). Each export request also counts against the per-user project export rate limit. Requests that are rejected still count, so one project can use up the limit for the whole group. `0` means no limit. While the `project_export_by_root_namespace_rate_limit` [feature flag](../feature_flags/_index.md) is disabled, requests over the limit are logged but not rejected. | 0 |

## Change the GitHub gists import rate limit

The rate limit for [importing GitHub gists](../../api/import.md#import-github-gists-into-gitlab-snippets)
is not available in the **Admin** area. The default is 6 requests per minute per user.

Prerequisites:

- Administrator access.

To change the rate limit, use one of the following:

- The [application settings API](../../api/settings.md#update-application-settings):

  ```shell
  curl --request PUT \
    --header "PRIVATE-TOKEN: <your_access_token>" \
    --url "https://gitlab.example.com/api/v4/application/settings?github_gists_import_limit=10"
  ```

- The [Rails console](../operations/rails_console.md#starting-a-rails-console-session):

  ```ruby
  ApplicationSetting.current.update!(github_gists_import_limit: 10)
  ```

Set to `0` to disable the rate limit.
