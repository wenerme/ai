# Composite identity

Learn how composite identity combines a service account and a human user into a single token to enable secure, traceable agent actions.

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/issues/554156) in GitLab 18.3 [with a feature flag](../../administration/feature_flags/_index.md) named `duo_workflow_use_composite_identity`, disabled by default.
- [Enabled by default](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/212618) in GitLab 18.6.
- [Generally available](https://gitlab.com/gitlab-org/gitlab/-/work_items/585273) in GitLab 18.8.
- Composite identity automatically included in GitLab Duo Agent Platform and setting to turn composite identity on or off [removed](https://gitlab.com/gitlab-org/gitlab/-/work_items/588629) in GitLab 18.9.
- Feature flag `duo_workflow_use_composite_identity` [removed](https://gitlab.com/gitlab-org/gitlab/-/issues/554199) in GitLab 19.3.

Composite identity is an authentication and authorization mechanism that combines two identities into a single token:

- A service account. The agent that performs the actual actions.
- A human user. The person who initiated the request.

Service accounts have a composite identity because a human user initiates the actions they perform.
The exception is [scheduled triggers](triggers/_index.md#scheduled-triggers), which run with no human user.

Composite identity is automatically included in GitLab Duo Agent Platform.

This dual-identity approach solves a critical challenge:
agents need to act with access that does not exceed the access of the user who triggered them, or the access that the service account was granted,
while maintaining a distinct identity that clearly shows the action was
performed by an agent, not directly by the human user.

## Why composite identity matters

The composite identity is important because it helps ensure:

- Traceability: All agent activities are clearly attributed to a service account,
  making it easy to identify automated actions in audit logs and commit histories.
- Security: The agent can perform actions that only the service account and
  the triggering user have access to do. This intersectional access prevents privilege escalation.
- Accountability: The human user's identity is embedded in the token, creating an audit trail
  that links agent actions back to the person who initiated them.

For example, when you ask an agent to create tests for your code,
the resulting commits will show they were created by the service account on your behalf.

## Where composite identity is used

Composite identity is used when flows and agents execute on runners. This list includes:

- Foundational flows.
- Custom flows.
- External agents.
- Any flow started through the endpoint `api/v4/ai/duo_workflows/workflows`.

Composite identity does not apply to:

- GitLab Duo Agentic Chat in the UI and IDE.
- Flows that a scheduled trigger runs. These flows run as a dedicated service account, and the role
  of that account is the only limit on what the flow can do. For more information, see
  [service account for scheduled triggers](triggers/_index.md#service-account-for-scheduled-triggers).

## How composite identity works

The token that authenticates requests is a composite of two identities:

- Primary author: The human user who started the agent or flow.
  The human user's `id` is included in the scopes of the token by using a [dynamic scope](https://github.com/doorkeeper-gem/doorkeeper/pull/1739).
- Secondary author: A [service account](../profile/service_accounts.md),
  which is the owner of the token and has the Developer role.

This composite identity ensures that any activities authored by the GitLab Duo Agent Platform are
attributed to the human user, while preventing
[privilege escalation](https://en.wikipedia.org/wiki/Privilege_escalation) by either the human user or the service account.

## Composite identity workflow

The composite identity is part of the workflow.

1. Create a flow in the AI Catalog.
   - No composite identity-related changes occur.
1. Enable the flow for a project.
   - A service account is created in the top-level group.
     For custom flows, the username is similar to `ai-<flow_name>-<top_level_group_name>`.
     For foundational flows, the username is similar to `duo-<flow_name>-<top_level_group_name>`.
   - The service account is added to the project with the Developer role.
     A foundational flow service account is added to
     [each project that has foundational flows turned on](flows/foundational_flows/_index.md#service-account-and-trigger-setup).
1. A user executes the flow.
   - The flow is executed by a one-time composite identity.
     This identity has a combination of the user's role and the service account's Developer role,
     whichever is more restrictive. So if the user is a Maintainer,
     but the service account is a Developer, the Developer role is used.
   - The flow has access to all projects that both:
     - The user has access to.
     - The service account has been added to.

     For example, if the service account has been added to other projects,
     and the user has access to those projects,
     the flow can access those projects even if the user has not used the flow there before.

     Some users can access every project in a group, like administrators or
     users with the Owner role for the top-level group.
     For these users, the projects the service account is a member of set the limit on what the flow can access.

## Investigate activity by a service account

Service account membership, sessions, and data access are separate signals.
To investigate whether a service account accessed project data, collect evidence for each signal.

### Membership

Membership shows that the service account is authorized to access a project,
not that the service account accessed the project.

- To check the service account's membership, [view the project members](../project/members/_index.md#view-project-members).
  Use the members list as the authoritative source, because not every foundational flow membership change creates an audit event.
- To check membership history, review the `member_created`, `member_destroyed`, and `duo_service_account_provisioned`
  [audit events](../compliance/audit_event_types.md).
- To check when flow triggers were created, changed, or deleted in a project, review the
  `flow_trigger_created`, `flow_trigger_updated`, and `flow_trigger_deleted` audit events.
  Like membership, these events show configuration changes, not flow runs.

### Session

A session shows that a flow used the service account, and which user the run is attributed to.

- Review the [sessions](sessions/_index.md) for the project, including the user for each session.
  Sessions are deleted after the [session retention period](sessions/_index.md#session-retention).
- Review the CI/CD job logs for each session.
  The logs show the commands the flow ran on the runner, including repository checkout.

### Data access

Data access shows which requests the composite identity made during a session.

- Review the `api_request_access_with_scope` audit events.
  These events record the method and path of REST API requests made with the `ai_workflows` token scope.
  These events cover REST API requests only, not GraphQL requests or Git operations like cloning the repository.
  These events are user-scoped, so they appear in
  [instance audit events](../../administration/compliance/audit_event_reports.md#instance-audit-events),
  not group or project audit events.
- Review the [AI audit events](../ai-governance/ai-audit-events.md).
  These events are available only if AI audit event storage was turned on before the session ran.
- Search the API logs for entries that include a `meta.scoped_user` field.
  This field is present only for requests made with a composite identity,
  and contains the user the session is attributed to.
  - On GitLab Self-Managed, search [`api_json.log`](../../administration/logs/_index.md#api_jsonlog).
  - On GitLab Dedicated, search the [application logs](../../administration/dedicated/monitor.md) in your Amazon S3 bucket.

## Token permissions for AI Catalog flows

AI Catalog flows use different token types with different permission scopes:

- OAuth tokens used for composite identity in AI workflows have access restricted to the `ai_workflows` and `mcp` scopes.
  This OAuth token is passed to the AI Gateway to run the flow.
- CI job tokens that are triggered as part of the flow have permissions further restricted by the
  [available job token permissions](../../ci/jobs/ci_job_token.md#job-token-access).

Because these are different token types with different scopes, the CI/CD job has different permissions than the OAuth token.

## Compliance considerations for merge requests

When a flow creates a merge request, the merge request is attributed to the human user who triggered the flow instead of the service account. This is done to adhere to compliance frameworks that require segregation of duties, including:

- SOC 2 (System and Organization Controls 2)
- SOX (Sarbanes-Oxley Act)
- ISO 27001 (Information Security Management)
- FedRAMP (Federal Risk and Authorization Management Program)

These frameworks typically require that a user cannot author code changes and approve those changes for production deployment.

### Understanding the attribution model

Even though the service account creates the commits and opens the merge request, the human user
is considered the author because:

- The human user directed the service account to create the changes.
- From a compliance perspective, prompting an AI system to write code is equivalent to writing the code yourself.
- The service account acts as a proxy for the human user's intent.

This attribution applies to authorship only. It does not determine [who is billed for usage](../../subscriptions/gitlab_credits.md#billing-subjects-for-credit-usage).
