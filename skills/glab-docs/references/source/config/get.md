---
title: '`glab config get`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Prints the value of a given configuration key.

## Synopsis

By default, the lookup order is: environment variables, then the local
repository configuration, then the global configuration. Use `--global` to
read only from the global configuration file, or `--host` to read a
per-host setting.

If the key is not set, nothing is printed.

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
