---
title: '`glab issue create`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Create an issue.

```plaintext
glab issue create [flags]
```

## Aliases

```plaintext
new
```

## Examples

```console
glab issue create
glab issue new
glab issue create -m release-2.0.0 -t "we need this feature" --label important
glab issue new -t "Fix CVE-YYYY-XXXX" -l security --linked-mr 123
glab issue create -m release-1.0.1 -t "security fix" --label security --web --recover
glab issue create -t "Bug Report" --template bug
glab issue create -t "Feature Request" --template feature_proposal.md --yes
```

## Options

```plaintext
  -a, --assignee usernames     Assign issue to people by their usernames. Multiple usernames can be comma-separated or specified by repeating the flag.
  -c, --confidential           Set an issue to be confidential. (default false)
  -d, --description string     Issue description. Set to "-" to open an editor.
      --due-date string        A date in 'YYYY-MM-DD' format.
      --epic int               ID of the epic to add the issue to.
  -l, --label strings          Add label by name. Multiple labels can be comma-separated or specified by repeating the flag.
      --link-type string       Type for the issue link. (default "relates_to")
      --linked-issues ints     The IIDs of issues that this issue links to. Multiple IIDs can be comma-separated or specified by repeating the flag.
      --linked-mr int          The IID of a merge request in which to resolve all issues.
  -m, --milestone string       The global ID or title of a milestone to assign.
      --no-editor              Don't open editor to enter a description. If set to true, uses prompt. (default false)
      --recover                Save the options to a file if the issue fails to be created. If the file exists, the options will be loaded from the recovery file. (EXPERIMENTAL)
      --template string        Name of a template in '.gitlab/issue_templates/' to pre-populate the description. The '.md' extension is optional. Templates are loaded from the local repository only.
  -e, --time-estimate string   Set time estimate for the issue.
  -s, --time-spent string      Set time spent for the issue.
  -t, --title string           Issue title.
      --web                    Continue issue creation with web interface.
  -w, --weight int             Issue weight. Valid values are greater than or equal to 0.
  -y, --yes                    Don't prompt for confirmation to submit the issue.
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
