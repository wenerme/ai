# Pages domain rate limits

Configure rate limits for creating and verifying GitLab Pages custom domains.

- Tier: Free, Premium, Ultimate
- Offering: GitLab Self-Managed, GitLab Dedicated

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/635642) in GitLab 19.6 [with a feature flag](../feature_flags/_index.md) named `pages_domain_rate_limits`. Disabled by default.

> [!flag]
> The availability of this feature is controlled by a feature flag.
> For more information, see the history.

You can limit how often each user can add and verify
[GitLab Pages custom domains](../../user/project/pages/custom_domains_ssl_tls_certification/_index.md).
These limits apply to the UI and to the [Pages domains API](../../api/pages_domains.md).
The limits apply to each user, not to each IP address.

The following limits are available:

| Limit                   | Default                   | Applies to |
|-------------------------|---------------------------|------------|
| Domain creation         | 50 domains each day       | Adding a custom domain in the UI and with `POST /projects/:id/pages/domains`. Attempts that fail validation do not count toward the limit. |
| Domain verification     | 5 requests every minute   | Verifying a custom domain in the UI and with `PUT /projects/:id/pages/domains/:domain/verify`. |

When the `pages_domain_rate_limits` flag is enabled, requests over a limit return
`429 Too Many Requests` in the API and an error message in the UI.
These requests are also logged to the `auth.log` file.
While the flag is disabled, requests over a limit are logged but not blocked.

## Change the Pages domain rate limits

Prerequisites:

- Administrator access.

To change the Pages domain rate limits:

1. In the upper-right corner, select .
1. In the left sidebar, select  > .
1. Expand .
1. Change the value of either limit. To turn off a limit, set it to `0`.
1. Select .

You can also set these limits with the [application settings API](../../api/settings.md#available-settings),
using `pages_domain_create_limit` and `pages_domain_verify_limit`.

## Related topics

- [Rate limits](../../rate_limits/_index.md)
- [GitLab Pages rate limits](../pages/rate-limits.md)
