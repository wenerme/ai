# Keep a GitHub project updated in GitLab

Keep a project imported from GitHub in sync with its GitHub repository until you switch to GitLab.

- Tier: Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated
- Status: Experiment

- [Introduced](https://gitlab.com/groups/gitlab-org/-/work_items/23553) as an [experiment](../../../policy/development_stages_support.md#experiment) in GitLab 19.4 [with a feature flag](../../../administration/feature_flags/_index.md) named `github_continuous_import`. Disabled by default.

> [!flag]
> The availability of this feature is controlled by a feature flag.
> For more information, see the history.
> This feature is available for testing, but not ready for production use.

When you import a GitHub project, you can choose to keep it updated.
GitLab then copies later changes to the project in GitHub into the project in GitLab.
Use this option to help move to GitLab in stages.
You can import the project and check the migrated data in GitLab.
GitHub remains the source of truth until you're ready to switch.

While updates are on, the project is read-only in GitLab, including uploads and merge request approvals.
GitLab copies changes from GitHub when GitHub sends an event, such as a push, an issue comment, or a pull request review.
GitLab creates the webhook for you when updates are set up, so you don't need to create one in GitHub.
GitLab also checks GitHub every 30 minutes for missed changes.

## Keep a project updated

To keep an imported project updated, select the option when you import the project:

1. Connect with GitHub, as described in [Migrate from GitHub](github.md#use-github-oauth).
   Personal access tokens don't support this option in the UI.
   To use a personal access token, use the [import API](../../../api/import.md#continuous-sync-with-a-personal-access-token).
1. Expand .
1. Select .
1. Import the project into a group on the Premium or Ultimate tier.

GitLab keeps the following updated from GitHub, and you can't modify them directly in GitLab:

- Code, including branches, tags, and Large File Storage (LFS) files
- Issues
- Pull requests, as merge requests
- Comments
- Reviews
- Releases
- Labels and milestones added after the import

Wikis are imported once and are not kept updated.
New reviews are copied during the next update.

## Reconnect GitHub

If GitHub rejects the token five times in a row, GitLab disconnects the project from GitHub.
For example, GitHub rejects a token that was revoked.
The  section then shows
.
The project stays read-only until you reconnect.

Prerequisites:

- You must have at least the Maintainer role for the project.

To reconnect a project imported with GitHub OAuth:

1. In the top bar, select  and find your project.
1. In the left sidebar, select  > .
1. Expand the  section.
1. Select .
1. On GitHub, authorize GitLab with the GitHub account that connected the project.

After you reconnect, GitLab copies the changes made on GitHub while the project was disconnected.

To reconnect a project imported with a personal access token, use the
[restore endpoint](../../../api/import.md#restore-github-updates-with-a-new-personal-access-token).

## Stop updates

When you're ready to use the GitLab project for development instead of GitHub, stop updates.

> [!warning]
> Stopping updates is final. You can't turn updates back on for the project.

Prerequisites:

- You must have at least the Maintainer role for the project.

To stop updates:

1. In the top bar, select  and find your project.
1. In the left sidebar, select  > .
1. Expand the  section.
1. In the  section, select .
1. In the  dialog, enter the project path.
1. Select .

After you choose to stop updates, GitLab runs one final update that copies any remaining changes.
If that final update fails, the project stays read-only, and GitLab tries again after about six hours.
When updates are stopped, you can make changes in GitLab.

## Known issues

- Changes to existing milestones on GitHub are not copied.
- Removing the assignee from a pull request on GitHub does not clear it on the merge request in GitLab.
  Only the first assignee of a pull request is imported.
- Reviewers requested or removed on GitHub after the import are not copied to merge requests.
- If GitLab rejects a GitHub object, the sync pass stops.
