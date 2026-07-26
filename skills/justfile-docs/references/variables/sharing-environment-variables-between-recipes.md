### Sharing Environment Variables Between Recipes

Each line of each recipe is executed by a fresh shell, so it is not possible to
share environment variables between recipes.

#### Using Python Virtual Environments

Some tools, like [Python's venv](https://docs.python.org/3/library/venv.html),
require loading environment variables in order to work, making them challenging
to use with `just`. As a workaround, you can execute the virtual environment
binaries directly:

```just
venv:
  [ -d foo ] || python3 -m venv foo

run: venv
  ./foo/bin/python3 main.py
```

Working Directory
-----------------

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

Note that this does not affect dotenv file search, or the working directory of
backtick and `shell()` invocations.

Use `set no-cd`<sup>1.51.0</sup> to make all recipes in the current module
default to the same behavior.

`set no-cd` and `set working-directory` can be overridden on a per-recipe basis
with the `[no-cd]` and `[working-directory]` attributes.

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
attribute may be an expression<sup>1.51.0</sup> whose value is absolute or
relative. If it is relative it is interpreted relative to the default working
directory.
