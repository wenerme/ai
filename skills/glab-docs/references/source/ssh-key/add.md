---
title: '`glab ssh-key add`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Add an SSH key to your GitLab account.

## Synopsis

Creates a new SSH key owned by the currently authenticated user.

Requires the '--title' flag.

```plaintext
glab ssh-key add [key-file] [flags]
```

## Examples

```console
# Read ssh key from stdin and upload.
glab ssh-key add -t "my title"

# Read ssh key from specified key file, upload and set the ssh key type to "authentication".
glab ssh-key add ~/.ssh/id_ed25519.pub -t "my title" --usage-type "auth"
```

## Options

```plaintext
  -e, --expires-at string   The expiration date of the SSH key. Uses ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
  -t, --title string        New SSH key's title.
  -u, --usage-type string   Usage scope for the key. Possible values: 'auth', 'signing' or 'auth_and_signing'. Default value: 'auth_and_signing'. (default "auth_and_signing")
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
