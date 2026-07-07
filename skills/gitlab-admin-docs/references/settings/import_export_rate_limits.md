# Rate limits for imports and exports of project and groups

Configure rate limit settings for your GitLab instance when importing or exporting projects or groups.

- Tier: Free, Premium, Ultimate
- Offering: GitLab Self-Managed

You can configure the rate limits for file imports and exports of projects and groups. For information on the default
rate limits, see [import and export rate limits](../instance_limits.md#import-and-export).

When a user exceeds a rate limit, it is logged in `auth.log`.

## Change an import or export rate limit

Prerequisites:

- Administrator access.

To change a rate limit:

1. In the upper-right corner, select **Admin**.
1. In the left sidebar, select **Settings** > **Network**.
1. Expand **Import and export rate limits**.
1. Change the value of any rate limit. The rate limits are per minute per user, not per IP address.
   Set to `0` to disable a rate limit.
