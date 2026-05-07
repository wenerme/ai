---
title: '`glab skills install`'
stage: Create
group: Code Review
info: To determine the technical writer assigned to the Stage/Group associated with this page, see <https://handbook.gitlab.com/handbook/product/ux/technical-writing/#assignments>
---

Install glab's bundled agent skills. (EXPERIMENTAL)

## Synopsis

Install the bundled `SKILL.md` file to `.agents/skills/`, the
cross-agent standard defined by the Agent Skills specification. This works with
GitLab Duo Agent Platform, Claude Code, Codex, Gemini CLI, and any other
compliant agent.

Install scope:

- By default, skills are installed for the current project, in `.agents/skills/`
  at the root of the current Git repository.
- Use `--global` to install skills for the current user, in
  `~/.agents/skills/`.
- Use `--path` to install skills to a custom directory. The path is resolved
  relative to the current working directory, not the repository root.

To overwrite existing skill files, use `--force`.

This feature is an experiment and is not ready for production use.
It might be unstable or removed at any time.
For more information, see
<https://docs.gitlab.com/policy/development_stages_support/>.

```plaintext
glab skills install [flags]
```

## Examples

```console
# Install skills in the current project (default)
glab skills install

# Install skills globally (user scope)
glab skills install --global

# Install skills to a custom directory
glab skills install --path /path/to/skills

# Overwrite existing skill files
glab skills install --force

```

## Options

```plaintext
  -f, --force         Overwrite existing skill files.
  -g, --global        Install skills at user scope (~/.agents/skills/).
      --path string   Install skills to the directory at <path>.
```

## Options inherited from parent commands

```plaintext
  -h, --help   Show help for this command.
```
