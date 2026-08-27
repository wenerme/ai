# Redmine

Configure the Redmine integration to link a GitLab project to a Redmine issue tracker and reference Redmine issues in GitLab.

- Tier: Free, Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

Prerequisites:

- You must [turn off GitLab internal issue tracking](../../../integration/external-issue-tracker.md#disable-the-gitlab-issue-tracker) in the project.
  For more information about the steps and consequences of turning off
  GitLab issues, see [change project visibility](../../public_access.md#change-project-visibility) and
  [configure project features and permissions](../settings/_index.md#configure-project-features-and-permissions).

You can use [Redmine](https://www.redmine.org/) as an
[external issue tracker](../../../integration/external-issue-tracker.md).
To turn on the Redmine integration in a project:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **Settings** > **Integrations**.
1. Select **Redmine**.
1. Under **Enable integration**, select the **Active** checkbox.
1. Fill in the required fields:

   - **Project URL**: The URL to the Redmine project to link to this GitLab project.
   - **Issue URL**: The URL to the Redmine project issue to link to this GitLab project.
     The URL must contain `:id`. GitLab replaces this ID with the issue number.
   - **New issue URL**: The URL to use to create a new issue in the Redmine project linked to
     this GitLab project.



     > [!note]
     > This URL is not used and removal is planned in a future release.
     > For more information, see [issue 327503](https://gitlab.com/gitlab-org/gitlab/-/issues/327503).

1. Optional. Select **Test settings**.
1. Select **Save changes**.

After you configure and turn on Redmine, a link appears on the GitLab project pages.
The link directs you to your Redmine project.

For example, this is a configuration for a project named `gitlab-ci`:

- Project URL: `https://redmine.example.com/projects/gitlab-ci`
- Issue URL: `https://redmine.example.com/issues/:id`
- New issue URL: `https://redmine.example.com/projects/gitlab-ci/issues/new`

## Reference Redmine issues in GitLab

You can reference your Redmine issues using:

- `#<ID>`, where `<ID>` is a number (example `#143`).
- `<PROJECT>-<ID>`, for example `API_32-143`, where:
  - `<PROJECT>` starts with a capital letter, followed by capital letters, numbers, or underscores.
  - `<ID>` is a number.

In links, the `<PROJECT>` part is ignored, and they always point to the address specified in **Issue URL**.

Use the longer format (`<PROJECT>-<ID>`) if you have both internal and external issue
trackers turned on. If you use the shorter format and an issue with the same ID exists in the
internal issue tracker, the internal issue is linked.
