### Invoking Multiple Recipes

Multiple recipes may be invoked on the command line at once:

```just
build:
  make web

serve:
  python3 -m http.server -d out 8000
```

```console
$ just build serve
make web
python3 -m http.server -d out 8000
```

Keep in mind that recipes with parameters will swallow arguments, even if they
match the names of other recipes:

```just
build project:
  make {{project}}

serve:
  python3 -m http.server -d out 8000
```

```console
$ just build serve
make: *** No rule to make target `serve'.  Stop.
```

The `--one` flag can be used to restrict command-line invocations to a single
recipe:

```console
$ just --one build serve
error: Expected 1 command-line recipe invocation but found 2.
```
