---
title: '`glab orbit local`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Run the Orbit local CLI (Experimental)

## Synopsis

Run the Orbit local CLI for the GitLab Knowledge Graph.

The Orbit local CLI lets you index and query a local copy of the GitLab Knowledge
Graph (product name: Orbit). When invoked through `glab`, the binary is
downloaded, verified, and kept up to date for you.

Configuration options:

- `orbit_local_auto_run`: Skip the run confirmation prompt.
- `orbit_local_auto_download`: Skip the download confirmation prompt.

All other arguments and flags are passed through to the Orbit local CLI binary.

For more information, see the [Orbit documentation](https://docs.gitlab.com/orbit/).

This feature is an experiment and is not ready for production use.
It might be unstable or removed at any time.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

```plaintext
glab orbit local [command] [flags]
```

## Examples

```console
# Run the Orbit local CLI
glab orbit local

# Pass any command or flag through to the orbit binary
glab orbit local <command>

# Show this help
glab orbit local --help

# Run without prompts (for use in scripts and non-interactive environments)
glab orbit local --yes

# Install the Orbit local CLI binary
glab orbit local --install

# Install the Orbit local CLI binary without prompts
glab orbit local --install --yes

# Check for and install updates
glab orbit local --update
```

## Options

```plaintext
      --install   Install the Orbit local CLI binary without running it.
      --update    Check for and install updates to the binary.
  -y, --yes       Skip confirmation prompts.
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
