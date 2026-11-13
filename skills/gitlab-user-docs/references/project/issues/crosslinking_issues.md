# Crosslinking issues

Link issues to each other from commit messages, other issues, merge requests, and branch names to track related work.

- Tier: Free, Premium, Ultimate
- Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated

Crosslinking creates references between issues, commits, and merge requests in GitLab.
When you mention an issue in a commit message, another issue, or a merge request,
GitLab adds a note to the issue's activity.
Crosslinks work across projects and groups.

You can also [link work items to a merge request](../../work_items/_index.md#work-items-in-merge-requests)
without mentioning them.

## From commit messages

When you mention an issue in a commit message, GitLab links the commit to the issue.

To mention an issue in the same project, add `#<issue_number>` to the commit message:

```shell
git commit -m "Update the sign-in page. Ref #<issue_number>"
```

If you write the commit message in an editor, Git removes lines that start with `#`.
To start a commit message with an issue reference, use `GL-<issue_number>` instead:

```shell
git commit -m "GL-<issue_number>: Update the sign-in page"
```

To mention an issue in a different project in the same group, add `<project_name>#<issue_number>`:

```shell
git commit -m "Update the sign-in page. Ref <project_name>#<issue_number>"
```

To mention an issue in a different group, add the full URL of the issue:

```shell
git commit -m "Update the sign-in page. Related to https://gitlab.example.com/<group>/<project>/-/issues/<issue_number>"
```

GitLab converts only the first 1,000 full URLs in a commit message to links.

[Value stream analytics](../../group/value_stream_analytics/_index.md) uses the first commit
that mentions an issue to measure the **Plan** stage and cycle time.

## From other issues

When you mention issue `#111` in issue `#222`, issue `#111` shows a note in its activity.
You mention the relationship once, and it appears in both issues.

When the activity of an issue is filtered to  or ,
crosslinks are shown as `(Username) mentioned in issue #(number) (time ago)`.

## From merge requests

Mentions in merge request comments work the same way as mentions in issues.

When you mention an issue in a merge request description, GitLab links the issue and the merge request.
To close the issue when the merge request merges, use a
[closing pattern](managing_issues.md#closing-issues-automatically).

When the activity of an issue is filtered to  or ,
crosslinks are shown as `(Username) mentioned in merge request !(number) (time ago)`.

## From branch names

When you create a branch in the same project as an issue and start the branch name with the issue
number, followed by a hyphen, the issue and MR you create are linked.
For more information, see
[prefix branch names with issue numbers](../repository/branches/_index.md#prefix-branch-names-with-a-number).
