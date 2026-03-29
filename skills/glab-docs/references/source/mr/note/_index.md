---
title: '`glab mr note`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Manage comments and discussions on a merge request.

```plaintext
glab mr note [<id> | <branch>] [flags]
```

## Aliases

```plaintext
comment
```

## Examples

```console
# Add a comment to merge request with ID 123
glab mr note 123 -m "Looks good to me!"

# Add a comment to the merge request for the current branch
glab mr note -m "LGTM"

# Open your editor to compose a multi-line comment
glab mr note 123

# Resolve a discussion by note ID
glab mr note 123 --resolve 3107030349

# Unresolve a discussion by note ID
glab mr note 123 --unresolve 3107030349
```

## Options

```plaintext
  -m, --message string   Comment or note message.
      --unique           Don't create a comment or note if it already exists.
```

## Options inherited from parent commands

```plaintext
  -h, --help              Show help for this command.
  -R, --repo OWNER/REPO   Select another repository. Can use either OWNER/REPO or `GROUP/NAMESPACE/REPO` format. Also accepts full URL or Git URL.
```

## Subcommands

- [`list`](list.md)
- [`reopen`](reopen.md)
- [`resolve`](resolve.md)
