---
date: "2024-04-10T22:21:00+08:00"
---

# Variables

## Environment variables

These environment variables are set automatically in every workflow run and can be accessed directly (e.g. `$CI` in shell scripts).

| Name | Description | Example |
|---|---|---|
| `CI` | Always set to `true`. | `true` |
| `GITEA_ACTIONS` | Always set to `true`. Useful to distinguish Gitea Actions from other CI systems. | `true` |
| `GITEA_ACTIONS_RUNNER_VERSION` | The version of the runner executing the workflow. | `1.0.8` |
| `GITEA_ENV``GITHUB_ENV` | Path to the file that sets environment variables for subsequent steps. | `/home/runner/work/_temp/_runner_file_commands/set_env_***` |
| `GITEA_OUTPUT``GITHUB_OUTPUT` | Path to the file that sets step output parameters. | `/home/runner/work/_temp/_runner_file_commands/set_output_***` |
| `GITEA_PATH``GITHUB_PATH` | Path to the file that adds system `PATH` entries for subsequent steps. | `/home/runner/work/_temp/_runner_file_commands/add_path_***` |
| `GITEA_STATE``GITHUB_STATE` | Path to the file that sets step state variables. | `/home/runner/work/_temp/_runner_file_commands/save_state_***` |
| `GITEA_STEP_SUMMARY``GITHUB_STEP_SUMMARY` | Path to the file for writing job summaries. | `/home/runner/work/_temp/_runner_file_commands/step_summary_***` |
| `GITHUB_ACTIONS` | Always set to `true`. | `true` |
| `GITHUB_ACTION` | The name of the action currently running, or the step `id`. | `__run` |
| `GITHUB_ACTION_PATH` | The path where the action is located. | `/home/runner/work/_actions/actions/checkout/v4` |
| `GITHUB_ACTION_REF` | The ref of the action being executed. | `v4` |
| `GITHUB_ACTION_REPOSITORY` | The owner and repository of the action. | `actions/checkout` |
| `GITHUB_ACTOR` | The username of the user that triggered the workflow. | `silverwind` |
| `GITHUB_API_URL` | The URL of the REST API. | `https://gitea.com/api/v1` |
| `GITHUB_BASE_REF` | The target branch of a pull request. | `main` |
| `GITHUB_EVENT_NAME` | The name of the event that triggered the workflow. | `push` |
| `GITHUB_EVENT_PATH` | Path to the file containing the event webhook payload. | `/home/runner/work/_temp/_github_workflow/event.json` |
| `GITHUB_GRAPHQL_URL` | Empty in Gitea (GraphQL is not supported). | _(empty)_ |
| `GITHUB_HEAD_REF` | The source branch of a pull request. | `feature-branch` |
| `GITHUB_JOB` | The `job_id` of the current job. | `build` |
| `GITHUB_REF` | The fully-formed ref that triggered the workflow. | `refs/heads/main` |
| `GITHUB_REF_NAME` | The short ref name. | `main` |
| `GITHUB_REF_TYPE` | The type of ref: `branch` or `tag`. | `branch` |
| `GITHUB_REPOSITORY` | The owner and repository name. | `gitea/docs` |
| `GITHUB_REPOSITORY_OWNER` | The repository owner's username. | `gitea` |
| `GITHUB_RETENTION_DAYS` | The number of days that workflow run logs and artifacts are kept. | `90` |
| `GITHUB_RUN_ATTEMPT` | The attempt number of the workflow run. | `1` |
| `GITHUB_RUN_ID` | A unique number for each workflow run. | `1234` |
| `GITHUB_RUN_NUMBER` | A unique number for each run of a particular workflow. | `42` |
| `GITHUB_SERVER_URL` | The URL of the Gitea instance. | `https://gitea.com` |
| `GITHUB_SHA` | The commit SHA that triggered the workflow. | `a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2` |
| `GITHUB_WORKFLOW` | The name of the workflow. | `CI` |
| `GITHUB_WORKSPACE` | The default working directory on the runner. | `/workspace/gitea/docs` |

### Runner environment variables

