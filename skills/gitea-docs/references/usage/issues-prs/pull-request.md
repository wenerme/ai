---
date: "2018-06-01T19:00:00+02:00"
aliases:
  - /en-us/pull-request
---

# Pull Request

A Pull Request (PR) is a way to propose changes to a repository.
It is a request to merge one branch into another, accompanied by a description of the changes that were made.
Pull Requests are commonly used as a way for contributors to propose changes and for maintainers to review and merge those changes.

## Creating a pull request

To create a PR, you'll need to follow these steps:

1. **Fork the repository** - If you don't have permission to make changes to the repository directly, you'll need to fork the repository to your own account.
This creates a copy of the repository that you can make changes to.

2. **Create a branch (optional)** - Create a new branch on your forked repository that contains the changes you want to propose.
Give the branch a descriptive name that indicates what the changes are for.

3. **Make your changes** - Make the changes you want, commit, and push them to your forked repository.

4. **Create the PR** - Go to the original repository and go to the "Pull Requests" tab. Click the "New Pull Request" button and select your new branch as the source branch.
Enter a descriptive title and description for your Pull Request and click "Create Pull Request".

## Reviewing a pull request

When a PR is created, it triggers a review process. The maintainers of the repository are notified of the PR and can review the changes that were made.
They can leave comments, request changes, or approve the changes.

If the maintainers request changes, you'll need to make those changes in your branch and push the changes to your forked repository.
The PR will be updated automatically with the new changes.

If the maintainers approve the changes, they can merge the PR into the repository.

## Closing a pull request

If you decide that you no longer want to merge a PR, you can close it.
To close a PR, go to the open PR and click the "Close Pull Request" button. This will close the PR without merging it.

## "Work In Progress" pull requests

Marking a pull request as being a work in progress will prevent that pull request from being accidentally merged.
To mark a pull request as being a work in progress, you must prefix its title by `WIP:` or `[WIP]` (case insensitive).
Those values are configurable in your `app.ini` file:

```ini
[repository.pull-request]
WORK_IN_PROGRESS_PREFIXES=WIP:,[WIP]
```

The first value of the list will be used in helpers.

## Default pull request title

When opening a new pull request, Gitea pre-fills the title field. The source of that title is controlled by the `DEFAULT_TITLE_SOURCE` setting in `app.ini`:

```ini
[repository.pull-request]
DEFAULT_TITLE_SOURCE = first-commit
```

Two modes are available:

- **`first-commit`** (default): The title is taken from the summary line of the oldest commit in the branch. This applies regardless of how many commits are included in the PR.
- **`auto`**: When the PR contains a single commit, its summary line is used as the title (same as `first-commit` for one commit). When the PR contains multiple commits, Gitea converts the branch name into a human-readable sentence: dashes, underscores, and `camelCase` word boundaries are replaced with spaces, and the first letter is capitalized.

Example: branch name `fix-user-login-flow` with multiple commits produces the title `Fix user login flow` under `auto`, but would use the oldest commit's message under `first-commit`.

## Pull Request Templates

You can find more information about pull request templates at the page [Issue and Pull Request templates](issue-pull-request-templates.md).
