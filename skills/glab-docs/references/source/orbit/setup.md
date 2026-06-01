---
title: '`glab orbit setup`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Guided setup for Orbit: verify access, install the skill, install the local CLI. (EXPERIMENTAL)

## Synopsis

Run a guided onboarding for the GitLab Knowledge Graph (Orbit):

1. Verify that Orbit is reachable and enabled for your user.
2. Install the Orbit agent skill so AI coding agents can discover it.
3. Install the Orbit local CLI binary for indexing a local copy of the graph.

Each step after the reachability check prompts for confirmation. Use
`--yes` to accept every prompt, or `--skip-skill` / `--skip-local` to
opt out of individual steps. Use `--upgrade` to re-fetch the skill and
update the local binary in place.

Exit codes match `glab orbit remote` — see `glab orbit remote --help`.

This feature is an experiment and is not ready for production use.
It might be unstable or removed at any time.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

```plaintext
glab orbit setup [flags]
```

## Examples

```console
# Interactive setup (prompts for each step)
$ glab orbit setup

# Non-interactive: accept every prompt
$ glab orbit setup --yes

# Install the skill globally (~/.agents/skills/) instead of in the current repo
$ glab orbit setup --global

# Re-fetch the skill and update the local CLI binary
$ glab orbit setup --upgrade

# Verify reachability only
$ glab orbit setup --skip-skill --skip-local

```

## Options

```plaintext
  -g, --global ~/.agents/skills/   Install the Orbit skill at user scope (~/.agents/skills/). (default false)
      --hostname gitlab.com        GitLab hostname to verify. Defaults to the current repository's host or gitlab.com.
      --path <path>                Install the Orbit skill to the directory at <path>.
      --skip-local                 Skip the local CLI binary install step. (default false)
      --skip-skill                 Skip the agent-skill install step. (default false)
      --upgrade                    Re-fetch the skill and update the local CLI binary in place. (default false)
  -y, --yes                        Skip every confirmation prompt. (default false)
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
