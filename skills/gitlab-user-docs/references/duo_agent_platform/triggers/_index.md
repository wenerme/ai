# Triggers

Create and manage triggers to control when flows run in your project.

- Tier: Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

- Introduced in GitLab 18.3 as an [experiment](../../../policy/development_stages_support.md#experiment) [with a feature flag](../../../administration/feature_flags/_index.md) named `ai_flow_triggers`. Enabled by default.
- [Generally available](https://gitlab.com/gitlab-org/gitlab/-/work_items/585273) in GitLab 18.8.
- Feature flag `ai_flow_triggers` [removed](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/239280) in GitLab 19.1.

A trigger determines when a flow or external agent runs.
A trigger cannot be created for a custom agent or foundational agent.

A trigger is one of two kinds:

- An [event trigger](#event-triggers) runs a flow when something happens in the project,
  for example when someone mentions the service account or a pipeline fails.
- A [scheduled trigger](#scheduled-triggers) runs a flow at a recurring time,
  for example every weekday at 9:00 AM.

| Detail | Event trigger | Scheduled trigger |
|--------|---------------|-------------------|
| What starts the run | An action by a person, such as a mention or an approval | The schedule. No person starts the run. |
| Who the flow runs as | The service account of the flow, with [composite identity](../composite_identity.md) | A [dedicated service account](#service-account-for-scheduled-triggers), without composite identity |
| What the flow receives | For a mention, the comment. For other events, the web address of the merge request, work item, or project. | The web address of the project |

To run the same flow on an event and on a schedule, create two triggers.

## View triggers

- [Changed](https://gitlab.com/groups/gitlab-org/-/work_items/23940) in GitLab 19.6 to allow the Developer role to view triggers.

Prerequisites:

- You must have at least the Developer role for the project.

To view the triggers for a project:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **AI** > **Triggers**.

## Event triggers

An event trigger runs a flow when one of its conditions occurs, for example when someone assigns
the service account as a reviewer.
A trigger can have several event conditions.

### Create an event trigger

- **Configuration path** option [changed](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/217634) in GitLab 18.9 to require a [flag](../../../administration/feature_flags/_index.md) named `ai_catalog_create_third_party_flows`. Disabled by default.
- **Merge request ready** and **Merge request code conflict** event types [consolidated](https://gitlab.com/gitlab-org/gitlab/-/work_items/602777) into the **Merge request** event type as the **Marked ready** and **Merge conflict** actions in GitLab 19.2.
- Trigger creation form [changed](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/248807) to add conditions one at a time in GitLab 19.3.

> [!flag]
> The availability of the **Configuration path** option is controlled by a feature flag.
> For more information, see the history.

Prerequisites:

- You must have the Maintainer or Owner role for the project.

To create a trigger:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **AI** > **Triggers**.
1. Select **New trigger**.
1. In **Description**, enter a description for the trigger.
1. In the **Conditions** section, for each condition that should start the trigger:
   1. Select **Add condition**, then select **On an event**.
   1. From the **Event** dropdown list, select a [trigger event type](#trigger-event-types).
   1. If the event type needs configuration, from the **Run when** dropdown list select one or
      more trigger event actions.
   1. Select **Add event**.
1. From the **Service account** dropdown list,
   select a user to be [the composite identity](../composite_identity.md).
1. For **Configuration source**, select one of the following:
   - **Flow or external agent**: From the flows configured for this project,
     select a flow for the trigger to execute.
   - **Configuration path**: Enter the path to the flow configuration file
     (for example, `.gitlab/duo/flows/claude.yaml`).
     To view this option, the `ai_catalog_create_third_party_flows` flag must be enabled.
1. Optional. To give an event its own instructions, in the **Conditions** section, for that
   event select **Edit event** (). Enter the text in the
   **Instructions** field, then select **Save**. For more information, see
   [Add instructions](#add-instructions).
1. Select **Create trigger**.

The trigger now appears in **AI** > **Triggers**.

#### Trigger event types

| Name            | Description                                                                           | Configuration | Introduced in |
|-----------------|---------------------------------------------------------------------------------------|------|------|
| Mention         | When the service account user is mentioned in a comment on an issue or merge request. | None | GitLab 18.3 |
| Assign          | When the service account user is assigned to an issue or merge request.               | None | GitLab [18.5](https://gitlab.com/gitlab-org/gitlab/-/issues/567787) |
| Assign reviewer | When the service account user is assigned as a reviewer to a merge request.           | None | GitLab [18.5](https://gitlab.com/gitlab-org/gitlab/-/issues/567787) |
| Pipeline events | When a pipeline changes state.                                                        | From the **Run when** dropdown list, select one or more of the following:- **Running**- **Passed**- **Failed**- **Canceled** | GitLab [18.9](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/212797) as an [experiment](../../../policy/development_stages_support.md#experiment). [Generally available](https://gitlab.com/gitlab-org/gitlab/-/work_items/587272) in GitLab 19.1. |
| Merge request   | When a selected merge request action occurs.                                          | From the **Run when** dropdown list, select one of the following:- **Approved**: When a merge request has all required approvals. Introduced in GitLab 19.1.- **Created**: When someone creates a merge request, draft or ready, and GitLab generates its diff. GitLab syncs code owner approval rules against that diff before the flow runs, unless the merge request joins a merge train or GitLab cannot reload the diff. Introduced in GitLab [19.4](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/242698).- **Marked ready**: When a draft merge request is marked as ready for review. Introduced in GitLab [19.0](https://gitlab.com/gitlab-org/gitlab/-/work_items/592454).- **Merge conflict**: When a merge request can no longer be merged due to a code conflict. Introduced in GitLab [19.1](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/234044). | GitLab [19.1](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/237081) |
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

The trigger form shows and changes only `in` rules.
For a `not_in` rule, the **Type** dropdown list shows **Any type**, and the form keeps the rule.
If you change the types in the form, the form replaces the `not_in` rule.

### Foundational flow triggers

A trigger runs only when its foundational flow is turned on for your group or project. For more information, see [turn foundational flows on or off](../flows/foundational_flows/_index.md#turn-foundational-flows-on-or-off).

Foundational flows can start in the following ways:

- Default triggers that GitLab adds when you turn on the flow.
- Triggers that you create for events the flow supports.
- Another way, such as when a security scan finishes.
  These flows don't use triggers, so you don't see them listed in **AI** > **Triggers**.

For details about how to start each flow, see the individual
[foundational flow documentation](../flows/foundational_flows/_index.md).

### Change the work item when the session finishes

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/633112) in GitLab 19.6 [with flags](../../../administration/feature_flags/_index.md) named `dap_software_factory` and `ai_flow_trigger_chaining`. Disabled by default.

> [!flag]
> The availability of this feature is controlled by feature flags.
> For more information, see the history.

A trigger can change a work item after the session that the trigger started finishes.
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
- The trigger must have a **Work item** condition with **Status changed** as its only action,
  and at least one status.
  Until the condition meets these requirements, the settings are not available.

To change the work item when the session finishes:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **AI** > **Triggers**.
1. For the trigger you want to change, select **More actions** () > **Edit trigger**.
1. In the **Conditions** section, for the **Work item** condition, select **Edit event** ().
1. From the **Run when** dropdown list, select only **Status changed**.
1. From the **Status** dropdown list, select one or more statuses, then select **Save**.
1. Under **When the session finishes**, set one or both:
   - From the **Set work item status** dropdown list, select a status.
   - Select the **Mark merge requests as ready** checkbox.
1. Select **Save changes**.

You can also set these settings when you [create an event trigger](#create-an-event-trigger).

If you later add the **Created** action, remove the last status, or remove the **Work item** condition, GitLab clears the settings.
If you change the types so that they do not have the status of **Set work item status**,
GitLab clears that status.

#### When GitLab applies the settings

GitLab applies the settings only when all of these conditions are true:

- The session has the `finished` status.
  A stopped session, a failed session, or a session that waits for input changes nothing.
- The trigger is turned on.
- A work item event started the session.
- A human user started this session, or the first session of its [chain](#chain-triggers),
  in one of these ways:
  - With a **Mention**, **Assign**, or **Work item** event.
  - In a session with a GitLab Duo agent, such as a GitLab Duo Agentic Chat session.
    For example, the user [triggers a flow with a slash command](../../gitlab_duo_chat/agentic_chat.md#trigger-a-flow-with-a-slash-command).
- The work item still has one of the statuses of the trigger.
  If the status changes to a status that the trigger does not run on while the session runs,
  GitLab changes nothing.
  This also applies when the flow sets the status of its own work item.
- The service account of the session enforces composite identity.
- The service account and the user who started the session can both update the work item
  and the merge requests.

GitLab does not set a status that the work item type does not have.

#### Chain triggers

GitLab writes the changes as the composite identity of the session.
For this reason, GitLab treats the status change as an event that a flow caused.
The status change can start another trigger that runs on the new status.
The finished session becomes the parent of the next session, inside the chain depth and
breadth limits.

> [!warning]
> Do not configure triggers whose statuses form a cycle. For example, trigger A runs on status X
> and sets status Y, and trigger B runs on status Y and sets status X.
> The chain limits stop a cycle, but each session in the cycle still runs.

To keep a human decision between two stages, set the status to one that no trigger runs on,
for example `Plan ready`.
A user then moves the work item to the status that starts the next stage.

The following table shows two triggers that move a work item through three statuses with no
human action between the stages.

| Trigger | Runs when the status changes to | Flow | Set work item status | Mark merge requests as ready |
|---------|---------------------------------|------|----------------------|------------------------------|
| A | `Planning` | Generate Workplan | `Ready for development` | No |
| B | `Ready for development` | GitLab Duo Developer | `In review` | Yes |

#### Known issues

- A session can finish without the work done. For example, GitLab Duo Developer can decide
  that no code change is necessary and open no merge request. GitLab still sets the status.
  If your flow can stop early, make it end as failed or as waiting for input.
  GitLab then does not set the status.
- If the status that the trigger sets is also one of the statuses that the trigger runs on,
  the change can start the trigger again. The form shows a warning for this configuration.

### Actions that don't initiate a trigger

All trigger event types require a human user to perform the triggering action.
A non-human user such as a bot user, service account user, or another flow, cannot activate a trigger.

This restriction applies to all [trigger event types](#trigger-event-types).
For example, a flow cannot trigger another flow by mentioning the service account in a comment.
The status change from the settings of a trigger is an exception.
For more information, see [chain triggers](#chain-triggers).

A trigger with the **Work item** event type and the **Created** action also does not run when:

- The work item is imported from another GitLab instance or another tool, such as GitHub or Jira.
- The work item is created from an email to [Service Desk](../../project/service_desk/_index.md).

## Scheduled triggers

- Offering: GitLab.com, GitLab Self-Managed
- Status: Beta

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/594180) in GitLab 19.4 as a [beta](../../../policy/development_stages_support.md#beta) [with flags](../../../administration/feature_flags/_index.md) named `ai_flow_schedules` and `autonomous_service_account_execution`. Disabled by default.
- Setting to turn off scheduled triggers [introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/634139) in GitLab 19.6.

> [!flag]
> The availability of this feature is controlled by feature flags.
> For more information, see the history.

A scheduled trigger runs a flow at a recurring time.
Use a scheduled trigger for work that does not start from an event, such as a weekly
summary of stale issues.
The flow receives no merge request or work item, so use [instructions](#add-instructions)
to tell the flow what to do on each run.

> [!disclaimer]

Scheduled triggers have these limits:

- A trigger has one schedule.
- You can create scheduled triggers only in projects, not in groups.
- By default, a project can have up to 100 scheduled triggers.

### Service account for scheduled triggers

When you create a scheduled trigger, GitLab creates a service account for that trigger only.
The account name starts with `Duo Scheduled`, followed by the project path and the
trigger description.
GitLab adds the account to the project with the same role as the service account of the flow.
GitLab does not assign the Owner role to the account, and a run fails if the account has it.

A scheduled run does not use [composite identity](../composite_identity.md), so the role of
the service account is the only limit on what the flow can do.
The flow can also access other projects that the service account is a member of.
For more information, see [security threats in GitLab Duo Agent Platform](../security_threats.md).

The role of the account follows the role of the service account of the flow:

- Before each run, if the flow account has a lower role, GitLab lowers the role of the
  trigger account to match. If GitLab cannot lower the role, the run fails.
- If the flow account has a higher role, GitLab raises the role of the trigger account only
  when someone edits the trigger. GitLab does not raise the role above what the editor can assign.

### Create a scheduled trigger

Prerequisites:

- You must have the Maintainer or Owner role for the project.
- Your role for the project must be equal to or higher than the role of the service account
  of the flow.
- You must have permission to [create service accounts](../../profile/service_accounts.md#create-a-service-account)
  and to add members to the project.
- The project must belong to a group, and the group must not prevent adding members to projects.
- [Experiment and beta features](../turn_on_off.md#turn-on-beta-and-experimental-features)
  must be turned on.
- Scheduled triggers must be [turned on](#turn-scheduled-triggers-on-or-off) for the group or instance.
- A custom flow from the AI Catalog must be enabled in the project.
  External agents and flows that use a configuration file cannot run on a schedule.

To change the flow of an existing scheduled trigger:

- Your role for the project must be equal to or higher than the role of the trigger's service account.
- You must have permission to add members to the project.
- The new flow must be a custom flow from the AI Catalog.

You do not need these permissions to change the schedule, description, or instructions.

To create a scheduled trigger:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **AI** > **Triggers**.
1. Select **New trigger**.
1. In **Description**, enter a description for the trigger.
1. If **Configuration source** is shown, select **Flow or external agent**.
1. From the **Flow** or **Flow or external agent** dropdown list, select the flow.
1. In the **Conditions** section, select **Add condition**, then select **On a schedule**.
1. From the **Frequency** dropdown list, select how often the flow runs.
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
1. Optional. For frequencies other than every 15 or 30 minutes, from the **Time zone**
   dropdown list, select a time zone.
   The default is the time zone of your profile, or of your browser if your profile has none.
1. Optional. If the **Instructions** field is shown, enter what the flow must do on each run.
1. Select **Add schedule**.
1. Select **Create trigger**.

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

- The trigger is turned off.
- Scheduled triggers are turned off for the group or instance.
- The namespace has no GitLab Credits left.
- The project is archived or scheduled for deletion.

To resume a deactivated schedule, fix the cause in the email, then set `active` to `true` with the
[`aiFlowScheduleUpdate`](../../../api/graphql/reference/mutations.md#aiflowscheduleupdate)
GraphQL mutation.
To get the ID of the schedule, query the `flowSchedules` field of the trigger.
Reactivation does not reset the failure count, so one more failed run deactivates the
schedule again.
The trigger toggle does not reactivate a schedule. After GitLab deactivates the schedule,
the trigger stays turned on, but the flow does not run.

### Turn scheduled triggers on or off

Scheduled triggers are turned on by default.
When you turn off scheduled triggers, existing schedules stop running but GitLab keeps them.
Runs that are in progress continue.
You cannot add a schedule to a trigger while scheduled triggers are turned off.
When you turn scheduled triggers back on, schedules resume at their next scheduled time.
GitLab does not make up the runs that it skipped.

To turn scheduled triggers on or off, **Allow flow execution** must be turned on.

### On GitLab.com

Prerequisites:

- You must have the Owner role for the top-level group.

1. In the top bar, select **Search or go to** and find your top-level group.
1. In the left sidebar, select **Settings** > **GitLab Duo**.
1. Select **Change configuration**.
1. Under **Flow execution**, select or clear the **Allow scheduled triggers** checkbox.
1. Select **Save changes**.

The setting applies to the subgroups and projects of the group.

### On GitLab Self-Managed

Prerequisites:

- For the instance, you must have administrator access.
- For a group, you must have the Owner role for the group.

To turn scheduled triggers on or off for the instance:

1. In the upper-right corner, select **Admin**.
1. In the left sidebar, select **GitLab Duo**.
1. Select **Change configuration**.
1. Under **Flow execution**, select or clear the **Allow scheduled triggers** checkbox.
1. Select **Save changes**.

To turn scheduled triggers on or off for a group:

1. In the top bar, select **Search or go to** and find your group.
1. In the left sidebar, select **Settings** > **General**.
1. Expand **GitLab Duo features**.
1. Under **Flow execution**, select or clear the **Allow scheduled triggers** checkbox.
1. Select **Save changes**.

The setting applies to the subgroups and projects of the group.

## Add instructions

- Instructions for each condition [introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/627896) in GitLab 19.5 [with a flag](../../../administration/feature_flags/_index.md) named `ai_flow_trigger_goals`. Disabled by default.

> [!flag]
> The availability of this feature is controlled by a feature flag.
> For more information, see the history.

Instructions are text that tells the flow what to do. Add instructions to an event or a schedule
when you want the flow to do a specific task when that condition occurs.
Two conditions can run the same flow with different instructions.

Prerequisites:

- You must have the Maintainer or Owner role for the project.
- The trigger must use a flow that accepts instructions. If the flow does not accept them, the
  **Instructions** field does not appear.

To add instructions to a condition in an existing trigger:

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **AI** > **Triggers**.
1. For the trigger you want to change, select **More actions** () > **Edit trigger**.
1. In the **Conditions** section, for the condition you want to change, select **Edit event**
   or **Edit schedule** ().
1. In the **Instructions** field, enter the instructions. Use 4096 characters or fewer.
1. Select **Save**.
1. Select **Save changes**.

The instructions appear under the condition in the **Conditions** section.

Instructions belong to one condition, not to the whole trigger. For a **Merge request** event,
one set of instructions applies to every action that you select in **Run when**.

You can also add instructions when you [create an event trigger](#create-an-event-trigger),
[create a scheduled trigger](#create-a-scheduled-trigger), or
[enable a flow](../flows/custom.md#enable-a-flow).
In the trigger form, the **Instructions** field stays hidden until you set **Configuration source**.
If you select **Flow or external agent**, you must also select a flow that accepts instructions.

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

## Edit a trigger

Prerequisites:

- You must have the Maintainer or Owner role for the project.

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **AI** > **Triggers**.
1. For the trigger you want to change, select **More actions** () > **Edit trigger**.
1. Make the changes and select **Save changes**.

You can also edit a custom flow's trigger on its configuration page, under **Trigger conditions**.

## Turn a trigger on or off

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/work_items/598439) in GitLab 19.4.

Turn off a trigger to disable it and retain its configuration. After you turn a trigger off,
it stops running automatically after its configured actions, and remains in the list of triggers.

Prerequisites:

- You must have the Maintainer or Owner role for the project.

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **AI** > **Triggers**.
1. For the trigger you want to turn on or off, on the right side, select the toggle.

You can also turn a custom flow's trigger on or off on its configuration page, under **Trigger conditions**.

## Delete a trigger

Prerequisites:

- You must have the Maintainer or Owner role for the project.

1. In the top bar, select **Search or go to** and find your project.
1. In the left sidebar, select **AI** > **Triggers**.
1. For the trigger you want to delete, select **More actions** () > **Delete trigger**.
1. On the confirmation dialog, select **OK**.

You can also delete a custom flow's trigger on its configuration page, under **Trigger conditions**.

## GitLab Credits consumption for triggered flows

A flow started by a trigger runs as a service account.
The flow's usage is billed to the namespace, not to the user who performed the triggering action.

For example, a trigger runs a flow when a merge request receives all required approvals,
and the merge request requires three approvals. When the third approver approves the merge request,
the trigger runs the flow as the configured service account, and the usage is billed
to the namespace rather than to the third approver.

This billing applies to every trigger event type, including a pipeline state change,
a work item status change, a mention, or a schedule.

For more information, see [billing subjects for credit usage](../../../subscriptions/gitlab_credits.md#billing-subjects-for-credit-usage).

## Troubleshooting

### Error: `Event types contains event types not supported`

When you create or edit a foundational flow trigger, you might get this error:

```plaintext
Event types contains event types not supported by this foundational flow
```

The trigger includes an event type that the flow does not accept.
To resolve this error, check the flow's documentation for the events it supports, then do one of the following:

- If the flow uses triggers, edit the trigger to remove the events the flow
  does not support. For example, Fix CI/CD Pipeline accepts only Pipeline events.
- If the flow starts another way, delete the trigger because the flow doesn't need one.
  For example, [SAST False Positive Detection](../../application_security/vulnerabilities/false_positive_detection.md)
  runs after a security scan.

### Service account shows `No triggers for this event`

When you assign a service account to a merge request or request a review from it,
the service account might be disabled with the message `No triggers for this event`.
In mention autocomplete, a service account without a mention trigger doesn't appear.
In each case, the project has no trigger for that service account and event:

- The assignee menu requires **Assign**.
- The reviewer menu requires **Assign reviewer**.
- Mention autocomplete requires **Mention**.

To resolve this issue:

1. In your project, select **AI** > **Triggers**.
1. Check for a trigger that uses the service account and the event you want.
1. Check the flow's documentation to confirm that the flow supports that event.
1. If the flow supports the event, create or edit a trigger to include it.
   Otherwise, use the method described in the flow's documentation.

An event that you can save in a trigger is not necessarily an event the flow can run.
For example, Developer cannot run from **Pipeline events**.
Use a supported event rather than adding an event only to make a service account selectable.

### Error: `Event types cannot combine autonomous event types`

When you save a trigger that has both a schedule and an event, you might get this error:

```plaintext
Event types cannot combine autonomous event types (scheduled) with other event types. Create a separate trigger for them.
```

A trigger with a schedule cannot have event conditions, and you cannot save the trigger until
you remove one of them.
To resolve this error, remove the event and create a separate trigger for it.
