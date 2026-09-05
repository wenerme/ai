> ## Documentation Index
> Fetch the complete documentation index at: https://openrouter.ai/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Ori configuration

> How to configure Ori, from a single shell to a managed fleet, plus every setting it reads

Ori has one set of settings and several ways to supply them. A setting is
named the same everywhere, so the same name works in your shell, in a config
file, and in an MDM profile. Pick the mechanism that matches who owns the
decision, then use the [reference](#settings-reference) at the bottom of this
page for the settings themselves.

## Ways to configure Ori

* **Your shell.** Export a variable for the current session, or put it in your
  shell profile or process manager. Good for one person on one machine.
* **`~/.ori/config.json`.** Your own defaults, applied to every project you
  work on.
* **`.ori/config.json` in a project.** Settings that belong to a repository and
  should apply to everyone working in it.
* **Command-line flags.** Six update settings also have flags, listed
  [below](#command-line-flags).
* **A machine policy file.** `/etc/ori/config.json`, or
  `%ProgramData%\ori\config.json` on Windows. Owned by whoever administers the
  machine, and it beats a flag.
* **macOS managed preferences.** An MDM payload for the
  `com.openrouter.ori` preference domain. Beats everything, including the
  machine file.

If you administer a fleet, read [Configuring managed
machines](#configuring-managed-machines).

## Which source wins

Every setting resolves through the same list, and the first source that
carries a valid value for it wins:

1. macOS managed preferences (`com.openrouter.ori`)
2. The machine policy file, `/etc/ori/config.json`
3. A command-line flag
4. The process environment, meaning whatever your shell exports
5. `.ori/config.json` in the working directory
6. `~/.ori/config.json` in your home directory
7. Ori's own default

A project file beats your home file, matching how most tools treat local
configuration. The two administrator sources sit above flags, so a policy set
on the machine cannot be turned off from a shell, a project, or a flag. The one
exception is `ORI_NO_UPDATE_CHECK`, which only suppresses the update check when
no `--auto-update` flag is passed; `ORI_DISABLE_AUTOUPDATER` and
`ORI_DISABLE_UPDATES` are the settings to use when a policy has to hold.

A missing file is fine, and a malformed one contributes nothing. A value Ori
cannot make sense of is skipped per setting, so one bad entry does not discard
the rest of a file, and the next source down answers instead.

Where a setting below is described as a switch, Ori reads an empty value, `0`,
and `false` as off, and any other value as on. `1` is the conventional way to
turn one on.

### Config file shape

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

### Command-line flags

Only `--auto-update`, `--auto-update-restart`, `--update-interval`,
`--drain-timeout`, `--alpha`, and `--stable` name a setting that also has a
variable, so those are the only flags that take part in the list above. Every
other flag is an argument to its command.

## Configuring managed machines

Two mechanisms are meant for administrators, and both outrank anything a user
can set. Every setting in the [reference](#settings-reference) works in either
one.

### macOS: managed preferences

Deliver a custom-settings payload for the preference domain
`com.openrouter.ori` from Jamf, Kandji, Intune, or any MDM that writes
managed preferences. Use the setting name as the key. Booleans, numbers, and
strings all work; Ori converts them:

```xml theme={null}
<dict>
    <key>ORI_MODEL</key>
    <string>anthropic/claude-sonnet-4.5</string>
    <key>ORI_DISABLE_OAUTH_LOGIN</key>
    <true/>
    <key>ORI_UPDATE_INTERVAL</key>
    <integer>21600000</integer>
</dict>
```

Ori reads the per-user profile at
`/Library/Managed Preferences/<username>/com.openrouter.ori.plist` and the
device-wide one at `/Library/Managed Preferences/com.openrouter.ori.plist`.
Nothing else on the machine can override what lands there.

### Any platform: the machine policy file

Write JSON to `/etc/ori/config.json` (or `%ProgramData%\ori\config.json` on
Windows) with your settings in the `env` object:

```json theme={null}
{
  "channel": "stable",
  "env": {
    "ORI_DISABLE_UPDATES": "1",
    "ORI_REQUIRE_LOGIN": "1",
    "ORI_MODEL": "anthropic/claude-sonnet-4.5"
  }
}
```

Ship the file with the rest of your machine configuration, the same way you
ship any other policy file. A user cannot remove it without administrator
rights, and no flag other than `--auto-update` against
`ORI_NO_UPDATE_CHECK` can argue with it.

### Two recipes

**Ship Ori through your own tooling.** Set `ORI_DISABLE_UPDATES` to `1`. Ori
stops checking for releases, never prints an update notice, and answers
`ori update` with a message saying the installation is managed by your
organization. Use `ORI_DISABLE_AUTOUPDATER` instead to keep the background
updater quiet while users can still update by hand, and add
`"channel": "stable"` to hold the fleet on one channel even against an
`--alpha` flag.

**Force browser sign-in.** Set `ORI_DISABLE_API_KEY_LOGIN` and
`ORI_DISABLE_ENV_KEY_LOGIN` to `1` so the only way in is browser sign-in, and
`ORI_REQUIRE_LOGIN` to `1` so an `OPENROUTER_API_KEY` a developer happens to
have exported is refused rather than spent. These settings decide how a
credential may be obtained, not which OpenRouter account or organization it
belongs to, so pair them with your own account provisioning if membership
matters.

## Settings reference

Every name below works as an environment variable, as an `env` entry in any
config file, as a managed-preferences key, and in the machine policy file.

<Note>
  Ori 0.14 and earlier read less than that. Config files and the machine
  policy file carry the update and installation settings plus the sign-in
  method Ori remembers, every other name comes from the environment only, and
  macOS managed preferences are not read at all, so a profile you deploy to
  those versions has no effect. Export the setting in the environment until
  the fleet is on a newer build.
</Note>

### Updates and installation

| Setting                   | Accepts                          | What it does                                                                                                                                                                                               |
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

### Sign-in

| Setting                        | Accepts | What it does                                                                                                                                      |
| ------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ORI_DISABLE_OAUTH_LOGIN`      | switch  | Removes browser sign-in from `ori login`.                                                                                                         |
| `ORI_DISABLE_API_KEY_LOGIN`    | switch  | Removes pasting an API key from `ori login`.                                                                                                      |
| `ORI_DISABLE_ENV_KEY_LOGIN`    | switch  | Stops Ori accepting an `OPENROUTER_API_KEY` it finds in the environment.                                                                          |
| `ORI_REQUIRE_LOGIN`            | switch  | Refuses to run on any credential that `ori login` did not establish, including an inherited `OPENROUTER_API_KEY` or one in a project dotenv file. |
| `ORI_FORCE_OPENROUTER_API_KEY` | switch  | Always uses the `OPENROUTER_API_KEY` from the environment instead of a stored credential.                                                         |

### Models and output

| Setting                   | Accepts                   | What it does                                                                            |
| ------------------------- | ------------------------- | --------------------------------------------------------------------------------------- |
| `ORI_MODEL`               | model slug                | Default model for `ori harness` and `ori code`.                                         |
| `ORI_OPENROUTER_BASE_URL` | URL                       | OpenRouter API base URL to send inference to.                                           |
| `ORI_OUTPUT`              | `human`, `json`           | Output mode for commands that support both. Ori otherwise picks `human` for a terminal. |
| `ORI_TELEMETRY`           | `0` or `false` to disable | Turns off Ori's usage telemetry.                                                        |

### Terminal appearance

| Setting                     | Accepts                                                                              | What it does                                                     |
| --------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| `ORI_TUI_THEME`             | palette name                                                                         | Built-in palette for the chat TUI.                               |
| `ORI_TUI_THEME_FILE`        | file path                                                                            | Palette file to load instead of a built-in one.                  |
| `ORI_TUI_DENSITY`           | `compact`, `cozy`, `verbose`                                                         | How much vertical space the transcript uses. Defaults to `cozy`. |
| `ORI_TUI_WORKING_INDICATOR` | `verb`, `tokens`, `minimal`, `wave`, `bar`, `shimmer`, `glider`, `quadrant`, `meter` | Animation shown while the agent works. Defaults to `glider`.     |
| `ORI_TUI_WORKING_VERB_MODE` | `rotating`, `gliding-only`                                                           | Whether the working line rotates through verbs.                  |
| `ORI_TUI_WORKING_CADENCE`   | `calm`, `steady`, `fast`                                                             | Animation speed of the working indicator.                        |
| `ORI_TUI_WORKSPACE_ROW`     | `top`, `bottom`, `off`                                                               | Where the workspace row sits, or `off` to hide it.               |

### Files

| Setting            | Accepts        | What it does                                                                               |
| ------------------ | -------------- | ------------------------------------------------------------------------------------------ |
| `ORI_STATE_DIR`    | directory path | Where Ori keeps its local state database. See [where Ori writes files](/docs/guides/ori/files). |
| `ORI_LOG_MAX_RUNS` | count          | How many run logs Ori keeps before pruning the oldest.                                     |
