---
title: '`glab issue note`'
stage: AI Coding
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Comment on an issue in GitLab.

## Synopsis

Opens an editor for the comment if you don't use `--message`.

`--attach` uploads a file and references it at the end of the comment. Repeat the flag for more than one file, or pass `-` to read the file from standard input. An attachment is content on its own, so a comment with only `--attach` skips the editor.

The `--attach` flag is an experiment. It might be
unstable or removed at any time, and is not ready for production use.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

```plaintext
glab issue note <issue-id> [flags]
```

## Aliases

```plaintext
comment
```

## Examples

```console
# Comment on issue 123, opening an editor for the message
glab issue note 123

# Comment with the message given inline
glab issue note 123 --message "Looking into this now."

# Attach a screenshot alongside the message
glab issue note 123 --message "Here is the repro." --attach ./screenshot.png

# Attach an image piped from the clipboard
pngpaste - | glab issue note 123 --attach -
```

## Options

```plaintext
      --attach stringArray   (EXPERIMENTAL) Upload a file and reference it at the end of the comment. Use "-" to read the file from standard input. Repeat the flag to attach multiple files.
  -m, --message string       Message text.
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
