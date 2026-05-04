---
title: '`glab label create`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Create labels for a repository or project.

```plaintext
glab label create [flags]
```

## Aliases

```plaintext
new
```

## Examples

```console
glab label create
glab label new
glab label create -R owner/repo
```

## Options

```plaintext
  -c, --color string         Color of the label, in plain or HEX code. (default "#428BCA")
  -d, --description string   Label description.
  -n, --name string          Name of the label.
  -p, --priority int         Label priority.
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
