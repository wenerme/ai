### Documentation Comments

Comments immediately preceding a recipe will appear in `just --list`:

```just
# build stuff
build:
  ./bin/build

# test stuff
test:
  ./bin/test
```

```console
$ just --list
Available recipes:
    build # build stuff
    test # test stuff
```

The `[doc]` attribute can be used to set or suppress a recipe's doc comment:

```just
# This comment won't appear
[doc('Build stuff')]
build:
  ./bin/build

# This one won't either
[doc]
test:
  ./bin/test
```

```console
$ just --list
Available recipes:
    build # Build stuff
    test
```
