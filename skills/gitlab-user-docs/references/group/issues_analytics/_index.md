# Issue analytics

- Tier: Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

Issue analytics provide insights into the issues created each month in a group or project.
A bar chart illustrates the number of issues opened and closed each month.
A table displays the top 100 issues based on the global page filters, with the following details about each issue:

- Name
- Age
- Status
- Milestone
- Iteration
- Weight
- Due date
- Assignee
- Author

[Issue analytics bar chart and table showing issues created in a group.]

## View issue analytics

To view issue analytics:

1. In the top bar, select **Search or go to** and find your project or group.
1. In the left sidebar, select **Analyze** > **Issue analytics**. To view the total number of issues for a month, hover over a bar.
1. Optional. To filter the results, in **Search or filter results** text box, enter your criteria:

   - Author
   - Assignee
   - Milestone
   - Label
   - My reaction
   - Weight

1. Optional. To change the total number of months displayed, append the parameter `months_back=n` to the URL.
   For example, `https://gitlab.com/groups/gitlab-org/-/issues_analytics?months_back=15`
   displays a chart with data for 15 months for the GitLab.org group.

You can also access issue analytics from the [Value Streams Dashboard](../../analytics/value_streams_dashboard.md) through the **New issues** drill-down report.

### Enhanced issue analytics

- Tier: Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

Enhanced issue analytics display the additional metric `Issues closed`, which represents the total number of resolved issues in your group over a selected period.
You can use this metric to improve the overall turn-around time and value delivered to your customers.

[Enhanced issue analytics bar chart and table showing issues opened and closed in a group.]

## Rate limit

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/269532) in GitLab 19.7 [with a feature flag](../../../administration/feature_flags/_index.md) named `issues_analytics_rate_limit_enforce`. Disabled by default.

> [!flag]
> The availability of this feature is controlled by a feature flag.
> For more information, see the history.

The issue analytics chart loads its data with a separate request.
GitLab limits these requests to 60 every minute for each user in each group or project.
For unauthenticated users, the limit applies to each IP address.
When you reach the limit, the chart displays an error. Try again after a minute.

The limit does not apply to the enhanced issue analytics chart in Ultimate,
which uses the GraphQL API.

On GitLab Self-Managed, administrators can change the limit with the `issues_analytics_limit`
[application setting](../../../api/settings.md).
