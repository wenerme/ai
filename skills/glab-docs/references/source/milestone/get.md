---
title: '`glab milestone get`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Get a milestones via an ID for a project or group.

```plaintext
glab milestone get [flags]
```

## Examples

```console
 # Get milestone for the current project
glab milestone get 123

# Get milestone for the specified project
glab milestone get 123 --project project-name

# Get milestone for the specified group
glab milestone get 123 --group group-name
```

## Options

```plaintext
      --group string     The ID or URL-encoded path of the group.
      --jq string        Filter JSON output with a jq expression.
  -F, --output string    Format output as: text, json. (default "text")
      --project string   The ID or URL-encoded path of the project.
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
