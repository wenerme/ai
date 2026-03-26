### Sigils

Commands in linewise recipes may be prefixed with any combination of the sigils
`-`, `@`, and `?`.

The `@` sigil toggles command echoing:

```just
foo:
  @echo "This line won't be echoed!"
  echo "This line will be echoed!"

@bar:
  @echo "This line will be echoed!"
  echo "This line won't be echoed!"
```

The `-` sigil cause recipe execution to continue even if the command returns a
nonzero exit status:

```just
# execution will continue, even if bar doesn't exist
foo:
  -rmdir bar
  mkdir bar
  echo 'so much good stuff' > bar/stuff.txt
```

The `?` sigil<sup>1.47.0</sup> causes the current recipe to stop executing if
the command exits with status code `1`, however execution of other recipes will
continue. Exit status `0` causes the current recipe to continue execution as
normal. All other exit codes are reserved and should not be used, as they may
be given meaning in a future version of `just`.

If the `guards` setting is unset or false, `?` sigils are ignored and instead
treated as part of the command.

```just
set guards

@foo: bar
  echo FOO

@bar:
  ?[[ -f baz ]]
  echo BAR
```

```console
$ just foo
FOO
$ touch baz
$ just foo
BAR
FOO
```
