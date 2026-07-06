### Configuring the Shell

There are a number of ways to configure the shell for shell recipes, which are
the default when a recipe does not start with a `#!` shebang. Their precedence,
from highest to lowest, is:

1. The `--shell` and `--shell-arg` command line options. Passing either of
   these will cause `just` to ignore any settings in the current justfile.
2. `set windows-shell := [...]` (deprecated)
3. `set windows-powershell` (deprecated)
4. `set shell := [...]`

Use the `[windows]` and `[unix]` attributes with `set shell` to use different a
shells on Windows.
