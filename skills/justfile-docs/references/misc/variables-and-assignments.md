### Variables and Assignments

Module-level variables may be created by assigning them a value with `:=`:

```just
foo := "hello"
bar := "world"

baz:
  echo {{ foo + " " + bar }}
```

All variables in a module may be printed:

```console
$ just --evaluate
bar := "world"
foo := "hello"
```

Or the value of a single variable:

```console
$ just --evalaute foo
hello
```

All variables in a submodule or a single variable in a submodule may be printed
with a path to the submodule or variable<sup>1.49.0</sup>:

```console
$ just --evaluate bob::bar
x := "world"
y := "hello"
$ just --evaluate bob::bar::y
hello
```

The format of exported variables may be controlled with
`--evaluate-format`<sup>1.49.0</sup>:

```console
$ just --evaluate --evaluate-format shell
bar="world"
foo="hello"
```

The default format is `--evaluate-format just`:

```console
$ just --evaluate --evaluate-format just
bar := "world"
foo := "hello"
```
