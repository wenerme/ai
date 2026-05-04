---
title: '`glab securefile list`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

List secure files for a project.

```plaintext
glab securefile list [flags]
```

## Aliases

```plaintext
ls
```

## Examples

```console
# List all secure files.
glab securefile list

# List all secure files with 'cmd' alias.
glab securefile ls

# List a specific page of secure files.
glab securefile list --page 2

# List a specific page of secure files, with a custom page size.
glab securefile list --page 2 --per-page 10
```

## Options

```plaintext
  -p, --page int       Page number. (default 1)
  -P, --per-page int   Number of items to list per page. (default 30)
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
