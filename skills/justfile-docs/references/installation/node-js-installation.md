### Node.js Installation

[just-install](https://npmjs.com/package/just-install) can be used to automate
installation of `just` in Node.js applications.

`just` is a great, more robust alternative to npm scripts. If you want to
include `just` in the dependencies of a Node.js application, `just-install`
will install a local, platform-specific binary as part of the `npm install`
command. This removes the need for every developer to install `just`
independently using one of the processes mentioned above. After installation,
the `just` command will work in npm scripts or with npx. It's great for teams
who want to make the set up process for their project as easy as possible.

For more information, see the
[just-install README file](https://github.com/brombal/just-install#readme).

Backwards Compatibility
-----------------------

With the release of version 1.0, `just` features a strong commitment to
backwards compatibility and stability.

Future releases will not introduce backwards incompatible changes that make
existing `justfile`s stop working, or break working invocations of the
command-line interface.

This does not, however, preclude fixing outright bugs, even if doing so might
break `justfiles` that rely on their behavior.

There will never be a `just` 2.0. Any desirable backwards-incompatible changes
will be opt-in on a per-`justfile` basis, so users may migrate at their
leisure.

Features that aren't yet ready for stabilization are marked as unstable and may
be changed or removed at any time. Using unstable features produces an error by
default, which can be suppressed by passing the `--unstable` flag,
`set unstable`, or setting the environment variable `JUST_UNSTABLE`, to any
value other than `false`, `0`, or the empty string.

Editor Support
--------------

`justfile` syntax is close enough to `make` that you may want to tell your
editor to use `make` syntax highlighting for `just`.
