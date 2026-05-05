---
title: '`glab work-items delete`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Delete a work item in a project or group. (EXPERIMENTAL)

## Synopsis

Delete a work item by its internal ID (IID). This action cannot be undone.

The command behavior depends on context:

- By default, deletes from the current repository's project.
- With `--group`, deletes from the specified group.
- With `--repo`, deletes from the specified project.

This feature is an experiment and is not ready for production use.
It might be unstable or removed at any time.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

```plaintext
glab work-items delete <iid> [flags]
```

## Examples

```console
# Delete a work item by IID from the current project
glab work-items delete 42

# Delete a group work item
glab work-items delete 42 --group my-group

```

## Options

```plaintext
  -g, --group string    Delete a work items from a group or subgroup.
  -F, --output string   Format output as: text, json. (default "text")
  -R, --repo string     Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
