# Pages domain rate limits

Configure per-user rate limits for creating and verifying GitLab Pages custom domains.

- Tier: Free, Premium, Ultimate
- Offering: GitLab Self-Managed, GitLab Dedicated

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/635642) in GitLab 19.6 [with a feature flag](../feature_flags/_index.md) named `pages_domain_rate_limits`. Disabled by default.

> [!flag]
> The availability of this feature is controlled by a feature flag.
> For more information, see the history.

You can limit how often each user can add and verify
[GitLab Pages custom domains](../../user/project/pages/custom_domains_ssl_tls_certification/_index.md).
These limits apply to the UI and to the [Pages domains API](../../api/pages_domains.md).

The limits are:

- Applied independently per user.
- Not applied per IP address.
- Shared between project and group domains.

| Limit                   | Default                   | Applies to |
|-------------------------|---------------------------|------------|
| Domain creation         | 20 domains each day       | Adding a custom domain in the UI and with `POST /projects/:id/pages/domains`, and [adding a group domain](../../user/enterprise_user/_index.md#add-group-domains). Attempts that fail validation do not count toward the limit. |
| Domain verification     | 5 requests every minute   | Verifying a custom domain in the UI and with `PUT /projects/:id/pages/domains/:domain/verify`, and [verifying a group domain](../../user/enterprise_user/_index.md#add-group-domains). |

Requests over a limit return `429 Too Many Requests` in the API, and an error message in the UI, only when the `pages_domain_rate_limits` feature flag is enabled.
While the flag is disabled, requests over a limit are logged but not blocked.
When the flag is enabled, requests over a limit are also logged to the `auth.log` file.

## Change the Pages domain rate limits

Prerequisites:

- Administrator access.

To change the Pages domain rate limits:

1. In the upper-right corner, select **Admin**.
1. In the left sidebar, select **Settings** > **Network**.
1. Expand **Pages domain rate limits**.
1. Change the value of either limit. Set a limit to `0` to disable it.
1. Select **Save changes**.

You can also set these limits with the [application settings API](../../api/settings.md#available-settings),
using `pages_domain_create_limit` and `pages_domain_verify_limit`.

## Related topics

- [Rate limits](../../rate_limits/_index.md)
- [GitLab Pages rate limits](../pages/rate-limits.md)
