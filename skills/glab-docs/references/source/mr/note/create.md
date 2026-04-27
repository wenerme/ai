---
title: '`glab mr note create`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Create a comment or discussion on a merge request. (EXPERIMENTAL)

## Synopsis

Add a comment to a merge request. The command creates the comment as a new
discussion thread.

Use `--reply` to add a note to an existing discussion thread instead of
starting a new one. The value can be a full discussion ID or a unique
prefix of at least 8 characters.

This feature is an experiment and is not ready for production use.
It might be unstable or removed at any time.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

```plaintext
glab mr note create [<id> | <branch>] [flags]
```

## Examples

```console
# Add a comment to merge request 123
glab mr note create 123 -m "Looks good to me!"

# Add a comment to the current branch's merge request
glab mr note create -m "LGTM"

# Open editor to compose the message
glab mr note create 123

# Pipe from stdin
echo "LGTM" | glab mr note create 123

# Skip if already posted
glab mr note create 123 -m "LGTM" --unique

# Reply to an existing discussion thread
glab mr note create 123 --reply abc12345 -m "I agree!"

```

## Options

```plaintext
  -m, --message string   Comment or note message.
      --reply string     Reply to an existing discussion. Accepts a full discussion ID or a prefix of 8 or more characters.
      --unique           Don't create a note if a note with the same body already exists. Reads all MR comments first.
```

## Options inherited from parent commands

```plaintext
  -h, --help              Show help for this command.
  -R, --repo OWNER/REPO   Select another repository. Can use either OWNER/REPO or `GROUP/NAMESPACE/REPO` format. Also accepts full URL or Git URL.
```
