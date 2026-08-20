# Commands

These commands can be invoked with `zellij [SUBCOMMAND]`.
For more details, each subcommand has its own help section when run with the
`--help` flag (`zellij [SUBCOMMAND] --help`).

## `attach [session-name]`
short: `a`

Zellij will attempt to attach to an already running session, with the name
`[session-name]`.
If given no `[session-name]` and there is only one running session, it will attach to that session.

The attach subcommand will also accept the optional `options` subcommand.

## `list-sessions`
short: `ls`

Will list all the names of currently running sessions.

## `kill-sessions [target-session]`
short: `k`

Will kill the session with the name of `[target-session]`, if it is currently
running.

## `kill-all-sessions`
short: `ka`

Will prompt the user to kill all running sessions.

## `options`

Can be used to change the behaviour of zellij on startup.
Will supercede options defined in the config file.
To see a list of options look [here](./command-line-options.md).

## `setup`

Functionality to help with the setup of zellij.

| Flag                                |  Description|
|:------------------------------------|------------------|
| --check                             |  Check the configuration |
| --clean                             |  Start with default configuration|
| --dump-config                       |  Dump the default configuration file to stdout|
| --dump-layout [LAYOUT]      |  Dump a specified default layout file to stdout |
| --generate-completion [SHELL]      |  Generate completions for the specified shell|

# Flags
These flags can be invoked with `zellij --flag`.

| Flag                                |  Description|
|:------------------------------------|------------------|
| --help                             |   Display the help prompt |
| --debug                             |  Gather additional debug information |
| --version                       |  Print version information |
| --layout-string [KDL]           |  Use a raw KDL layout string instead of a layout file |

## `--layout-string`

Takes a [layout](./layouts.md) as a raw KDL string rather than as a path to a layout file. Useful for scripting and for generating layouts on the fly.

If invoked from inside a Zellij session (or with an explicit `--session`), the layout is added to the running session as new tab(s). Otherwise, a new session is started with it.

This flag conflicts with `--layout` and `--new-session-with-layout`.

```
$ zellij --layout-string 'layout { pane split_direction="vertical" { pane; pane; } }'
```

The layout is parsed and validated before being sent to the session, so syntax errors are reported immediately.
