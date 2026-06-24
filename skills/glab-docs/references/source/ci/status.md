---
title: '`glab ci status`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

View CI/CD pipeline status.

## Synopsis

Defaults to the current branch.

Use `--live` for real-time updates. Use `--compact` for a condensed view.

```plaintext
glab ci status [flags]
```

## Aliases

```plaintext
stats
```

## Examples

```console
# View the pipeline status in real time
glab ci status --live

# A more compact view
glab ci status --compact

# Get the pipeline for the main branch
glab ci status --branch=main

# Get the pipeline for the current branch
glab ci status
```

## Options

```plaintext
  -b, --branch string   Check pipeline status for a branch. Defaults to the current branch.
  -c, --compact         Show status in compact format.
      --jq string       Filter JSON output with a jq expression.
  -l, --live            Show status in real time until the pipeline ends.
  -F, --output string   Format output as: text, json. Note: JSON output is not compatible with --live or --compact flags. (default "text")
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
