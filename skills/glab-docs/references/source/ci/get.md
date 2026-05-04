---
title: '`glab ci get`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Get JSON of a running CI/CD pipeline on the current or other specified branch.

```plaintext
glab ci get [flags]
```

## Aliases

```plaintext
stats
```

## Examples

```console
glab ci get
glab ci -R some/project -p 12345
```

## Options

```plaintext
  -b, --branch string      Check pipeline status for a branch. (default current branch)
  -F, --output string      Format output. Options: text, json. (default "text")
  -p, --pipeline-id int    Provide pipeline ID.
  -d, --with-job-details   Show extended job information.
      --with-variables     Show variables in pipeline. Requires the Maintainer role.
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