| Name | Description | Example |
|---|---|---|
| `RUNNER_ARCH` | The architecture of the runner. | `X64` |
| `RUNNER_OS` | The operating system of the runner. | `Linux` |
| `RUNNER_TEMP` | Path to a temporary directory on the runner. | `/tmp` |
| `RUNNER_TOOL_CACHE` | Path to the tool cache directory on the runner. | `/opt/hostedtoolcache` |

### Internal environment variables

These are used internally by the runner and actions. They are typically not needed in workflows directly.

| Name | Description | Example |
|---|---|---|
| `ACTIONS_CACHE_URL` | URL for the actions cache service. | `http://192.168.1.10:8088/` |
| `ACTIONS_ID_TOKEN_REQUEST_TOKEN` | Token for OIDC requests. Only set when configured. | `***` |
| `ACTIONS_ID_TOKEN_REQUEST_URL` | URL to request OIDC tokens. Only set when configured. | `https://gitea.com/login/oauth/access_token` |
| `ACTIONS_RESULTS_URL` | URL for storing artifacts. | `https://gitea.com` |
| `ACTIONS_RUNTIME_TOKEN` | Authentication token for the Actions pipeline API. | `***` |
| `ACTIONS_RUNTIME_URL` | URL for the Gitea Actions pipeline API. | `https://gitea.com/api/actions_pipeline/` |

## Context variables

These variables are available in workflow expressions via `${{ gitea.<name> }}`. For compatibility, `${{ github.<name> }}` works as an alias.

