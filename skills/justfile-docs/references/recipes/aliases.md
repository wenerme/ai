### Aliases

Aliases allow recipes to be invoked on the command line with alternative names:

```just
alias b := build

build:
  echo 'Building!'
```

```console
$ just b
echo 'Building!'
Building!
```

The target of an alias may be a recipe in a submodule:

```justfile
mod foo

alias baz := foo::bar
```
