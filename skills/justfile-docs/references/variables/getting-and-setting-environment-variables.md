### Getting and Setting Environment Variables

#### Exporting `just` Variables

Assignments prefixed with the `export` keyword will be exported to recipes as
environment variables:

```just
export RUST_BACKTRACE := "1"

test:
  # will print a stack trace if it crashes
  cargo test
```

Parameters prefixed with a `$` will be exported as environment variables:

```just
test $RUST_BACKTRACE="1":
  # will print a stack trace if it crashes
  cargo test
```

You can also use the `[env(NAME, VALUE)]` attribute to export environment
variables to a specific recipe:

```just
[env("RUST_BACKTRACE", "1")]
test:
  # will print a stack trace if it crashes
  cargo test
```

Exported variables and parameters are not exported to backticks in the same scope.

```just
export WORLD := "world"
# This backtick will fail with "WORLD: unbound variable"
BAR := `echo hello $WORLD`
```

```just
# Running `just a foo` will fail with "A: unbound variable"
a $A $B=`echo $A`:
  echo $A $B
```

When [export](#export) is set, all `just` variables are exported as environment
variables.

#### Unexporting Environment Variables

Environment variables can be unexported with the `unexport`
keyword<sup>1.29.0</sup>:

```just
unexport FOO

@foo:
  echo $FOO
```

```
$ export FOO=bar
$ just foo
sh: FOO: unbound variable
```

#### Getting Environment Variables from the Environment

Environment variables from the environment are passed automatically to the
recipes.

```just
print_home_folder:
  @echo "HOME is: '${HOME}'"
```

```console
$ just
HOME is: '/home/myuser'
```

#### Setting `just` Variables from Environment Variables

Environment variables can be propagated to `just` variables using the `env()` function.
See
[environment-variables](#environment-variables).
