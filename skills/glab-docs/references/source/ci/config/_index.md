---
title: '`glab ci config`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

View and inspect GitLab CI/CD configuration.

## Synopsis

View and inspect the CI/CD configuration for your GitLab project.

Use the `compile` subcommand to view the fully merged
`.gitlab-ci.yml` file, including all `include` directives resolved
to their final form.

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```

## Subcommands

- [`compile`](compile.md)
