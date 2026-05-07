---
title: '`glab issue view`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Display the title, body, and other information about an issue.

## Synopsis

You can use a full GitLab URL instead of an ID. Use `--web`
to open in a browser.

```plaintext
glab issue view <id> [flags]
```

## Aliases

```plaintext
show
```

## Examples

```console
glab issue view 123
glab issue show 123
glab issue view --web 123
glab issue view --comments 123
glab issue view https://gitlab.com/NAMESPACE/REPO/-/issues/123
```

## Options

```plaintext
  -c, --comments        Show issue comments and activities.
  -F, --output string   Format output as: text, json. (default "text")
  -p, --page int        Page number. (default 1)
  -P, --per-page int    Number of items to list per page. (default 20)
  -s, --system-logs     Show system activities and logs.
  -w, --web             Open issue in a browser. Uses the default browser, or the browser specified in the $BROWSER variable.
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
