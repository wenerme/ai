---
title: '`glab cluster agent check_manifest_usage`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Check agent configuration files for built-in GitOps manifests usage. (EXPERIMENTAL)

## Synopsis

Checks the descendants of a group for registered agents with configuration files that rely on the deprecated GitOps manifests settings.
The output can be piped to a tab-separated value (TSV) file.

This feature is an experiment and is not ready for production use.
It might be unstable or removed at any time.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

```plaintext
glab cluster agent check_manifest_usage [flags]
```

## Options

```plaintext
  -a, --agent-page int       Page number for projects. (default 1)
  -A, --agent-per-page int   Number of projects to list per page. (default 30)
  -g, --group string         Group ID to check.
  -p, --page int             Page number for projects. (default 1)
  -P, --per-page int         Number of projects to list per page. (default 30)
  -r, --recursive            Recursively check subgroups.
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
