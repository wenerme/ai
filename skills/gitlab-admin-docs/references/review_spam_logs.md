# Review spam logs

Monitor and manage flagged user activity considered to be spam.

- Tier: Free, Premium, Ultimate
- Offering: GitLab Self-Managed, GitLab Dedicated

GitLab tracks user activity and flags certain behavior for potential spam.

In the **Admin** area, a GitLab administrator can view and resolve spam logs.

## Manage spam logs

View and resolve spam logs to moderate user activity in your instance.

To view spam logs:

1. In the upper-right corner, select **Admin**.
1. In the left sidebar, select **Spam logs**.
1. Optional. To resolve a spam log, select **More actions** (), then **Remove user**, **Block user**, **Remove log**, or **Trust user**.

### Resolving spam logs

You can resolve a spam log with one of the following effects:

| Option | Description |
|---------|-------------|
| **Remove user** | The user is [deleted](../user/profile/account/delete_account.md) from the instance. |
| **Block user** | The user is blocked from the instance. The spam log remains in the list. |
| **Remove log** | The spam log is removed from the list. |
| **Trust user** | The user is trusted, and can create issues, notes, snippets, and merge requests without being blocked for spam. Spam logs are not created for trusted users. |

## Related topics

- [Moderate users (administration)](moderate_users.md)
- [Review abuse reports](review_abuse_reports.md)
