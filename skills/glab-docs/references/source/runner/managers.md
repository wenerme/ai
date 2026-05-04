---
title: '`glab runner managers`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

List runner managers.

## Synopsis

Lists the managers of a runner.

```plaintext
glab runner managers <runner-id> [flags]
```

## Examples

```console
# List managers for runner 1
glab runner managers 1

# List managers as JSON
glab runner managers 1 --output json
```

## Options

```plaintext
  -F, --output string   Format output as: text, json. (default "text")
  -R, --repo string     Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
