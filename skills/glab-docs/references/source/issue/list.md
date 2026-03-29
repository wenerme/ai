---
title: '`glab issue list`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

List project issues.

```plaintext
glab issue list [flags]
```

## Aliases

```plaintext
ls
```

## Examples

```console
glab issue list --all
glab issue ls --all
glab issue list --assignee=@me
glab issue list --milestone release-2.0.0 --opened
```

## Options

```plaintext
  -A, --all                    Get all issues.
  -a, --assignee string        Filter issue by assignee <username>.
      --author string          Filter issue by author <username>.
  -c, --closed                 Get only closed issues.
  -C, --confidential           Filter by confidential issues.
  -e, --epic int               List issues belonging to a given epic (requires --group, no pagination support).
  -g, --group string           Select a group or subgroup. Ignored if a repo argument is set.
      --in string              search in: title, description. (default "title,description")
  -t, --issue-type string      Filter issue by its type. Options: issue, incident, test_case.
  -i, --iteration int          Filter issue by iteration <id>.
  -l, --label strings          Filter issue by label <name>. Multiple labels can be comma-separated or specified by repeating the flag.
  -m, --milestone string       Filter issue by milestone <id>.
      --not-assignee string    Filter issue by not being assigned to <username>.
      --not-author string      Filter issue by not being by author(s) <username>.
      --not-label strings      Filter issue by lack of label <name>. Multiple labels can be comma-separated or specified by repeating the flag.
      --order string           Order issue by <field>. Order options: created_at, updated_at, priority, due_date, relative_position, label_priority, milestone_due, popularity, weight. (default "created_at")
  -O, --output string          Options: 'text' or 'json'. (default "text")
  -F, --output-format string   Options: 'details', 'ids', 'urls'. (default "details")
  -p, --page int               Page number. (default 1)
  -P, --per-page int           Number of items to list per page. (default 30)
  -R, --repo OWNER/REPO        Select another repository. Can use either OWNER/REPO or `GROUP/NAMESPACE/REPO` format. Also accepts full URL or Git URL.
      --search string          Search <string> in the fields defined by '--in'.
  -s, --sort string            Sort direction for --order field: asc or desc. (default "desc")
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
