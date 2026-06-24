### Fallback to parent `justfile`s

If a recipe is not found in a `justfile` and the `fallback` setting is set,
`just` will look for `justfile`s in the parent directory and up, until it
reaches the root directory. `just` will stop after it reaches a `justfile` in
which the `fallback` setting is `false` or unset.

As an example, suppose the current directory contains this `justfile`:

```just
set fallback
foo:
  echo foo
```

And the parent directory contains this `justfile`:

```just
bar:
  echo bar
```

```console
$ just bar
Trying ../justfile
echo bar
bar
```
