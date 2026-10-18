---
date: "2026-10-17T00:00:00+00:00"
---

# Pre-filling Issues and Pull Requests

Links to the pages for creating issues and pull requests can pre-fill the form with query parameters.
This lets you link users from another app, a README or a project board to a form that is already categorized.

- New issue: `/{owner}/{repo}/issues/new?…`
- New pull request: `/{owner}/{repo}/compare/{base}...{head}?…`

For example, this link opens a new issue with a title, two labels and an assignee:

```
https://gitea.example.com/owner/repo/issues/new?title=Dashboard+crashes&label=kind/bug,area/dashboard&assignee=alice
```

## Parameters

| Parameter     | Value                                                                       |
| ------------- | --------------------------------------------------------------------------- |
| `title`       | Title                                                                       |
| `body`        | Description                                                                 |
| `label`       | Comma-separated label IDs or names                                          |
| `labels`      | Alias of `label`                                                            |
| `milestone`   | Milestone ID or name                                                        |
| `project`     | Comma-separated project IDs or titles                                       |
| `assignee`    | Comma-separated user IDs or usernames                                       |
| `template`    | File name of the [template](issue-pull-request-templates.md) to use         |
| `field:<id>`  | Value of the field with this `id` in a YAML template                        |

IDs and names can be mixed and names are matched case-insensitively. Values that don't match anything in the repository are ignored.
Labels include the organization's labels, and closed milestones and projects can be selected too.
Milestones and projects are only offered to users who can write to issues or pull requests, so for other users these parameters have no effect.

The values from the link take precedence over the title, description, labels and assignees of the template.

When there are several issue templates to choose from, the parameters are passed through to the chosen one.
On the compare page, any of these parameters also opens the pull request form directly, as `expand=1` does.
