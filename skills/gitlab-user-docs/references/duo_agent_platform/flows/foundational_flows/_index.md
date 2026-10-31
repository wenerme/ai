# Foundational flows

- Tier: Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

### Model information

- LLM: Anthropic [Claude Sonnet 4](https://www.anthropic.com/claude/sonnet)

Foundational flows are built and maintained by GitLab and display a GitLab-maintained badge ().

Each flow is designed to solve a specific problem or help you with a development task.

The following foundational flows are available:

| Flow | Description |
|------|-------------|
| [Agentic Breaking Change Resolution](../../../application_security/dependency_scanning/agentic-breaking-change-resolution.md) | Automatically resolve breaking changes in dependency bump merge requests. |
| [Code Review](code_review/_index.md) | Automate code review with AI-native analysis and feedback. |
| [Convert to GitLab CI/CD](../../../../ci/migration/convert_to_gitlab_ci.md) | Migrate Jenkins pipelines to CI/CD. |
| [Developer](../../../project/merge_requests/developer.md) | Convert issues into merge requests, or complete coding tasks in Agentic Chat or the GitLab Duo CLI. |
| [Fix CI/CD Pipeline](../../../../ci/pipelines/fix_pipeline.md) | Diagnose and repair failed jobs. |
| [Generate Workplan](../../../work_items/workplan.md) | Draft a workplan for a work item and add it to the **Workplan** widget. |
| [Recommend Reviewers](../../../project/merge_requests/reviews/automatic_reviewer_assignment.md#recommend-reviewers-flow) | Recommend the reviewers best suited to review a merge request. |
| [SAST False Positive Detection](../../../application_security/vulnerabilities/false_positive_detection.md) | Automatically identify and filter false positives in SAST findings. |
| [Resolve SAST Vulnerability](../../../application_security/vulnerabilities/agentic_vulnerability_resolution.md) | Automatically generate merge requests to resolve SAST vulnerabilities. Ultimate only. |
| [Secret False Positive Detection](secret_false_positive_detection.md) | Automatically identify and filter false positives in secret detection findings. |
| [Security Review](../../../application_security/security_review.md) | Detect business logic security vulnerabilities in merge request changes. |
| [Software Development](../../../../editor_extensions/software_development.md) | In your IDE, create and work through a plan for a coding task. |
| [Vulnerability Context Flow](../../../application_security/vulnerabilities/vulnerability_context_flow.md) | Generate security context for a project to help prioritize vulnerabilities. |

## Choose a flow for coding tasks

The Developer Flow and the Software Development Flow both write code.
Which one runs depends on where you start the task.

For most coding tasks, use the Developer Flow in the GitLab UI or the GitLab Duo CLI.

| Where you start | Flow | Where it runs | What happens |
|-----------------|------|---------------|--------------|
| GitLab UI | Developer Flow | On a runner | The flow runs in the background, then creates or updates a merge request for you to review. |
| [Agentic Chat](../../../gitlab_duo_chat/agentic_chat.md#foundational-flows) in the GitLab UI | Developer Flow | On a runner | Chat starts the flow as a separate session. Chat tool approvals do not apply to the flow. |
| [GitLab Duo CLI](../../../gitlab_duo_cli/_index.md) | Developer Flow | Where you run the CLI, usually your computer | In interactive mode, you work with the flow in your terminal and [approve tool calls](../../../gitlab_duo_cli/use.md#tool-approvals) unless you use auto mode. |
| **Flows** tab in VS Code, Visual Studio, or JetBrains | Software Development Flow | Your IDE | The flow creates a plan for you to review, then works through it and stages changes for you to accept or reject. |

In the GitLab UI, the Developer Flow starts when you:

- Assign the flow to an issue.
- Mention `@duo-developer-<namespace>`.
- Select **Implement**.
- Change a work item status.

Some foundational flows use triggers that you can create or manage.
For more information, see [foundational flow triggers](../../triggers/_index.md#foundational-flow-triggers).

## For developers

To learn how to create and add new foundational flows to GitLab, see the [foundational flows development guide](../../../../development/ai_features/foundational_flows.md).

## Configure flow execution CI/CD details

You can configure the environment where flows use CI/CD to execute.

For example, on GitLab Self-Managed, administrators can configure a custom container registry
for foundational flow images.

For more information, see [Configure flow execution](../execution/_index.md).

## Security for foundational flows

In the GitLab UI, foundational flows have access to the following GitLab APIs:

- [Projects API](../../../../api/projects.md)
- [Issues API](../../../../api/issues.md)
- [Merge Requests API](../../../../api/merge_requests.md)
- [Repository Files API](../../../../api/repository_files.md)
- [Branches API](../../../../api/branches.md)
- [Commits API](../../../../api/commits.md)
- [CI Pipelines API](../../../../api/pipelines.md)
- [Labels API](../../../../api/labels.md)
- [Epics API](../../../../api/epics.md)
- [Notes API](../../../../api/notes.md)
- [Search API](../../../../api/search.md)

### Service accounts

Foundational flows use a service account to complete tasks.
For more information, see [composite identity workflow](../../composite_identity.md#composite-identity-workflow).

When a foundational flow creates a merge request, the merge request is attributed to the human user who triggered the flow instead of the service account.
This is done to adhere to compliance frameworks that require segregation of duties. See [compliance considerations](../../composite_identity.md#compliance-considerations-for-merge-requests).

This attribution does not determine [who is billed for usage](../../../../subscriptions/gitlab_credits.md#billing-subjects-for-credit-usage).

#### Service account and trigger setup

When you turn on a foundational flow, GitLab completes the following actions:

- Creates a service account for the flow in the top-level group.
  The username is similar to `duo-<flow_name>-<top_level_group_name>`.
- Adds the service account with the Developer role as a direct member of each project
  in the group that has foundational flows turned on.
- Creates the triggers for the flow in each of those projects, if the flow has triggers.

GitLab completes these steps in background jobs, so changes to a large group can take time to reach every project.

When you turn on a foundational flow, it does not scan, index, or read any repository or project.
The service account acts only when a flow runs, and each session is attributed to a user.

#### Events that start a foundational flow

A foundational flow runs when the following events occur:

- A user performs an action that matches a [trigger](../../triggers/_index.md) for the flow. For example, the user mentions the service account or assigns the service account as a reviewer.
  For actions that can't start a flow, see [actions that don't initiate a trigger](../../triggers/_index.md#actions-that-dont-initiate-a-trigger).
- A user starts the flow from an issue, a merge request, or a pipeline.
- An event in the project starts the flow automatically. For example:
  - The SAST False Positive Detection and Secret False Positive Detection flows run
    after security scans, on behalf of the author of the vulnerability.
  - The Agentic Breaking Change Resolution flow runs when a pipeline fails for a dependency update merge request.
    The run is attributed to the user who turned on breaking change resolution for the project.

Each run creates a [session](../../sessions/_index.md) and uses a
[composite identity](../../composite_identity.md) of the user and the service account.

## Turn foundational flows on or off

You can turn foundational flows on or off:

- On GitLab.com: For top-level groups and projects.
- On GitLab Self-Managed: For instances, groups, and projects.

You can also turn flow execution on or off to control whether
features that consume compute minutes can run in the GitLab UI.
These features include external agents, foundational flows, and custom flows.

These settings control the flows that run in GitLab, for example a flow you start
from an issue or a merge request.

These settings do not control a flow that you run yourself, either in an IDE or in a
[GitLab Duo CLI](../../../gitlab_duo_cli/_index.md) session. In those sessions, you can run
a foundational flow when:

- [GitLab Duo Agent Platform is available](../../turn_on_off.md) for the project or group.
- The flow is available for your subscription tier. Beta flows also require
  [experiment and beta features](../../turn_on_off.md#turn-on-beta-and-experimental-features)
  to be turned on.

For example, if you turn off a foundational flow, you can no longer run that flow in GitLab,
but users can still run it in an IDE or a GitLab Duo CLI session.

### On GitLab.com

### For a top-level group

Prerequisites:

- The Owner role for the top-level group.

1. In the top bar, select **Search or go to** and find your top-level group.
1. Select **Settings** > **GitLab Duo**.
1. Select **Change configuration**.
1. Under **Flow execution**, select the **Allow flow execution** and **Allow foundational flows** checkboxes.
1. Select the checkbox for each foundational flow you want to turn on.
1. Select **Save changes**.

When you turn off foundational flows for a top-level group, users with that group as
their default GitLab Duo namespace cannot access foundational flows in any namespace.

### For a project

Prerequisites:

- The Maintainer or Owner role for the project.
- Flow execution and foundational flows turned on for the top-level group.

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **Settings > General**.
1. Expand **GitLab Duo**.
1. Turn on the **GitLab Duo**, **Allow flow execution**, and **Allow foundational flows** toggles.
1. Select **Save changes**.

### On GitLab Self-Managed

- Full image reference for image registry [introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/594208) in GitLab 19.0.
- Registry path prefix for image registry [introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/630865) in GitLab 19.5.

### For an instance

Prerequisites:

- Administrator access.

1. In the upper-right corner, select **Admin**.
1. In the left sidebar, select **GitLab Duo**.
1. Select **Change configuration**.
1. Under **Flow execution**, select the **Allow flow execution** and **Allow foundational flows** checkboxes.
1. Optional. In the **Image registry** text box, enter one of the following:

   - A registry hostname to use the default image from that registry (for example, `registry.example.com`).
   - A registry path prefix that ends in `/` to use the default image from that path, such as a proxy cache project (for example, `harbor.example.com/proxy/`).
   - A full image reference to override the image entirely (for example, `registry.example.com/group/project/image:tag`).
     Any other value that includes a path is used as a full image reference.

   Leave blank to use the default `registry.gitlab.com`.
1. Select **Save changes**.

### For a group

Prerequisites:

- The Maintainer or Owner role for the group.
- Flow execution and foundational flows turned on for the instance.

1. In the top bar, select **Search or go to** and find your group.
1. In the left sidebar, select **Settings** > **General**.
1. Expand **GitLab Duo features**.
1. Under **Flow execution**, select the **Allow flow execution** and **Allow foundational flows** checkboxes.
1. For top-level groups only, select the checkbox for each foundational flow you want to turn on.
1. Select **Save changes**.

When turned on for the group, foundational flows are available to all subgroups and projects.

### For a project

Prerequisites:

- The Maintainer or Owner role for the project.
- Flow execution and foundational flows turned on for the instance and group.

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **Settings > General**.
1. Expand **GitLab Duo**.
1. Turn on the **GitLab Duo**, **Allow flow execution**, and **Allow foundational flows** toggles.
1. Select **Save changes**.

### Effects of turning off a foundational flow

When you turn off a foundational flow for a group or project:

- GitLab deletes the triggers for the flow.
  Mentions, assignments, and other trigger events no longer start the flow.
- The service account might remain a member of projects.
  For more information, see [service account remains a project member](../../troubleshooting.md#service-account-remains-a-project-member-after-foundational-flows-are-turned-off).

To check whether a flow accessed a project, see
[investigate activity by a service account](../../composite_identity.md#investigate-activity-by-a-service-account).
