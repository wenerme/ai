---
title: '`glab ci config compile`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

View the merged CI/CD configuration.

## Synopsis

Compiles your CI/CD configuration and prints the fully merged YAML
to standard output.

All `include` directives are resolved,
and any extended jobs are flattened into their final form.

By default, glab compiles the `.gitlab-ci.yml` file in the
current directory. To compile a different file, pass its path as an
argument.

You must run this command from a GitLab project repository.

```plaintext
glab ci config compile [<path>] [flags]
```

## Examples

```console
# Compile .gitlab-ci.yml in the current directory
glab ci config compile

# Compile a specific file in the current directory
glab ci config compile .gitlab-ci.yml

# Compile a file at a relative path
glab ci config compile path/to/.gitlab-ci.yml

```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