| Name | Description | Example |
|---|---|---|
| `gitea.action``github.action` | The name of the action currently running, or the `id` of a step. | `__run` |
| `gitea.action_path``github.action_path` | The path where an action is located. Only supported in composite actions. | `/home/runner/work/_actions/actions/checkout/v4` |
| `gitea.action_ref``github.action_ref` | The ref of the action being executed. | `v4` |
| `gitea.action_repository``github.action_repository` | The owner and repository name of the action. | `actions/checkout` |
| `gitea.action_status``github.action_status` | The current result of a composite action. | `success` |
| `gitea.actor``github.actor` | The username of the user that triggered the initial workflow run. | `silverwind` |
| `gitea.api_url``github.api_url` | The URL of the REST API. | `https://gitea.com/api/v1` |
| `gitea.base_ref``github.base_ref` | The target branch of a pull request. Only set for `pull_request` and `pull_request_target` events. | `main` |
| `gitea.env``github.env` | Path on the runner to the file that sets environment variables from workflow commands. Unique to each step. | `/home/runner/work/_temp/_runner_file_commands/set_env_***` |
| `gitea.event``github.event` | The full event webhook payload as an object. See [Event payload](#event-payload). | `{...}` |
| `gitea.event_name``github.event_name` | The name of the event that triggered the workflow run. | `push` |
| `gitea.event_path``github.event_path` | Path on the runner to the file containing the full event webhook payload. | `/home/runner/work/_temp/_github_workflow/event.json` |
| `gitea.head_ref``github.head_ref` | The source branch of a pull request. Only set for `pull_request` and `pull_request_target` events. | `feature-branch` |
| `gitea.job``github.job` | The `job_id` of the current job. | `build` |
| `gitea.ref``github.ref` | The fully-formed ref that triggered the workflow. | `refs/heads/main` |
| `gitea.ref_name``github.ref_name` | The short ref name. | `main` |
| `gitea.ref_protected``github.ref_protected` | `true` if branch protections are configured for the ref that triggered the workflow run. | `true` |
| `gitea.ref_type``github.ref_type` | The type of ref: `branch` or `tag`. | `branch` |
| `gitea.path``github.path` | Path on the runner to the file that sets system `PATH` variables from workflow commands. Unique to each step. | `/home/runner/work/_temp/_runner_file_commands/add_path_***` |
| `gitea.repository``github.repository` | The owner and repository name. | `gitea/docs` |
| `gitea.repository_owner``github.repository_owner` | The repository owner's username. | `gitea` |
| `gitea.repositoryUrl``github.repositoryUrl` | The HTML URL to the repository. | `https://gitea.com/gitea/docs` |
| `gitea.retention_days``github.retention_days` | The number of days that workflow run logs and artifacts are kept. | `90` |
| `gitea.run_id``github.run_id` | A unique number for each workflow run within a repository. Does not change on re-run. | `1234` |
| `gitea.run_number``github.run_number` | A unique number for each run of a particular workflow. Starts at 1 and increments with each new run. | `42` |
| `gitea.run_attempt``github.run_attempt` | A unique number for each re-run attempt. Starts at 1 and increments with each re-run. | `1` |
| `gitea.secret_source``github.secret_source` | The source of a secret used in a workflow. Always `Actions` in Gitea. | `Actions` |
| `gitea.server_url``github.server_url` | The URL of the Gitea instance. | `https://gitea.com` |
| `gitea.sha``github.sha` | The commit SHA that triggered the workflow. | `a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2` |
| `gitea.token``github.token` | A token to authenticate on behalf of the Gitea App installed on the repository. See [Token permissions](token-permissions.md). | `ghs_***` |
| `gitea.triggering_actor``github.triggering_actor` | The username of the user that initiated the workflow run. May differ from `actor` on re-runs. | `silverwind` |
| `gitea.workflow``github.workflow` | The name of the workflow. If unnamed, the full path of the workflow file. | `CI` |
| `gitea.workspace``github.workspace` | The default working directory on the runner and the default location of your repository when using the `checkout` action. | `/workspace/gitea/docs` |
| `gitea.gitea_default_actions_url` | The default URL for downloading actions. Gitea-specific. | `https://github.com` |

### Event payload

`gitea.event` is the webhook payload of the event that triggered the run, so which fields exist depends on `gitea.event_name`.
The same payload is written as JSON to the file at `gitea.event_path`.

Payloads use Gitea's webhook format, which is close to GitHub's but not identical. Differences are noted below.
Reading a field that the payload does not have returns an empty value instead of failing, so `${{ gitea.event.pull_request.number }}` is empty on a `push` run.

These fields exist in almost every payload:

| Name | Description | Example |
|---|---|---|
| `gitea.event.action` | The activity type. Only set for events that have activity types, see [supported events](faq.md#what-workflow-trigger-events-does-gitea-support). | `opened` |
| `gitea.event.repository.full_name` | The owner and name of the repository. | `gitea/docs` |
| `gitea.event.repository.default_branch` | The default branch of the repository. | `main` |
| `gitea.event.repository.private` | Whether the repository is private. | `false` |
| `gitea.event.repository.html_url` | The HTML URL of the repository. | `https://gitea.com/gitea/docs` |
| `gitea.event.sender.login` | The username of the user that triggered the event. Also available as `sender.username`. | `silverwind` |

The remaining fields are specific to one or a few events:

| Name | Events | Description | Example |
|---|---|---|---|
| `gitea.event.schedule` | `schedule` | The cron expression that triggered the run. | `*/5 * * * *` |
| `gitea.event.inputs.<name>` | `workflow_dispatch`, `workflow_call` | A raw input value. Prefer `${{ inputs.<name> }}`, which also applies the input's `default`. | `true` |
| `gitea.event.workflow` | `workflow_dispatch` | The file name of the dispatched workflow. | `ci.yaml` |
| `gitea.event.ref` | `push`, `create`, `delete`, `workflow_dispatch` | The ref of the event. Unlike GitHub, `create` and `delete` use the full ref instead of the short name. | `refs/heads/main` |
| `gitea.event.ref_type` | `create`, `delete` | The type of ref: `branch` or `tag`. | `tag` |
| `gitea.event.before``gitea.event.after` | `push` | The commit SHA before and after the push. | `a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2` |
| `gitea.event.commits` | `push` | The commits contained in the push, each with `id`, `message`, `url`, `author`, `added`, `removed` and `modified`. | `[{...}]` |
| `gitea.event.head_commit.message` | `push` | The message of the most recent commit of the push. | `fix: broken link` |
| `gitea.event.total_commits` | `push` | The number of commits in the push. Gitea-specific. | `3` |
| `gitea.event.compare_url` | `push` | The URL comparing `before` with `after`. GitHub names this field `compare`. | `https://gitea.com/gitea/docs/compare/a1b2c3d...e5f6a1b` |
| `gitea.event.pusher.login` | `push` | The username of the user that pushed. | `silverwind` |
| `gitea.event.forkee.full_name` | `fork` | The owner and name of the new fork. | `silverwind/docs` |
| `gitea.event.page` | `gollum` | The name of the wiki page. | `Home` |
| `gitea.event.number` | `issues`, `pull_request`, `pull_request_target`, `pull_request_review`, `pull_request_review_comment` | The index of the issue or pull request. Not set for `issue_comment`, use `gitea.event.issue.number` there. | `386` |
| `gitea.event.issue.number``gitea.event.issue.title``gitea.event.issue.body``gitea.event.issue.state``gitea.event.issue.labels``gitea.event.issue.user.login` | `issues`, `issue_comment` | The issue the event happened on. | `Expand gitea.event in actions docs` |
| `gitea.event.comment.body` | `issue_comment` | The body of the comment. | `LGTM` |
| `gitea.event.is_pull` | `issue_comment` | Whether the comment was made on a pull request. Gitea-specific, GitHub sets `issue.pull_request` on the issue object instead. | `true` |
| `gitea.event.pull_request.number``gitea.event.pull_request.title``gitea.event.pull_request.body``gitea.event.pull_request.draft``gitea.event.pull_request.merged``gitea.event.pull_request.state``gitea.event.pull_request.labels``gitea.event.pull_request.user.login` | `pull_request`, `pull_request_target`, `pull_request_review`, `pull_request_review_comment` | The pull request the event happened on. | `Add caching to CI` |
| `gitea.event.pull_request.head.ref``gitea.event.pull_request.head.sha``gitea.event.pull_request.head.repo.full_name` | `pull_request`, `pull_request_target`, `pull_request_review`, `pull_request_review_comment` | The source branch of the pull request. | `feature-branch` |
| `gitea.event.pull_request.base.ref``gitea.event.pull_request.base.sha` | `pull_request`, `pull_request_target`, `pull_request_review`, `pull_request_review_comment` | The target branch of the pull request. | `main` |
| `gitea.event.review.type` | `pull_request_review`, `pull_request_review_comment` | The kind of review: `pull_request_review_approved`, `pull_request_review_rejected` or `pull_request_review_comment`. GitHub uses `review.state` with the values `approved`, `changes_requested` and `commented`. | `pull_request_review_approved` |
| `gitea.event.review.content` | `pull_request_review`, `pull_request_review_comment` | The body of the review. GitHub names this field `review.body`. | `Ship it` |
| `gitea.event.changes.title.from``gitea.event.changes.body.from` | `issues`, `issue_comment`, `pull_request` | The previous value. Only set when `action` is `edited`. | `Old title` |
| `gitea.event.release.tag_name``gitea.event.release.name``gitea.event.release.body``gitea.event.release.draft``gitea.event.release.prerelease` | `release` | The release the event happened on. | `v1.2.3` |
| `gitea.event.package.name``gitea.event.package.type``gitea.event.package.version` | `registry_package` | The package the event happened on. | `gitea` |
| `gitea.event.workflow_run.id``gitea.event.workflow_run.event``gitea.event.workflow_run.status``gitea.event.workflow_run.conclusion``gitea.event.workflow_run.head_branch``gitea.event.workflow_run.head_sha` | `workflow_run` | The workflow run that the event reports on. | `success` |

`schedule` runs have no webhook of their own. Their payload is the payload of the push that registered the schedule, with `schedule`, `repository`, `sender` and, for organization-owned repositories, `organization` filled in.
Only those fields are meaningful, and `sender.login` is always `gitea-actions`.

## User-defined variables

You can create configuration variables on the user, organization and repository level.
The level of the variable depends on where you created it. When creating a variable, the
key will be converted to uppercase. You need use uppercase on the yaml file.

### Naming conventions

The following rules apply to variable names:

- Variable names can only contain alphanumeric characters (`[a-z]`, `[A-Z]`, `[0-9]`) or underscores (`_`). Spaces are not allowed.
- Variable names must not start with the `GITHUB_` and `GITEA_` prefix.
- Variable names must not start with a number.
- Variable names are case-insensitive.
- Variable names must be unique at the level they are created at.
- Variable names must not start with `CI`.

### Using variables

After creating configuration variables, they will be automatically filled in the `vars` context.
They can be accessed through expressions like `${{ vars.VARIABLE_NAME }}` in the workflow.

### Precedence

If a variable with the same name exists at multiple levels, the variable at the lowest level takes precedence:
A repository variable will always be chosen over an organization/user variable.
