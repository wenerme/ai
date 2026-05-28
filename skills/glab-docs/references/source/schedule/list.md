---
title: '`glab schedule list`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Get the list of schedules.

```plaintext
glab schedule list [flags]
```

## Examples

```console
# List all scheduled pipelines
$ glab schedule list
Showing schedules for project gitlab-org/cli
ID  Description                    Cron            Ref    Active
1   Daily build                   0 0 * * *       main   true
2   Weekly deployment             0 0 * * 0       main   true
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
