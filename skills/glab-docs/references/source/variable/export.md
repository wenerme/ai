---
title: '`glab variable export`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Export variables from a project or group.

## Synopsis

Defaults to the current project. Use `--group` to export
variables for a group. Use `--output` to set the format:
`json` (default), `env` (KEY=VALUE pairs), or
`export` (shell export statements).

```plaintext
glab variable export [flags]
```

## Aliases

```plaintext
ex
```

## Examples

```console
glab variable export
glab variable export --per-page 1000 --page 1
glab variable export --group gitlab-org
glab variable export --group gitlab-org --per-page 1000 --page 1
glab variable export --output json
glab variable export --output env
glab variable export --output export
```

## Options

```plaintext
  -g, --group string    Select a group or subgroup. Ignored if a repository argument is set.
  -F, --output string   Format output as: json, export, env. (default "json")
  -p, --page int        Page number. (default 1)
  -P, --per-page int    Number of items to list per page. (default 100)
  -R, --repo string     Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
  -s, --scope string    The environment_scope of the variables. Values: '*' (default), or specific environments. (default "*")
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
