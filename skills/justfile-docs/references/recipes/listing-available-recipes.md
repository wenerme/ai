### Listing Available Recipes

Recipes can be listed in alphabetical order with `just --list`:

```console
$ just --list
Available recipes:
    build
    test
    deploy
    lint
```

Recipes in [submodules](#modules) can be listed with `just --list PATH`, where
`PATH` is a space- or `::`-separated module path:

```
$ cat justfile
mod foo
$ cat foo.just
mod bar
$ cat bar.just
baz:
$ just --list foo bar
Available recipes:
    baz
$ just --list foo::bar
Available recipes:
    baz
```

`just --summary` is more concise:

```console
$ just --summary
build test deploy lint
```

Pass `--unsorted` to print recipes in the order they appear in the `justfile`:

```just
test:
  echo 'Testing!'

build:
  echo 'Building!'
```

```console
$ just --list --unsorted
Available recipes:
    test
    build
```

```console
$ just --summary --unsorted
test build
```

If you'd like `just` to default to listing the recipes in the `justfile`, set
`default-list`<sup>master</sup>:

```just
set default-list := true
```

The setting is per-module, so invoking a module path with `default-list`
enabled lists that module's recipes.

The heading text can be customized with `--list-heading`:

```console
$ just --list --list-heading $'Cool stuff…\n'
Cool stuff…
    test
    build
```

And the indentation can be customized with `--list-prefix`:

```console
$ just --list --list-prefix ····
Available recipes:
····test
····build
```

The argument to `--list-heading` replaces both the heading and the newline
following it, so it should contain a newline if non-empty. It works this way so
you can suppress the heading line entirely by passing the empty string:

```console
$ just --list --list-heading ''
    test
    build
```
