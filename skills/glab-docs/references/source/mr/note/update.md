---
title: '`glab mr note update`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Update the body of a note on a merge request. (EXPERIMENTAL)

## Synopsis

Replace the body of an existing note on a merge request.

`<note-id>` is a numeric note ID, not a hex discussion ID.
You can find note IDs with:

- `glab mr note list -F json` (the `.id` field)
- Note URLs: `.../merge_requests/1#note_12345`

You can change only the note body. You cannot move the position of diff notes.

This feature is an experiment and is not ready for production use.
It might be unstable or removed at any time.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

```plaintext
glab mr note update [<id> | <branch>] <note-id> [flags]
```

## Examples

```console
# Update note 12345 on merge request 1 with a new message
glab mr note update 1 12345 -m "Updated comment"

# Update a note on the current branch's merge request, composing in an editor
glab mr note update 12345

# Pipe the new body from stdin
echo "new body" | glab mr note update 1 12345

```

## Options

```plaintext
  -m, --message string   New note body. If omitted, opens an editor or reads from stdin.
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
