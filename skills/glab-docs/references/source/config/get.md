---
title: '`glab config get`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Prints the value of a given configuration key.

```plaintext
glab config get <key> [flags]
```

## Examples

```console
$ glab config get editor
vim

$ glab config get glamour_style
notty
```

## Options

```plaintext
  -g, --global        Read from global config file (~/.config/glab-cli/config.yml). (default checks 'Environment variables → Local → Global')
      --host string   Get per-host setting.
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
