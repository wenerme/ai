---
title: '`glab variable get`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Get a variable for a project or group.

```plaintext
glab variable get <key> [flags]
```

## Examples

```console
glab variable get VAR_KEY
glab variable get -g GROUP VAR_KEY
glab variable get -s SCOPE VAR_KEY
```

## Options

```plaintext
  -g, --group string    Get variable for a group.
      --jq string       Filter JSON output with a jq expression.
  -F, --output string   Format output as: text, json. (default "text")
  -s, --scope string    The environment_scope of the variable. Values: all (*), or specific environments. (default "*")
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
