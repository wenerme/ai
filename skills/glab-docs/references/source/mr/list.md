---
title: '`glab mr list`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

List merge requests.

```plaintext
glab mr list [flags]
```

## Aliases

```plaintext
ls
```

## Examples

```console
glab mr list --all
glab mr ls -a
glab mr list --assignee=@me
glab mr list --reviewer=@me
glab mr list --source-branch=new-feature
glab mr list --target-branch=main
glab mr list --search "this adds feature X"
glab mr list --label needs-review
glab mr list --not-label waiting-maintainer-feedback,subsystem-x
glab mr list -M --per-page 10
glab mr list --draft
glab mr list --not-draft
```

## Options

```plaintext
  -A, --all                    Get all merge requests.
  -a, --assignee strings       Get only merge requests assigned to users. Multiple users can be comma-separated or specified by repeating the flag.
      --author string          Filter merge request by author <username>.
  -c, --closed                 Get only closed merge requests.
      --created-after time     Filter merge requests created after a certain date (ISO 8601 format).
      --created-before time    Filter merge requests created before a certain date (ISO 8601 format).
      --deployed-after time    Filter merge requests deployed after a certain date (ISO 8601 format).
      --deployed-before time   Filter merge requests deployed before a certain date (ISO 8601 format).
  -d, --draft                  Filter by draft merge requests.
      --environment string     Filter merge requests deployed to the given environment <name>.
  -g, --group string           Select a group/subgroup. This option is ignored if a repo argument is set.
  -l, --label strings          Filter merge request by label <name>. Multiple labels can be comma-separated or specified by repeating the flag.
  -M, --merged                 Get only merged merge requests.
  -m, --milestone string       Filter merge request by milestone <id>.
      --not-draft              Filter by non-draft merge requests.
      --not-label strings      Filter merge requests by not having label <name>. Multiple labels can be comma-separated or specified by repeating the flag.
  -o, --order string           Order merge requests by <field>. Order options: created_at, updated_at, merged_at, title, priority, label_priority, milestone_due, and popularity.
  -F, --output string          Format output as: text, json. (default "text")
  -p, --page int               Page number. (default 1)
  -P, --per-page int           Number of items to list per page. (default 30)
  -R, --repo OWNER/REPO        Select another repository. Can use either OWNER/REPO or `GROUP/NAMESPACE/REPO` format. Also accepts full URL or Git URL.
  -r, --reviewer strings       Get only merge requests with users as reviewer. Multiple users can be comma-separated or specified by repeating the flag.
      --search string          Filter by <string> in title and description.
  -S, --sort string            Sort direction for --order field: asc or desc.
  -s, --source-branch string   Filter by source branch <name>.
  -t, --target-branch string   Filter by target branch <name>.
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
