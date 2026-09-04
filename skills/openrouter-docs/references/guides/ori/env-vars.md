> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Ori environment variables

> Every environment variable Ori reads, what it accepts, and where an administrator can set it fleet-wide

Ori reads its settings from environment variables. You can export them in your
shell, or put them in a config file so they apply to every run.

## Where variables come from

Every setting resolves through one list, and the first source that carries a
valid value for it wins:

1. The machine policy file: `/etc/ori/config.json`, or
   `%ProgramData%\ori\config.json` on Windows
2. A command-line flag, for the six update flags listed below
3. The process environment, meaning whatever your shell exports
4. `.ori/config.json` in the working directory
5. `~/.ori/config.json` in your home directory
6. Ori's own default

A project file beats your home file, matching how most tools treat local
configuration. The machine policy file sits above everything, including flags,
so a policy your administrator sets cannot be turned off from a shell or a
project.

Only `--auto-update`, `--auto-update-restart`, `--update-interval`,
`--drain-timeout`, `--alpha`, and `--stable` name a setting that also has a
variable, so those are the only flags in the list. Every other flag is an
argument to its command and does not take part.

A config file can carry an `env` object of plain strings, named fields, or
both. The two spellings feed the same setting:

```json theme={null}
{
  "channel": "stable",
  "autoUpdate": { "level": "patch", "intervalMs": 21600000 },
  "env": {
    "ORI_DISABLE_UPDATES": "1"
  }
}
```

A missing file is fine, and a malformed one contributes nothing. A value Ori
cannot make sense of is skipped per variable, so one bad entry does not
discard the rest of the file, and the next source down answers instead.

Config files currently set the update and installation variables plus the
sign-in method Ori remembers. The other variables on this page are read from
the environment only, so put those in your shell or your process manager for
now.

Anywhere the table below says a variable is a switch, Ori treats an empty
value, `0`, and `false` as off, and any other value as on. `1` is the
conventional way to turn one on.

## Updates and installation

| Variable                  | Accepts                          | What it does                                                                                                                                                                                               |
| ------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ORI_DISABLE_UPDATES`     | switch                           | Turns off automatic updates, hides the update notice, and makes `ori update` refuse to replace the install. Set this when your builds arrive through your own tooling.                                     |
| `ORI_DISABLE_AUTOUPDATER` | switch                           | Turns off automatic updates and hides the update notice. An explicit `ori update` still runs.                                                                                                              |
| `ORI_AUTO_UPDATE`         | `off`, `patch`, `minor`, `major` | Largest version jump `ori start` and the TUI may install on their own. Defaults to `off`.                                                                                                                  |
| `ORI_CHANNEL`             | `stable`, `alpha`                | Release channel `ori update` and the background updater follow. With no channel set anywhere, an alpha build stays on alpha and everything else takes stable.                                              |
| `ORI_NO_UPDATE_CHECK`     | switch                           | Skips the background update check for this run. An explicit `--auto-update` flag overrides it wherever it came from, machine policy included, so use `ORI_DISABLE_AUTOUPDATER` for a fleet you want quiet. |
| `ORI_UPDATE_INTERVAL`     | milliseconds                     | How long Ori waits between background update checks.                                                                                                                                                       |
| `ORI_UPDATE_RESTART`      | `reexec`, `exit`                 | Whether a long-running Ori re-executes itself after an update or exits for your supervisor to restart.                                                                                                     |
| `ORI_DRAIN_TIMEOUT`       | milliseconds                     | How long an update waits for in-flight work to finish before restarting.                                                                                                                                   |
| `ORI_INSTALL_DIR`         | directory path                   | Where the installer writes the `ori` binary. By default it reinstalls over the `ori` already on your `PATH`, and only falls back to `~/.local/bin` for a first install.                                    |

## Sign-in

| Variable                       | Accepts | What it does                                                                                                                                      |
| ------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ORI_DISABLE_OAUTH_LOGIN`      | switch  | Removes browser sign-in from `ori login`.                                                                                                         |
| `ORI_DISABLE_API_KEY_LOGIN`    | switch  | Removes pasting an API key from `ori login`.                                                                                                      |
| `ORI_DISABLE_ENV_KEY_LOGIN`    | switch  | Stops Ori accepting an `OPENROUTER_API_KEY` it finds in the environment.                                                                          |
| `ORI_REQUIRE_LOGIN`            | switch  | Refuses to run on any credential that `ori login` did not establish, including an inherited `OPENROUTER_API_KEY` or one in a project dotenv file. |
| `ORI_FORCE_OPENROUTER_API_KEY` | switch  | Always uses the `OPENROUTER_API_KEY` from the environment instead of a stored credential.                                                         |

## Models and output

| Variable                  | Accepts                   | What it does                                                                            |
| ------------------------- | ------------------------- | --------------------------------------------------------------------------------------- |
| `ORI_MODEL`               | model slug                | Default model for `ori harness` and `ori code`.                                         |
| `ORI_OPENROUTER_BASE_URL` | URL                       | OpenRouter API base URL to send inference to.                                           |
| `ORI_OUTPUT`              | `human`, `json`           | Output mode for commands that support both. Ori otherwise picks `human` for a terminal. |
| `ORI_TELEMETRY`           | `0` or `false` to disable | Turns off Ori's usage telemetry.                                                        |

## Terminal appearance

| Variable                    | Accepts                                                                              | What it does                                                     |
| --------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| `ORI_TUI_THEME`             | palette name                                                                         | Built-in palette for the chat TUI.                               |
| `ORI_TUI_THEME_FILE`        | file path                                                                            | Palette file to load instead of a built-in one.                  |
| `ORI_TUI_DENSITY`           | `compact`, `cozy`, `verbose`                                                         | How much vertical space the transcript uses. Defaults to `cozy`. |
| `ORI_TUI_WORKING_INDICATOR` | `verb`, `tokens`, `minimal`, `wave`, `bar`, `shimmer`, `glider`, `quadrant`, `meter` | Animation shown while the agent works. Defaults to `glider`.     |
| `ORI_TUI_WORKING_VERB_MODE` | `rotating`, `gliding-only`                                                           | Whether the working line rotates through verbs.                  |
| `ORI_TUI_WORKING_CADENCE`   | `calm`, `steady`, `fast`                                                             | Animation speed of the working indicator.                        |
| `ORI_TUI_WORKSPACE_ROW`     | `top`, `bottom`, `off`                                                               | Where the workspace row sits, or `off` to hide it.               |

## Files

| Variable           | Accepts        | What it does                                                                               |
| ------------------ | -------------- | ------------------------------------------------------------------------------------------ |
| `ORI_STATE_DIR`    | directory path | Where Ori keeps its local state database. See [where Ori writes files](/docs/guides/ori/files). |
| `ORI_LOG_MAX_RUNS` | count          | How many run logs Ori keeps before pruning the oldest.                                     |

## Locking updates for a fleet

To ship Ori through your own tooling and stop users updating it themselves,
write this to `/etc/ori/config.json` on each machine, or to
`%ProgramData%\ori\config.json` on Windows:

```json theme={null}
{
  "env": {
    "ORI_DISABLE_UPDATES": "1"
  }
}
```

Ori then stops checking for releases, never prints an update notice, and
answers `ori update` with a message saying the installation is managed by your
organization. Use `ORI_DISABLE_AUTOUPDATER` instead if you want the background
updater quiet while users can still update by hand. Add `"channel": "stable"`
to the same file to hold the fleet on one channel, including against a
`--alpha` flag.
