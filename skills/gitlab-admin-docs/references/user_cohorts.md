# User cohorts

Analyze user retention and activity trends over time.

- Tier: Free, Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

A cohort is a group of users created in the same month.
User cohorts show how many users in each cohort continue to use GitLab in the
months after they were created.
Use this information to track user retention and adoption on your instance,
and to see how many users were created but never used GitLab.

The user cohorts table shows the users created in the last 12 months, including the
current month, grouped by the month they were created in.
Newer months have fewer **Month** columns filled in.
The table counts all users on the instance, including bots, service accounts, and blocked users.

The table has the following columns:

- Under :
  - : The month the users were created.
  - : The number of users who never had any activity on the instance.
  - : The number of users who had activity at least once.
- Under :
  - **Month 1** to **Month 11**: The number and percentage of active users who had
    activity that many months after the registration month, or later.

GitLab stores only the date of each user's most recent activity.
A user counts as active in every month up to their most recent activity,
even if they had no activity in some of those months.

The table is cached, so it can be up to one day out of date.

GitLab considers a user active if:

- The user signs in.
- The user has Git activity (whether push or pull).
- The user visits pages related to dashboards, groups, projects, issues, or merge requests.
- The user uses the API.
- The user uses the GraphQL API.

## View user cohorts

### For the instance

- Offering: GitLab Self-Managed, GitLab Dedicated

Prerequisites:

- Administrator access.

To view user cohorts for the instance:

1. In the upper-right corner, select .
1. In the left sidebar, select  > .
1. Select the  tab.

### For an organization

- Offering: GitLab.com, GitLab Self-Managed
- Status: Beta

In the  area, the table counts only users in that organization.

Prerequisites:

- [Organization administrator](../user/organization/_index.md#user-types-and-permissions) access.

To view user cohorts for an organization:

1. In the left sidebar, select .
1. From the dropdown list, select the organization you want to go to.
1. In the left sidebar, select .
1. Select  > .
1. Select the  tab.
