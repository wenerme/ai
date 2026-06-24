---
title: '`glab container-registry repository view`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

View a container registry repository.

## Synopsis

View details for a single container registry repository.

```plaintext
glab container-registry repository view <repository-id> [flags]
```

## Aliases

```plaintext
show
```

## Examples

```console
# View a container registry repository
glab container-registry repository view 123

# Include tag details
glab container-registry repository view 123 --include-tags
```

## Options

```plaintext
      --include-tags         Include tags in the response.
      --include-tags-count   Include the number of tags in the response. (default true)
      --jq string            Filter JSON output with a jq expression.
  -F, --output string        Format output as: text, json. (default "text")
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
