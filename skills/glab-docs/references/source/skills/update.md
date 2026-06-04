---
title: '`glab skills update`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Update installed agent skills to the current shipped version. (EXPERIMENTAL)

## Synopsis

Re-fetch installed agent skills from their source (bundled in this
glab binary, or the curated remote registry) and overwrite the on-disk
copy if it differs.

By default, updates only the named skill in every well-known location
it is installed (the current project's '.agents/skills/' and the
user-scope '~/.agents/skills/'). Use --all to update every installed
skill in those locations.

Skills whose on-disk content already matches the source are left alone.
Skills installed via 'glab skills install --path' are not considered —
update only knows about the two well-known locations.

This feature is an experiment and is not ready for production use.
It might be unstable or removed at any time.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

```plaintext
glab skills update [name] [flags]
```

## Examples

```console
# Update the bundled glab skill in every location it is installed
glab skills update glab

# Update every installed skill
glab skills update --all

```

## Options

```plaintext
      --all   Update every installed skill. (default false)
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
