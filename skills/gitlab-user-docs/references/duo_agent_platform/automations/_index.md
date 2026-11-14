# Automations

Create and manage automations to control when flows run in your project.

- Tier: Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

- Introduced in GitLab 18.3 as an [experiment](../../../policy/development_stages_support.md#experiment) [with a feature flag](../../../administration/feature_flags/_index.md) named `ai_flow_triggers`. Enabled by default.
- [Generally available](https://gitlab.com/gitlab-org/gitlab/-/work_items/585273) in GitLab 18.8.
- Feature flag `ai_flow_triggers` [removed](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/239280) in GitLab 19.1.
- [Renamed](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/260755) from triggers to automations in GitLab 19.6 [with a flag](../../../administration/feature_flags/_index.md) named `duo_automations`. Enabled by default.

> [!flag]
> The availability of this feature is controlled by a feature flag.
> For more information, see the history.

An automation determines when a flow or external agent runs.
An automation cannot be created for a custom agent or foundational agent.

An automation is one of two kinds:

- An [event-based automation](#event-based-automations) runs a flow when something happens in the project,
  for example when someone mentions the service account or a pipeline fails.
- A [scheduled automation](#scheduled-automations) runs a flow at a recurring time,
  for example every weekday at 9:00 AM.

| Detail | Event-based automation | Scheduled automation |
|--------|---------------|-------------------|
| What starts the run | An action by a person, such as a mention or an approval | The schedule. No person starts the run. |
| Who the flow runs as | The service account of the flow, with [composite identity](../composite_identity.md) | A [dedicated service account](#service-account-for-scheduled-automations), without composite identity |
| What the flow receives | For a mention, the comment. For other events, the web address of the merge request, work item, or project. | The web address of the project |

To run the same flow on an event and on a schedule, create two automations.

## View automations

- [Changed](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/263979) in GitLab 19.6 to allow the Developer role to view triggers.

Prerequisites:

- You must have at least the Developer role for the project.

To view the automations for a project:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **AI** > **Automations**.

## Event-based automations

An event-based automation runs a flow when one of its conditions occurs, for example when someone assigns
the service account as a reviewer.
An automation can have several event conditions.

### Create an event-based automation

- **Configuration path** option [changed](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/217634) in GitLab 18.9 to require a [flag](../../../administration/feature_flags/_index.md) named `ai_catalog_create_third_party_flows`. Disabled by default.
- **Merge request ready** and **Merge request code conflict** event types [consolidated](https://gitlab.com/gitlab-org/gitlab/-/work_items/602777) into the **Merge request** event type as the **Marked ready** and **Merge conflict** actions in GitLab 19.2.
- Trigger creation form [changed](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/248807) to add conditions one at a time in GitLab 19.3.

> [!flag]
> The availability of the **Configuration path** option is controlled by a feature flag.
> For more information, see the history.

Prerequisites:

- You must have the Maintainer or Owner role for the project.

To create an automation:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **AI** > **Automations**.
1. Select **New automation**.
1. In **Name**, enter a name for the automation.
1. From the **Runs with** dropdown list, select one of the following:
   - A flow or external agent enabled in the project. If the Developer Flow is enabled,
     it is selected by default.
   - **Configuration file**. Then, in **Configuration path**, enter the path to the flow
     configuration file (for example, `.gitlab/duo/flows/claude.yaml`). From the
     **Service account** dropdown list, select a user to be [the composite identity](../composite_identity.md).
     To view this option, the `ai_catalog_create_third_party_flows` flag must be enabled.
1. If the **Instructions** field is shown, enter what the flow must do.
   For the Developer Flow, instructions are required. For more information, see
   [Add instructions](#add-instructions).
1. Under **Runs when**, if a schedule is open, select **Cancel**.
   A new automation starts with a schedule when the flow can run on a schedule.
1. For each event that should start the automation:
   1. Select **Add trigger** > **On an event**.
   1. From the **Select an event** dropdown list, select an [event type](#event-types).
   1. If the event type has actions, from the **Run when** dropdown list, select one or
      more actions.
   1. Select **Add event**.
1. Select **Create**.

The automation now appears in **AI** > **Automations**.

#### Event types

| Name            | Description                                                                           | Configuration | Introduced in |
|-----------------|---------------------------------------------------------------------------------------|------|------|
| Mention         | When the service account user is mentioned in a comment on an issue or merge request. | None | GitLab 18.3 |
| Assign          | When the service account user is assigned to an issue or merge request.               | None | GitLab [18.5](https://gitlab.com/gitlab-org/gitlab/-/issues/567787) |
| Assign reviewer | When the service account user is assigned as a reviewer to a merge request.           | None | GitLab [18.5](https://gitlab.com/gitlab-org/gitlab/-/issues/567787) |
| Pipeline events | When a pipeline changes state.                                                        | From the **Run when** dropdown list, select one or more of the following:- **Running**- **Passed**- **Failed**- **Canceled** | GitLab [18.9](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/212797) as an [experiment](../../../policy/development_stages_support.md#experiment). [Generally available](https://gitlab.com/gitlab-org/gitlab/-/work_items/587272) in GitLab 19.1. |
| Merge request   | When a selected merge request action occurs.                                          | From the **Run when** dropdown list, select one of the following:- **Approved**: When a merge request has all required approvals. Introduced in GitLab 19.1.- **Created**: When someone creates a merge request, draft or ready, and GitLab generates its diff. GitLab syncs code owner approval rules against that diff before the flow runs, unless the merge request joins a merge train or GitLab cannot reload the diff. Introduced in GitLab [19.4](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/242698).- **Marked ready**: When a draft merge request is marked as ready for review. Introduced in GitLab [19.0](https://gitlab.com/gitlab-org/gitlab/-/work_items/592454).- **Merge conflict**: When a merge request can no longer be merged due to a code conflict. Introduced in GitLab [19.1](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/234044).- **Merged**: When a merge request merges. The flow runs only when a [Developer Flow](../../project/merge_requests/developer.md) session created the merge request or ran on it. An automation that runs the Developer Flow does not start a session on this action. For the user that the flow acts for, see [actions that don't initiate an automation](#actions-that-dont-initiate-an-automation). Introduced in GitLab [19.6](https://gitlab.com/gitlab-org/gitlab/-/work_items/608484). | GitLab [19.1](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/237081) |
| Work item       | When a selected work item action occurs.                                              | From the **Run when** dropdown list, select one of the following:- **Created**: When a work item is created. Introduced in GitLab 19.1.- **Status changed**: When a work item's status changes. When **Status changed** is the only selected action, you can select one or more statuses to run the flow only when the work item changes to one of them. Introduced in GitLab [19.2](https://gitlab.com/gitlab-org/gitlab/-/work_items/599983). Status selection introduced in GitLab [19.5](https://gitlab.com/gitlab-org/gitlab/-/work_items/607577).For both actions, from the **Type** dropdown list, you can select work item types to run the flow only for those types. When you select types, the **Status** dropdown list shows only the statuses of those types. If the selected types do not use a selected status, the list shows that status in a separate group, so that you can clear it. When you select no type, the same applies to a status that no type uses. Type selection introduced in GitLab [19.6](https://gitlab.com/gitlab-org/gitlab/-/work_items/633870). | GitLab [19.1](https://gitlab.com/gitlab-org/gitlab/-/work_items/599985) |

#### Work item type IDs

In the GraphQL API, the `filter` argument of the `aiFlowTriggerCreate` and `aiFlowTriggerUpdate`
mutations sets the work item type filter with a `work_item_type_id` rule.
The rule uses the `in` operator to run the flow only for the listed types,
or the `not_in` operator to run the flow for all other types.
The value is a list of work item type IDs.
The IDs are integers, for example `5`.
GitLab rejects a string such as `"5"`.
For example, this filter runs the flow only when the status of a task changes to `In dev`:

```json
{
  "work_item": {
    "rules": [
      { "field": "action", "operator": "in", "value": ["status_changed"] },
      { "field": "status.name", "operator": "in", "value": ["In dev"] },
      { "field": "work_item_type_id", "operator": "in", "value": [5] }
    ]
  }
}
```

The default work item types have the same ID on every GitLab instance:

| Work item type | ID  |
|----------------|-----|
| Issue          | `1` |
| Incident       | `2` |
| Test Case      | `3` |
| Requirement    | `4` |
| Task           | `5` |
| Objective      | `6` |
| Key Result     | `7` |
| Epic           | `8` |
| Ticket         | `9` |

Custom work item types have other IDs.
To find the ID of a type, query the `workItemTypes` field of the project.
The ID is the number at the end of the `id` of the type.

The automation form shows and changes only `in` rules.
For a `not_in` rule, the **Type** dropdown list shows **Any type**, and the form keeps the rule.
If you change the types in the form, the form replaces the `not_in` rule.

### Automations for foundational flows

An automation runs only when its foundational flow is turned on for your group or project. For more information, see [turn foundational flows on or off](../flows/foundational_flows/_index.md#turn-foundational-flows-on-or-off).

Foundational flows can start in the following ways:

- Default automations that GitLab adds when you turn on the flow.
- Automations that you create for events the flow supports.
- Another way, such as when a security scan finishes.
  These flows don't use automations, so you don't see them listed in **AI** > **Automations**.

For details about how to start each flow, see the individual
[foundational flow documentation](../flows/foundational_flows/_index.md).

### Change the work item when the session finishes

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/633112) in GitLab 19.6 [with flags](../../../administration/feature_flags/_index.md) named `dap_software_factory` and `ai_flow_trigger_chaining`. Disabled by default.

> [!flag]
> The availability of this feature is controlled by feature flags.
> For more information, see the history.

An automation can change a work item after the session that the automation started finishes.
Use this to move a work item to the next stage of your process, with no human action between
the stages.

You can set one or both of these settings:

- **Set work item status**: GitLab sets the work item to this status.
- **Mark merge requests as ready**: GitLab marks the draft merge requests that the session created
  as ready.
  If [automatic reviews](../flows/foundational_flows/code_review/_index.md#automatic-reviews)
  are on, GitLab then adds GitLab Duo Code Review as a reviewer.

If you set both, GitLab marks the merge requests as ready first.
If a merge request stays a draft, GitLab does not set the status.

Prerequisites:

- You must have the Maintainer or Owner role for the project.
- The automation must have a **Work item** condition with **Status changed** as its only action,
  and at least one status.
  Until the condition meets these requirements, the settings are not available.

To change the work item when the session finishes:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **AI** > **Automations**.
1. For the automation you want to change, select **More actions** () > **Edit automation**.
1. In the **Conditions** section, for the **Work item** condition, select **Edit event** ().
1. From the **Run when** dropdown list, select only **Status changed**.
1. From the **Status** dropdown list, select one or more statuses, then select **Save**.
1. Under **When the session finishes**, set one or both:
   - From the **Set work item status** dropdown list, select a status.
   - Select the **Mark merge requests as ready** checkbox.
1. Select **Save changes**.

If you later add the **Created** action, remove the last status, or remove the **Work item** condition, GitLab clears the settings.
If you change the types so that they do not have the status of **Set work item status**,
GitLab clears that status.

#### When GitLab applies the settings

GitLab applies the settings only when all of these conditions are true:

- The session has the `finished` status.
  A stopped session, a failed session, or a session that waits for input changes nothing.
- The automation is turned on.
- A work item event started the session.
- A human user started this session, or the first session of its [chain](#chain-automations),
  in one of these ways:
  - With a **Mention**, **Assign**, or **Work item** event.
  - In a session with a GitLab Duo agent, such as a GitLab Duo Agentic Chat session.
    For example, the user [triggers a flow with a slash command](../../gitlab_duo_chat/agentic_chat.md#trigger-a-flow-with-a-slash-command).
- The work item still has one of the statuses of the automation.
  If the status changes to a status that the automation does not run on while the session runs,
  GitLab changes nothing.
  This also applies when the flow sets the status of its own work item.
- The service account of the session enforces composite identity.
- The service account and the user who started the session can both update the work item
  and the merge requests.

GitLab does not set a status that the work item type does not have.

#### Chain automations

GitLab writes the changes as the composite identity of the session.
For this reason, GitLab treats the status change as an event that a flow caused.
The status change can start another automation that runs on the new status.
The finished session becomes the parent of the next session, inside the chain depth and
breadth limits.

> [!warning]
> Do not configure automations whose statuses form a cycle. For example, automation A runs on status X
> and sets status Y, and automation B runs on status Y and sets status X.
> The chain limits stop a cycle, but each session in the cycle still runs.

To keep a human decision between two stages, set the status to one that no automation runs on,
for example `Plan ready`.
A user then moves the work item to the status that starts the next stage.

The following table shows two automations that move a work item through three statuses with no
human action between the stages.

| Automation | Runs when the status changes to | Flow | Set work item status | Mark merge requests as ready |
|---------|---------------------------------|------|----------------------|------------------------------|
| A | `Planning` | Generate Workplan | `Ready for development` | No |
| B | `Ready for development` | GitLab Duo Developer | `In review` | Yes |

#### Known issues

- A session can finish without the work done. For example, GitLab Duo Developer can decide
  that no code change is necessary and open no merge request. GitLab still sets the status.
  If your flow can stop early, make it end as failed or as waiting for input.
  GitLab then does not set the status.
- If the status that the automation sets is also one of the statuses that the automation runs on,
  the change can start the automation again. The form shows a warning for this configuration.

### Actions that don't initiate an automation

All event types require a human user to perform the triggering action.
A non-human user such as a bot user, service account user, or another flow, cannot activate an automation.

This restriction applies to all [event types](#event-types).
For example, a flow cannot trigger another flow by mentioning the service account in a comment.
The status change from the settings of an automation is an exception.
For more information, see [chain automations](#chain-automations).

The **Merged** action of the **Merge request** event type is also an exception.
The automation checks the author of the merge request, not the user who merges.
For a merge request that a flow creates, the author is the human user of the
[composite identity](../composite_identity.md).
For example:

- When a bot user or a service account user merges a merge request that a human user authored, the automation runs.
- When a flow merges the merge request, the automation does not run, even when a human user authored it.
- When a non-human user authored the merge request, the automation does not run.

An automation with the **Work item** event type and the **Created** action also does not run when:

- The work item is imported from another GitLab instance or another tool, such as GitHub or Jira.
- The work item is created from an email to [Service Desk](../../project/service_desk/_index.md).

## Scheduled automations

- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated
- Status: Beta

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/594180) in GitLab 19.4 as a [beta](../../../policy/development_stages_support.md#beta) [with flags](../../../administration/feature_flags/_index.md) named `ai_flow_schedules` and `autonomous_service_account_execution`. Disabled by default.
- Setting to turn off scheduled automations [introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/634139) in GitLab 19.6.
- Requirement for experiment and beta features [added](https://gitlab.com/gitlab-org/gitlab/-/work_items/634138) in GitLab 19.6.
- [Enabled on GitLab.com, GitLab Self-Managed, and GitLab Dedicated](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/270414) in GitLab 19.6.

> [!flag]
> The availability of this feature is controlled by feature flags.
> For more information, see the history.

A scheduled automation runs a flow at a recurring time.
Use a scheduled automation for work that does not start from an event, such as a weekly
summary of stale issues.
The flow receives no merge request or work item, so use [instructions](#add-instructions)
to tell the flow what to do on each run.

> [!disclaimer]

Scheduled automations have these limits:

- A scheduled automation has one schedule.
- You can create scheduled automations only in projects, not in groups.
- By default, a project can have up to 100 scheduled automations.

### Service account for scheduled automations

When you create a scheduled automation, GitLab creates a service account for that automation only.
The account name starts with `Duo Scheduled`, followed by the project path and the
automation description.
GitLab adds the account to the project with the same role as the service account of the flow.
GitLab does not assign the Owner role to the account, and a run fails if the account has it.

A scheduled run does not use [composite identity](../composite_identity.md), so the role of
the service account is the only limit on what the flow can do.
GitLab adds the service account to the project where you create the automation.
A scheduled run can access another project only if someone adds the service account to that project as well.
For more information, see [security threats in GitLab Duo Agent Platform](../security_threats.md).

The role of the account follows the role of the service account of the flow:

- Before each run, if the flow account has a lower role, GitLab lowers the role of the
  automation account to match. If GitLab cannot lower the role, the run fails.
- If the flow account has a higher role, GitLab raises the role of the automation account only
  when someone who can assign that role edits the automation.

### Create a scheduled automation

Prerequisites:

- You must have the Maintainer or Owner role for the project.
- Your role for the project must be equal to or higher than the role of the service account
  of the flow.
- You must have permission to [create service accounts](../../profile/service_accounts.md#create-a-service-account)
  and to add members to the project.
- The project must belong to a group, and the group must not prevent adding members to projects.
- [Experiment and beta features](../turn_on_off.md#turn-on-beta-and-experimental-features)
  must be turned on.
- Scheduled automations must be [turned on](#turn-scheduled-automations-on-or-off) for the project, group, or instance.
- A custom flow from the AI Catalog or the [Developer Flow](../../project/merge_requests/developer.md)
  must be enabled in the project.
  Other foundational flows, external agents, and flows that use a configuration file
  cannot run on a schedule.

To change the flow of an existing scheduled automation:

- Your role for the project must be equal to or higher than the role of the automation's service account.
- You must have permission to add members to the project.
- The new flow must be a custom flow from the AI Catalog or the Developer Flow.

You do not need these permissions to change the schedule, name, or instructions.

To create a scheduled automation:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **AI** > **Automations**.
1. Select **New automation**.
1. In **Name**, enter a name for the automation.
1. From the **Runs with** dropdown list, select the flow.
1. If the **Instructions** field is shown, enter what the flow must do on each run.
   For the Developer Flow, instructions are required.
1. Under **Runs when**, a new automation starts with a weekly schedule, with a day and time
   already selected. If no schedule is open, select **Add trigger** > **On a schedule**.
1. From the frequency dropdown list, select how often the flow runs.
   Depending on the frequency, select when the flow runs:

   | Frequency        | What you select |
   |------------------|-----------------|
   | Every 15 minutes | None |
   | Every 30 minutes | None |
   | Hourly           | The minute past the hour. |
   | Daily            | The hour and minute. |
   | Weekdays         | The hour and minute, Monday through Friday. |
   | Weekly           | The day of the week, hour, and minute. |
   | Monthly          | The day of the month, from 1 to 28, and the hour and minute. |

   Hours use the 24-hour clock. Minutes are in 15-minute steps.
1. Optional. For frequencies other than every 15 or 30 minutes, to change the time zone,
   select **Change**, then select a time zone.
   The default is the time zone of your profile, or of your browser if your profile has none.
1. Select **Add schedule**.
1. Select **Create**.

The flow might run a few minutes after the scheduled time, because GitLab spreads scheduled
runs to distribute load.

### When a scheduled run fails

When a scheduled run fails, GitLab emails the users with the Owner or Maintainer role for the project.
If the project has no users with these roles, GitLab emails the users with the Owner or Maintainer role for the group.
A run fails if, for example, the service account is missing from the project, is inactive,
has the Owner role, or has a role that GitLab cannot lower to match the flow.

After three consecutive failures, GitLab deactivates the schedule and sends a deactivation
email instead of a failure email.
A successful run resets the count.

GitLab skips a scheduled run, and does not count a failure, when:

- The automation is turned off.
- Experiment and beta features are turned off for the group or instance.
- Scheduled automations are turned off for the project, group, or instance.
- Flow execution is turned off.
- The namespace has no GitLab Credits left.
- The project is archived or scheduled for deletion.

To resume a deactivated schedule, fix the cause in the email, then set `active` to `true` with the
[`aiFlowScheduleUpdate`](../../../api/graphql/reference/mutations.md#aiflowscheduleupdate)
GraphQL mutation.
To get the ID of the schedule, query the `flowSchedules` field of the automation.
Reactivation does not reset the failure count, so one more failed run deactivates the
schedule again.
The automation toggle does not reactivate a schedule. After GitLab deactivates the schedule,
the automation stays turned on, but the flow does not run.

### Turn scheduled automations on or off

Scheduled automations are turned on by default.
When you turn off scheduled automations, existing schedules stop running but GitLab keeps them.
Runs that are in progress continue.
You cannot add a schedule to an automation while scheduled automations are turned off.
When you turn scheduled automations back on, schedules resume at their next scheduled time.
GitLab does not make up the runs that it skipped.

To turn scheduled automations on or off, flow execution must be turned on.
When scheduled automations are turned off for a group or the instance, subgroups and projects cannot turn them on.

### On GitLab.com

Prerequisites:

- For a top-level group, the Owner role for the group.
- For a project, the Maintainer or Owner role for the project.

To turn scheduled automations on or off for a top-level group:

1. In the top bar, select **Search or go to** and find your top-level group.
1. In the left sidebar, select **Settings** > **GitLab Duo**.
1. Select **Change configuration**.
1. Under **Flow execution**, select or clear the **Allow scheduled automations** checkbox.
1. Select **Save changes**.

The setting applies to the subgroups and projects of the group.

To turn scheduled automations on or off for a project:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **Settings** > **General**.
1. Expand **GitLab Duo**.
1. Turn on or turn off the **Allow scheduled automations** toggle.
1. Select **Save changes**.

### On GitLab Self-Managed

Prerequisites:

- For the instance, administrator access.
- For a group, the Owner role for the group.
- For a project, the Maintainer or Owner role for the project.

To turn scheduled automations on or off for the instance:

1. In the upper-right corner, select **Admin**.
1. In the left sidebar, select **GitLab Duo**.
1. Select **Change configuration**.
1. Under **Flow execution**, select or clear the **Allow scheduled automations** checkbox.
1. Select **Save changes**.

To turn scheduled automations on or off for a group:

1. In the top bar, select **Search or go to** and find your group.
1. In the left sidebar, select **Settings** > **General**.
1. Expand **GitLab Duo features**.
1. Under **Flow execution**, select or clear the **Allow scheduled automations** checkbox.
1. Select **Save changes**.

The setting applies to the subgroups and projects of the group.

To turn scheduled automations on or off for a project:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **Settings** > **General**.
1. Expand **GitLab Duo**.
1. Turn on or turn off the **Allow scheduled automations** toggle.
1. Select **Save changes**.

## Add instructions

- Instructions for each condition [introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/627896) in GitLab 19.5 [with a flag](../../../administration/feature_flags/_index.md) named `ai_flow_trigger_goals`. Disabled by default.

> [!flag]
> The availability of this feature is controlled by a feature flag.
> For more information, see the history.

Instructions are text that tells the flow what to do when the automation runs.
An automation has one set of instructions, which applies to every event and schedule
in the automation. To run the same flow with different instructions, create another automation.

Prerequisites:

- You must have the Maintainer or Owner role for the project.
- The automation must run a custom flow, an external agent, the Developer Flow,
  or a configuration file. For other flows, the **Instructions** field does not appear.
  For the Developer Flow, instructions are required.

To add instructions to an existing automation:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **AI** > **Automations**.
1. For the automation you want to change, select **More actions** () > **Edit automation**.
1. In the **Instructions** field, enter the instructions. Use 4096 characters or fewer.
1. Select **Save changes**.

You can also add instructions when you [create an event-based automation](#create-an-event-based-automation),
[create a scheduled automation](#create-a-scheduled-automation), or
[enable a flow](../flows/custom.md#enable-a-flow).

### Write instructions

The instructions go in front of the information that the event supplies. The instructions never
replace that information. Do not repeat that information in the instructions.

The flow also receives:

- For a mention event, the comment that the person wrote.
- For every other event, a short context block. The block gives the web address of the merge
  request, work item, or project. The block also gives the action that occurred.
- For a schedule, a context block with the web address of the project.

> [!warning]
> The flow runs with the permissions of the service account. No person is present to answer
> questions from the flow. Write the instructions so that the flow can complete them alone.

To write instructions that get the result you want:

- Give the flow one clear task.
- Do not name the resource. The context block already names it.
- Give all the details that the flow needs. The flow cannot ask you for more.
- Say what the output must look like. For example, give the format or the maximum length.
- Ask only for work that the service account has permission to do.

The following table shows example instructions.

| Condition | Instructions |
|-----------|--------------|
| Mention | `Answer the question in a comment. Keep the reply under 200 words.` |
| Merge request, **Created** action | `Review the code changes and list any missing tests in a comment.` |
| Work item, **Created** action | `Add a severity label and a test plan.` |
| Schedule, **Weekly** | `List the open issues with no activity in the last 30 days in a new issue.` |

## Edit an automation

Prerequisites:

- You must have the Maintainer or Owner role for the project.

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **AI** > **Automations**.
1. For the automation you want to change, select **More actions** () > **Edit automation**.
1. Make the changes and select **Save changes**.

You can also edit a custom flow's automation on its configuration page, under **Trigger conditions**.

## Turn an automation on or off

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/598439) in GitLab 19.4.

Turn off an automation to disable it and retain its configuration. After you turn an automation off,
it stops running automatically after its configured actions, and remains in the list of automations.

Prerequisites:

- You must have the Maintainer or Owner role for the project.

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **AI** > **Automations**.
1. For the automation you want to turn on or off, on the right side, select the toggle.

You can also turn a custom flow's automation on or off on its configuration page, under **Trigger conditions**.

## Delete an automation

Prerequisites:

- You must have the Maintainer or Owner role for the project.

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **AI** > **Automations**.
1. For the automation you want to delete, select **More actions** () > **Delete automation**.
1. On the confirmation dialog, select **OK**.

You can also delete a custom flow's automation on its configuration page, under **Trigger conditions**.

## GitLab Credits consumption for triggered flows

A flow started by an automation runs as a service account.
The flow's usage is billed to the namespace, not to the user who performed the triggering action.

For example, an automation runs a flow when a merge request receives all required approvals,
and the merge request requires three approvals. When the third approver approves the merge request,
the automation runs the flow as the configured service account, and the usage is billed
to the namespace rather than to the third approver.

This billing applies to every event type, including a pipeline state change,
a work item status change, a mention, or a schedule.

For more information, see [billing subjects for credit usage](../../../subscriptions/gitlab_credits.md#billing-subjects-for-credit-usage).

## Troubleshooting

### Error: `Event types contains event types not supported`

When you create or edit an automation for a foundational flow, you might get this error:

```plaintext
Event types contains event types not supported by this foundational flow
```

The automation includes an event type that the flow does not accept.
To resolve this error, check the flow's documentation for the events it supports, then do one of the following:

- If the flow uses automations, edit the automation to remove the events the flow
  does not support. For example, Fix CI/CD Pipeline accepts only Pipeline events.
- If the flow starts another way, delete the automation because the flow doesn't need one.
  For example, [SAST False Positive Detection](../../application_security/vulnerabilities/false_positive_detection.md)
  runs after a security scan.

### Service account shows `No triggers for this event`

When you assign a service account to a merge request or request a review from it,
the service account might be disabled with the message `No triggers for this event`.
In mention autocomplete, a service account without an automation for the **Mention** event doesn't appear.
In each case, the project has no automation for that service account and event:

- The assignee menu requires **Assign**.
- The reviewer menu requires **Assign reviewer**.
- Mention autocomplete requires **Mention**.

To resolve this issue:

1. In your project, select **AI** > **Automations**.
1. Check for an automation that uses the service account and the event you want.
1. Check the flow's documentation to confirm that the flow supports that event.
1. If the flow supports the event, create or edit an automation to include it.
   Otherwise, use the method described in the flow's documentation.

An event that you can save in an automation is not necessarily an event the flow can run.
For example, Developer cannot run from **Pipeline events**.
Use a supported event rather than adding an event only to make a service account selectable.

### Error: `Event types cannot combine autonomous event types`

When you save an automation that has both a schedule and an event, you might get this error:

```plaintext
Event types cannot combine autonomous event types (scheduled) with other event types. Create a separate automation for them.
```

An automation with a schedule cannot have event conditions, and you cannot save the automation until
you remove one of them.
To resolve this error, remove the event and create a separate automation for it.

### Warning: `Flow enabled without an automation`

When you enable a flow and add a schedule at the same time, GitLab might enable the flow
without the automation and show this warning:

```plaintext
The scheduled automation was not created. <reason>
```

This warning occurs when GitLab cannot create a service account for the scheduled automation.
The flow is still turned on, but without a schedule.

The `<reason>` in the warning message explains the cause.

Common causes are:

- You do not have permission to create a service account in the project, or to add members to the project.
- The project's group [prevents adding members to projects](../../group/access_and_permissions.md#prevent-members-from-being-added-to-projects-in-a-group).
- The service account of the flow has the Owner role, or a role higher than you can assign.

To resolve this warning, address the cause noted in the warning message and create a scheduled automation for the flow again.

For the full list of requirements, see the prerequisites for [creating a scheduled automation](#create-a-scheduled-automation).

### Investigate scheduled run outcomes

Prerequisites:

- You must have access to the instance logs.

`Ai::RunFlowScheduleWorker` records one line for every scheduled run it finishes.
Use these lines when the schedule UI shows a result you cannot explain, or when a run
produced no session at all.

Where to read the lines depends on your offering:

- On GitLab Self-Managed, search
  [`application_json.log`](../../../administration/logs/_index.md#application_jsonlog).
- On GitLab Dedicated, search the
  [application logs](../../../administration/dedicated/monitor.md) in your Amazon S3 bucket.

The line includes these fields:

| Field | Description |
|-------|-------------|
| `outcome` | `succeeded`, `skipped`, or `failed`. |
| `outcome_reason` | Why the run ended that way. Not set for `succeeded`. |
| `error_message` | The matching message, truncated to 1024 characters. For a failure, this is also the `error` on the schedule's last run. |
| `flow_schedule_id` | The schedule. Set even when GitLab cannot load the schedule. |
| `flow_trigger_id` | The automation the schedule belongs to. |
| `gl_project_id`, `gl_root_namespace_id` | The project and its top-level group. |
| `duo_workflow_id` | The session the run created. Set on a failed run too, when the run created a session and then failed to start it. Not set when the run ended before it created a session. |
| `consecutive_failure_count`, `deactivated` | On a failure, the new count and whether it crossed the threshold. |

Runs that GitLab skips, which do not count as failures, use these reasons:

| `outcome_reason` | Meaning |
|------------------|---------|
| `schedule_not_found`, `flow_trigger_not_found` | The schedule or its automation was deleted after the run was queued. |
| `schedule_inactive` | The schedule was turned off after the run was queued. |
| `trigger_inactive`, `trigger_not_scheduled` | The automation was turned off, or no longer runs on a schedule. |
| `scheduled_automations_disabled`, `flow_execution_disabled` | Scheduled automations or flow execution are turned off for the project. |
| `schedules_feature_flag_disabled` | Flow schedules are not enabled for the project. |
| `beta_features_unavailable` | Experiment and beta features are turned off for the instance or group. |
| `project_archived`, `project_pending_deletion`, `project_not_found` | The project cannot run flows. |
| `next_run_in_future` | The run was queued before it was due. |
| `usage_quota_exceeded` | The namespace has no GitLab Credits left. |
| `flow_disabled_by_feature_flag`, `non_human_trigger_not_permitted` | The flow refused the run. |

A failed run counts toward the three consecutive failures that deactivate a schedule.
GitLab assigns these reasons:

| `outcome_reason` | Meaning |
|------------------|---------|
| `unsupported_target` | The flow does not support being scheduled. |
| `excess_service_account_access` | The service account holds more access than the flow, and GitLab could not lower it. |
| `unexpected_error` | The run raised an exception. The exception is also in Sentry. |
| `run_service_error` | The run failed before it created a session, for a reason the flow did not name. |

When the flow names its own reason, GitLab logs that instead.
Common values are `unsupported_event` when the flow has no goal template for a schedule,
`autonomous_trigger_source_not_permitted` when the automation mixes a schedule with other event types,
and `run_not_eligible` when a foundational flow declined the run.
Read `error_message` on the same line for the detail.

To check whether a due schedule was picked up at all, look for the worker's own Sidekiq job
instead. Filter `sidekiq.log` on `json.class: "Ai::RunFlowScheduleWorker"`, then match
`json.correlation_id` to the outcome line.
