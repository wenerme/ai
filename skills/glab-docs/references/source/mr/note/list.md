---
title: '`glab mr note list`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

List merge request discussions. (EXPERIMENTAL)

## Synopsis

Fetches and displays merge request discussions.

Uses the same output format as `glab mr view --comments`.
Supports filtering by note type, resolution state, and file path.
Supports JSON output for scripting.

This feature is an experiment and is not ready for production use.
It might be unstable or removed at any time.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

```plaintext
glab mr note list [<id> | <branch>] [flags]
```

## Examples

```console
# List all discussions on the current branch's MR
glab mr note list

# List diff comments only
glab mr note list --type diff

# List unresolved discussions
glab mr note list --state unresolved

# List discussions on a specific file
glab mr note list --file src/main.go

# JSON output for scripting
glab mr note list -F json | jq '.[].notes[].body'

# List discussions on MR 123
glab mr note list 123
```

## Options

```plaintext
      --file string     Show only diff notes on this file path.
  -F, --output string   Format output as: text, json. (default "text")
      --state string    Resolution state: all, resolved, unresolved. (default "all")
  -t, --type string     Note type: all, general, diff, system. (default "all")
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
