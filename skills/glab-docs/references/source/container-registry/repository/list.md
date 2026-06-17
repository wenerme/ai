---
title: '`glab container-registry repository list`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

List container registry repositories.

## Synopsis

List container registry repositories for a project or group.

```plaintext
glab container-registry repository list [flags]
```

## Aliases

```plaintext
ls
```

## Examples

```console
# List container registry repositories for the current project
glab container-registry repository list

# List container registry repositories for another project
glab container-registry repository list -R gitlab-org/cli

# List container registry repositories for a group
glab container-registry repository list --group gitlab-org
```

## Options

```plaintext
  -g, --group string          List container registry repositories for a group.
      --include-tag-details   Fetch digest, size, and creation time for included tags. Makes one API call per tag. Project JSON output only. Implies --include-tags.
      --include-tags          Include tags in the response. Project repositories only.
      --include-tags-count    Include the number of tags in the response. Project repositories only. (default true)
      --jq string             Filter JSON output with a jq expression.
  -F, --output string         Format output as: text, json. (default "text")
  -p, --page int              Page number. (default 1)
  -P, --per-page int          Number of items to list per page. (default 30)
  -R, --repo string           Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
