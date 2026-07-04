---
title: '`glab release list`'
stage: AI Coding
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

List releases in a repository.

## Synopsis

By default, lists the releases for the current project, most recent
first. Use `--repo` to target a different project, or `-F json` for
machine-readable output.

```plaintext
glab release list [flags]
```

## Aliases

```plaintext
ls
```

## Examples

```console
glab release list
glab release list --per-page 50
glab release list -R owner/repository
glab release list -F json
```

## Options

```plaintext
      --jq string       Filter JSON output with a jq expression.
  -F, --output string   Format output as: text, json. (default "text")
  -p, --page int        Page number. (default 1)
  -P, --per-page int    Number of items to list per page. (default 30)
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
