# Delete and archive issues

Linear archives issues automatically to keep your workspace uncluttered and easy to search.

![Linear settings showing the auto-archive preferences](https://webassets.linear.app/images/ornj730p/production/82132ce2f13a09b1638db646a8dc460416fe89c8-2160x1327.png?q=95&auto=format&dpr=2)

## Overview

Linear offers features that help manage backlog and stale items, keeping your workspace focused on current priorities. We introduce our auto-close and auto-archive feature, and talk about deleted issues and the team archives.

## Delete issues

Delete issues with the shortcut `Cmd/Ctrl` `delete`, from an issue's contextual menu, or use command bar `Cmd/Ctrl` `K` and select **Delete issue**.

If you accidentally delete an issue, the fastest way to restore it is to use `Cmd/Ctrl` `Z`. If undo is no longer available, open your team's archives, select **Recently deleted issues**, select the issue, then press `#` to restore it. Recently deleted issues are stored in the archives for 30 days, after which they'll be permanently removed from your workspace. It is not possible to restore deleted issues after they have been permanently removed.

## Auto-close

![Auto-close automations settings](https://webassets.linear.app/images/ornj730p/production/e3ab2a2dcae1e075aa611591cc07d4281723f239-1342x810.png?q=95&auto=format&dpr=2)

Linear offers an option to close issues that have not been updated after a certain time period. This can be configured in _Team settings > Workflows & automations_. When auto-closed, an issue is marked with one of the Closed statuses, we publish a history item to its Activity feed, and notify subscribers. You can re-open an auto-closed issue anytime by changing its status.

Issues will not auto-close while they belong to an active cycle or unfinished project. Auto-close is also delayed when an issue has a future due date, an active SLA, or sub-issues that are not eligible to close.

## Auto-archive

Archiving happens automatically with no option to manually archive items.

![Auto-archive closed issues, cycles, and projects](https://webassets.linear.app/images/ornj730p/production/d65e6891b0933632dd09f3ddf3de9ede8f640b3a-1452x466.png?q=95&auto=format&dpr=2)

You can adjust the auto-archive time period, after which closed issues are auto-archived in _Team Settings > Issue statuses & automations_. Changes usually take effect on the next auto-archive run, typically within 24 hours.

### Issues are not archiving

* The parent issue is not closed
* Sub-issues are not all closed
* Sub-issues in another project are not closed
* The issue's project is not yet available to archive.

Closed issues are auto-archived after they have remained completed, canceled, or auto-closed and inactive for the full auto-archive period. Issues in active cycles or unfinished projects are archived only after those cycles or projects have also been completed for that period.

### Projects are not archiving

Scenarios that prevent a project from archiving:

* The project status is not closed (completed or cancelled category)
* Updates/changes have been made (e.g. renaming a project)
* All issues are not yet available to archive. A project's issues have to be available to archive in order for the project to archive. This helps to prevent missing data when looking at a project's graph or other calculations.

## The archives

![Access archives](https://webassets.linear.app/images/ornj730p/production/444946f80cb7cd76dc5411f7e184feeba77cdeb4-908x366.png?q=95&auto=format&dpr=2)

Each team has its own archives page where you will find archived or deleted issues, initiatives, cycles, projects, and documents. Access it with the shortcut `G` then `X` or find it in the sidebar under the three dot menu beside each team name. To keep the app speedy, archived issues are loaded on demand rather than stored in the client, so you may find the issues load a little slower on this page than elsewhere in the app.

### Restore issues

Restore archived issues, projects, or cycles from your team's archives to edit them. You can also recover deleted issues, projects, initiatives, or documents from the corresponding Recently deleted tab for up to 30 days.
