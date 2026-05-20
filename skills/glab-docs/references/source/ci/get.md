---
title: '`glab ci get`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Get JSON of a running CI/CD pipeline on the current or other specified branch.

## Synopsis

Defaults to the current branch. Use `--pipeline-id` to specify a pipeline
instead of fetching the latest for a branch.

Use `--merge-request` to target the head pipeline of a specific merge
request by IID. This differs from `--branch` when the MR's head pipeline
diverges from the latest pipeline on its source branch — for example, forks or
detached pipelines.

Use `--status` to filter jobs by state (passed through to the API's
`scope` parameter).

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

# Show only failed jobs for the head pipeline of MR !42
glab ci get --merge-request=42 --status=failed --with-job-details
```

## Options

```plaintext
  -b, --branch string       Check pipeline status for a branch. (default current branch)
      --merge-request int   Show the pipeline for the given merge request <iid>.
  -F, --output string       Format output. Options: text, json. (default "text")
  -p, --pipeline-id int     Provide pipeline ID.
  -s, --status string       Show only jobs in the given <state>. Passed through to the API's scope parameter.
  -d, --with-job-details    Show extended job information. (default false)
      --with-variables      Show variables in pipeline. Requires the Maintainer role. (default false)
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
