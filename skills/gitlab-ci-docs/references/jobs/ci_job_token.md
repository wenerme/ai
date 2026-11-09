# CI/CD job token

Authenticate CI/CD jobs with GitLab features by using a short-lived job token.

- Tier: Free, Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

When a CI/CD pipeline job is about to run, GitLab generates a unique token and makes it available
to the job as the [`CI_JOB_TOKEN` predefined variable](../variables/predefined_variables.md).
The token is valid only while the job is running. After the job finishes, the token access
is revoked and you cannot use the token anymore.

Use a CI/CD job token to authenticate with certain GitLab features from running jobs.
The token receives the same access level as the user that triggered the pipeline,
but has [access to fewer resources](#job-token-access) than a personal access token. A user
can trigger a job by pushing a commit, running a manual job, or owning a scheduled pipeline.
This user must have a [role that has the required privileges](../../user/permissions.md#project-cicd)
to access the resources.

You can use a job token to authenticate with GitLab to access another group or project's resources (the target project).
By default, the job token's group or project must be [added to the target project's allowlist](#add-a-group-or-project-to-the-job-token-allowlist).

If a project is public or internal, you can access some features without being on the allowlist.
For example, you can fetch artifacts from the project's public pipelines.
This access can also [be restricted](#limit-job-token-scope-for-public-or-internal-projects).

## Job token access

- Permission to get a single tag [introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/216463) in GitLab 18.8.
- Permission to access the Badges API [introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/326910) in GitLab 19.1.
- Permission to list all references a commit is pushed to [introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/606881) in GitLab 19.4.

CI/CD job tokens can access the following resources:

| Resource                                                                                              | Notes |
| ----------------------------------------------------------------------------------------------------- | ----- |
| [Badges API](../../api/project_badges.md)                                                             | Can access all endpoints in this API. |
| [Branches API](../../api/branches.md)                                                                 | Can access the `GET /projects/:id/repository/branches` endpoint. |
| [Commits API](../../api/commits.md)                                                                   | Can access the `GET /projects/:id/repository/commits/:sha`, `GET /projects/:id/repository/commits/:sha/merge_requests`, and `GET /projects/:id/repository/commits/:sha/refs` endpoints. |
| [Container registry](../../user/packages/container_registry/build_and_push_images.md#use-gitlab-cicd) | Used as the `$CI_REGISTRY_PASSWORD` [predefined variable](../variables/predefined_variables.md) to authenticate with the container registry associated with the job's project. |
| [Package registry](../../user/packages/package_registry/_index.md#to-build-packages)                  | Used to authenticate with the registry. |
| [Terraform module registry](../../user/packages/terraform_module_registry/_index.md)                  | Used to authenticate with the registry. |
| [Secure files](../secure_files/_index.md#use-secure-files-in-cicd-jobs)                               | Used by the [`glab securefile`](https://gitlab.com/gitlab-org/cli/-/tree/main/docs/source/securefile) command to use secure files in jobs. |
| [Container registry API](../../api/container_registry.md)                                             | Can authenticate only with the container registry associated with the job's project. |
| [Deployments API](../../api/deployments.md)                                                           | Can access all endpoints in this API. |
| [Environments API](../../api/environments.md)                                                         | Can access all endpoints in this API. |
| [Files API](../../api/repository_files.md)                                                            | Can access the `GET /projects/:id/repository/files/:file_path/raw` endpoint. |
| [Jobs API](../../api/jobs.md#retrieve-a-job-by-job-token)                                             | Can access only the `GET /job` endpoint. |
| [Job artifacts API](../../api/job_artifacts.md)                                                       | Can access download endpoints only. |
| [Merge requests API](../../api/merge_requests.md)                                                     | Can access the `GET /projects/:id/merge_requests` and `GET /projects/:id/merge_requests/:merge_request_iid` endpoints. |
| [Notes API](../../api/notes.md)                                                                       | Can access the `GET /projects/:id/merge_requests/:merge_request_iid/notes` and `GET /projects/:id/merge_requests/:merge_request_iid/notes/:note_id` endpoints. |
| [Packages API](../../api/packages.md)                                                                 | Can access all endpoints in this API. |
| [Pipeline trigger tokens API](../../api/pipeline_triggers.md#trigger-a-pipeline-with-a-token)         | Can access only the `POST /projects/:id/trigger/pipeline` endpoint. |
| [Pipelines API](../../api/pipelines.md#update-pipeline-metadata)                                      | Can access only the `PUT /projects/:id/pipelines/:pipeline_id/metadata` endpoint. |
| [Release links API](../../api/releases/links.md)                                                      | Can access all endpoints in this API. |
| [Releases API](../../api/releases/_index.md)                                                          | Can access all endpoints in this API. |
| [Repositories API](../../api/repositories.md)                                                         | Can access the `GET /projects/:id/repository/archive` and `GET /projects/:id/repository/changelog` endpoints. |
| [Tags API](../../api/tags.md)                                                                         | Can access the `GET /projects/:id/repository/tags` and `GET /projects/:id/repository/tags/:tag_name` endpoints. |

An open [proposal](https://gitlab.com/groups/gitlab-org/-/epics/3559) exists to make permissions
more granular.

## GitLab CI/CD job token security

If a job token is leaked, it could potentially be used to access private data accessible
to the user that ran the CI/CD job. To help prevent leaking or misuse of this token,
GitLab:

- Masks the job token in job logs.
- Grants permissions to the job token only when the job is running.

You should also configure your [runners](../runners/_index.md) to be secure:

- Avoid using Docker `privileged` mode if the machines are re-used.
- Avoid using the [`shell` executor](https://docs.gitlab.com/runner/executors/shell/) when jobs
  run on the same machine.

An insecure GitLab Runner configuration increases the risk that someone can steal tokens from other
jobs.

## Control job token access to your project

You can control which groups or projects can use a job token to authenticate and access some of your project's resources.

By default, job token access is restricted to only CI/CD jobs that run in pipelines in
your project. To allow another group or project to authenticate with a job token from the other
project's pipeline:

- You must [add the group or project to the job token allowlist](#add-a-group-or-project-to-the-job-token-allowlist).
- The user that triggers the job must be a member of your project.
- The user must have the [permissions](../../user/permissions.md) to perform the action.

If your project is public or internal, some publicly accessible resources can be accessed
with a job token from any project. These resources can also be [limited to only projects on the allowlist](#limit-job-token-scope-for-public-or-internal-projects).

GitLab Self-Managed administrators can [override and enforce this setting](../../administration/settings/continuous_integration.md#access-job-token-permission-settings).
When the setting is enforced, the CI/CD job token is always restricted to the project's allowlist.

### Add a group or project to the job token allowlist

- Adding groups to the job token allowlist [introduced](https://gitlab.com/gitlab-org/gitlab/-/issues/415519) in GitLab 17.0.
- **Token Access** section renamed to **Job token permissions**, and [**Limit access to this project** setting renamed to **Authorized groups and projects**](https://gitlab.com/gitlab-org/gitlab/-/issues/415519) in GitLab 17.2.
- [**Authorized groups and projects** setting renamed to **CI/CD job token allowlist**](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/160078) in GitLab 17.3.
- **Add project** option [renamed to **Add**](https://gitlab.com/gitlab-org/gitlab/-/issues/470880/) in GitLab 17.6.

You can add groups or projects to your job token allowlist to allow access to your project's resources
with a job token for authentication. By default, the allowlist of any project only includes itself.
Add groups or projects to the allowlist only when cross-project access is needed.

Adding a project to the allowlist does not give additional [permissions](../../user/permissions.md)
to the members of the allowlisted project. They must already have permissions to access the resources
in your project to use a job token from the allowlisted project to access your project.

For example, project A can add project B to project A's allowlist. CI/CD jobs
in project B (the "allowed project") can now use CI/CD job tokens to
authenticate API calls to access project A.

When you add a group to the allowlist, the entry gives access to every project in that group,
and its subgroups at any depth. GitLab evaluates the match each time a job uses the token,
so projects added to a group later are included without changing the allowlist.

For example, project A adds the group `example-group` to its allowlist. Jobs in
`example-group/team-b/project-c` can then use a job token to access project A, as can jobs
in any project created under `example-group` afterwards.

Prerequisites:

- You must have the Maintainer or Owner role for the current project. If the allowed project
  is internal or private, you must have the Guest, Planner, Reporter, Developer, Maintainer, or Owner role in that project.
- You must not have more than 200 groups on the allowlist, and not more than 200 projects.
  The two limits are counted separately.

To add a group or project to the allowlist:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **Settings** > **CI/CD**.
1. Expand **Job token permissions**.
1. To the right of **CI/CD job token allowlist**, select **Add**.
1. Select **Group or project**
1. Input the path to the group or project to add to the allowlist, and select **Add**.

You can also add a group or project to the allowlist [with the API](../../api/graphql/reference/mutations.md#cijobtokenscopeaddgrouporproject).

### Limit job token scope for public or internal projects

- Access to the repository [introduced](https://gitlab.com/gitlab-org/gitlab/-/issues/439158) in GitLab 17.0.

Projects not in the allowlist can use a job token to authenticate with public or internal projects to:

- Fetch artifacts.
- Access the container registry.
- Access the package registry.
- Access releases, deployments, and environments.
- Access the repository.

You can limit access to these actions to only the projects on the allowlist by setting
each feature to be only visible to project members.

Prerequisites:

- You must have the Maintainer role for the project.

To set a feature to be only visible to project members:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **Settings** > **General**.
1. Expand **Visibility, project features, permissions**.
1. Set the visibility to **Only project members** for the features you want to restrict access to.
   - Access to fetch artifacts is controlled by the CI/CD visibility setting.
1. Select **Save changes**.

### Allow any project to access your project

- Offering: GitLab Self-Managed, GitLab Dedicated

- **Token Access** section renamed to **Job token permissions**, and [**Limit access to this project** setting renamed to **Authorized groups and projects**](https://gitlab.com/gitlab-org/gitlab/-/issues/415519) in GitLab 17.2.
- [**Authorized groups and projects** setting renamed to **CI/CD job token allowlist**](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/160078) in GitLab 17.3.

> [!warning]
> It is a security risk to disable the token access limit and allowlist. A malicious user could try to compromise
> a pipeline created in an unauthorized project. If the pipeline was created by one of
> your maintainers, the job token could be used in an attempt to access your project.

If you disable the CI/CD job token allowlist, jobs from any project can access your project
with a job token. The user that triggers the pipeline must have permission to access your project.
You should only disable this setting for testing or a similar reason,
and you should enable it again as soon as possible.

This option is only available on GitLab Self-Managed or GitLab Dedicated instances with the
[**Enable and enforce job token allowlist for all projects** setting](../../administration/settings/continuous_integration.md#enforce-job-token-allowlist)
disabled.

Prerequisites:

- You must have the Maintainer or Owner role for the project.

To disable the job token allowlist:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **Settings** > **CI/CD**.
1. Expand **Job token permissions**.
1. Select **All groups and projects**.
1. Recommended. When finished testing, select **This project and any groups and projects in the allowlist** to re-enable the job token allowlist.

You can also modify this setting with the [GraphQL](../../api/graphql/reference/mutations.md#projectcicdsettingsupdate)
(`inboundJobTokenScopeEnabled`) or [REST](../../api/project_job_token_scopes.md#update-the-cicd-job-token-access-settings-for-a-project) API.

### Allow Git push requests to your project repository

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/issues/389060) in GitLab 17.2. [with a feature flag](../../administration/feature_flags/_index.md) named `allow_push_repository_for_job_token`. Disabled by default.
- **Token Access** section renamed to **Job token permissions**, and [**Limit access to this project** setting renamed to **Authorized groups and projects**](https://gitlab.com/gitlab-org/gitlab/-/issues/415519) in GitLab 17.2.
- [**Authorized groups and projects** setting renamed to **CI/CD job token allowlist**](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/160078) in GitLab 17.3.
- [Enabled on GitLab.com](https://gitlab.com/gitlab-org/gitlab/-/issues/468320) in GitLab 18.3
- [Generally available](https://gitlab.com/gitlab-org/gitlab/-/issues/468320) in GitLab 18.4. Feature flag `allow_push_repository_for_job_token` removed.

You can configure your project to allow Git push requests that are authenticated with a CI/CD job
token. This setting is turned off by default.

When you turn on this setting, only job tokens generated by CI/CD jobs that run in the project
pipelines can push to the project.

When you use a job token to push to the project, no CI/CD pipelines are triggered.
The job token has the same access permissions as the user who started the job.

If you use the `semantic-release` tool, [this setting might prevent pipeline creation](#the-semantic-release-tool-and-job-tokens).

> [!warning]
> Do not enable this setting on projects configured as [pull mirrors](../../user/project/repository/mirror/pull.md),
> especially if [pipelines run for mirror updates](../../user/project/repository/mirror/pull.md#trigger-pipelines-for-mirror-updates).
> The upstream repository owner could attempt to use the `CI_JOB_TOKEN` to push commits to the mirrored project.

Prerequisites:

- You must have the Maintainer or Owner role for the project.

To grant permission to job tokens generated in your project to push to the project's repository:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **Settings** > **CI/CD**.
1. Expand **Job token permissions**.
1. In the **Permissions** section, select **Allow Git push requests to the repository**.

You can also control this setting with the `ci_push_repository_for_job_token_allowed` parameter in
the [projects API](../../api/projects.md#update-a-project).

### Allow cross-project Git push requests from allowlisted projects

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/issues/479907) in GitLab 19.0 [with a feature flag](../../administration/feature_flags/_index.md) named `allow_push_to_allowlisted_projects`. Disabled by default.
- [Generally available](https://gitlab.com/gitlab-org/gitlab/-/issues/597258) in GitLab 19.1. Feature flag `allow_push_to_allowlisted_projects` removed.

You can allow CI/CD job tokens from allowlisted projects to push to your project repository.
A cross-project push avoids long-lived access tokens for GitOps workflows, submodule tagging,
and cross-repository CI/CD pipelines.

When a job token push succeeds, no CI/CD pipelines are triggered in the target project.

> [!warning]
> Do not enable this setting on projects configured as [pull mirrors](../../user/project/repository/mirror/pull.md),
> especially if [pipelines are triggered for mirror updates](../../user/project/repository/mirror/pull.md#trigger-pipelines-for-mirror-updates).
> An owner of an allowlisted source project could push commits to your mirrored project using a CI/CD job token.

For cross-project push to work, all of the following must be true:

- The target project has **Allow Git push requests to the repository** enabled.
- The target project has **Allow cross-project Git push requests from allowlisted projects** enabled.
- The target project has the [job token allowlist](#add-a-group-or-project-to-the-job-token-allowlist) enabled.
- The source project is on the target project's allowlist with
  for  in its fine-grained permissions, or with default permissions
  (no fine-grained restriction set).
  A group entry on the allowlist that includes the source project also satisfies this requirement.
- The user who started the pipeline has at least the Developer role on the target project.

Prerequisites:

- You must have the Maintainer or Owner role for the project.

To allow cross-project push requests:

1. In the top bar, select **Search or go to** and find your project.
1. Select **Settings** > **CI/CD**.
1. Expand **Job token permissions**.
1. In the **Permissions** section, select **Allow Git push requests to the repository**.
1. Select **Allow cross-project Git push requests from allowlisted projects**.
1. Select **Save Changes**.
1. [Add the source project or its group to the allowlist with fine-grained permissions](fine_grained_permissions.md#add-fine-grained-permissions-to-the-job-token-allowlist).
   For , select .
   Or, leave default permissions enabled.

You can also allow cross-project push requests with the GraphQL API.

To allow Git push requests and cross-project push requests in the target project, use the
[`projectCiCdSettingsUpdate`](../../api/graphql/reference/mutations.md#projectcicdsettingsupdate) mutation:

```graphql
mutation {
  projectCiCdSettingsUpdate(input: {
    fullPath: "<target-namespace>/<target-project>",
    pushRepositoryForJobTokenAllowed: true,
    crossProjectPushForJobTokenAllowed: true
  }) {
    ciCdSettings {
      pushRepositoryForJobTokenAllowed
      crossProjectPushForJobTokenAllowed
    }
    errors
  }
}
```

To add the source project to the target project's allowlist with
for , use the
[`ciJobTokenScopeAddGroupOrProject`](../../api/graphql/reference/mutations.md#cijobtokenscopeaddgrouporproject) mutation.
In this mutation, `projectPath` is the target project and `targetPath` is the source project:

```graphql
mutation {
  ciJobTokenScopeAddGroupOrProject(input: {
    projectPath: "<target-namespace>/<target-project>",
    targetPath: "<source-namespace>/<source-project>",
    defaultPermissions: false,
    jobTokenPolicies: [ADMIN_REPOSITORIES]
  }) {
    errors
  }
}
```

To use default permissions instead, omit `defaultPermissions` and `jobTokenPolicies`.

## Fine-grained permissions for job tokens

You can use fine-grained permissions to explicitly allow access to a limited set of REST API endpoints.

For more information, see [fine-grained permissions for CI/CD job tokens](fine_grained_permissions.md).

## Git repository cloning

You can use the job token to authenticate and clone a repository from a private project
in a CI/CD job. Use `gitlab-ci-token` as the user, and the value of the job token as the password.

For example:

```shell
git clone https://gitlab-ci-token:${CI_JOB_TOKEN}@gitlab.example.com/<namespace>/<project>
```

You can use this job token to clone a repository even if the HTTPS protocol is
[disabled by group, project, or instance settings](../../administration/settings/visibility_and_access_controls.md#configure-enabled-git-access-protocols).

## REST API authentication

You can use a job token to authenticate requests for specific
REST API endpoints using these methods:

- Header: `--header "JOB-TOKEN: $CI_JOB_TOKEN"` (recommended)
- Form: `--form "token=$CI_JOB_TOKEN"`
- Data: `--data "job_token=$CI_JOB_TOKEN"`
- Query string in URL: `?job_token=$CI_JOB_TOKEN` (not recommended)

For example, using the recommended header method:

```shell
curl --verbose --request POST --header "JOB-TOKEN: $CI_JOB_TOKEN" --form ref=master "https://gitlab.com/api/v4/projects/1234/trigger/pipeline"
```

For token security guidance, see [security considerations](../../security/tokens/_index.md#security-considerations).

You cannot use job tokens to authenticate GraphQL requests.

## Job token authentication log

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/issues/467292/) in GitLab 17.6.

You can track which other projects use a CI/CD job token to authenticate with your project
in an authentication log. To check the log:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **Settings** > **CI/CD**.
1. Expand **Job token permissions**. The **Authentication log** section displays the
   list of other projects that accessed your project by authenticating with a job token.
1. Optional. Select **Download CSV** to download the full authentication log, in CSV format.

The authentication log displays a maximum of 100 authentication events. If the number of events
is more than 100, download the CSV file to view the log.

New authentications to a project can take up to 5 minutes to appear in the authentication log.

## JWT format for CI/CD job tokens

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/167938) in GitLab 17.7 [with a flag](../../administration/feature_flags/_index.md) named `ci_job_token_jwt`. Disabled by default.
- [Enabled by default](https://gitlab.com/gitlab-org/gitlab/-/work_items/514860) for new top-level groups in GitLab 17.10.

GitLab is switching CI/CD job tokens from a legacy random-string format to a
[JSON Web Token (JWT)](https://jwt.io/) format. A JWT job token is signed by the
instance and embeds the identifiers GitLab needs to route the request.

Which format a job receives depends on the top-level group of the job's project:

- Projects in top-level groups created in GitLab 17.10 or later use the JWT format.
- Projects in top-level groups created before GitLab 17.10 use the legacy format,
  unless the group turns on .
- Projects in personal namespaces use the legacy format.

These rules have two exceptions:

- Jobs run by a service account with composite identity, for example GitLab Duo Agent Platform
  flows, always use the JWT format.
- If an administrator turns on the `ci_job_token_jwt` feature flag, all projects use the JWT
  format, including projects in personal namespaces. Top-level groups that turn off
  the setting still use the legacy format.

The JWT format is planned to become the default for all projects, and the legacy
format is planned to be removed in a later release. No milestone is set for either change.
For the current status, see the [deprecation announcement](../../update/deprecations.md#updating-cicd-job-tokens-to-jwt-standard).

### Differences between the legacy and JWT formats

Jobs use the token in the same way with both formats, through the `CI_JOB_TOKEN` variable.
The token itself is different:

| Property   | Legacy format                               | JWT format |
|------------|---------------------------------------------|------------|
| Length     | About 30 characters.                        | About 800 characters. |
| Prefix     | `glcbt-`.                                   | `glcbt-`, preceded by the [instance token prefix](../../administration/settings/account_and_limit_settings.md#instance-token-prefix) if one is configured. |
| Characters | Letters, numbers, `-`, and `_`.             | Letters, numbers, `-`, `_`, and two `.` separators. |
| Expiry     | No expiry time in the token. The token is rejected after the job finishes. | The token also carries an expiry time of the job timeout plus 5 minutes. |

The format change itself does not affect workflows that pass the token through unchanged.
A workflow can break if it copies the token into something with a size or character limit,
or parses the token expecting the legacy format. For example:

- Using the token in a filename, a path, or a database column with a length limit.
- Encoding the token with `base64` or another command that wraps long lines.
- Cloning with the token in the repository URL on a host with a very old Git version.
- Matching the token with a regular expression that does not allow `.`.

If you use a [custom executor](https://docs.gitlab.com/runner/executors/custom/), check what
your driver does with the `CUSTOM_ENV_CI_JOB_TOKEN` variable and with the token in the
repository URL. Version 0.5.0 and earlier of the EC2 Fargate driver broke this way.
For more information, see [JWT format job token errors](#jwt-format-job-token-errors).

### Test your workflows with the JWT format

Before the JWT format becomes the default for all projects, test the pipelines and
workflows that use `CI_JOB_TOKEN`.

Prerequisites:

- The Owner role for the group.

To test your workflows with the JWT format:

1. Create a top-level group for testing, which uses the JWT format by default, or turn on
    for an existing group.
   The setting is in the same place as described in
   [Use legacy format for CI/CD tokens](#use-legacy-format-for-cicd-tokens).
1. Optional. To check which format a job receives without exposing the token, add
   `echo "${#CI_JOB_TOKEN}"` to a job script, or `$env:CI_JOB_TOKEN.Length` for PowerShell.
   The command prints the length of the token: about 30 characters for the legacy format
   and about 800 for the JWT format.
1. Run your pipelines and workflows from a project in that group.

### Use legacy format for CI/CD tokens

You can configure a group to use the legacy format instead of the JWT format.
This setting is planned for removal with the legacy format in a future release.

Prerequisites:

- The Owner role for the group.

To use the legacy format for your CI/CD tokens:

1. In the top bar, select **Search or go to** and find your group.
1. In the left sidebar, select **Settings** > **CI/CD**.
1. Expand **General pipelines**.
1. Turn off **Enable JWT format for CI/CD job tokens**.

Your CI/CD tokens now use the legacy format. If you want to use the JWT format again later, you can re-enable this setting.

## Troubleshooting

CI job token failures are usually shown as responses like `404 Not Found` or similar:

- Unauthorized Git clone:

  ```plaintext
  $ git clone https://gitlab-ci-token:$CI_JOB_TOKEN@gitlab.com/fabiopitino/test2.git

  Cloning into 'test2'...
  remote: The project you were looking for could not be found or you don't have permission to view it.
  fatal: repository 'https://gitlab-ci-token:[MASKED]@gitlab.com/<namespace>/<project>.git/' not found
  ```

- Unauthorized package download:

  ```plaintext
  $ wget --header="JOB-TOKEN: $CI_JOB_TOKEN" ${CI_API_V4_URL}/projects/1234/packages/generic/my_package/0.0.1/file.txt

  --2021-09-23 11:00:13--  https://gitlab.com/api/v4/projects/1234/packages/generic/my_package/0.0.1/file.txt
  Resolving gitlab.com (gitlab.com)... 172.65.251.78, 2606:4700:90:0:f22e:fbec:5bed:a9b9
  Connecting to gitlab.com (gitlab.com)|172.65.251.78|:443... connected.
  HTTP request sent, awaiting response... 404 Not Found
  2021-09-23 11:00:13 ERROR 404: Not Found.
  ```

- Unauthorized API request:

  ```plaintext
  $ curl --verbose --request POST --form "token=$CI_JOB_TOKEN" --form ref=master "https://gitlab.com/api/v4/projects/1234/trigger/pipeline"

  < HTTP/2 404
  < date: Thu, 23 Sep 2021 11:00:12 GMT
  {"message":"404 Not Found"}
  < content-type: application/json
  ```

While troubleshooting CI/CD job token authentication issues, be aware that:

- A [GraphQL example mutation](../../api/graphql/getting_started.md#update-project-settings)
  is available to toggle the scope settings per project.
- [This comment](https://gitlab.com/gitlab-org/gitlab/-/issues/351740#note_1335673157)
  demonstrates how to use GraphQL with Bash and cURL to:
  - Enable the inbound token access scope.
  - Give access to project B from project A, or add B to A's allowlist.
  - Remove project access.
- The CI job token becomes invalid if the job is no longer running, has been erased,
  or if the project is in the process of being deleted.

### The `semantic-release` tool and job tokens

There is a known issue if you use the `semantic-release` tool with the [**Allow Git push requests to the repository** setting](#allow-git-push-requests-to-your-project-repository).
When enabled:

- The tool authenticates with the job token, even if the tool is configured to use a personal access token.
- The job token does not trigger new pipelines, so release pipelines might not run.

For more information, see the [issue 891](https://github.com/semantic-release/gitlab/issues/891).

### JWT format job token errors

The JWT format for CI/CD job tokens has the following known issues.

#### `Error when persisting the task ARN.` error with EC2 Fargate Runner custom executor

There is [a bug](https://gitlab.com/gitlab-org/ci-cd/custom-executor-drivers/fargate/-/issues/86)
in version `0.5.0` and earlier of the EC2 Fargate custom executor. This issue causes this error:

- `Error when persisting the task ARN. Will stop the task for cleanup`

To fix this issue, upgrade to version `0.5.1` or later of the Fargate custom executor.

#### `invalid character '\n' in string literal` error with `base64` encoding

If you use `base64` to encode job tokens, you could receive an `invalid character '\n'` error.

The default behavior of the `base64` command wraps strings that are longer than 79 characters.
When `base64` encoding JWT format job tokens during job execution, for example with
`echo $CI_JOB_TOKEN | base64`, the token is rendered invalid.

To fix this issue, use `base64 -w0` to disable automatically wrapping the token.

#### Git clone fails on SSH executor hosts with an old Git version

On [SSH executor](https://docs.gitlab.com/runner/executors/ssh/) hosts that run a very old
Git version, for example the version shipped with RHEL 6 and earlier, Git clone can fail with
the longer JWT job token in the repository URL. For more information, see
[issue 509578](https://gitlab.com/gitlab-org/gitlab/-/issues/509578#note_2757691798).

To fix this issue, upgrade Git on the host.
If you cannot upgrade Git, configure the group to use the
[legacy token format](#use-legacy-format-for-cicd-tokens).

#### Job token rejected after the instance token prefix changes

If an administrator changes or removes a configured instance token prefix while jobs are
running, GitLab rejects the JWT format job tokens of those jobs. Legacy format job tokens
are not affected. For more information, see
[issue 636985](https://gitlab.com/gitlab-org/gitlab/-/issues/636985).

To avoid this issue, change the instance token prefix when no jobs are running.

#### Error: `403 Forbidden` in long-running jobs

When using JWT format job tokens in GitLab 18.8 and earlier, a job could fail with
a `403 Forbidden` error. This can happen in:

- Jobs that use [`needs`](../yaml/_index.md#needs).
- Jobs in [child pipelines](../pipelines/downstream_pipelines.md#parent-child-pipelines).
- Jobs that run for longer than approximately 6 minutes without producing console output.

The error typically appeared in runner logs as:

```plaintext
WARNING: Submitting job to coordinator... job failed
  code=403 job=<job_id> status=PUT https://gitlab.com/api/v4/jobs/<job_id>: 403 Forbidden
```

Update to GitLab 18.9 to avoid this issue.
