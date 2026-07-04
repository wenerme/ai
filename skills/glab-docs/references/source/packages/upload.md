---
title: '`glab packages upload`'
stage: AI Coding
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Upload a file to a project's package registry.

## Synopsis

Uploaded files are stored as generic packages: arbitrary files identified
by a package name, version, and file name.

The file is stored under the given package name and version. By default
it keeps its original file name; use `--filename` to store it under a
different name.

By default, the file is uploaded to the current project. Use `--repo`
to target another project.

```plaintext
glab packages upload <file> --name <package> --version <version> [flags]
```

## Aliases

```plaintext
ul
```

## Examples

```console
# Upload a file as version 1.0.0 of package 'my-package'
glab packages upload ./build/app.zip --name my-package --version 1.0.0

# Store the file under a different name
glab packages upload ./build/app.zip --name my-package --version 1.0.0 --filename release.zip

# Use the 'ul' alias and upload to another project
glab packages ul ./build/app.zip -n my-package --version 1.0.0 -R owner/repo

```

## Options

```plaintext
      --filename string   Name to store the file under. Defaults to the local file name.
  -n, --name string       Name of the package.
  -v, --version string    Version of the package.
```

## Options inherited from parent commands

```plaintext
  -h, --help          Show help for this command.
  -R, --repo string   Select another repository. You can use either OWNER/REPO or GROUP/NAMESPACE/REPO. The full URL or Git URL is also accepted.
```
