# Pipeline status emails

- Tier: Free, Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

- Filtering tag pipelines by the branches that contain the tag commit [changed](https://gitlab.com/gitlab-org/gitlab/-/work_items/628879) in GitLab 19.6.

You can send notifications about pipeline status changes in a group or
project to a list of email addresses.

Pipeline notifications triggered by blocked users are not delivered.

## Enable pipeline status email notifications

Prerequisites:

- You must have the Maintainer or Owner role for the project or the Owner role for the group.

To enable pipeline status emails:

1. In your project or group, in the left sidebar, select **Settings** > **Integrations**.
1. Select **Pipeline status emails**.
1. Ensure the **Active** checkbox is selected.
1. In **Recipients**, enter a comma-separated list of email addresses.
   Invalid email addresses are automatically filtered out and will not receive notifications.
1. Optional. To receive notifications for broken pipelines only, select
   **Notify only broken pipelines**.
1. Optional. To receive notifications only when a pipeline's status changes, select
   **Notify only when status changes**.
1. Optional. To receive notifications for parent and child pipelines, select
   **Notify child pipelines**.
1. Select the branches to send notifications for.
   For [tag pipelines](../../../ci/pipelines/pipeline_types.md#tag-pipeline), selecting **All branches** always matches,
   even if no branch contains the tag commit.
   For other selections, a tag pipeline sends an email when any branch containing the tag commit
   matches the selected branch type.
1. Select **Save changes**.
