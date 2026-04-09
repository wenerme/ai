### Working Directory

By default, recipes run with the working directory set to the directory that
contains the `justfile`.

The `[no-cd]` attribute can be used to make recipes run with the working
directory set to the directory in which `just` was invoked.

```just
@foo:
  pwd

[no-cd]
@bar:
  pwd
```

```console
$ cd subdir
$ just foo
/
$ just bar
/subdir
```

You can override the working directory for all recipes with
`set working-directory := '…'`:

```just
set working-directory := 'bar'

@foo:
  pwd
```

```console
$ pwd
/home/bob
$ just foo
/home/bob/bar
```

You can override the working directory for a specific recipe with the
`working-directory` attribute<sup>1.38.0</sup>:

```just
[working-directory: 'bar']
@foo:
  pwd
```

```console
$ pwd
/home/bob
$ just foo
/home/bob/bar
```

The argument to the `working-directory` setting or `working-directory`
attribute may be absolute or relative. If it is relative it is interpreted
relative to the default working directory.
