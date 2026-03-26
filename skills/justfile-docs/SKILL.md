---
name: justfile-docs
description: "justfile (just) documentation — a command runner with make-inspired syntax. Covers recipes (parameters, dependencies, shebang/script recipes), justfile language (settings, strings, functions, constants, attributes, conditionals, backticks), modules/imports, variables, shell configuration, and CLI options. USE THIS SKILL WHEN the user asks about just, justfile syntax, just recipes, just modules, just functions, or just settings."
version: 0.1.0
---

# justfile Documentation

Official docs for [just](https://just.systems) — a handy way to save and run project-specific commands.

CRITICAL: grep `references/` for keywords before answering.

## Reference Index (87 docs)

### Introduction

- `references/introduction.md` — Overview, features, and comparison with make

### Installation (7 docs)

- `references/installation/prerequisites.md` — Prerequisites and platform support
- `references/installation/packages.md` — Package manager installation (brew, apt, cargo, etc.)
- `references/installation/pre-built-binaries.md` — Pre-built binary downloads
- `references/installation/github-actions.md` — GitHub Actions setup
- `references/installation/docker.md` — Docker usage
- `references/installation/release-rss-feed.md` — Release RSS feed
- `references/installation/node-js-installation.md` — Node.js/npm installation

### Editor Support (12 docs)

- `references/editor-support/vim-and-neovim.md` — Vim and Neovim syntax highlighting
- `references/editor-support/emacs.md` — Emacs mode
- `references/editor-support/visual-studio-code.md` — VS Code extension
- `references/editor-support/jetbrains-ides.md` — JetBrains plugin
- `references/editor-support/kakoune.md` — Kakoune support
- `references/editor-support/helix.md` — Helix support
- `references/editor-support/sublime-text.md` — Sublime Text package
- `references/editor-support/micro.md` — Micro editor plugin
- `references/editor-support/zed.md` — Zed editor support
- `references/editor-support/other-editors.md` — Other editor integrations
- `references/editor-support/language-server-protocol.md` — LSP support
- `references/editor-support/model-context-protocol.md` — MCP server

### Recipes (14 docs)

- `references/recipes/the-default-recipe.md` — Default recipe behavior
- `references/recipes/listing-available-recipes.md` — Listing recipes (`just --list`)
- `references/recipes/invoking-multiple-recipes.md` — Running multiple recipes
- `references/recipes/aliases.md` — Recipe aliases
- `references/recipes/recipe-parameters.md` — Parameters, default values, variadic params
- `references/recipes/dependencies.md` — Recipe dependencies and ordering
- `references/recipes/shebang-recipes.md` — Shebang recipes (Python, Bash, etc.)
- `references/recipes/script-recipes.md` — Script recipes (`[script]` attribute)
- `references/recipes/script-and-shebang-recipe-temporary-files.md` — Temporary file handling
- `references/recipes/python-recipes-with-uv.md` — Python recipes with `uv`
- `references/recipes/safer-bash-shebang-recipes.md` — Safer bash recipes (`set -euxo`)
- `references/recipes/private-recipes.md` — Private/hidden recipes
- `references/recipes/quiet-recipes.md` — Quiet and silent execution
- `references/recipes/selecting-recipes-to-run-with-an-interactive-chooser.md` — Interactive chooser (`--choose`)

### Language (12 docs)

- `references/language/settings.md` — Justfile settings (dotenv, shell, tempdir, etc.)
- `references/language/documentation-comments.md` — Doc comments for recipes
- `references/language/expressions-and-substitutions.md` — Expressions and `{{ }}`
- `references/language/strings.md` — String literals and escapes
- `references/language/sigils.md` — `@`, `-`, `?` line prefixes
- `references/language/functions.md` — Built-in functions (path, string, env, etc.)
- `references/language/constants.md` — Built-in constants (HEX, CLEAR, NEWLINE, etc.)
- `references/language/attributes.md` — Recipe attributes (`[confirm]`, `[no-cd]`, `[group]`, etc.)
- `references/language/groups.md` — Recipe grouping
- `references/language/command-evaluation-using-backticks.md` — Backtick evaluation
- `references/language/conditional-expressions.md` — `if`/`else` expressions
- `references/language/stopping-execution-with-error.md` — `error()` function

### Variables (4 docs)

- `references/variables/setting-variables-from-the-command-line.md` — CLI variable overrides
- `references/variables/getting-and-setting-environment-variables.md` — Environment variables and `env()`
- `references/variables/setting-variables-in-a-recipe.md` — Recipe-local variables
- `references/variables/sharing-environment-variables-between-recipes.md` — Sharing env vars

### Execution (10 docs)

- `references/execution/working-directory.md` — Working directory behavior
- `references/execution/changing-the-working-directory-in-a-recipe.md` — Per-recipe directory changes
- `references/execution/indentation.md` — Indentation rules
- `references/execution/multi-line-constructs.md` — Multi-line recipes and backslash continuation
- `references/execution/command-line-options.md` — CLI flags reference
- `references/execution/configuring-the-shell.md` — Shell configuration
- `references/execution/timestamps.md` — Recipe timestamps
- `references/execution/signal-handling.md` — Signal handling (Ctrl-C)
- `references/execution/re-running-recipes-when-files-change.md` — File watching with `--watch`
- `references/execution/parallelism.md` — Parallel execution

### Organization (9 docs)

- `references/organization/imports.md` — `import` statement
- `references/organization/modules.md` — `mod` statement and submodules
- `references/organization/invoking-justfiles-in-other-directories.md` — Cross-directory invocation
- `references/organization/hiding-justfiles.md` — Hidden justfiles (`.justfile`)
- `references/organization/just-scripts.md` — Executable just scripts
- `references/organization/formatting-and-dumping-justfiles.md` — `just --fmt` and `--dump`
- `references/organization/fallback-to-parent-justfiles.md` — Parent directory fallback
- `references/organization/global-and-user-justfiles.md` — Global and user justfiles
- `references/organization/remote-justfiles.md` — Remote justfile fetching

### Shell (2 docs)

- `references/shell/shell-alias.md` — Shell alias for just
- `references/shell/shell-completion-scripts.md` — Completion scripts (bash, zsh, fish, etc.)

### FAQ (2 docs)

- `references/faq/what-are-the-idiosyncrasies-of-make-that-just-avoids.md` — Make vs just comparison
- `references/faq/what-s-the-relationship-between-just-and-cargo-build-scripts.md` — Just vs Cargo build scripts

### Misc (8 docs)

- `references/misc/man-page.md` — Man page generation
- `references/misc/grammar.md` — Formal grammar reference
- `references/misc/just-sh.md` — just.sh bootstrapping script
- `references/misc/node-js-package-json-script-compatibility.md` — package.json compatibility
- `references/misc/paths-on-windows.md` — Windows path handling
- `references/misc/printing-complex-strings.md` — Printing complex strings
- `references/misc/avoiding-argument-splitting.md` — Avoiding argument splitting
- `references/misc/alternatives-and-prior-art.md` — Alternatives (make, task, cargo-make, etc.)

### Contributing (6 docs)

- `references/contributing/getting-started.md` — Getting started contributing
- `references/contributing/contribution-workflow.md` — Contribution workflow
- `references/contributing/hints.md` — Development hints
- `references/contributing/janus.md` — Janus binary
- `references/contributing/minimum-supported-rust-version.md` — MSRV policy
- `references/contributing/new-releases.md` — Release process
