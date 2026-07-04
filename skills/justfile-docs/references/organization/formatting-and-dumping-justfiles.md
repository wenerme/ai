### Formatting and dumping `justfile`s

Each `justfile` has a canonical formatting with respect to whitespace and
newlines.

You can overwrite the current justfile with a canonically-formatted version
using the `--fmt` flag:

```console
$ cat justfile
# A lot of blank lines

some-recipe:
  echo "foo"
$ just --fmt
$ cat justfile
# A lot of blank lines

some-recipe:
    echo "foo"
```

When the `justfile` is read from standard input with `--justfile -` or
extracted from a markdown file, `--fmt` prints the formatted `justfile` to
stdout.

Note that formatting is not covered by any backwards compatibility guarantee
and is subject to change from time to time.

Recipe bodies are indented with four spaces by default. This can be changed
with the `--indentation` command-line option, the `JUST_INDENTATION`
environment variable, or the `indentation` setting:

```just
set indentation := "  "
```

Invoking `just --fmt --check` runs `--fmt` in check mode. Instead of
overwriting the `justfile`, `just` will exit with an exit code of 0 if it is
formatted correctly, and will exit with 1 and print a diff if it is not.

You can use the `--dump` command to output a formatted version of the
`justfile` to stdout:

```console
$ just --dump > formatted-justfile
```

The `--dump` command can be used with `--dump-format json` to print a JSON
representation of a `justfile`.

Cached Recipes
--------------

`just` will skip invocations of recipes with the `[cache]`
attribute<sup>1.54.0</sup> if it finds an entry matching the invocation in the
cache. The `[cache]` attribute may only be used with script recipes and is
currently unstable.

For example, this recipe will be skipped if `image.jpg` exists and the contents
of `image.png` and the output of `convert -version` haven't changed since the
last run:

```just
set unstable

[script]
[cache(inputs = "image.png", outputs = "image.jpg", extra = `convert -version`)]
convert:
  convert image.png image.jpg
```

Unlike many other features of `just`, which are, hopefully, well thought-out
and user-friendly, cached recipes are inherently fragile. It is important to
understand their limitations before relying on them. Please read this section
thoroughly, including the friendly admonitions below.
