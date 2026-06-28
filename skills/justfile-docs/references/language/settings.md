### Settings

Settings control interpretation and execution. Each setting may be specified at
most once, anywhere in the `justfile`.

For example:

```just
set shell := ["zsh", "-cu"]

foo:
  # this line will be run as `zsh -cu 'ls **/*.txt'`
  ls **/*.txt
```

#### Table of Settings

| Name | Value | Default | Description |
|------|-------|---------|-------------|
| `allow-duplicate-recipes` | boolean | `false` | Allow recipes appearing later in a `justfile` to override earlier recipes with the same name. |
| `allow-duplicate-variables` | boolean | `false` | Allow variables appearing later in a `justfile` to override earlier variables with the same name. |
| `default-list` | boolean | `false` | List recipes instead of running the default recipe. |
| `default-script`<sup>1.52.0</sup> | boolean | `false` | Default recipes to script instead of shell. |
| `dotenv-command`<sup>1.54.0</sup> | string | - | Run a command and load its output as an environment file. |
| `dotenv-filename` | string | - | Load a `.env` file with a custom name, if present. |
| `dotenv-load` | boolean | `false` | Load a `.env` file, if present. |
| `dotenv-override` | boolean | `false` | Override existing environment variables with values from the `.env` file. |
| `dotenv-path` | string | - | Load a `.env` file from a custom path and error if not present. Overrides `dotenv-filename`. |
| `dotenv-required` | boolean | `false` | Error if a `.env` file isn't found. |
| `export` | boolean | `false` | Export all variables as environment variables. |
| `fallback` | boolean | `false` | Search for `justfile` in parent directory if the first recipe on the command line is not found. |
| `guards`<sup>1.47.0</sup> | boolean | `false` | Enable the `?` guard sigil on recipe lines. See [sigils](#sigils). |
| `ignore-comments` | boolean | `false` | Ignore recipe lines beginning with `#`. |
| `lazy`<sup>1.47.0</sup> | boolean | `false` | Don't evaluate unused variables. |
| `lists`<sup>1.53.0</sup> | boolean | `false` | Values may be lists of strings instead of strings. Currently unstable. |
| `minimum-version`<sup>master</sup> | string | - | Error if `just` is older than `minimum-version`. Accepts a string of the form `MAJOR.MINOR.PATCH`, e.g., `"1.55.0"`. |
| `no-cd`<sup>1.51.0</sup> | boolean | `false` | Don't change directory when executing recipes by recipe attribute. |
| `no-exit-message`<sup>1.39.0</sup> | boolean | `false` | Don't print exit messages if recipes fail. |
| `positional-arguments` | boolean | `false` | Pass positional arguments. |
| `quiet` | boolean | `false` | Disable echoing recipe lines before executing. |
| `script-interpreter`<sup>1.33.0</sup> | `[COMMAND, ARGS…]` | `['sh', '-eu']` | Set command used to invoke recipes with empty `[script]` attribute. |
| `shell` | `[COMMAND, ARGS…]` | - | Set command used to invoke recipes and evaluate backticks. |
| `tempdir` | string | - | Create temporary directories in `tempdir` instead of the system default temporary directory. |
| `unstable`<sup>1.31.0</sup> | boolean | `false` | Enable unstable features. |
| `windows-powershell` | boolean | `false` | Use PowerShell on Windows as default shell. (Deprecated. Use `windows-shell` instead.) |
| `windows-shell` | `[COMMAND, ARGS…]` | - | Set the command used to invoke recipes and evaluate backticks. |
| `working-directory`<sup>1.33.0</sup> | string | - | Set the working directory for recipes and backticks, relative to the default working directory. |

Boolean settings can be written as:

```justfile
set NAME
```

Which is equivalent to:

```justfile
set NAME := true
```

Non-boolean settings can be set to both strings and
expressions<sup>1.46.0</sup>.

However, because settings affect the behavior of backticks and many functions,
those expressions may not contain backticks or function calls, directly or
transitively via reference.
