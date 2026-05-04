---
title: '`glab ci lint`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Checks if your `.gitlab-ci.yml` file is valid.

```plaintext
glab ci lint [flags]
```

## Examples

```console
# Uses .gitlab-ci.yml in the current directory
glab ci lint
glab ci lint .gitlab-ci.yml
glab ci lint path/to/.gitlab-ci.yml
```

## Options

```plaintext
      --dry-run        Run pipeline creation simulation.
      --include-jobs   Response includes the list of jobs that would exist in a static check or pipeline simulation.
      --ref string     When 'dry-run' is true, sets the branch or tag context for validating the CI/CD YAML configuration.
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
