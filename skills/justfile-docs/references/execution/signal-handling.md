### Signal Handling

[Signals](https://en.wikipedia.org/wiki/Signal_(IPC)) are messages sent to
running programs to trigger specific behavior. For example, `SIGINT` is sent to
all processes in the terminal foreground process group when `CTRL-C` is pressed.

`just` tries to exit when requested by a signal, but it also tries to avoid
leaving behind running child processes, two goals which are somewhat in
conflict.

If `just` exits leaving behind child processes, the user will have no recourse
but to `ps aux | grep` for the children and manually `kill` them, a tedious
endeavor.

#### Fatal Signals

`SIGHUP`, `SIGINT`, and `SIGQUIT` are generated when the user closes the
terminal, types `ctrl-c`, or types `ctrl-\`, respectively, and are sent to all
processes in the foreground process group.

`SIGTERM` is the default signal sent by the `kill` command, and is delivered
only to its intended victim.

When a child process is not running, `just` will exit immediately on receipt of
any of the above signals.

When a child process *is* running, `just` will wait until it terminates, to
avoid leaving it behind.

Additionally, on receipt of `SIGTERM`, `just` will forward `SIGTERM` to any
running children<sup>1.41.0</sup>, since unlike other fatal signals, `SIGTERM`,
was likely sent to `just` alone.

Regardless of whether a child process terminates successfully after `just`
receives a fatal signal, `just` halts execution.

#### `SIGINFO`

`SIGINFO` is sent to all processes in the foreground process group when the
user types `ctrl-t` on
[BSD](https://en.wikipedia.org/wiki/Berkeley_Software_Distribution)-derived
operating systems, including MacOS, but not Linux.

`just` responds by printing a list of all child process IDs and
commands<sup>1.41.0</sup>.

#### Windows

On Windows, `just` behaves as if it had received `SIGINT` when the user types
`ctrl-c`. Other signals are unsupported.

Changelog
---------

A changelog for the latest release is available in
[CHANGELOG.md](https://raw.githubusercontent.com/casey/just/master/CHANGELOG.md).
Changelogs for previous releases are available on
[the releases page](https://github.com/casey/just/releases). `just --changelog`
can also be used to make a `just` binary print its changelog.

Miscellanea
-----------
