### Positional Arguments

If `positional-arguments` is `true`, recipe arguments will be passed as
positional arguments to commands. For shell recipes, argument `$0` will be the
name of the recipe.

For example, running this recipe:

```just
set positional-arguments

@foo bar:
  echo $0
  echo $1
```

Will produce the following output:

```console
$ just foo hello
foo
hello
```

When using an `sh`-compatible shell, such as `bash` or `zsh`, `$@` expands to
the positional arguments given to the recipe, starting from one. When used
within double quotes as `"$@"`, arguments including whitespace will be passed
on as if they were double-quoted. That is, `"$@"` is equivalent to `"$1" "$2"`…
When there are no positional parameters, `"$@"` and `$@` expand to nothing
(i.e., they are removed).

This example recipe will print arguments one by one on separate lines:

```just
set positional-arguments

@test *args='':
  bash -c 'while (( "$#" )); do echo - $1; shift; done' -- "$@"
```

Running it with _two_ arguments:

```console
$ just test foo "bar baz"
- foo
- bar baz
```

Positional arguments may also be turned on a per-recipe basis with the
`[positional-arguments]` attribute<sup>1.29.0</sup>:

```just
[positional-arguments]
@foo bar:
  echo $0
  echo $1
```

Note that PowerShell does not handle positional arguments in the same way as
other shells, so turning on positional arguments will likely break recipes that
use PowerShell.

If using PowerShell 7.4 or better, the `-CommandWithArgs` flag will make
positional arguments work as expected:

```just
set shell := ['pwsh.exe', '-CommandWithArgs']
set positional-arguments

print-args a b c:
  Write-Output @($args[1..($args.Count - 1)])
```
