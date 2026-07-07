---
title: '`glab security config`'
stage: AI Coding
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Configure security scan profiles for a project.

## Synopsis

Enable, disable, or inspect security scan profiles for a project.

A profile bundles a set of security scans, such as SAST, secret
detection, dependency scanning, or container scanning, or post-scan
processing on given scans, like dependency scanning auto remediation.

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```

## Subcommands

- [`disable`](disable.md)
- [`enable`](enable.md)
- [`status`](status.md)
