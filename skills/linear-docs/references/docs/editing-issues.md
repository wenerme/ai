# Edit issues

Making changes to an issue.

![issue creation dialogue box](https://webassets.linear.app/images/ornj730p/production/d8f7b8a4591344aa7946960fc408d1fa05044b4c-1256x402.png?q=95&auto=format&dpr=2)

## Overview

All workspace members will be able to edit an issue's title and description, regardless of who is the original creator of an issue. For comments, only the creator of the comment will be able to perform additional edits.

## Edit issue title and description

You can edit an issue title or description by clicking directly on the title or description and editing inline. You can also use the methods below when editing an issue.

## Revert/Restore issue description

Use `Cmd/Ctrl K` and search for **Issue description history**. Or open the issue menu and select **Show description history**.

Open issue description history to view and restore earlier versions of the description.

## Move an issue to another team

When work needs to be passed over to another team, or when you are consolidating teams, issues can be moved to the appropriate Linear team within the same workspace.

For a single issue, simply use `Cmd/Ctrl Shift M` to move an issue to a new team. To move issues in bulk while retaining as much data as possible, select issues manually or with filters before moving them. Use `Cmd/Ctrl A` to select all issues on the list or board.

You can undo the move with `Cmd/Ctrl Z`. Most fields are restored, but changes to labels, subscribers, estimates, or access-related assignments may remain.

### Old Issue IDs and URLS

When you move an issue to a new team, we generate a new issue ID and unique URL for the issue. Old URLs will still work and redirect to the new issue URL. Searching for old issue IDs will also bring up the current issue (unfortunately, this doesn't work for old issue titles). Inline references to issues (like #ENG-123) will redirect when clicked, but won't update visually from the original issue ID they're associated with.

Some fields may be remapped or cleared based on the destination team's configuration.

### Changes in issue properties

Issue property | Effect | Workaround
--- | --- | ---
Cycle | May be cleared | The cycle may be cleared if there isn't a corresponding cycle in the destination team.
Team Labels | Removed | Create a label in the new team with the same name.
Projects | Removed | Add the new team to the current team's project before moving the issue.
Relations | Remain
Priority | Remain
Issue ID | Changed | The issue receives a new identifier for the destination team. Previous identifiers remain searchable and continue to resolve to the issue.
Status | Changed | When you move an issue, Linear maps its status to the closest corresponding status in the destination team's workflow. If the destination team uses triage, open issues moved by someone outside that team will move to triage. Closed issues remain closed.
