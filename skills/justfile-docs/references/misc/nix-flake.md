### Nix Flake

The `just` repository includes a
[`flake.nix`](https://github.com/casey/just/tree/master/flake.nix) that defines
a [nix flake](https://nix.dev/concepts/flakes.html), allowing you to use `just`
as an input to another flake:

```nix
{
  inputs = {
    just.url = "github:casey/just";
  }

  outputs = {self, nixpkgs, just}: {
  }
}
```

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
