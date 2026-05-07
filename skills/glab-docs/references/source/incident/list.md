---
title: '`glab incident list`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

List project incidents.

## Synopsis

Defaults to open items. Use `--group` to list for a group
instead of the current project.

```plaintext
glab incident list [flags]
```

## Aliases

```plaintext
ls
```

## Examples

```console
glab incident list --all
glab incident ls --all
glab incident list --assignee=@me
glab incident list --milestone release-2.0.0 --opened
```

## Options

```plaintext
  -A, --all                    Get all incidents.
  -a, --assignee string        Filter incident by assignee <username>.
      --author string          Filter incident by author <username>.
  -c, --closed                 Get only closed incidents.
  -C, --confidential           Filter by confidential incidents.
  -e, --epic int               List issues belonging to a given epic (requires --group, no pagination support).
  -g, --group string           Select a group or subgroup. Ignored if a repo argument is set.
      --in string              search in: title, description. (default "title,description")
  -l, --label strings          Filter incident by label <name>. Multiple labels can be comma-separated or specified by repeating the flag.
  -m, --milestone string       Filter incident by milestone <id>.
      --not-assignee string    Filter incident by not being assigned to <username>.
      --not-author string      Filter incident by not being by author(s) <username>.
      --not-label strings      Filter incident by lack of label <name>. Multiple labels can be comma-separated or specified by repeating the flag.
      --order string           Order incident by <field>. Order options: created_at, updated_at, priority, due_date, relative_position, label_priority, milestone_due, popularity, weight. (default "created_at")
  -O, --output string          Options: 'text' or 'json'. (default "text")
  -F, --output-format string   Options: 'details', 'ids', 'urls'. (default "details")
  -p, --page int               Page number. (default 1)
  -P, --per-page int           Number of items to list per page. (default 30)
  -R, --repo string            Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
      --search string          Search <string> in the fields defined by '--in'.
  -s, --sort string            Sort direction for --order field: asc or desc. (default "desc")
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
