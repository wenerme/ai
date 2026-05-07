---
title: '`glab mr view`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Display the title, body, and other information about a merge request.

## Synopsis

You can use a branch name or ID. Use `--web` to open in a browser.

```plaintext
glab mr view [<id | branch>] [flags]
```

## Aliases

```plaintext
show
```

## Options

```plaintext
  -c, --comments        Show merge request comments and activities.
  -F, --output string   Format output as: text, json. (default "text")
  -p, --page int        Page number.
  -P, --per-page int    Number of items to list per page. (default 20)
      --resolved        Show only resolved discussions (implies --comments).
  -s, --system-logs     Show system activities and logs.
      --unresolved      Show only unresolved discussions (implies --comments).
  -w, --web             Open merge request in a browser. Uses default browser or browser specified in BROWSER variable.
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
