### Setting Variables from the Command Line

Variables can be overridden from the command line.

```just
os := "linux"

test: build
  ./test --test {{os}}

build:
  ./build {{os}}
```

```console
$ just
./build linux
./test --test linux
```

Any number of arguments of the form `NAME=VALUE` can be passed before recipes:

```console
$ just os=plan9
./build plan9
./test --test plan9
```

Or you can use the `--set` flag:

```console
$ just --set os bsd
./build bsd
./test --test bsd
```

Variables in submodules can be overridden using the `::`-separated path to the
variable. A variable named `bar` in a submodule named `foo` may be overridden
with `foo::bar=VALUE` or `--set foo::bar VALUE`.
