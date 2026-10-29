---
date: "2025-11-25T18:58:22Z"
description: "Automate project boards with event-driven filters and actions."
---

# Project Workflows

Project workflows automate a project board. When an issue or pull request in the project triggers an event, each enabled workflow for that event checks its filters and applies its actions. Workflows run in Gitea and need no runner.

## Edit workflows

1. Open a project and select **Workflows**.
2. Select an event in the sidebar.
3. Set filters and actions, then select **Save**. To change an existing workflow, select **Edit** first.

An event can have several workflows. **Clone** copies the selected workflow so you can adapt it to other items. **Disable** pauses a workflow and keeps its configuration. **Remove** deletes it.

## Events

| Event | Runs when | Filters | Actions |
| --- | --- | --- | --- |
| Item added to project | An item is added to the project or created in it | Apply to, labels | Move to column, labels, issue state |
| Item removed from project | An item is removed from the project | Apply to, labels | Labels, issue state |
| Item reopened | An item is reopened | Apply to, labels | Move to column, labels |
| Item closed | An item is closed | Apply to, labels | Move to column, labels |
| Item column changed | An item moves to another column | Apply to, columns, labels | Labels, issue state |
| Code changes requested | An official reviewer requests changes on a pull request | Labels | Move to column, labels |
| Code review approved | An official reviewer approves a pull request | Labels | Move to column, labels |
| Pull request merged | A pull request is merged | Labels | Move to column, labels |

## Filters

A workflow without filters runs for every item.

- **Apply to**: issues, pull requests, or both.
- **When moved from column**, **When moved to column**: the column the item left or entered.
- **Only if it has labels**: the item must have all selected labels.

## Actions

A workflow needs at least one action. Actions run in this order:

1. **Move to column**: moves the item to a column.
2. **Add labels**, **Remove labels**: changes the item's labels.
3. **Issue state**: closes or reopens the item. Workflows never reopen pull requests.

Workflow changes appear in the timeline as "Project workflow" followed by the event, and don't trigger other workflows. Workflows don't run in closed projects or for items in archived repositories.

## Permissions

Anyone who can read a project can view its workflows. Managing them requires write access to the project and:

- Repository project: write access to the repository's issues and pull requests.
- Organization project: organization owner or site administrator.
- User project: the project's owner.

Access tokens limited to public repositories can't manage workflows for organization or user projects. Workflows apply their actions regardless of who triggered the event.

## API

Manage workflows under the project routes of a repository (`/repos/{owner}/{repo}/projects/{id}`), an organization (`/orgs/{org}/projects/{id}`) or the authenticated user (`/user/projects/{id}`):

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `.../workflows` | List workflows |
| `GET` | `.../workflows/{workflow_id}` | Get a workflow |
| `POST` | `.../workflows` | Create a workflow |
| `PATCH` | `.../workflows/{workflow_id}` | Edit a workflow, omitted fields stay unchanged |
| `DELETE` | `.../workflows/{workflow_id}` | Delete a workflow |

A workflow has an `event` (`item_added_to_project`, `item_removed_from_project`, `item_reopened`, `item_closed`, `item_column_changed`, `code_changes_requested`, `code_review_approved` or `pull_request_merged`), an `enabled` flag, `filters` (`issue_type`, `source_column_id`, `target_column_id`, `label_ids`) and `actions` (`column_id`, `add_label_ids`, `remove_label_ids`, `issue_state`). Each event accepts only the filters and actions listed in [Events](#events).

## Example

To route new bug reports to triage, create a workflow for **Item added to project**:

- **Apply to**: Issues only
- **Only if it has labels**: `bug`
- **Move to column**: Triage
- **Add labels**: `needs-triage`
