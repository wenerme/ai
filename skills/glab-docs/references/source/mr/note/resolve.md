---
title: '`glab mr note resolve`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Resolve a discussion on a merge request. (EXPERIMENTAL)

## Synopsis

Resolve a discussion on a merge request.

The identifier can be one of the following:

- Discussion ID: full 40-character hex string or an 8+ character prefix
- Note ID: integer note ID (looks up the parent discussion automatically)

If a prefix matches multiple discussions, an error is returned with the ambiguous matches.

This feature is an experiment and is not ready for production use.
It might be unstable or removed at any time.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

```plaintext
glab mr note resolve [<id> | <branch>] <discussion-id> [flags]
```

## Examples

```console
# Resolve a discussion on merge request 123 by prefix
glab mr note resolve 123 abc12345

# Resolve a discussion by note ID
glab mr note resolve 3107030349

# Resolve a discussion by prefix (8+ chars, auto-detects merge request from branch)
glab mr note resolve abc12345

# Resolve a discussion by full ID
glab mr note resolve abc12345deadbeef1234567890abcdef12345678

```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
