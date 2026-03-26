### Private Recipes

Recipes and aliases whose name starts with a `_` are omitted from `just --list`:

```just
test: _test-helper
  ./bin/test

_test-helper:
  ./bin/super-secret-test-helper-stuff
```

```console
$ just --list
Available recipes:
    test
```

And from `just --summary`:

```console
$ just --summary
test
```

The `[private]` attribute<sup>1.10.0</sup> may also be used to hide recipes or
aliases without needing to change the name:

```just
[private]
foo:

[private]
alias b := bar

bar:
```

```console
$ just --list
Available recipes:
    bar
```

This is useful for helper recipes which are only meant to be used as
dependencies of other recipes.
