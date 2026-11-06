# Board view

View work items as a board grouped by status, and move them between columns.

- Tier: Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed

- [Introduced](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/236546) in GitLab 19.1 [with a feature flag](../../administration/feature_flags/_index.md) named `planning_view_boards`. Disabled by default.
- [Added](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/258454) a feature flag named `planning_view_boards_group` in GitLab 19.5 to enable the board view for a top-level group. Disabled by default.

> [!flag]
> The availability of this feature is controlled by feature flags.
> For more information, see the history.

The board view shows the [work items list](_index.md#view-all-work-items) as a board.
It uses the same filters and saved views as the list.

Each column is a [status](status.md) from your group or project.
The board can group work items only by status.
Work item types without a status, like incidents, are not shown on the board.

## Switch to the board view

To switch to the board view:

1. In the top bar, select  and find your project or group.
1. In the left sidebar, select  > .
1. To the right of the filter bar, select .

GitLab remembers your choice for each group and project.
To return to the list, select .
A [saved view](saved_views.md#change-the-view-mode) opens in the mode saved with the view.

The default  filter is set to , which hides closed items.
Columns for closed statuses, like **Done**, look empty.
To see closed items, remove the filter.

## Move and order work items

Prerequisites:

- Have the Planner, Reporter, Developer, Maintainer, or Owner role for the work item's project or group,
  be the author of the work item, or be assigned to the work item.

To move a work item to another column, drag it to the column.
Alternatively, hover over the work item, select the vertical ellipsis (), and under , select the column.
The work item gets the status of that column.

Work items on the board are always in manual order.
The order is shared with the  sort in the list view.
To reorder a work item in its column, drag it, or select the vertical ellipsis () >  or .

## Create a work item in a column

When you create a work item from a column, the work item gets the status of that column.
It also gets the confidentiality, labels, assignees, milestone, parent, iteration, weight, and health status
from active filters that use the `is` operator.

To create a work item in a column:

1. In the column header, select  ().
1. Complete the fields.
1. Select **Create** for the type you selected, for example **Create issue**.

On a group's board,  is available only if status for epics is turned on.

## Configure columns

GitLab saves your column settings for each group and project.
In a saved view, column changes are saved with the view when you select .

To configure a column, use the controls in the column header:

- To collapse the column, select the down arrow ().
  To expand it, select the right arrow ().
- To move the column, drag it, or select the vertical ellipsis () >  or .
  The column sort changes to .
- To hide the column, select the vertical ellipsis () > .

The board shows up to 25 columns.
If your group or project has more than 25 statuses, the board shows the first 25.
To choose which columns to show, select  () > .
To change the column order in this drawer, set  to .

## Choose the fields shown on work items

The board uses the same field settings as the list, except  and , which are not available on the board.
For more information, see [configure list display preferences](_index.md#configure-list-display-preferences).

## Real-time updates

Changes to work items show up on open boards without a page refresh.
This includes changes made by other users, and changes made in the list, on the board, or in the work item drawer.

## Related topics

- [Issue boards](../project/issue_board.md)
